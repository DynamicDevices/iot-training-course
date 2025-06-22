# Dynamic Devices IoT Training Course
## Module 1: TCP/IP Networking for Embedded Engineers

### Course Overview
**Format:** Comprehensive IoT Development Training Programme  
**Module 1 Duration:** 3 days (18 hours)  
**Target Audience:** Graduate and junior embedded engineers entering IoT development  
**Prerequisites:** Basic understanding of digital systems and C/C++ programming

### About This Module
TCP/IP Networking is the foundational module of the **Dynamic Devices IoT Training Course** - a comprehensive programme designed to prepare embedded engineers for the full spectrum of modern IoT development challenges.

This intensive 3-day module provides the networking foundation essential for all IoT projects, from simple sensor nodes to complex industrial systems.

### Learning Objectives
By completing Module 1, participants will be able to:
1. **Network Fundamentals:** Understand how data flows through TCP/IP protocol layers
2. **Configuration Mastery:** Configure DHCP, static IP addressing, and network interfaces
3. **Protocol Implementation:** Master TCP vs UDP protocols and their IoT applications  
4. **Service Integration:** Implement HTTP APIs, MQTT messaging, DNS resolution, and NTP synchronisation
5. **Professional Debugging:** Use Wireshark and systematic troubleshooting methodologies
6. **Security Awareness:** Understand network security implications for IoT deployments
7. **System Design:** Design reliable, scalable network architectures for embedded systems

### Complete IoT Training Course Roadmap

**Module 1: TCP/IP Networking** *(Current Module - 3 days)*
- Internet protocols and embedded networking
- Network configuration and troubleshooting
- IoT communication protocols (MQTT, HTTP, CoAP)

**Module 2: Version Control & Collaboration** *(Coming Soon - 2 days)*
- Git fundamentals for embedded development
- Collaborative development workflows
- Code review and branching strategies

**Module 3: Continuous Integration** *(Coming Soon - 2 days)*
- Automated testing for embedded systems
- CI/CD pipelines for IoT devices
- Automated firmware deployment

**Module 4: Development Environments** *(Coming Soon - 2 days)*
- Virtual machines for embedded development
- Cross-compilation environments
- Reproducible development setups

**Module 5: Containerization** *(Coming Soon - 2 days)*
- Docker for embedded applications
- Container-based IoT deployments
- Edge computing architectures

**Module 6: Linux for Embedded Systems** *(Coming Soon - 3 days)*
- Embedded Linux fundamentals
- Custom Linux distributions
- System integration and optimization

**Module 7: IoT Security** *(Coming Soon - 3 days)*
- Embedded security principles
- Cryptographic implementations
- Secure device lifecycle management

**Total Programme Duration:** 17 days of comprehensive IoT engineering training

---

## Day 1: Network Fundamentals & Infrastructure

### Session 1: Internet History & Network Models (90 minutes)

#### 1.1 The Internet's Evolution
- **Pre-internet communication** (telegraph, telephone systems, circuit switching)
- **ARPANET development** (1960s-1970s military research, packet switching)
- **Key contributors:** Vint Cerf, Bob Kahn (TCP/IP), Tim Berners-Lee (WWW)
- **Internet routing philosophy:** "The internet routes around damage"

#### 1.2 OSI vs TCP/IP Models
**Understanding the Protocol Stack:**

| OSI Layer | TCP/IP Layer | Function | Embedded Examples |
|-----------|--------------|----------|-------------------|
| Application | Application | User interfaces | MQTT, HTTP, CoAP, NTP |
| Presentation | Application | Data formatting | JSON, CBOR, encryption |
| Session | Application | Connections | TLS handshakes |
| Transport | Transport | End-to-end delivery | TCP, UDP |
| Network | Internet | Routing | IPv4, IPv6, ICMP |
| Data Link | Link | Local delivery | Ethernet, Wi-Fi frames |
| Physical | Link | Signal transmission | Radio, cables, voltage |

