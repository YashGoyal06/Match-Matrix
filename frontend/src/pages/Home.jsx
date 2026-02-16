import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Zap, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e1a] overflow-hidden selection:bg-[#00ff88] selection:text-[#0a0e1a]">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#00ff88] opacity-20 blur-[100px]" />
        <div className="absolute right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7b2ff7] opacity-20 blur-[100px]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#00ff88]/20 font-mono text-sm"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
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

      {/* Main Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center justify-center min-h-screen text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="px-4 py-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] font-mono text-xs tracking-wider uppercase backdrop-blur-md">
            System Online • v2.0
          </span>
        </motion.div>

        {/* Hero Title with Glitch Effect */}
        <motion.div variants={itemVariants} className="mb-6 relative">
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-2 font-space">
            MATCH
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d9ff] to-[#7b2ff7]">
              MATRIX
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-12">
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            The ultimate algorithmic collaboration protocol. <br />
            Find your perfect tech stack partner through neural matching.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            onClick={() => navigate('/register')}
            className="group relative px-8 py-4 bg-[#00ff88] text-[#0a0e1a] font-bold text-lg tracking-wider overflow-hidden rounded-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              INITIALIZE PROTOCOL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl text-left">
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-[#00d9ff]" />}
            title="Rapid Matching"
            desc="Our neural engine processes your skills in milliseconds to find the optimal teammate."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-[#00ff88]" />}
            title="Stack Compatible"
            desc="We analyze syntax preferences, IDE choices, and working hours for friction-free coding."
            delay={0.4}
          />
          <FeatureCard 
            icon={<Sparkles className="w-8 h-8 text-[#7b2ff7]" />}
            title="Event Ready"
            desc="Specifically calibrated for hackathons, sprints, and rapid prototyping sessions."
            delay={0.6}
          />
        </div>
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-[#0f1623] border border-white/5 hover:border-[#00ff88]/30 transition-colors group"
  >
    <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:bg-white/10 transition-colors">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 font-space">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

export default Home;