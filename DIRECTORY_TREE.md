# 📂 Complete Directory Structure - Match Matrix

## Visual Tree Structure

```
match-matrix/
│
├── 📄 README.md                              # 📖 Main documentation (setup, features, API)
├── 📄 QUICKSTART.md                          # ⚡ 5-minute setup guide
├── 📄 VSCODE_SETUP.md                        # 💻 VS Code configuration guide
├── 📄 FILE_STRUCTURE.md                      # 📋 This file - detailed structure
├── 📄 .gitignore                             # 🚫 Git ignore patterns
├── 📄 .env.example                           # 🔐 Environment variables template
├── 📄 requirements.txt                       # 🐍 Python dependencies (6 packages)
│
├── 📁 backend/                               # 🔷 Django Backend (Python)
│   │
│   ├── 📄 manage.py                          # ⚙️  Django CLI management script
│   │
│   ├── 📁 core/                              # ⚙️  Django Project Core
│   │   ├── 📄 __init__.py                    # Python package marker
│   │   ├── 📄 settings.py                    # ⭐ Django settings
│   │   │                                     #    - Supabase DATABASE_URL config
│   │   │                                     #    - CORS configuration
│   │   │                                     #    - REST Framework settings
│   │   │                                     #    - Installed apps
│   │   │
│   │   ├── 📄 urls.py                        # ⭐ Root URL routing
│   │   │                                     #    - Admin routes
│   │   │                                     #    - API routes (includes api.urls)
│   │   │
│   │   ├── 📄 wsgi.py                        # 🌐 WSGI server interface
│   │   └── 📄 asgi.py                        # 🌐 ASGI server interface
│   │
│   └── 📁 api/                               # 🎯 Main API Application
│       │
│       ├── 📄 __init__.py                    # Python package marker
│       │
│       ├── 📄 apps.py                        # App configuration
│       │
│       ├── 📄 models.py                      # ⭐ DATABASE MODELS
│       │                                     # 
│       │                                     # Participant Model:
│       │                                     #   - name (CharField)
│       │                                     #   - email (EmailField, unique)
│       │                                     #   - student_id (CharField, unique)
│       │                                     #   - role (CharField: frontend/backend/fullstack/aiml)
│       │                                     #   - preferred_language (CharField)
│       │                                     #   - ide (CharField)
│       │                                     #   - theme_preference (CharField: dark/light)
│       │                                     #   - approach_score (IntegerField: 1-10)
│       │                                     #   - is_matched (BooleanField)
│       │                                     #   - created_at (DateTimeField)
│       │                                     #
│       │                                     # Match Model:
│       │                                     #   - participant1 (ForeignKey)
│       │                                     #   - participant2 (ForeignKey)
│       │                                     #   - compatibility_percentage (DecimalField)
│       │                                     #   - created_at (DateTimeField)
│       │
│       ├── 📄 serializers.py                 # ⭐ DRF SERIALIZERS
│       │                                     # 
│       │                                     # ParticipantSerializer:
│       │                                     #   - Validates all participant fields
│       │                                     #   - Email uniqueness validation
│       │                                     #   - Approach score range validation
│       │                                     #
│       │                                     # MatchSerializer:
│       │                                     #   - Nested participant data
│       │                                     #   - Compatibility percentage
│       │                                     #
│       │                                     # ParticipantMatchSerializer:
│       │                                     #   - Combined view with match status
│       │
│       ├── 📄 views.py                       # ⭐ API VIEWS + ALGORITHM
│       │                                     #
│       │                                     # register_participant(POST):
│       │                                     #   - Creates new participant
│       │                                     #   - Validates unique email/student_id
│       │                                     #
│       │                                     # get_my_match(GET):
│       │                                     #   - Query param: email
│       │                                     #   - Returns match status and partner
│       │                                     #
│       │                                     # generate_matches(POST):
│       │                                     #   - ADMIN ONLY
│       │                                     #   - Clears existing matches
│       │                                     #   - Runs matching algorithm
│       │                                     #   - Creates optimal pairings
│       │                                     #
│       │                                     # calculate_compatibility():
│       │                                     #   - Core matching algorithm
│       │                                     #   - Scores based on:
│       │                                     #     * Complementary roles (+30%)
│       │                                     #     * Same language (+20%)
│       │                                     #     * Similar approach (+20%)
│       │                                     #     * Same IDE (+10%)
│       │                                     #     * Same theme (+10%)
│       │                                     #   - Returns 0-100% score
│       │                                     #
│       │                                     # get_all_participants(GET):
│       │                                     #   - Admin view of all participants
│       │                                     #
│       │                                     # get_all_matches(GET):
│       │                                     #   - Admin view of all matches
│       │
│       ├── 📄 urls.py                        # ⭐ API ROUTES
│       │                                     #
│       │                                     # Public Routes:
│       │                                     #   POST   /api/register/
│       │                                     #   GET    /api/my-match/?email={}
│       │                                     #
│       │                                     # Admin Routes:
│       │                                     #   POST   /api/admin/generate-matches/
│       │                                     #   GET    /api/admin/participants/
│       │                                     #   GET    /api/admin/matches/
│       │
│       ├── 📄 admin.py                       # 🔧 Django Admin Configuration
│       │                                     #   - ParticipantAdmin (list, search, filter)
│       │                                     #   - MatchAdmin (list, readonly fields)
│       │
│       └── 📁 migrations/                    # 📊 Database Migrations
│           └── 📄 __init__.py                #   - Auto-generated by Django
│                                             #   - Run: python manage.py makemigrations
│                                             #   - Apply: python manage.py migrate
│
└── 📁 frontend/                              # 🔶 React Frontend (JavaScript)
    │
    ├── 📄 package.json                       # ⭐ NODE DEPENDENCIES
    │                                         #
    │                                         # Dependencies:
    │                                         #   - react: ^18.2.0
    │                                         #   - react-dom: ^18.2.0
    │                                         #   - react-router-dom: ^6.21.0
    │                                         #   - axios: ^1.6.5
    │                                         #
    │                                         # DevDependencies:
    │                                         #   - vite: ^5.0.8
    │                                         #   - tailwindcss: ^3.4.0
    │                                         #   - autoprefixer: ^10.4.16
    │                                         #   - postcss: ^8.4.32
    │                                         #   - @vitejs/plugin-react: ^4.2.1
    │                                         #
    │                                         # Scripts:
    │                                         #   - npm run dev: Start dev server
    │                                         #   - npm run build: Production build
    │                                         #   - npm run preview: Preview build
    │
    ├── 📄 vite.config.js                     # ⚡ Vite Configuration
    │                                         #   - React plugin
    │                                         #   - Dev server port: 5173
    │                                         #   - Proxy: /api → http://localhost:8000
    │
    ├── 📄 tailwind.config.js                 # 🎨 Tailwind CSS Configuration
    │                                         #   - Custom colors (matrix-green, etc.)
    │                                         #   - Custom fonts (Space Mono, JetBrains Mono)
    │                                         #   - Custom animations
    │
    ├── 📄 postcss.config.js                  # 🎨 PostCSS Configuration
    │                                         #   - Tailwind CSS plugin
    │                                         #   - Autoprefixer plugin
    │
    ├── 📄 index.html                         # 📄 HTML Entry Point
    │                                         #   - Root div: <div id="root"></div>
    │                                         #   - Loads: /src/main.jsx
    │
    └── 📁 src/                               # 💻 Source Code
        │
        ├── 📄 main.jsx                       # 🚀 React Entry Point
        │                                     #   - Imports React, ReactDOM
        │                                     #   - Renders <App /> component
        │                                     #   - Imports index.css
        │
        ├── 📄 App.jsx                        # ⭐ MAIN APP COMPONENT
        │                                     #
        │                                     # React Router Setup:
        │                                     #   - <BrowserRouter>
        │                                     #   - Routes:
        │                                     #     * /              → Home
        │                                     #     * /register      → RegisterQuiz
        │                                     #     * /dashboard     → Dashboard
        │                                     #     * /admin         → Admin
        │
        ├── 📄 index.css                      # 🎨 Global Styles
        │                                     #   - Tailwind imports
        │                                     #   - Custom fonts (Google Fonts)
        │                                     #   - Custom scrollbar styling
        │                                     #   - Selection styling
        │
        ├── 📄 api.js                         # ⭐ AXIOS API CONFIGURATION
        │                                     #
        │                                     # Axios Instance:
        │                                     #   - baseURL: http://localhost:8000/api
        │                                     #   - timeout: 10000ms
        │                                     #   - Content-Type: application/json
        │                                     #
        │                                     # API Functions:
        │                                     #   participantAPI.register(data)
        │                                     #   participantAPI.getMyMatch(email)
        │                                     #   adminAPI.generateMatches()
        │                                     #   adminAPI.getAllParticipants()
        │                                     #   adminAPI.getAllMatches()
        │
        └── 📁 pages/                         # 📄 React Page Components
            │
            ├── 📄 Home.jsx                   # ⭐ HOME PAGE (Landing)
            │                                 #
            │                                 # Features:
            │                                 #   - Hero section with Matrix branding
            │                                 #   - Animated grid background
            │                                 #   - Floating Matrix particles
            │                                 #   - Event date banner
            │                                 #   - "START QUIZ" CTA button
            │                                 #   - Info cards (3 steps)
            │                                 #   - Mouse-reactive effects
            │                                 #
            │                                 # Design:
            │                                 #   - Dark theme (#0a0e1a)
            │                                 #   - Neon green accents (#00ff88)
            │                                 #   - Gradient text effects
            │                                 #   - CSS animations
            │
            ├── 📄 RegisterQuiz.jsx           # ⭐ REGISTRATION QUIZ
            │                                 #
            │                                 # Multi-Step Form (4 steps):
            │                                 #
            │                                 # Step 1 - Basic Information:
            │                                 #   - Full Name (input)
            │                                 #   - Email Address (input)
            │                                 #   - Student ID (input)
            │                                 #
            │                                 # Step 2 - Tech Role:
            │                                 #   - Frontend Developer (button)
            │                                 #   - Backend Developer (button)
            │                                 #   - Full Stack Developer (button)
            │                                 #   - AI/ML Engineer (button)
            │                                 #
            │                                 # Step 3 - Tech Stack:
            │                                 #   - Preferred Language (dropdown)
            │                                 #   - Preferred IDE (dropdown)
            │                                 #
            │                                 # Step 4 - Working Style:
            │                                 #   - Theme Preference (Dark/Light)
            │                                 #   - Approach Score (1-10 slider)
            │                                 #
            │                                 # Features:
            │                                 #   - Progress bar
            │                                 #   - Form validation
            │                                 #   - Step navigation
            │                                 #   - Error handling
            │                                 #   - Saves email to localStorage
            │                                 #   - Redirects to dashboard
            │
            ├── 📄 Dashboard.jsx              # ⭐ DASHBOARD (Match Results)
            │                                 #
            │                                 # States:
            │                                 #
            │                                 # 1. Loading State:
            │                                 #   - Spinner animation
            │                                 #   - "Loading your data..."
            │                                 #
            │                                 # 2. Waiting State:
            │                                 #   - ⏳ Hourglass icon
            │                                 #   - "Finding Your Match..."
            │                                 #   - Shows user profile card
            │                                 #   - Auto-polls every 5 seconds
            │                                 #
            │                                 # 3. Match Found State:
            │                                 #   - 🎉 Success banner
            │                                 #   - Confetti animation
            │                                 #   - Circular compatibility meter
            │                                 #   - Two profile cards (you + partner)
            │                                 #   - Partner contact info
            │                                 #
            │                                 # Features:
            │                                 #   - Real-time polling
            │                                 #   - Animated score reveal
            │                                 #   - Responsive grid layout
            │                                 #   - Logout button
            │
            └── 📄 Admin.jsx                  # ⭐ ADMIN PANEL
                                              #
                                              # Features:
                                              #
                                              # Statistics Dashboard:
                                              #   - Total Participants
                                              #   - Matched Count
                                              #   - Unmatched Count
                                              #   - Total Matches
                                              #
                                              # Generate Matches Section:
                                              #   - "Generate Matches" button
                                              #   - Confirmation dialog
                                              #   - Loading state
                                              #   - Success/Error messages
                                              #   - Last generation stats
                                              #
                                              # Participants Table:
                                              #   - Name, Student ID
                                              #   - Role, Language
                                              #   - Match Status
                                              #   - Filterable/Sortable
                                              #
                                              # Matches List:
                                              #   - Pair cards
                                              #   - Compatibility scores
                                              #   - Numbered ranking
                                              #
                                              # Actions:
                                              #   - Auto-refresh data
                                              #   - Navigate to home

```

