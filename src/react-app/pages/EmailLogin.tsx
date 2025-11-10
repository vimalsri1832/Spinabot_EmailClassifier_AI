import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Bot, ArrowLeft, Mail, Lock } from 'lucide-react';
import { EMAIL_PROVIDERS } from '@/shared/types';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';
import Input from '@/react-app/components/Input';

export default function EmailLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const selectedProvider = localStorage.getItem('selectedProvider') || 'gmail';
  const provider = EMAIL_PROVIDERS.find(p => p.id === selectedProvider) || EMAIL_PROVIDERS[0];

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user session
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userProvider', selectedProvider);
    
    setIsLoading(false);
    navigate('/integration-selection');
  };

  return (
    <div className="min-h-screen relative flex flex-col">
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
          <Button variant="ghost" onClick={() => navigate('/email-providers')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div ref={cardRef} className="max-w-md w-full">
          <Card variant="glass" className="p-8">
            {/* Provider Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{provider.emoji}</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Connect to {provider.name}
              </h1>
              <p className="text-gray-400">
                Enter your credentials to access your email account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                required
              />
              
              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                required
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!email || !password || isLoading}
                size="lg"
              >
                {isLoading ? 'Connecting...' : `Connect to ${provider.name}`}
              </Button>
            </form>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm text-center">
                🔒 Your credentials are securely encrypted and never stored on our servers
              </p>
            </div>

            {/* Demo Note */}
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm text-center">
                💡 Demo Mode: Any valid email and password will work
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
