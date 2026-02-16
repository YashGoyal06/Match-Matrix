# 🎯 Match Matrix - VS Code Setup Guide

## Complete Directory Structure

```
match-matrix/                           # Root project folder
│
├── 📄 README.md                        # Main documentation
├── 📄 QUICKSTART.md                    # Quick setup guide
├── 📄 .gitignore                       # Git ignore rules
├── 📄 .env.example                     # Environment variables template
├── 📄 requirements.txt                 # Python dependencies
│
├── 📂 backend/                         # Django Backend Application
│   ├── 📄 manage.py                    # Django CLI tool
│   │
│   ├── 📂 core/                        # Django Project Settings
│   │   ├── 📄 __init__.py
│   │   ├── 📄 settings.py              # ⭐ Main configuration (DB, CORS, Apps)
│   │   ├── 📄 urls.py                  # ⭐ Root URL routing
│   │   ├── 📄 wsgi.py                  # Production server interface
│   │   └── 📄 asgi.py                  # Async server interface
│   │
│   └── 📂 api/                         # Main API Application
│       ├── 📄 __init__.py
│       ├── 📄 apps.py                  # App configuration
│       ├── 📄 models.py                # ⭐ Participant & Match models
│       ├── 📄 serializers.py           # ⭐ DRF serializers
│       ├── 📄 views.py                 # ⭐ API endpoints + matching algorithm
│       ├── 📄 urls.py                  # ⭐ API routes
│       ├── 📄 admin.py                 # Django admin interface
│       └── 📂 migrations/              # Database migrations
│           └── 📄 __init__.py
│
└── 📂 frontend/                        # React Frontend Application
    ├── 📄 package.json                 # ⭐ Node dependencies
    ├── 📄 vite.config.js               # Vite bundler config
    ├── 📄 tailwind.config.js           # Tailwind CSS config
    ├── 📄 postcss.config.js            # PostCSS config
    ├── 📄 index.html                   # HTML entry point
    │
    └── 📂 src/                         # Source code
        ├── 📄 main.jsx                 # React app entry
        ├── 📄 App.jsx                  # ⭐ Main component + routing
        ├── 📄 index.css                # Global styles
        ├── 📄 api.js                   # ⭐ Axios API config
        │
        └── 📂 pages/                   # Page components
            ├── 📄 Home.jsx             # ⭐ Landing page
            ├── 📄 RegisterQuiz.jsx     # ⭐ Registration form
            ├── 📄 Dashboard.jsx        # ⭐ Match results
            └── 📄 Admin.jsx            # ⭐ Admin panel

⭐ = Files you specifically requested in your requirements
```

---

## 🚀 Step-by-Step VS Code Setup

### Step 1: Install Required Software

Before opening VS Code, ensure you have:

1. **Python 3.10+**
   ```bash
   python --version  # Should show 3.10 or higher
   ```

2. **Node.js 18+**
   ```bash
   node --version    # Should show 18.x or higher
   npm --version
   ```

3. **Git** (optional but recommended)
   ```bash
   git --version
   ```

4. **VS Code Extensions** (Install these):
   - Python (by Microsoft)
   - Pylance
   - Django (by Baptiste Darthenay)
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - Prettier - Code formatter
   - ESLint

### Step 2: Open Project in VS Code

1. **Download the project** from above (the `match-matrix` folder)

2. **Extract to a location** like:
   - Windows: `C:\Projects\match-matrix`
   - Mac/Linux: `~/Projects/match-matrix`

3. **Open in VS Code**:
   ```bash
   cd /path/to/match-matrix
   code .
   ```
   
   Or: File → Open Folder → Select `match-matrix`

### Step 3: Configure VS Code Workspace

Create a workspace settings file for better development experience:

**File**: `.vscode/settings.json` (create this folder and file in root)

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/backend/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "autopep8",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/__pycache__": true,
    "**/*.pyc": true,
    "**/node_modules": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Step 4: Set Up Backend (Django)

#### 4.1: Open Integrated Terminal in VS Code

Press `` Ctrl + ` `` (backtick) or View → Terminal

#### 4.2: Create Virtual Environment

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# You should see (venv) in your terminal prompt
```

#### 4.3: Install Python Dependencies

```bash
# Make sure venv is activated!
pip install --upgrade pip
pip install -r ../requirements.txt
```

This will install:
- Django 5.0.1
- Django REST Framework
- psycopg2-binary (PostgreSQL adapter)
- dj-database-url (Database URL parser)
- django-cors-headers (CORS support)

#### 4.4: Configure Environment Variables