---

## 📊 File Statistics

### Backend Files (13 total)

| Category | Files | Lines of Code |
|----------|-------|---------------|
| Configuration | 4 | ~250 |
| Models | 1 | ~80 |
| Views | 1 | ~250 |
| Serializers | 1 | ~80 |
| URLs | 2 | ~30 |
| Admin | 1 | ~40 |
| Management | 1 | ~20 |
| **Total** | **11** | **~750** |

### Frontend Files (15 total)

| Category | Files | Lines of Code |
|----------|-------|---------------|
| Configuration | 5 | ~150 |
| Pages | 4 | ~1,800 |
| Components | 2 | ~50 |
| API | 1 | ~50 |
| Styles | 1 | ~80 |
| **Total** | **13** | **~2,130** |

### Documentation Files (5 total)

| File | Purpose | Size |
|------|---------|------|
| README.md | Main documentation | ~8 KB |
| QUICKSTART.md | Setup guide | ~6 KB |
| VSCODE_SETUP.md | VS Code guide | ~12 KB |
| FILE_STRUCTURE.md | This file | ~8 KB |
| .env.example | Config template | ~0.2 KB |

---

## 🔑 Key File Interactions

### User Registration Flow

```
User Browser
    ↓ (fills form)
RegisterQuiz.jsx
    ↓ (POST /api/register/)
api.js (Axios)
    ↓
views.py → register_participant()
    ↓
serializers.py → ParticipantSerializer
    ↓
models.py → Participant.save()
    ↓
Supabase PostgreSQL Database
    ↓ (return success)
Dashboard.jsx
```

