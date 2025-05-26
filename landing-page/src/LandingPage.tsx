import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Users, Zap, Check, ExternalLink, Star, Book, ArrowRight, Menu, X, Layers, Palette, Terminal } from 'lucide-react';

// Custom Logo Component
const DesignToCodeLogo = ({ className = "w-12 h-12" }) => {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Design Side - Left */}
      <rect x="10" y="30" width="40" height="60" rx="4" fill="url(#gradient1)" opacity="0.8"/>
      <rect x="18" y="38" width="24" height="4" rx="2" fill="#10b981"/>
      <rect x="18" y="46" width="16" height="4" rx="2" fill="#10b981"/>
      <circle cx="30" cy="60" r="8" fill="#10b981"/>
      <rect x="18" y="74" width="24" height="8" rx="2" fill="#10b981" opacity="0.6"/>
      
      {/* Arrow - Middle */}
      <path d="M55 60 L65 60" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
      <path d="M62 55 L67 60 L62 65" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Code Side - Right */}
      <rect x="70" y="30" width="40" height="60" rx="4" fill="url(#gradient2)" opacity="0.8"/>
      <text x="76" y="45" fill="#14b8a6" fontSize="10" fontFamily="monospace">&lt;div&gt;</text>
      <text x="82" y="58" fill="#0d9488" fontSize="8" fontFamily="monospace">code</text>
      <text x="76" y="71" fill="#14b8a6" fontSize="10" fontFamily="monospace">&lt;/div&gt;</text>
      <circle cx="96" cy="80" r="2" fill="#10b981"/>
      <circle cx="102" cy="80" r="2" fill="#14b8a6"/>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="10" y1="30" x2="50" y2="90">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.8"/>
        </linearGradient>
        <linearGradient id="gradient2" x1="70" y1="30" x2="110" y2="90">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    { id: 1, title: "Introduction to Design-to-Code Technologies", duration: "30 min", level: "Basic" },
    { id: 2, title: "Environment Setup & Basics", duration: "45 min", level: "Basic" },
    { id: 3, title: "Figma Analysis & Component Extraction", duration: "60 min", level: "Intermediate" },
    { id: 4, title: "AI-Powered Code Generation", duration: "90 min", level: "Intermediate" },
    { id: 5, title: "Design System Implementation", duration: "120 min", level: "Advanced" },
    { id: 6, title: "Advanced Component Patterns", duration: "90 min", level: "Advanced" },
    { id: 7, title: "Responsive Design & Accessibility", duration: "60 min", level: "Intermediate" },
    { id: 8, title: "Testing & Quality Assurance", duration: "90 min", level: "Advanced" },
    { id: 9, title: "Production Deployment & Optimization", duration: "120 min", level: "Advanced" }
  ];

  const benefits = [
    { metric: "70%", description: "Reduction in development time" },
    { metric: "99%", description: "Design fidelity maintained" },
    { metric: "60%", description: "Less manual coding required" },
    { metric: "4x", description: "Faster component delivery" }
  ];

  const prerequisites = [
    "Azure Free Account",
    "GitHub account with Copilot",
    "Figma Free Account",
    "VS Code installed",
    "Node.js 18+ installed",
    "Basic HTML/CSS/JS knowledge"
  ];

  const designToCodeFeatures = [
    {
      icon: Palette,
      title: "Design Analysis",
      description: "Extract design tokens and components from Figma"
    },
    {
      icon: Layers,
      title: "Component Structure",
      description: "Identify and organize UI components automatically"
    },
    {
      icon: Terminal,
      title: "Code Generation",
      description: "Generate production-ready code with AI assistance"
    },
    {
      icon: Zap,
      title: "Multi-Framework",
      description: "Support for React, Angular, Vue, and vanilla JS"
    }
  ];

  const relatedRepos = [
    {
      title: "Design-to-Code Playbook",
      description: "Comprehensive guide for transforming Figma designs into production-ready code",
      link: "https://github.com/paulasilvatech/Design-to-Code-Dev"
    },
    {
      title: "AI Code Development",
      description: "Complete guide for leveraging AI tools to optimize code quality",
      link: "https://github.com/paulasilvatech/Code-AI-Dev"
    },
    {
      title: "Agentic Operations",
      description: "Implementing observability solutions for cloud applications",
      link: "https://github.com/paulasilvatech/Agentic-Ops-Dev"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-teal-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <DesignToCodeLogo className="w-10 h-10" />
              <span className="text-xl font-bold">Design to Code AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#modules" className="hover:text-emerald-400 transition-colors">Modules</a>
              <a href="#impact" className="hover:text-emerald-400 transition-colors">Impact</a>
              <a href="#prerequisites" className="hover:text-emerald-400 transition-colors">Prerequisites</a>
              <a href="#start" className="hover:text-emerald-400 transition-colors">Get Started</a>
              <a href="https://github.com/paulasilvatech/Design-to-Code-Dev" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors">
                <Star className="w-4 h-4" />
                <span>Star on GitHub</span>
              </a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a href="#modules" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Modules</a>
              <a href="#impact" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Impact</a>
              <a href="#prerequisites" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Prerequisites</a>
              <a href="#start" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">

          
          <div className="flex justify-center mb-6">
            <span className="bg-emerald-600/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              🚀 AI-Powered Design to Code Workshop
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            Transform Designs into Code with AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master the art of converting Figma designs into production-ready code using GitHub Copilot, Azure AI, and modern development workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/paulasilvatech/Design-to-Code-Dev/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
              <span>Visit GitHub Repository</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#start" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all">
              <span>Get Started</span>
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>90 min - 6+ hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Beginner to Advanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Hands-on Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Design to Code Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The Design-to-Code Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your design workflow with AI-powered automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designToCodeFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section id="impact" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Business Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Organizations implementing design-to-code automation report significant improvements across key metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center transform hover:scale-105 transition-all">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
                  {benefit.metric}
                </div>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Workshop Modules</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Progressive learning path from basics to enterprise-scale implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div key={module.id} className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-600">0{module.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    module.level === 'Basic' ? 'bg-green-600/20 text-green-300' :
                    module.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {module.level}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {module.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{module.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section id="prerequisites" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Prerequisites</h2>
              <p className="text-xl text-gray-300 mb-8">
                Everything you need to get started with the workshop. All tools have free tiers available.
              </p>
              <ul className="space-y-4">
                {prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-lg">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4 text-center">AI-Powered Development</h3>
              <p className="text-gray-300 mb-6 text-center">
                Learn to leverage GitHub Copilot and Azure AI to accelerate your design-to-code workflow by 70% while maintaining design fidelity.
              </p>
              <a href="#start" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium w-full justify-center">
                Start your journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="start" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started in Minutes</h2>
          <p className="text-xl text-gray-300 mb-12">
            Follow these simple steps to begin your design-to-code journey
          </p>

          <div className="space-y-6 text-left">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Fork and Clone the Repository</h3>
                  <code className="bg-gray-900 px-4 py-2 rounded-md text-sm block overflow-x-auto">
                    git clone https://github.com/YourUsername/Design-to-Code-Dev.git
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Quick Start (30 minutes)</h3>
                  <p className="text-gray-300">Follow the Quick Start Guide for immediate hands-on experience</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Follow the Workshop Structure</h3>
                  <p className="text-gray-300">Progress through modules based on your experience level</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Try the Practical Demo</h3>
                  <p className="text-gray-300">Apply what you've learned with real-world exercises</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a href="https://github.com/paulasilvatech/Design-to-Code-Dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              <span>View on GitHub</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Repositories */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Related Resources</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our ecosystem of AI-powered development tools and workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedRepos.map((repo, index) => (
              <a key={index} href={repo.link} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <Book className="w-8 h-8 text-emerald-400" />
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {repo.title}
                </h3>
                <p className="text-gray-300">
                  {repo.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Developed by{' '}
            <a href="https://github.com/paulasilvatech" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
              Paula Silva
            </a>
            , Developer Productivity Global Black Belt at Microsoft Americas
          </p>
          <p className="text-gray-500">
            Bridging the gap between design and development through AI-powered automation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;