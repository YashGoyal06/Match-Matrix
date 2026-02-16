import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Code, Terminal, Cpu, Layout, Moon, Sun } from 'lucide-react';
import { participantAPI } from '../api';

const RegisterQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', email: '', student_id: '', role: '',
    preferred_language: '', ide: '', theme_preference: '', approach_score: 5
  });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const handleNext = () => {
    if (validateStep()) {
      setDirection(1);
      setCurrentStep(c => c + 1);
    } else {
      shakeForm();
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(c => c - 1);
  };

  const [isShaking, setIsShaking] = useState(false);
  const shakeForm = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const validateStep = () => {
    setError('');
    const { name, email, student_id, role, preferred_language, ide, theme_preference } = formData;
    if (currentStep === 1 && (!name || !email || !student_id)) return setError("Missing required fields");
    if (currentStep === 2 && !role) return setError("Select a role");
    if (currentStep === 3 && (!preferred_language || !ide)) return setError("Complete your stack");
    if (currentStep === 4 && !theme_preference) return setError("Choose a side");
    return true;
  };

  const handleSubmit = async () => {
      if (!validateStep()) return shakeForm();
      setLoading(true);
      try {
        const response = await participantAPI.register(formData);
        if (response.data.success) {
          localStorage.setItem('userEmail', formData.email);
          navigate('/dashboard');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
        shakeForm();
      } finally {
        setLoading(false);
      }
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden flex flex-col">
      {/* Top Progress Bar */}
      <div className="h-2 bg-[#0f1623] w-full fixed top-0 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d9ff]"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7b2ff7]/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

        <div className="w-full max-w-2xl relative z-10">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <motion.h2 
                key={currentStep}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold font-space"
              >
                {['Identity', 'Class', 'Arsenal', 'Sync'][currentStep - 1]} Protocol
              </motion.h2>
              <p className="text-[#00ff88] font-mono text-sm mt-1">Step 0{currentStep} / 04</p>
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-sm font-mono bg-red-500/10 px-3 py-1 border border-red-500/50 rounded"
              >
                ! {error}
              </motion.div>
            )}
          </div>

          {/* Main Card */}
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-[#0f1623]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[400px] flex flex-col"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="flex-1"
              >
                {/* STEP 1: BASIC INFO */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <InputGroup label="Agent Name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Enter full name" />
                    <InputGroup label="Contact Vector (Email)" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="name@university.edu" type="email" />
                    <InputGroup label="ID Sequence" value={formData.student_id} onChange={(e) => updateField('student_id', e.target.value)} placeholder="Student ID" />
                  </div>
                )}

                {/* STEP 2: ROLE */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                    <SelectCard 
                      selected={formData.role === 'frontend'} 
                      onClick={() => updateField('role', 'frontend')}
                      icon={<Layout />} title="Frontend" desc="Visual architect" 
                    />
                    <SelectCard 
                      selected={formData.role === 'backend'} 
                      onClick={() => updateField('role', 'backend')}
                      icon={<Terminal />} title="Backend" desc="System core" 
                    />
                    <SelectCard 
                      selected={formData.role === 'fullstack'} 
                      onClick={() => updateField('role', 'fullstack')}
                      icon={<Code />} title="Full Stack" desc="Complete system" 
                    />
                    <SelectCard 
                      selected={formData.role === 'aiml'} 
                      onClick={() => updateField('role', 'aiml')}
                      icon={<Cpu />} title="AI / ML" desc="Neural networks" 
                    />
                  </div>
                )}

                {/* STEP 3: TECH STACK */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-gray-400 text-sm font-mono mb-2 block">Primary Syntax</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust'].map(lang => (
                          <Tag 
                            key={lang} 
                            active={formData.preferred_language === lang} 
                            onClick={() => updateField('preferred_language', lang)}
                          >
                            {lang}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm font-mono mb-2 block">Environment (IDE)</label>
                      <select 
                        value={formData.ide}
                        onChange={(e) => updateField('ide', e.target.value)}
                        className="w-full bg-[#0a0e1a] border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00ff88] outline-none"
                      >
                        <option value="">Select IDE...</option>
                        {['VS Code', 'IntelliJ', 'PyCharm', 'Vim', 'Sublime'].map(ide => (
                          <option key={ide} value={ide}>{ide}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* STEP 4: PREFERENCES */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <ThemeCard theme="dark" icon={<Moon />} active={formData.theme_preference === 'dark'} onClick={() => updateField('theme_preference', 'dark')} />
                      <ThemeCard theme="light" icon={<Sun />} active={formData.theme_preference === 'light'} onClick={() => updateField('theme_preference', 'light')} />
                    </div>
                    
                    <div className="bg-[#0a0e1a]/50 p-6 rounded-2xl border border-white/5">
                      <div className="flex justify-between text-sm text-[#00ff88] mb-4 font-mono">
                        <span>Structured</span>
                        <span>Chaos</span>
                      </div>
                      <input
                        type="range" min="1" max="10"
                        value={formData.approach_score}
                        onChange={(e) => updateField('approach_score', parseInt(e.target.value))}
                        className="w-full h-2 bg-[#0f1623] rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
                      />
                      <div className="text-center mt-2 text-gray-400 text-sm">
                        Resonance: {formData.approach_score * 10}%
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button 
              onClick={handleBack} 
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-colors ${currentStep === 1 ? 'opacity-0' : 'text-gray-400 hover:text-white'}`}
            >
              <ChevronLeft size={16} /> BACK
            </button>
            
            <button
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              disabled={loading}
              className="bg-[#00ff88] hover:bg-[#00d9ff] text-[#0a0e1a] px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'PROCESSING...' : (currentStep === 4 ? 'INITIALIZE' : 'NEXT')}
              {!loading && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Subcomponents ---

const InputGroup = ({ label, ...props }) => (
  <div>
    <label className="block text-[#00ff88] font-mono text-xs mb-2 uppercase tracking-wider">{label}</label>
    <input 
      {...props}
      className="w-full bg-[#0a0e1a] border border-white/10 text-white rounded-xl px-4 py-4 focus:ring-2 focus:ring-[#00ff88] focus:border-transparent outline-none transition-all placeholder:text-gray-700"
    />
  </div>
);

const SelectCard = ({ selected, onClick, icon, title, desc }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      selected ? 'border-[#00ff88] bg-[#00ff88]/10' : 'border-white/5 bg-[#0a0e1a] hover:border-white/20'
    }`}
  >
    <div className={`mb-3 ${selected ? 'text-[#00ff88]' : 'text-gray-400'}`}>{icon}</div>
    <div className="font-bold text-white">{title}</div>
    <div className="text-xs text-gray-500">{desc}</div>
  </motion.div>
);

const Tag = ({ children, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`py-2 rounded-lg font-mono text-sm border transition-all ${
      active ? 'bg-[#00ff88] text-[#0a0e1a] border-[#00ff88]' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
    }`}
  >
    {children}
  </motion.button>
);

const ThemeCard = ({ theme, icon, active, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`flex-1 p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${
      active ? 'border-[#00ff88] bg-[#00ff88]/10 text-white' : 'border-white/10 text-gray-500 hover:bg-[#0a0e1a]'
    }`}
  >
    {icon}
    <span className="font-bold uppercase tracking-widest text-sm">{theme}</span>
  </motion.button>
);

export default RegisterQuiz;