### Matching Algorithm Flow

```
Admin Browser
    ↓ (clicks "Generate Matches")
Admin.jsx
    ↓ (POST /api/admin/generate-matches/)
api.js (Axios)
    ↓
views.py → generate_matches()
    ↓ (for each pair)
calculate_compatibility()
    ↓ (scores: role, language, approach, IDE, theme)
Match.objects.create()
    ↓
Supabase PostgreSQL Database
    ↓ (return matches)
Admin.jsx (shows results)
```

### Dashboard Match Check Flow

```
User Browser
    ↓ (opens dashboard)
Dashboard.jsx
    ↓ (every 5 seconds)
api.js → getMyMatch(email)
    ↓ (GET /api/my-match/?email=...)
views.py → get_my_match()
    ↓
Match.objects.filter(participant)
    ↓ (if match found)
Dashboard.jsx
    ↓ (show partner + score)
Circular Progress Animation
```

---

## 🎯 Critical File Relationships

### Backend Dependencies

```
settings.py
    ├── Imports api app
    ├── Configures DATABASE_URL
    └── Enables CORS for frontend

urls.py (core)
    └── Includes api.urls

urls.py (api)
    └── Maps to views functions

views.py
    ├── Uses models (Participant, Match)
    ├── Uses serializers
    └── Implements algorithm

models.py
    └── Defines database schema

serializers.py
    └── Validates model data
```

