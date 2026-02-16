from rest_framework import serializers
from .models import Participant, Match


class ParticipantSerializer(serializers.ModelSerializer):
    """
    Serializer for Participant model with all fields.
    """
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    theme_display = serializers.CharField(source='get_theme_preference_display', read_only=True)
    
    class Meta:
        model = Participant
        fields = [
            'id',
            'name',
            'email',
            'student_id',
            'role',
            'role_display',
            'preferred_language',
            'ide',
            'theme_preference',
            'theme_display',
            'approach_score',
            'is_matched',
            'created_at',
        ]
        read_only_fields = ['id', 'is_matched', 'created_at']
    
    def validate_email(self, value):
        """Ensure email is unique (case-insensitive)"""
        if Participant.objects.filter(email__iexact=value).exists():
            if self.instance is None or self.instance.email.lower() != value.lower():
                raise serializers.ValidationError("A participant with this email already exists.")
        return value.lower()
    
    def validate_approach_score(self, value):
        """Ensure approach score is between 1 and 10"""
        if value < 1 or value > 10:
            raise serializers.ValidationError("Approach score must be between 1 and 10.")
        return value


class MatchSerializer(serializers.ModelSerializer):
    """
    Serializer for Match model with nested participant details.
    """
    participant1 = ParticipantSerializer(read_only=True)
    participant2 = ParticipantSerializer(read_only=True)
    
    class Meta:
        model = Match
        fields = [
            'id',
            'participant1',
            'participant2',
            'compatibility_percentage',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class ParticipantMatchSerializer(serializers.Serializer):
    """
    Serializer for returning a participant's match information.
    """
    participant = ParticipantSerializer()
    match_found = serializers.BooleanField()
    partner = ParticipantSerializer(allow_null=True)
    compatibility_percentage = serializers.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        allow_null=True
    )
    message = serializers.CharField()
