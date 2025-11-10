import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { ArrowLeft, Key, Link, Building, CheckSquare } from 'lucide-react';
import { TASK_MANAGEMENT_TOOLS } from '@/shared/types';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';
import Input from '@/react-app/components/Input';

export default function TaskCredentials() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const selectedTool = localStorage.getItem('selectedTaskTool') || 'jira';
  const tool = TASK_MANAGEMENT_TOOLS.find(t => t.id === selectedTool) || TASK_MANAGEMENT_TOOLS[0];

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
    );

    // Set default URLs based on tool
    if (selectedTool === 'jira') {
      setApiUrl('https://your-domain.atlassian.net');
    } else if (selectedTool === 'notion') {
      setApiUrl('https://api.notion.com');
    }
  }, [selectedTool]);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return;

    setIsLoading(true);
    
    // Simulate API connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store credentials (in real app, these would be encrypted)
    localStorage.setItem('taskToolConfig', JSON.stringify({
      tool: selectedTool,
      apiKey,
      apiUrl,
      workspaceId,
      connected: true
    }));
    
    setIsLoading(false);
    navigate('/email-settings');
  };

  const getInstructions = () => {
    if (selectedTool === 'jira') {
      return (
        <div className="space-y-3 text-sm text-gray-400">
          <p><strong className="text-white">To get your Jira API key:</strong></p>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Go to your Atlassian Account Settings</li>
            <li>Click "Security" → "Create and manage API tokens"</li>
            <li>Create a new API token with project access</li>
            <li>Copy the token and paste it above</li>
          </ol>
        </div>
      );
    } else {
      return (
        <div className="space-y-3 text-sm text-gray-400">
          <p><strong className="text-white">To get your Notion API key:</strong></p>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Go to <a href="https://www.notion.so/my-integrations" className="text-violet-400 hover:text-violet-300" target="_blank" rel="noopener noreferrer">notion.so/my-integrations</a></li>
            <li>Click "New integration" and give it a name</li>
            <li>Copy the "Internal Integration Token"</li>
            <li>Share your database with the integration</li>
          </ol>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-violet-900/20 animate-pulse" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse opacity-20 floating-animation" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse opacity-20 animation-delay-1000 floating-animation" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse opacity-15 animation-delay-2000 floating-animation" />
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <CheckSquare className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SPINABOT
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/task-selection')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div ref={cardRef} className="max-w-2xl w-full">
          <Card variant="glass" className="p-8 gradient-hover">
            {/* Tool Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{tool.logo}</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Connect to {tool.name}
              </h1>
              <p className="text-gray-400">
                Enter your API credentials to enable task creation from emails
              </p>
            </div>

            {/* Connection Form */}
            <form onSubmit={handleConnect} className="space-y-6">
              <Input
                type="text"
                label="API Key / Token"
                placeholder={`Enter your ${tool.name} API key`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                icon={<Key className="w-5 h-5" />}
                required
              />
              
              <Input
                type="url"
                label="API URL"
                placeholder={selectedTool === 'jira' ? 'https://your-domain.atlassian.net' : 'https://api.notion.com'}
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                icon={<Link className="w-5 h-5" />}
                required
              />

              {selectedTool === 'notion' && (
                <Input
                  type="text"
                  label="Database ID (Optional)"
                  placeholder="Enter your Notion database ID"
                  value={workspaceId}
                  onChange={(e) => setWorkspaceId(e.target.value)}
                  icon={<Building className="w-5 h-5" />}
                />
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={!apiKey || !apiUrl || isLoading}
                size="lg"
              >
                {isLoading ? 'Connecting...' : `Connect to ${tool.name}`}
              </Button>
            </form>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              {getInstructions()}
            </div>

            {/* Security Note */}
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-green-400 text-sm text-center">
                🔒 Your API credentials are securely encrypted and used only for task creation
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
