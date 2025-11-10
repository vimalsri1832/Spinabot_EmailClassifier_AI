import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Bot, Zap, MessageCircle, Mic, Workflow } from 'lucide-react';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([headerRef.current, heroRef.current, cardsRef.current, statsRef.current], {
      opacity: 0,
      y: 30
    });

    // Animation sequence
    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(heroRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .to(cardsRef.current?.children || [], { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out" 
      }, "-=0.4")
      .to(statsRef.current?.children || [], { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out" 
      }, "-=0.2");

  }, []);

  const aiTools = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Agentic AI & Workflows",
      description: "Automate complex multi-step processes",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Agentic Chatbot Builder", 
      description: "Build intelligent conversation agents",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "AI Voice Agents",
      description: "Natural voice interactions",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "SLM",
      description: "Specialized Language Models",
      gradient: "from-pink-500 to-purple-500"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "2M+", label: "Workflows Created" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Header */}
      <header ref={headerRef} className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SPINABOT
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Products</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Solutions</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          </nav>
          <Button onClick={() => navigate('/products')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Your AI{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Crew
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your business operations with intelligent AI agents that can handle complex, 
            multi-step workflows automatically. From lead qualification to customer support, 
            our agentic AI adapts and learns from your processes.
          </p>
          <Button size="lg" onClick={() => navigate('/products')} className="text-lg px-8 py-4">
            Start Building
            <Zap className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* AI Tools Grid */}
      <section ref={cardsRef} className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, index) => (
              <Card key={index} variant="glass" className="p-6 hover:scale-105 transition-transform cursor-pointer group">
                <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm">{tool.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
