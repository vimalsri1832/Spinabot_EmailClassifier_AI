import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Search, Filter, SortAsc, SortDesc, Star, Archive, 
  Tag, Moon, Sun, User, Menu, X,
  CheckCircle, Inbox,
  Send, Users, TrendingUp, Clock, Eye,
  Paperclip, Mail
} from 'lucide-react';
import { PRIORITY_COLORS } from '@/shared/types';
import { useTheme } from '@/react-app/components/ThemeProvider';
import Button from '@/react-app/components/Button';
import Input from '@/react-app/components/Input';
import Card from '@/react-app/components/Card';
import Chatbot from '@/react-app/components/Chatbot';

interface EmailItem {
  id: string;
  sender_email: string;
  sender_name: string;
  subject: string;
  content: string;
  received_date: string;
  priority_level: number;
  category: string;
  company: string;
  is_read: boolean;
  is_starred: boolean;
  has_task_assigned: boolean;
  task_id?: string;
  labels: string[];
  attachments_count: number;
}

// Helper function to generate mock emails
const generateMockEmails = (): EmailItem[] => {
  const senders = [
    { name: 'Sarah Johnson', email: 'sarah.johnson@techcorp.com', company: 'TechCorp Inc.' },
    { name: 'Mike Chen', email: 'mike.chen@salesforce.com', company: 'Salesforce' },
    { name: 'Emma Davis', email: 'emma.davis@microsoft.com', company: 'Microsoft' },
    { name: 'Alex Rodriguez', email: 'alex.rodriguez@google.com', company: 'Google' },
    { name: 'Jennifer Wilson', email: 'jennifer.wilson@amazon.com', company: 'Amazon Web Services' },
    { name: 'Robert Thompson', email: 'robert.thompson@apple.com', company: 'Apple Inc.' },
    { name: 'Lisa Park', email: 'lisa.park@meta.com', company: 'Meta Platforms' },
    { name: 'David Kim', email: 'david.kim@netflix.com', company: 'Netflix' },
    { name: 'Amanda Walsh', email: 'amanda.walsh@stripe.com', company: 'Stripe' },
    { name: 'James Brown', email: 'james.brown@shopify.com', company: 'Shopify' },
    { name: 'Maria Garcia', email: 'maria.garcia@adobe.com', company: 'Adobe' },
    { name: 'Chris Anderson', email: 'chris.anderson@slack.com', company: 'Slack Technologies' },
    { name: 'Patricia Lee', email: 'patricia.lee@zoom.us', company: 'Zoom' },
    { name: 'Michael Scott', email: 'michael.scott@salesforce.com', company: 'Salesforce' },
    { name: 'Angela Martin', email: 'angela.martin@oracle.com', company: 'Oracle Corporation' },
  ];

  const subjects = [
    'Quarterly Business Review - Q4 2024',
    'URGENT: Action Required by EOD',
    'Follow-up: Partnership Discussion',
    'Weekly Team Sync Meeting',
    'New Feature Launch Update',
    'Customer Feedback Summary',
    'Project Status Report',
    'Invoice Payment Reminder',
    'Security Update Required',
    'Marketing Campaign Results',
    'Budget Approval Request',
    'Technical Support Ticket',
    'Contract Renewal Notice',
    'System Maintenance Alert',
    'Product Demo Request',
  ];

  const categories = ['priority', 'sales', 'marketing', 'updates', 'social'];
  const labels = ['urgent', 'important', 'review', 'action-required', 'follow-up', 'meeting', 'report'];

  const emails: EmailItem[] = [];
  
  for (let i = 0; i < 100; i++) {
    const sender = senders[i % senders.length];
    const subjectBase = subjects[i % subjects.length];
    const daysAgo = Math.floor(i / 5);
    const hoursAgo = (i % 24);
    
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);

    // Random priority level (1-5, with higher weight on 3-4 for realism)
    const randomPriority = Math.random();
    let priority_level: number;
    if (randomPriority < 0.1) priority_level = 1; // 10% critical
    else if (randomPriority < 0.25) priority_level = 2; // 15% high
    else if (randomPriority < 0.55) priority_level = 3; // 30% medium
    else if (randomPriority < 0.85) priority_level = 4; // 30% low
    else priority_level = 5; // 15% very low

    // Task assignment based on priority:
    // - Critical (1) and High (2) always have tasks
    // - Medium (3) has 50% chance of having tasks
    // - Low (4) and Very Low (5) never have tasks
    let has_task_assigned = false;
    if (priority_level === 1 || priority_level === 2) {
      has_task_assigned = true;
    } else if (priority_level === 3) {
      has_task_assigned = Math.random() < 0.5;
    }

    emails.push({
      id: `${i + 1}`,
      sender_email: sender.email,
      sender_name: sender.name,
      subject: priority_level === 1 ? `${subjectBase} - Critical` : subjectBase,
      content: `Email content for ${subjectBase}. This is email #${i + 1} in the system.`,
      received_date: date.toISOString(),
      priority_level: priority_level,
      category: categories[i % categories.length],
      company: sender.company,
      is_read: i % 3 !== 0,
      is_starred: i % 7 === 0,
      has_task_assigned: has_task_assigned,
      task_id: has_task_assigned ? `TASK-${String(i + 1).padStart(3, '0')}` : undefined,
      labels: [labels[i % labels.length], labels[(i + 1) % labels.length]],
      attachments_count: i % 4 === 0 ? Math.floor(Math.random() * 3) + 1 : 0,
    });
  }

  return emails;
};

