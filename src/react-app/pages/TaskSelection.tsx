import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight, CheckSquare } from 'lucide-react';
import { TASK_MANAGEMENT_TOOLS } from '@/shared/types';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';

export default function TaskSelection() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string>('');
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(cardsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.15,
        ease: "back.out(1.7)" 
      }
    );
  }, []);

  const handleContinue = () => {
    if (selectedTool) {
      localStorage.setItem('selectedTaskTool', selectedTool);
      navigate('/task-credentials');
    }
  };

  const handleSkip = () => {
    navigate('/email-settings');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-violet-900/20 animate-pulse" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse opacity-20 floating-animation" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse opacity-20 animation-delay-1000 floating-animation" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse opacity-15 animation-delay-2000 floating-animation" />
      {/* Header */}
      <header ref={headerRef} className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SPINABOT
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/email-login')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Task Management Tool
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Connect your preferred task management tool to automatically create tasks from important emails
          </p>

          {/* Tool Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
            {TASK_MANAGEMENT_TOOLS.map((tool) => (
              <Card
                key={tool.id}
                variant="glass"
                className={`p-8 cursor-pointer transition-all duration-300 group relative overflow-hidden gradient-hover ${
                  selectedTool === tool.id 
                    ? 'ring-2 ring-violet-500 scale-105 shadow-lg shadow-violet-500/20' 
                    : 'hover:scale-105'
                }`}
                onClick={() => setSelectedTool(tool.id)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-5 group-hover:opacity-10 transition-opacity ${
                  selectedTool === tool.id ? 'opacity-15' : ''
                }`} />
                
                <div className="relative">
                  {/* Tool Logo */}
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                    {tool.logo}
                  </div>
                  
                  {/* Tool Name */}
                  <h3 className="text-2xl font-bold text-white mb-4">{tool.name}</h3>
                  
                  {/* Features */}
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>✓ Auto-create tasks from emails</div>
                    <div>✓ Priority-based assignment</div>
                    <div>✓ Real-time sync</div>
                    <div>✓ Custom workflows</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {selectedTool ? (
              <Button size="lg" onClick={handleContinue} className="min-w-[200px]">
                Continue with {TASK_MANAGEMENT_TOOLS.find(t => t.id === selectedTool)?.name}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : null}
            
            <Button 
              size="lg" 
              variant="ghost" 
              onClick={handleSkip}
              className="min-w-[200px]"
            >
              Skip for now
            </Button>
          </div>

          {/* Info Note */}
          <Card variant="glass" className="p-4 max-w-2xl mx-auto mt-8">
            <p className="text-gray-400 text-sm">
              💡 You can always connect task management tools later from your dashboard settings
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
