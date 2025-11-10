import { useState, useEffect } from 'react';
import { useTheme } from '@/react-app/components/ThemeProvider';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';
import Input from '@/react-app/components/Input';
import { 
  ArrowRight, 
  Check, 
  Key,
  Lock,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default function ToolCredentials() {
  const { theme } = useTheme();
  const [connectedTool, setConnectedTool] = useState<string>('');
  const [connectedEmail, setConnectedEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Jira credentials
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraApiToken, setJiraApiToken] = useState('');
  const [jiraDomain, setJiraDomain] = useState('');

  // Asana credentials
  const [asanaToken, setAsanaToken] = useState('');

  // Notion credentials
  const [notionToken, setNotionToken] = useState('');

  // Slack credentials
  const [slackWebhook, setSlackWebhook] = useState('');

  // Trello credentials
  const [trelloApiKey, setTrelloApiKey] = useState('');
  const [trelloToken, setTrelloToken] = useState('');

  useEffect(() => {
    const tool = localStorage.getItem('connectedTool');
    const email = localStorage.getItem('connectedEmail');
    
    if (!tool || !email) {
      window.location.href = '/integration-selection';
      return;
    }

    setConnectedTool(tool);
    setConnectedEmail(email);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate credentials based on selected tool
      let credentials: any = {};

      switch (connectedTool) {
        case 'jira':
          if (!jiraEmail || !jiraApiToken || !jiraDomain) {
            setError('Please fill in all Jira credentials');
            setLoading(false);
            return;
          }
          credentials = { email: jiraEmail, apiToken: jiraApiToken, domain: jiraDomain };
          break;

        case 'asana':
          if (!asanaToken) {
            setError('Please enter your Asana Personal Access Token');
            setLoading(false);
            return;
          }
          credentials = { token: asanaToken };
          break;

        case 'notion':
          if (!notionToken) {
            setError('Please enter your Notion Integration Token');
            setLoading(false);
            return;
          }
          credentials = { token: notionToken };
          break;

        case 'slack':
          if (!slackWebhook) {
            setError('Please enter your Slack Webhook URL');
            setLoading(false);
            return;
          }
          credentials = { webhook: slackWebhook };
          break;

        case 'trello':
          if (!trelloApiKey || !trelloToken) {
            setError('Please fill in all Trello credentials');
            setLoading(false);
            return;
          }
          credentials = { apiKey: trelloApiKey, token: trelloToken };
          break;

        default:
          setError('Invalid tool selected');
          setLoading(false);
          return;
      }

      // Store credentials in localStorage (in production, this should be encrypted or stored securely)
      localStorage.setItem(`${connectedTool}Credentials`, JSON.stringify(credentials));

      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to dashboard
      window.location.href = '/email-dashboard';
    } catch (err) {
      setError('Failed to connect. Please check your credentials.');
      setLoading(false);
    }
  };

  const getToolInstructions = () => {
    switch (connectedTool) {
      case 'jira':
        return {
          title: 'Connect to Jira',
          instructions: [
            'Go to your Atlassian Account Settings',
            'Navigate to Security → API tokens',
            'Click "Create API token" and copy it',
            'Enter your Jira domain (e.g., yourcompany.atlassian.net)'
          ],
          docsUrl: 'https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/'
        };
      case 'asana':
        return {
          title: 'Connect to Asana',
          instructions: [
            'Go to Asana Developer Console',
            'Click on "Personal Access Tokens"',
            'Create a new token with appropriate permissions',
            'Copy and paste the token below'
          ],
          docsUrl: 'https://developers.asana.com/docs/personal-access-token'
        };
      case 'notion':
        return {
          title: 'Connect to Notion',
          instructions: [
            'Go to Notion Integrations page',
            'Click "New integration" and configure',
            'Copy the Internal Integration Token',
            'Share the database/page with your integration'
          ],
          docsUrl: 'https://developers.notion.com/docs/create-a-notion-integration'
        };
      case 'slack':
        return {
          title: 'Connect to Slack',
          instructions: [
            'Go to Slack API dashboard',
            'Create a new app or select existing',
            'Enable "Incoming Webhooks"',
            'Copy the Webhook URL for your channel'
          ],
          docsUrl: 'https://api.slack.com/messaging/webhooks'
        };
      case 'trello':
        return {
          title: 'Connect to Trello',
          instructions: [
            'Go to Trello Power-Ups Admin Portal',
            'Get your API Key',
            'Generate a Token with appropriate permissions',
            'Enter both API Key and Token below'
          ],
          docsUrl: 'https://developer.atlassian.com/cloud/trello/guides/rest-api/authorization/'
        };
      default:
        return {
          title: 'Connect Your Tool',
          instructions: [],
          docsUrl: ''
        };
    }
  };

  const toolInfo = getToolInstructions();

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
            <Key className="w-9 h-9 text-white" />
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
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-sm font-medium">Tool Selected</span>
          </div>
          <div className="w-16 h-0.5 bg-violet-500" />
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <span className="ml-2 text-sm font-medium">Credentials</span>
          </div>
          <div className={`w-16 h-0.5 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} flex items-center justify-center`}>
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm font-bold`}>4</span>
            </div>
            <span className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Dashboard</span>
          </div>
        </div>

        <div className="w-full max-w-2xl">
          <Card variant="glow" className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2 text-center capitalize">{toolInfo.title}</h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                Enter your {connectedTool} credentials to complete the integration
              </p>
            </div>

            {/* Connection Status */}
            <div className="mb-8 p-4 rounded-lg bg-violet-500/10 border border-violet-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium capitalize">{connectedEmail} Connected</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-violet-500/20 border border-violet-500/30">
                  <span className="text-sm capitalize">{connectedTool}</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-8 p-6 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-400 mb-2">How to get your credentials:</h3>
                  <ol className="space-y-2 text-sm">
                    {toolInfo.instructions.map((instruction, index) => (
                      <li key={index} className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {index + 1}. {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              {toolInfo.docsUrl && (
                <a
                  href={toolInfo.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Official Documentation
                </a>
              )}
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Jira Form */}
              {connectedTool === 'jira' && (
                <>
                  <Input
                    label="Jira Email"
                    type="email"
                    value={jiraEmail}
                    onChange={(e) => setJiraEmail(e.target.value)}
                    placeholder="your-email@company.com"
                    icon={<Lock className="w-5 h-5 text-violet-400" />}
                    required
                  />
                  <Input
                    label="API Token"
                    type="password"
                    value={jiraApiToken}
                    onChange={(e) => setJiraApiToken(e.target.value)}
                    placeholder="Enter your Jira API token"
                    icon={<Key className="w-5 h-5 text-violet-400" />}
                    required
                  />
                  <Input
                    label="Jira Domain"
                    type="text"
                    value={jiraDomain}
                    onChange={(e) => setJiraDomain(e.target.value)}
                    placeholder="yourcompany.atlassian.net"
                    required
                  />
                </>
              )}

              {/* Asana Form */}
              {connectedTool === 'asana' && (
                <Input
                  label="Personal Access Token"
                  type="password"
                  value={asanaToken}
                  onChange={(e) => setAsanaToken(e.target.value)}
                  placeholder="Enter your Asana token"
                  icon={<Key className="w-5 h-5 text-violet-400" />}
                  required
                />
              )}

              {/* Notion Form */}
              {connectedTool === 'notion' && (
                <Input
                  label="Integration Token"
                  type="password"
                  value={notionToken}
                  onChange={(e) => setNotionToken(e.target.value)}
                  placeholder="Enter your Notion integration token"
                  icon={<Key className="w-5 h-5 text-violet-400" />}
                  required
                />
              )}

              {/* Slack Form */}
              {connectedTool === 'slack' && (
                <Input
                  label="Webhook URL"
                  type="url"
                  value={slackWebhook}
                  onChange={(e) => setSlackWebhook(e.target.value)}
                  placeholder="https://hooks.slack.com/services/..."
                  icon={<Key className="w-5 h-5 text-violet-400" />}
                  required
                />
              )}

              {/* Trello Form */}
              {connectedTool === 'trello' && (
                <>
                  <Input
                    label="API Key"
                    type="text"
                    value={trelloApiKey}
                    onChange={(e) => setTrelloApiKey(e.target.value)}
                    placeholder="Enter your Trello API key"
                    icon={<Key className="w-5 h-5 text-violet-400" />}
                    required
                  />
                  <Input
                    label="Token"
                    type="password"
                    value={trelloToken}
                    onChange={(e) => setTrelloToken(e.target.value)}
                    placeholder="Enter your Trello token"
                    icon={<Lock className="w-5 h-5 text-violet-400" />}
                    required
                  />
                </>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      Connect & Continue
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