// Comprehensive mock email data for a proper CRM-style dashboard
const mockEmails: EmailItem[] = generateMockEmails();

const categories = [
  { id: 'all', name: 'All Emails', count: mockEmails.length, icon: Inbox },
  { id: 'priority', name: 'Priority', count: mockEmails.filter(e => e.priority_level <= 2).length, icon: TrendingUp },
  { id: 'sales', name: 'Sales', count: mockEmails.filter(e => e.category === 'sales').length, icon: Users },
  { id: 'marketing', name: 'Marketing', count: mockEmails.filter(e => e.category === 'marketing').length, icon: Send },
  { id: 'updates', name: 'Updates', count: mockEmails.filter(e => e.category === 'updates').length, icon: Clock },
];

const stats = [
  { label: 'Total Emails', value: mockEmails.length.toString(), change: '+12%', positive: true },
  { label: 'Unread', value: mockEmails.filter(e => !e.is_read).length.toString(), change: '-8%', positive: true },
  { label: 'Tasks Assigned', value: mockEmails.filter(e => e.has_task_assigned).length.toString(), change: '+23%', positive: true },
  { label: 'High Priority', value: mockEmails.filter(e => e.priority_level <= 2).length.toString(), change: '+5%', positive: false }
];

export default function EmailDashboard() {
  const [emails] = useState<EmailItem[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'sender' | 'priority' | 'subject' | 'status' | 'company'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [priorityFilter, setPriorityFilter] = useState<number | null>(null);
  const [companyFilter, setCompanyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread' | 'starred' | 'task'>('all');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [columnWidths] = useState({
    sender: 25,
    subject: 35,
    company: 15,
    priority: 10,
    date: 10,
    status: 5
  });

  const { theme, toggleTheme } = useTheme();
  const loadingRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Custom cursor effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.willChange = 'transform';
    document.body.appendChild(cursor);

    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    cursorGlow.style.willChange = 'transform';
    document.body.appendChild(cursorGlow);

    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorGlow.style.left = e.clientX - 150 + 'px';
        cursorGlow.style.top = e.clientY - 150 + 'px';
      });
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      cursor.remove();
      cursorGlow.remove();
    };
  }, []);

  // Bulk selection handlers
  const toggleSelectEmail = (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedEmails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(emailId)) {
        newSet.delete(emailId);
      } else {
        newSet.add(emailId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedEmails.size === filteredEmails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(filteredEmails.map(e => e.id)));
    }
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'star' | 'unstar' | 'archive') => {
    // In a real app, this would call an API
    console.log(`Bulk action: ${action} on`, Array.from(selectedEmails));
    // Clear selection after action
    setSelectedEmails(new Set());
  };

  useEffect(() => {
    // Loading animation
    const loadingTl = gsap.timeline();
    
    loadingTl.to('.loading-progress', {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut'
    });

    setTimeout(() => {
      setIsLoading(false);
      
      // Animate stats cards
      gsap.fromTo('.stat-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    }, 1000);
  }, []);

  // Filter and sort emails
  const filteredEmails = emails
    .filter(email => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'priority') {
          if (email.priority_level > 2) return false;
        } else {
          if (email.category !== selectedCategory) return false;
        }
      }
      if (priorityFilter && email.priority_level !== priorityFilter) return false;
      if (companyFilter && !email.company.toLowerCase().includes(companyFilter.toLowerCase())) return false;
      if (statusFilter === 'read' && !email.is_read) return false;
      if (statusFilter === 'unread' && email.is_read) return false;
      if (statusFilter === 'starred' && !email.is_starred) return false;
      if (statusFilter === 'task' && !email.has_task_assigned) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          email.sender_email.toLowerCase().includes(query) ||
          email.sender_name.toLowerCase().includes(query) ||
          email.subject.toLowerCase().includes(query) ||
          email.content.toLowerCase().includes(query) ||
          email.company.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.received_date).getTime() - new Date(b.received_date).getTime();
          break;
        case 'sender':
          comparison = a.sender_name.localeCompare(b.sender_name);
          break;
        case 'priority':
          comparison = a.priority_level - b.priority_level;
          break;
        case 'subject':
          comparison = a.subject.localeCompare(b.subject);
          break;
        case 'company':
          comparison = a.company.localeCompare(b.company);
          break;
        case 'status':
          // Sort by read status (unread first), then starred
          if (a.is_read === b.is_read) {
            comparison = (b.is_starred ? 1 : 0) - (a.is_starred ? 1 : 0);
          } else {
            comparison = (a.is_read ? 1 : 0) - (b.is_read ? 1 : 0);
          }
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleEmailClick = (email: EmailItem) => {
    setSelectedEmail(email);
    setShowEmailModal(true);
  };

  if (isLoading) {
    return (
      <div ref={loadingRef} className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} flex flex-col items-center justify-center`}>
        <div className="mb-8 flex items-center space-x-3">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Mail className="w-9 h-9 text-white" />
          </div>
          <span className={`text-4xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gradient-to-r from-gray-900 to-gray-600'} bg-clip-text text-transparent`}>
            SPINABOT
          </span>
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8 text-center max-w-md`}>
          Connecting to your {localStorage.getItem('selectedProvider') || 'email'} and fetching your first {localStorage.getItem('emailCount') || '50'} emails...
        </p>
        
        <div className={`w-80 h-3 ${theme === 'dark' ? 'bg-violet-950/30' : 'bg-gray-300'} rounded-full overflow-hidden`}>
          <div className="loading-progress h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full shadow-lg shadow-violet-500/30" style={{ width: '0%' }} />
        </div>
        
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm mt-6`}>Analyzing your emails and configuring AI classification</p>
      </div>
    );
  }

  return (
    <>
      <div ref={dashboardRef} className={`h-screen overflow-hidden ${theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300 relative`}>
        {/* Animated Background Gradients */}
        <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black' : 'bg-gradient-to-br from-gray-50 via-white to-violet-100/30'}`} />
        <div className={`fixed top-1/4 left-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-violet-600/10' : 'bg-violet-300/20'} rounded-full blur-3xl animate-pulse opacity-30 floating-animation`} />
        <div className={`fixed top-1/4 right-1/4 w-80 h-80 ${theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-300/20'} rounded-full blur-3xl animate-pulse opacity-30 animation-delay-1000 floating-animation`} />
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${theme === 'dark' ? 'bg-violet-500/5' : 'bg-indigo-300/20'} rounded-full blur-3xl animate-pulse opacity-20 animation-delay-2000 floating-animation`} />
        
        {/* Navigation Bar */}
        <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-lg border-b ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
          <div className="px-8 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gradient-to-r from-gray-900 to-gray-600'} bg-clip-text text-transparent`}>
                  SPINABOT
                </span>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className={`p-3 ${theme === 'dark' ? 'hover:bg-violet-950/20' : 'hover:bg-gray-100'} rounded-xl transition-all duration-200 hover:scale-105`}
                >
                  {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-violet-500/10 to-purple-600/10 border border-violet-500/20 rounded-xl">
                  <User className="w-6 h-6 text-violet-400" />
                  <span className="text-base font-medium hidden sm:inline">{localStorage.getItem('userEmail') || 'user@example.com'}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Container */}
        <div className="flex h-[calc(100vh-57px)] relative mt-[57px]">
          {/* Sidebar */}
          <aside className={`${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static top-[57px] bottom-0 left-0 z-30 w-96 ${
            theme === 'dark' ? 'bg-black/98 border-violet-900/30' : 'bg-white/95 border-gray-200'
          } backdrop-blur-sm border-r transition-transform duration-300 lg:transition-none overflow-y-auto scrollbar-thin`}>
            
            {/* Stats Dashboard */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-3">Overview</h3>
              <div className="grid grid-cols-1 gap-2">
                {stats.map((stat, index) => (
                  <Card key={index} variant="glow" hover className="stat-card p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                        <p className="text-lg font-bold mt-0.5">{stat.value}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        stat.positive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {stat.change}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="px-6 pb-6">
              <nav className="space-y-2">
                <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider mb-3`}>
                  Categories
                </div>
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 text-white shadow-lg shadow-violet-500/20'
                          : `${theme === 'dark' ? 'text-gray-300 hover:bg-violet-950/20' : 'text-gray-700 hover:bg-gray-100/50'} hover:text-violet-400`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6" />
                        <span className="font-medium text-base">{category.name}</span>
                      </div>
                      <span className="text-sm bg-gradient-to-r from-violet-500 to-purple-600 text-white px-3 py-1.5 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Filters */}
              <div className="mt-8">
                <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider mb-3`}>
                  Filters
                </div>
                
                {/* Priority Filter */}
                <div className="mb-4">
                  <label className={`block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Priority</label>
                  <select
                    value={priorityFilter || ''}
                    onChange={(e) => setPriorityFilter(e.target.value ? Number(e.target.value) : null)}
                    className={`w-full ${
                      theme === 'dark' ? 'bg-black border-violet-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
                    } border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                  >
                    <option value="">All Priorities</option>
                    {Object.entries(PRIORITY_COLORS).map(([level, info]) => (
                      <option key={level} value={level}>
                        {info.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div className="mb-4">
                  <label className={`block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Sort by</label>
                  <div className="flex space-x-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className={`flex-1 ${
                        theme === 'dark' ? 'bg-black border-violet-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
                      } border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                    >
                      <option value="date">Date</option>
                      <option value="sender">Sender</option>
                      <option value="priority">Priority</option>
                      <option value="subject">Subject</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className={`p-2 ${
                        theme === 'dark' ? 'bg-black border-violet-900/30 hover:bg-violet-950/20' : 'bg-white border-gray-300 hover:bg-gray-50'
                      } border rounded-lg transition-colors hover:scale-105`}
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Table Content */}
          <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${showChatbot ? 'mr-96' : ''}`}>
            {/* Table Header */}
            <div className={`px-8 py-5 border-b ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
              {/* Email Dashboard Title with Mobile Menu */}
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className={`lg:hidden p-3 ${theme === 'dark' ? 'hover:bg-violet-950/20' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                >
                  {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <h1 className="text-xl font-semibold">Email Dashboard</h1>
              </div>
              
              {/* Search and Filter Row */}
              <div className="flex items-center gap-6 mb-4">
                <h2 className="text-2xl font-semibold whitespace-nowrap">
                  {selectedCategory === 'all' ? 'All Emails' : categories.find(c => c.id === selectedCategory)?.name}
                  <span className={`ml-2 text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    ({filteredEmails.length})
                  </span>
                </h2>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl">
                  <Input
                    type="text"
                    placeholder="Search emails, senders, content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="w-6 h-6" />}
                    className="w-full text-base"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Button 
                    size="md"
                    variant="ghost"
                    onClick={() => setShowFilters(!showFilters)}
                    className="hover:bg-violet-500/20 gradient-hover relative whitespace-nowrap"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    Filter
                    {(priorityFilter !== null || companyFilter !== '' || statusFilter !== 'all' || sortBy !== 'date') && (
                      <span className="ml-2 px-2 py-0.5 bg-violet-500 text-white text-xs rounded-full">
                        {[
                          priorityFilter !== null,
                          companyFilter !== '',
                          statusFilter !== 'all',
                          sortBy !== 'date'
                        ].filter(Boolean).length}
                      </span>
                    )}
                  </Button>

                  <button
                    onClick={() => setShowChatbot(!showChatbot)}
                    className="p-3 hover:bg-violet-500/20 rounded-lg transition-all duration-300 hover:scale-110 group relative hover:shadow-lg hover:shadow-violet-500/50 flex-shrink-0"
                    title="AI Assistant"
                  >
                    <svg className="w-6 h-6 transition-all duration-300 group-hover:rotate-12 group-hover:text-violet-400 group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      <circle cx="9" cy="9" r="1" fill="currentColor" />
                      <circle cx="15" cy="9" r="1" fill="currentColor" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12a3 3 0 006 0" />
                    </svg>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
              
              {/* Advanced Filters */}
              {showFilters && (
                <Card variant="glass" className="p-4 mb-4 gradient-hover">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Priority Filter */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Priority</label>
                      <select
                        value={priorityFilter || ''}
                        onChange={(e) => setPriorityFilter(e.target.value ? Number(e.target.value) : null)}
                        className={`w-full text-sm ${
                          theme === 'dark' ? 'bg-black border-violet-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                      >
                        <option value="">All Priorities</option>
                        {Object.entries(PRIORITY_COLORS).map(([level, info]) => (
                          <option key={level} value={level}>
                            {info.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`w-full text-sm ${
                          theme === 'dark' ? 'bg-black border-violet-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Read Status Filter */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className={`w-full text-sm ${
                          theme === 'dark' ? 'bg-black border-violet-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                      >
                        <option value="all">All Emails</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="starred">Starred</option>
                        <option value="task">With Tasks</option>
                      </select>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className={`block text-xs font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Sort by</label>
                      <div className="flex space-x-1">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className={`flex-1 text-sm ${
                            theme === 'dark' ? 'bg-black border-violet-900/30 text-white' : 'bg-white border-gray-300 text-gray-900'
                          } border rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500`}
                        >
                          <option value="date">Date</option>
                          <option value="sender">Sender</option>
                          <option value="priority">Priority</option>
                          <option value="subject">Subject</option>
                        </select>
                        <button
                          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                          className={`p-2 ${
                            theme === 'dark' ? 'bg-black border-violet-900/30 hover:bg-violet-950/20' : 'bg-white border-gray-300 hover:bg-gray-50'
                          } border rounded-lg transition-all hover:scale-105 gradient-hover`}
                        >
                          {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedCategory('all');
                          setPriorityFilter(null);
                          setCompanyFilter('');
                          setStatusFilter('all');
                          setSearchQuery('');
                          setSortBy('date');
                          setSortOrder('desc');
                        }}
                        className="w-full gradient-hover"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
              
              {/* Dynamic Table Header Row */}
              <div className={`flex gap-4 text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                {/* Checkbox Column */}
                <div className="w-8 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedEmails.size > 0 && selectedEmails.size === filteredEmails.length}
                    onChange={toggleSelectAll}
                    title="Select all"
                  />
                </div>
                {/* Sender Column */}
                <div style={{ width: `${columnWidths.sender}%` }} className="min-w-0 flex items-center justify-between group">
                  <span>Sender</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSortBy('sender');
                        setSortOrder(sortBy === 'sender' && sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${sortBy === 'sender' ? 'text-violet-400' : ''}`}
                      title="Sort by sender"
                    >
                      {sortBy === 'sender' ? (
                        sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      ) : (
                        <Filter className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Subject Column */}
                <div style={{ width: `${columnWidths.subject}%` }} className="min-w-0 flex items-center justify-between group">
                  <span>Subject</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSortBy('subject');
                        setSortOrder(sortBy === 'subject' && sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${sortBy === 'subject' ? 'text-violet-400' : ''}`}
                      title="Sort by subject"
                    >
                      {sortBy === 'subject' ? (
                        sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      ) : (
                        <Filter className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Company Column */}
                <div style={{ width: `${columnWidths.company}%` }} className="min-w-0 flex items-center justify-between group">
                  <span>Company</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSortBy('company');
                        setSortOrder(sortBy === 'company' && sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${sortBy === 'company' ? 'text-violet-400' : ''}`}
                      title="Sort by company"
                    >
                      {sortBy === 'company' ? (
                        sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      ) : (
                        <Filter className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Priority Column */}
                <div style={{ width: `${columnWidths.priority}%` }} className="min-w-0 flex items-center justify-between group">
                  <span>Priority</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSortBy('priority');
                        setSortOrder(sortBy === 'priority' && sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${sortBy === 'priority' ? 'text-violet-400' : ''}`}
                      title="Sort by priority"
                    >
                      {sortBy === 'priority' ? (
                        sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      ) : (
                        <Filter className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Date Column */}
                <div style={{ width: `${columnWidths.date}%` }} className="min-w-0 flex items-center justify-between group">
                  <span>Date</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        setSortBy('date');
                        setSortOrder(sortBy === 'date' && sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${sortBy === 'date' ? 'text-violet-400' : ''}`}
                      title="Sort by date"
                    >
                      {sortBy === 'date' ? (
                        sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      ) : (
                        <Filter className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Status Column */}
                <div style={{ width: `${columnWidths.status}%` }} className="min-w-0 flex items-center justify-between group">
                  <span>Status</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => {
                        // Cycle through status filters: all -> unread -> read -> starred -> task -> all
                        if (statusFilter === 'all') setStatusFilter('unread');
                        else if (statusFilter === 'unread') setStatusFilter('read');
                        else if (statusFilter === 'read') setStatusFilter('starred');
                        else if (statusFilter === 'starred') setStatusFilter('task');
                        else setStatusFilter('all');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${statusFilter !== 'all' ? 'text-violet-400' : ''}`}
                      title={`Filter: ${statusFilter === 'all' ? 'All' : statusFilter === 'task' ? 'With Tasks' : statusFilter}`}
                    >
                      <Filter className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('status');
                        setSortOrder(sortBy === 'status' && sortOrder === 'asc' ? 'desc' : 'asc');
                      }}
                      className={`p-1 rounded hover:bg-violet-500/20 transition-all ${sortBy === 'status' ? 'text-violet-400' : ''}`}
                      title="Sort by status"
                    >
                      {sortBy === 'status' ? (
                        sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                      ) : (
                        <Filter className="w-3 h-3 opacity-50" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bulk Action Bar */}
            {selectedEmails.size > 0 && (
              <div className={`sticky top-0 z-10 px-6 py-3 ${theme === 'dark' ? 'bg-violet-900/90' : 'bg-violet-100/90'} backdrop-blur-sm border-b ${theme === 'dark' ? 'border-violet-800' : 'border-violet-200'} shadow-lg animate-in slide-in-from-top duration-300`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {selectedEmails.size} email{selectedEmails.size > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleBulkAction('read')}
                      className="hover:bg-violet-500/20"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Mark Read
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleBulkAction('unread')}
                      className="hover:bg-violet-500/20"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Mark Unread
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleBulkAction('star')}
                      className="hover:bg-violet-500/20"
                    >
                      <Star className="w-4 h-4 mr-1" />
                      Star
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleBulkAction('archive')}
                      className="hover:bg-violet-500/20"
                    >
                      <Archive className="w-4 h-4 mr-1" />
                      Archive
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedEmails(new Set())}
                      className="hover:bg-red-500/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Email Table */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-500/50 scrollbar-track-transparent hover:scrollbar-thumb-violet-500/80">
              {filteredEmails.map((email) => (
                <div
                  key={email.id}
                  className={`flex gap-4 items-center px-8 py-5 border-b transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 cursor-pointer group gradient-hover ${
                    theme === 'dark' 
                      ? 'border-violet-900/30 hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-purple-600/10' 
                      : 'border-gray-200 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50'
                  } ${!email.is_read ? 'bg-violet-500/5 border-l-4 border-l-violet-500' : ''} ${selectedEmails.has(email.id) ? 'bg-violet-500/20' : ''}`}
                  onClick={() => handleEmailClick(email)}
                >
                  {/* Checkbox */}
                  <div className="w-10 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedEmails.has(email.id)}
                      onChange={(e) => toggleSelectEmail(email.id, e as any)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-5 h-5"
                    />
                  </div>
                  {/* Sender */}
                  <div style={{ width: `${columnWidths.sender}%` }} className="min-w-0 flex items-center space-x-3">
                    <div 
                      className="w-6 h-6 rounded-full flex-shrink-0 ring-2 ring-offset-1 transition-all"
                      style={{ 
                        backgroundColor: PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].color,
                        borderColor: `${PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].color}40`,
                        boxShadow: `0 0 8px ${PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].color}30`
                      }}
                      title={`Priority: ${PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].label}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className={`font-medium truncate text-base ${!email.is_read ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                        {email.sender_name}
                      </div>
                      <div className={`text-sm truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {email.sender_email}
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ width: `${columnWidths.subject}%` }} className="min-w-0">
                    <div className={`font-medium truncate text-base ${!email.is_read ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                      {email.subject}
                    </div>
                    <div className={`text-sm truncate mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {email.content.substring(0, 50)}...
                    </div>
                  </div>

                  {/* Company */}
                  <div style={{ width: `${columnWidths.company}%` }} className="min-w-0">
                    <div className={`text-base truncate ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {email.company}
                    </div>
                  </div>

                  {/* Priority */}
                  <div style={{ width: `${columnWidths.priority}%` }} className="min-w-0">
                    <span 
                      className="px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap gradient-hover"
                      style={{ 
                        backgroundColor: PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].color + '20',
                        color: PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].color,
                        border: `1px solid ${PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].color}40`
                      }}
                    >
                      {PRIORITY_COLORS[email.priority_level as keyof typeof PRIORITY_COLORS].label}
                    </span>
                  </div>

                  {/* Date */}
                  <div style={{ width: `${columnWidths.date}%` }} className="min-w-0">
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatDate(email.received_date)}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {formatTime(email.received_date)}
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ width: `${columnWidths.status}%` }} className="min-w-0 flex items-center justify-center space-x-2">
                    {email.is_starred && (
                      <div title="Starred">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                    {email.attachments_count > 0 && (
                      <div title={`${email.attachments_count} attachment(s)`}>
                        <Paperclip className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    {email.has_task_assigned && (
                      <div title={`Task: ${email.task_id}`}>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Chatbot Side Panel */}
          <aside className={`${
            showChatbot ? 'translate-x-0' : 'translate-x-full'
          } fixed right-0 top-[57px] bottom-0 w-96 ${
            theme === 'dark' ? 'bg-black/98 border-violet-900/30' : 'bg-white/95 border-gray-200'
          } backdrop-blur-sm border-l transition-transform duration-300 z-30 flex flex-col`}>
            <div className={`flex items-center justify-between p-5 border-b ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AI Assistant</h3>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-violet-950/20' : 'hover:bg-gray-100'} transition-colors`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chatbot embedded={true} />
            </div>
          </aside>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      {/* Email Detail Modal */}
      {showEmailModal && selectedEmail && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-black/70' : 'bg-gray-900/30'} backdrop-blur-sm`}>
          <Card variant="glow" className="w-full max-w-4xl h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email Details</h2>
              <button
                onClick={() => setShowEmailModal(false)}
                className={`p-2 ${theme === 'dark' ? 'hover:bg-violet-950/20' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
              >
                <X className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Email Content */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
              {/* Email Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h1 className={`text-xl font-semibold mb-2 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedEmail.subject}</h1>
                    <div className={`flex items-center space-x-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} flex-wrap`}>
                      <span className="truncate">{selectedEmail.sender_name} &lt;{selectedEmail.sender_email}&gt;</span>
                      <span className="whitespace-nowrap">{formatDate(selectedEmail.received_date)} at {formatTime(selectedEmail.received_date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                    <button className={`p-2 ${theme === 'dark' ? 'hover:bg-violet-950/20' : 'hover:bg-gray-100'} rounded-lg transition-colors hover:scale-105`}>
                      <Star className={`w-5 h-5 ${selectedEmail.is_starred ? 'text-yellow-400' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                    <button className={`p-2 ${theme === 'dark' ? 'hover:bg-violet-950/20' : 'hover:bg-gray-100'} rounded-lg transition-colors hover:scale-105`}>
                      <Archive className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                  </div>
                </div>

                {/* Email Metadata */}
                <div className="flex items-center space-x-6 text-sm flex-wrap">
                  <div className="flex items-center space-x-2">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Priority:</span>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                      style={{ 
                        backgroundColor: PRIORITY_COLORS[selectedEmail.priority_level as keyof typeof PRIORITY_COLORS].color + '20',
                        color: PRIORITY_COLORS[selectedEmail.priority_level as keyof typeof PRIORITY_COLORS].color,
                        border: `1px solid ${PRIORITY_COLORS[selectedEmail.priority_level as keyof typeof PRIORITY_COLORS].color}40`
                      }}
                    >
                      {PRIORITY_COLORS[selectedEmail.priority_level as keyof typeof PRIORITY_COLORS].label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Company:</span>
                    <span className="text-white">{selectedEmail.company}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Task:</span>
                    <span className={selectedEmail.has_task_assigned ? 'text-green-400 font-medium' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                      {selectedEmail.has_task_assigned ? selectedEmail.task_id : 'Not Assigned'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Content */}
              <div className={theme === 'dark' ? 'prose prose-invert max-w-none' : 'prose max-w-none'}>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} leading-relaxed whitespace-pre-wrap`}>
                  {selectedEmail.content}
                </p>
              </div>

              {/* Labels */}
              {selectedEmail.labels.length > 0 && (
                <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-2 flex-wrap">
                    <Tag className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex-shrink-0`} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Labels:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmail.labels.map((label, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/30 ${theme === 'dark' ? 'text-violet-300' : 'text-violet-700'} text-xs rounded-full font-medium shadow-sm`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedEmail.attachments_count > 0 && (
                <div className={`mt-6 pt-4 border-t ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Attachments:</span>
                    <span className={`px-2 py-1 ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'} text-xs rounded-full`}>
                      {selectedEmail.attachments_count} file{selectedEmail.attachments_count !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-violet-900/30' : 'border-gray-200'}`}>
              <div className="flex space-x-3">
                <Button size="sm" className="shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40">
                  Reply
                </Button>
                <Button size="sm" variant="ghost" className="hover:bg-violet-500/10">
                  Forward
                </Button>
                <Button size="sm" variant="ghost" className="hover:bg-violet-500/10">
                  {selectedEmail.has_task_assigned ? 'View Task' : 'Create Task'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
