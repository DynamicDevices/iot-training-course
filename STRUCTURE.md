# TCP/IP Training for Embedded Engineers - GitHub Repository

## Repository Structure

```
tcp-ip-training/
├── README.md
├── _config.yml
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   └── components.css
│   ├── js/
│   │   ├── main.js
│   │   ├── network-simulator.js
│   │   └── interactive-tools.js
│   └── images/
│       ├── network-diagrams/
│       └── screenshots/
├── modules/
│   ├── fundamentals.html
│   ├── layers.html
│   ├── addressing.html
│   ├── protocols.html
│   └── troubleshooting.html
├── labs/
│   ├── index.html
│   ├── lab1-setup.html
│   ├── lab2-packet-analysis.html
│   ├── lab3-mqtt.html
│   ├── lab4-troubleshooting.html
│   └── lab5-performance.html
├── tools/
│   ├── index.html
│   ├── network-calculator.html
│   ├── packet-simulator.html
│   └── troubleshooting-guide.html
├── reference/
│   ├── index.html
│   ├── commands.html
│   ├── protocols.html
│   └── resources.html
└── code-examples/
    ├── esp32/
    │   ├── basic-wifi/
    │   ├── http-client/
    │   ├── mqtt-publisher/
    │   └── network-diagnostics/
    └── arduino/
        └── ethernet-examples/
```

## File Contents

### README.md
```markdown
# Dynamic Devices IoT Training Course
## Module 1: TCP/IP Networking for Embedded Engineers

A comprehensive embedded systems training programme developed by **Dynamic Devices Ltd** for graduate and junior engineers entering the IoT development field.

## 🎯 About This Training Programme

The **Dynamic Devices IoT Training Course** is a complete 17-day programme covering all aspects of modern IoT development, from network protocols through to security implementation. This repository contains **Module 1: TCP/IP Networking** - the essential foundation for all IoT projects.

### Complete Course Modules

| Module | Topic | Duration | Status |
|--------|-------|----------|---------|
| **Module 1** | **TCP/IP Networking** | **3 days** | **✅ Available** |
| Module 2 | Version Control & Git | 2 days | 🔄 Coming Soon |
| Module 3 | Continuous Integration | 2 days | 🔄 Coming Soon |
| Module 4 | Virtual Machines | 2 days | 🔄 Coming Soon |
| Module 5 | Docker & Containers | 2 days | 🔄 Coming Soon |
| Module 6 | Linux for Embedded | 3 days | 🔄 Coming Soon |
| Module 7 | IoT Security | 3 days | 🔄 Coming Soon |

## 🌐 Module 1: TCP/IP Networking

### Learning Objectives

- **Master network protocol fundamentals** for embedded IoT systems
- **Configure and troubleshoot** network interfaces, DHCP, and static addressing  
- **Implement reliable communication** using TCP, UDP, HTTP, and MQTT protocols
- **Use professional tools** like Wireshark for network analysis and debugging
- **Apply systematic troubleshooting** methodologies for connectivity issues
- **Design secure, scalable** network architectures for IoT deployments

## 🚀 Quick Start

### Online Training Platform
Access the interactive training modules: **https://dynamicdevices.github.io/iot-training**

### Local Development Setup
```bash
git clone https://github.com/dynamicdevices/iot-training.git
cd iot-training
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

## 📚 Module 1 Structure

### Day 1: Network Fundamentals & Infrastructure
1. **Internet History & Models** - ARPANET to modern IoT, OSI vs TCP/IP
2. **Physical & Data Link Layers** - MAC addresses, ARP, DHCP configuration
3. **Network Troubleshooting** - Wireshark fundamentals, diagnostic methodology

### Day 2: Network Layer & Routing  
4. **IP Addressing & Subnetting** - IPv4 classes, CIDR, private networks
5. **Gateways & Inter-network Routing** - Multi-hop communication, traceroute
6. **Network Testing & Validation** - ICMP, ping analysis, connectivity verification

### Day 3: Transport & Application Protocols
7. **UDP vs TCP Protocols** - Connection models, reliability, performance trade-offs
8. **HTTP & Web Services** - REST APIs, client implementation, error handling
9. **Essential Network Services** - DNS resolution, NTP synchronisation, MQTT messaging

### Hands-On Laboratory Exercises
1. **Network Configuration & Analysis** - ESP32 setup, Wireshark capture
2. **DHCP & Address Resolution** - Dynamic addressing, ARP investigation
3. **Protocol Implementation** - TCP vs UDP comparison on embedded hardware
4. **HTTP Client Development** - REST API communication with error handling
5. **DNS & NTP Services** - Domain resolution and network time synchronisation
6. **Comprehensive Diagnostics** - Systematic network troubleshooting