#### 1.3 Practical Exercise
- Use Wireshark to capture and analyze packet headers
- Identify protocol encapsulation in real traffic

### Session 2: Physical & Data Link Layers (90 minutes)

#### 2.1 Physical Layer Considerations
- **Ethernet:** RJ-45 connectors, voltage levels, encoding
- **Wi-Fi:** Radio frequencies, signal strength (RSSI), interference
- **Power constraints** for battery-powered IoT devices

#### 2.2 MAC Addresses & Address Resolution
- **MAC address structure:** 6 bytes (48-bit), globally unique
- **OUI (Organizationally Unique Identifier):** First 3 bytes
- **ARP (Address Resolution Protocol):** IP to MAC mapping
- **Broadcast vs unicast** addressing

#### 2.3 DHCP vs Static Configuration
**Dynamic Host Configuration Protocol:**
- DHCP discover → DHCP offer → DHCP request → DHCP acknowledge
- IP address leases and renewal
- Additional DHCP options (gateway, DNS, NTP servers)

**When to use static vs DHCP:**
- Static: Servers, critical infrastructure
- DHCP: Client devices, easier management

#### 2.4 Hands-on Lab
- Configure ESP32 with static IP and DHCP
- Use Wireshark to observe DHCP negotiation
- Examine ARP tables with `arp -a` command

---

## Day 2: Network Layer & Routing

### Session 3: IP Addressing & Network Classes (120 minutes)

#### 3.1 IPv4 Address Structure
**Address Classes & Prefixes:**
- **Class A:** 1-126 (8-bit network, 24-bit host) - Large networks
- **Class B:** 128-191 (16-bit network, 16-bit host) - Medium networks  
- **Class C:** 192-223 (24-bit network, 8-bit host) - Small networks

**Private Address Ranges (RFC 1918):**
- 10.0.0.0/8 (Class A private) - 16.7M addresses
- 172.16.0.0/12 (Class B private) - 1M addresses  
- 192.168.0.0/16 (Class C private) - 65k addresses

#### 3.2 Subnetting & CIDR
**Subnet Masks & CIDR Notation:**
- Understanding netmasks: 255.255.255.0 = /24
- Calculating network and broadcast addresses
- Determining number of hosts per subnet

**Practical Subnetting:**
```
Network: 192.168.1.0/24
├── Network address: 192.168.1.0
├── Usable hosts: 192.168.1.1 - 192.168.1.254
├── Broadcast: 192.168.1.255
└── Total hosts: 254
```

#### 3.3 Gateways & Routing
- **Default gateway:** Route to other networks
- **Routing tables:** Using `route -n` or `ip route`
- **Multi-hop routing:** Packets traverse multiple routers
- **Traceroute:** Mapping packet paths

#### 3.4 ICMP & Network Testing
- **Ping protocol:** ICMP Echo Request/Reply
- **Packet loss analysis:** Quality of network connections
- **Round-trip time (RTT):** Latency measurements

#### 3.5 Practical Exercise
- Calculate subnets for IoT deployment scenarios
- Use ping and traceroute to analyze network paths
- Configure routing tables on embedded devices

### Session 4: Network Troubleshooting (90 minutes)

#### 4.1 Wireshark Fundamentals
- **Packet capture setup:** Promiscuous mode, capture filters
- **Protocol analysis:** Examining headers and payloads  
- **Common issues:** Network switches vs hubs, smart switches
- **Wi-Fi analysis limitations:** Chipset and driver dependencies

#### 4.2 Network Diagnostic Tools
- **Essential commands:**
  - `ifconfig` / `ip addr` - Interface configuration
  - `arp -a` - Address resolution table
  - `route -n` - Routing table
  - `netstat -rn` - Network statistics

#### 4.3 Common Network Problems
- **IP address conflicts:** Multiple devices with same IP
- **DHCP server conflicts:** Multiple DHCP servers on network
- **Gateway misconfiguration:** Incorrect routing
- **DNS resolution failures:** Domain name lookup issues

