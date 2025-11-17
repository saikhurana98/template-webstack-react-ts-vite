#!/bin/bash

# Setup script for Template WebApp
# This script initializes the project and sets up the development environment

set -e

echo "🚀 Setting up Template WebApp..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if Yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Installing Yarn..."
    npm install -g yarn
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ Yarn version: $(yarn --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

echo ""
echo "🔧 Setting up environment files..."

# Setup backend .env
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
else
    echo "⚠️  backend/.env already exists, skipping..."
fi

echo ""
echo "🎣 Setting up Git hooks..."
yarn prepare

echo ""
echo "🌱 Seeding database with sample data..."
yarn workspace backend seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Run 'yarn dev' to start both frontend and backend"
echo "  2. Frontend will be available at http://localhost:3000"
echo "  3. Backend will be available at http://localhost:5000"
echo ""
echo "📖 For more information, check out the README.md"
echo ""
echo "Happy coding! 🎉"