### Interactive Learning Tools
- **Subnet Calculator** - Network planning and address allocation
- **Protocol Stack Simulator** - Visual packet encapsulation demonstration
- **Network Diagnostic Tool** - Step-by-step troubleshooting guide
- **Command Reference** - Essential networking commands and usage

## 🛠️ Prerequisites

### Hardware Requirements
- **ESP32 development boards** (minimum 3 units for full lab experience)
- **Computer with admin access** for Wireshark and network configuration
- **Ethernet cables and managed switch** (optional for advanced exercises)
- **Various sensors** (temperature, humidity) for IoT demonstrations

### Software Requirements
- **Arduino IDE or PlatformIO** for embedded development
- **Wireshark** for professional network analysis (free download)
- **Modern web browser** with developer tools enabled
- **Terminal/command line access** for network diagnostics

### Technical Background
- **C/C++ programming** experience with embedded systems
- **Digital systems fundamentals** (binary, hexadecimal, logic)
- **Basic electronics knowledge** (voltage, current, digital signals)
- **Embedded development experience** with microcontrollers

## 📖 Training Methodology

### Theory-Practice Integration
1. **Interactive Modules** - Comprehensive theoretical foundation
2. **Hands-On Labs** - Real hardware implementation and testing
3. **Professional Tools** - Industry-standard analysis and debugging
4. **Real-World Projects** - Complete IoT system development
5. **Continuous Assessment** - Practical skills validation

### Industry-Focused Approach
- **Embedded-specific examples** - ESP32, Arduino, industrial applications
- **IoT protocol emphasis** - MQTT, CoAP, HTTP for connected devices
- **Professional practices** - Systematic debugging, documentation, testing
- **Scalability considerations** - From prototype to production deployment
- **Security awareness** - Network security implications for IoT systems

## 🏢 About Dynamic Devices Ltd

Dynamic Devices Ltd has been developing embedded systems and IoT solutions since 2004. Our team combines deep technical expertise with practical industry experience across industrial automation, medical devices, smart agriculture, and consumer IoT products.

### Our Expertise
- **20+ years** embedded systems development experience
- **Extensive IoT deployments** across multiple industry sectors
- **Open source contributors** to embedded Linux and RTOS projects
- **Professional training** for engineering teams and graduate programmes
- **End-to-end solutions** from concept through volume manufacturing

### Industry Partnerships
- **Active PCB Solutions** - Electronics manufacturing services
- **Balena** - IoT deployment and management platforms
- **INST Project** - Satellite-enabled emergency response systems
- **Leading semiconductor partners** - ST Micro, Semtech, RAK Wireless

## 🤝 Contributing to the Training Programme

We welcome contributions to improve and expand this training content!

### Ways to Contribute
- **Report issues** or suggest improvements to existing modules
- **Add practical exercises** or real-world case studies
- **Update code examples** for new platforms or library versions
- **Translate content** to other languages for wider accessibility
- **Share experience** from implementing these techniques in production

### Development Process
- **Fork the repository** and create feature branches for contributions
- **Test thoroughly** - all code examples must work on specified hardware
- **Document changes** - update relevant course materials and references
- **Follow standards** - maintain consistent coding style and documentation format

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 📄 Licensing & Usage

This training programme is licensed under **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**.

### You Are Free To:
- **Share** — copy and redistribute the material in any medium or format

### Under These Terms:
- **Attribution** — You must give appropriate credit to Dynamic Devices Ltd
- **NonCommercial** — You may not use the material for commercial purposes  
- **NoDerivatives** — You may not remix, transform, or build upon the material

### Commercial Licensing
For commercial use, corporate training licences, or derivative works, contact **info@dynamicdevices.co.uk**

## 📞 Training Support & Services

### Training Delivery Options
- **Public Workshops** - Scheduled open-enrolment courses
- **Corporate Training** - Customised on-site or virtual delivery  
- **Mentorship Programmes** - Ongoing support for graduate engineers
- **Consulting Services** - Custom embedded and IoT solution development

### Contact Information
**Dynamic Devices Ltd**  
1st Floor, The Tapestry  
68-76 Kempston Street  
Liverpool L3 8HL, United Kingdom