```bash
# Create .env file in backend directory
# On Windows:
copy ..\.env.example .env

# On macOS/Linux:
cp ../.env.example .env
```

**Edit `backend/.env`** with your actual values:

```env
SECRET_KEY=django-insecure-your-secret-key-here-change-this
DEBUG=True
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres
```

**Get your Supabase DATABASE_URL**:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Settings → Database → Connection String → URI
4. Copy and paste into .env

#### 4.5: Run Django Migrations

```bash
# Still in backend/ directory with venv activated
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

#### 4.6: Start Django Server

```bash
python manage.py runserver
```

✅ Backend should now be running on `http://localhost:8000`

**Keep this terminal open!**

### Step 5: Set Up Frontend (React)

#### 5.1: Open New Terminal in VS Code

Click the `+` icon in the terminal panel or press `` Ctrl + Shift + ` ``

#### 5.2: Navigate to Frontend

```bash
cd frontend
```

#### 5.3: Install Node Dependencies

```bash
npm install
```

This will install:
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite
- And all dev dependencies

This takes about 1-2 minutes.

#### 5.4: Create Environment File (Optional)

```bash
# Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env
```

#### 5.5: Start Vite Development Server

```bash
npm run dev
```

✅ Frontend should now be running on `http://localhost:5173`

### Step 6: Verify Everything Works

You should now have **TWO terminals** running in VS Code:

**Terminal 1 (Backend)**:
```bash
(venv) backend$ python manage.py runserver
Starting development server at http://127.0.0.1:8000/
```

**Terminal 2 (Frontend)**:
```bash
frontend$ npm run dev
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:5173/
```

### Step 7: Test the Application

1. **Open Browser**: `http://localhost:5173`
2. **Click "START QUIZ"**: Register a participant
3. **Open Multiple Windows**: Register 3-4 different participants
4. **Go to Admin Panel**: `http://localhost:5173/admin`
5. **Click "Generate Matches"**: See the algorithm in action!
6. **View Dashboards**: Check each participant's dashboard to see matches

---

## 🎨 VS Code Layout Recommendations

### Recommended Layout:

```
┌─────────────────────────────────────────────────────┐
│  VS Code Title Bar                                  │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│  Explorer    │  Editor (Code Files)                 │
│  - backend/  │  ┌──────────────────────────────┐   │
│    - api/    │  │ views.py                      │   │
│    - core/   │  │                               │   │
│  - frontend/ │  │ def register_participant...   │   │
│    - src/    │  │                               │   │
│      - pages/│  └──────────────────────────────┘   │
│              │  ┌──────────────────────────────┐   │
│              │  │ Home.jsx (Tab)                │   │
│              │  │                               │   │
│              │  │ const Home = () => {...       │   │
│              │  │                               │   │
│              │  └──────────────────────────────┘   │
├──────────────┴──────────────────────────────────────┤
│  Terminal Panel (Split View)                        │
│  ┌─────────────────────┬─────────────────────────┐ │
│  │ Terminal 1: Backend │ Terminal 2: Frontend    │ │
│  │ (venv) python...    │ npm run dev            │ │
│  └─────────────────────┴─────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**To Split Terminal**:
- Right-click on terminal → Split Terminal
- Or click the split icon in terminal panel

---

## 🔧 Common VS Code Commands

### Django Commands (Terminal 1):

```bash
# Activate venv (if not active)
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Run server
python manage.py runserver

# Make migrations after model changes
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Open Django shell
python manage.py shell

# Access Django admin
# http://localhost:8000/admin
```

### React Commands (Terminal 2):

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Useful VS Code Shortcuts:

| Action | Shortcut |
|--------|----------|
| Open file | `Ctrl+P` |
| Command palette | `Ctrl+Shift+P` |
| Toggle terminal | `` Ctrl+` `` |
| New terminal | `` Ctrl+Shift+` `` |
| Split editor | `Ctrl+\` |
| Go to definition | `F12` |
| Find in files | `Ctrl+Shift+F` |
| Format document | `Shift+Alt+F` |
| Multi-cursor | `Alt+Click` |
| Comment line | `Ctrl+/` |

---

## 🐛 Debugging in VS Code

### Backend Debugging (Django)

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Django",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/backend/manage.py",
      "args": [
        "runserver",
        "8000"
      ],
      "django": true,
      "justMyCode": true
    }
  ]
}
```

**Usage**: 
- Set breakpoints in Python files (click left of line number)
- Press `F5` to start debugging
- Use Debug panel to step through code

### Frontend Debugging (React)

1. Install "Debugger for Chrome" extension
2. Set breakpoints in `.jsx` files
3. Use browser DevTools: `F12`
4. Use React DevTools browser extension

