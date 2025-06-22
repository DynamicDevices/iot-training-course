# Contributing to TCP/IP Training

We welcome contributions from the embedded engineering community! This project aims to provide the best possible networking training for embedded developers.

## How to Contribute

### 🐛 Reporting Bugs
- Use the GitHub Issues tab
- Include detailed description of the problem
- Provide steps to reproduce
- Include browser/OS information if relevant

### 💡 Suggesting Enhancements
- Open an issue with the "enhancement" label
- Describe the feature you'd like to see
- Explain why it would be valuable for embedded engineers

### 🔧 Code Contributions

#### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear message: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

#### Guidelines
- **Code Style**: Follow existing HTML/CSS/JS patterns
- **Testing**: Test on multiple browsers (Chrome, Firefox, Safari)
- **Documentation**: Update relevant documentation
- **Mobile**: Ensure mobile responsiveness
- **Accessibility**: Follow web accessibility standards

### 📝 Content Contributions

#### New Training Modules
- Follow existing module structure
- Include practical examples
- Add interactive elements where possible
- Provide real ESP32/Arduino code examples

#### Lab Exercises
- Test on actual hardware (ESP32 recommended)
- Include troubleshooting steps
- Provide expected outputs
- Add difficulty levels

#### Code Examples
- Test all code before submitting
- Comment thoroughly
- Include hardware requirements
- Provide wiring diagrams if needed

### 🎨 Design Contributions
- Maintain consistent visual style
- Ensure responsive design
- Consider accessibility (color contrast, etc.)
- Test on various screen sizes

## Development Setup

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- Git
- Basic understanding of HTML/CSS/JavaScript

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/tcp-ip-training.git
cd tcp-ip-training

# Start local server
python -m http.server 8000
# or
npx serve .

# Open browser to http://localhost:8000
```

### Project Structure
```
tcp-ip-training/
├── index.html          # Main landing page
├── modules/            # Training modules
├── labs/              # Hands-on exercises
├── tools/             # Interactive tools
├── reference/         # Reference materials
├── assets/            # CSS, JS, images
└── code-examples/     # Downloadable code
```

## Review Process

### Pull Request Requirements
- [ ] Clear description of changes
- [ ] No breaking changes to existing content
- [ ] Mobile-responsive design
- [ ] Cross-browser compatibility
- [ ] Accessible design (WCAG guidelines)
- [ ] Documentation updated if needed

### Review Criteria
1. **Educational Value**: Does it help embedded engineers learn?
2. **Accuracy**: Is the technical content correct?
3. **Clarity**: Is it easy to understand?
4. **Practical**: Can learners apply this knowledge?
5. **Code Quality**: Does code follow best practices?

## Community Guidelines

### Be Respectful
- Welcome newcomers to embedded engineering
- Provide constructive feedback
- Be patient with different skill levels
- Respect diverse perspectives and experiences

### Stay Focused
- Keep discussions relevant to networking in embedded systems
- Focus on educational content
- Prioritize practical, applicable knowledge

### Quality Standards
- Accurate technical information
- Clear, concise explanations
- Working code examples
- Proper attribution for external resources

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Individual module/lab credits
- Annual contributor highlights
- Community showcase

## Questions?

- **General Questions**: Open a GitHub Discussion
- **Specific Issues**: Create a GitHub Issue
- **Direct Contact**: training@yourcompany.com

Thank you for helping make embedded networking education better for everyone! 🚀
