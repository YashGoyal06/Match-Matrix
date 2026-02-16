from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Participant(models.Model):
    """
    Represents a student participating in the Match Matrix event.
    """
    ROLE_CHOICES = [
        ('frontend', 'Frontend Developer'),
        ('backend', 'Backend Developer'),
        ('fullstack', 'Full Stack Developer'),
        ('aiml', 'AI/ML Engineer'),
    ]
    
    THEME_CHOICES = [
        ('dark', 'Dark Theme'),
        ('light', 'Light Theme'),
    ]
    
    # Basic Information
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    student_id = models.CharField(max_length=50, unique=True)
    
    # Technical Preferences
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    preferred_language = models.CharField(max_length=50, help_text="e.g., Python, JavaScript, Java")
    ide = models.CharField(max_length=50, help_text="e.g., VS Code, PyCharm, IntelliJ")
    theme_preference = models.CharField(max_length=10, choices=THEME_CHOICES)
    
    # Working Style Score (1-10 scale)
    approach_score = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)],
        help_text="1=Highly Structured, 10=Highly Flexible"
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_matched = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Participant'
        verbose_name_plural = 'Participants'
    
    def __str__(self):
        return f"{self.name} ({self.student_id}) - {self.get_role_display()}"


class Match(models.Model):
    """
    Represents a match between two participants with compatibility score.
    """
    participant1 = models.ForeignKey(
        Participant, 
        on_delete=models.CASCADE, 
        related_name='matches_as_p1'
    )
    participant2 = models.ForeignKey(
        Participant, 
        on_delete=models.CASCADE, 
        related_name='matches_as_p2'
    )
    compatibility_percentage = models.DecimalField(
        max_digits=5, 
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-compatibility_percentage', '-created_at']
        verbose_name = 'Match'
        verbose_name_plural = 'Matches'
        unique_together = ['participant1', 'participant2']
    
    def __str__(self):
        return f"{self.participant1.name} <-> {self.participant2.name} ({self.compatibility_percentage}%)"
    
    def save(self, *args, **kwargs):
        """Ensure participant1.id < participant2.id to avoid duplicate matches"""
        if self.participant1.id > self.participant2.id:
            self.participant1, self.participant2 = self.participant2, self.participant1
        super().save(*args, **kwargs)
