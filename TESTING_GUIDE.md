# ✅ Match Matrix - Setup Verification & Testing Guide

## 🎯 Purpose

This guide helps you verify that every component of Match Matrix is working correctly before you start developing or showing it at your event.

---

## 📋 Pre-Setup Checklist

Before you begin, make sure you have:

- [ ] **Python 3.10+** installed
  ```bash
  python --version
  # Should show: Python 3.10.x or higher
  ```

- [ ] **Node.js 18+** installed
  ```bash
  node --version
  # Should show: v18.x.x or higher
  ```

- [ ] **npm** installed
  ```bash
  npm --version
  # Should show: 9.x.x or higher
  ```

- [ ] **Supabase Account** created
  - Go to [supabase.com](https://supabase.com)
  - Free tier is sufficient

- [ ] **VS Code** installed (recommended) or any code editor

---

## 🚀 Setup Verification (Step by Step)

### Phase 1: Backend Setup ✅

#### Step 1.1: Virtual Environment

```bash
cd backend
python -m venv venv

# Activate (choose your OS):
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

**✅ Verify**: You should see `(venv)` in your terminal prompt

#### Step 1.2: Install Dependencies

```bash
pip install -r ../requirements.txt
```

**✅ Verify**: Check if Django is installed
```bash
python -c "import django; print(django.get_version())"
# Should output: 5.0.1
```

#### Step 1.3: Environment Variables

```bash
# Create .env file
cp ../.env.example .env

# Edit .env with your Supabase URL
# DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
```

**✅ Verify**: Check .env exists
```bash
# Windows:
type .env
# macOS/Linux:
cat .env
```

#### Step 1.4: Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

**✅ Verify**: Should see output like:
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, api
Running migrations:
  Applying api.0001_initial... OK
```

#### Step 1.5: Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

**✅ Verify**: You can login later at http://localhost:8000/admin

#### Step 1.6: Start Backend Server

```bash
python manage.py runserver
```

**✅ Verify**: Should see:
```
Django version 5.0.1, using settings 'core.settings'
Starting development server at http://127.0.0.1:8000/
```

**🧪 Test**: Open browser to http://localhost:8000
- You should see Django's default page or 404 (both are OK)

**🧪 Test API**: http://localhost:8000/api/
- You should see a 404 page (expected, no root API endpoint)

**Keep this terminal running!**

---

### Phase 2: Frontend Setup ✅

#### Step 2.1: Open New Terminal

In VS Code: Click `+` in terminal panel  
Or: Open new terminal window

#### Step 2.2: Install Dependencies

```bash
cd frontend
npm install
```

**✅ Verify**: Check package installed
```bash
npm list react
# Should show: react@18.2.0
```

#### Step 2.3: Environment Variables (Optional)

```bash
echo "VITE_API_URL=http://localhost:8000/api" > .env
```

#### Step 2.4: Start Frontend Server

```bash
npm run dev
```

**✅ Verify**: Should see:
```
VITE v5.0.8  ready in XXX ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**🧪 Test**: Open browser to http://localhost:5173
- You should see the Match Matrix landing page with:
  - "MATCH MATRIX" heading
  - Animated grid background
  - Green neon colors
  - "START QUIZ" button

**Keep this terminal running too!**

---

## 🧪 Component Testing

### Test 1: Homepage ✅

**URL**: http://localhost:5173

**Expected**:
- [ ] Page loads without errors
- [ ] "MATCH MATRIX" title is visible
- [ ] Matrix Club badge at top
- [ ] Event date shows "February 20, 2026"
- [ ] "START QUIZ" button is visible
- [ ] Background has animated grid
- [ ] Floating particles/numbers visible
- [ ] Three info cards at bottom
- [ ] Mouse movement creates reactive effects

**🐛 Troubleshooting**:
- If blank page: Check browser console (F12)
- If no styles: Run `npm install` again in frontend/

---

### Test 2: Registration Form ✅

**Action**: Click "START QUIZ" or go to http://localhost:5173/register

**Expected**:

#### Step 1 - Basic Info
- [ ] Form shows "Basic Information"
- [ ] Three input fields: Name, Email, Student ID
- [ ] Progress bar shows 1/4
- [ ] "NEXT" button at bottom

**🧪 Test**: Fill in:
- Name: `Test Student`
- Email: `test@college.edu`
- Student ID: `STU001`
- Click "NEXT"

#### Step 2 - Role Selection
- [ ] Form shows "Your Tech Role"
- [ ] Four role cards visible
- [ ] Cards have icons (🎨, ⚙️, 🔧, 🤖)
- [ ] Progress bar shows 2/4

**🧪 Test**: Click "Frontend Developer"
- [ ] Card highlights with green border
- [ ] Checkmark appears on card
- Click "NEXT"

#### Step 3 - Tech Stack
- [ ] Form shows "Tech Stack"
- [ ] Two dropdowns: Language and IDE
- [ ] Progress bar shows 3/4

**🧪 Test**: Select:
- Language: `JavaScript`
- IDE: `VS Code`
- Click "NEXT"

#### Step 4 - Working Style
- [ ] Form shows "Working Style"
- [ ] Two theme cards: Dark (🌙) and Light (☀️)
- [ ] Slider for approach score (1-10)
- [ ] Progress bar shows 4/4
- [ ] "SUBMIT" button instead of "NEXT"

**🧪 Test**: Select:
- Theme: `Dark Mode`
- Approach: Move slider to `7`
- Click "SUBMIT"

**Expected After Submit**:
- [ ] Redirects to `/dashboard`
- [ ] Shows "Waiting for Match" state
- [ ] Hourglass icon (⏳)
- [ ] Your profile card displays correct info

**🐛 Troubleshooting**:
- If "Network Error": Backend not running
- If "Registration failed": Check backend terminal for errors
- If fields don't save: Check browser console

---

### Test 3: Backend API ✅

**Open new terminal** (keep others running)

#### Test Registration Endpoint

```bash
curl -X POST http://localhost:8000/api/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "email": "apitest@college.edu",
    "student_id": "STU999",
    "role": "backend",
    "preferred_language": "Python",
    "ide": "PyCharm",
    "theme_preference": "dark",
    "approach_score": 5
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Registration successful!",
  "participant": {
    "id": 2,
    "name": "API Test User",
    "email": "apitest@college.edu",
    ...
  }
}
```

#### Test Get Match Endpoint

```bash
curl "http://localhost:8000/api/my-match/?email=test@college.edu"
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "participant": {...},
    "match_found": false,
    "partner": null,
    "message": "No match yet..."
  }
}
```

**✅ If both work**: Backend API is functioning correctly!

---

### Test 4: Register Multiple Participants ✅

To test the matching algorithm, you need at least 2 participants.

**Open 3-4 browser windows** (use incognito/private mode):

#### Participant 1:
- Name: `Alice Frontend`
- Email: `alice@college.edu`
- Student ID: `STU101`
- Role: **Frontend Developer**
- Language: `JavaScript`
- IDE: `VS Code`
- Theme: `Dark`
- Approach: `8`

#### Participant 2:
- Name: `Bob Backend`
- Email: `bob@college.edu`
- Student ID: `STU102`
- Role: **Backend Developer**
- Language: `Python`
- IDE: `PyCharm`
- Theme: `Dark`
- Approach: `7`

#### Participant 3:
- Name: `Carol Fullstack`
- Email: `carol@college.edu`
- Student ID: `STU103`
- Role: **Full Stack Developer**
- Language: `JavaScript`
- IDE: `VS Code`
- Theme: `Light`
- Approach: `6`

#### Participant 4:
- Name: `Dave AI`
- Email: `dave@college.edu`
- Student ID: `STU104`
- Role: **AI/ML Engineer**
- Language: `Python`
- IDE: `PyCharm`
- Theme: `Dark`
- Approach: `5`

**✅ After each registration**:
- Dashboard should show "Waiting for Match"

---

### Test 5: Admin Panel ✅

**URL**: http://localhost:5173/admin

**Expected**:
- [ ] Page shows "Admin Panel"
- [ ] Four stat cards visible:
  - Total Participants (should show 4 if you registered 4)
  - Matched (should show 0)
  - Unmatched (should show 4)
  - Total Matches (should show 0)
- [ ] "Generate Matches" section
- [ ] Blue button with "Generate Matches" text
- [ ] Participants table with all registered users

**🧪 Test Generate Matches**:

1. Click "Generate Matches" button
2. Confirm the dialog
3. Wait 1-2 seconds

**Expected**:
- [ ] Success message appears
- [ ] Stats update:
  - Matched: 4
  - Unmatched: 0
  - Total Matches: 2
- [ ] Matches list appears below
- [ ] Each match shows:
  - Two participant names
  - Their roles
  - Compatibility percentage
  - Numbered ranking

**Expected Matches** (approximately):
- Alice (Frontend) ↔ Bob (Backend) = ~75-85%
  - Complementary roles (+30%)
  - Similar approach (+20%)
  - Same theme (+10%)
  
- Carol (Fullstack) ↔ Dave (AI/ML) = ~40-60%
  - Some complementary role (+15%)
  - Similar approach (+10-20%)

**🐛 Troubleshooting**:
- If "Not enough participants": Need at least 2 registered
- If error: Check backend terminal logs
- If matches don't appear: Refresh page

---

### Test 6: Dashboard After Matching ✅

**Go back to participant dashboards**:

1. Open http://localhost:5173/dashboard in each participant's browser
2. (Make sure email is saved in localStorage from registration)

**Expected for each dashboard**:
- [ ] "MATCH FOUND!" banner appears
- [ ] Confetti animation plays
- [ ] Circular compatibility meter shows percentage
- [ ] Your card on left side
- [ ] Partner's card on right side
- [ ] Both cards show complete info:
  - Name
  - Role
  - Language
  - IDE
  - Theme
  - Approach score
- [ ] "Connect With Your Partner" section
- [ ] Partner's email displayed

**🧪 Test Specific Matches**:

**Alice's Dashboard**:
- [ ] Should show match with Bob
- [ ] Compatibility ~75-85%
- [ ] Bob's info displayed

**Bob's Dashboard**:
- [ ] Should show match with Alice
- [ ] Same compatibility percentage
- [ ] Alice's info displayed

**Carol's Dashboard**:
- [ ] Should show match with Dave
- [ ] Compatibility ~40-60%
- [ ] Dave's info displayed

**Dave's Dashboard**:
- [ ] Should show match with Carol
- [ ] Same compatibility percentage
- [ ] Carol's info displayed

---

## 🎯 Algorithm Verification

### Expected Compatibility Scores

Based on the test participants above:

**Alice (Frontend) + Bob (Backend)**:
- ✅ +30% Complementary roles (Frontend + Backend)
- ✅ +20% Similar approach (8 vs 7, within 2 points)
- ✅ +10% Same theme (both Dark)
- ❌ +0% Different languages (JS vs Python)
- ❌ +0% Different IDEs (VS Code vs PyCharm)
- **Total: ~60-65%** (with random factor)

**Carol (Fullstack) + Dave (AI/ML)**:
- ✅ +15% Partial complementary roles
- ✅ +10% Moderately similar approach (6 vs 5)
- ❌ +0% Different languages (JS vs Python)
- ❌ +0% Different IDEs (VS Code vs PyCharm)
- ❌ +0% Different themes (Light vs Dark)
- **Total: ~25-35%** (with random factor)

**🧪 Test Algorithm Logic**:

Create two participants that should have HIGH compatibility:

**High Match Test**:
- Person A: Frontend, JavaScript, VS Code, Dark, Approach 5
- Person B: Backend, JavaScript, VS Code, Dark, Approach 6

**Expected Score**: ~90%
- +30% Complementary roles
- +20% Same language
- +20% Similar approach
- +10% Same IDE
- +10% Same theme

---

## 🐛 Common Issues & Solutions

### Issue: "ModuleNotFoundError: No module named 'django'"

**Solution**:
```bash
# Make sure virtual environment is activated
cd backend
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r ../requirements.txt
```

---

### Issue: "relation 'api_participant' does not exist"

**Solution**:
```bash
# Run migrations
cd backend
python manage.py makemigrations
python manage.py migrate
```

---

### Issue: Frontend shows "Network Error"

**Causes & Solutions**:

1. **Backend not running**
   ```bash
   # Check if backend is running on port 8000
   curl http://localhost:8000/api/
   # Should return something, not connection error
   ```

2. **CORS not configured**
   - Check `backend/core/settings.py`
   - Verify `CORS_ALLOWED_ORIGINS` includes `http://localhost:5173`

