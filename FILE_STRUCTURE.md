# Match Matrix - Complete File Structure

## 📁 Project Overview

```
match-matrix/
├── 📄 README.md                    # Main documentation
├── 📄 QUICKSTART.md                # Quick setup guide
├── 📄 .gitignore                   # Git ignore rules
├── 📄 .env.example                 # Environment variables template
├── 📄 requirements.txt             # Python dependencies
│
├── 📂 backend/                     # Django Backend
│   ├── 📄 manage.py                # Django management script
│   │
│   ├── 📂 core/                    # Django project core
│   │   ├── 📄 __init__.py
│   │   ├── 📄 settings.py          # Django settings (CORS, DB, etc.)
│   │   ├── 📄 urls.py              # Main URL routing
│   │   ├── 📄 wsgi.py              # WSGI configuration
│   │   └── 📄 asgi.py              # ASGI configuration
│   │
│   └── 📂 api/                     # Main API application
│       ├── 📄 __init__.py
│       ├── 📄 apps.py              # App configuration
│       ├── 📄 models.py            # Participant & Match models
│       ├── 📄 serializers.py       # DRF serializers
│       ├── 📄 views.py             # API views + matching algorithm
│       ├── 📄 urls.py              # API routes
│       ├── 📄 admin.py             # Django admin config
│       └── 📂 migrations/          # Database migrations
│           └── 📄 __init__.py
│
└── 📂 frontend/                    # React Frontend
    ├── 📄 package.json             # Node dependencies
    ├── 📄 vite.config.js           # Vite configuration
    ├── 📄 tailwind.config.js       # Tailwind CSS config
    ├── 📄 postcss.config.js        # PostCSS config
    ├── 📄 index.html               # HTML entry point
    │
    └── 📂 src/                     # Source code
        ├── 📄 main.jsx             # React entry point
        ├── 📄 App.jsx              # Main app component (routing)
        ├── 📄 index.css            # Global styles
        ├── 📄 api.js               # Axios API configuration
        │
        └── 📂 pages/               # Page components
            ├── 📄 Home.jsx         # Landing page with hero section
            ├── 📄 RegisterQuiz.jsx # Multi-step registration form
            ├── 📄 Dashboard.jsx    # Match results display
            └── 📄 Admin.jsx        # Admin panel for match generation
```

## 📋 File Purposes

### Backend Files

#### Core Configuration
- **settings.py**: Django settings including Supabase DB, CORS, REST Framework
- **urls.py**: Main URL routing, includes API routes
- **wsgi.py/asgi.py**: Server gateway interfaces

#### API Application
- **models.py**: 
  - `Participant`: Stores user data (name, email, role, preferences, approach_score)
  - `Match`: Links two participants with compatibility_percentage
  
- **views.py**:
  - `register_participant()`: POST endpoint for registration
  - `get_my_match()`: GET endpoint to retrieve user's match
  - `generate_matches()`: POST endpoint (admin) to run matching algorithm
  - `calculate_compatibility()`: The core algorithm that scores pairs
  
- **serializers.py**: DRF serializers for data validation and formatting
- **urls.py**: API endpoint definitions
- **admin.py**: Django admin interface configuration

### Frontend Files

#### Configuration
- **vite.config.js**: Vite bundler settings, proxy configuration
- **tailwind.config.js**: Custom colors (matrix-green, matrix-cyan, etc.)
- **postcss.config.js**: PostCSS processing
- **package.json**: Dependencies (React, React Router, Axios, Tailwind)

#### Source Code
- **main.jsx**: React app initialization
- **App.jsx**: React Router setup with routes
- **api.js**: Axios instance with API endpoints
- **index.css**: Global styles, custom fonts, Tailwind imports

#### Pages
- **Home.jsx**: 
  - Hero section with Matrix-inspired design
  - Animated background grid
  - Event information
  - "START QUIZ" CTA button
  
- **RegisterQuiz.jsx**:
  - Step 1: Basic info (name, email, student ID)
  - Step 2: Role selection (Frontend, Backend, etc.)
  - Step 3: Tech stack (language, IDE)
  - Step 4: Working style (theme, approach score)
  
- **Dashboard.jsx**:
  - Waiting state with polling
  - Match found state with compatibility visualization
  - Circular progress bar
  - Partner information cards
  - Contact details
  
- **Admin.jsx**:
  - Statistics overview
  - Generate matches button
  - Participant list table
  - Matches list with scores

## 🔧 Key Features in Code

### Matching Algorithm (`backend/api/views.py`)
```python
def calculate_compatibility(p1, p2):
    # +30% for complementary roles
    # +20% for same language
    # +20% for similar approach (within 2 points)
    # +10% for same IDE
    # +10% for same theme
    # Returns: 0-100% compatibility score
```

### Database Models
```python
# Participant model fields
- name, email, student_id
- role (frontend/backend/fullstack/aiml)
- preferred_language, ide
- theme_preference (dark/light)
- approach_score (1-10)
- is_matched (boolean)

# Match model fields
- participant1, participant2 (ForeignKeys)
- compatibility_percentage (Decimal)
```

### API Endpoints
```
POST   /api/register/                    # Register participant
GET    /api/my-match/?email={email}      # Get my match
POST   /api/admin/generate-matches/      # Generate all matches
GET    /api/admin/participants/          # List all participants
GET    /api/admin/matches/               # List all matches
```

## 🎨 Design System

### Colors (Tailwind Config)
- **matrix-green**: `#00ff88` - Primary accent
- **matrix-cyan**: `#00d9ff` - Secondary accent
- **matrix-purple**: `#7b2ff7` - Tertiary accent
- **matrix-dark**: `#0a0e1a` - Background

### Typography
- **Space Mono**: Headers and main text
- **JetBrains Mono**: Code snippets and technical data

### Components
- Animated grid backgrounds
- Floating particles
- Gradient buttons with hover effects
- Progress bars
- Circular compatibility meters

## 🚀 Running the Application

### Development
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Production
```bash
# Backend
python manage.py collectstatic
gunicorn core.wsgi:application

# Frontend
npm run build
# Deploy dist/ folder
```

## 📦 Dependencies

### Backend (requirements.txt)
- Django 5.0.1
- djangorestframework 3.14.0
- dj-database-url 2.1.0
- psycopg2-binary 2.9.9
- django-cors-headers 4.3.1

### Frontend (package.json)
- react 18.2.0
- react-router-dom 6.21.0
- axios 1.6.5
- tailwindcss 3.4.0
- vite 5.0.8

## 🔐 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=postgresql://user:pass@host:port/db
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
```

---

This structure provides a complete, production-ready full-stack application with clean separation of concerns, scalable architecture, and modern design patterns.