📧 **Email:** info@dynamicdevices.co.uk  
📞 **Phone:** +44 (0)151 324 1374  
🌐 **Website:** https://www.dynamicdevices.co.uk

### Technical Support
- **Training Questions:** Include module number and specific topic
- **Code Issues:** Provide complete error messages and hardware details
- **Lab Problems:** Include Wireshark captures and network configuration
- **General Inquiries:** Response within 1 business day

### Community Resources
- **📚 Documentation:** Comprehensive guides and references
- **🐛 Issue Tracking:** Report bugs and request enhancements
- **💬 Discussions:** Community Q&A and knowledge sharing
- **📧 Mailing List:** Updates on new modules and training opportunities

---

## 🎓 Next Steps

### Complete Module 1
Master TCP/IP networking fundamentals through our comprehensive 3-day programme

### Prepare for Module 2
Git and version control training will build on the collaborative development practices introduced in Module 1

### Corporate Training
Contact us for customised delivery options tailored to your team's specific needs

---

⭐ **If this training programme advances your IoT development skills, please star the repository!**

*Developed with expertise and passion by the embedded engineering team at Dynamic Devices Ltd*  
*Building the next generation of IoT engineers through practical, industry-focused training*
```

### _config.yml (Jekyll Configuration)
```yaml
title: "TCP/IP Training for Embedded Engineers"
description: "Interactive training course for networking in IoT and embedded systems"
baseurl: "/tcp-ip-training"
url: "https://yourusername.github.io"

markdown: kramdown
highlighter: rouge
theme: minima

plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

exclude:
  - README.md
  - LICENSE
  - CONTRIBUTING.md

collections:
  modules:
    output: true
    permalink: /:collection/:name/
  labs:
    output: true
    permalink: /:collection/:name/
