import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Users, Zap } from 'lucide-react';
import { participantAPI } from '../api';
import LightRays from './LightRays';

const questions = [
  { id: 1, key: 'q1', question: "When optimizing code, you usually…", options: [{ value: 'A', label: "Optimize only if required" }, { value: 'B', label: "Prefer efficiency from the start" }, { value: 'C', label: "Focus on readability over speed" }, { value: 'D', label: "Let performance tools decide" }] },
  { id: 2, key: 'q2', question: "If deadlines are tight, you prefer…", options: [{ value: 'A', label: "Reduce scope and deliver perfectly" }, { value: 'B', label: "Deliver something working no matter what" }, { value: 'C', label: "Take risks for extra features" }, { value: 'D', label: "Split tasks aggressively" }] },
  { id: 3, key: 'q3', question: "If your teammate is slower, you will…", options: [{ value: 'A', label: "Support and guide them" }, { value: 'B', label: "Take over critical parts" }, { value: 'C', label: "Adjust timeline expectations" }, { value: 'D', label: "Work independently to finish" }] },
  { id: 4, key: 'q4', question: "If your teammate is faster than you, you will…", options: [{ value: 'A', label: "Learn from them actively" }, { value: 'B', label: "Focus on supportive tasks" }, { value: 'C', label: "Feel pressured to match speed" }, { value: 'D', label: "Let them lead execution" }] },
  { id: 5, key: 'q5', question: "When coding together, you prefer…", options: [{ value: 'A', label: "Strict division of responsibilities" }, { value: 'B', label: "Collaborative pair programming" }, { value: 'C', label: "Flexible switching anytime" }, { value: 'D', label: "One codes, other reviews" }] },
  { id: 6, key: 'q6', question: "In team communication, you prefer…", options: [{ value: 'A', label: "Short and efficient updates" }, { value: 'B', label: "Deep discussion and brainstorming" }, { value: 'C', label: "Mostly asynchronous texting" }, { value: 'D', label: "Minimal talking, more coding" }] },
  { id: 7, key: 'q7', question: "If a teammate rejects your idea, you usually…", options: [{ value: 'A', label: "Ask why and discuss calmly" }, { value: 'B', label: "Suggest testing both quickly" }, { value: 'C', label: "Drop it and move forward" }, { value: 'D', label: "Defend it strongly" }] },
  { id: 8, key: 'q8', question: "If you make a mistake, you prefer…", options: [{ value: 'A', label: "Immediate correction + transparency" }, { value: 'B', label: "Fix quietly unless it impacts team" }, { value: 'C', label: "Discuss it openly with teammate" }, { value: 'D', label: "Move on quickly and not dwell" }] },
  { id: 9, key: 'q9', question: "Decision-making in a duo should be…", options: [{ value: 'A', label: "Fully mutual" }, { value: 'B', label: "Based on expertise in that area" }, { value: 'C', label: "Quick majority-style" }, { value: 'D', label: "One leader decides" }] },
  { id: 10, key: 'q10', question: "If teamwork becomes stressful, you tend to…", options: [{ value: 'A', label: "Stay calm and structured" }, { value: 'B', label: "Push harder to finish" }, { value: 'C', label: "Step back for clarity" }, { value: 'D', label: "Feel overwhelmed" }] },
  { id: 11, key: 'q11', question: "Your ideal teammate handles pressure by…", options: [{ value: 'A', label: "Staying logical" }, { value: 'B', label: "Staying energetic" }, { value: 'C', label: "Staying supportive" }, { value: 'D', label: "Taking control" }] },
  { id: 12, key: 'q12', question: "When building a hackathon project, you prefer ideas that are…", options: [{ value: 'A', label: "Practical and achievable" }, { value: 'B', label: "Bold and innovative" }, { value: 'C', label: "Simple but impactful" }, { value: 'D', label: "Visually impressive" }] },
  { id: 13, key: 'q13', question: "Your creativity style is…", options: [{ value: 'A', label: "Structured innovation" }, { value: 'B', label: "Random sparks + experimentation" }, { value: 'C', label: "Inspiration from existing products" }, { value: 'D', label: "Team brainstorming driven" }] },
  { id: 14, key: 'q14', question: "You enjoy projects that involve…", options: [{ value: 'A', label: "Algorithms and problem-solving" }, { value: 'B', label: "AI/ML and intelligence" }, { value: 'C', label: "Web/app development" }, { value: 'D', label: "Product design and UX" }] },
  { id: 15, key: 'q15', question: "Your learning style during projects is…", options: [{ value: 'A', label: "Deep focus on one concept" }, { value: 'B', label: "Learn quickly while building" }, { value: 'C', label: "Learn from teammate guidance" }, { value: 'D', label: "Avoid learning mid-sprint" }] }
];