### Frontend Dependencies

```
index.html
    └── Loads main.jsx

main.jsx
    ├── Imports App.jsx
    └── Imports index.css

App.jsx
    ├── Uses React Router
    └── Imports all page components

Pages (Home, RegisterQuiz, Dashboard, Admin)
    └── Import api.js for backend calls

api.js
    └── Axios instance configured to backend URL

tailwind.config.js
    └── Used by index.css
```

---

## 📝 File Naming Conventions

### Backend (Python/Django)

- **Snake_case**: `models.py`, `views.py`, `calculate_compatibility()`
- **PascalCase**: `Participant`, `Match`, `ParticipantSerializer`
- **Lowercase**: Folders like `api/`, `core/`

### Frontend (JavaScript/React)

- **PascalCase**: `App.jsx`, `Home.jsx`, `RegisterQuiz.jsx`
- **camelCase**: `api.js`, `handleSubmit()`, `matchData`
- **kebab-case**: CSS classes like `text-matrix-green`

---

## 🔍 Finding Files Quickly

### In VS Code:

```
Ctrl+P → Quick file open
    Type: "Home" → Home.jsx
    Type: "models" → models.py
    Type: "settings" → settings.py

Ctrl+Shift+F → Search in files
    Search: "calculate_compatibility"
    Search: "register_participant"
```

