# Setup script for Template WebApp (Windows)
# This script initializes the project and sets up the development environment

Write-Host "🚀 Setting up Template WebApp..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js v18 or higher." -ForegroundColor Red
    exit 1
}

# Check if Yarn is installed
try {
    $yarnVersion = yarn --version
    Write-Host "✅ Yarn version: $yarnVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Yarn is not installed. Installing Yarn..." -ForegroundColor Yellow
    npm install -g yarn
}

Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
yarn install

Write-Host ""
Write-Host "🔧 Setting up environment files..." -ForegroundColor Cyan

# Setup backend .env
if (-not (Test-Path "backend/.env")) {
    Copy-Item "backend/.env.example" "backend/.env"
    Write-Host "✅ Created backend/.env" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend/.env already exists, skipping..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎣 Setting up Git hooks..." -ForegroundColor Cyan
yarn prepare

Write-Host ""
Write-Host "🌱 Seeding database with sample data..." -ForegroundColor Cyan
yarn workspace backend seed

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run 'yarn dev' to start both frontend and backend"
Write-Host "  2. Frontend will be available at http://localhost:3000"
Write-Host "  3. Backend will be available at http://localhost:5000"
Write-Host ""
Write-Host "📖 For more information, check out the README.md"
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Magenta