```

### index.html (Main Landing Page)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCP/IP Training for Embedded Engineers - Dynamic Devices Ltd</title>
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/components.css">
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    <meta name="description" content="Comprehensive TCP/IP networking training for embedded and IoT engineers by Dynamic Devices Ltd">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2>🌐 TCP/IP Training</h2>
                <span class="company-name">Dynamic Devices Ltd</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#overview">Overview</a></li>
                <li><a href="modules/">Modules</a></li>
                <li><a href="labs/">Labs</a></li>
                <li><a href="tools/">Tools</a></li>
                <li><a href="reference/">Reference</a></li>
            </ul>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <header class="hero">
        <div class="hero-content">
            <h1>TCP/IP Networking for Embedded Engineers</h1>
            <p class="hero-subtitle">Master network protocols for IoT and embedded systems development</p>
            <p class="hero-attribution">Professional training by <strong>Dynamic Devices Ltd</strong></p>
            <div class="hero-buttons">
                <a href="modules/" class="btn btn-primary">Start Learning</a>
                <a href="labs/" class="btn btn-secondary">Hands-On Labs</a>
            </div>
        </div>
        <div class="hero-animation">
            <div class="network-nodes">
                <div class="node esp32">ESP32</div>
                <div class="node router">Gateway</div>
                <div class="node cloud">Cloud</div>
                <div class="connection" data-from="esp32" data-to="router"></div>
                <div class="connection" data-from="router" data-to="cloud"></div>
            </div>
        </div>
    </header>

    <main>
        <section id="overview" class="section">
            <div class="container">
                <h2>Course Overview</h2>
                <div class="overview-grid">
                    <div class="overview-card">
                        <div class="card-icon">🎯</div>
                        <h3>Learning Objectives</h3>
                        <ul>
                            <li>Master TCP/IP protocol stack layers</li>
                            <li>Configure DHCP and static IP addressing</li>
                            <li>Implement HTTP, MQTT, DNS, and NTP services</li>
                            <li>Use Wireshark for network analysis</li>
                            <li>Troubleshoot connectivity issues systematically</li>
                            <li>Design secure, reliable IoT networks</li>
                        </ul>
                    </div>
                    <div class="overview-card">
                        <div class="card-icon">⏱️</div>
                        <h3>Duration & Format</h3>
                        <p><strong>3 Days</strong> of comprehensive training</p>
                        <p>18 hours of content with hands-on labs</p>
                        <p>Self-paced online modules available</p>
                        <p>Interactive tools and real-world projects</p>
                        <p>Corporate training programmes available</p>
                    </div>
                    <div class="overview-card">
                        <div class="card-icon">🛠️</div>
                        <h3>Prerequisites</h3>
                        <ul>
                            <li>Basic C/C++ programming knowledge</li>
                            <li>ESP32 development boards (3+ units)</li>
                            <li>Arduino IDE or PlatformIO</li>
                            <li>Computer with admin access</li>
                            <li>Embedded systems development experience</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="section modules-preview">
            <div class="container">
                <h2>Training Modules</h2>
                <div class="modules-grid">
                    <a href="modules/fundamentals.html" class="module-card">
                        <div class="module-number">01</div>
                        <h3>Internet History & Models</h3>
                        <p>ARPANET origins, OSI vs TCP/IP models, protocol encapsulation and packet analysis</p>
                        <div class="module-duration">90 min</div>
                    </a>
                    <a href="modules/datalink.html" class="module-card">
                        <div class="module-number">02</div>
                        <h3>Physical & Data Link</h3>
                        <p>MAC addresses, ARP resolution, DHCP vs static configuration</p>
                        <div class="module-duration">90 min</div>
                    </a>
                    <a href="modules/addressing.html" class="module-card">
                        <div class="module-number">03</div>
                        <h3>IP Addressing & Routing</h3>
                        <p>IPv4 classes, subnetting, CIDR, gateways, and network troubleshooting</p>
                        <div class="module-duration">120 min</div>
                    </a>
                    <a href="modules/transport.html" class="module-card">
                        <div class="module-number">04</div>
                        <h3>UDP & TCP Protocols</h3>
                        <p>Connection-oriented vs connectionless, reliability, socket programming</p>
                        <div class="module-duration">180 min</div>
                    </a>
                    <a href="modules/application.html" class="module-card">
                        <div class="module-number">05</div>
                        <h3>Application Protocols</h3>
                        <p>HTTP, DNS, NTP, MQTT and other essential network services</p>
                        <div class="module-duration">165 min</div>
                    </a>
                    <a href="modules/troubleshooting.html" class="module-card">
                        <div class="module-number">06</div>
                        <h3>Network Troubleshooting</h3>
                        <p>Wireshark analysis, systematic debugging, security considerations</p>
                        <div class="module-duration">90 min</div>
                    </a>
                </div>
                <div class="section-footer">
                    <a href="modules/" class="btn btn-outline">View All Modules</a>
                </div>
            </div>
        </section>

        <section class="section labs-preview">
            <div class="container">
                <h2>Hands-On Laboratories</h2>
                <div class="labs-grid">
                    <div class="lab-card">
                        <div class="lab-icon">🔧</div>
                        <h3>Lab 1: Network Configuration</h3>
                        <p>Configure ESP32 with static IP and DHCP, analyze with Wireshark</p>
                        <div class="lab-tags">
                            <span class="tag">ESP32</span>
                            <span class="tag">DHCP</span>
                            <span class="tag">Wireshark</span>
                        </div>
                    </div>
                    <div class="lab-card">
                        <div class="lab-icon">🔍</div>
                        <h3>Lab 2: Address Resolution</h3>
                        <p>Investigate DHCP negotiation and ARP table management</p>
                        <div class="lab-tags">
                            <span class="tag">ARP</span>
                            <span class="tag">Analysis</span>
                        </div>
                    </div>
                    <div class="lab-card">
                        <div class="lab-icon">⚖️</div>
                        <h3>Lab 3: TCP vs UDP</h3>
                        <p>Compare protocol characteristics with embedded implementations</p>
                        <div class="lab-tags">
                            <span class="tag">TCP</span>
                            <span class="tag">UDP</span>
                            <span class="tag">Sockets</span>
                        </div>
                    </div>
                    <div class="lab-card">
                        <div class="lab-icon">🌐</div>
                        <h3>Lab 4: HTTP Client</h3>
                        <p>Implement REST API communication with error handling</p>
                        <div class="lab-tags">
                            <span class="tag">HTTP</span>
                            <span class="tag">REST</span>
                            <span class="tag">JSON</span>
                        </div>
                    </div>
                    <div class="lab-card">
                        <div class="lab-icon">🕐</div>
                        <h3>Lab 5: DNS & NTP</h3>
                        <p>Domain name resolution and network time synchronization</p>
                        <div class="lab-tags">
                            <span class="tag">DNS</span>
                            <span class="tag">NTP</span>
                            <span class="tag">Services</span>
                        </div>
                    </div>
                    <div class="lab-card">
                        <div class="lab-icon">🔧</div>
                        <h3>Lab 6: Network Diagnosis</h3>
                        <p>Systematic troubleshooting of network connectivity problems</p>
                        <div class="lab-tags">
                            <span class="tag">Debug</span>
                            <span class="tag">Tools</span>
                            <span class="tag">Analysis</span>
                        </div>
                    </div>
                </div>
                <div class="section-footer">
                    <a href="labs/" class="btn btn-outline">Start Labs</a>
                </div>
            </div>
        </section>

        <section class="section tools-preview">
            <div class="container">
                <h2>Interactive Tools & Resources</h2>
                <div class="tools-grid">
                    <a href="tools/network-calculator.html" class="tool-card">
                        <div class="tool-icon">🧮</div>
                        <h3>Subnet Calculator</h3>
                        <p>Calculate network ranges, host counts, and CIDR notation</p>
                    </a>
                    <a href="tools/packet-simulator.html" class="tool-card">
                        <div class="tool-icon">📦</div>
                        <h3>Protocol Stack Simulator</h3>
                        <p>Visualize packet encapsulation through TCP/IP layers</p>
                    </a>
                    <a href="tools/troubleshooting-guide.html" class="tool-card">
                        <div class="tool-icon">🔧</div>
                        <h3>Network Diagnostics</h3>
                        <p>Step-by-step troubleshooting for connectivity issues</p>
                    </a>
                </div>
            </div>
        </section>

        <section class="section company-info">
            <div class="container">
                <h2>About Dynamic Devices Ltd</h2>
                <div class="company-content">
                    <div class="company-description">
                        <p>Dynamic Devices Ltd specializes in embedded systems development and IoT solutions. This comprehensive training programme reflects our practical experience developing networked embedded systems for industrial and commercial applications.</p>
                        <p>Our team has delivered embedded networking solutions across industries including industrial automation, medical devices, smart agriculture, and consumer IoT products.</p>
                    </div>
                    <div class="company-services">
                        <h3>Our Services</h3>
                        <ul>
                            <li>Corporate training programmes</li>
                            <li>Embedded systems development</li>
                            <li>IoT solution consulting</li>
                            <li>Network architecture design</li>
                            <li>Protocol implementation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="section getting-started">
            <div class="container">
                <h2>Ready to Master Network Programming?</h2>
                <div class="getting-started-content">
                    <div class="steps">
                        <div class="step">
                            <div class="step-number">1</div>
                            <h3>Prepare Hardware</h3>
                            <p>Get ESP32 boards and install development environment</p>
                        </div>
                        <div class="step">
                            <div class="step-number">2</div>
                            <h3>Learn Fundamentals</h3>
                            <p>Master protocol layers and network models</p>
                        </div>
                        <div class="step">
                            <div class="step-number">3</div>
                            <h3>Hands-On Practice</h3>
                            <p>Build real networking applications</p>
                        </div>
                        <div class="step">
                            <div class="step-number">4</div>
                            <h3>Apply Knowledge</h3>
                            <p>Develop complete IoT solutions</p>
                        </div>
                    </div>
                    <div class="cta-buttons">
                        <a href="modules/" class="btn btn-primary">Begin Training</a>
                        <a href="https://github.com/dynamicdevices/tcp-ip-training" class="btn btn-secondary">View on GitHub</a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Training Course</h3>
                    <ul>
                        <li><a href="modules/">Training Modules</a></li>
                        <li><a href="labs/">Hands-On Labs</a></li>
                        <li><a href="tools/">Interactive Tools</a></li>
                        <li><a href="reference/">Reference Materials</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="code-examples/">Code Examples</a></li>
                        <li><a href="reference/commands.html">Command Reference</a></li>
                        <li><a href="reference/protocols.html">Protocol Specifications</a></li>
                        <li><a href="reference/rfcs.html">RFC Documents</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Dynamic Devices Ltd</h3>
                    <ul>
                        <li><a href="mailto:info@dynamicdevices.co.uk">Contact Us</a></li>
                        <li><a href="https://github.com/dynamicdevices/tcp-ip-training">GitHub Repository</a></li>
                        <li><a href="https://github.com/dynamicdevices/tcp-ip-training/issues">Report Issues</a></li>
                        <li><a href="https://github.com/dynamicdevices/tcp-ip-training/discussions">Discussions</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Dynamic Devices Ltd. Licensed under Creative Commons CC BY-NC-ND 4.0.</p>
                <p>Professional embedded systems training • Email: <a href="mailto:info@dynamicdevices.co.uk">info@dynamicdevices.co.uk</a></p>
            </div>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>
```

