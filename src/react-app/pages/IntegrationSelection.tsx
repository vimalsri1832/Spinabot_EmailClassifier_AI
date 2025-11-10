import { useState } from 'react';
import { useTheme } from '@/react-app/components/ThemeProvider';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';
import { 
  ArrowRight, 
  Check, 
  Mail,
  Inbox,
  MessageSquare,
  CheckSquare,
  FileText,
  LayoutGrid
} from 'lucide-react';

interface IntegrationOption {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  features: string[];
}

export default function IntegrationSelection() {
  const { theme } = useTheme();
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string>('');

  // Get selected email provider from localStorage
  useState(() => {
    const provider = localStorage.getItem('userProvider');
    if (provider) {
      setSelectedEmail(provider);
    }
  });

  // External tools integration options
  const integrationTools: IntegrationOption[] = [
    {
      id: 'jira',
      name: 'Jira',
      icon: CheckSquare,
      color: 'from-blue-500 to-blue-600',
      description: 'Project management and issue tracking',
      features: ['Create issues from emails', 'Auto-assign tasks', 'Track progress', 'Link conversations']
    },
    {
      id: 'asana',
      name: 'Asana',
      icon: CheckSquare,
      color: 'from-pink-500 to-red-500',
      description: 'Work management platform',
      features: ['Create tasks', 'Set due dates', 'Assign team members', 'Project boards']
    },
    {
      id: 'notion',
      name: 'Notion',
      icon: FileText,
      color: 'from-gray-700 to-gray-900',
      description: 'All-in-one workspace',
      features: ['Create database entries', 'Document emails', 'Wiki integration', 'Notes & docs']
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600',
      description: 'Team communication platform',
      features: ['Send notifications', 'Create channels', 'Share emails', 'Team alerts']
    },
    {
      id: 'trello',
      name: 'Trello',
      icon: LayoutGrid,
      color: 'from-blue-400 to-blue-500',
      description: 'Visual project boards',
      features: ['Create cards', 'Organize boards', 'Task lists', 'Team collaboration']
    },
  ];

  const handleContinue = () => {
    if (selectedEmail && selectedTool) {
      // Store selections in localStorage
      localStorage.setItem('connectedEmail', selectedEmail);
      localStorage.setItem('connectedTool', selectedTool);
      
      // Navigate to tool credentials page
      window.location.href = '/tool-credentials';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Background Effects */}
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-violet-100/30'}`} />
      <div className={`fixed top-1/4 left-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-violet-600/10' : 'bg-violet-300/20'} rounded-full blur-3xl animate-pulse opacity-30`} />
      <div className={`fixed top-1/4 right-1/4 w-80 h-80 ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-300/20'} rounded-full blur-3xl animate-pulse opacity-30`} />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-9 h-9 text-white" />
          </div>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gradient-to-r from-gray-900 to-gray-600'} bg-clip-text text-transparent`}>
            SPINABOT
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-sm font-medium">Email Connected</span>
          </div>
          <div className="w-16 h-0.5 bg-violet-500" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <span className="ml-2 text-sm font-medium">Choose Tool</span>
          </div>
          <div className={`w-16 h-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} flex items-center justify-center`}>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm font-bold`}>3</span>
            </div>
            <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Dashboard</span>
          </div>
        </div>

        <div className="w-full max-w-6xl">
          <Card variant="glow" className="p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">Connect Your Tools</h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center mb-8`}>
              Choose your email provider and external tool to get started
            </p>

            {/* Connected Email Provider Display */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold mb-4">Connected Email Provider</h3>
              {selectedEmail ? (
                <div className="p-6 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-600/20 border-2 border-violet-500">
                  <div className="flex items-center space-x-4">
                    {selectedEmail === 'gmail' && <Mail className="w-10 h-10 text-red-400" />}
                    {selectedEmail === 'outlook' && <Inbox className="w-10 h-10 text-blue-400" />}
                    {selectedEmail === 'yahoo' && <Mail className="w-10 h-10 text-purple-400" />}
                    <div className="flex-1">
                      <h4 className="font-semibold text-xl capitalize">{selectedEmail}</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Email provider connected
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-400">Connected</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl border-2 border-red-500/30 bg-red-500/10">
                  <p className="text-red-400">No email provider found. Please log in again.</p>
                </div>
              )}
            </div>

            {/* Integration Tool Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Integration Tool</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrationTools.map((tool) => {
                  const Icon = tool.icon;
                  const isSelected = selectedTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`p-6 rounded-xl transition-all duration-200 text-left ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-500/20 to-purple-600/20 border-2 border-violet-500 transform scale-105'
                          : `${theme === 'dark' ? 'bg-white/5 border border-violet-500/20 hover:bg-white/10' : 'bg-white border border-gray-200 hover:border-violet-300'} hover:transform hover:scale-102`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{tool.name}</h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                        {tool.description}
                      </p>
                      <ul className="space-y-2">
                        {tool.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className={`text-xs flex items-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                            <Check className="w-3 h-3 mr-2 text-violet-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <div className="mt-10 flex justify-center">
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!selectedEmail || !selectedTool}
                className="group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Credentials
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