const DuoRegisterQuiz = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('details');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [p1, setP1] = useState({ name: '', email: '', student_id: '', answers: {} });
  const [p2, setP2] = useState({ name: '', email: '', student_id: '', answers: {} });

  const updateP1 = (field, val) => setP1(prev => ({ ...prev, [field]: val }));
  const updateP2 = (field, val) => setP2(prev => ({ ...prev, [field]: val }));
  
  const handleAnswer = (val) => {
    const qKey = questions[currentQuestionIdx].key;
    if (phase === 'p1_quiz') {
      setP1(prev => ({ ...prev, answers: { ...prev.answers, [qKey]: val } }));
    } else {
      setP2(prev => ({ ...prev, answers: { ...prev.answers, [qKey]: val } }));
    }

    setTimeout(() => {
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(c => c + 1);
      } else {
        if (phase === 'p1_quiz') {
          setPhase('intermission');
          setCurrentQuestionIdx(0);
        } else {
          handleSubmit();
        }
      }
    }, 300);
  };

  const startQuiz = async () => {
    if(!p1.name || !p1.email || !p2.name || !p2.email) {
      setError("All fields required");
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // 1. Verify Member 1 is not already registered
      const res1 = await participantAPI.verify({ email: p1.email, name: p1.name });
      if (res1.status === 'registered') {
        setError(`Member 1 (${p1.email}) is already registered.`);
        setLoading(false);
        return;
      }

      // 2. Verify Member 2 is not already registered
      const res2 = await participantAPI.verify({ email: p2.email, name: p2.name });
      if (res2.status === 'registered') {
        setError(`Member 2 (${p2.email}) is already registered.`);
        setLoading(false);
        return;
      }

      // Proceed to quiz if neither are registered
      setPhase('p1_quiz');
      
    } catch (err) {
      console.error(err);
      setError("Connection to server failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startP2 = () => {
    setPhase('p2_quiz');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setPhase('submitting');
    
    const payload = {
      p1: { ...p1, ...p1.answers },
      p2: { ...p2, ...p2.answers }
    };

    try {
      const response = await participantAPI.registerDuo(payload);
      if (response.data.success) {
        localStorage.setItem('userEmail', p1.email);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setPhase('details');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-white flex flex-col font-space overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LightRays raysColor={phase === 'p2_quiz' ? '#7b2ff7' : '#00ff88'} />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {phase === 'details' && "DUO PROTOCOL REGISTRATION"}
              {phase === 'p1_quiz' && `ASSESSMENT: ${p1.name.toUpperCase()}`}
              {phase === 'intermission' && "SYNC CHECKPOINT"}
              {phase === 'p2_quiz' && `ASSESSMENT: ${p2.name.toUpperCase()}`}
              {phase === 'submitting' && "CALCULATING SYNC SCORE..."}
            </h1>
            {error && <div className="text-red-400 font-mono mt-2 bg-red-900/20 inline-block px-4 py-1 rounded">{error}</div>}
          </div>

          <motion.div 
            layout
            className="bg-[#0f1623]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              
              {phase === 'details' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#00ff88] mb-2 font-bold font-mono">
                      <Users size={16}/> MEMBER 01
                    </div>
                    <InputGroup label="Name" value={p1.name} onChange={e => updateP1('name', e.target.value)} />
                    <InputGroup label="Email" value={p1.email} onChange={e => updateP1('email', e.target.value)} />
                    <InputGroup label="Student ID" value={p1.student_id} onChange={e => updateP1('student_id', e.target.value)} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#7b2ff7] mb-2 font-bold font-mono">
                      <Users size={16}/> MEMBER 02
                    </div>
                    <InputGroup label="Name" value={p2.name} onChange={e => updateP2('name', e.target.value)} />
                    <InputGroup label="Email" value={p2.email} onChange={e => updateP2('email', e.target.value)} />
                    <InputGroup label="Student ID" value={p2.student_id} onChange={e => updateP2('student_id', e.target.value)} />
                  </div>

                  <div className="md:col-span-2 mt-4 flex justify-center">
                    <button 
                      onClick={startQuiz} 
                      disabled={loading}
                      className="bg-white text-[#0a0e1a] px-10 py-4 font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-50 disabled:scale-100"
                    >
                      {loading ? 'VERIFYING...' : 'INITIATE SEQUENCE'} <ChevronRight />
                    </button>
                  </div>
                </motion.div>
              )}

              {(phase === 'p1_quiz' || phase === 'p2_quiz') && (
                <motion.div 
                  key="question-container"
                  initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
                >
                  <h3 className="text-2xl font-medium mb-6 min-h-[80px]">
                    {questions[currentQuestionIdx].question}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {questions[currentQuestionIdx].options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] ${
                          phase === 'p1_quiz' 
                          ? 'border-white/10 hover:border-[#00ff88] hover:bg-[#00ff88]/10' 
                          : 'border-white/10 hover:border-[#7b2ff7] hover:bg-[#7b2ff7]/10'
                        }`}
                      >
                        <span className="font-bold mr-3 opacity-50">{opt.value}</span> {opt.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 text-right font-mono text-sm opacity-50">
                    Question {currentQuestionIdx + 1} / {questions.length}
                  </div>
                </motion.div>
              )}

              {phase === 'intermission' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <Zap size={64} className="mx-auto text-[#00ff88] mb-6" />
                  <h2 className="text-2xl font-bold mb-2">Member 01 Data Secured</h2>
                  <p className="text-gray-400 mb-8">Please hand the device to <span className="text-[#7b2ff7] font-bold">{p2.name}</span>.</p>
                  <button onClick={startP2} className="bg-[#7b2ff7] text-white px-10 py-4 font-bold rounded-lg hover:bg-[#6a25d6] transition-colors">
                    I AM {p2.name ? p2.name.toUpperCase() : 'READY'}
                  </button>
                </motion.div>
              )}

              {phase === 'submitting' && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin mb-6" />
                  <p className="font-mono animate-pulse">RUNNING COMPATIBILITY ALGORITHM...</p>
                </div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, ...props }) => (
  <div>
    <label className="block text-xs mb-2 uppercase tracking-wider opacity-70 font-mono">{label}</label>
    <input
      {...props}
      className="w-full bg-[#0a0e1a] border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-1 focus:ring-white outline-none transition-all placeholder:text-gray-700 font-mono text-sm"
    />
  </div>
);

export default DuoRegisterQuiz;
