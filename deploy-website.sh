#!/bin/bash
# Automated deployment script for Astro website
# Usage: ./deploy.sh [server_user] [server_ip] [server_path]

# Default values (replace with your actual values)
SERVER_SSH=${1:-"uberspace.cblte"}
SERVER_PATH=${2:-"/var/www/virtual/cblte/cbrueggenolte.de/"}

echo "🚀 Starting deployment process..."

# 1. Install dependencies without dev dependencies
echo "📦 Installing production dependencies only..."
pnpm install --prod --frozen-lockfile

# 2. Build the project
echo "🔨 Building project..."
pnpm run build

# 3. Deploy to server
echo "📤 Deploying to server at $SERVER_SSH:$SERVER_PATH"
rsync -avz --delete dist/ "$SERVER_SSH:$SERVER_PATH"

# 4. Reinstall dev dependencies for local development (optional)
echo "🔄 Reinstalling dev dependencies for continued development..."
pnpm install

echo "✅ Deployment complete!"
