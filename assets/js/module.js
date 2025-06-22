document.addEventListener('DOMContentLoaded', function() {
    // Progress tracking for module sessions
    const sessions = document.querySelectorAll('.session-card');
    const progressKey = 'module1_progress';
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Initialize session tracking
    sessions.forEach((session, index) => {
        const sessionId = `session_${index + 1}`;
        const header = session.querySelector('.session-header');
        
        // Add progress indicator
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'progress-indicator';
        
        if (savedProgress[sessionId]) {
            progressIndicator.innerHTML = '✅ Completed';
            progressIndicator.className += ' completed';
            session.classList.add('completed');
        } else {
            progressIndicator.innerHTML = '⏳ Not Started';
            progressIndicator.className += ' pending';
        }
        
        header.appendChild(progressIndicator);
        
        // Add click handler to mark as completed
        session.addEventListener('click', function() {
            if (!savedProgress[sessionId]) {
                savedProgress[sessionId] = {
                    completed: true,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem(progressKey, JSON.stringify(savedProgress));
                
                progressIndicator.innerHTML = '✅ Completed';
                progressIndicator.className = 'progress-indicator completed';
                session.classList.add('completed');
                
                updateOverallProgress();
            }
        });
    });
    
    // Update overall progress display
    function updateOverallProgress() {
        const totalSessions = sessions.length;
        const completedSessions = Object.keys(savedProgress).length;
        const progressPercent = Math.round((completedSessions / totalSessions) * 100);
        
        // Update progress bar if it exists
        const progressBar = document.querySelector('.module-progress-bar');
        if (progressBar) {
            progressBar.style.width = progressPercent + '%';
            progressBar.textContent = `${completedSessions}/${totalSessions} Sessions Complete`;
        }
        
        // Show completion message
        if (progressPercent === 100) {
            showCompletionMessage();
        }
    }
    
    function showCompletionMessage() {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <h3>🎉 Module 1 Complete!</h3>
            <p>Congratulations! You've completed all sessions in TCP/IP Networking.</p>
            <a href="../assessment/quiz.html" class="cta-button">Take Final Assessment</a>
        `;
        
        const hero = document.querySelector('.module-hero .container');
        if (hero) {
            hero.appendChild(message);
        }
    }
    
    // Code syntax highlighting for examples
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        // Simple syntax highlighting
        let html = block.innerHTML;
        
        // Highlight comments
        html = html.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
        
        // Highlight strings
        html = html.replace(/(".*?")/g, '<span class="string">$1</span>');
        
        // Highlight keywords
        const keywords = ['include', 'void', 'int', 'String', 'if', 'else', 'for', 'while', 'return'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        block.innerHTML = html;
    });
    
    // Expandable code examples
    const codeExamples = document.querySelectorAll('.code-example');
    codeExamples.forEach(example => {
        const pre = example.querySelector('pre');
        if (pre && pre.scrollHeight > 200) {
            pre.style.maxHeight = '200px';
            pre.style.overflow = 'hidden';
            
            const expandBtn = document.createElement('button');
            expandBtn.textContent = 'Show More';
            expandBtn.className = 'expand-code-btn';
            expandBtn.addEventListener('click', function() {
                if (pre.style.maxHeight === '200px') {
                    pre.style.maxHeight = 'none';
                    this.textContent = 'Show Less';
                } else {
                    pre.style.maxHeight = '200px';
                    this.textContent = 'Show More';
                }
            });
            
            example.appendChild(expandBtn);
        }
    });
    
    // Print functionality for module content
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ Print Module';
    printBtn.className = 'print-btn';
    printBtn.style.position = 'fixed';
    printBtn.style.bottom = '20px';
    printBtn.style.right = '20px';
    printBtn.style.zIndex = '1000';
    printBtn.addEventListener('click', () => window.print());
    document.body.appendChild(printBtn);
    
    // Initialize progress display
    updateOverallProgress();
});

// Add CSS for progress indicators and syntax highlighting
const moduleStyles = `
.progress-indicator {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
    border-radius: 12px;
    font-weight: 600;
}

.progress-indicator.completed {
    background: #d4edda;
    color: #155724;
}

.progress-indicator.pending {
    background: #fff3cd;
    color: #856404;
}

.session-card.completed {
    border-left-color: #28a745;
}

.completion-message {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    margin-top: 2rem;
}

.comment { color: #6a737d; font-style: italic; }
.string { color: #032f62; }
.keyword { color: #d73a49; font-weight: bold; }

.expand-code-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
}

.print-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 25px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

@media print {
    .print-btn, .nav, .footer { display: none; }
    .session-card { break-inside: avoid; }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = moduleStyles;
document.head.appendChild(styleSheet);