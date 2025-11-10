import z from "zod";

// User and Authentication Types
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().optional(),
  provider: z.enum(['gmail', 'outlook', 'zoho']),
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
  is_active: z.boolean(),
  preferences: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// Company Types
export const CompanySchema = z.object({
  id: z.number(),
  name: z.string(),
  domain: z.string().optional(),
  industry: z.string().optional(),
  logo_url: z.string().optional(),
  priority_level: z.number().min(1).max(5).default(3),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;

// Task Management Tool Types
export const TaskToolSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  tool_type: z.enum(['jira', 'notion']),
  api_key: z.string().optional(),
  api_url: z.string().optional(),
  workspace_id: z.string().optional(),
  is_connected: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type TaskTool = z.infer<typeof TaskToolSchema>;

// Email Types
export const EmailSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  message_id: z.string(),
  thread_id: z.string().optional(),
  sender_email: z.string().email(),
  sender_name: z.string().optional(),
  subject: z.string().optional(),
  content: z.string().optional(),
  html_content: z.string().optional(),
  received_date: z.string(),
  priority_level: z.number().min(1).max(5).default(3),
  category: z.enum(['priority', 'sales', 'marketing', 'social', 'updates', 'spam']).optional(),
  company_id: z.number().optional(),
  is_read: z.boolean(),
  is_starred: z.boolean(),
  is_archived: z.boolean(),
  has_task_assigned: z.boolean(),
  task_id: z.string().optional(),
  labels: z.string().optional(),
  attachments_count: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Email = z.infer<typeof EmailSchema>;

// Email Label Types
export const EmailLabelSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  name: z.string(),
  color: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type EmailLabel = z.infer<typeof EmailLabelSchema>;

// Onboarding Types
export const OnboardingResponseSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  question_number: z.number(),
  answer: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type OnboardingResponse = z.infer<typeof OnboardingResponseSchema>;

// API Request/Response Types
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  provider: z.enum(['gmail', 'outlook', 'zoho']),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const EmailFiltersSchema = z.object({
  category: z.string().optional(),
  priority: z.number().optional(),
  company: z.string().optional(),
  sender: z.string().optional(),
  labels: z.array(z.string()).optional(),
  search: z.string().optional(),
  sort_by: z.enum(['date', 'sender', 'priority', 'subject']).default('date'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().default(1),
  limit: z.number().default(50),
});

export type EmailFilters = z.infer<typeof EmailFiltersSchema>;

export const TaskToolConnectionSchema = z.object({
  tool_type: z.enum(['jira', 'notion']),
  api_key: z.string(),
  api_url: z.string().optional(),
  workspace_id: z.string().optional(),
});

export type TaskToolConnection = z.infer<typeof TaskToolConnectionSchema>;

// Priority Level Colors and Labels
export const PRIORITY_COLORS = {
  1: { color: '#EF4444', label: 'Critical', bgColor: 'bg-red-500' },
  2: { color: '#F97316', label: 'High', bgColor: 'bg-orange-500' },
  3: { color: '#EAB308', label: 'Medium', bgColor: 'bg-yellow-500' },
  4: { color: '#22C55E', label: 'Low', bgColor: 'bg-green-500' },
  5: { color: '#6B7280', label: 'Very Low', bgColor: 'bg-gray-500' },
};

// Category Colors and Labels
export const CATEGORY_COLORS = {
  priority: { color: '#EF4444', gradient: 'from-red-500 to-pink-500' },
  sales: { color: '#22C55E', gradient: 'from-green-500 to-emerald-500' },
  marketing: { color: '#F97316', gradient: 'from-orange-500 to-red-500' },
  social: { color: '#EC4899', gradient: 'from-pink-500 to-purple-500' },
  updates: { color: '#3B82F6', gradient: 'from-blue-500 to-cyan-500' },
  spam: { color: '#6B7280', gradient: 'from-gray-500 to-gray-600' },
};

export const EMAIL_PROVIDERS = [
  {
    id: 'gmail',
    name: 'Gmail',
    emoji: '📧',
    popular: true,
    gradient: 'from-red-500 to-orange-500'
  },
  {
    id: 'outlook',
    name: 'Outlook',
    emoji: '📨',
    popular: true,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'zoho',
    name: 'Zoho Mail',
    emoji: '📩',
    popular: false,
    gradient: 'from-purple-500 to-pink-500'
  }
];

export const TASK_MANAGEMENT_TOOLS = [
  {
    id: 'jira',
    name: 'Jira',
    logo: '🔗',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'notion',
    name: 'Notion',
    logo: '📝',
    gradient: 'from-gray-700 to-gray-900'
  }
];
