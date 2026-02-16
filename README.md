# 🎯 Match Matrix - Tech Compatibility Event

A full-stack web application for the Matrix Club's "Match Matrix" event where students are paired based on technical compatibility through an intelligent matching algorithm.

## 🌟 Features

- **Smart Registration Quiz**: Multi-step form collecting technical preferences
- **Intelligent Matching Algorithm**: Pairs participants based on:
  - Complementary roles (+30%)
  - Same programming language (+20%)
  - Similar working approach (+20%)
  - Same IDE (+10%)
  - Same theme preference (+10%)
- **Real-time Dashboard**: View match status and compatibility scores
- **Admin Panel**: Generate matches and view statistics
- **Matrix-Inspired Design**: Retro-futuristic aesthetic with animations

## 🛠️ Tech Stack

### Backend
- **Django 5.0** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL** (via Supabase) - Database
- **dj-database-url** - Database configuration

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

## 📋 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd match-matrix
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt

# Create .env file
cp ../.env.example .env
# Edit .env and add your Supabase DATABASE_URL
```

#### Configure Supabase Database

1. Create a project on [Supabase](https://supabase.com)
2. Go to Project Settings > Database
3. Copy the connection string (URI format)
4. Add to `.env`:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres
   ```

#### Run Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional, for Django admin)
python manage.py createsuperuser
```

#### Start Backend Server

```bash
python manage.py runserver
```

Backend will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📱 Usage

### For Participants

1. **Register**: Visit homepage and click "START QUIZ"
2. **Complete Quiz**: Fill in 4 steps:
   - Basic Information (name, email, student ID)
   - Tech Role (Frontend, Backend, Full Stack, AI/ML)
   - Tech Stack (preferred language, IDE)
   - Working Style (theme preference, approach score)
3. **Dashboard**: After registration, you'll see "Waiting for Match"
4. **View Match**: Once admin generates matches, see your partner and compatibility score

### For Admins

1. Visit `/admin` route
2. View participant statistics
3. Click "Generate Matches" to run the algorithm
4. View all matches with compatibility scores

## 🎨 Design System

- **Colors**:
  - Primary: `#00ff88` (Matrix Green)
  - Secondary: `#00d9ff` (Cyan)
  - Accent: `#7b2ff7` (Purple)
  - Background: `#0a0e1a` (Dark Blue)

- **Typography**:
  - Headers: Space Mono
  - Code/Data: JetBrains Mono

## 📊 API Endpoints

### Public Endpoints

- `POST /api/register/` - Register new participant
- `GET /api/my-match/?email={email}` - Get participant's match

### Admin Endpoints

- `POST /api/admin/generate-matches/` - Generate all matches
- `GET /api/admin/participants/` - Get all participants
- `GET /api/admin/matches/` - Get all matches

## 🔧 Development

### Backend Development

```bash
# Run development server with auto-reload
python manage.py runserver

# Create new migrations after model changes
python manage.py makemigrations

# Access Django admin
# Navigate to http://localhost:8000/admin
```

### Frontend Development

```bash
# Run dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
match-matrix/
├── backend/
│   ├── core/
│   │   ├── settings.py       # Django settings
│   │   └── urls.py           # Main URL configuration
│   └── api/
│       ├── models.py          # Participant & Match models
│       ├── serializers.py     # DRF serializers
│       ├── views.py           # API views & matching algorithm
│       ├── urls.py            # API routes
│       └── admin.py           # Django admin configuration
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── RegisterQuiz.jsx  # Registration form
│   │   │   ├── Dashboard.jsx  # Match results
│   │   │   └── Admin.jsx      # Admin panel
│   │   ├── api.js             # Axios configuration
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   └── package.json
└── requirements.txt
```

## 🧪 Testing the Application

### Test Complete Flow

1. **Start both servers** (backend and frontend)
2. **Register 4-6 participants** with different profiles:
   - Mix of Frontend, Backend, Full Stack roles
   - Different languages (Python, JavaScript, etc.)
   - Various approach scores (1-10)
3. **Go to Admin panel** (`/admin`)
4. **Click "Generate Matches"**
5. **Check participant dashboards** to see matches

## 🚢 Deployment

### Backend (Django)

Deploy to platforms like:
- Heroku
- Railway
- PythonAnywhere
- DigitalOcean

Remember to:
- Set `DEBUG=False`
- Configure `ALLOWED_HOSTS`
- Use proper `SECRET_KEY`
- Set up production database

### Frontend (React)

Deploy to platforms like:
- Vercel
- Netlify
- Cloudflare Pages

Update `VITE_API_URL` to your production backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is created for the Matrix Club event.

## 👥 Contact

For questions about the Match Matrix event:
- Event Date: February 20, 2026
- Organized by: Matrix Club

---

Built with ❤️ by the Matrix Club team
