import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Send, Minimize2, Maximize2 } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import Card from './Card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
  embedded?: boolean;
}

const quickQuestions = [
  "Show me unread emails",
  "What are the high priority emails?",
  "Recent emails from specific sender",
  "Show emails with tasks assigned",
  "Filter by sales category"
];

const botResponses = {
  "show me unread emails": "I found 3 unread emails: 2 high priority from TechCorp and Customer Support, and 1 medium priority update. Would you like me to filter them for you?",
  "what are the high priority emails": "You have 2 high priority emails: 'Urgent: Server Migration Required by Friday' from Sarah Johnson at TechCorp, and 'Re: Login Issues - Follow Up Required' from Customer Support.",
  "recent emails from specific sender": "Please specify the sender's name or email address, and I'll show you their recent emails with dates and priorities.",
  "show emails with tasks assigned": "I found 2 emails with assigned tasks: TASK-001 for server migration and TASK-002 for the new enterprise client inquiry. Both are marked as high priority.",
  "filter by sales category": "Filtering emails by Sales category... I found 1 sales email: 'New Lead: Enterprise Client Inquiry' from Salesforce Team with task TASK-002 assigned."
};

export default function Chatbot({ className, embedded = false }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your email assistant. I can help you find specific emails, filter by priority, or answer questions about your inbox. Try asking me something!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current,
        { scale: 0, opacity: 0, transformOrigin: 'bottom right' },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const normalizedText = text.toLowerCase().trim();
    let botResponse = "I understand you're asking about your emails. Let me help you with that. You can ask me about unread emails, priority levels, specific senders, or use the filters in your dashboard.";

    // Check for matching responses
    for (const [key, response] of Object.entries(botResponses)) {
      if (normalizedText.includes(key) || key.includes(normalizedText)) {
        botResponse = response;
        break;
      }
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (!isOpen && !embedded) {
    return (
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-110 transition-all duration-300 z-50 ${className}`}
      >
        <img 
          src="https://mocha-cdn.com/019a68d6-2e64-768e-80b0-485f993e1483/image.png_8942.png" 
          alt="Logo"
          className="w-8 h-8 mx-auto object-contain opacity-90"
        />
      </button>
    );
  }

  return (
    <div
      ref={chatRef}
      className={embedded ? 'h-full flex flex-col' : `fixed bottom-6 right-6 z-50 ${
        isMinimized ? 'w-80' : 'w-96'
      } ${isMinimized ? 'h-16' : 'h-[600px]'} ${className}`}
    >
      <Card variant="glow" className={embedded ? 'h-full flex flex-col overflow-hidden border-0' : 'h-full flex flex-col overflow-hidden'}>
        {/* Header - only show in floating mode */}
        {!embedded && (
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-violet-500/20 to-purple-600/20 border-b border-violet-500/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="https://mocha-cdn.com/019a68d6-2e64-768e-80b0-485f993e1483/image.png_8942.png" 
                  alt="Logo"
                  className="w-full h-full object-contain opacity-90"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">AI Assistant</h3>
                <p className="text-xs text-gray-400">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4 text-gray-300" />
                ) : (
                  <Minimize2 className="w-4 h-4 text-gray-300" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>
        )}

        {(!isMinimized || embedded) && (
          <>
            {/* Messages */}
            <div
              ref={messagesRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-800 text-gray-100'
                        : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-1">
                  {quickQuestions.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 px-2 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex space-x-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about your emails..."
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
