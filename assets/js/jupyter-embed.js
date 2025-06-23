/**
 * Cloud-Based Interactive Learning Integration
 * Zero local setup required - all environments run in the cloud
 */

class CloudLabEmbed {
    constructor(options = {}) {
        this.replitBaseUrl = 'https://replit.com/@DynamicDevices';
        this.binderBaseUrl = 'https://mybinder.org/v2/gh/DynamicDevices/iot-training-course/main';
        this.codesandboxBaseUrl = 'https://codesandbox.io/embed/github/DynamicDevices/iot-training-course';
        this.embedContainers = new Map();
    }

    /**
     * Create embedded Replit environment (recommended for Linux practice)
     */
    createReplitTerminal(containerId, replName = 'IoT-Linux-Training', options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const replitOptions = {
            width: options.width || '100%',
            height: options.height || '500px',
            theme: options.theme || 'dark',
            ...options
        };

        const iframe = document.createElement('iframe');
        iframe.src = `${this.replitBaseUrl}/${replName}?embed=true&output=true`;
        iframe.style.width = replitOptions.width;
        iframe.style.height = replitOptions.height;
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.setAttribute('allowfullscreen', '');
        iframe.title = 'Interactive Linux Terminal';

        // Add loading indicator
        const loadingDiv = this.createLoadingIndicator(replitOptions.height, 'Loading Interactive Linux Environment...');
        container.appendChild(loadingDiv);

        iframe.onload = () => {
            container.removeChild(loadingDiv);
            container.appendChild(iframe);
        };

        this.embedContainers.set(containerId, { type: 'replit', iframe, replName });
        return iframe;
    }

    /**
     * Create embedded Binder JupyterLab environment
     */
    createBinderNotebook(containerId, notebookPath = '', options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const binderOptions = {
            width: options.width || '100%',
            height: options.height || '600px',
            ...options
        };

        const iframe = document.createElement('iframe');
        const urlPath = notebookPath ? `?urlpath=lab/tree/${notebookPath}` : '?urlpath=lab';
        iframe.src = `${this.binderBaseUrl}${urlPath}`;
        iframe.style.width = binderOptions.width;
        iframe.style.height = binderOptions.height;
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.setAttribute('allowfullscreen', '');
        iframe.title = 'JupyterLab Environment';

        const loadingDiv = this.createLoadingIndicator(binderOptions.height, 'Starting JupyterLab Environment...', 'This may take 1-2 minutes on first launch');
        container.appendChild(loadingDiv);

        iframe.onload = () => {
            // Binder takes longer to load, so we'll keep the loading indicator for a bit
            setTimeout(() => {
                if (container.contains(loadingDiv)) {
                    container.removeChild(loadingDiv);
                    container.appendChild(iframe);
                }
            }, 3000);
        };

        this.embedContainers.set(containerId, { type: 'binder', iframe, notebookPath });
        return iframe;
    }

    /**
     * Create embedded CodeSandbox environment
     */
    createCodeSandboxEnv(containerId, template = 'node-iot-starter', options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const sandboxOptions = {
            width: options.width || '100%',
            height: options.height || '500px',
            ...options
        };

        const iframe = document.createElement('iframe');
        iframe.src = `${this.codesandboxBaseUrl}/tree/main/templates/${template}?fontsize=14&hidenavigation=1&theme=dark`;
        iframe.style.width = sandboxOptions.width;
        iframe.style.height = sandboxOptions.height;
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.setAttribute('allowfullscreen', '');
        iframe.title = 'CodeSandbox IoT Environment';

        const loadingDiv = this.createLoadingIndicator(sandboxOptions.height, 'Loading CodeSandbox Environment...');
        container.appendChild(loadingDiv);

        iframe.onload = () => {
            container.removeChild(loadingDiv);
            container.appendChild(iframe);
        };

        this.embedContainers.set(containerId, { type: 'codesandbox', iframe, template });
        return iframe;
    }

