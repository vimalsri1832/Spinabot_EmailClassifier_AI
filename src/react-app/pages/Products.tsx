import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Bot, Workflow, MessageCircle, Mic, Zap, Mail, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';

export default function Products() {
  const navigate = useNavigate();
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(leftPanelRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
    gsap.fromTo(rightPanelRef.current, 
      { x: 50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  const products = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Agentic AI & Workflows",
      description: "Automate complex multi-step processes",
      gradient: "from-violet-500 to-purple-600",
      onClick: () => {}
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Agentic Chatbot Builder", 
      description: "Build intelligent conversation agents",
      gradient: "from-blue-500 to-cyan-500",
      onClick: () => {}
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "AI Voice Agents",
      description: "Natural voice interactions",
      gradient: "from-orange-500 to-red-500",
      onClick: () => {}
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "SLM",
      description: "Specialized Language Models",
      gradient: "from-pink-500 to-purple-500",
      onClick: () => {}
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Classifier AI",
      description: "Intelligent email organization and CRM",
      gradient: "from-violet-500 to-purple-600",
      isNew: true,
      onClick: () => navigate('/email-classifier')
    }
  ];

  const agents = [
    { name: "Lead Qualification Agent", status: "Active", color: "green" },
    { name: "CRM Integration Agent", status: "Active", color: "blue" },
    { name: "Follow-up Automation Agent", status: "Active", color: "purple" }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SPINABOT
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            Home
          </Button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-100px)]">
        {/* Left Panel - Products */}
        <div ref={leftPanelRef} className="w-full lg:w-1/2 p-6 lg:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-gray-300 mb-12">Choose from our suite of AI-powered tools to automate your workflows</p>
            
            <div className="space-y-4">
              {products.map((product, index) => (
                <Card 
                  key={index} 
                  variant="glass" 
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] group ${
                    product.isNew ? 'ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/20' : ''
                  }`}
                  onClick={product.onClick}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${product.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {product.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
                          {product.isNew && (
                            <span className="px-2 py-1 text-xs font-bold bg-gradient-to-r from-violet-500 to-purple-600 rounded-full text-white flex items-center space-x-1">
                              <Sparkles className="w-3 h-3" />
                              <span>NEW</span>
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">{product.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Hero Content */}
        <div ref={rightPanelRef} className="hidden lg:flex w-1/2 flex-col justify-center p-12">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-6">
              Automate and<br />
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Orchestrate
              </span><br />
              Workflows<br />
              with <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">Agentic AI</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto">
              Transform your business operations with intelligent AI agents that can handle complex, 
              multi-step workflows automatically. From lead qualification to customer support, 
              our agentic AI adapts and learns from your processes.
            </p>
            <Button size="lg" onClick={() => navigate('/email-classifier')}>
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Agent Status Cards */}
          <div className="mt-16 space-y-4">
            {agents.map((agent, index) => (
              <Card key={index} variant="glass" className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{agent.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.color === 'green' ? 'bg-green-400' :
                      agent.color === 'blue' ? 'bg-blue-400' : 'bg-purple-400'
                    }`} />
                    <span className="text-gray-400 text-sm">{agent.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