### By Purpose:

```
Want to change...                 Edit this file...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Database fields                   backend/api/models.py
Matching algorithm                backend/api/views.py
API endpoints                     backend/api/urls.py
Form questions                    frontend/src/pages/RegisterQuiz.jsx
Design colors                     frontend/tailwind.config.js
Landing page                      frontend/src/pages/Home.jsx
Match display                     frontend/src/pages/Dashboard.jsx
Admin features                    frontend/src/pages/Admin.jsx
```

---

## 📦 File Size Reference

```
Largest Files:
  1. RegisterQuiz.jsx         ~650 lines
  2. Dashboard.jsx            ~480 lines
  3. views.py                 ~250 lines
  4. Home.jsx                 ~240 lines
  5. Admin.jsx                ~210 lines

Smallest Files:
  1. __init__.py              0 lines
  2. .env.example             4 lines
  3. postcss.config.js        5 lines
  4. urls.py (api)            18 lines
  5. apps.py                  7 lines
```

---

## 🎨 Asset/Resource Files

### Fonts (loaded from Google Fonts)

- **Space Mono** (400, 700)
- **JetBrains Mono** (400, 700)

### Colors (defined in tailwind.config.js)

- `matrix-green`: #00ff88
- `matrix-cyan`: #00d9ff
- `matrix-purple`: #7b2ff7
- `matrix-dark`: #0a0e1a

### No Image Assets

This project uses:
- ✅ CSS gradients
- ✅ Unicode emojis (🎯, 🚀, etc.)
- ✅ SVG (for circular progress)
- ✅ CSS animations
- ❌ No image files needed

---

## 🔄 Build Output Locations

### Backend

```
backend/
  └── No build artifacts (Python interpreted)
      - __pycache__/ (gitignored)
      - db.sqlite3 (if not using Supabase, gitignored)
      - staticfiles/ (collectstatic output, gitignored)
```

### Frontend

```
frontend/
  ├── node_modules/ (gitignored)
  └── dist/ (production build, gitignored)
      ├── index.html
      ├── assets/
      │   ├── index.[hash].js
      │   └── index.[hash].css
      └── vite.svg
```

---

## ✅ Complete File Checklist

Copy this checklist to ensure you have all files:

**Backend (13 files)**
- [ ] backend/manage.py
- [ ] backend/core/__init__.py
- [ ] backend/core/settings.py ⭐
- [ ] backend/core/urls.py ⭐
- [ ] backend/core/wsgi.py
- [ ] backend/core/asgi.py
- [ ] backend/api/__init__.py
- [ ] backend/api/apps.py
- [ ] backend/api/models.py ⭐
- [ ] backend/api/serializers.py ⭐
- [ ] backend/api/views.py ⭐
- [ ] backend/api/urls.py ⭐
- [ ] backend/api/admin.py
- [ ] backend/api/migrations/__init__.py

**Frontend (13 files)**
- [ ] frontend/package.json ⭐
- [ ] frontend/vite.config.js
- [ ] frontend/tailwind.config.js
- [ ] frontend/postcss.config.js
- [ ] frontend/index.html
- [ ] frontend/src/main.jsx
- [ ] frontend/src/App.jsx ⭐
- [ ] frontend/src/index.css
- [ ] frontend/src/api.js ⭐
- [ ] frontend/src/pages/Home.jsx ⭐
- [ ] frontend/src/pages/RegisterQuiz.jsx ⭐
- [ ] frontend/src/pages/Dashboard.jsx ⭐
- [ ] frontend/src/pages/Admin.jsx ⭐

**Root (7 files)**
- [ ] README.md
- [ ] QUICKSTART.md
- [ ] VSCODE_SETUP.md
- [ ] FILE_STRUCTURE.md
- [ ] .gitignore
- [ ] .env.example
- [ ] requirements.txt ⭐

**Total: 33 files** (⭐ = 13 specifically requested files)

---

This structure provides a complete, organized, and scalable full-stack application!
