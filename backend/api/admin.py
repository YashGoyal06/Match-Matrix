from django.contrib import admin
from .models import Participant, Match


@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'student_id', 'role', 'is_matched', 'created_at']
    list_filter = ['role', 'is_matched', 'theme_preference', 'created_at']
    search_fields = ['name', 'email', 'student_id']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'email', 'student_id')
        }),
        ('Technical Preferences', {
            'fields': ('role', 'preferred_language', 'ide', 'theme_preference', 'approach_score')
        }),
        ('Match Status', {
            'fields': ('is_matched',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ['participant1', 'participant2', 'compatibility_percentage', 'created_at']
    list_filter = ['created_at']
    search_fields = ['participant1__name', 'participant2__name']
    readonly_fields = ['created_at']
    
    def get_readonly_fields(self, request, obj=None):
        if obj:  # Editing existing object
            return self.readonly_fields + ['participant1', 'participant2']
        return self.readonly_fields