---

## 📁 Key Files to Edit

### When Working on Backend:

| File | Purpose | When to Edit |
|------|---------|--------------|
| `api/models.py` | Database schema | Adding fields to models |
| `api/views.py` | API logic | Changing algorithm, adding endpoints |
| `api/serializers.py` | Data validation | Modifying request/response format |
| `core/settings.py` | Configuration | Adding apps, changing CORS |
| `api/urls.py` | Routes | Adding new endpoints |

### When Working on Frontend:

| File | Purpose | When to Edit |
|------|---------|--------------|
| `pages/Home.jsx` | Landing page | Changing hero section |
| `pages/RegisterQuiz.jsx` | Registration form | Modifying quiz questions |
| `pages/Dashboard.jsx` | Match display | Changing result presentation |
| `pages/Admin.jsx` | Admin panel | Adding admin features |
| `App.jsx` | Routing | Adding new routes |
| `api.js` | API calls | Adding new endpoints |
| `tailwind.config.js` | Styling | Customizing colors/fonts |

---

## 🔄 Git Integration in VS Code

### Initialize Git (if not already done):

```bash
# In root directory
git init
git add .
git commit -m "Initial commit: Match Matrix project"
```

### VS Code Git Features:

- **Source Control Panel**: `Ctrl+Shift+G`
- **Stage changes**: Click `+` next to files
- **Commit**: Enter message and click ✓
- **View changes**: Click file in Source Control
- **Branch**: Click branch name in bottom-left

---

## 🎯 Development Workflow

### Typical Day Working on Match Matrix:

1. **Open VS Code** → Open `match-matrix` folder

2. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   source venv/bin/activate
   python manage.py runserver
   ```

3. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

4. **Make Changes**:
   - Edit backend: `api/views.py` for algorithm changes
   - Edit frontend: `pages/Dashboard.jsx` for UI changes
   - Save files (`Ctrl+S`)
   - See changes instantly (hot reload)

5. **Test Changes**:
   - Backend: Check API in browser or Postman
   - Frontend: See updates in browser immediately

6. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Updated matching algorithm"
   ```

---

## 📊 Project Statistics

```
Total Lines of Code: ~3,500+
- Backend: ~1,200 lines (Python)
- Frontend: ~2,000 lines (JavaScript/JSX)
- Config: ~300 lines (JSON/JS/CSS)

Total Files: 33
- Backend: 13 files
- Frontend: 15 files
- Documentation: 5 files

Dependencies:
- Python: 6 packages
- Node: 15+ packages
```

---

## 🎓 Learning Resources

### Django:
- Official Docs: https://docs.djangoproject.com
- DRF: https://www.django-rest-framework.org

### React:
- Official Docs: https://react.dev
- Vite: https://vitejs.dev

### Tailwind CSS:
- Docs: https://tailwindcss.com/docs

---

## 🆘 Troubleshooting

### VS Code won't recognize Python interpreter:

1. `Ctrl+Shift+P` → "Python: Select Interpreter"
2. Choose `./backend/venv/bin/python`

### Import errors in Python:

```bash
# Reinstall packages
pip install -r requirements.txt --force-reinstall
```

### Frontend not connecting to backend:

1. Check backend is running: `http://localhost:8000/api/`
2. Check CORS settings in `settings.py`
3. Verify `VITE_API_URL` in frontend `.env`

### Port already in use:

```bash
# Kill process on port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8000 | xargs kill -9
```

---

## ✅ Checklist: Is Everything Set Up?

- [ ] VS Code opened with `match-matrix` folder
- [ ] Python extensions installed
- [ ] React extensions installed
- [ ] Backend virtual environment created and activated
- [ ] Python dependencies installed (`pip install -r requirements.txt`)
- [ ] Database migrations run (`python manage.py migrate`)
- [ ] Backend server running on port 8000
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Frontend server running on port 5173
- [ ] Can access homepage at `http://localhost:5173`
- [ ] Can register a participant
- [ ] Can access admin panel and generate matches

If all checked ✅, you're ready to develop!

---

## 🚀 Next Steps

1. **Customize the Design**: Edit colors in `tailwind.config.js`
2. **Modify Algorithm**: Update `calculate_compatibility()` in `views.py`
3. **Add Features**: 
   - Email notifications
   - Profile pictures
   - Chat between matches
   - Event countdown timer
4. **Deploy**: 
   - Backend → Heroku/Railway
   - Frontend → Vercel/Netlify

---

**Happy Coding! 🎯✨**

For questions, check the main README.md or QUICKSTART.md
