from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from django.db.models import Q
from .models import Participant, Match
from .serializers import (
    ParticipantSerializer, 
    MatchSerializer, 
    ParticipantMatchSerializer
)


@api_view(['POST'])
def register_participant(request):
    """
    Register a new participant for the Match Matrix event.
    """
    serializer = ParticipantSerializer(data=request.data)
    
    if serializer.is_valid():
        participant = serializer.save()
        return Response({
            'success': True,
            'message': 'Registration successful! You will be notified once matches are generated.',
            'participant': ParticipantSerializer(participant).data
        }, status=status.HTTP_201_CREATED)
    
    return Response({
        'success': False,
        'message': 'Registration failed. Please check your inputs.',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_my_match(request):
    """
    Retrieve the match for a participant by email.
    Query parameter: email
    """
    email = request.query_params.get('email', '').lower()
    
    if not email:
        return Response({
            'success': False,
            'message': 'Email parameter is required.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        participant = Participant.objects.get(email__iexact=email)
    except Participant.DoesNotExist:
        return Response({
            'success': False,
            'message': 'No participant found with this email.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    # Find the match for this participant
    match = Match.objects.filter(
        Q(participant1=participant) | Q(participant2=participant)
    ).first()
    
    if match:
        # Determine which participant is the partner
        partner = match.participant2 if match.participant1 == participant else match.participant1
        
        response_data = {
            'participant': ParticipantSerializer(participant).data,
            'match_found': True,
            'partner': ParticipantSerializer(partner).data,
            'compatibility_percentage': match.compatibility_percentage,
            'message': 'Match found!'
        }
    else:
        response_data = {
            'participant': ParticipantSerializer(participant).data,
            'match_found': False,
            'partner': None,
            'compatibility_percentage': None,
            'message': 'No match yet. Please wait for the matching process to complete.'
        }
    
    serializer = ParticipantMatchSerializer(response_data)
    return Response({
        'success': True,
        'data': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
def generate_matches(request):
    """
    Admin endpoint to generate matches using the compatibility algorithm.
    This clears existing matches and creates new ones.
    """
    try:
        with transaction.atomic():
            # Clear existing matches and reset is_matched flag
            Match.objects.all().delete()
            Participant.objects.update(is_matched=False)
            
            # Get all participants
            participants = list(Participant.objects.all())
            
            if len(participants) < 2:
                return Response({
                    'success': False,
                    'message': 'Not enough participants to generate matches. Need at least 2.'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Calculate compatibility scores for all pairs
            compatibility_scores = []
            
            for i in range(len(participants)):
                for j in range(i + 1, len(participants)):
                    p1 = participants[i]
                    p2 = participants[j]
                    score = calculate_compatibility(p1, p2)
                    compatibility_scores.append((p1, p2, score))
            
            # Sort by compatibility score (highest first)
            compatibility_scores.sort(key=lambda x: x[2], reverse=True)
            
            # Create matches using greedy algorithm (pair highest compatible first)
            matched_participants = set()
            matches_created = []
            
            for p1, p2, score in compatibility_scores:
                if p1.id not in matched_participants and p2.id not in matched_participants:
                    # Create the match
                    match = Match.objects.create(
                        participant1=p1,
                        participant2=p2,
                        compatibility_percentage=score
                    )
                    
                    # Mark participants as matched
                    p1.is_matched = True
                    p1.save()
                    p2.is_matched = True
                    p2.save()
                    
                    matched_participants.add(p1.id)
                    matched_participants.add(p2.id)
                    matches_created.append(match)
            
            # Count unmatched participants
            unmatched_count = len(participants) - len(matched_participants)
            
            return Response({
                'success': True,
                'message': 'Matches generated successfully!',
                'stats': {
                    'total_participants': len(participants),
                    'matches_created': len(matches_created),
                    'matched_participants': len(matched_participants),
                    'unmatched_participants': unmatched_count
                },
                'matches': MatchSerializer(matches_created, many=True).data
            }, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Error generating matches: {str(e)}'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def calculate_compatibility(p1: Participant, p2: Participant) -> float:
    """
    Calculate compatibility percentage between two participants.
    
    Scoring Logic:
    - High Score (+30%): Complementary Roles (Frontend + Backend)
    - Medium Score (+20%): Same Preferred Language
    - Medium Score (+20%): Similar Approach Score (within 2 points)
    - Low Score (+10%): Same IDE
    - Low Score (+10%): Same Theme Preference
    
    Maximum possible score: 90%
    """
    score = 0.0
    
    # 1. Complementary Roles (+30%)
    complementary_roles = [
        {'frontend', 'backend'},
        {'frontend', 'fullstack'},
        {'backend', 'fullstack'},
        {'aiml', 'backend'},
        {'aiml', 'fullstack'},
    ]
    
    role_pair = {p1.role, p2.role}
    if role_pair in complementary_roles:
        score += 30.0
    elif p1.role == p2.role:
        # Same role gets partial credit
        score += 15.0
    
    # 2. Same Preferred Language (+20%)
    if p1.preferred_language.lower() == p2.preferred_language.lower():
        score += 20.0
    
    # 3. Similar Approach Score (+20%)
    approach_diff = abs(p1.approach_score - p2.approach_score)
    if approach_diff <= 2:
        score += 20.0
    elif approach_diff <= 4:
        score += 10.0  # Partial credit for moderately similar
    
    # 4. Same IDE (+10%)
    if p1.ide.lower() == p2.ide.lower():
        score += 10.0
    
    # 5. Same Theme Preference (+10%)
    if p1.theme_preference == p2.theme_preference:
        score += 10.0
    
    # Add a small random factor to break ties (0-5%)
    import random
    score += random.uniform(0, 5)
    
    # Cap at 100%
    return min(score, 100.0)


@api_view(['GET'])
def get_all_participants(request):
    """
    Get all registered participants (for admin dashboard).
    """
    participants = Participant.objects.all()
    serializer = ParticipantSerializer(participants, many=True)
    
    return Response({
        'success': True,
        'count': participants.count(),
        'participants': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_all_matches(request):
    """
    Get all matches (for admin dashboard).
    """
    matches = Match.objects.all()
    serializer = MatchSerializer(matches, many=True)
    
    return Response({
        'success': True,
        'count': matches.count(),
        'matches': serializer.data
    }, status=status.HTTP_200_OK)