### assets/css/main.css
```css
/* Dynamic Devices IoT Training Course - Brand Colors & Styling */

/* Brand Color Palette */
:root {
    /* Primary Brand Colors */
    --dd-primary: #1e3a8a;           /* Deep blue - primary brand */
    --dd-secondary: #3b82f6;         /* Bright blue - secondary */
    --dd-accent: #06b6d4;            /* Cyan - technical accent */
    --dd-success: #10b981;           /* Green - success states */
    --dd-warning: #f59e0b;           /* Amber - warnings */
    --dd-error: #ef4444;             /* Red - errors */
    
    /* Neutral Colors */
    --dd-dark: #1f2937;              /* Dark gray - text */
    --dd-medium: #6b7280;            /* Medium gray - secondary text */
    --dd-light: #f3f4f6;             /* Light gray - backgrounds */
    --dd-white: #ffffff;             /* Pure white */
    
    /* Technical Colors */
    --dd-code: #374151;              /* Code backgrounds */
    --dd-terminal: #111827;          /* Terminal/console */
    --dd-iot: #8b5cf6;               /* IoT/embedded purple */
    
    /* Training-Specific Colors */
    --dd-module: #3b82f6;            /* Module cards */
    --dd-lab: #10b981;               /* Lab exercises */
    --dd-tool: #f59e0b;              /* Interactive tools */
    --dd-reference: #8b5cf6;         /* Reference materials */
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: var(--dd-dark);
    background-color: var(--dd-white);
    font-size: 16px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.25;
    color: var(--dd-dark);
}

h1 {
    font-size: 2.5rem;
    font-weight: 700;
}

h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

/* Navigation */
.navbar {
    background: var(--dd-primary);
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(30, 58, 138, 0.15);
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo h2 {
    color: var(--dd-white);
    font-size: 1.5rem;
    font-weight: 700;
}

.company-name {
    font-size: 0.875rem;
    color: var(--dd-accent);
    font-weight: 500;
    opacity: 0.9;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    color: var(--dd-white);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 6px;
}

.nav-menu a:hover {
    background: var(--dd-secondary);
    color: var(--dd-white);
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, var(--dd-primary) 0%, var(--dd-secondary) 100%);
    color: var(--dd-white);
    padding: 140px 0 100px;
    margin-top: 70px;
    min-height: 85vh;
    display: flex;
    align-items: center;
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.hero h1 {
    color: var(--dd-white);
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    opacity: 0.95;
    color: var(--dd-white);
}

.hero-attribution {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--dd-accent);
    font-weight: 500;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 28px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    font-size: 1rem;
    cursor: pointer;
}

.btn-primary {
    background: var(--dd-white);
    color: var(--dd-primary);
    border-color: var(--dd-white);
}

.btn-primary:hover {
    background: var(--dd-accent);
    color: var(--dd-white);
    border-color: var(--dd-accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.3);
}

.btn-secondary {
    background: transparent;
    color: var(--dd-white);
    border-color: var(--dd-white);
}

.btn-secondary:hover {
    background: var(--dd-white);
    color: var(--dd-primary);
}

.btn-outline {
    background: transparent;
    color: var(--dd-primary);
    border-color: var(--dd-primary);
}

.btn-outline:hover {
    background: var(--dd-primary);
    color: var(--dd-white);
}

/* Hero Animation */
.hero-animation {
    position: relative;
    height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.network-nodes {
    position: relative;
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.node {
    background: rgba(255,255,255,0.15);
    border: 2px solid var(--dd-accent);
    border-radius: 12px;
    padding: 20px 24px;
    font-weight: 600;
    backdrop-filter: blur(10px);
    animation: nodeFloat 3s ease-in-out infinite;
    color: var(--dd-white);
    font-size: 0.9rem;
}

.node:nth-child(2) {
    animation-delay: 1s;
}

.node:nth-child(3) {
    animation-delay: 2s;
}

@keyframes nodeFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-10px) scale(1.05); }
}

/* Sections */
.section {
    padding: 100px 0;
}

.section:nth-child(even) {
    background: var(--dd-light);
}

.section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--dd-dark);
    position: relative;
}

.section h2::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--dd-secondary), var(--dd-accent));
    border-radius: 2px;
}

/* Overview Grid */
.overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.overview-card {
    background: var(--dd-white);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(30, 58, 138, 0.08);
    transition: all 0.3s ease;
    border: 1px solid var(--dd-light);
}

.overview-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
}

.card-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
}

.overview-card h3 {
    color: var(--dd-primary);
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
}

.overview-card ul {
    list-style: none;
    padding-left: 0;
}

.overview-card li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 2rem;
}

.overview-card li:before {
    content: "✓";
    color: var(--dd-success);
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 1.1rem;
}

/* Module Cards */
.modules-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.module-card {
    background: var(--dd-white);
    border-radius: 12px;
    padding: 2rem;
    text-decoration: none;
    color: var(--dd-dark);
    box-shadow: 0 8px 30px rgba(59, 130, 246, 0.08);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--dd-light);
}

.module-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
    border-color: var(--dd-module);
}

.module-number {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: var(--dd-module);
    color: var(--dd-white);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
}

.module-card h3 {
    color: var(--dd-primary);
    margin-bottom: 1rem;
    margin-top: 0.5rem;
    font-size: 1.3rem;
}

.module-duration {
    color: var(--dd-medium);
    font-size: 0.9rem;
    margin-top: 1rem;
    font-weight: 500;
}

/* Lab Cards */
.labs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.lab-card {
    background: var(--dd-white);
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(16, 185, 129, 0.08);
    transition: all 0.3s ease;
    border: 1px solid var(--dd-light);
}

.lab-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(16, 185, 129, 0.15);
    border-color: var(--dd-lab);
}

.lab-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.lab-card h3 {
    color: var(--dd-primary);
    margin-bottom: 0.75rem;
    font-size: 1.2rem;
}

.lab-tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.tag {
    background: var(--dd-light);
    color: var(--dd-primary);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border: 1px solid var(--dd-secondary);
}

/* Tools Grid */
.tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.tool-card {
    background: var(--dd-white);
    border-radius: 12px;
    padding: 2rem;
    text-decoration: none;
    color: var(--dd-dark);
    box-shadow: 0 8px 30px rgba(245, 158, 11, 0.08);
    transition: all 0.3s ease;
    text-align: center;
    border: 1px solid var(--dd-light);
}

.tool-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15);
    border-color: var(--dd-tool);
}

.tool-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.tool-card h3 {
    color: var(--dd-primary);
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

/* Company Info Section */
.company-info {
    background: var(--dd-primary);
    color: var(--dd-white);
}

.company-info h2 {
    color: var(--dd-white);
}

.company-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: start;
}

.company-description {
    font-size: 1.1rem;
    line-height: 1.7;
}

.company-services h3 {
    color: var(--dd-accent);
    margin-bottom: 1rem;
}

.company-services ul {
    list-style: none;
}

.company-services li {
    padding: 0.5rem 0;
    position: relative;
    padding-left: 1.5rem;
}

.company-services li:before {
    content: "→";
    color: var(--dd-accent);
    font-weight: bold;
    position: absolute;
    left: 0;
}

/* Getting Started */
.getting-started {
    background: var(--dd-dark);
    color: var(--dd-white);
}

.getting-started h2 {
    color: var(--dd-white);
}

.getting-started-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: center;
}

.steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}

.step {
    text-align: center;
}

.step-number {
    background: var(--dd-accent);
    color: var(--dd-white);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 1rem;
    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.3);
}

.step h3 {
    margin-bottom: 0.5rem;
    color: var(--dd-white);
}

.cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

/* Section Footer */
.section-footer {
    text-align: center;
    margin-top: 3rem;
}

/* Footer */
.footer {
    background: var(--dd-dark);
    color: var(--dd-white);
    padding: 4rem 0 2rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
    margin-bottom: 3rem;
}

.footer-section h3 {
    color: var(--dd-accent);
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.footer-section ul {
    list-style: none;
}

.footer-section li {
    margin-bottom: 0.75rem;
}

.footer-section a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-section a:hover {
    color: var(--dd-accent);
}

.footer-bottom {
    border-top: 1px solid #374151;
    padding-top: 2rem;
    text-align: center;
    color: #9ca3af;
    line-height: 1.6;
}

.footer-bottom a {
    color: var(--dd-accent);
    text-decoration: none;
}

.footer-bottom a:hover {
    text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
    }
    
    .company-content,
    .getting-started-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .steps {
        grid-template-columns: 1fr;
    }
    
    .hero-buttons {
        justify-content: center;
    }
    
    .overview-grid,
    .modules-grid,
    .labs-grid,
    .tools-grid {
        grid-template-columns: 1fr;
    }
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.module-card,
.lab-card,
.tool-card,
.overview-card {
    animation: fadeInUp 0.6s ease forwards;
}

/* Training-specific styles */
.training-highlight {
    background: linear-gradient(135deg, var(--dd-accent), var(--dd-secondary));
    color: var(--dd-white);
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-weight: 600;
}

.module-status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
}

.status-available {
    color: var(--dd-success);
}

.status-coming {
    color: var(--dd-warning);
}

/* Code styling */
code {
    background: var(--dd-light);
    color: var(--dd-code);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.9em;
}

pre {
    background: var(--dd-terminal);
    color: var(--dd-white);
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1rem 0;
}

pre code {
    background: none;
    color: inherit;
    padding: 0;
}
```

