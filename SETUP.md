# Setup Instructions

## Quick Start

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/tcp-ip-training.git
cd tcp-ip-training

# Install dependencies (optional)
npm install

# Start local development server
npm start
# or
python -m http.server 8000
```

### 2. GitHub Pages Setup

#### Automatic (Recommended)
1. Fork/clone the repository
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" → "main" → "/ (root)"
4. Click Save

#### Manual
```bash
# Make deployment script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

### 3. Custom Domain (Optional)
1. Add CNAME file:
   ```bash
   echo "training.yourcompany.com" > CNAME
   ```
2. Configure DNS:
   - Create CNAME record pointing to `yourusername.github.io`
3. Update GitHub Pages settings with custom domain

## Development Workflow

### File Structure
- `index.html` - Main landing page
- `modules/` - Training module pages
- `labs/` - Hands-on exercise pages
- `tools/` - Interactive tool pages
- `assets/` - CSS, JavaScript, images
- `code-examples/` - Downloadable code samples

### Adding New Content

#### New Module
1. Create `modules/new-module.html`
2. Follow existing module structure
3. Add to navigation in `index.html`
4. Update modules index page

#### New Lab
1. Create `labs/new-lab.html`
2. Include code examples in `code-examples/`
3. Add hardware requirements
4. Test on actual embedded hardware

#### New Tool
1. Create `tools/new-tool.html`
2. Implement interactive functionality
3. Ensure mobile responsiveness
4. Add to tools index

### Testing

#### Local Testing
```bash
# Start local server
python -m http.server 8000

# Test in browsers:
# - Chrome
# - Firefox
# - Safari
# - Mobile browsers
