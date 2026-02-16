import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { participantAPI } from '../api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [matchData, setMatchData] = useState(null);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchMatchData();
    const interval = setInterval(fetchMatchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMatchData = async () => {
    const email = localStorage.getItem('userEmail');
    
    if (!email) {
      navigate('/register');
      return;
    }

    try {
      const response = await participantAPI.getMyMatch(email);
      if (response.data.success) {
        setMatchData(response.data.data);
        if (response.data.data.match_found && !showConfetti) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch match data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#00ff88] font-mono">Loading your data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-[#00ff88] text-[#0a0e1a] font-bold hover:bg-[#00d9ff] transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { participant, match_found, partner, compatibility_percentage } = matchData || {};

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          className="w-full h-full"
        />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${20 + Math.random() * 20}px`
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400 font-mono">Welcome, {participant?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 border-2 border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0e1a] transition-all font-mono"
          >
            LOGOUT
          </button>
        </div>

        {!match_found ? (
          /* Waiting State */
          <div className="text-center py-20 animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 blur-2xl bg-[#00ff88] opacity-30 animate-pulse" />
              <div className="relative text-8xl">⏳</div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Finding Your Match...</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Our algorithm is analyzing compatibility scores. You'll be notified once a match is found!
            </p>
            
            {/* Participant Info Card */}
            <div className="max-w-2xl mx-auto mt-12 bg-[#0f1625] border-2 border-[#00ff88]/30 p-8">
              <h3 className="text-xl font-bold text-[#00ff88] mb-6">Your Profile</h3>
              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Role</p>
                  <p className="text-white font-semibold">{participant?.role_display}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Language</p>
                  <p className="text-white font-semibold">{participant?.preferred_language}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">IDE</p>
                  <p className="text-white font-semibold">{participant?.ide}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Theme</p>
                  <p className="text-white font-semibold">{participant?.theme_display}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Match Found State */
          <div className="animate-fade-in">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-[#00ff88] to-[#00d9ff] p-6 mb-12 text-center">
              <h2 className="text-3xl font-black text-[#0a0e1a] mb-2">
                🎉 MATCH FOUND! 🎉
              </h2>
              <p className="text-[#0a0e1a] font-semibold">You've been paired with your perfect collaboration partner!</p>
            </div>

            {/* Compatibility Score Visualization */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                {/* Circular Progress */}
                <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(0, 255, 136, 0.1)"
                    strokeWidth="20"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - compatibility_percentage / 100)}`}
                    transform="rotate(-90 100 100)"
                    className="animate-draw"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00ff88" />
                      <stop offset="100%" stopColor="#00d9ff" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Score Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-[#00ff88] mb-2 animate-count-up">
                      {Math.round(compatibility_percentage)}%
                    </div>
                    <div className="text-gray-400 font-mono text-sm">COMPATIBILITY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Your Card */}
              <div className="bg-[#0f1625] border-2 border-[#00ff88]/50 p-8 hover:border-[#00ff88] transition-all duration-300 hover:translate-y-[-4px]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00ff88] to-[#00d9ff] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-[#0a0e1a]">
                    {participant?.name?.[0]}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{participant?.name}</h3>
                  <p className="text-[#00ff88] font-mono text-sm">YOU</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#00ff88]/20">
                    <span className="text-gray-400 text-sm">Role</span>
                    <span className="text-white font-semibold">{participant?.role_display}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#00ff88]/20">
                    <span className="text-gray-400 text-sm">Language</span>
                    <span className="text-white font-semibold">{participant?.preferred_language}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#00ff88]/20">
                    <span className="text-gray-400 text-sm">IDE</span>
                    <span className="text-white font-semibold">{participant?.ide}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#00ff88]/20">
                    <span className="text-gray-400 text-sm">Theme</span>
                    <span className="text-white font-semibold">{participant?.theme_display}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400 text-sm">Approach</span>
                    <span className="text-white font-semibold">{participant?.approach_score}/10</span>
                  </div>
                </div>
              </div>

              {/* Partner Card */}
              <div className="bg-[#0f1625] border-2 border-[#00d9ff]/50 p-8 hover:border-[#00d9ff] transition-all duration-300 hover:translate-y-[-4px]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00d9ff] to-[#7b2ff7] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white">
                    {partner?.name?.[0]}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{partner?.name}</h3>
                  <p className="text-[#00d9ff] font-mono text-sm">YOUR MATCH</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-[#00d9ff]/20">
                    <span className="text-gray-400 text-sm">Role</span>
                    <span className="text-white font-semibold">{partner?.role_display}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#00d9ff]/20">
                    <span className="text-gray-400 text-sm">Language</span>
                    <span className="text-white font-semibold">{partner?.preferred_language}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#00d9ff]/20">
                    <span className="text-gray-400 text-sm">IDE</span>
                    <span className="text-white font-semibold">{partner?.ide}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#00d9ff]/20">
                    <span className="text-gray-400 text-sm">Theme</span>
                    <span className="text-white font-semibold">{partner?.theme_display}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400 text-sm">Approach</span>
                    <span className="text-white font-semibold">{partner?.approach_score}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-12 max-w-2xl mx-auto bg-[#0f1625] border-2 border-[#00ff88]/30 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Connect With Your Partner</h3>
              <p className="text-gray-400 mb-6">
                Reach out to start collaborating on your project!
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#00ff88]/10 border border-[#00ff88] text-[#00ff88]">
                <span className="font-mono">📧</span>
                <span className="font-mono">{partner?.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti 3s linear infinite;
        }

        @keyframes draw {
          from {
            stroke-dashoffset: ${2 * Math.PI * 90};
          }
          to {
            stroke-dashoffset: ${2 * Math.PI * 90 * (1 - (compatibility_percentage || 0) / 100)};
          }
        }

        .animate-draw {
          animation: draw 2s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
