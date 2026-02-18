from django.conf import settings
from django.db import transaction
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Participant, Match, Whitelist

# --- LOGIC HELPER ---
def calculate_similarity(p1_data, p2_data):
    base_score = 30.0
    total_questions = 15
    matches_found = 0
    points_per_match = 70.0 / total_questions
    
    # Debug print
    # print(f"--- COMPARING {p1_data.get('name', 'User A')} vs {p2_data.get('name', 'User B')} ---")
    
    for i in range(1, total_questions + 1):
        key = f'q{i}'
        val1 = p1_data.get(key)
        val2 = p2_data.get(key)
        if val1 and val2 and val1 == val2:
            matches_found += 1
            
    final_score = base_score + (matches_found * points_per_match)
    return min(round(final_score, 1), 100.0)

def run_matching_logic():
    matches_created = []
    with transaction.atomic():
        # Only select people who are NOT matched and NOT explicitly marked as 'duo' role (though is_matched handles this)
        unmatched_pool = list(
            Participant.objects.select_for_update()
            .filter(is_matched=False)
            .order_by('created_at')
        )
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
                if person_a.is_matched or best_partner.is_matched: continue
                
                Match.objects.create(
                    participant_1=person_a, participant_2=best_partner, compatibility_score=best_score
                )
                person_a.is_matched = True
                best_partner.is_matched = True
                person_a.save()
                best_partner.save()
                unmatched_pool.pop(best_partner_index)
                matches_created.append(f"{person_a.name} & {best_partner.name} ({best_score}%)")
    return matches_created

# --- ENDPOINTS ---

@api_view(['POST'])
def verify_user(request):
    email_input = request.data.get('email', '').strip().lower()
    
    # 1. IF ALREADY REGISTERED -> SEND SPECIAL SUCCESS STATUS
    if Participant.objects.filter(email__iexact=email_input).exists():
        return Response({
            'success': True, 
            'status': 'registered',  # Front-end looks for this!
            'message': 'User already registered. Redirecting...'
        })

    # 2. CHECK WHITELIST
    is_allowed = Whitelist.objects.filter(email__iexact=email_input).exists()

    if is_allowed:
        return Response({'success': True, 'status': 'new', 'message': 'Verified'})
    else:
        return Response({'success': False, 'message': 'Access Denied: Email not in whitelist.'}, status=403)

@api_view(['POST'])
def register_participant(request):
    data = request.data
    email = data.get('email')

    # Double-check whitelist
    if not Whitelist.objects.filter(email__iexact=email).exists():
         return Response({'success': False, 'message': 'Email removed from whitelist.'}, status=403)

    if Participant.objects.filter(email=email).exists():
        return Response({'success': False, 'message': 'Already registered.'}, status=400)

    participant = Participant.objects.create(
        name=data.get('name'),
        email=email,
        student_id=data.get('student_id'),
        role=data.get('role', 'fullstack'),
        quiz_data={k: v for k, v in data.items() if k.startswith('q')},
        is_matched=False
    )
    
    # Trigger matching immediately for the new user
    run_matching_logic()
    
    return Response({'success': True, 'id': participant.id})

@api_view(['POST'])
def register_duo(request):
    data = request.data
    p1_data = data.get('p1', {})
    p2_data = data.get('p2', {})
    
    # 1. Validation
    if not p1_data.get('email') or not p2_data.get('email'):
        return Response({'success': False, 'message': 'Both emails required'}, status=400)

    # 2. Check Existance
    if Participant.objects.filter(email=p1_data['email']).exists() or \
       Participant.objects.filter(email=p2_data['email']).exists():
        return Response({'success': False, 'message': 'One or both users already registered'}, status=400)

    try:
        with transaction.atomic():
            # Create P1
            p1 = Participant.objects.create(
                name=p1_data.get('name'),
                email=p1_data.get('email'),
                student_id=p1_data.get('student_id'),
                role="duo",
                quiz_data={k: v for k, v in p1_data.items() if k.startswith('q')},
                is_matched=True # Immediately matched
            )

            # Create P2
            p2 = Participant.objects.create(
                name=p2_data.get('name'),
                email=p2_data.get('email'),
                student_id=p2_data.get('student_id'),
                role="duo",
                quiz_data={k: v for k, v in p2_data.items() if k.startswith('q')},
                is_matched=True # Immediately matched
            )

            # Calculate Score using the same logic as solo
            score = calculate_similarity(p1.quiz_data, p2.quiz_data)

            # Create Match
            Match.objects.create(
                participant_1=p1,
                participant_2=p2,
                compatibility_score=score
            )
            
            return Response({'success': True, 'score': score})

    except Exception as e:
        print(f"Duo Register Error: {e}")
        return Response({'success': False, 'message': 'Registration Error'}, status=500)

@api_view(['GET'])
def get_my_match(request):
    email = request.GET.get('email')
    if not email: return Response({'success': False, 'message': 'Email required'}, status=400)
    try:
        me = Participant.objects.get(email=email)
        response_data = {
            'success': True, 'match_found': False,
            'participant': {'name': me.name, 'email': me.email, 'student_id': me.student_id}
        }
        if me.is_matched:
            match = Match.objects.filter(Q(participant_1=me) | Q(participant_2=me)).first()
            if match:
                partner = match.participant_2 if match.participant_1 == me else match.participant_1
                response_data['match_found'] = True
                response_data['compatibility_percentage'] = match.compatibility_score
                response_data['partner'] = {'name': partner.name, 'email': partner.email, 'student_id': partner.student_id}
        return Response(response_data)
    except Participant.DoesNotExist:
        return Response({'success': False, 'message': 'User not found'}, status=404)

@api_view(['POST'])
def trigger_matching(request):
    matches = run_matching_logic()
    return Response({'success': True, 'matches_generated': matches})

# --- ADMIN ENDPOINTS ---

@api_view(['GET'])
def get_participants(request):
    participants = Participant.objects.all().order_by('-created_at')
    data = []
    for p in participants:
        data.append({
            'id': p.id,
            'name': p.name,
            'email': p.email,
            'role_display': p.role,
            'preferred_language': p.quiz_data.get('preferred_language', 'N/A'),
            'is_matched': p.is_matched
        })
    return Response({'success': True, 'participants': data})

@api_view(['GET'])
def get_matches(request):
    matches = Match.objects.all().order_by('-compatibility_score')
    data = []
    for m in matches:
        data.append({
            'participant1': {'name': m.participant_1.name},
            'participant2': {'name': m.participant_2.name},
            'compatibility_percentage': m.compatibility_score
        })
    return Response({'success': True, 'matches': data})