### assets/js/main.js
```javascript
// Main JavaScript for TCP/IP Training Website

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initHeroAnimation();
    initScrollEffects();
    initInteractiveElements();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hero section animations
function initHeroAnimation() {
    const networkNodes = document.querySelectorAll('.network-nodes .node');
    
    networkNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Simulate data packets flowing between nodes
    setInterval(() => {
        animateDataFlow();
    }, 3000);
}

function animateDataFlow() {
    const connections = document.querySelectorAll('.connection');
    
    connections.forEach(connection => {
        const packet = document.createElement('div');
        packet.className = 'data-packet';
        packet.textContent = '📦';
        connection.appendChild(packet);
        
        // Animate packet movement
        packet.style.animation = 'packetFlow 2s ease-in-out forwards';
        
        // Remove packet after animation
        setTimeout(() => {
            if (packet.parentNode) {
                packet.parentNode.removeChild(packet);
            }
        }, 2000);
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.module-card, .lab-card, .tool-card, .overview-card').forEach(el => {
        observer.observe(el);
    });
}

// Interactive elements
function initInteractiveElements() {
    // Add progress tracking for modules
    initProgressTracking();
    
    // Add search functionality
    initSearch();
    
    // Add theme toggle
    initThemeToggle();
}

function initProgressTracking() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Mark module as visited
            const moduleId = this.href.split('/').pop().replace('.html', '');
            localStorage.setItem(`module_${moduleId}_visited`, 'true');
            
            // Add visual indicator
            if (!this.querySelector('.completion-badge')) {
                const badge = document.createElement('div');
                badge.className = 'completion-badge';
                badge.textContent = '✓';
                this.appendChild(badge);
            }
        });
        
        // Check if module was previously visited
        const moduleId = card.href.split('/').pop().replace('.html', '');
        if (localStorage.getItem(`module_${moduleId}_visited`)) {
            const badge = document.createElement('div');
            badge.className = 'completion-badge';
            badge.textContent = '✓';
            card.appendChild(badge);
        }
    });
}

function initSearch() {
    // Add search functionality if search box exists
    const searchBox = document.querySelector('#search');
    if (searchBox) {
        searchBox.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const cards = document.querySelectorAll('.module-card, .lab-card, .tool-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('dark-theme', isDark);
        });
        
        // Load saved theme
        if (localStorage.getItem('dark-theme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Utility functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add custom CSS for animations
const additionalStyles = `
<style>
@keyframes packetFlow {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100px); opacity: 0; }
}

