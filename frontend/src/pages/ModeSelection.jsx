import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Users, ArrowLeft } from 'lucide-react';
import LightRays from './LightRays';

const ModeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] flex items-center justify-center p-6 font-space overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <LightRays raysOrigin="top-center" raysColor="#00ff88" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-[-80px] left-0 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} /> ABORT
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            SELECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#064e3b]">PROTOCOL</span>
          </h2>
          <p className="text-gray-400 text-xl font-light">Choose your initialization vector.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SelectionCard 
            title="SOLO AGENT" 
            desc="Enter the matrix alone. The algorithm will find your optimal neural pair from the pool of active agents." 
            icon={<User size={64} />}
            delay={0.1}
            onClick={() => navigate('/register')}
          />
          <SelectionCard 
            title="DUO SQUAD" 
            desc="Register with a pre-selected partner. Run compatibility diagnostics to calculate your team's sync score." 
            icon={<Users size={64} />}
            delay={0.2}
            onClick={() => navigate('/register-duo')}
          />
        </div>
      </div>
    </div>
  );
};

const SelectionCard = ({ title, desc, icon, onClick, delay }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.03, borderColor: '#00ff88' }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="relative group p-10 bg-[#0f1623]/80 backdrop-blur-xl border border-white/10 rounded-3xl text-left transition-all overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/0 to-[#00ff88]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative z-10">
      <div className="mb-8 text-[#00ff88] p-4 bg-[#00ff88]/10 w-fit rounded-2xl group-hover:bg-[#00ff88] group-hover:text-[#0a0e1a] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-white mb-4 tracking-wide font-space">{title}</h3>
      <p className="text-gray-400 font-light leading-relaxed text-lg">{desc}</p>
    </div>
  </motion.button>
);

export default ModeSelection;
