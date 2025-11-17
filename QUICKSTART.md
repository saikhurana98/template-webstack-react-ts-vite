# Quick Start Guide

Get up and running with Template WebApp in minutes!

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

**macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

### Option 2: Manual Setup

```bash
# 1. Install dependencies
yarn install

# 2. Create environment file
cp backend/.env.example backend/.env

# 3. Setup Git hooks
yarn prepare

# 4. Seed database (optional)
yarn workspace backend seed

# 5. Start development servers
yarn dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📝 Common Commands

```bash
# Development
yarn dev                 # Start both frontend and backend
yarn dev:frontend        # Start frontend only
yarn dev:backend         # Start backend only

# Building
yarn build              # Build both frontend and backend
yarn build:frontend     # Build frontend only
yarn build:backend      # Build backend only

# Code Quality
yarn lint               # Lint all code
yarn format             # Format all code
yarn format:check       # Check code formatting

# Database
yarn workspace backend seed  # Populate database with sample data
```

## 🎯 Next Steps

1. **Customize the App**
   - Update `frontend/src/App.tsx` for your UI
   - Modify `backend/src/entities/` to add your data models
   - Create new API routes in `backend/src/routes/`

2. **Add Features**
   - Authentication
   - More database entities
   - Additional frontend pages
   - API documentation

3. **Deploy**
   - Push to GitHub main branch
   - GitHub Actions will automatically deploy to GitHub Pages
   - Configure backend deployment separately (Heroku, Railway, etc.)

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

### Database Issues

```bash
# Delete database and reseed
rm backend/database.sqlite
yarn workspace backend seed
```

### Husky/Git Hooks Not Working

```bash
# Reinstall Husky
rm -rf .husky
yarn prepare
```

### Dependencies Issues

```bash
# Clean install
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
yarn install
```

## 📚 Learn More

- [Full Documentation](README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [License](LICENSE)

## 💡 Tips

- Use VS Code for the best development experience
- Install recommended extensions for TypeScript, ESLint, and Prettier
- Keep your dependencies up to date
- Follow the conventional commits format
- Write tests for new features

## 🆘 Need Help?

- Check the [Issues](https://github.com/YOUR_USERNAME/template-webapp-react-ts-vite/issues)
- Start a [Discussion](https://github.com/YOUR_USERNAME/template-webapp-react-ts-vite/discussions)
- Read the [FAQ](https://github.com/YOUR_USERNAME/template-webapp-react-ts-vite/wiki/FAQ)

---

Happy coding! 🎉
