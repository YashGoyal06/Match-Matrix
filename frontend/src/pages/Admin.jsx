import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [participantsRes, matchesRes] = await Promise.all([
        adminAPI.getAllParticipants(),
        adminAPI.getAllMatches()
      ]);

      if (participantsRes.data.success) {
        setParticipants(participantsRes.data.participants);
      }
      if (matchesRes.data.success) {
        setMatches(matchesRes.data.matches);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleGenerateMatches = async () => {
    if (!window.confirm('This will clear existing matches and generate new ones. Continue?')) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await adminAPI.generateMatches();
      
      if (response.data.success) {
        setStats(response.data.stats);
        setMessage({ 
          type: 'success', 
          text: `Successfully generated ${response.data.stats.matches_created} matches!` 
        });
        
        // Refresh data
        await fetchData();
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to generate matches' 
      });
    } finally {
      setLoading(false);
    }
  };

  const matchedCount = participants.filter(p => p.is_matched).length;
  const unmatchedCount = participants.length - matchedCount;

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-8 px-4 sm:px-6 lg:px-8">
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

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Admin <span className="text-[#00ff88]">Panel</span>
            </h1>
            <p className="text-gray-400 font-mono">Match Matrix Control Center</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 border-2 border-[#00ff88]/50 text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0e1a] transition-all font-mono"
          >
            ← HOME
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-6 hover:border-[#00ff88] transition-colors">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-black text-white mb-1">{participants.length}</div>
            <div className="text-gray-400 text-sm font-mono">Total Participants</div>
          </div>

          <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-6 hover:border-[#00ff88] transition-colors">
            <div className="text-4xl mb-2">✓</div>
            <div className="text-3xl font-black text-[#00ff88] mb-1">{matchedCount}</div>
            <div className="text-gray-400 text-sm font-mono">Matched</div>
          </div>

          <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-6 hover:border-[#00ff88] transition-colors">
            <div className="text-4xl mb-2">⏳</div>
            <div className="text-3xl font-black text-yellow-400 mb-1">{unmatchedCount}</div>
            <div className="text-gray-400 text-sm font-mono">Unmatched</div>
          </div>

          <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-6 hover:border-[#00ff88] transition-colors">
            <div className="text-4xl mb-2">🔗</div>
            <div className="text-3xl font-black text-white mb-1">{matches.length}</div>
            <div className="text-gray-400 text-sm font-mono">Total Matches</div>
          </div>
        </div>

        {/* Generate Matches Section */}
        <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Generate Matches</h2>
          <p className="text-gray-400 mb-6">
            Run the compatibility algorithm to pair all registered participants. 
            This will clear existing matches and create new optimal pairings.
          </p>

          <button
            onClick={handleGenerateMatches}
            disabled={loading || participants.length < 2}
            className="px-8 py-4 bg-[#00ff88] text-[#0a0e1a] font-bold text-lg hover:bg-[#00d9ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-[#0a0e1a] border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <span>🔄</span>
                Generate Matches
              </>
            )}
          </button>

          {participants.length < 2 && (
            <p className="text-yellow-400 text-sm mt-3 font-mono">
              ⚠️ Need at least 2 participants to generate matches
            </p>
          )}

          {message.text && (
            <div className={`mt-6 p-4 border-2 ${
              message.type === 'success' 
                ? 'bg-[#00ff88]/10 border-[#00ff88] text-[#00ff88]' 
                : 'bg-red-500/10 border-red-500 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {stats && (
            <div className="mt-6 p-6 bg-[#00ff88]/5 border border-[#00ff88]/30">
              <h3 className="text-lg font-bold text-[#00ff88] mb-4">Last Generation Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
                <div>
                  <div className="text-gray-400">Total Participants</div>
                  <div className="text-white font-bold text-xl">{stats.total_participants}</div>
                </div>
                <div>
                  <div className="text-gray-400">Matches Created</div>
                  <div className="text-white font-bold text-xl">{stats.matches_created}</div>
                </div>
                <div>
                  <div className="text-gray-400">Matched</div>
                  <div className="text-white font-bold text-xl">{stats.matched_participants}</div>
                </div>
                <div>
                  <div className="text-gray-400">Unmatched</div>
                  <div className="text-white font-bold text-xl">{stats.unmatched_participants}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Participants List */}
        <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Registered Participants</h2>
          
          {participants.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No participants registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#00ff88]/30">
                    <th className="py-3 px-4 text-[#00ff88] font-mono text-sm">Name</th>
                    <th className="py-3 px-4 text-[#00ff88] font-mono text-sm">Student ID</th>
                    <th className="py-3 px-4 text-[#00ff88] font-mono text-sm">Role</th>
                    <th className="py-3 px-4 text-[#00ff88] font-mono text-sm">Language</th>
                    <th className="py-3 px-4 text-[#00ff88] font-mono text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant.id} className="border-b border-[#00ff88]/10 hover:bg-[#00ff88]/5 transition-colors">
                      <td className="py-3 px-4 text-white">{participant.name}</td>
                      <td className="py-3 px-4 text-gray-400 font-mono text-sm">{participant.student_id}</td>
                      <td className="py-3 px-4 text-gray-300">{participant.role_display}</td>
                      <td className="py-3 px-4 text-gray-300">{participant.preferred_language}</td>
                      <td className="py-3 px-4">
                        {participant.is_matched ? (
                          <span className="px-3 py-1 bg-[#00ff88] text-[#0a0e1a] text-xs font-bold">MATCHED</span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500">PENDING</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Matches List */}
        {matches.length > 0 && (
          <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Generated Matches</h2>
            
            <div className="space-y-4">
              {matches.map((match, idx) => (
                <div 
                  key={match.id} 
                  className="p-6 bg-[#0a0e1a] border border-[#00ff88]/20 hover:border-[#00ff88]/50 transition-colors"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00ff88] to-[#00d9ff] flex items-center justify-center text-[#0a0e1a] font-black text-xl">
                        {idx + 1}
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-white font-bold">{match.participant1.name}</div>
                          <div className="text-gray-400 text-sm">{match.participant1.role_display}</div>
                        </div>
                        <div className="text-[#00ff88] text-2xl">⟷</div>
                        <div>
                          <div className="text-white font-bold">{match.participant2.name}</div>
                          <div className="text-gray-400 text-sm">{match.participant2.role_display}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-[#00ff88]">
                        {Math.round(match.compatibility_percentage)}%
                      </div>
                      <div className="text-gray-400 text-xs font-mono">COMPATIBILITY</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
