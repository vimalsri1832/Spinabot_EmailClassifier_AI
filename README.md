## SPINABOT - Email Classifier AI

An intelligent email management dashboard with AI-powered classification, task assignment, and priority management.

## 🚀 Features

- **AI-Powered Email Classification** - Automatically categorizes emails
- **Smart Priority Management** - Critical, High, Medium, Low, Very Low priority levels
- **Task Assignment System** - Auto-assigns tasks based on priority
- **Advanced Filtering** - Filter by priority, status, company, and more
- **Bulk Operations** - Select multiple emails for batch actions
- **Real-time Search** - Search across senders, subjects, and content
- **Dark/Light Theme** - Toggle between themes
- **Custom Cursor Effect** - Golden glow cursor for enhanced UX
- **AI Chatbot Assistant** - Built-in AI assistant for help

## 📋 Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/vimalsri1832/Spinabot_EmailClassifier_AI.git
cd Spinabot_EmailClassifier_AI

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## 🚢 Deployment

### Cloudflare Pages (Recommended)

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set build output directory: `dist`

### GitHub Actions CI/CD

The project includes automated CI/CD pipeline that:
- Runs on push to `main` or `develop` branches
- Tests on Node.js 18.x and 20.x
- Runs linting and builds
- Automatically deploys to Cloudflare Pages on main branch

**Setup Required Secrets:**
- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

Add these in: Repository Settings → Secrets and variables → Actions

## 📁 Project Structure

```
SPINABOT/
├── .github/
│   └── workflows/
│       └── ci.yml          # CI/CD pipeline
├── src/
│   ├── react-app/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utility functions
│   ├── shared/
│   │   └── types.ts        # Shared TypeScript types
│   └── worker/
│       └── index.ts        # Cloudflare Worker
├── migrations/             # Database migrations
├── package.json
├── vite.config.ts
├── wrangler.json          # Cloudflare configuration
└── README.md
```

## 🎨 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** TailwindCSS, Custom CSS animations
- **Icons:** Lucide React
- **Animations:** GSAP
- **Deployment:** Cloudflare Pages/Workers
- **CI/CD:** GitHub Actions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Add your environment variables here
VITE_API_URL=your_api_url
```

## 📝 Git Workflow

```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

### Commit Message Convention

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💬 Support

Need help or want to join the community? Join our [Discord](https://discord.gg/shDEGBSe2d).

## 🙏 Acknowledgments

This app was created using [Mocha](https://getmocha.com).

---

Made with ❤️ by the SPINABOT team
