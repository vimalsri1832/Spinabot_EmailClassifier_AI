import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { Bot, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/react-app/components/Button';
import Card from '@/react-app/components/Card';

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const questionRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      question: "What type of organization are you setting up SPINABOT for?",
      options: [
        "Small Business (1-50 employees)",
        "Medium Enterprise (51-500 employees)",
        "Large Corporation (500+ employees)",
        "Agency or Service Provider"
      ]
    },
    {
      question: "What is the primary business function this system will support?",
      options: [
        "Sales and Lead Management",
        "Customer Support Operations",
        "Marketing and Campaign Management",
        "General Business Operations"
      ]
    },
    {
      question: "What is the expected email volume across the organization?",
      options: [
        "Up to 500 emails per day",
        "500-2,000 emails per day",
        "2,000-10,000 emails per day",
        "Over 10,000 emails per day"
      ]
    },
    {
      question: "What are the critical email workflows for your organization?",
      options: [
        "Client acquisition and sales pipeline",
        "Customer service and issue resolution",
        "Project management and collaboration",
        "Compliance and regulatory communications"
      ]
    },
    {
      question: "How should high-priority communications be managed organization-wide?",
      options: [
        "Executive escalation protocols",
        "Team-based priority assignment",
        "Automated routing to departments",
        "Centralized monitoring dashboard"
      ]
    },
    {
      question: "What level of email categorization does your organization need?",
      options: [
        "Basic (Priority, Sales, Support)",
        "Moderate (Add Marketing, Internal, External)",
        "Advanced (Custom categories per department)",
        "Enterprise (Multi-level hierarchical categories)"
      ]
    }
  ];

  useEffect(() => {
    // Animate question change
    if (questionRef.current) {
      gsap.fromTo(questionRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentQuestion]);

  const handleNext = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion - 1] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion] || '');
    } else {
      // Save answers and navigate to email providers
      navigate('/email-providers');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 2] || '');
    }
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl">
              <Bot className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-white to-gray-300 bg-clip-text">
              SPINABOT
            </span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/email-classifier')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Question {currentQuestion} of {questions.length}</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full">
            <div 
              className="h-2 transition-all duration-500 ease-out rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex items-center justify-center flex-1 px-6 py-12">
        <div ref={questionRef} className="w-full max-w-2xl">
          <Card variant="glass" className="p-8 md:p-12">
            <h1 className="mb-12 text-2xl font-bold leading-tight text-center text-white md:text-3xl">
              {questions[currentQuestion - 1].question}
            </h1>
            
            <div className="space-y-4">
              {questions[currentQuestion - 1].options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedAnswer(option)}
                >
                  <span className="block font-medium text-center text-white">{option}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="min-w-[120px]"
          >
            {currentQuestion === questions.length ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
