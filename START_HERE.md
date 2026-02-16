# 🎯 START HERE - Match Matrix Setup Guide

Welcome to **Match Matrix** - your complete Tech Compatibility & Collaboration event website!

---

## 📦 What You Have

This is a **complete, production-ready full-stack web application** with:

✅ **Backend (Django + DRF)** - 13 files  
✅ **Frontend (React + Vite + Tailwind)** - 13 files  
✅ **Documentation** - 7 comprehensive guides  
✅ **Setup Scripts** - Automated installation  
✅ **Total: 37 files** - Everything you need!

---

## 🚀 Quick Start (Choose Your Path)

### Path 1: Automated Setup (Recommended) ⚡

**For macOS/Linux**:
```bash
bash setup.sh
```

**For Windows**:
```batch
setup.bat
```

The script will:
1. Check prerequisites (Python, Node.js)
2. Create virtual environment
3. Install all dependencies
4. Set up database
5. Guide you through .env configuration

**Then manually start the servers (2 terminals)**:

Terminal 1:
```bash
cd backend
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
python manage.py runserver
```

Terminal 2:
```bash
cd frontend
npm run dev
```

Open: **http://localhost:5173** 🎉

---

### Path 2: Manual Setup (Step-by-Step) 📖

Follow: **[QUICKSTART.md](QUICKSTART.md)** - Detailed 5-minute guide

---

### Path 3: VS Code Setup (For Developers) 💻

Follow: **[VSCODE_SETUP.md](VSCODE_SETUP.md)** - Complete VS Code configuration

---

## 📚 Documentation Guide

We have extensive documentation to help you:

### 🎯 For Getting Started:

1. **[START_HERE.md](START_HERE.md)** ← You are here!
   - Choose your setup path
   - Quick navigation

2. **[QUICKSTART.md](QUICKSTART.md)** - 5 Minutes ⚡
   - Prerequisites
   - Supabase setup
   - Backend setup
   - Frontend setup
   - First test

3. **[setup.sh](setup.sh)** / **[setup.bat](setup.bat)** - Automated
   - One-command setup
   - Checks prerequisites
   - Installs everything

### 💻 For Development:

4. **[VSCODE_SETUP.md](VSCODE_SETUP.md)** - Complete Guide
   - VS Code configuration
   - Extensions to install
   - Workspace settings
   - Terminal setup
   - Debugging
   - Shortcuts
   - Development workflow

5. **[DIRECTORY_TREE.md](DIRECTORY_TREE.md)** - File Reference
   - Complete file structure
   - File descriptions
   - Code locations
   - Line counts
   - Finding files quickly

### 📖 For Understanding:

6. **[README.md](README.md)** - Main Documentation
   - Project overview
   - Features
   - Tech stack
   - API endpoints
   - Deployment
   - Contributing

7. **[FILE_STRUCTURE.md](FILE_STRUCTURE.md)** - Architecture
   - Database schema
   - API design
   - Component structure
   - Design system
   - Dependencies

### ✅ For Verification:

8. **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Complete Testing
   - Pre-setup checklist
   - Component tests
   - API tests
   - Algorithm verification
   - Troubleshooting
   - Performance benchmarks

---

## 🎓 What's Inside

### Backend (Django) 🔷

**Key Files**:
- `backend/core/settings.py` - Configuration (Supabase, CORS)
- `backend/api/models.py` - Database models (Participant, Match)
- `backend/api/views.py` - API endpoints + matching algorithm
- `backend/api/serializers.py` - Data validation
- `backend/api/urls.py` - API routes

**Database Models**:
- **Participant**: Name, Email, Student ID, Role, Language, IDE, Theme, Approach Score
- **Match**: Links two participants with compatibility percentage

**Matching Algorithm**:
- Complementary roles (+30%)
- Same language (+20%)
- Similar approach (+20%)
- Same IDE (+10%)
- Same theme (+10%)

### Frontend (React) 🔶

**Key Pages**:
- `frontend/src/pages/Home.jsx` - Landing page with Matrix design
- `frontend/src/pages/RegisterQuiz.jsx` - 4-step registration form
- `frontend/src/pages/Dashboard.jsx` - Match results with animations
- `frontend/src/pages/Admin.jsx` - Admin panel for match generation

**Features**:
- Matrix-inspired design (dark theme, neon green)
- Animated backgrounds
- Real-time polling
- Responsive layout
- Form validation

---

## 📋 Prerequisites

Before you start, you need:

