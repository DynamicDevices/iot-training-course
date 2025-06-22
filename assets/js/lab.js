document.addEventListener('DOMContentLoaded', function() {
    const labId = 'lab1';
    const progressKey = `${labId}_progress`;
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Initialize checklist from saved progress
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        const checkId = `check_${index}`;
        if (savedProgress.checklist && savedProgress.checklist[checkId]) {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', function() {
            if (!savedProgress.checklist) savedProgress.checklist = {};
            savedProgress.checklist[checkId] = this.checked;
            localStorage.setItem(progressKey, JSON.stringify(savedProgress));
        });
    });
    
    // Code copy functionality
    const codeBlocks = document.querySelectorAll('.code-block pre');
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.className = 'copy-btn';
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                this.textContent = 'Copied!';
                setTimeout(() => this.textContent = 'Copy', 2000);
            });
        });
        
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(copyBtn);
    });
    
    // Exercise completion tracking
    const exercises = document.querySelectorAll('.exercise-card');
    exercises.forEach((exercise, index) => {
        const exerciseId = `exercise_${index + 1}`;
        const header = exercise.querySelector('.exercise-header');
        
        // Add completion button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-exercise-btn';
        
        if (savedProgress.exercises && savedProgress.exercises[exerciseId]) {
            completeBtn.textContent = '✅ Completed';
            completeBtn.classList.add('completed');
            exercise.classList.add('completed');
        } else {
            completeBtn.textContent = 'Mark Complete';
        }
        
        completeBtn.addEventListener('click', function() {
            if (!savedProgress.exercises) savedProgress.exercises = {};
            
            if (!savedProgress.exercises[exerciseId]) {
                savedProgress.exercises[exerciseId] = {
                    completed: true,
                    timestamp: new Date().toISOString()
                };
                
                this.textContent = '✅ Completed';
                this.classList.add('completed');
                exercise.classList.add('completed');
                
                localStorage.setItem(progressKey, JSON.stringify(savedProgress));
                updateProgressBar();
            }
        });
        
        header.appendChild(completeBtn);
    });
    
    // Progress bar
    function updateProgressBar() {
        const totalExercises = exercises.length;
        const completedExercises = savedProgress.exercises ? 
            Object.keys(savedProgress.exercises).length : 0;
        
        const progressPercent = Math.round((completedExercises / totalExercises) * 100);
        
        let progressBar = document.querySelector('.lab-progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'lab-progress-bar';
            progressBar.innerHTML = `
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progressPercent}%"></div>
                    <span class="progress-text">${completedExercises}/${totalExercises} Exercises Complete</span>
                </div>
            `;
            
            const hero = document.querySelector('.lab-hero .container');
            if (hero) {
                hero.appendChild(progressBar);
            }
        }
    }
    
    updateProgressBar();
});

// Lab submission functions
function saveProgress() {
    const labId = 'lab1';
    const progressKey = `${labId}_progress`;
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    progress.lastSaved = new Date().toISOString();
    localStorage.setItem(progressKey, JSON.stringify(progress));
    
    // Show save confirmation
    showNotification('Progress saved successfully!', 'success');
}

function submitLab() {
    const labId = 'lab1';
    const progressKey = `${labId}_progress`;
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Check if all requirements are met
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    
    if (!allChecked) {
        showNotification('Please complete all checklist items before submitting.', 'warning');
        return;
    }
    
    // Mark as submitted
    progress.submitted = true;
    progress.submissionTime = new Date().toISOString();
    localStorage.setItem(progressKey, JSON.stringify(progress));
    
    // Show submission confirmation
    showNotification('Lab submitted successfully! You will receive feedback within 24 hours.', 'success');
    
    // Disable submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.textContent = 'Submitted ✅';
        submitBtn.disabled = true;
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Add notification styles
const notificationStyles = `
.copy-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #007bff;
    color: white;
    border: none;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
}

.complete-exercise-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.complete-exercise-btn.completed {
    background: #6c757d;
    cursor: default;
}

.exercise-card.completed {
    border-left-color: #28a745;
    opacity: 0.8;
}

.lab-progress-bar {
    margin-top: 2rem;
    text-align: center;
}

.progress-container {
    background: rgba(255,255,255,0.2);
    border-radius: 20px;
    padding: 0.5rem;
    position: relative;
    max-width: 400px;
    margin: 0 auto;
}

.progress-bar {
    background: #28a745;
    height: 20px;
    border-radius: 15px;
    transition: width 0.3s ease;
}

.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.9rem;
    font-weight: 600;
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease;
}

.notification.success { background: #28a745; }
.notification.warning { background: #ffc107; color: #212529; }
.notification.info { background: #17a2b8; }

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);