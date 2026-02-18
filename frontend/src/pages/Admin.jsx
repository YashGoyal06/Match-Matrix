import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../api';
import { Users, RefreshCw, Link as LinkIcon, AlertTriangle } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, mRes] = await Promise.all([
        adminAPI.getAllParticipants(),
        adminAPI.getAllMatches()
      ]);
      if (pRes.data.success) setParticipants(pRes.data.participants);
      if (mRes.data.success) setMatches(mRes.data.matches);
    } catch (err) {
      console.error("Admin Load Error:", err);
    }
  };

  const handleGenerateMatches = async () => {
    if (!window.confirm('WARNING: This will reshuffle all unmatched users. Continue?')) return;
    setLoading(true);
    try {
      const response = await adminAPI.generateMatches();
      if (response.data.success) {
        setStats(response.data.stats);
        await fetchData();
      }
    } catch (err) {
      alert('Failed to generate matches');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white p-6 font-space">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="text-[#00ff88]">System</span> Admin
          </h1>
          <button onClick={() => navigate('/')} className="px-4 py-2 border border-white/20 rounded hover:bg-white/5 transition-colors">Exit Console</button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<Users />} label="Total Agents" value={participants.length} color="text-blue-400" />
          <StatCard icon={<LinkIcon />} label="Total Links" value={matches.length} color="text-[#00ff88]" />
          <StatCard icon={<AlertTriangle />} label="Waiting" value={participants.filter(p => !p.is_matched).length} color="text-yellow-400" />
        </div>

        {/* Matches List - Shows Both Algo Matches and Duos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0f1625] border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex justify-between items-center">
              <span>Active Links (Duos & Algo)</span>
              <span className="text-xs text-[#00ff88]">{matches.length} LINKS</span>
            </div>
            <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
              {matches.length === 0 ? <p className="text-gray-500 text-center py-4">No data.</p> : matches.map((m, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-[#0a0e1a] border border-white/5 rounded-lg hover:border-[#00ff88]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[#00ff88] text-xs">#{i+1}</span>
                    <div className="text-sm">
                      <div className="font-bold text-white">{m.participant1.name}</div>
                      <div className="font-bold text-white">{m.participant2.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-[#00ff88]">{m.compatibility_percentage}%</div>
                    <div className="text-[10px] text-gray-500 tracking-wider">SYNC SCORE</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unmatched / All Participants */}
          <div className="bg-[#0f1625] border border-white/10 rounded-xl overflow-hidden">
             <div className="p-4 border-b border-white/10 bg-white/5 font-bold flex justify-between items-center">
                <span>Agent Registry</span>
                <button onClick={handleGenerateMatches} disabled={loading} className="text-xs bg-[#00ff88] text-black px-3 py-1 rounded font-bold hover:bg-[#00d9ff] disabled:opacity-50">
                  {loading ? 'RUNNING...' : 'RUN MATCHING'}
                </button>
            </div>
            <div className="max-h-[600px] overflow-y-auto p-4 space-y-2">
              {participants.map((p) => (
                <div key={p.id} className="flex justify-between items-center p-3 bg-[#0a0e1a] border border-white/5 rounded-lg">
                  <div>
                    <div className="font-bold text-sm">{p.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{p.role_display}</div>
                  </div>
                  {p.is_matched ? (
                    <span className="px-2 py-1 bg-[#00ff88]/20 text-[#00ff88] text-xs rounded font-mono font-bold">LINKED</span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded font-mono font-bold">WAITING</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-[#0f1625] border border-white/10 p-6 rounded-xl flex items-center gap-4">
    <div className={`text-3xl ${color}`}>{icon}</div>
    <div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  </div>
);

export default Admin;
