import json
import os
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Participant, Match
from django.db.models import Q

# --- UTILS ---
def get_allowed_users():
    json_path = os.path.join(settings.BASE_DIR, 'data', 'allowed_users.json')
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def calculate_similarity(p1_data, p2_data):
    score = 0
    total_questions = 15
    for i in range(1, total_questions + 1):
        key = f'q{i}'
        val1 = p1_data.get(key)
        val2 = p2_data.get(key)
        if val1 and val2 and val1 == val2:
            score += 1
    return round((score / total_questions) * 100, 1)

def run_matching_logic():
    unmatched_pool = list(Participant.objects.filter(is_matched=False))
    matches_created = []
    
    while len(unmatched_pool) >= 2:
        person_a = unmatched_pool.pop(0)
        best_partner = None
        best_score = -1
        best_partner_index = -1
        
        for i, candidate in enumerate(unmatched_pool):
            score = calculate_similarity(person_a.quiz_data, candidate.quiz_data)
            if score > best_score:
                best_score = score
                best_partner = candidate
                best_partner_index = i
        
        if best_partner:
            Match.objects.create(
                participant_1=person_a,
                participant_2=best_partner,
                compatibility_score=best_score
            )
            person_a.is_matched = True
            best_partner.is_matched = True
            person_a.save()
            best_partner.save()
            
            unmatched_pool.pop(best_partner_index)
            matches_created.append(f"{person_a.name} & {best_partner.name}")

    return matches_created

# --- ENDPOINTS ---

@api_view(['POST'])
def verify_user(request):
    name_input = request.data.get('name', '').strip().lower()
    email_input = request.data.get('email', '').strip().lower()
    
    # Optional: Check if already registered right here to save them time
    if Participant.objects.filter(email__iexact=email_input).exists():
        return Response({'success': False, 'message': 'You are already registered!'}, status=400)

    allowed_list = get_allowed_users()
    user_found = any(
        u['email'].lower() == email_input and u['name'].lower() == name_input
        for u in allowed_list
    )

    if user_found:
        return Response({'success': True, 'message': 'Verified'})
    else:
        return Response({'success': False, 'message': 'User not found in whitelist.'}, status=403)

@api_view(['POST'])
def register_participant(request):
    data = request.data
    email = data.get('email')

    # 1. CHECK FOR DUPLICATES (The requested fix)
    if Participant.objects.filter(email=email).exists():
        return Response({
            'success': False, 
            'message': 'This email is already registered. You cannot submit twice.'
        }, status=400)

    # 2. Save New User
    participant = Participant.objects.create(
        name=data.get('name'),
        email=email,
        student_id=data.get('student_id'),
        role=data.get('role', 'fullstack'),
        quiz_data={k: v for k, v in data.items() if k.startswith('q')},
        is_matched=False
    )
    
    # 3. Trigger Matching
    run_matching_logic()
    
    return Response({'success': True, 'id': participant.id})

@api_view(['GET'])
def get_my_match(request):
    email = request.GET.get('email')
    if not email:
        return Response({'success': False, 'message': 'Email required'}, status=400)

    try:
        me = Participant.objects.get(email=email)
        response_data = {
            'success': True,
            'match_found': False,
            'participant': {
                'name': me.name,
                'email': me.email,
                'student_id': me.student_id
            }
        }

        if me.is_matched:
            match = Match.objects.filter(Q(participant_1=me) | Q(participant_2=me)).first()
            if match:
                partner = match.participant_2 if match.participant_1 == me else match.participant_1
                response_data['match_found'] = True
                response_data['compatibility_percentage'] = match.compatibility_score
                response_data['partner'] = {
                    'name': partner.name,
                    'email': partner.email,
                    'student_id': partner.student_id
                }
        return Response(response_data)

    except Participant.DoesNotExist:
        return Response({'success': False, 'message': 'User not found'}, status=404)

@api_view(['POST'])
def trigger_matching(request):
    matches = run_matching_logic()
    return Response({'success': True, 'matches_generated': matches})