#### 4.4 Hands-on Lab
- Set up Wireshark to capture network traffic
- Diagnose network connectivity problems
- Analyze ARP and DHCP traffic patterns

---

## Day 3: Transport & Application Protocols

### Session 5: UDP - Connectionless Protocol (75 minutes)

#### 5.1 UDP Characteristics
- **Best effort delivery:** No guaranteed delivery
- **Connectionless:** No connection establishment
- **Low overhead:** Minimal protocol headers
- **Use cases:** Real-time data, streaming, sensor readings

#### 5.2 When to Use UDP
**Suitable Applications:**
- Audio/video streaming (acceptable packet loss)
- Sensor data transmission (periodic updates)
- DNS queries (simple request/response)
- Network Time Protocol (NTP)

**IoT Example:**
```c
// ESP32 UDP sensor transmission
WiFiUDP udp;
String data = String(temperature) + "," + String(humidity);
udp.beginPacket(server_ip, 8080);
udp.print(data);
udp.endPacket();
```

### Session 6: TCP - Connection-Oriented Protocol (105 minutes)

#### 6.1 TCP Connection Management
**Three-way handshake:**
1. Client → Server: SYN (synchronize)
2. Server → Client: SYN-ACK (synchronize-acknowledge)  
3. Client → Server: ACK (acknowledge)

**Connection termination:**
- Graceful: FIN/ACK sequence
- Abrupt: RST (reset) packets

#### 6.2 TCP Reliability Mechanisms
- **Sequence numbers:** Packet ordering
- **Acknowledgments:** Delivery confirmation
- **Retransmission:** Lost packet recovery
- **Flow control:** Preventing buffer overflow
- **Congestion control:** Network traffic management

#### 6.3 TCP Socket Programming
**BSD Sockets API:**
- `socket()` - Create socket
- `connect()` - Establish connection
- `send()` / `recv()` - Data transmission
- `close()` - Terminate connection

#### 6.4 TCP Optimization & Issues
- **Nagle algorithm:** Reduces small packet overhead
- **TCP keep-alive:** Detecting dead connections
- **Socket options:** Configuring TCP behavior with `ioctl()`
- **Security implications:** SYN flood attacks, port scanning

#### 6.5 Practical Exercise
- Implement TCP client/server on ESP32
- Monitor TCP connection states with Wireshark
- Configure TCP socket options

### Session 7: HTTP & Web Protocols (90 minutes)

#### 7.1 HTTP Protocol Fundamentals
- **HTTP over TCP:** Reliable transport for web traffic
- **Request/response model:** Client-server communication
- **HTTP methods:** GET, POST, PUT, DELETE
- **Status codes:** 200 OK, 404 Not Found, 500 Server Error

#### 7.2 URL Structure & Parameters
**URL Components:**
```
https://api.example.com:443/sensors?id=1&temp=23.5
│   │   │              │   │       │
│   │   │              │   │       └─ Query parameters
│   │   │              │   └─ Path
│   │   │              └─ Port (optional)
│   │   └─ Domain name
│   └─ Protocol
└─ Scheme
```

#### 7.3 HTTP in Embedded Systems
```c
// ESP32 HTTP POST request
HTTPClient http;
http.begin("https://api.iot-platform.com/data");
http.addHeader("Content-Type", "application/json");
String payload = "{\"sensor_id\":\"ESP32_001\",\"value\":23.5}";
int httpCode = http.POST(payload);
```

### Session 8: DNS & Name Resolution (75 minutes)

#### 8.1 Domain Name System (DNS)
- **Hierarchical naming:** TLDs, domains, subdomains
- **DNS record types:**
  - A record: Domain to IPv4 mapping
  - AAAA record: Domain to IPv6 mapping
  - CNAME: Canonical name aliases
  - MX: Mail exchange servers
  - TXT: Text records (verification, SPF)

