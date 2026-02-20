import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LightRays from './LightRays';
import { adminAPI } from '../api'; // Reusing your existing API setup

const Showcase = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await adminAPI.getMatches();
        setMatches(res.data.matches);
      } catch (error) {
        console.error("Failed to fetch matches", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] text-white flex flex-col font-space overflow-hidden py-12 px-4">
      <div className="absolute inset-0 z-0 opacity-50">
        <LightRays raysColor="#00ff88" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00b8ff]">
            OFFICIAL MATCH RESULTS
          </h1>
          <p className="text-gray-400 font-mono">ALL SECURED PAIRINGS</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0f1623]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:border-[#00ff88]/50 transition-colors"
              >
                <div className="text-lg font-bold text-white mb-2">
                  {match.participant1.name}
                </div>
                <div className="text-[#00ff88] font-mono text-sm mb-2">
                  ⚔️ SYNCED ⚔️
                </div>
                <div className="text-lg font-bold text-white">
                  {match.participant2.name}
                </div>
                <div className="mt-4 text-xs font-mono text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                  Compatibility: {match.compatibility_percentage}%
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Showcase;
