import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { participantAPI } from '../api';

const RegisterQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    student_id: '',
    role: '',
    preferred_language: '',
    ide: '',
    theme_preference: '',
    approach_score: 5
  });

  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.email || !formData.student_id) {
          setError('Please fill in all fields');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Please enter a valid email');
          return false;
        }
        break;
      case 2:
        if (!formData.role) {
          setError('Please select your primary role');
          return false;
        }
        break;
      case 3:
        if (!formData.preferred_language || !formData.ide) {
          setError('Please fill in all fields');
          return false;
        }
        break;
      case 4:
        if (!formData.theme_preference) {
          setError('Please select your theme preference');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError('');

    try {
      const response = await participantAPI.register(formData);
      if (response.data.success) {
        localStorage.setItem('userEmail', formData.email);
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">Basic Information</h2>
            <p className="text-gray-400 mb-8">Let's start with the basics</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#00ff88]/30 text-white focus:border-[#00ff88] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#00ff88]/30 text-white focus:border-[#00ff88] focus:outline-none transition-colors"
                  placeholder="john@college.edu"
                />
              </div>

              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-2">Student ID</label>
                <input
                  type="text"
                  value={formData.student_id}
                  onChange={(e) => handleInputChange('student_id', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#00ff88]/30 text-white focus:border-[#00ff88] focus:outline-none transition-colors"
                  placeholder="STU12345"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">Your Tech Role</h2>
            <p className="text-gray-400 mb-8">What's your primary development focus?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { value: 'frontend', label: 'Frontend Developer', icon: '🎨', desc: 'UI/UX, React, Vue' },
                { value: 'backend', label: 'Backend Developer', icon: '⚙️', desc: 'APIs, Databases' },
                { value: 'fullstack', label: 'Full Stack Developer', icon: '🔧', desc: 'End-to-end development' },
                { value: 'aiml', label: 'AI/ML Engineer', icon: '🤖', desc: 'Machine Learning, AI' }
              ].map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleInputChange('role', role.value)}
                  className={`group relative p-6 border-2 text-left transition-all duration-300 hover:scale-105 ${
                    formData.role === role.value
                      ? 'border-[#00ff88] bg-[#00ff88]/10'
                      : 'border-[#00ff88]/20 bg-[#0a0e1a]/50 hover:border-[#00ff88]/50'
                  }`}
                >
                  <div className="text-4xl mb-3">{role.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{role.label}</h3>
                  <p className="text-gray-400 text-sm">{role.desc}</p>
                  {formData.role === role.value && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-[#00ff88] flex items-center justify-center">
                        <span className="text-[#0a0e1a] text-sm">✓</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">Tech Stack</h2>
            <p className="text-gray-400 mb-8">Tell us about your preferred tools</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-2">Preferred Programming Language</label>
                <select
                  value={formData.preferred_language}
                  onChange={(e) => handleInputChange('preferred_language', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#00ff88]/30 text-white focus:border-[#00ff88] focus:outline-none transition-colors"
                >
                  <option value="">Select a language</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="C#">C#</option>
                  <option value="Go">Go</option>
                  <option value="Rust">Rust</option>
                  <option value="Ruby">Ruby</option>
                  <option value="PHP">PHP</option>
                </select>
              </div>

              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-2">Preferred IDE/Editor</label>
                <select
                  value={formData.ide}
                  onChange={(e) => handleInputChange('ide', e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0e1a] border-2 border-[#00ff88]/30 text-white focus:border-[#00ff88] focus:outline-none transition-colors"
                >
                  <option value="">Select an IDE</option>
                  <option value="VS Code">VS Code</option>
                  <option value="PyCharm">PyCharm</option>
                  <option value="IntelliJ IDEA">IntelliJ IDEA</option>
                  <option value="WebStorm">WebStorm</option>
                  <option value="Sublime Text">Sublime Text</option>
                  <option value="Vim">Vim</option>
                  <option value="Neovim">Neovim</option>
                  <option value="Emacs">Emacs</option>
                  <option value="Visual Studio">Visual Studio</option>
                  <option value="Eclipse">Eclipse</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-white mb-2">Working Style</h2>
            <p className="text-gray-400 mb-8">Help us understand how you work</p>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-2">Theme Preference</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'dark', label: 'Dark Mode', icon: '🌙', color: 'from-purple-600 to-blue-600' },
                    { value: 'light', label: 'Light Mode', icon: '☀️', color: 'from-yellow-400 to-orange-400' }
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleInputChange('theme_preference', theme.value)}
                      className={`relative p-6 border-2 text-center transition-all duration-300 ${
                        formData.theme_preference === theme.value
                          ? 'border-[#00ff88] bg-[#00ff88]/10'
                          : 'border-[#00ff88]/20 bg-[#0a0e1a]/50 hover:border-[#00ff88]/50'
                      }`}
                    >
                      <div className="text-5xl mb-3">{theme.icon}</div>
                      <h3 className="text-lg font-bold text-white">{theme.label}</h3>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#00ff88] font-mono text-sm mb-4">
                  Work Approach: {formData.approach_score}/10
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.approach_score}
                    onChange={(e) => handleInputChange('approach_score', parseInt(e.target.value))}
                    className="w-full h-2 bg-[#00ff88]/20 appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #00ff88 0%, #00ff88 ${(formData.approach_score - 1) * 11.11}%, rgba(0, 255, 136, 0.2) ${(formData.approach_score - 1) * 11.11}%, rgba(0, 255, 136, 0.2) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Highly Structured</span>
                    <span>Balanced</span>
                    <span>Highly Flexible</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-[#00ff88] hover:text-[#00d9ff] transition-colors mb-6 font-mono text-sm"
          >
            ← Back to Home
          </button>
          <h1 className="text-5xl font-black text-white mb-4">
            Registration <span className="text-[#00ff88]">Quiz</span>
          </h1>
          <p className="text-gray-400">Complete all steps to find your perfect match</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`w-10 h-10 flex items-center justify-center border-2 font-bold transition-all duration-300 ${
                  currentStep >= step 
                    ? 'border-[#00ff88] bg-[#00ff88] text-[#0a0e1a]' 
                    : 'border-[#00ff88]/30 text-[#00ff88]/50'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-0.5 transition-all duration-300 ${
                    currentStep > step ? 'bg-[#00ff88]' : 'bg-[#00ff88]/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>Basic</span>
            <span>Role</span>
            <span>Stack</span>
            <span>Style</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-[#0f1625] border-2 border-[#00ff88]/30 p-8 md:p-12 mb-8">
          {renderStep()}
          
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border-2 border-red-500 text-red-400 animate-shake">
              {error}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-8 py-3 border-2 border-[#00ff88] font-bold transition-all ${
              currentStep === 1
                ? 'opacity-30 cursor-not-allowed'
                : 'text-[#00ff88] hover:bg-[#00ff88] hover:text-[#0a0e1a]'
            }`}
          >
            BACK
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[#00ff88] text-[#0a0e1a] font-bold hover:bg-[#00d9ff] transition-colors"
            >
              NEXT
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-8 py-3 bg-[#00ff88] text-[#0a0e1a] font-bold hover:bg-[#00d9ff] transition-colors disabled:opacity-50"
            >
              {loading ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #00ff88;
          cursor: pointer;
          border: 3px solid #0a0e1a;
        }

        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #00ff88;
          cursor: pointer;
          border: 3px solid #0a0e1a;
        }
      `}</style>
    </div>
  );
};

export default RegisterQuiz;
