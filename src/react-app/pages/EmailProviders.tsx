import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { ArrowLeft, Shield, Star, Mail } from 'lucide-react';
import { EMAIL_PROVIDERS } from '@/shared/types';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';

export default function EmailProviders() {
  const navigate = useNavigate();
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
        stagger: 0.1,
        ease: "back.out(1.7)" 
      }
    );
  }, []);

  const handleProviderSelect = (providerId: string) => {
    // Store selected provider in localStorage for later use
    localStorage.setItem('selectedProvider', providerId);
    navigate('/email-login');
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header ref={headerRef} className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SPINABOT
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/onboarding')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Email Provider
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Connect your email account to start organizing and classifying your messages with AI
          </p>

          {/* Provider Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {EMAIL_PROVIDERS.map((provider) => (
              <Card
                key={provider.id}
                variant="glass"
                className="p-8 cursor-pointer hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                onClick={() => handleProviderSelect(provider.id)}
              >
                {/* Popular Badge */}
                {provider.popular && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full px-3 py-1">
                      <Star className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">Popular</span>
                    </div>
                  </div>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${provider.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative">
                  {/* Provider Icon/Emoji */}
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                    {provider.emoji}
                  </div>
                  
                  {/* Provider Name */}
                  <h3 className="text-2xl font-bold text-white mb-4">{provider.name}</h3>
                  
                  {/* Features */}
                  <div className="space-y-2 text-sm text-gray-400">
                    <div>✓ Secure OAuth connection</div>
                    <div>✓ Real-time sync</div>
                    <div>✓ Full message history</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card variant="glass" className="p-6 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <h4 className="font-semibold text-white mb-1">Secure Connection</h4>
                <p className="text-gray-400 text-sm">
                  Your email credentials are encrypted and never stored on our servers. 
                  We use industry-standard OAuth for secure authentication.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