#### 8.2 DNS Resolution Process
1. Check local cache
2. Query local DNS server
3. Recursive queries up the DNS hierarchy
4. Return IP address to client

#### 8.3 DNS in IoT Development
- **Avoid hardcoded IP addresses:** Use domain names for flexibility
- **DNS propagation delays:** TTL and caching considerations
- **Local DNS servers:** Internal company domains

#### 8.4 Dynamic DNS
- **Problem:** Changing IP addresses (DHCP, dial-up legacy)
- **Solution:** Automatic DNS updates when IP changes
- **Use cases:** Remote access to devices behind NAT

### Session 9: Essential Network Services (90 minutes)

#### 9.1 Network Time Protocol (NTP)
- **Importance:** Accurate timestamps for logging, crypto
- **SNTP:** Simple NTP for embedded devices
- **Time synchronization challenges:** Network latency, jitter
- **Certificate validation:** Time-dependent SSL/TLS certificates

```c
// ESP32 NTP synchronization
#include <time.h>
configTime(0, 0, "pool.ntp.org", "time.nist.gov");
```

#### 9.2 MQTT Overview
- **Publish/subscribe messaging:** Broker-based communication
- **Built on TCP:** Reliable message delivery
- **IoT optimized:** Lightweight protocol for constrained devices
- **QoS levels:** Fire-and-forget, at-least-once, exactly-once

#### 9.3 Client-Server vs Peer-to-Peer
- **Client-server model:** Central authority, scalable
- **P2P implications:** Direct device communication
- **IoT architectures:** Hybrid approaches

#### 9.4 Security Considerations
- **Default port scanning:** Avoiding standard ports for security
- **Certificate management:** PKI for device authentication
- **Network segmentation:** Isolating IoT devices
- **Dependencies:** Third-party service risks

## Assessment & Practical Projects

### Project 1: Complete IoT Network Setup
**Objective:** Design and implement a multi-device IoT network

**Requirements:**
1. 3x ESP32 devices with different communication patterns:
   - Device 1: HTTP POST to cloud API every 5 minutes
   - Device 2: MQTT publish/subscribe for real-time control
   - Device 3: UDP broadcast for local discovery
2. DHCP server configuration with custom domain
3. Network monitoring with Wireshark analysis
4. Implement proper error handling and reconnection logic

### Project 2: Network Troubleshooting Scenarios
**Objective:** Diagnose and resolve real network problems

**Scenarios:**
1. **IP Address Conflicts:** Multiple devices with same static IP
2. **DHCP Exhaustion:** No available IP addresses in pool
3. **Gateway Misconfiguration:** Devices can't reach internet
4. **DNS Resolution Failure:** Domain names not resolving
5. **TCP Connection Issues:** Services not responding on expected ports

### Project 3: Protocol Implementation Challenge
**Objective:** Implement a custom application protocol

**Requirements:**
1. Design a simple sensor network protocol
2. Choose appropriate transport (TCP vs UDP) with justification
3. Implement reliable delivery mechanisms if using UDP
4. Add basic authentication and error handling
5. Document protocol specification following RFC format

---

## Tools & Resources

### Essential Tools
1. **Wireshark** - Packet analysis and protocol debugging
2. **nmap** - Network discovery and port scanning
3. **iperf3** - Network performance testing
4. **tcpdump** - Command-line packet capture
5. **dig** - DNS lookup and debugging
6. **Arduino IDE/PlatformIO** - Embedded development environments

### Recommended Hardware
- ESP32 development boards (multiple units)
- Ethernet shields for Arduino
- Various sensors (temperature, humidity, light)
- Managed switch for network experimentation
- Wi-Fi access point for testing

### Online Resources
- **RFCs:** Official protocol specifications (ietf.org)
- **RFC 793** (TCP), **RFC 791** (IP), **RFC 768** (UDP)
- **Eclipse Paho** (MQTT client libraries)
- **Dynamic Devices Blog** (embedded networking articles)

