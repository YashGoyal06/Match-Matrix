from django.db import models

class Participant(models.Model):
    # Identity
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    student_id = models.CharField(max_length=50)
    
    # Quiz Data & Preferences
    role = models.CharField(max_length=50, default="developer")
    quiz_data = models.JSONField(default=dict) # Stores q1, q2... q15
    
    # System Flags
    is_matched = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"

class Match(models.Model):
    participant_1 = models.ForeignKey(Participant, related_name='match_1', on_delete=models.CASCADE)
    participant_2 = models.ForeignKey(Participant, related_name='match_2', on_delete=models.CASCADE)
    compatibility_score = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('participant_1', 'participant_2')
    
    def __str__(self):
        return f"{self.participant_1.name} + {self.participant_2.name}"