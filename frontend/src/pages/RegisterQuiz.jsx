import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, Layout, Terminal, Code, Cpu, 
  Clock, MessageSquare, GitBranch, Layers, Zap, Hash, Monitor
} from 'lucide-react';
import { participantAPI } from '../api';

const RegisterQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Expanded State for 10 Questions
  const [formData, setFormData] = useState({
    // 1. Identity
    name: '', email: '', student_id: '',
    // 2. Role
    role: '', 
    // 3. Experience (New)
    experience_level: '', 
    // 4. Languages
    preferred_language: '', 
    // 5. Frameworks (New - Multi select)
    frameworks: [],
    // 6. Tools (IDE + OS)
    ide: '', os: '',
    // 7. Availability (New)
    availability_hours: 5,
    commitment_type: '',
    // 8. Communication (New)
    communication_style: '',
    // 9. Dynamics (New)
    collaboration_style: '',
    // 10. Vibe (Theme + Approach)
    theme_preference: '', approach_score: 5
  });

  const totalSteps = 10;

  // Animation Variants
  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
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

  // Toggle for multi-select arrays (e.g., Frameworks)
  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const validateStep = () => {
    setError('');
    const d = formData;
    switch(currentStep) {
      case 1: if (!d.name || !d.email || !d.student_id) return setError("Missing identity details"); break;
      case 2: if (!d.role) return setError("Select your primary archetype"); break;
      case 3: if (!d.experience_level) return setError("Select your experience level"); break;
      case 4: if (!d.preferred_language) return setError("Choose a primary language"); break;
      case 5: if (d.frameworks.length === 0) return setError("Select at least one framework"); break;
      case 6: if (!d.ide || !d.os) return setError("Define your environment"); break;
      case 7: if (!d.commitment_type) return setError("Select commitment type"); break;
      case 8: if (!d.communication_style) return setError("Select communication preference"); break;
      case 9: if (!d.collaboration_style) return setError("Select collaboration style"); break;
      case 10: if (!d.theme_preference) return setError("Choose a theme"); break;
      default: return true;
    }
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

  // Helper to render Step Title
  const getStepTitle = () => {
    const titles = [
      "Identity Protocol", "Class Selection", "Skill Level", "Language Core", 
      "Framework Matrix", "Environment", "Temporal Availability", "Comm. Uplink", 
      "Group Dynamics", "Sys. Preferences"
    ];
    return titles[currentStep - 1];
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-hidden flex flex-col font-space">
      {/* Progress Bar */}
      <div className="h-1 bg-[#0f1623] w-full fixed top-0 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#00ff88] to-[#7b2ff7]"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#7b2ff7]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-3xl relative z-10">
          
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <motion.h2 
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold"
              >
                {getStepTitle()}
              </motion.h2>
              <p className="text-[#00ff88] font-mono text-sm mt-2">
                Step <span className="text-white">0{currentStep}</span> / {totalSteps}
              </p>
            </div>
            {error && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-xs md:text-sm font-mono bg-red-500/10 px-4 py-2 border border-red-500/50 rounded-lg backdrop-blur-sm"
              >
                ERR: {error}
              </motion.div>
            )}
          </div>

          {/* Main Card */}
          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-[#0f1623]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden min-h-[450px] flex flex-col relative"
          >
            {/* Grid decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="flex-1 relative z-10"
              >
                {/* --- 1. IDENTITY --- */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <InputGroup label="Agent Name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Enter full name" />
                    <InputGroup label="Contact Vector (Email)" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="name@university.edu" type="email" />
                    <InputGroup label="ID Sequence" value={formData.student_id} onChange={(e) => updateField('student_id', e.target.value)} placeholder="Student ID" />
                  </div>
                )}

                {/* --- 2. ROLE --- */}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'frontend', icon: <Layout />, label: 'Frontend', desc: 'UI/UX & Interactions' },
                      { id: 'backend', icon: <Terminal />, label: 'Backend', desc: 'API & Database' },
                      { id: 'fullstack', icon: <Code />, label: 'Full Stack', desc: 'Complete System' },
                      { id: 'aiml', icon: <Cpu />, label: 'AI / ML', desc: 'Models & Data' }
                    ].map(item => (
                      <SelectCard 
                        key={item.id} 
                        active={formData.role === item.id} 
                        onClick={() => updateField('role', item.id)}
                        {...item}
                      />
                    ))}
                  </div>
                )}

                {/* --- 3. EXPERIENCE (NEW) --- */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <label className="text-gray-400 font-mono text-sm">Proficiency Level</label>
                    {[
                      { id: 'beginner', label: 'Beginner', desc: 'Learning basics, 0-2 projects' },
                      { id: 'intermediate', label: 'Intermediate', desc: 'Comfortable, 3-5 projects' },
                      { id: 'advanced', label: 'Advanced', desc: 'Expert, 5+ complex projects' },
                      { id: 'god', label: '10x Developer', desc: 'I speak binary natively' }
                    ].map(lvl => (
                      <button
                        key={lvl.id}
                        onClick={() => updateField('experience_level', lvl.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          formData.experience_level === lvl.id
                            ? 'bg-[#00ff88]/20 border-[#00ff88] text-white' 
                            : 'bg-[#0a0e1a]/40 border-white/5 hover:border-white/20 text-gray-400'
                        }`}
                      >
                        <div className="font-bold text-lg">{lvl.label}</div>
                        <div className="text-sm opacity-70">{lvl.desc}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* --- 4. LANGUAGES --- */}
                {currentStep === 4 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'Go', 'Rust', 'Swift', 'PHP'].map(lang => (
                      <Tag 
                        key={lang} 
                        active={formData.preferred_language === lang} 
                        onClick={() => updateField('preferred_language', lang)}
                      >
                        {lang}
                      </Tag>
                    ))}
                  </div>
                )}

                {/* --- 5. FRAMEWORKS (NEW) --- */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">Select all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Django', 'Flask', 'FastAPI', 'Spring', 'Flutter', 'TensorFlow', 'PyTorch'].map(fw => (
                        <Tag 
                          key={fw} 
                          active={formData.frameworks.includes(fw)} 
                          onClick={() => toggleSelection('frameworks', fw)}
                        >
                          {fw}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- 6. TOOLS (IDE & OS) --- */}
                {currentStep === 6 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[#00ff88] font-mono text-xs mb-3 uppercase">Operating System</label>
                      <div className="flex gap-4">
                        {['MacOS', 'Windows', 'Linux'].map(os => (
                          <Tag key={os} active={formData.os === os} onClick={() => updateField('os', os)}>{os}</Tag>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#00ff88] font-mono text-xs mb-3 uppercase">Primary IDE</label>
                      <select 
                        value={formData.ide}
                        onChange={(e) => updateField('ide', e.target.value)}
                        className="w-full bg-[#0a0e1a] border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#00ff88] outline-none"
                      >
                        <option value="">Select IDE...</option>
                        {['VS Code', 'IntelliJ', 'PyCharm', 'Vim', 'Cursor', 'Sublime'].map(ide => (
                          <option key={ide} value={ide}>{ide}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* --- 7. AVAILABILITY (NEW) --- */}
                {currentStep === 7 && (
                  <div className="space-y-8">
                    <div>
                      <label className="flex justify-between text-[#00ff88] font-mono text-xs mb-4 uppercase">
                        <span>Weekly Commitment</span>
                        <span>{formData.availability_hours} Hours</span>
                      </label>
                      <input
                        type="range" min="1" max="40"
                        value={formData.availability_hours}
                        onChange={(e) => updateField('availability_hours', parseInt(e.target.value))}
                        className="w-full h-2 bg-[#0f1623] rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#00ff88] font-mono text-xs mb-3 uppercase">Project Type</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'hackathon', label: 'Hackathon', sub: '48h Sprint' },
                          { id: 'longterm', label: 'Long Term', sub: 'Semester Project' },
                          { id: 'startup', label: 'Startup', sub: 'Serious Biz' },
                          { id: 'casual', label: 'Casual', sub: 'Learning' }
                        ].map(type => (
                          <SelectCard 
                            key={type.id}
                            active={formData.commitment_type === type.id}
                            onClick={() => updateField('commitment_type', type.id)}
                            icon={<Clock size={20} />}
                            title={type.label}
                            desc={type.sub}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- 8. COMMUNICATION (NEW) --- */}
                {currentStep === 8 && (
                  <div className="space-y-4">
                    {[
                      { id: 'async', label: 'Async First', desc: 'Text, Tickets, PR comments. I work when I can.', icon: <MessageSquare /> },
                      { id: 'sync', label: 'Sync/Voice', desc: 'Discord calls, Screen sharing. Let\'s jam live.', icon: <Monitor /> },
                      { id: 'hybrid', label: 'Hybrid', desc: 'Text for updates, Voice for blockers.', icon: <Zap /> }
                    ].map(style => (
                      <SelectCard 
                        key={style.id}
                        active={formData.communication_style === style.id}
                        onClick={() => updateField('communication_style', style.id)}
                        icon={style.icon}
                        title={style.label}
                        desc={style.desc}
                      />
                    ))}
                  </div>
                )}

                {/* --- 9. DYNAMICS (NEW) --- */}
                {currentStep === 9 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'leader', label: 'Leader', desc: 'I like to plan architecture and manage tasks.', icon: <Layers /> },
                      { id: 'follower', label: 'Executor', desc: 'Tell me what to build and I will kill it.', icon: <Terminal /> },
                      { id: 'pair', label: 'Pair Programmer', desc: 'I want to code together line by line.', icon: <Users /> },
                      { id: 'solo', label: 'Lone Wolf', desc: 'Give me a module and leave me alone.', icon: <Code /> }
                    ].map(style => (
                      <SelectCard 
                        key={style.id}
                        active={formData.collaboration_style === style.id}
                        onClick={() => updateField('collaboration_style', style.id)}
                        icon={style.icon}
                        title={style.label}
                        desc={style.desc}
                      />
                    ))}
                  </div>
                )}

                {/* --- 10. PREFERENCES --- */}
                {currentStep === 10 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[#00ff88] font-mono text-xs mb-4 uppercase">Theme</label>
                      <div className="flex gap-4">
                        <Tag active={formData.theme_preference === 'dark'} onClick={() => updateField('theme_preference', 'dark')}>Dark Mode</Tag>
                        <Tag active={formData.theme_preference === 'light'} onClick={() => updateField('theme_preference', 'light')}>Light Mode</Tag>
                      </div>
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
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-colors ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white'
              }`}
            >
              <ChevronLeft size={16} /> BACK
            </button>
            
            <button
              onClick={currentStep === totalSteps ? handleSubmit : handleNext}
              disabled={loading}
              className="bg-[#00ff88] hover:bg-[#00d9ff] text-[#0a0e1a] px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all hover:translate-x-1 disabled:opacity-50"
            >
              {loading ? 'UPLOADING...' : (currentStep === totalSteps ? 'FINISH' : 'NEXT')}
              {!loading && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Reusable UI Components ---

const InputGroup = ({ label, ...props }) => (
  <div>
    <label className="block text-[#00ff88] font-mono text-xs mb-2 uppercase tracking-wider">{label}</label>
    <input 
      {...props}
      className="w-full bg-[#0a0e1a] border border-white/10 text-white rounded-xl px-4 py-4 focus:ring-1 focus:ring-[#00ff88] focus:border-[#00ff88] outline-none transition-all placeholder:text-gray-700 font-mono"
    />
  </div>
);

const SelectCard = ({ active, onClick, icon, title, desc, compact }) => (
  <motion.div
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`cursor-pointer transition-all border rounded-xl relative overflow-hidden ${
      compact ? 'p-3' : 'p-5'
    } ${
      active 
        ? 'border-[#00ff88] bg-[#00ff88]/10' 
        : 'border-white/5 bg-[#0a0e1a]/40 hover:border-white/20'
    }`}
  >
    <div className={`mb-2 ${active ? 'text-[#00ff88]' : 'text-gray-400'}`}>{icon}</div>
    <div className={`font-bold text-white ${compact ? 'text-sm' : 'text-lg'}`}>{title}</div>
    {desc && <div className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</div>}
    
    {active && (
      <div className="absolute top-0 right-0 p-2">
        <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
      </div>
    )}
  </motion.div>
);

const Tag = ({ children, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`py-3 px-4 rounded-lg font-mono text-sm border transition-all w-full ${
      active 
        ? 'bg-[#00ff88] text-[#0a0e1a] border-[#00ff88] font-bold' 
        : 'bg-[#0a0e1a]/50 text-gray-400 border-white/10 hover:border-white/30'
    }`}
  >
    {children}
  </motion.button>
);

// Icon component needed for the "Pair" option
const Users = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default RegisterQuiz;