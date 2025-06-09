import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Users, Zap, Check, ExternalLink, Book, ArrowRight, Menu, X, Layers, Palette, Terminal, AlertCircle, Mail, Phone, MessageSquare, Lock } from 'lucide-react';

// Type definitions
interface Module {
  id: number;
  title: string;
  duration: string;
  level: string;
  description: string;
  learningObjectives: string[];
  technologies: string[];
  exercises: string;
}

// Custom Logo Component - Design to Code Theme
const DesignToCodeLogo = ({ className = "w-12 h-12" }) => {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="60" cy="60" r="55" fill="url(#bgGradient)" opacity="0.1"/>
      
      {/* Design Side - Left */}
      <rect x="15" y="35" width="35" height="50" rx="4" fill="url(#designGradient)" opacity="0.8"/>
      <rect x="22" y="42" width="21" height="3" rx="1.5" fill="#10b981"/>
      <rect x="22" y="49" width="14" height="3" rx="1.5" fill="#10b981"/>
      <circle cx="30" cy="60" r="6" fill="#34d399"/>
      <rect x="22" y="70" width="21" height="6" rx="2" fill="#10b981" opacity="0.6"/>
      
      {/* Arrow - Middle */}
      <path d="M52 60 L68 60" stroke="#10b981" strokeWidth="3" strokeLinecap="round"/>
      <path d="M64 55 L69 60 L64 65" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Code Side - Right */}
      <rect x="70" y="35" width="35" height="50" rx="4" fill="url(#codeGradient)" opacity="0.8"/>
      <text x="75" y="48" fill="#14b8a6" fontSize="9" fontFamily="monospace">&lt;div&gt;</text>
      <text x="80" y="60" fill="#0d9488" fontSize="7" fontFamily="monospace">code</text>
      <text x="75" y="72" fill="#14b8a6" fontSize="9" fontFamily="monospace">&lt;/div&gt;</text>
      <circle cx="92" cy="78" r="2" fill="#10b981"/>
      <circle cx="97" cy="78" r="2" fill="#14b8a6"/>
      
      {/* Decorative Elements */}
      <circle cx="25" cy="25" r="3" fill="#34d399" opacity="0.6"/>
      <circle cx="95" cy="25" r="3" fill="#14b8a6" opacity="0.6"/>
      <circle cx="25" cy="95" r="3" fill="#10b981" opacity="0.6"/>
      <circle cx="95" cy="95" r="3" fill="#0d9488" opacity="0.6"/>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="designGradient" x1="15" y1="35" x2="50" y2="85">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.9"/>
        </linearGradient>
        <linearGradient id="codeGradient" x1="70" y1="35" x2="105" y2="85">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.9"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