- [ ] **Python 3.10+** ([Download](https://python.org))
- [ ] **Node.js 18+** ([Download](https://nodejs.org))
- [ ] **npm** (comes with Node.js)
- [ ] **Supabase Account** ([Sign up free](https://supabase.com))
- [ ] **Code Editor** (VS Code recommended)

**Check versions**:
```bash
python --version  # Should be 3.10+
node --version    # Should be 18+
npm --version     # Should be 9+
```

---

## 🎯 Your First Run

After setup, test the app:

### 1. Homepage Test
- Open: http://localhost:5173
- See: "MATCH MATRIX" with animations
- Click: "START QUIZ" button

### 2. Register Test
- Fill in all 4 steps
- Submit registration
- See: "Waiting for Match" dashboard

### 3. Register More Users
- Open 3-4 incognito windows
- Register different participants
- Use different roles, languages, etc.

### 4. Generate Matches
- Go to: http://localhost:5173/admin
- Click: "Generate Matches"
- See: All participants matched

### 5. View Matches
- Check each participant's dashboard
- See: Match found with partner info
- See: Compatibility percentage

---

## 🗺️ Project Structure

```
match-matrix/
├── 📂 backend/              # Django API
│   ├── 📂 core/             # Settings & config
│   └── 📂 api/              # Models, views, serializers
│
├── 📂 frontend/             # React app
│   └── 📂 src/
│       ├── 📂 pages/        # Home, Register, Dashboard, Admin
│       └── api.js           # API calls
│
├── 📄 README.md             # Main docs
├── 📄 QUICKSTART.md         # Quick setup
├── 📄 VSCODE_SETUP.md       # VS Code guide
├── 📄 TESTING_GUIDE.md      # Testing checklist
├── 📄 setup.sh              # Unix setup script
└── 📄 setup.bat             # Windows setup script
```

---

## 🔧 Common Commands

### Backend (Terminal 1)
```bash
cd backend
source venv/bin/activate        # Activate venv
python manage.py runserver      # Start server
python manage.py migrate        # Run migrations
python manage.py createsuperuser # Create admin
```

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🆘 Need Help?

### Quick Fixes:

**"Module not found"**:
```bash
cd backend
pip install -r ../requirements.txt
```

**"Database error"**:
```bash
cd backend
python manage.py migrate
```

**"Frontend blank"**:
```bash
cd frontend
npm install
npm run dev
```

**"CORS error"**:
- Check `backend/core/settings.py`
- Verify `CORS_ALLOWED_ORIGINS`

### Detailed Help:

1. **Setup issues**: See [QUICKSTART.md](QUICKSTART.md)
2. **VS Code issues**: See [VSCODE_SETUP.md](VSCODE_SETUP.md)
3. **Testing issues**: See [TESTING_GUIDE.md](TESTING_GUIDE.md)
4. **Code questions**: See [README.md](README.md)

---

## 📊 File Index

### Must Read First:
1. ⭐ **START_HERE.md** (this file)
2. ⭐ **QUICKSTART.md** (5-minute setup)

### For Setup:
3. **setup.sh** (Unix automated setup)
4. **setup.bat** (Windows automated setup)
5. **.env.example** (Environment template)

### For Development:
6. **VSCODE_SETUP.md** (VS Code complete guide)
7. **DIRECTORY_TREE.md** (File structure)
8. **FILE_STRUCTURE.md** (Architecture)

### For Reference:
9. **README.md** (Main documentation)
10. **TESTING_GUIDE.md** (Verification checklist)

### Source Code:
11. **backend/** (13 Python files)
12. **frontend/** (13 JavaScript files)

---

## 🎓 Learning Path

### Beginner Path:
1. Read START_HERE.md (you are here)
2. Run setup.sh / setup.bat
3. Follow QUICKSTART.md
4. Test with TESTING_GUIDE.md
5. Read README.md for features

### Developer Path:
1. Read START_HERE.md
2. Setup with VSCODE_SETUP.md
3. Study FILE_STRUCTURE.md
4. Study DIRECTORY_TREE.md
5. Modify code and test

### Advanced Path:
1. Read all documentation
2. Understand algorithm in views.py
3. Customize frontend design
4. Add new features
5. Deploy to production

---

## 🎯 Event Day Checklist

For February 20, 2026:

- [ ] Clear database: `python manage.py flush`
- [ ] Test registration flow
- [ ] Test admin panel
- [ ] Prepare Supabase
- [ ] Have backup plan
- [ ] Monitor both servers
- [ ] Have this guide handy

---

## 🌟 Features Highlights

### For Students:
✨ Beautiful Matrix-inspired UI  
✨ Easy 4-step registration  
✨ Real-time match updates  
✨ Compatibility score visualization  
✨ Partner contact info  

### For Organizers:
🎯 Admin panel  
🎯 One-click match generation  
🎯 Statistics dashboard  
🎯 Participant management  
🎯 Match ranking  

### Technical:
⚡ React 18 with Vite  
⚡ Django 5 + DRF  
⚡ Supabase PostgreSQL  
⚡ Tailwind CSS  
⚡ Real-time polling  

---

## 📞 Support

If you get stuck:

1. **Check documentation** (10 files!)
2. **Check console** (Browser F12)
3. **Check terminal** (Backend errors)
4. **Re-read QUICKSTART.md**
5. **Try TESTING_GUIDE.md**

---

## 🎉 You're Ready!

You have everything you need to run Match Matrix:

✅ Complete backend (Django + DRF)  
✅ Complete frontend (React + Vite)  
✅ Matching algorithm  
✅ Admin panel  
✅ Beautiful UI  
✅ Comprehensive docs  
✅ Setup scripts  
✅ Testing guides  

**Choose your path above and get started!** 🚀

---

**Project**: Match Matrix  
**Event Date**: February 20, 2026  
**Organized by**: Matrix Club  
**Version**: 1.0.0  
**Status**: Production Ready ✅

**Happy Coding! 🎯✨**