.data-packet {
    position: absolute;
    font-size: 1.2rem;
    z-index: 10;
}

.completion-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #27ae60;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
}

.toast.show {
    transform: translateX(0);
}

.toast-info { background: #3498db; }
.toast-success { background: #27ae60; }
.toast-warning { background: #f39c12; }
.toast-error { background: #e74c3c; }

.dark-theme {
    background: #1a1a1a;
    color: #e0e0e0;
}

.dark-theme .navbar { background: #000; }
.dark-theme .module-card,
.dark-theme .lab-card,
.dark-theme .tool-card,
.dark-theme .overview-card {
    background: #2d2d2d;
    color: #e0e0e0;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);
```

## Deployment Instructions

### 1. Create GitHub Repository
```bash
# Create new repository on GitHub first, then:
git clone https://github.com/yourusername/tcp-ip-training.git
cd tcp-ip-training

# Add all files
git add .
git commit -m "Initial commit: TCP/IP training website"
git push origin main
```

### 2. Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click Save

### 3. Custom Domain (Optional)
Add CNAME file with your domain:
```bash
echo "training.yourcompany.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### 4. Update URLs
Replace placeholder URLs in the code:
- `yourusername` → your GitHub username
- `yourcompany.com` → your actual domain
- Update all internal links to match your structure

The website will be available at:
- Default: `https://yourusername.github.io/tcp-ip-training`
- Custom domain: `https://training.yourcompany.com`
