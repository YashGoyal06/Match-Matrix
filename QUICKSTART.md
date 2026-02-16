# 🚀 Quick Start Guide - Match Matrix

Get Match Matrix running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- [ ] Python 3.10 or higher (`python --version`)
- [ ] Node.js 18 or higher (`node --version`)
- [ ] npm (`npm --version`)
- [ ] A Supabase account (free tier works!)

## Step 1: Get Your Database Ready (2 minutes)

### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Click "New Project"
3. Fill in:
   - Project name: `match-matrix`
   - Database password: (create a strong password)
   - Region: (choose closest to you)
4. Wait for project to be created (~1 minute)
5. Go to **Settings** > **Database**
6. Find "Connection string" section
7. Copy the **URI** format (looks like: `postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres`)
8. Save this - you'll need it soon!

### Option B: Local PostgreSQL

If you prefer local PostgreSQL:
```bash
# Install PostgreSQL, then create database
createdb match_matrix
# Your DATABASE_URL will be: postgresql://localhost/match_matrix
```

## Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (this takes ~1 minute)
pip install -r ../requirements.txt

# Create .env file
echo "SECRET_KEY=django-insecure-dev-key-change-in-production" > .env
echo "DEBUG=True" >> .env
echo "DATABASE_URL=your-supabase-connection-string-here" >> .env

# IMPORTANT: Edit .env and replace the DATABASE_URL with your actual Supabase URL!
```

Now run migrations:

```bash
# Create database tables
python manage.py makemigrations
python manage.py migrate

# Create admin user (optional)
python manage.py createsuperuser
# Username: admin
# Email: admin@example.com
# Password: (your choice)
```

Start backend:

```bash
python manage.py runserver
```

✅ Backend should now be running on `http://localhost:8000`

Keep this terminal open!

## Step 3: Frontend Setup (1 minute)

Open a NEW terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (this takes ~30 seconds)
npm install

# Start development server
npm run dev
```

✅ Frontend should now be running on `http://localhost:5173`

## Step 4: Test It Out!

### Test as a Participant

1. Open browser to `http://localhost:5173`
2. Click "START QUIZ"
3. Fill in the registration form (4 steps)
4. You'll see "Waiting for Match"

### Register Multiple Participants

Open 3-4 incognito/private windows and register different participants with:
- Different roles (Frontend, Backend, Full Stack, AI/ML)
- Different programming languages
- Different approach scores

### Generate Matches (Admin)

1. Go to `http://localhost:5173/admin`
2. You'll see all registered participants
3. Click "GENERATE MATCHES"
4. Wait a moment
5. See the matches with compatibility scores!

### View Matches

1. Go back to each participant's dashboard
2. You'll now see "MATCH FOUND!" with:
   - Partner's information
   - Compatibility percentage
   - Contact email

## 🎉 Success!

You now have Match Matrix fully running!

## Common Issues & Solutions

### Issue: "ModuleNotFoundError: No module named 'django'"
**Solution**: Make sure you activated the virtual environment:
```bash
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

### Issue: "FATAL: password authentication failed"
**Solution**: Double-check your DATABASE_URL in .env file. Make sure you replaced `[YOUR-PASSWORD]` with your actual Supabase password.

### Issue: "Port 8000 already in use"
**Solution**: Kill existing Django process:
```bash
# Find process
lsof -ti:8000
# Kill it
kill -9 <PID>
```

### Issue: Frontend shows "Network Error"
**Solution**: 
1. Make sure backend is running on port 8000
2. Check CORS settings in `backend/core/settings.py`

## Next Steps

- **Customize Colors**: Edit `frontend/tailwind.config.js`
- **Add Features**: Modify views in `backend/api/views.py`
- **Change Algorithm**: Edit `calculate_compatibility()` function
- **Deploy**: See main README.md for deployment instructions

## Need Help?

Check the main [README.md](README.md) for detailed documentation!

---

Happy Matching! 🎯