### Command References
**Network Diagnostics:**
```bash
# Interface information
ifconfig -a              # Linux/Mac
ipconfig /all           # Windows

# Connectivity testing  
ping google.com
traceroute google.com   # Linux/Mac
tracert google.com      # Windows

# DNS resolution
nslookup google.com
dig google.com          # Linux/Mac

# Network tables
arp -a                  # ARP cache
route -n               # Routing table (Linux)
netstat -rn            # Routing table (all platforms)
```

---

## Advanced Topics (Optional Modules)

### Network Security for IoT
- **TCP security implications:** SYN floods, port scanning attacks
- **TLS/SSL for embedded devices:** Certificate management challenges
- **Network segmentation:** Isolating IoT devices from corporate networks
- **VPN access:** Secure remote device management

### Performance Optimization
- **TCP tuning:** Nagle algorithm, keep-alive settings, socket options
- **Buffer management:** Preventing memory exhaustion
- **Connection pooling:** Reusing TCP connections efficiently
- **Bandwidth optimization:** Compression and efficient protocols

### Emerging IoT Protocols
- **MQTT-SN:** MQTT for sensor networks over UDP
- **Thread/Matter:** Mesh networking for smart homes
- **LoRaWAN:** Long-range, low-power communication
- **5G and edge computing:** Ultra-low latency applications

### IPv6 Transition
- **6LoWPAN:** IPv6 over low-power wireless networks
- **Address auto-configuration:** Stateless address configuration
- **Dual-stack operation:** Running IPv4 and IPv6 simultaneously

---

## Best Practices & Guidelines

### Network Design Principles
1. **Avoid hardcoded IP addresses** - Use DNS names for flexibility
2. **Plan for failure** - Implement redundancy and failover mechanisms  
3. **Monitor dependencies** - Know your external service dependencies
4. **Use appropriate protocols** - TCP for reliability, UDP for performance
5. **Implement proper timeouts** - Prevent hung connections

### Security Guidelines
1. **Change default ports** - Avoid well-known port numbers for custom services
2. **Validate certificates** - Ensure proper time synchronization for TLS
3. **Segment networks** - Isolate IoT devices from critical systems
4. **Monitor traffic** - Use intrusion detection for unusual patterns
5. **Regular updates** - Keep firmware and certificates current

### Troubleshooting Methodology
1. **Physical layer first** - Check cables, power, signal strength
2. **Work up the stack** - Physical → Data Link → Network → Transport → Application
3. **Use the right tools** - Wireshark for packets, ping for connectivity
4. **Document findings** - Keep network topology and configuration records
5. **Test systematically** - Isolate variables when debugging

---

## Licensing & Usage

This training material is licensed under **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**.

**You are free to:**
- Share — copy and redistribute the material in any medium or format

**Under the following terms:**
- **Attribution** — You must give appropriate credit to Dynamic Devices Ltd
- **NonCommercial** — You may not use the material for commercial purposes
- **NoDerivatives** — You may not remix, transform, or build upon the material

For commercial licensing inquiries, contact **info@dynamicdevices.co.uk**

---

## Contact & Support

**Dynamic Devices Ltd**  
Email: **info@dynamicdevices.co.uk**  
Training Support: Available during course delivery

### Getting Help
- **Technical Issues:** Email support with detailed error descriptions
- **Course Content:** Questions welcomed during interactive sessions
- **Hardware Setup:** Preparation checklist provided before course
- **Follow-up:** Post-course support available for 30 days

### Feedback & Improvements
We continuously improve this training based on participant feedback. Please share:
- Concepts that were unclear or need more explanation
- Additional topics you'd like covered
- Suggestions for hands-on exercises
- Real-world scenarios from your embedded projects

---

*This comprehensive training programme reflects the practical networking knowledge essential for embedded engineers working with IoT and connected devices. The content is based on real-world experience developing networked embedded systems at Dynamic Devices Ltd.*