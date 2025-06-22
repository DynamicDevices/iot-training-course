# Additional Repository Files

## .github/workflows/deploy.yml (GitHub Actions)
```yaml
```

## .gitignore
```
```

## CONTRIBUTING.md
```markdown
```

## LICENSE
```
```

## package.json (Optional - for Node.js tools)
```json
```

## deploy.sh (Deployment Script)
```bash
```

## docs/SETUP.md (Setup Instructions)
```markdown
```

#### Validation
```bash
# HTML validation
htmlhint **/*.html

# CSS validation
stylelint assets/css/*.css

# Accessibility testing
# Use browser dev tools or axe-core
```

## Deployment Options

### GitHub Pages (Free)
- Automatic deployment from main branch
- Custom domain support
- SSL certificate included
- Global CDN

### Alternative Hosting
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Firebase Hosting**: Google's hosting platform
- **AWS S3**: Static website hosting

## Customization

### Branding
1. Update colors in `assets/css/main.css`:
   ```css
   :root {
     --primary-color: #3498db;
     --secondary-color: #2c3e50;
   }
   ```

2. Replace logo/favicon in `assets/images/`

3. Update footer and contact information

### Content
1. Modify training modules for your specific needs
2. Add company-specific examples
3. Include internal network configurations
4. Add proprietary protocols if needed

### Analytics
Add Google Analytics or similar:
```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Common Issues

#### Site Not Loading
- Check GitHub Pages status
- Verify branch selection in settings
- Check for build errors in Actions tab

#### Broken Links
- Ensure all file paths are relative
- Check capitalization (GitHub Pages is case-sensitive)
- Verify all referenced files exist

#### Styling Issues
- Clear browser cache
- Check CSS file paths
- Validate CSS syntax

#### JavaScript Errors
- Check browser console for errors
- Verify all script files are loading
- Test with JavaScript disabled

### Getting Help
- **GitHub Issues**: Report bugs
- **GitHub Discussions**: Ask questions
- **Documentation**: Check existing docs
- **Community**: Embedded engineering forums

## Performance Optimization

### Images
- Optimize image sizes
- Use appropriate formats (WebP, AVIF)
- Implement lazy loading

### Code
- Minify CSS/JavaScript for production
- Remove unused code
- Optimize font loading

### Caching
- Set appropriate cache headers
- Use service workers for offline support
- Implement progressive web app features

## Security

### Best Practices
- Keep dependencies updated
- Validate all user inputs
- Use HTTPS only
- Implement Content Security Policy

### Updates
- Regular security updates
- Monitor for vulnerabilities
- Keep Jekyll/dependencies current
```

## Quick Deployment Commands

```bash
# One-time setup
git clone https://github.com/yourusername/tcp-ip-training.git
cd tcp-ip-training
chmod +x deploy.sh

# Regular deployment
./deploy.sh

# Manual deployment
git add .
git commit -m "Update training content"
git push origin main
```
