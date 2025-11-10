import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from '@/react-app/components/ThemeProvider';
import CursorGlow from '@/react-app/components/CursorGlow';

// Pages
import Home from '@/react-app/pages/Home';
import EmailProviders from '@/react-app/pages/EmailProviders';
import EmailLogin from '@/react-app/pages/EmailLogin';
import IntegrationSelection from '@/react-app/pages/IntegrationSelection';
import ToolCredentials from '@/react-app/pages/ToolCredentials';
import TaskSelection from '@/react-app/pages/TaskSelection';
import TaskCredentials from '@/react-app/pages/TaskCredentials';
import EmailSettings from '@/react-app/pages/EmailSettings';
import EmailClassifier from '@/react-app/pages/EmailClassifier';
import EmailDashboard from '@/react-app/pages/EmailDashboard';
import Onboarding from '@/react-app/pages/Onboarding';
import Products from '@/react-app/pages/Products';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-violet-900/20 animate-pulse" />
          
          {/* Floating Gradient Orbs */}
          <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse opacity-20" />
          <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse opacity-20 animation-delay-1000" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse opacity-15 animation-delay-2000" />
          
          <CursorGlow />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/email-providers" element={<EmailProviders />} />
            <Route path="/email-login" element={<EmailLogin />} />
            <Route path="/integration-selection" element={<IntegrationSelection />} />
            <Route path="/tool-credentials" element={<ToolCredentials />} />
            <Route path="/task-selection" element={<TaskSelection />} />
            <Route path="/task-credentials" element={<TaskCredentials />} />
            <Route path="/email-settings" element={<EmailSettings />} />
            <Route path="/email-classifier" element={<EmailClassifier />} />
            <Route path="/dashboard" element={<EmailDashboard />} />
            <Route path="/email-dashboard" element={<EmailDashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