3. **Wrong API URL**
   - Check `frontend/src/api.js`
   - Verify `baseURL: 'http://localhost:8000/api'`

---

### Issue: "Email already exists"

**Solution**:
```bash
# Clear database (development only!)
cd backend
python manage.py flush
# Type 'yes' to confirm
```

Or use different email addresses.

---

### Issue: Matches don't appear after generation

**Solutions**:

1. **Check backend logs** (Terminal 1)
   - Look for errors in Django console

2. **Verify data in database**
   ```bash
   cd backend
   python manage.py shell
   ```
   ```python
   from api.models import Participant, Match
   print(Participant.objects.count())  # Should be > 0
   print(Match.objects.count())        # Should be > 0 after generation
   ```

3. **Refresh frontend page**
   - Hard refresh: `Ctrl+Shift+R`

---

### Issue: Styles not loading

**Solution**:
```bash
cd frontend
npm install
npm run dev
```

Check browser console (F12) for errors.

---

## ✅ Final Verification Checklist

### Backend ✅
- [ ] Django server running on port 8000
- [ ] Can access http://localhost:8000/admin
- [ ] Migrations applied successfully
- [ ] Can register participants via API
- [ ] Can retrieve participant data via API

### Frontend ✅
- [ ] Vite server running on port 5173
- [ ] Homepage loads with correct styling
- [ ] Registration form works through all 4 steps
- [ ] Dashboard shows waiting state initially
- [ ] Admin panel displays correctly