// Modal Component
const ModuleModal = ({ module, isOpen, onClose }: { module: Module; isOpen: boolean; onClose: () => void }) => {
  const scrollToAccessForm = () => {
    onClose();
    const element = document.getElementById('access-request');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xl transition-all w-full max-w-3xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="p-8 space-y-6">
            {/* Header with Large Number and Level Badge */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-6xl font-bold text-emerald-400">0{module.id}</span>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  module.level === 'Basic' ? 'bg-green-600/20 text-green-300' :
                  module.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                  'bg-red-600/20 text-red-300'
                }`}>
                  {module.level}
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-3">{module.title}</h3>
              <p className="flex items-center text-gray-400 text-lg mb-4">
                <span className="text-2xl mr-2">🕐</span>
                <span>{module.duration}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed">{module.description}</p>

            {/* Learning Objectives */}
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Learning Objectives
              </h4>
              <ul className="space-y-3">
                {module.learningObjectives.map((objective: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl mt-0.5">✓</span>
                    <span className="text-gray-300">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies & Tools */}
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">⚙️</span>
                Technologies & Tools
              </h4>
              <div className="flex flex-wrap gap-3">
                {module.technologies.map((tech: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 bg-emerald-600/20 text-emerald-300 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Hands-on Exercises */}
            <div>
              <h4 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-2xl mr-2">💻</span>
                Hands-on Exercises
              </h4>
              <p className="text-gray-300">{module.exercises}</p>
            </div>

            {/* Request Access Button */}
            <button 
              onClick={scrollToAccessForm}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
            >
              <Lock className="w-5 h-5" />
              <span>Request Access</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    corporateEmail: '',
    fullName: '',
    companyName: '',
    jobTitle: '',
    teamSize: '',
    deliveryFormat: '',
    contactMethod: [] as string[],
    workshopInterest: [] as string[],
    message: '',
    gdprConsent: false
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToAccessForm = () => {
    const element = document.getElementById('access-request');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openModuleModal = (module: Module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  const modules = [
    { 
      id: 1, 
      title: "Introduction to Design-to-Code Technologies", 
      duration: "30 min", 
      level: "Basic",
      description: "Start your journey into the world of automated design-to-code transformation. Learn the fundamentals of modern development workflows and how AI can accelerate your productivity.",
      learningObjectives: [
        "Understand the design-to-code workflow fundamentals",
        "Learn about AI-powered development tools",
        "Explore the benefits of automated code generation"
      ],
      technologies: ["Figma", "VS Code", "GitHub Copilot", "Azure AI"],
      exercises: "2 hands-on exercises including environment setup and your first AI-assisted code generation"
    },
    { 
      id: 2, 
      title: "Environment Setup & Basics", 
      duration: "45 min", 
      level: "Basic",
      description: "Configure your development environment for optimal design-to-code workflow. Set up essential tools and extensions that will supercharge your productivity.",
      learningObjectives: [
        "Configure development environment",
        "Set up necessary tools and extensions",
        "Understand project structure"
      ],
      technologies: ["Node.js", "VS Code Extensions", "Git", "Figma API"],
      exercises: "3 practical labs covering VS Code configuration, GitHub Copilot setup, and Figma API integration"
    },
    { 
      id: 3, 
      title: "Figma Analysis & Component Extraction", 
      duration: "60 min", 
      level: "Intermediate",
      description: "Master the art of analyzing Figma designs and extracting reusable components. Learn to identify patterns and convert design elements into structured code.",
      learningObjectives: [
        "Extract design tokens from Figma",
        "Identify reusable components",
        "Map design elements to code structures"
      ],
      technologies: ["Figma API", "Design Tokens", "JSON", "TypeScript"],
      exercises: "4 exercises including design token extraction and component mapping documentation"
    },
    { 
      id: 4, 
      title: "AI-Powered Code Generation", 
      duration: "90 min", 
      level: "Intermediate",
      description: "Leverage the power of GitHub Copilot and AI to generate production-ready code from designs. Learn prompt engineering techniques for optimal results.",
      learningObjectives: [
        "Master GitHub Copilot for component generation",
        "Implement AI-driven code completion",
        "Optimize generated code quality"
      ],
      technologies: ["GitHub Copilot", "React", "TypeScript", "Tailwind CSS"],
      exercises: "5+ hands-on labs generating React components and implementing responsive layouts with AI"
    },
    { 
      id: 5, 
      title: "Design System Implementation", 
      duration: "120 min", 
      level: "Advanced",
      description: "Build enterprise-grade design systems that scale. Create component libraries that maintain consistency across large applications and teams.",
      learningObjectives: [
        "Build scalable design systems",
        "Implement component libraries",
        "Ensure design consistency across projects"
      ],
      technologies: ["Storybook", "React", "Styled Components", "Design Tokens"],
      exercises: "6 comprehensive exercises building a complete design system with Storybook documentation"
    },
    { 
      id: 6, 
      title: "Advanced Component Patterns", 
      duration: "90 min", 
      level: "Advanced",
      description: "Master advanced React patterns and component architectures. Build complex, performant UI components that handle edge cases gracefully.",
      learningObjectives: [
        "Implement complex UI patterns",
        "Optimize component performance",
        "Handle edge cases and accessibility"
      ],
      technologies: ["React Advanced", "TypeScript", "Performance APIs", "Testing"],
      exercises: "5 advanced labs covering compound components, render props, and performance optimization"
    },
    { 
      id: 7, 
      title: "Responsive Design & Accessibility", 
      duration: "60 min", 
      level: "Intermediate",
      description: "Transform fixed designs into responsive, accessible applications. Ensure your code works beautifully across all devices and for all users.",
      learningObjectives: [
        "Implement responsive layouts from Figma",
        "Ensure WCAG compliance",
        "Test across devices and screen readers"
      ],
      technologies: ["CSS Grid", "Flexbox", "ARIA", "Screen Readers"],
      exercises: "4 practical exercises converting designs to responsive layouts with full accessibility"
    },
    { 
      id: 8, 
      title: "Testing & Quality Assurance", 
      duration: "90 min", 
      level: "Advanced",
      description: "Implement comprehensive testing strategies for your generated code. Ensure quality and maintainability through automated testing pipelines.",
      learningObjectives: [
        "Implement comprehensive testing strategies",
        "Automate visual regression testing",
        "Ensure code quality and maintainability"
      ],
      technologies: ["Jest", "React Testing Library", "Cypress", "GitHub Actions"],
      exercises: "6 hands-on labs setting up testing frameworks and CI/CD pipelines"
    },
    { 
      id: 9, 
      title: "Production Deployment & Optimization", 
      duration: "120 min", 
      level: "Advanced",
      description: "Deploy your design-to-code projects at scale. Master performance optimization, monitoring, and best practices for production environments.",
      learningObjectives: [
        "Deploy design-to-code projects at scale",
        "Optimize performance and bundle size",
        "Implement monitoring and analytics"
      ],
      technologies: ["Vercel", "Azure", "Webpack", "Performance Tools"],
      exercises: "7+ deployment exercises covering cloud platforms and performance monitoring setup"
    }
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

  const relatedWorkshops = [
    {
      title: "AI Code Development",
      description: "Complete guide for leveraging AI tools to optimize code quality and developer productivity",
      link: "https://paulasilvatech.github.io/Code-AI-Dev/"
    },
    {
      title: "Secure Code AI",
      description: "Enterprise-grade security practices with AI-powered development workflows",
      link: "https://paulasilvatech.github.io/Secure-Code-AI-Dev/"
    },
    {
      title: "Agentic Operations",
      description: "Implementing AI-enhanced observability solutions for cloud applications",
      link: "https://paulasilvatech.github.io/Agentic-Ops-Dev/"
    },
    {
      title: "Figma-to-Code",
      description: "Rapid conversion of Figma designs to functional applications with modern frameworks",
      link: "https://paulasilvatech.github.io/Figma-to-Code-Dev/"
    }
  ];

  const workshops = [
    'Design-to-Code Workshop',
    'AI Code Development Workshop',
    'Secure Code AI Workshop',
    'Agentic Operations Workshop',
    'Figma-to-Code Workshop',
    'Agentic DevSecOps Hub'
  ];

  const validateEmail = (email: string) => {
    const corporateEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const blockedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    const domain = email.split('@')[1];
    
    if (!corporateEmailPattern.test(email)) {
      return 'Please enter a valid email address';
    }
    
    if (blockedDomains.includes(domain)) {
      return 'Please use your corporate email address';
    }
    
    return '';
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: any = {};

    // Validation
    const emailError = validateEmail(formData.corporateEmail);
    if (emailError) errors.corporateEmail = emailError;
    if (!formData.fullName) errors.fullName = 'Full name is required';
    if (!formData.companyName) errors.companyName = 'Company name is required';
    if (!formData.jobTitle) errors.jobTitle = 'Job title is required';
    if (!formData.teamSize) errors.teamSize = 'Please select team size';
    if (!formData.deliveryFormat) errors.deliveryFormat = 'Please select delivery format';
    if (formData.contactMethod.length === 0) errors.contactMethod = 'Please select at least one contact method';
    if (formData.workshopInterest.length === 0) errors.workshopInterest = 'Please select at least one workshop';
    if (!formData.gdprConsent) errors.gdprConsent = 'Please accept the privacy policy';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form is valid - submit
      setFormSubmitted(true);
      // Here you would integrate with your backend
      console.log('Form submitted:', formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    setFormErrors((prev: any) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof formData] instanceof Array 
        ? (prev[field as keyof typeof formData] as string[]).includes(value)
          ? (prev[field as keyof typeof formData] as string[]).filter(item => item !== value)
          : [...(prev[field as keyof typeof formData] as string[]), value]
        : []
    }));
    setFormErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

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
              <button onClick={scrollToAccessForm} className="flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors">
                <Book className="w-4 h-4" />
                <span>Request Access</span>
              </button>
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
              <button onClick={scrollToAccessForm} className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded-md">Request Access</button>
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
          {/* Logo - FIRST in hero section */}
          <div className="flex justify-center mb-8">
            <DesignToCodeLogo className="w-24 h-24 animate-pulse" />
          </div>
          
          {/* Badge - SECOND */}
          <div className="flex justify-center mb-6">
            <span className="bg-emerald-600/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              🚀 AI-Powered Design to Code Workshop
            </span>
          </div>
          
          {/* Title - THIRD */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
            Transform Designs into Code with AI
          </h1>
          
          {/* Description - FOURTH */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master the art of converting Figma designs into production-ready code using GitHub Copilot, Azure AI, and modern development workflows.
          </p>
          
          {/* Buttons - FIFTH */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToAccessForm} className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
              <span>Request Access</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
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

      {/* Repository Notice */}
      <section className="py-8 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center">
            <p className="text-gray-300">
              <span className="text-emerald-400 font-semibold">Note:</span> This repository is private and requires access approval.
            </p>
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

      {/* Modules Section with Modal Functionality */}
      <section id="modules" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Workshop Modules</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Progressive learning path from basics to enterprise-scale implementation. Click on any module to see details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div 
                key={module.id} 
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all cursor-pointer hover:transform hover:scale-105"
                onClick={() => openModuleModal(module)}
              >
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

      {/* Module Modal */}
      {selectedModule && (
        <ModuleModal 
          module={selectedModule} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      )}

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
              <button onClick={scrollToAccessForm} className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium w-full justify-center">
                Request workshop access
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Access Request Form */}
      <section id="access-request" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Request Workshop Access</h2>
            <p className="text-xl text-gray-300">
              Complete the form below to request access to our private repository and workshop materials
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-green-600/20 backdrop-blur-sm rounded-xl p-8 text-center">
              <Check className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Request Submitted Successfully!</h3>
              <p className="text-gray-300">
                Thank you for your interest. Our team will review your request and contact you within 24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Corporate Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="corporateEmail"
                    value={formData.corporateEmail}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="john.doe@company.com"
                  />
                  {formErrors.corporateEmail && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.corporateEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="John Doe"
                  />
                  {formErrors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="Acme Corporation"
                  />
                  {formErrors.companyName && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="Senior Developer"
                  />
                  {formErrors.jobTitle && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.jobTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Team Size <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    aria-label="Team size"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    <option value="">Select team size</option>
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-50">21-50</option>
                    <option value="50+">50+</option>
                  </select>
                  {formErrors.teamSize && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.teamSize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Delivery Format Preference <span className="text-red-400">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Virtual', 'On-site', 'Hybrid'].map((format) => (
                      <label key={format} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryFormat"
                          value={format}
                          checked={formData.deliveryFormat === format}
                          onChange={handleInputChange}
                          className="text-emerald-400 focus:ring-emerald-400"
                        />
                        <span>{format}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.deliveryFormat && (
                    <p className="text-red-400 text-sm mt-1">{formErrors.deliveryFormat}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Contact Method <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { value: 'Email', icon: Mail },
                    { value: 'Phone', icon: Phone },
                    { value: 'Microsoft Teams', icon: MessageSquare }
                  ].map((method) => (
                    <label key={method.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.contactMethod.includes(method.value)}
                        onChange={() => handleCheckboxChange('contactMethod', method.value)}
                        className="text-emerald-400 focus:ring-emerald-400"
                      />
                      <method.icon className="w-4 h-4" />
                      <span>{method.value}</span>
                    </label>
                  ))}
                </div>
                {formErrors.contactMethod && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.contactMethod}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Workshop Interest <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {workshops.map((workshop) => (
                    <label key={workshop} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.workshopInterest.includes(workshop)}
                        onChange={() => handleCheckboxChange('workshopInterest', workshop)}
                        className="text-emerald-400 focus:ring-emerald-400"
                      />
                      <span className="text-sm">{workshop}</span>
                    </label>
                  ))}
                </div>
                {formErrors.workshopInterest && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.workshopInterest}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message/Additional Requirements
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Tell us about your specific needs or requirements..."
                />
              </div>

              <div>
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.gdprConsent}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, gdprConsent: e.target.checked }));
                      setFormErrors((prev: any) => ({ ...prev, gdprConsent: '' }));
                    }}
                    className="text-emerald-400 focus:ring-emerald-400 mt-1"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the processing of my personal data in accordance with the{' '}
                    <a href="#" className="text-emerald-400 hover:text-emerald-300">privacy policy</a>
                    <span className="text-red-400"> *</span>
                  </span>
                </label>
                {formErrors.gdprConsent && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.gdprConsent}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                Submit Access Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Getting Started Section with Warning */}
      <section id="start" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started</h2>
          <p className="text-xl text-gray-300 mb-12">
            Follow these steps to begin your design-to-code journey
          </p>

          {/* Warning Box */}
          <div className="bg-amber-600/20 backdrop-blur-sm rounded-xl p-6 mb-8 text-left flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-amber-300 font-semibold mb-1">Important Notice</p>
              <p className="text-gray-300">
                These instructions only work if you already have approved access to the repository. 
                If you don't have access yet, please complete the access request form above.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Submit Access Request Form</h3>
                  <p className="text-gray-300">Complete the form above to request access to our private repository and materials</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Schedule Technical Consultation</h3>
                  <p className="text-gray-300">Our team will contact you to schedule a consultation and discuss your specific needs</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Receive Repository Access</h3>
                  <p className="text-gray-300">After approval, you'll receive access credentials and onboarding instructions</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Begin Your Workshop Journey</h3>
                  <p className="text-gray-300 mb-3">Once you have approved access:</p>
                  <code className="bg-gray-900 px-4 py-2 rounded-md text-sm block overflow-x-auto">
                    git clone https://github.com/YourUsername/Design-to-Code-Dev.git
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button onClick={scrollToAccessForm} className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              <span>Request Access</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Workshops Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Related Workshops</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our ecosystem of AI-powered development workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedWorkshops.map((workshop, index) => (
              <a key={index} href={workshop.link} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <Book className="w-8 h-8 text-emerald-400" />
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {workshop.title}
                </h3>
                <p className="text-gray-300">
                  {workshop.description}
                </p>
                <p className="mt-4 text-emerald-400 text-sm font-medium">
                  Visit Workshop →
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
            <a href="https://github.com/paulanunes85" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
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