import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0e1a]">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Radial Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 50%)`
          }}
        />
      </div>

      {/* Floating Matrix Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#00ff88] opacity-20 font-mono text-xs animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            {['01', '10', '11', '00', '{', '}', '<', '>', '/'][Math.floor(Math.random() * 9)]}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Logo/Badge */}
        <div className="mb-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-[#00ff88] opacity-30 animate-pulse-slow" />
            <div className="relative px-6 py-2 border-2 border-[#00ff88] bg-[#0a0e1a]/90 backdrop-blur-sm">
              <span className="text-[#00ff88] font-mono text-sm tracking-widest">MATRIX CLUB PRESENTS</span>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-center animate-slide-up">
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-2">
            MATCH
          </div>
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00d9ff] to-[#7b2ff7]">
              MATRIX
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto mb-4 text-xl md:text-2xl text-center text-gray-300 animate-fade-in-delay font-light tracking-wide">
          Tech Compatibility & Collaboration Event
        </p>

        {/* Event Details */}
        <div className="flex items-center gap-3 mb-12 animate-fade-in-delay-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00ff88]" />
          <div className="px-4 py-2 border border-[#00ff88]/30 bg-[#00ff88]/5 backdrop-blur-sm">
            <span className="text-[#00ff88] font-mono text-sm">February 20, 2026</span>
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00ff88]" />
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/register')}
          className="group relative px-12 py-5 text-lg font-bold text-[#0a0e1a] bg-[#00ff88] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00ff88]/50 animate-fade-in-delay-3"
        >
          <span className="relative z-10">START QUIZ</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d9ff] to-[#7b2ff7] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            START QUIZ
          </span>
        </button>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full animate-fade-in-delay-4">
          {[
            { title: 'Take the Quiz', desc: 'Answer questions about your tech stack and working style', icon: '📝' },
            { title: 'Get Matched', desc: 'Our algorithm finds your perfect collaboration partner', icon: '🔗' },
            { title: 'Build Together', desc: 'Team up and create something amazing', icon: '🚀' }
          ].map((card, idx) => (
            <div 
              key={idx} 
              className="group relative p-6 border border-[#00ff88]/20 bg-[#0a0e1a]/50 backdrop-blur-sm hover:border-[#00ff88]/50 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/0 to-[#00ff88]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-[#00ff88] mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        .animate-float {
          animation: float 10s infinite ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-out 0.6s both;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 1s ease-out 0.9s both;
        }

        .animate-fade-in-delay-4 {
          animation: fadeIn 1s ease-out 1.2s both;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out 0.2s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