### Integration ✅
- [ ] Frontend can communicate with backend
- [ ] Registration creates participant in database
- [ ] Dashboard polls for match status
- [ ] Admin can generate matches
- [ ] Matches appear in both admin panel and dashboards
- [ ] Compatibility scores are reasonable (0-100%)

### User Experience ✅
- [ ] All animations work smoothly
- [ ] Forms validate input correctly
- [ ] Error messages display when appropriate
- [ ] Success messages confirm actions
- [ ] Navigation between pages works
- [ ] Responsive design works on different screen sizes

---

## 📊 Performance Benchmarks

**Expected Performance**:

| Action | Expected Time |
|--------|---------------|
| Homepage load | < 1 second |
| Registration submit | < 2 seconds |
| Dashboard load | < 1 second |
| Generate matches (10 participants) | < 3 seconds |
| Generate matches (100 participants) | < 10 seconds |
| API response time | < 500ms |

If performance is significantly slower, check:
- Database connection (Supabase region)
- Network issues
- Console errors

---

## 🎓 Understanding the Algorithm

### Compatibility Calculation Breakdown

```python
def calculate_compatibility(p1, p2):
    score = 0
    
    # 1. Role Compatibility (max 30%)
    if roles_are_complementary(p1.role, p2.role):
        score += 30
    elif p1.role == p2.role:
        score += 15  # Same role gets partial credit
    
    # 2. Language Match (max 20%)
    if p1.preferred_language == p2.preferred_language:
        score += 20
    
    # 3. Working Approach (max 20%)
    approach_diff = abs(p1.approach_score - p2.approach_score)
    if approach_diff <= 2:
        score += 20
    elif approach_diff <= 4:
        score += 10
    
    # 4. IDE Match (max 10%)
    if p1.ide == p2.ide:
        score += 10
    
    # 5. Theme Match (max 10%)
    if p1.theme_preference == p2.theme_preference:
        score += 10
    
    # Add small random factor (0-5%)
    score += random(0, 5)
    
    return min(score, 100)  # Cap at 100%
```

**Complementary Roles**:
- Frontend ↔ Backend
- Frontend ↔ Full Stack
- Backend ↔ Full Stack
- AI/ML ↔ Backend
- AI/ML ↔ Full Stack

---

## 🎉 Success!

If all tests pass, congratulations! You have a fully functional Match Matrix application ready for your event on **February 20, 2026**.

### Next Steps:

1. **Customize**: Change colors, add features
2. **Test with real data**: Have friends register
3. **Prepare for event**: Clear database before event day
4. **Monitor**: Watch admin panel during event
5. **Enjoy**: See students get matched!

---

## 📞 Need Help?

- Check `README.md` for detailed documentation
- Check `QUICKSTART.md` for setup help
- Check `VSCODE_SETUP.md` for VS Code tips
- Check browser console (F12) for frontend errors
- Check terminal for backend errors
- Check this guide for specific test failures

---

**Last Updated**: February 2026  
**Match Matrix Version**: 1.0.0  
**Status**: Production Ready ✅
