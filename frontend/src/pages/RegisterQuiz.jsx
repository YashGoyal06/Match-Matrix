import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { participantAPI } from '../api';
import LightRays from './LightRays';

const questions = [
  {
    id: 1,
    key: 'q1',
    question: "When optimizing code, you usually…",
    options: [
      { value: 'A', label: "Optimize only if required" },
      { value: 'B', label: "Prefer efficiency from the start" },
      { value: 'C', label: "Focus on readability over speed" },
      { value: 'D', label: "Let performance tools decide" }
    ]
  },
  {
    id: 2,
    key: 'q2',
    question: "If deadlines are tight, you prefer…",
    options: [
      { value: 'A', label: "Reduce scope and deliver perfectly" },
      { value: 'B', label: "Deliver something working no matter what" },
      { value: 'C', label: "Take risks for extra features" },
      { value: 'D', label: "Split tasks aggressively" }
    ]
  },
  {
    id: 3,
    key: 'q3',
    question: "If your teammate is slower, you will…",
    options: [
      { value: 'A', label: "Support and guide them" },
      { value: 'B', label: "Take over critical parts" },
      { value: 'C', label: "Adjust timeline expectations" },
      { value: 'D', label: "Work independently to finish" }
    ]
  },
  {
    id: 4,
    key: 'q4',
    question: "If your teammate is faster than you, you will…",
    options: [
      { value: 'A', label: "Learn from them actively" },
      { value: 'B', label: "Focus on supportive tasks" },
      { value: 'C', label: "Feel pressured to match speed" },
      { value: 'D', label: "Let them lead execution" }
    ]
  },
  {
    id: 5,
    key: 'q5',
    question: "When coding together, you prefer…",
    options: [
      { value: 'A', label: "Strict division of responsibilities" },
      { value: 'B', label: "Collaborative pair programming" },
      { value: 'C', label: "Flexible switching anytime" },
      { value: 'D', label: "One codes, other reviews" }
    ]
  },
  {
    id: 6,
    key: 'q6',
    question: "In team communication, you prefer…",
    options: [
      { value: 'A', label: "Short and efficient updates" },
      { value: 'B', label: "Deep discussion and brainstorming" },
      { value: 'C', label: "Mostly asynchronous texting" },
      { value: 'D', label: "Minimal talking, more coding" }
    ]
  },
  {
    id: 7,
    key: 'q7',
    question: "If a teammate rejects your idea, you usually…",
    options: [
      { value: 'A', label: "Ask why and discuss calmly" },
      { value: 'B', label: "Suggest testing both quickly" },
      { value: 'C', label: "Drop it and move forward" },
      { value: 'D', label: "Defend it strongly" }
    ]
  },
  {
    id: 8,
    key: 'q8',
    question: "If you make a mistake, you prefer…",
    options: [
      { value: 'A', label: "Immediate correction + transparency" },
      { value: 'B', label: "Fix quietly unless it impacts team" },
      { value: 'C', label: "Discuss it openly with teammate" },
      { value: 'D', label: "Move on quickly and not dwell" }
    ]
  },
  {
    id: 9,
    key: 'q9',
    question: "Decision-making in a duo should be…",
    options: [
      { value: 'A', label: "Fully mutual" },
      { value: 'B', label: "Based on expertise in that area" },
      { value: 'C', label: "Quick majority-style" },
      { value: 'D', label: "One leader decides" }
    ]
  },
  {
    id: 10,
    key: 'q10',
    question: "If teamwork becomes stressful, you tend to…",
    options: [
      { value: 'A', label: "Stay calm and structured" },
      { value: 'B', label: "Push harder to finish" },
      { value: 'C', label: "Step back for clarity" },
      { value: 'D', label: "Feel overwhelmed" }
    ]
  },
  {
    id: 11,
    key: 'q11',
    question: "Your ideal teammate handles pressure by…",
    options: [
      { value: 'A', label: "Staying logical" },
      { value: 'B', label: "Staying energetic" },
      { value: 'C', label: "Staying supportive" },
      { value: 'D', label: "Taking control" }
    ]
  },
  {
    id: 12,
    key: 'q12',
    question: "When building a hackathon project, you prefer ideas that are…",
    options: [
      { value: 'A', label: "Practical and achievable" },
      { value: 'B', label: "Bold and innovative" },
      { value: 'C', label: "Simple but impactful" },
      { value: 'D', label: "Visually impressive" }
    ]
  },
  {
    id: 13,
    key: 'q13',
    question: "Your creativity style is…",
    options: [
      { value: 'A', label: "Structured innovation" },
      { value: 'B', label: "Random sparks + experimentation" },
      { value: 'C', label: "Inspiration from existing products" },
      { value: 'D', label: "Team brainstorming driven" }
    ]
  },
  {
    id: 14,
    key: 'q14',
    question: "You enjoy projects that involve…",
    options: [
      { value: 'A', label: "Algorithms and problem-solving" },
      { value: 'B', label: "AI/ML and intelligence" },
      { value: 'C', label: "Web/app development" },
      { value: 'D', label: "Product design and UX" }
    ]
  },
  {
    id: 15,
    key: 'q15',
    question: "Your learning style during projects is…",
    options: [
      { value: 'A', label: "Deep focus on one concept" },
      { value: 'B', label: "Learn quickly while building" },
      { value: 'C', label: "Learn from teammate guidance" },
      { value: 'D', label: "Avoid learning mid-sprint" }
    ]
  }
];

const RegisterQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '', email: '', student_id: '',
    q1: '', q2: '', q3: '', q4: '', q5: '',
    q6: '', q7: '', q8: '', q9: '', q10: '',
    q11: '', q12: '', q13: '', q14: '', q15: ''
  });

  const totalQuestions = questions.length;

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  // --- UPDATED HANDLER with Redirect & Validation ---
  const handleNext = async (skipValidation = false) => {
    // 1. Basic Form Validation
    if (!skipValidation && !validateStep()) {
      shakeForm();
      return;
    }

    // 2. SERVER-SIDE VERIFICATION (Step 1 Only)
    if (currentStep === 1) {
      setLoading(true);
      setError(''); 
      
      try {
        // Check whitelist AND registration status
        const response = await participantAPI.verify({
          name: formData.name,
          email: formData.email
        });
        
        // --- REDIRECT LOGIC ---
        // If backend says they are already registered
        if (response.status === 'registered') {
           localStorage.setItem('userEmail', formData.email);
           navigate('/dashboard'); 
           return; // Stop execution, don't move to next step
        }
        
        // --- NORMAL SUCCESS ---
        setDirection(1);
        setCurrentStep(c => c + 1);
        
      } catch (err) {
        // Show specific backend error (e.g., Access Denied)
        setError(err.message || "Access Denied: Not on the list.");
        shakeForm();
      } finally {
        setLoading(false);
      }
    } else {
      // Normal flow for quiz questions (Step 2+)
      setDirection(1);
      setCurrentStep(c => c + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(c => c - 1);
  };

  const handleOptionSelect = (key, value) => {
    updateField(key, value);
    setError('');

    setTimeout(() => {
      if ((currentStep - 1) === totalQuestions) {
        const finalData = { ...formData, [key]: value };
        handleSubmit(finalData);
      } else {
        handleNext(true);
      }
    }, 400);
  };

  const [isShaking, setIsShaking] = useState(false);
  const shakeForm = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const validateStep = () => {
    setError('');
    if (currentStep === 1) {
      if (!formData.name || !formData.email || !formData.student_id) return setError("Missing identity details");
      return true;
    }
    const questionIndex = currentStep - 2;
    if (questionIndex >= 0 && questionIndex < questions.length) {
      const qKey = questions[questionIndex].key;
      if (!formData[qKey]) return setError("Choose an option");
      return true;
    }
    return true;
  };

  const handleSubmit = async (finalDataOverride) => {
    const dataToSubmit = finalDataOverride || formData;

    if (!dataToSubmit.name || !dataToSubmit.email) {
      setError("Missing identity details");
      return shakeForm();
    }

    setLoading(true);

    const payload = {
      ...dataToSubmit,
      role: "fullstack",
      experience_level: "intermediate",
      preferred_language: "JavaScript",
      frameworks: ["React", "Node.js"],
      ide: "VS Code",
      os: "Windows",
      commitment_type: "casual",
      communication_style: "async",
      collaboration_style: "pair",
      theme_preference: "dark",
      approach_score: 5,
      availability_hours: 10
    };

    try {
      const response = await participantAPI.register(payload);
      if (response.data.success) {
        localStorage.setItem('userEmail', dataToSubmit.email);
        navigate('/dashboard');
      } else {
        setError('Registration failed: Unknown error');
        shakeForm();
      }
    } catch (err) {
      console.error("Submit Error:", err);
      setError(err.response?.data?.message || 'Registration failed');
      shakeForm();
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const getStepTitle = () => {
    if (currentStep === 1) return "Personal Details";
    return `Question ${currentStep - 1}`;
  };

  const currentQuestionNumber = currentStep - 1;

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-white overflow-hidden flex flex-col font-space">
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ff88"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff88]/20 font-mono text-sm"
            initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {['1', '0', '0x', 'AF'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="h-1 bg-[#0f1623] w-full fixed top-0 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00ff88] to-[#7b2ff7]"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-3xl relative">
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
              {currentStep > 1 && (
                <p className="text-[#00ff88] font-mono text-sm mt-2">
                  Question <span className="text-white">{currentQuestionNumber.toString().padStart(2, '0')}</span> / {totalQuestions}
                </p>
              )}
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

          <motion.div
            animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden min-h-[450px] flex flex-col relative"
          >
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
                {currentStep === 1 ? (
                  <div className="space-y-6">
                    <InputGroup label="Name" value={formData.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Enter full name" />
                    <InputGroup label="College Email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="name@university.edu" type="email" />
                    <InputGroup label="Registration Number" value={formData.student_id} onChange={(e) => updateField('student_id', e.target.value)} placeholder="Student ID" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h3 className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                      {questions[currentStep - 2].question}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {questions[currentStep - 2].options.map((opt) => (
                        <SelectCard
                          key={opt.value}
                          active={formData[questions[currentStep - 2].key] === opt.value}
                          onClick={() => handleOptionSelect(questions[currentStep - 2].key, opt.value)}
                          icon={<span className="font-mono font-bold text-lg">{opt.value}</span>}
                          title={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || loading}
              className={`flex items-center gap-2 px-6 py-3 font-mono text-sm transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white'
                }`}
            >
              <ChevronLeft size={16} /> BACK
            </button>

            {currentStep === 1 && (
              <button
                onClick={() => handleNext()}
                disabled={loading}
                className="bg-[#00ff88] hover:bg-[#00d9ff] text-[#0a0e1a] px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all hover:translate-x-1 disabled:opacity-50"
              >
                {loading ? 'WAIT...' : 'START QUIZ'}
                {!loading && <ChevronRight size={18} />}
              </button>
            )}

            {loading && currentStep > 1 && (
              <div className="text-[#00ff88] font-mono animate-pulse self-center">
                PROCESSING...
              </div>
            )}
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
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className={`cursor-pointer transition-all border rounded-xl relative overflow-hidden flex items-center gap-4 w-full text-left ${compact ? 'p-3' : 'p-4'
      } ${active
        ? 'border-[#00ff88] bg-[#00ff88]/10'
        : 'border-white/5 bg-[#0a0e1a]/40 hover:border-white/20'
      }`}
  >
    <div className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${active ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-white/5 text-gray-400'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className={`font-medium ${compact ? 'text-sm' : 'text-base'} ${active ? 'text-white' : 'text-gray-300'}`}>{title}</div>
      {desc && <div className="text-xs text-gray-500 mt-1 leading-relaxed">{desc}</div>}
    </div>

    {active && (
      <div className="absolute top-1/2 -translate-y-1/2 right-4">
        <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
      </div>
    )}
  </motion.button>
);

export default RegisterQuiz;