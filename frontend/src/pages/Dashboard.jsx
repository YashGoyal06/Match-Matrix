import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { participantAPI } from '../api';
import { User, Code, Terminal, Palette, LogOut, Loader2, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      navigate('/register');
      return;
    }

    // Poll for matches (Simulate real-time updates)
    fetchMatchData(email);
    const interval = setInterval(() => fetchMatchData(email), 3000);
    return () => clearInterval(interval);
  }, [navigate]);

  const fetchMatchData = async (email) => {
    try {
      const response = await participantAPI.getMyMatch(email);
      if (response.data.success) {
        setMatchData(prev => {
          // Only trigger confetti if state changes from unmatched to matched
          if (!prev?.match_found && response.data.data.match_found) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }
          return response.data.data;
        });
      }
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-12 h-12 text-[#00ff88] animate-spin" />
      <p className="text-[#00ff88] font-mono tracking-wider animate-pulse">ESTABLISHING UPLINK...</p>
    </div>
  );

  const { participant, match_found, partner, compatibility_percentage } = matchData || {};

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-space">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
          >
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ y: -100, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight + 100, rotate: 360 }}
                transition={{ duration: Math.random() * 2 + 2, ease: "linear" }}
              >
                {['🎉', '✨', '⚡', '💻'][i % 4]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00ff88]/20 flex items-center justify-center border border-[#00ff88]">
              <User className="text-[#00ff88]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Command Center</h1>
              <p className="text-gray-400 font-mono text-sm">Operative: {participant?.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-mono text-sm"
          >
            <LogOut size={16} /> DISCONNECT
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!match_found ? (
            <motion.div 
              key="waiting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 blur-3xl bg-[#00ff88]/20 animate-pulse" />
                <Loader2 className="w-24 h-24 text-[#00ff88] animate-spin relative z-10" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight">SCANNING NETWORK</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-12 font-mono">
                Searching for compatible operatives based on your tech stack and neural signature...
              </p>
              
              <ProfileCard user={participant} title="YOUR SIGNAL" />
            </motion.div>
          ) : (
            <motion.div 
              key="matched"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              {/* Success Banner */}
              <div className="bg-[#00ff88]/10 border border-[#00ff88]/50 rounded-2xl p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00ff88]/5 group-hover:bg-[#00ff88]/10 transition-colors" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-[#00ff88] mb-2 flex items-center justify-center gap-3">
                    <Sparkles /> NEURAL LINK ESTABLISHED <Sparkles />
                  </h2>
                  <p className="text-white/80">Optimal collaboration partner identified.</p>
                </div>
              </div>

              {/* Match Visualization */}
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="w-full md:w-5/12">
                   <ProfileCard user={participant} title="YOU" />
                </div>

                <div className="w-full md:w-2/12 flex flex-col items-center justify-center text-center relative">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00ff88] to-[#00d9ff]">
                    {Math.round(compatibility_percentage)}%
                  </div>
                  <div className="text-xs font-mono text-gray-500 mt-2">SYNC RATE</div>
                  <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent -z-10" />
                </div>

                <div className="w-full md:w-5/12">
                   <ProfileCard user={partner} title="MATCHED PARTNER" isPartner />
                </div>
              </div>

              {/* Contact Actions */}
              <div className="max-w-xl mx-auto">
                <div className="p-[2px] rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d9ff]">
                  <div className="bg-[#0f1625] rounded-[10px] p-6 text-center">
                    <h3 className="text-white font-bold mb-4">Initialize Collaboration</h3>
                    <a 
                      href={`mailto:${partner?.email}`}
                      className="inline-flex items-center gap-3 px-8 py-3 bg-[#00ff88] text-[#0a0e1a] font-bold rounded-lg hover:bg-[#00d9ff] transition-all hover:scale-105"
                    >
                      <span>📧</span>
                      Send Transmission ({partner?.email})
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProfileCard = ({ user, title, isPartner }) => (
  <div className={`relative p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
    isPartner 
      ? 'bg-[#0f1625] border-[#00d9ff]/30 hover:border-[#00d9ff]' 
      : 'bg-[#0f1625] border-[#00ff88]/30 hover:border-[#00ff88]'
  }`}>
    <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl ${
      isPartner ? 'bg-[#00d9ff] text-[#0a0e1a]' : 'bg-[#00ff88] text-[#0a0e1a]'
    }`}>
      {title}
    </div>
    
    <div className="flex items-center gap-4 mb-6 mt-2">
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold ${
        isPartner ? 'bg-[#00d9ff]/20 text-[#00d9ff]' : 'bg-[#00ff88]/20 text-[#00ff88]'
      }`}>
        {user?.name?.[0]}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{user?.name}</h3>
        <p className="text-gray-400 text-sm font-mono">{user?.role_display}</p>
      </div>
    </div>

    <div className="space-y-3">
      <InfoRow icon={<Code size={16} />} label="Language" value={user?.preferred_language} />
      <InfoRow icon={<Terminal size={16} />} label="IDE" value={user?.ide} />
      <InfoRow icon={<Palette size={16} />} label="Theme" value={user?.theme_display} />
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-3 bg-[#0a0e1a]/50 rounded-lg border border-white/5">
    <div className="flex items-center gap-3 text-gray-400">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <span className="text-white font-mono text-sm">{value}</span>
  </div>
);

export default Dashboard;