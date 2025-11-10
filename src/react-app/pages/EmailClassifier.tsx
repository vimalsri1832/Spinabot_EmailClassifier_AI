import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Bot, ArrowLeft, Zap, Filter, Target, Clock, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';

export default function EmailClassifier() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([heroRef.current, featuresRef.current, ctaRef.current], {
      opacity: 0,
      y: 30
    });

    // Animation sequence
    tl.to(heroRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(featuresRef.current?.children || [], { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "power2.out" 
      }, "-=0.4")
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Classification",
      description: "Automatically categorize emails as they arrive with real-time AI processing",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Filter className="w-8 h-8" />,
      title: "Smart Filtering",
      description: "Advanced filters that learn from your behavior and adapt to your preferences",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Priority Detection",
      description: "Identify urgent and important emails automatically based on content analysis",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Time Management",
      description: "Schedule and track follow-ups with integrated task management tools",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Spam Protection",
      description: "Advanced spam detection with customizable filtering rules and whitelists",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into email patterns, response times, and productivity",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative">
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
          <Button variant="ghost" onClick={() => navigate('/products')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            <span className="text-violet-400 font-medium">AI Email Classification</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Smart Email{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Classification
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Automatically organize, prioritize, and classify your emails using advanced AI. 
            Never miss important messages and keep your inbox organized effortlessly.
          </p>
          
          <Button size="lg" onClick={() => navigate('/onboarding')} className="text-lg px-8 py-4">
            Connect to Email
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={featuresRef} className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="glass" className="p-8 hover:scale-105 transition-transform group">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Card variant="gradient" className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Email Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have revolutionized their email management with AI-powered classification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/onboarding')} className="text-lg px-8 py-4">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="ghost" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
