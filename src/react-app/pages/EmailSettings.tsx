import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Bot, ArrowLeft, Mail, Loader, Wifi } from 'lucide-react';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';
import Input from '@/react-app/components/Input';

export default function EmailSettings() {
  const navigate = useNavigate();
  const [emailCount, setEmailCount] = useState('50');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStep, setConnectionStep] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const selectedProvider = localStorage.getItem('selectedProvider') || 'gmail';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  const connectionSteps = [
    `Connecting to your ${selectedProvider === 'gmail' ? 'Gmail' : selectedProvider === 'outlook' ? 'Outlook' : 'Zoho Mail'} account...`,
    'Authenticating credentials...',
    'Analyzing your email patterns...',
    `Fetching your first ${emailCount} emails...`,
    'Classifying emails with AI...',
    'Setting up your dashboard...'
  ];

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  const handleConnect = async () => {
    if (!emailCount || parseInt(emailCount) < 1) return;

    setIsConnecting(true);
    
    // Animate through connection steps
    for (let i = 0; i < connectionSteps.length; i++) {
      setConnectionStep(i);
      
      // Animate progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${((i + 1) / connectionSteps.length) * 100}%`,
          duration: 1,
          ease: 'power2.out'
        });
      }
      
      // Wait for each step
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Store settings
    localStorage.setItem('emailCount', emailCount);
    localStorage.setItem('isConnected', 'true');
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center">
        <div className="max-w-md w-full px-6">
          <Card variant="glow" className="p-8 text-center">
            {/* Provider Icon */}
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Loading Animation */}
            <div className="mb-6">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 border-4 border-violet-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-violet-500 rounded-full border-t-transparent animate-spin"></div>
                <Wifi className="absolute inset-0 w-6 h-6 text-violet-400 m-auto" />
              </div>
            </div>

            {/* Status Text */}
            <h2 className="text-xl font-bold text-white mb-2">
              Setting up SPINABOT
            </h2>
            <p className="text-gray-300 mb-6">
              {connectionSteps[connectionStep]}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div 
                ref={progressRef}
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: '0%' }}
              />
            </div>

            <p className="text-sm text-gray-400">
              Step {connectionStep + 1} of {connectionSteps.length}
            </p>

            {/* Fun Facts */}
            <div className="mt-8 p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <p className="text-violet-300 text-sm">
                💡 SPINABOT analyzes email patterns to intelligently classify priority, company relationships, and potential tasks
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          <Button variant="ghost" onClick={() => navigate('/task-credentials')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div ref={cardRef} className="max-w-md w-full">
          <Card variant="glow" className="p-8" hover>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Email Settings
              </h1>
              <p className="text-gray-400">
                Configure how many emails to fetch and analyze
              </p>
            </div>

            {/* Connected Account Info */}
            <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-green-400 font-medium">Connected Account</p>
                  <p className="text-green-300 text-sm">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Email Count Setting */}
            <div className="mb-8">
              <Input
                type="number"
                label="Number of emails to fetch"
                placeholder="50"
                value={emailCount}
                onChange={(e) => setEmailCount(e.target.value)}
                min="1"
                max="500"
                required
                className="text-center"
              />
              <p className="text-gray-400 text-sm mt-2 text-center">
                Recommended: 50-100 emails for best performance
              </p>
            </div>

            {/* Feature Preview */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4">What SPINABOT will do:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Classify emails by priority (Critical, High, Medium, Low)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Categorize by type (Sales, Marketing, Support, etc.)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Identify company relationships</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">Create intelligent task assignments</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleConnect}
              className="w-full"
              disabled={!emailCount || parseInt(emailCount) < 1}
              size="lg"
            >
              <Loader className="w-5 h-5 mr-2" />
              Connect & Analyze Emails
            </Button>

            {/* Processing Time Estimate */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                ⏱️ Processing time: ~{Math.ceil(parseInt(emailCount || '50') / 25)} minutes
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