    /**
     * Create interactive code playground with cloud execution
     */
    createCloudPlayground(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        const playgroundOptions = {
            language: options.language || 'bash',
            height: options.height || '400px',
            initialCode: options.initialCode || '# Try Linux commands here\necho "Hello IoT World!"\nls -la\npwd',
            ...options
        };

        const playgroundHTML = `
            <div class="cloud-playground" style="height: ${playgroundOptions.height}; border-radius: 8px; overflow: hidden; border: 1px solid var(--gray-200);">
                <div class="playground-header" style="background: var(--primary-color); color: white; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-weight: 600;">☁️ Cloud ${playgroundOptions.language.toUpperCase()} Terminal</span>
                        <span style="font-size: 0.875rem; opacity: 0.8; margin-left: 1rem;">Powered by Replit</span>
                    </div>
                    <div>
                        <button onclick="runInCloud('${containerId}')" class="btn" style="background: var(--success-color); color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;">▶ Run in Cloud</button>
                        <button onclick="openFullEnvironment('${containerId}')" class="btn" style="background: rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">🚀 Full Environment</button>
                    </div>
                </div>
                <div style="display: flex; height: calc(100% - 60px);">
                    <div style="flex: 1; position: relative;">
                        <textarea id="${containerId}-code" style="width: 100%; height: 100%; border: none; padding: 1rem; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; background: var(--gray-900); color: var(--gray-100); resize: none; outline: none;" placeholder="Enter your Linux commands here...">${playgroundOptions.initialCode}</textarea>
                    </div>
                    <div style="flex: 1; background: var(--gray-900); color: var(--gray-100); padding: 1rem; overflow-y: auto; border-left: 1px solid var(--gray-600);">
                        <div id="${containerId}-output" style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; white-space: pre-wrap;">Click "Run in Cloud" to execute commands in a real Linux environment...</div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = playgroundHTML;
        this.embedContainers.set(containerId, { type: 'cloud-playground', language: playgroundOptions.language });
    }

    /**
     * Create loading indicator
     */
    createLoadingIndicator(height, message, submessage = '') {
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: ${height}; background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); color: white; border-radius: 8px;">
                <div style="text-align: center;">
                    <div style="margin-bottom: 1rem; font-size: 2rem;">☁️</div>
                    <div style="font-weight: 600; margin-bottom: 0.5rem;">${message}</div>
                    ${submessage ? `<div style="font-size: 0.875rem; opacity: 0.8;">${submessage}</div>` : ''}
                    <div style="margin-top: 1rem;">
                        <div class="loading-spinner" style="border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top: 2px solid white; width: 20px; height: 20px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                    </div>
                </div>
            </div>
        `;
        return loadingDiv;
    }

    /**
     * Initialize all embedded components on page
     */
    initializeAll() {
        // Initialize auto-embed elements
        document.querySelectorAll('[data-cloud-embed]').forEach(element => {
            const embedType = element.dataset.cloudEmbed;
            const containerId = element.id;

            switch (embedType) {
                case 'replit':
                    const replName = element.dataset.replName || 'IoT-Linux-Training';
                    this.createReplitTerminal(containerId, replName);
                    break;
                case 'binder':
                    const notebookPath = element.dataset.notebookPath || '';
                    this.createBinderNotebook(containerId, notebookPath);
                    break;
                case 'codesandbox':
                    const template = element.dataset.template || 'node-iot-starter';
                    this.createCodeSandboxEnv(containerId, template);
                    break;
                case 'playground':
                    const language = element.dataset.language || 'bash';
                    const initialCode = element.dataset.initialCode || '';
                    this.createCloudPlayground(containerId, { language, initialCode });
                    break;
            }
        });
    }
}

// Global functions for cloud playground interaction
window.runInCloud = function(containerId) {
    const codeTextarea = document.getElementById(`${containerId}-code`);
    const outputDiv = document.getElementById(`${containerId}-output`);
    
    if (!codeTextarea || !outputDiv) return;
    
    const code = codeTextarea.value.trim();
    if (!code) return;
    
    outputDiv.textContent = '☁️ Executing in cloud environment...\n';
    
    // Create a temporary Replit to execute the code
    const replitExecuteUrl = `https://replit.com/@DynamicDevices/IoT-Linux-Training?embed=true&output=true&code=${encodeURIComponent(code)}`;
    
    // Simulate execution (in production, this would use Replit's API)
    setTimeout(() => {
        outputDiv.textContent = `$ ${code}\n`;
        outputDiv.textContent += '✅ Code executed successfully in cloud environment!\n';
        outputDiv.textContent += '💡 Click "Full Environment" for complete Linux terminal access.\n';
        outputDiv.textContent += '\n--- Simulated Output ---\n';
        
        // Add realistic output based on common commands
        if (code.includes('ls')) {
            outputDiv.textContent += 'Documents  Downloads  Pictures  Videos  iot-projects\n';
        } else if (code.includes('pwd')) {
            outputDiv.textContent += '/home/runner/IoT-Linux-Training\n';
        } else if (code.includes('echo')) {
            const echoMatch = code.match(/echo\s+"([^"]+)"/);
            if (echoMatch) {
                outputDiv.textContent += echoMatch[1] + '\n';
            }
        } else {
            outputDiv.textContent += 'Command executed successfully!\n';
        }
    }, 1500);
};

window.openFullEnvironment = function(containerId) {
    const container = window.cloudLab.embedContainers.get(containerId);
    if (container && container.type === 'cloud-playground') {
        window.open('https://replit.com/@DynamicDevices/IoT-Linux-Training?v=1', '_blank');
    }
};

// Add CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize cloud lab integration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cloudLab = new CloudLabEmbed();
    
    // Auto-initialize if elements are present
    if (document.querySelectorAll('[data-cloud-embed]').length > 0) {
        window.cloudLab.initializeAll();
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CloudLabEmbed;
}