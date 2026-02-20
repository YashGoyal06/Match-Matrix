import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ModeSelection from './pages/ModeSelection';
import RegisterQuiz from './pages/RegisterQuiz';
import DuoRegisterQuiz from './pages/DuoRegisterQuiz';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Showcase from './pages/Showcase';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0e1a]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mode" element={<ModeSelection />} />
          <Route path="/register" element={<RegisterQuiz />} />
          <Route path="/register-duo" element={<DuoRegisterQuiz />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/showcase" element={<Showcase />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
