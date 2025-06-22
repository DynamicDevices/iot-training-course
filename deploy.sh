#!/bin/bash

# TCP/IP Training Deployment Script
# This script automates the deployment process to GitHub Pages

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [[ ! -f "index.html" ]]; then
    echo "❌ Error: index.html not found. Are you in the project root?"
    exit 1
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Error: Git is not installed"
    exit 1
fi

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  You have uncommitted changes. Please commit them first."
    git status --short
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Update version in package.json if it exists
if [[ -f "package.json" ]]; then
    echo "📦 Updating version in package.json..."
    npm version patch --no-git-tag-version
fi

# Build process (if needed)
echo "🔨 Running build process..."

# Validate HTML files
echo "✅ Validating HTML files..."
if command -v htmlhint &> /dev/null; then
    htmlhint **/*.html
else
    echo "⚠️  htmlhint not found, skipping HTML validation"
fi

# Validate CSS files
echo "✅ Validating CSS files..."
if command -v stylelint &> /dev/null; then
    stylelint assets/css/*.css
else
    echo "⚠️  stylelint not found, skipping CSS validation"
fi

# Commit any automatic changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Committing automatic changes..."
    git add .
    git commit -m "chore: automatic updates for deployment"
fi

# Push to main branch
echo "📤 Pushing to main branch..."
git push origin $CURRENT_BRANCH

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."

# Check if gh-pages is available
if command -v gh-pages &> /dev/null; then
    gh-pages -d .
else
    echo "⚠️  gh-pages CLI not found. Using Git method..."
    
    # Alternative method using git
    git checkout -B gh-pages
    git push -f origin gh-pages
    git checkout $CURRENT_BRANCH
fi

echo "✅ Deployment complete!"
echo "🌍 Your site will be available at:"
echo "   https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')"
echo ""
echo "📝 Note: It may take a few minutes for changes to appear on GitHub Pages"
