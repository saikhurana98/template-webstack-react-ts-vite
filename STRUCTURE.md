# Project Structure

This document provides an overview of the project structure and organization.

## 📂 Directory Structure

```
template-webapp-react-ts-vite/
│
├── 📁 .github/                    # GitHub specific configurations
│   ├── workflows/                 # CI/CD workflows
│   │   ├── ci.yml                # Pull request checks
│   │   └── deploy.yml            # Deployment automation
│   ├── ISSUE_TEMPLATE/           # Issue templates
│   │   ├── bug_report.yml        # Bug report template
│   │   ├── feature_request.yml   # Feature request template
│   │   └── config.yml            # Template configuration
│   └── PULL_REQUEST_TEMPLATE.md  # PR template
│
├── 📁 .husky/                     # Git hooks
│   └── pre-commit                # Pre-commit hook for linting
│
├── 📁 .vscode/                    # VS Code workspace settings
│   ├── extensions.json           # Recommended extensions
│   └── settings.json             # Workspace settings
│
├── 📁 frontend/                   # React + Vite frontend application
│   ├── public/                   # Static assets
│   │   └── vite.svg             # Vite logo
│   ├── src/                      # Source code
│   │   ├── components/          # React components
│   │   ├── services/            # API service layer
│   │   ├── App.css             # App styles
│   │   ├── App.tsx             # Main App component
│   │   ├── index.css           # Global styles
│   │   ├── main.tsx            # Application entry point
│   │   └── vite-env.d.ts       # Vite type definitions
│   ├── .eslintrc.cjs           # ESLint configuration
│   ├── index.html              # HTML template
│   ├── package.json            # Frontend dependencies
│   ├── tsconfig.json           # TypeScript config
│   ├── tsconfig.node.json      # TypeScript config for Node
│   └── vite.config.ts          # Vite configuration
│
├── 📁 backend/                    # Node.js + Express backend application
│   ├── src/                      # Source code
│   │   ├── config/              # Configuration files
│   │   │   └── database.ts      # Database configuration
│   │   ├── controllers/         # Request handlers
│   │   │   └── item.controller.ts
│   │   ├── entities/            # TypeORM entities
│   │   │   └── Item.ts          # Sample Item entity
│   │   ├── routes/              # API routes
│   │   │   └── item.routes.ts   # Item routes
│   │   ├── scripts/             # Utility scripts
│   │   │   └── seed.ts          # Database seeding script
│   │   └── index.ts             # Server entry point
│   ├── .env.example             # Example environment variables
│   ├── .eslintrc.cjs            # ESLint configuration
│   ├── package.json             # Backend dependencies
│   └── tsconfig.json            # TypeScript config
│
├── 📄 .gitattributes              # Git attributes for line endings
├── 📄 .gitignore                  # Git ignore patterns
├── 📄 .lintstagedrc.json          # Lint-staged configuration
├── 📄 .nvmrc                      # Node version specification
├── 📄 .prettierignore             # Prettier ignore patterns
├── 📄 .prettierrc                 # Prettier configuration
├── 📄 .yarnrc.yml                 # Yarn configuration
├── 📄 CHANGELOG.md                # Version history
├── 📄 CONTRIBUTING.md             # Contribution guidelines
├── 📄 DEPLOYMENT.md               # Deployment instructions
├── 📄 LICENSE                     # MIT License
├── 📄 package.json                # Root package configuration
├── 📄 QUICKSTART.md               # Quick start guide
├── 📄 README.md                   # Main documentation
├── 📄 setup.ps1                   # Windows setup script
└── 📄 setup.sh                    # Unix setup script

```

## 🎯 Key Components

### Frontend (`/frontend`)

**Purpose:** User interface built with React, TypeScript, and Vite

**Key Files:**
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Main application component
- `vite.config.ts` - Build and development server configuration
- `tsconfig.json` - TypeScript compiler options

**Features:**
- ⚡ Fast development with Vite HMR
- 🎨 Modern CSS with dark/light mode
- 📱 Responsive design
- 🔌 API integration ready

### Backend (`/backend`)

**Purpose:** RESTful API server with Node.js, Express, and TypeORM

**Key Files:**
- `src/index.ts` - Server entry point
- `src/config/database.ts` - Database configuration
- `src/entities/` - TypeORM database models
- `src/controllers/` - Business logic handlers
- `src/routes/` - API endpoint definitions

**Features:**
- 🚀 Express.js web framework
- 🗄️ SQLite database with TypeORM
- 🔒 CORS enabled
- ✅ Full TypeScript support

### Configuration Files

#### Root Level
- `package.json` - Workspace configuration and shared scripts
- `.prettierrc` - Code formatting rules
- `.lintstagedrc.json` - Pre-commit linting configuration
- `.nvmrc` - Node.js version specification

#### Git Configuration
- `.gitignore` - Files to exclude from version control
- `.gitattributes` - Line ending normalization
- `.husky/` - Git hooks for code quality

#### CI/CD
- `.github/workflows/ci.yml` - Automated testing on PRs
- `.github/workflows/deploy.yml` - Automated deployment

## 🔧 Configuration Details

### TypeScript Configuration

**Frontend (`frontend/tsconfig.json`):**
- Target: ES2020
- Module: ESNext
- JSX: react-jsx (React 18)
- Strict mode enabled

**Backend (`backend/tsconfig.json`):**
- Target: ES2020
- Module: ESNext
- Module Resolution: bundler
- Decorators enabled (for TypeORM)

### Linting & Formatting

**ESLint:**
- Enforces code quality rules
- TypeScript-specific rules
- React hooks rules (frontend)
- Prettier integration

**Prettier:**
- Consistent code formatting
- Single quotes
- 2-space indentation
- 100 character line width

### Database

**TypeORM Configuration:**
- Database: SQLite3
- Synchronize: true (development only)
- Entities: Auto-discovered
- Migrations: Supported

## 📦 Build Output

### Frontend Build
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
```

### Backend Build
```
backend/dist/
├── index.js
├── index.js.map
├── config/
├── controllers/
├── entities/
└── routes/
```

## 🚀 Scripts

### Development
```bash
yarn dev              # Start both frontend and backend
yarn dev:frontend     # Start only frontend
yarn dev:backend      # Start only backend
```

### Building
```bash
yarn build           # Build both
yarn build:frontend  # Build frontend
yarn build:backend   # Build backend
```

### Code Quality
```bash
yarn lint            # Lint everything
yarn format          # Format all code
yarn format:check    # Check formatting
```

### Database
```bash
yarn workspace backend seed  # Seed database with sample data
```

## 🔄 Data Flow

```
User Browser
    ↓
Frontend (React + Vite) → http://localhost:3000
    ↓ API calls to /api/*
Backend (Express) → http://localhost:5000
    ↓
Database (SQLite + TypeORM)
    ↓
database.sqlite file
```

## 🛠️ Development Workflow

1. **Start Development:**
   ```bash
   yarn dev
   ```

2. **Make Changes:**
   - Edit files in `frontend/src/` or `backend/src/`
   - Changes are automatically reloaded

3. **Commit Code:**
   ```bash
   git add .
   git commit -m "feat: your feature"
   ```
   - Pre-commit hooks automatically format and lint code

4. **Create PR:**
   - Push to GitHub
   - CI automatically runs linting and builds

5. **Merge to Main:**
   - Deployment automatically triggers
   - Frontend deploys to GitHub Pages

## 📚 Additional Resources

- [README.md](README.md) - Main documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

---

**Need help?** Open an issue or discussion on GitHub!
