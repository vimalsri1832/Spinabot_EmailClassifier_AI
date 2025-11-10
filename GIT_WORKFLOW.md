# Git Workflow Guide

## Quick Commands for Future Changes

### Making Changes and Pushing

```bash
# 1. Check current status
git status

# 2. Create a new branch for your feature
git checkout -b feature/your-feature-name

# 3. Make your changes in the code...

# 4. Stage your changes
git add .
# Or stage specific files
git add src/react-app/pages/EmailDashboard.tsx

# 5. Commit with a descriptive message
git commit -m "feat: add new email filtering feature"

# 6. Push to GitHub
git push origin feature/your-feature-name

# 7. Create a Pull Request on GitHub to merge into main
```

### Commit Message Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning (formatting, etc.)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

### Examples

```bash
git commit -m "feat: add priority-based task assignment"
git commit -m "fix: resolve search bar icon visibility issue"
git commit -m "docs: update README with deployment instructions"
git commit -m "style: reduce nav bar height and remove unused links"
git commit -m "refactor: optimize email filtering logic"
```

## Working with the Repository

### Update Your Local Repository

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Update your feature branch with latest main
git checkout feature/your-feature-name
git merge main
```

### Sync with Remote

```bash
# Fetch all branches
git fetch origin

# See all branches
git branch -a

# Delete a local branch
git branch -d feature/old-feature

# Delete a remote branch
git push origin --delete feature/old-feature
```

## GitHub Actions CI/CD

The project includes automated testing and deployment:

### What Happens Automatically

1. **On Push/PR to main or develop:**
   - Installs dependencies
   - Runs linter (if configured)
   - Builds the project
   - Runs tests (if configured)
   - Uploads build artifacts

2. **On Push to main:**
   - Deploys to Cloudflare Pages (requires secrets)

### Required GitHub Secrets

Go to: Repository → Settings → Secrets and variables → Actions

Add these secrets:
- `CLOUDFLARE_API_TOKEN` - Get from Cloudflare dashboard
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### View CI/CD Status

- Go to the "Actions" tab in your GitHub repository
- See all workflow runs and their status
- Click on any run to see detailed logs

## Common Workflows

### Hotfix on Production

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix
# Make your fix
git add .
git commit -m "fix: resolve critical bug in email filtering"
git push origin hotfix/critical-bug-fix
# Create PR and merge immediately after review
```

### Feature Development

```bash
git checkout main
git pull origin main
git checkout -b feature/new-email-sorting
# Develop your feature
git add .
git commit -m "feat: add custom email sorting options"
git push origin feature/new-email-sorting
# Create PR for review before merging
```

### Viewing Changes

```bash
# See what changed
git diff

# See commit history
git log --oneline

# See changes in a specific file
git log -p src/react-app/pages/EmailDashboard.tsx
```

## Troubleshooting

### Merge Conflicts

```bash
# If you have conflicts during merge
git status  # See which files have conflicts
# Edit files to resolve conflicts
git add .
git commit -m "merge: resolve conflicts with main"
```

### Undo Last Commit (not pushed)

```bash
# Keep changes
git reset --soft HEAD~1

# Discard changes
git reset --hard HEAD~1
```

### Discard Local Changes

```bash
# Discard changes in specific file
git checkout -- src/react-app/pages/EmailDashboard.tsx

# Discard all changes
git reset --hard HEAD
```

## Best Practices

1. **Always pull before starting work:** `git pull origin main`
2. **Create branches for features:** Don't work directly on main
3. **Write clear commit messages:** Others should understand what changed
4. **Commit often:** Small, focused commits are better
5. **Test before pushing:** Run `npm run build` locally first
6. **Review your changes:** Use `git diff` before committing
7. **Keep branches short-lived:** Merge within days, not weeks
8. **Delete merged branches:** Keep repository clean

## Repository Links

- **Repository:** https://github.com/vimalsri1832/Spinabot_EmailClassifier_AI
- **Issues:** https://github.com/vimalsri1832/Spinabot_EmailClassifier_AI/issues
- **Actions:** https://github.com/vimalsri1832/Spinabot_EmailClassifier_AI/actions
- **Pull Requests:** https://github.com/vimalsri1832/Spinabot_EmailClassifier_AI/pulls
