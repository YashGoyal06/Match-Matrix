import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { participantAPI } from '../api';
import { User, Mail, Hash, LogOut, Loader2, Sparkles, RefreshCw, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="w-16 h-16 text-emerald-400 animate-spin relative z-10" />
      </div>
      <p className="text-emerald-400 font-mono tracking-widest text-sm animate-pulse">
        ESTABLISHING SECURE CONNECTION...
      </p>
    </div>
  );

  const { participant, match_found, partner, compatibility_percentage } = matchData || {};

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden relative">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Confetti Overlay */}
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
                {['🎉', '✨', '💎', '🚀'][i % 4]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-20 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md z-40 px-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-white tracking-wide">MATCH MATRIX</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-gray-400 font-mono">OPERATIVE: {participant?.name}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-sm font-medium group"
        >
          <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">DISCONNECT</span>
        </button>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {!match_found ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full"
            >
              {/* Radar Animation */}
              <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                <div className="absolute inset-0 border border-emerald-500/20 rounded-full" />
                <div className="absolute inset-4 border border-emerald-500/10 rounded-full" />
                <div className="absolute inset-1/2 w-[1px] h-1/2 bg-gradient-to-t from-emerald-500/0 to-emerald-500/50 origin-bottom animate-[spin_3s_linear_infinite]" />

                {/* Ping circles */}
                <motion.div
                  className="absolute inset-0 border border-emerald-500/30 rounded-full"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 border border-emerald-500/30 rounded-full"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "easeOut" }}
                />

                <div className="relative z-10 bg-[#0f172a] p-4 rounded-full border border-emerald-500/20 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin-slow" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Scanning Network
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                Analyzing neural signatures and tech stack compatibility to find your optimal partner.
              </p>

              <div className="w-full bg-[#0f172a]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
                <ProfileCard user={participant} title="YOUR SIGNAL" minimalist />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="matched"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center w-full"
            >
              <div className="w-full max-w-5xl mx-auto">
                {/* Match Header */}
                <div className="text-center mb-16 relative">
                  <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-sm mb-6 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    SYSTEM MATCH CONFIRMED
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-tighter mb-4">
                    Perfect Match
                  </h2>
                  <p className="text-gray-400 text-lg">Your compatibility metrics are synchronized.</p>
                </div>

                {/* Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent -translate-y-1/2 pointer-events-none" />

                  {/* Result Card 1 */}
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10"
                  >
                    <ProfileCard user={participant} title="YOU" />
                  </motion.div>

                  {/* Compatibility Score */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="relative z-20 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#030712] border-4 border-[#0f172a] shadow-2xl flex items-center justify-center relative group">
                      <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full border border-blue-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-500/5 to-blue-500/5 backdrop-blur-sm" />

                      <div className="relative z-10">
                        <span className="block text-4xl md:text-5xl font-black text-white tracking-tighter">
                          {Math.round(compatibility_percentage)}%
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">SYNC RATE</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Result Card 2 */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative z-10"
                  >
                    <ProfileCard user={partner} title="PARTNER" isPartner />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const ProfileCard = ({ user, title, isPartner, minimalist = false }) => (
  <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 group ${minimalist
    ? 'p-6 bg-transparent'
    : 'p-8 bg-[#0f172a]/40 backdrop-blur-md border border-white/5 hover:border-white/10 hover:bg-[#0f172a]/60 shadow-xl'
    }`}>
    {/* Glow Effect */}
    {!minimalist && (
      <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-b ${isPartner ? 'from-blue-500/20 to-transparent' : 'from-emerald-500/20 to-transparent'
        }`} />
    )}

    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Avatar */}
      <div className={`w-24 h-24 rounded-2xl mb-6 flex items-center justify-center text-4xl font-bold shadow-lg relative overflow-hidden ${isPartner ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
        }`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${isPartner ? 'from-blue-500/20 to-transparent' : 'from-emerald-500/20 to-transparent'
          } opacity-50`} />
        {user?.name?.[0]}
      </div>

      <div className={`text-xs font-bold tracking-wider mb-2 px-3 py-1 rounded-full uppercase ${isPartner
        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
        {title}
      </div>

      <h3 className="text-2xl font-bold text-white mb-1">{user?.name}</h3>

      {/* Divider */}
      <div className="w-12 h-1 bg-white/5 rounded-full my-6" />

      <div className="w-full space-y-3">
        <InfoRow icon={<Mail size={16} />} label="Email" value={user?.email} />
        <InfoRow icon={<Hash size={16} />} label="ID" value={user?.student_id} />
      </div>
    </div>
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5 group hover:border-white/10 transition-colors">
    <div className="flex items-center gap-3 text-gray-500 group-hover:text-gray-400 transition-colors">
      {icon}
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-white font-mono text-sm max-w-[150px] truncate" title={value}>{value}</span>
  </div>
);

export default Dashboard;