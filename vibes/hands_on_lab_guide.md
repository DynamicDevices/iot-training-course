# TCP/IP Hands-On Lab Guide
## Practical Exercises for Embedded Engineers by Dynamic Devices Ltd

### Prerequisites
- ESP32 development boards (3+ units recommended)
- Arduino IDE or PlatformIO
- Wi-Fi network access with admin privileges
- Computer with administrator access for Wireshark
- Basic C/C++ programming knowledge

---

## Lab 1: Network Interface Discovery & DHCP Analysis

### Objective
Understand network interface configuration, DHCP operation, and address resolution.

### Part A: Host Computer Network Analysis

#### Exercise 1.1: Discover Network Interfaces and Configuration
Open terminal/command prompt and run these commands:

**Windows:**
```cmd
ipconfig /all
arp -a
netstat -rn
route print
```

**Linux/Mac:**
```bash
ifconfig -a          # or: ip addr show
arp -a               # View ARP table
route -n             # or: ip route show
ip route show        # Show routing table
```

**Analysis Tasks:**
1. Identify your Wi-Fi interface name and current IP address
2. Find your default gateway and DNS servers
3. Note the MAC address of your Wi-Fi adapter
4. Determine what class of network you're on (A, B, or C)
5. Calculate the network address and broadcast address

#### Exercise 1.2: DHCP vs Static IP Analysis
Using your network configuration:

```
Example Analysis:
IP Address: 192.168.1.100
Subnet Mask: 255.255.255.0 (/24)

Calculate:
- Network address: 192.168.1.0
- Broadcast address: 192.168.1.255  
- Number of possible hosts: 254
- Your network class: Class C (private)
- Gateway: (typically 192.168.1.1)
```

**Tasks:**
1. Record all network configuration details
2. Compare with classmates - note similarities in private address usage
3. Research the difference between public and private IP addresses

### Part B: ESP32 Network Configuration

#### Exercise 1.3: Dynamic vs Static IP Configuration

**Dynamic Configuration (DHCP Client):**
```cpp
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
    Serial.begin(115200);
    delay(1000);
    
    // Connect using DHCP
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println();
    Serial.println("WiFi connected via DHCP!");
    printNetworkInfo();
}

void loop() {
    // Monitor connection status
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("DHCP lease still active");
    } else {
        Serial.println("Connection lost - attempting reconnect");
        WiFi.reconnect();
    }
    delay(30000); // Check every 30 seconds
}

void printNetworkInfo() {
    Serial.println("=== DHCP-Assigned Network Information ===");
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Subnet Mask: ");
    Serial.println(WiFi.subnetMask());
    Serial.print("Gateway: ");
    Serial.println(WiFi.gatewayIP());
    Serial.print("DNS: ");
    Serial.println(WiFi.dnsIP());
    Serial.print("MAC Address: ");
    Serial.println(WiFi.macAddress());
    Serial.print("Signal Strength: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
}
```

**Static IP Configuration:**
```cpp
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Static IP configuration
IPAddress local_IP(192, 168, 1, 200);      // Choose unused IP
IPAddress gateway(192, 168, 1, 1);         // Your network gateway
IPAddress subnet(255, 255, 255, 0);        // /24 subnet
IPAddress primaryDNS(8, 8, 8, 8);         // Google DNS
IPAddress secondaryDNS(8, 8, 4, 4);       // Google DNS

void setup() {
    Serial.begin(115200);
    delay(1000);
    
    // Configure static IP
    if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
        Serial.println("Static IP configuration failed!");
    }
    
    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting with static IP");
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println();
    Serial.println("WiFi connected with static IP!");
    printNetworkInfo();
    testConnectivity();
}

void testConnectivity() {
    Serial.println("\n=== Connectivity Tests ===");
    
    // Test gateway connectivity
    if (Ping.ping(WiFi.gatewayIP())) {
        Serial.println("✓ Gateway reachable");
    } else {
        Serial.println("✗ Gateway unreachable");
    }
    
    // Test internet connectivity
    if (Ping.ping("8.8.8.8")) {
        Serial.println("✓ Internet connectivity OK");
    } else {
        Serial.println("✗ Internet connectivity failed");
    }
}

void loop() {
    delay(60000); // Static IP doesn't change
}
```

**Tasks:**
1. Upload DHCP version and record assigned IP information
2. Upload static IP version and verify connectivity
3. Compare the two approaches - advantages/disadvantages
4. Test what happens when you use an IP that conflicts with another device

---

## Lab 2: Wireshark Analysis of DHCP and ARP

### Objective
Use Wireshark to observe and understand DHCP negotiation and ARP resolution.

### Exercise 2.1: DHCP Traffic Analysis

#### Setup Wireshark for DHCP Capture
1. Install Wireshark on your computer
2. Start capturing on your Wi-Fi interface
3. Apply filter: `dhcp or bootp`
4. Power cycle your ESP32 to trigger DHCP renewal

#### ESP32 DHCP Analysis Code
```cpp
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
    Serial.begin(115200);
    delay(2000);
    
    Serial.println("Starting DHCP analysis...");
    
    // Force DHCP renewal by disconnecting first
    WiFi.disconnect(true);
    delay(1000);
    
    // Connect and trigger DHCP
    WiFi.begin(ssid, password);
    
    Serial.println("DHCP request initiated - check Wireshark!");
    
    unsigned long startTime = millis();
    while (WiFi.status() != WL_CONNECTED && millis() - startTime < 30000) {
        delay(500);
        Serial.print(".");
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nDHCP successful!");
        printDHCPInfo();
    } else {
        Serial.println("\nDHCP failed!");
    }
}

void printDHCPInfo() {
    Serial.println("=== DHCP Lease Information ===");
    Serial.printf("Lease IP: %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("Lease Gateway: %s\n", WiFi.gatewayIP().toString().c_str());
    Serial.printf("Lease DNS: %s\n", WiFi.dnsIP().toString().c_str());
    Serial.printf("MAC Address: %s\n", WiFi.macAddress().c_str());
}

void loop() {
    delay(5000);
}
```

#### DHCP Analysis Tasks
1. **Identify DHCP Four-Way Handshake:**
   - DHCP Discover (broadcast from client)
   - DHCP Offer (unicast from server)
   - DHCP Request (broadcast from client)
   - DHCP Acknowledge (unicast from server)

2. **Examine DHCP Packet Contents:**
   - Client MAC address in all packets
   - Transaction ID consistency
   - DHCP options (subnet mask, gateway, DNS)
   - Lease time duration

3. **Document the Process:**
   - Time taken for complete DHCP negotiation
   - IP address assignment
   - Additional configuration provided

### Exercise 2.2: ARP Traffic Analysis

#### Setup Wireshark for ARP Capture
1. Clear existing Wireshark capture
2. Apply filter: `arp`
3. Run ESP32 code that attempts to ping the gateway

#### ESP32 ARP Demonstration Code
```cpp
#include <WiFi.h>
#include <ESP32Ping.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\nConnected! Starting ARP analysis...");
    Serial.println("Check Wireshark for ARP packets");
    
    // First ping will trigger ARP resolution
    Serial.println("\nFirst ping (should trigger ARP):");
    testPing(WiFi.gatewayIP().toString());
    
    delay(2000);
    
    // Second ping should use cached ARP
    Serial.println("\nSecond ping (should use ARP cache):");
    testPing(WiFi.gatewayIP().toString());
}

void testPing(String target) {
    Serial.printf("Pinging %s...\n", target.c_str());
    
    if (Ping.ping(target.c_str(), 1)) {
        Serial.printf("Success: %d ms\n", Ping.averageTime());
    } else {
        Serial.println("Failed");
    }
}

void loop() {
    delay(60000);
    Serial.println("Pinging again to maintain ARP cache:");
    testPing(WiFi.gatewayIP().toString());
}
```

#### ARP Analysis Tasks
1. **Identify ARP Request/Reply Sequence:**
   - ARP Request: "Who has [IP]? Tell [MAC]"
   - ARP Reply: "[IP] is at [MAC]"

2. **Examine ARP Packet Structure:**
   - Hardware type (Ethernet = 1)
   - Protocol type (IPv4 = 0x0800)
   - Hardware and protocol address lengths
   - Operation code (request = 1, reply = 2)

3. **Observe ARP Caching:**
   - First ping triggers ARP resolution
   - Subsequent pings use cached MAC address
   - No additional ARP traffic for cached entries

---

## Lab 3: TCP vs UDP Protocol Comparison

### Objective
Implement and compare TCP and UDP communication protocols.

### Exercise 3.1: UDP Implementation

#### UDP Server (Python on Computer)
```python
import socket
import datetime

UDP_IP = "0.0.0.0"  # Listen on all interfaces
UDP_PORT = 8080

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

print(f"UDP server listening on port {UDP_PORT}")

while True:
    data, addr = sock.recvfrom(1024)
    timestamp = datetime.datetime.now().strftime("%H:%M:%S.%f")[:-3]
    print(f"[{timestamp}] From {addr}: {data.decode()}")
    
    # Echo response (optional)
    response = f"Echo: {data.decode()}"
    sock.sendto(response.encode(), addr)
```

#### ESP32 UDP Client
```cpp
#include <WiFi.h>
#include <WiFiUdp.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* udpAddress = "192.168.1.100"; // Replace with server IP
const int udpPort = 8080;

WiFiUDP udp;
int packetCount = 0;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\nWiFi connected!");
    Serial.printf("UDP target: %s:%d\n", udpAddress, udpPort);
    udp.begin(udpPort);
}

void loop() {
    sendUDPPacket();
    delay(2000);
}

void sendUDPPacket() {
    packetCount++;
    
    // Create sensor data simulation
    float temperature = 20.0 + random(-50, 50) / 10.0;
    float humidity = 50.0 + random(-200, 200) / 10.0;
    
    String message = String(packetCount) + "," + 
                    String(temperature, 1) + "," + 
                    String(humidity, 1) + "," + 
                    String(millis());
    
    Serial.printf("Sending UDP #%d: %s\n", packetCount, message.c_str());
    
    udp.beginPacket(udpAddress, udpPort);
    udp.print(message);
    int result = udp.endPacket();
    
    if (result == 1) {
        Serial.println("UDP packet sent successfully");
    } else {
        Serial.println("UDP packet send failed");
    }
    
    // Optional: Listen for response
    listenForResponse();
}

void listenForResponse() {
    unsigned long timeout = millis() + 1000; // 1 second timeout
    
    while (millis() < timeout) {
        int packetSize = udp.parsePacket();
        if (packetSize) {
            char buffer[255];
            int len = udp.read(buffer, 255);
            buffer[len] = '\0';
            Serial.printf("UDP response: %s\n", buffer);
            break;
        }
        delay(10);
    }
}
```

### Exercise 3.2: TCP Implementation

#### TCP Server (Python on Computer)
```python
import socket
import threading
import datetime

TCP_IP = "0.0.0.0"
TCP_PORT = 8080

def handle_client(conn, addr):
    print(f"New TCP connection from {addr}")
    
    try:
        while True:
            data = conn.recv(1024)
            if not data:
                break
                
            timestamp = datetime.datetime.now().strftime("%H:%M:%S.%f")[:-3]
            message = data.decode().strip()
            print(f"[{timestamp}] TCP from {addr}: {message}")
            
            # Echo response
            response = f"TCP Echo: {message}\n"
            conn.send(response.encode())
            
    except Exception as e:
        print(f"Error with {addr}: {e}")
    finally:
        conn.close()
        print(f"Connection with {addr} closed")

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
sock.bind((TCP_IP, TCP_PORT))
sock.listen(5)

print(f"TCP server listening on port {TCP_PORT}")

while True:
    conn, addr = sock.accept()
    client_thread = threading.Thread(target=handle_client, args=(conn, addr))
    client_thread.start()
```

#### ESP32 TCP Client
```cpp
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* tcpAddress = "192.168.1.100"; // Replace with server IP
const int tcpPort = 8080;

WiFiClient client;
int messageCount = 0;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\nWiFi connected!");
    Serial.printf("TCP target: %s:%d\n", tcpAddress, tcpPort);
}

void loop() {
    if (!client.connected()) {
        connectToServer();
    }
    
    if (client.connected()) {
        sendTCPMessage();
        readTCPResponse();
    }
    
    delay(3000);
}

void connectToServer() {
    Serial.println("Connecting to TCP server...");
    
    if (client.connect(tcpAddress, tcpPort)) {
        Serial.println("TCP connection established!");
    } else {
        Serial.println("TCP connection failed!");
        delay(5000);
    }
}

void sendTCPMessage() {
    messageCount++;
    
    float temperature = 20.0 + random(-50, 50) / 10.0;
    float humidity = 50.0 + random(-200, 200) / 10.0;
    
    String message = String(messageCount) + "," + 
                    String(temperature, 1) + "," + 
                    String(humidity, 1) + "," + 
                    String(millis()) + "\n";
    
    Serial.printf("Sending TCP #%d: %s", messageCount, message.c_str());
    
    client.print(message);
}

void readTCPResponse() {
    unsigned long timeout = millis() + 2000; // 2 second timeout
    
    while (millis() < timeout && client.connected()) {
        if (client.available()) {
            String response = client.readStringUntil('\n');
            Serial.printf("TCP response: %s\n", response.c_str());
            break;
        }
        delay(10);
    }
}
```

### Exercise 3.3: Protocol Comparison Analysis

#### Wireshark Comparison Tasks
1. **Capture both UDP and TCP traffic simultaneously**
2. **Compare packet overhead:**
   - UDP header size vs TCP header size
   - Total packet sizes for same data payload
3. **Analyze connection behavior:**
   - TCP three-way handshake observation
   - UDP connectionless operation
4. **Test reliability:**
   - Disconnect network cable during transmission
   - Observe TCP retransmission vs UDP packet loss

#### Performance Testing Code
```cpp
// Add to either TCP or UDP client
void performanceTest() {
    const int testPackets = 100;
    unsigned long startTime = millis();
    int successCount = 0;
    
    Serial.printf("Starting performance test: %d packets\n", testPackets);
    
    for (int i = 0; i < testPackets; i++) {
        bool success = false;
        
        // UDP version
        udp.beginPacket(udpAddress, udpPort);
        udp.printf("Test packet %d", i);
        success = (udp.endPacket() == 1);
        
        // TCP version
        // if (client.connected()) {
        //     client.printf("Test packet %d\n", i);
        //     success = true;
        // }
        
        if (success) successCount++;
        delay(10); // Small delay between packets
    }
    
    unsigned long endTime = millis();
    unsigned long duration = endTime - startTime;
    
    Serial.printf("Performance test results:\n");
    Serial.printf("- Duration: %lu ms\n", duration);
    Serial.printf("- Success rate: %d/%d (%.1f%%)\n", 
                 successCount, testPackets, 
                 (float)successCount * 100.0 / testPackets);
    Serial.printf("- Average rate: %.1f packets/sec\n", 
                 (float)testPackets * 1000.0 / duration);
}
```

**Comparison Analysis:**
1. Document packet overhead differences
2. Measure transmission rates for each protocol
3. Test behavior under network stress
4. Identify appropriate use cases for each protocol

---

## Lab 4: HTTP Client Implementation & Analysis

### Objective
Implement HTTP communication and analyze web traffic.

### Exercise 4.1: Basic HTTP Client

#### ESP32 HTTP Implementation
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\nWiFi connected!");
    Serial.println("Starting HTTP client tests...");
}

void loop() {
    performHTTPTests();
    delay(30000); // Test every 30 seconds
}

void performHTTPTests() {
    // Test 1: Simple GET request
    testHTTPGet();
    delay(2000);
    
    // Test 2: POST with JSON data
    testHTTPPost();
    delay(2000);
    
    // Test 3: HTTP with custom headers
    testHTTPHeaders();
}

void testHTTPGet() {
    Serial.println("\n=== HTTP GET Test ===");
    
    HTTPClient http;
    http.begin("http://httpbin.org/ip");
    
    Serial.println("Sending GET request to httpbin.org/ip");
    int httpCode = http.GET();
    
    if (httpCode > 0) {
        Serial.printf("HTTP response code: %d\n", httpCode);
        
        if (httpCode == HTTP_CODE_OK) {
            String payload = http.getString();
            Serial.println("Response payload:");
            Serial.println(payload);
        }
    } else {
        Serial.printf("HTTP GET failed: %s\n", http.errorToString(httpCode).c_str());
    }
    
    http.end();
}

void testHTTPPost() {
    Serial.println("\n=== HTTP POST Test ===");
    
    HTTPClient http;
    http.begin("http://httpbin.org/post");
    http.addHeader("Content-Type", "application/json");
    
    // Create JSON payload
    StaticJsonDocument<200> doc;
    doc["device_id"] = "ESP32_001";
    doc["sensor_type"] = "temperature";
    doc["value"] = 23.5;
    doc["timestamp"] = millis();
    doc["location"] = "lab";
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    Serial.printf("Sending POST request with JSON payload:\n%s\n", jsonString.c_str());
    
    int httpCode = http.POST(jsonString);
    
    if (httpCode > 0) {
        Serial.printf("HTTP response code: %d\n", httpCode);
        
        if (httpCode == HTTP_CODE_OK) {
            String response = http.getString();
            Serial.println("Server response:");
            Serial.println(response);
        }
    } else {
        Serial.printf("HTTP POST failed: %s\n", http.errorToString(httpCode).c_str());
    }
    
    http.end();
}

void testHTTPHeaders() {
    Serial.println("\n=== HTTP Custom Headers Test ===");
    
    HTTPClient http;
    http.begin("http://httpbin.org/headers");
    
    // Add custom headers
    http.addHeader("User-Agent", "ESP32-IoT-Device/1.0");
    http.addHeader("X-Device-MAC", WiFi.macAddress());
    http.addHeader("X-Device-IP", WiFi.localIP().toString());
    http.addHeader("X-Signal-Strength", String(WiFi.RSSI()));
    
    Serial.println("Sending GET request with custom headers");
    int httpCode = http.GET();
    
    if (httpCode == HTTP_CODE_OK) {
        String response = http.getString();
        Serial.println("Server received headers:");
        Serial.println(response);
    } else {
        Serial.printf("HTTP request failed: %d\n", httpCode);
    }
    
    http.end();
}
```

### Exercise 4.2: HTTP Traffic Analysis with Wireshark

#### Setup Wireshark for HTTP Analysis
1. Start Wireshark capture on your network interface
2. Apply filter: `http or tcp.port == 80`
3. Run the ESP32 HTTP client code
4. Observe the complete HTTP transaction

#### Analysis Tasks
1. **TCP Connection Setup:**
   - Identify the three-way handshake (SYN, SYN-ACK, ACK)
   - Note the ephemeral port used by the ESP32
   - Observe connection to port 80 on the server

2. **HTTP Request Analysis:**
   - Examine the HTTP GET request structure
   - Identify all headers sent by the ESP32
   - Note the User-Agent and other custom headers

3. **HTTP Response Analysis:**
   - Examine the HTTP response status code
   - Identify response headers (Content-Type, Content-Length, etc.)
   - Analyze the JSON response payload

4. **Connection Teardown:**
   - Observe the FIN/ACK sequence for connection closure
   - Note timing between request and response

---

## Lab 5: DNS Resolution & NTP Time Synchronization

### Objective
Implement and analyze DNS queries and NTP time synchronization.

### Exercise 5.1: DNS Resolution Analysis

#### ESP32 DNS Investigation Code
```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Test different types of hostnames
const char* testHosts[] = {
    "google.com",
    "httpbin.org", 
    "api.github.com",
    "pool.ntp.org",
    "8.8.8.8"  // IP address (no DNS needed)
};

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\nWiFi connected!");
    printNetworkConfig();
    
    Serial.println("\n=== DNS Resolution Tests ===");
    testDNSResolution();
}

void printNetworkConfig() {
    Serial.println("=== Network Configuration ===");
    Serial.printf("IP Address: %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("Gateway: %s\n", WiFi.gatewayIP().toString().c_str());
    Serial.printf("Primary DNS: %s\n", WiFi.dnsIP().toString().c_str());
    Serial.printf("Secondary DNS: %s\n", WiFi.dnsIP(1).toString().c_str());
}

void testDNSResolution() {
    for (int i = 0; i < 5; i++) {
        Serial.printf("\nResolving: %s\n", testHosts[i]);
        
        unsigned long startTime = millis();
        IPAddress resolvedIP;
        
        bool success = WiFi.hostByName(testHosts[i], resolvedIP);
        unsigned long resolutionTime = millis() - startTime;
        
        if (success) {
            Serial.printf("✓ Resolved to: %s (took %lu ms)\n", 
                         resolvedIP.toString().c_str(), resolutionTime);
            
            // Test HTTP connection to verify
            testHTTPConnection(testHosts[i], resolvedIP);
        } else {
            Serial.printf("✗ DNS resolution failed (took %lu ms)\n", resolutionTime);
        }
        
        delay(1000);
    }
}

void testHTTPConnection(const char* hostname, IPAddress ip) {
    HTTPClient http;
    
    // Test both hostname and IP address
    String url1 = String("http://") + hostname;
    String url2 = String("http://") + ip.toString();
    
    Serial.printf("Testing HTTP to hostname: %s\n", url1.c_str());
    http.begin(url1);
    int code1 = http.GET();
    http.end();
    
    Serial.printf("Testing HTTP to IP: %s\n", url2.c_str());
    http.begin(url2);
    int code2 = http.GET();
    http.end();
    
    Serial.printf("Hostname result: %d, IP result: %d\n", code1, code2);
}

void loop() {
    delay(60000);
    Serial.println("\n=== Periodic DNS Test ===");
    
    // Test DNS resolution performance over time
    const char* testHost = "google.com";
    unsigned long startTime = millis();
    IPAddress ip;
    
    if (WiFi.hostByName(testHost, ip)) {
        unsigned long duration = millis() - startTime;
        Serial.printf("%s resolved to %s in %lu ms\n", 
                     testHost, ip.toString().c_str(), duration);
    } else {
        Serial.printf("DNS resolution failed for %s\n", testHost);
    }
}
```

### Exercise 5.2: NTP Time Synchronization

#### ESP32 NTP Implementation
```cpp
#include <WiFi.h>
#include <time.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// NTP servers to test
const char* ntpServers[] = {
    "pool.ntp.org",
    "time.nist.gov",
    "time.google.com"
};

const char* timezone = "GMT0BST,M3.5.0/1,M10.5.0"; // UK timezone

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\nWiFi connected!");
    
    // Test time before NTP synchronization
    Serial.println("=== Time Before NTP Sync ===");
    printCurrentTime();
    
    // Configure and test NTP
    Serial.println("\n=== NTP Configuration ===");
    testNTPSync();
}

void printCurrentTime() {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return;
    }
    
    char timeString[64];
    strftime(timeString, sizeof(timeString), "%A, %B %d %Y %H:%M:%S", &timeinfo);
    Serial.printf("Current time: %s\n", timeString);
    Serial.printf("Unix timestamp: %ld\n", time(nullptr));
}

void testNTPSync() {
    // Test each NTP server
    for (int i = 0; i < 3; i++) {
        Serial.printf("\nTesting NTP server: %s\n", ntpServers[i]);
        
        // Configure time with current server
        configTime(0, 0, ntpServers[i]);
        
        // Wait for synchronization
        Serial.print("Waiting for NTP sync");
        int attempts = 0;
        while (time(nullptr) < 1000000000L && attempts < 50) {
            delay(100);
            Serial.print(".");
            attempts++;
        }
        
        if (time(nullptr) > 1000000000L) {
            Serial.println(" Success!");
            printCurrentTime();
            testTimeAccuracy();
        } else {
            Serial.println(" Failed!");
        }
        
        delay(2000);
    }
    
    // Configure with multiple servers for reliability
    Serial.println("\n=== Multi-Server NTP Configuration ===");
    configTime(0, 0, ntpServers[0], ntpServers[1], ntpServers[2]);
    setenv("TZ", timezone, 1);
    tzset();
    
    Serial.print("Final NTP synchronization");
    while (time(nullptr) < 1000000000L) {
        delay(100);
        Serial.print(".");
    }
    Serial.println(" Complete!");
    
    printCurrentTime();
}

void testTimeAccuracy() {
    // Test time stability over multiple readings
    Serial.println("Testing time accuracy (5 readings):");
    
    for (int i = 0; i < 5; i++) {
        time_t now = time(nullptr);
        struct tm* timeinfo = localtime(&now);
        
        Serial.printf("Reading %d: %02d:%02d:%02d.%03d\n", 
                     i + 1, timeinfo->tm_hour, timeinfo->tm_min, 
                     timeinfo->tm_sec, (int)(millis() % 1000));
        delay(1000);
    }
}

void loop() {
    delay(30000);
    
    // Periodic time display with network time accuracy
    Serial.println("\n=== Periodic Time Check ===");
    printCurrentTime();
    
    // Check if time seems reasonable (after year 2020)
    time_t now = time(nullptr);
    if (now < 1577836800) { // Jan 1, 2020
        Serial.println("⚠️  Time appears incorrect - may need NTP resync");
    }
    
    // Test HTTP request with accurate timestamp
    testTimestampedRequest();
}

void testTimestampedRequest() {
    HTTPClient http;
    http.begin("http://httpbin.org/post");
    http.addHeader("Content-Type", "application/json");
    
    // Create timestamped data
    time_t now = time(nullptr);
    struct tm* timeinfo = localtime(&now);
    
    char timestamp[32];
    strftime(timestamp, sizeof(timestamp), "%Y-%m-%dT%H:%M:%SZ", timeinfo);
    
    String payload = "{\"timestamp\":\"" + String(timestamp) + 
                    "\",\"uptime\":" + String(millis()) + 
                    ",\"device\":\"ESP32_NTP_Test\"}";
    
    Serial.printf("Sending timestamped HTTP request: %s\n", payload.c_str());
    
    int httpCode = http.POST(payload);
    if (httpCode == 200) {
        Serial.println("✓ Timestamped request successful");
    } else {
        Serial.printf("✗ HTTP request failed: %d\n", httpCode);
    }
    
    http.end();
}
```

### Exercise 5.3: DNS and NTP Analysis with Wireshark

#### Wireshark Analysis Tasks

1. **DNS Traffic Analysis:**
   - Apply filter: `dns`
   - Observe DNS query and response packets
   - Identify query types (A records for IPv4)
   - Note response times and TTL values
   - Examine DNS server addresses used

2. **NTP Traffic Analysis:**
   - Apply filter: `ntp`
   - Observe NTP request/response packets
   - Examine timestamp information
   - Note NTP server stratum levels
   - Analyze time synchronization accuracy

3. **Combined Analysis:**
   - DNS resolution followed by NTP sync
   - Compare resolution times for different servers
   - Document any failed resolutions or timeouts

**Analysis Questions:**
1. How long does DNS resolution typically take?
2. Which DNS servers respond fastest?
3. How accurate is NTP synchronization?
4. What happens when DNS or NTP servers are unreachable?

---

## Lab 6: Comprehensive Network Troubleshooting

### Objective
Apply systematic troubleshooting methodology to diagnose and resolve network issues.

### Exercise 6.1: Network Diagnostic Framework

#### ESP32 Comprehensive Diagnostic Tool
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ESP32Ping.h>
#include <time.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Test targets
const char* pingTargets[] = {
    "8.8.8.8",      // Google DNS
    "1.1.1.1",      // Cloudflare DNS  
    "google.com",   // Domain name
    "httpbin.org"   // Test API
};

void setup() {
    Serial.begin(115200);
    delay(2000);
    
    Serial.println("=== Network Diagnostic Tool ===");
    Serial.println("Dynamic Devices Ltd Training Lab");
    
    runFullDiagnostics();
}

void runFullDiagnostics() {
    Serial.println("\n🔍 Starting comprehensive network diagnostics...\n");
    
    // Step 1: Physical layer
    testPhysicalLayer();
    
    // Step 2: Data link layer  
    testDataLinkLayer();
    
    // Step 3: Network layer
    testNetworkLayer();
    
    // Step 4: Transport layer
    testTransportLayer();
    
    // Step 5: Application layer
    testApplicationLayer();
    
    // Summary
    printDiagnosticSummary();
}

void testPhysicalLayer() {
    Serial.println("📡 STEP 1: Physical Layer Tests");
    Serial.println("------------------------------");
    
    // Test WiFi radio
    int networkCount = WiFi.scanNetworks();
    Serial.printf("WiFi networks detected: %d\n", networkCount);
    
    if (networkCount > 0) {
        Serial.println("✓ WiFi radio operational");
        
        // Show strongest networks
        Serial.println("Strongest networks:");
        for (int i = 0; i < min(3, networkCount); i++) {
            Serial.printf("  %s: %d dBm\n", WiFi.SSID(i).c_str(), WiFi.RSSI(i));
        }
    } else {
        Serial.println("✗ No WiFi networks detected - check radio");
    }
    
    Serial.println();
}

void testDataLinkLayer() {
    Serial.println("🔗 STEP 2: Data Link Layer Tests");
    Serial.println("--------------------------------");
    
    // Attempt WiFi connection
    Serial.printf("Connecting to SSID: %s\n", ssid);
    WiFi.begin(ssid, password);
    
    unsigned long startTime = millis();
    int attempts = 0;
    
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\n✓ WiFi connection established");
        
        // Display connection details
        Serial.printf("MAC Address: %s\n", WiFi.macAddress().c_str());
        Serial.printf("Signal Strength: %d dBm\n", WiFi.RSSI());
        Serial.printf("Connection time: %lu ms\n", millis() - startTime);
        
        // Test DHCP lease
        if (WiFi.localIP().toString() != "0.0.0.0") {
            Serial.println("✓ DHCP lease acquired");
        } else {
            Serial.println("✗ DHCP lease failed");
        }
    } else {
        Serial.println("\n✗ WiFi connection failed");
        diagnoseWiFiFailure();
    }
    
    Serial.println();
}

void testNetworkLayer() {
    Serial.println("🌐 STEP 3: Network Layer Tests");
    Serial.println("------------------------------");
    
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("✗ Skipping - no network connection");
        return;
    }
    
    // Display IP configuration
    Serial.println("IP Configuration:");
    Serial.printf("  IP Address: %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("  Subnet Mask: %s\n", WiFi.subnetMask().toString().c_str());
    Serial.printf("  Gateway: %s\n", WiFi.gatewayIP().toString().c_str());
    Serial.printf("  DNS: %s\n", WiFi.dnsIP().toString().c_str());
    
    // Test local network connectivity
    Serial.println("\nPing Tests:");
    for (int i = 0; i < 4; i++) {
        testPingConnectivity(pingTargets[i]);
        delay(500);
    }
    
    Serial.println();
}

void testTransportLayer() {
    Serial.println("🚢 STEP 4: Transport Layer Tests");
    Serial.println("--------------------------------");
    
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("✗ Skipping - no network connection");
        return;
    }
    
    // Test common ports
    struct PortTest {
        const char* service;
        const char* host;
        int port;
    };
    
    PortTest portTests[] = {
        {"HTTP", "httpbin.org", 80},
        {"HTTPS", "httpbin.org", 443},
        {"DNS", "8.8.8.8", 53},
        {"NTP", "pool.ntp.org", 123}
    };
    
    for (int i = 0; i < 4; i++) {
        testPortConnectivity(portTests[i].service, portTests[i].host, portTests[i].port);
        delay(1000);
    }
    
    Serial.println();
}

void testApplicationLayer() {
    Serial.println("📱 STEP 5: Application Layer Tests");
    Serial.println("----------------------------------");
    
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("✗ Skipping - no network connection");
        return;
    }
    
    // Test DNS resolution
    Serial.println("DNS Resolution Tests:");
    IPAddress resolvedIP;
    if (WiFi.hostByName("google.com", resolvedIP)) {
        Serial.printf("✓ google.com → %s\n", resolvedIP.toString().c_str());
    } else {
        Serial.println("✗ DNS resolution failed");
    }
    
    // Test HTTP connectivity
    Serial.println("\nHTTP Tests:");
    testHTTPConnectivity();
    
    // Test NTP time sync
    Serial.println("\nNTP Time Sync:");
    testNTPConnectivity();
    
    Serial.println();
}

void testPingConnectivity(const char* target) {
    Serial.printf("Ping %s: ", target);
    
    if (Ping.ping(target, 3)) {
        Serial.printf("✓ %d ms avg\n", Ping.averageTime());
    } else {
        Serial.println("✗ Failed");
    }
}

void testPortConnectivity(const char* service, const char* host, int port) {
    Serial.printf("%s (%s:%d): ", service, host, port);
    
    WiFiClient client;
    if (client.connect(host, port)) {
        Serial.println("✓ Connected");
        client.stop();
    } else {
        Serial.println("✗ Failed");
    }
}

void testHTTPConnectivity() {
    HTTPClient http;
    http.begin("http://httpbin.org/ip");
    http.setTimeout(5000);
    
    int httpCode = http.GET();
    if (httpCode == 200) {
        Serial.println("✓ HTTP request successful");
    } else {
        Serial.printf("✗ HTTP failed: %d\n", httpCode);
    }
    http.end();
}

void testNTPConnectivity() {
    configTime(0, 0, "pool.ntp.org");
    
    Serial.print("Syncing time");
    int attempts = 0;
    while (time(nullptr) < 1000000000L && attempts < 50) {
        delay(100);
        Serial.print(".");
        attempts++;
    }
    
    if (time(nullptr) > 1000000000L) {
        Serial.println(" ✓ NTP sync successful");
    } else {
        Serial.println(" ✗ NTP sync failed");
    }
}

void diagnoseWiFiFailure() {
    Serial.println("\nDiagnosing WiFi connection failure:");
    
    switch (WiFi.status()) {
        case WL_NO_SSID_AVAIL:
            Serial.println("- SSID not found (check network name)");
            break;
        case WL_CONNECT_FAILED:
            Serial.println("- Connection failed (check password)");
            break;
        case WL_CONNECTION_LOST:
            Serial.println("- Connection lost (check signal strength)");
            break;
        case WL_DISCONNECTED:
            Serial.println("- Disconnected (check network availability)");
            break;
        default:
            Serial.printf("- Unknown status: %d\n", WiFi.status());
    }
}

void printDiagnosticSummary() {
    Serial.println("📋 DIAGNOSTIC SUMMARY");
    Serial.println("====================");
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("✅ Overall Status: CONNECTED");
        Serial.printf("📍 Network: %s (%d dBm)\n", ssid, WiFi.RSSI());
        Serial.printf("🌐 IP Address: %s\n", WiFi.localIP().toString().c_str());
        Serial.printf("🚪 Gateway: %s\n", WiFi.gatewayIP().toString().c_str());
    } else {
        Serial.println("❌ Overall Status: DISCONNECTED");
        Serial.println("🔧 Check: Power, credentials, signal strength");
    }
    
    Serial.println("\n📞 Support: info@dynamicdevices.co.uk");
}

void loop() {
    delay(300000); // Re-run diagnostics every 5 minutes
    
    Serial.println("\n🔄 Periodic Network Health Check");
    Serial.println("=================================");
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.printf("Signal: %d dBm | ", WiFi.RSSI());
        
        if (Ping.ping("8.8.8.8", 1)) {
            Serial.printf("Internet: ✓ (%d ms)\n", Ping.averageTime());
        } else {
            Serial.println("Internet: ✗");
        }
    } else {
        Serial.println("Status: Disconnected - attempting reconnect");
        WiFi.reconnect();
    }
}
```

### Exercise 6.2: Troubleshooting Scenarios

#### Scenario 1: IP Address Conflict
**Problem:** Two devices assigned the same IP address
**Symptoms:** Intermittent connectivity, ARP table confusion
**Solution:**
1. Use `arp -a` to examine ARP table
2. Check for duplicate IP assignments
3. Reconfigure one device with different static IP
4. Or switch to DHCP to avoid conflicts

#### Scenario 2: DHCP Pool Exhaustion
**Problem:** DHCP server runs out of available IP addresses
**Symptoms:** New devices can't get IP addresses
**Solution:**
1. Check DHCP server configuration
2. Extend DHCP pool range
3. Reduce lease times for faster recycling
4. Remove unused static IP reservations

#### Scenario 3: DNS Resolution Failure
**Problem:** Domain names don't resolve to IP addresses
**Symptoms:** HTTP requests to domains fail, IP addresses work
**Solution:**
1. Test with `nslookup` or `dig` commands
2. Check DNS server configuration
3. Try alternative DNS servers (8.8.8.8, 1.1.1.1)
4. Verify network connectivity to DNS servers

---

## Assessment & Project Guidelines

### Lab Completion Requirements

#### Technical Competencies
- [ ] **Network Configuration:** Successfully configure both static and DHCP IP addressing
- [ ] **Protocol Analysis:** Use Wireshark to capture and analyze network traffic
- [ ] **Troubleshooting:** Apply systematic methodology to diagnose network issues
- [ ] **Implementation:** Code functional TCP and UDP communication
- [ ] **Services:** Implement HTTP, DNS, and NTP client functionality

#### Practical Skills Demonstrated
- [ ] Configure ESP32 network interfaces correctly
- [ ] Capture meaningful packet traces with Wireshark
- [ ] Identify and resolve common network problems
- [ ] Implement reliable embedded network communication
- [ ] Document findings and solutions clearly

### Final Project: Complete IoT Network System

#### Project Requirements
Design and implement a complete IoT sensor network demonstrating all learned concepts:

1. **Multi-Device Network (3+ ESP32 units):**
   - Mixed static and DHCP addressing
   - Different communication protocols per device
   - Proper error handling and reconnection logic

2. **Protocol Implementation:**
   - HTTP REST API client for cloud connectivity
   - UDP sensor data broadcasting for local discovery
   - TCP server for configuration interface
   - DNS resolution for flexible server addressing
   - NTP time synchronization for accurate timestamps

3. **Network Analysis:**
   - Wireshark captures of all traffic types
   - Performance analysis and optimization
   - Troubleshooting documentation

4. **Documentation:**
   - Network topology diagram
   - Configuration procedures
   - Troubleshooting guide
   - Performance test results

### Support & Resources

**Dynamic Devices Ltd**  
Training Support: **info@dynamicdevices.co.uk**

**Additional Resources:**
- Command reference cards provided
- Code examples repository: GitHub
- Wireshark tutorials and filters
- RFC specifications for protocols

---

*This hands-on lab guide provides practical experience with the networking concepts essential for embedded IoT development. The exercises progress from basic configuration through advanced troubleshooting, reflecting real-world embedded engineering challenges.*

**© 2025 Dynamic Devices Ltd - Licensed under Creative Commons CC BY-NC-ND 4.0**

---

## Lab 1: Network Interface Discovery & Configuration

### Objective
Understand how to identify and configure network interfaces on both embedded devices and host computers.

### Part A: Host Computer Analysis

#### Exercise 1.1: Discover Network Interfaces
Open terminal/command prompt and run these commands:

**Windows:**
```cmd
ipconfig /all
arp -a
netstat -rn
```

**Linux/Mac:**
```bash
ifconfig -a          # or: ip addr show
arp -a               # View ARP table
route -n             # or: ip route show
```

**Tasks:**
1. Identify your Wi-Fi interface name and IP address
2. Find your default gateway
3. Note the MAC address of your Wi-Fi adapter
4. Determine what class of network you're on (A, B, or C)

#### Exercise 1.2: Calculate Network Information
Using your IP address and subnet mask:

```
Example: IP = 192.168.1.100, Subnet = 255.255.255.0 (/24)

Calculate:
- Network address: ___________
- Broadcast address: ___________
- Number of possible hosts: ___________
- Your network class: ___________
```

### Part B: ESP32 Network Configuration

#### Exercise 1.3: Basic Wi-Fi Connection

Create a new Arduino sketch:

```cpp
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
    Serial.begin(115200);
    delay(1000);
    
    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println();
    Serial.println("WiFi connected!");
    printNetworkInfo();
}

void loop() {
    // Check connection every 10 seconds
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("Still connected");
    } else {
        Serial.println("Connection lost - attempting reconnect");
        WiFi.reconnect();
    }
    delay(10000);
}

void printNetworkInfo() {
    Serial.println("=== Network Information ===");
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Subnet Mask: ");
    Serial.println(WiFi.subnetMask());
    Serial.print("Gateway: ");
    Serial.println(WiFi.gatewayIP());
    Serial.print("DNS: ");
    Serial.println(WiFi.dnsIP());
    Serial.print("MAC Address: ");
    Serial.println(WiFi.macAddress());
    Serial.print("Signal Strength: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
}
```

**Tasks:**
1. Upload code and record all network information
2. Compare ESP32's network settings with your computer's
3. Verify they're on the same network
4. Test signal strength from different locations

---

## Lab 2: Packet Analysis with Wireshark

### Objective
Learn to capture and analyse network traffic to understand protocol layers.

### Exercise 2.1: HTTP Traffic Analysis

#### Setup Wireshark Capture
1. Install Wireshark on your computer
2. Start capturing on your Wi-Fi interface
3. Filter traffic: `host [ESP32_IP_ADDRESS]`

#### ESP32 HTTP Client Code
```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverURL = "http://httpbin.org/post";

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("Connected!");
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverURL);
        http.addHeader("Content-Type", "application/json");
        
        // Create JSON payload
        StaticJsonDocument<200> doc;
        doc["sensor_id"] = "ESP32_001";
        doc["temperature"] = 23.5;
        doc["humidity"] = 65.2;
        doc["timestamp"] = millis();
        
        String jsonString;
        serializeJson(doc, jsonString);
        
        Serial.println("Sending HTTP POST request...");
        int httpResponseCode = http.POST(jsonString);
        
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.print("Response Code: ");
            Serial.println(httpResponseCode);
            Serial.print("Response: ");
            Serial.println(response);
        } else {
            Serial.print("Error: ");
            Serial.println(httpResponseCode);
        }
        
        http.end();
    }
    
    delay(30000); // Send every 30 seconds
}
```

#### Analysis Tasks
1. **Identify TCP Three-Way Handshake:**
   - Find SYN packet
   - Find SYN-ACK packet  
   - Find ACK packet
   - Note sequence numbers

2. **Examine HTTP Request:**
   - Locate HTTP POST packet
   - Identify all headers
   - Find JSON payload
   - Note packet size

3. **Analyse Protocol Layers:**
   - Ethernet header (MAC addresses)
   - IP header (source/destination IPs)
   - TCP header (ports, sequence numbers)
   - HTTP application data

### Exercise 2.2: UDP vs TCP Comparison

#### UDP Code Example
```cpp
#include <WiFi.h>
#include <WiFiUdp.h>

WiFiUDP udp;
const char* udpAddress = "192.168.1.100"; // Replace with target IP
const int udpPort = 8080;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
    }
    
    udp.begin(udpPort);
}

void loop() {
    String message = String(millis()) + ",23.5,65.2"; // timestamp,temp,humidity
    
    udp.beginPacket(udpAddress, udpPort);
    udp.print(message);
    udp.endPacket();
    
    Serial.println("UDP packet sent: " + message);
    delay(5000);
}
```

**Comparison Tasks:**
1. Capture both TCP and UDP traffic
2. Compare packet sizes and overhead
3. Note connection establishment differences
4. Analyse error handling mechanisms

---

## Lab 3: MQTT Implementation

### Objective
Implement MQTT communication for IoT sensor data transmission.

### Exercise 3.1: MQTT Publisher

#### Install Required Library
In Arduino IDE: `Sketch > Include Library > Manage Libraries`
Search for "PubSubClient" by Nick O'Leary

#### MQTT Publisher Code
```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "test.mosquitto.org"; // Public test broker
const int mqtt_port = 1883;
const char* client_id = "ESP32_Sensor_001";

WiFiClient espClient;
PubSubClient client(espClient);

// Sensor simulation variables
float temperature = 20.0;
float humidity = 50.0;

void setup() {
    Serial.begin(115200);
    setup_wifi();
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);
}

void setup_wifi() {
    delay(10);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("WiFi connected");
}

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Message received on topic: ");
    Serial.println(topic);
    
    String message;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.print("Message: ");
    Serial.println(message);
}

void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        if (client.connect(client_id)) {
            Serial.println("connected");
            // Subscribe to commands topic
            client.subscribe("sensors/commands");
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}

void publishSensorData() {
    // Simulate sensor readings
    temperature += random(-10, 10) / 10.0;
    humidity += random(-5, 5) / 10.0;
    
    // Create JSON payload
    StaticJsonDocument<200> doc;
    doc["device_id"] = client_id;
    doc["temperature"] = temperature;
    doc["humidity"] = humidity;
    doc["timestamp"] = millis();
    doc["rssi"] = WiFi.RSSI();
    
    char jsonBuffer[256];
    serializeJson(doc, jsonBuffer);
    
    // Publish to different topics
    client.publish("sensors/temperature", String(temperature).c_str(), true);
    client.publish("sensors/humidity", String(humidity).c_str(), true);
    client.publish("sensors/data", jsonBuffer, true);
    
    Serial.println("Published sensor data:");
    Serial.println(jsonBuffer);
}

void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();
    
    static unsigned long lastMsg = 0;
    unsigned long now = millis();
    if (now - lastMsg > 10000) { // Publish every 10 seconds
        lastMsg = now;
        publishSensorData();
    }
}
```

### Exercise 3.2: MQTT Analysis Tasks

1. **Use MQTT Client Tools:**
   ```bash
   # Install mosquitto clients (Linux/Mac)
   brew install mosquitto  # Mac
   sudo apt install mosquitto-clients  # Ubuntu
   
   # Subscribe to topics
   mosquitto_sub -h test.mosquitto.org -t "sensors/+"
   
   # Publish test messages
   mosquitto_pub -h test.mosquitto.org -t "sensors/commands" -m "led_on"
   ```

2. **Protocol Analysis:**
   - Capture MQTT traffic in Wireshark
   - Identify CONNECT, CONNACK, PUBLISH, SUBSCRIBE packets
   - Examine QoS levels and retained messages
   - Compare with HTTP in terms of overhead

3. **QoS Testing:**
   Modify code to test different QoS levels:
   ```cpp
   client.publish("sensors/data", jsonBuffer, true);  // QoS 0, retained
   client.publish("sensors/critical", jsonBuffer, 1); // QoS 1
   ```

---

## Lab 4: Network Troubleshooting

### Objective
Learn systematic approaches to diagnosing network connectivity issues.

### Exercise 4.1: Connectivity Testing

#### Create Network Diagnostic Code
```cpp
#include <WiFi.h>
#include <ESPping.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("\n=== Network Diagnostics ===");
    runDiagnostics();
}

void runDiagnostics() {
    // Test 1: Basic connectivity
    Serial.println("1. Testing basic connectivity...");
    printNetworkInfo();
    
    // Test 2: Gateway connectivity
    Serial.println("\n2. Testing gateway connectivity...");
    testPing(WiFi.gatewayIP().toString());
    
    // Test 3: DNS resolution
    Serial.println("\n3. Testing DNS resolution...");
    testPing("8.8.8.8");        // Google DNS
    testPing("google.com");     // Domain name resolution
    
    // Test 4: Internet connectivity
    Serial.println("\n4. Testing internet connectivity...");
    testHTTP("http://httpbin.org/ip");
}

void printNetworkInfo() {
    Serial.printf("IP: %s\n", WiFi.localIP().toString().c_str());
    Serial.printf("Gateway: %s\n", WiFi.gatewayIP().toString().c_str());
    Serial.printf("DNS: %s\n", WiFi.dnsIP().toString().c_str());
    Serial.printf("Subnet: %s\n", WiFi.subnetMask().toString().c_str());
}

void testPing(String target) {
    Serial.printf("Pinging %s... ", target.c_str());
    
    bool success = Ping.ping(target.c_str(), 3);
    if (success) {
        Serial.printf("SUCCESS (avg: %d ms)\n", Ping.averageTime());
    } else {
        Serial.println("FAILED");
    }
}

void testHTTP(String url) {
    HTTPClient http;
    http.begin(url);
    int httpCode = http.GET();
    
    Serial.printf("HTTP GET %s: ", url.c_str());
    if (httpCode > 0) {
        Serial.printf("SUCCESS (code: %d)\n", httpCode);
        if (httpCode == 200) {
            String payload = http.getString();
            Serial.printf("Response: %s\n", payload.c_str());
        }
    } else {
        Serial.printf("FAILED (error: %s)\n", http.errorToString(httpCode).c_str());
    }
    http.end();
}

void loop() {
    delay(30000);
    Serial.println("\n=== Running periodic diagnostics ===");
    runDiagnostics();
}
```

### Exercise 4.2: Common Issues & Solutions

#### Scenario-Based Troubleshooting

**Scenario 1: Device Can't Connect to Wi-Fi**
```cpp
void debugWiFiConnection() {
    Serial.println("WiFi Connection Debug:");
    Serial.printf("Status: %d\n", WiFi.status());
    
    switch(WiFi.status()) {
        case WL_IDLE_STATUS:
            Serial.println("WiFi idle");
            break;
        case WL_NO_SSID_AVAIL:
            Serial.println("SSID not available");
            scanNetworks();
            break;
        case WL_SCAN_COMPLETED:
            Serial.println("Scan completed");
            break;
        case WL_CONNECTED:
            Serial.println("Connected");
            break;
        case WL_CONNECT_FAILED:
            Serial.println("Connection failed - check password");
            break;
        case WL_CONNECTION_LOST:
            Serial.println("Connection lost");
            break;
        case WL_DISCONNECTED:
            Serial.println("Disconnected");
            break;
        default:
            Serial.println("Unknown status");
    }
}

void scanNetworks() {
    Serial.println("Scanning for networks...");
    int n = WiFi.scanNetworks();
    for (int i = 0; i < n; i++) {
        Serial.printf("%d: %s (%d dBm) %s\n", 
                     i, WiFi.SSID(i).c_str(), WiFi.RSSI(i),
                     WiFi.encryptionType(i) == WIFI_AUTH_OPEN ? "Open" : "Secured");
    }
}
```

**Tasks:**
1. Test with wrong password
2. Test with non-existent SSID
3. Test with weak signal (move device far from router)
4. Document error codes and solutions

---

## Lab 5: Performance Testing & Optimisation

### Objective
Measure and optimise network performance for embedded applications.

### Exercise 5.1: Throughput Testing

```cpp
#include <WiFi.h>
#include <WiFiUdp.h>

WiFiUDP udp;
const int testPort = 8080;
const int testDuration = 10000; // 10 seconds
const int packetSize = 1024;

void setup() {
    Serial.begin(115200);
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
    }
    
    udp.begin(testPort);
    Serial.println("Starting throughput test...");
}

void measureThroughput() {
    byte testData[packetSize];
    memset(testData, 0xAA, packetSize); // Fill with test pattern
    
    unsigned long startTime = millis();
    unsigned long endTime = startTime + testDuration;
    int packetCount = 0;
    
    while (millis() < endTime) {
        udp.beginPacket("192.168.1.100", testPort);
        udp.write(testData, packetSize);
        udp.endPacket();
        packetCount++;
        
        delayMicroseconds(100); // Small delay to prevent overwhelming
    }
    
    unsigned long actualDuration = millis() - startTime;
    float throughputKbps = (packetCount * packetSize * 8.0) / actualDuration;
    
    Serial.printf("Throughput Test Results:\n");
    Serial.printf("Packets sent: %d\n", packetCount);
    Serial.printf("Duration: %lu ms\n", actualDuration);
    Serial.printf("Throughput: %.2f kbps\n", throughputKbps);
    Serial.printf("Packet rate: %.2f packets/sec\n", packetCount * 1000.0 / actualDuration);
}

void loop() {
    measureThroughput();
    delay(5000);
}
```

### Exercise 5.2: Latency Measurement

```cpp
void measureLatency() {
    const int numPings = 10;
    unsigned long totalTime = 0;
    int successCount = 0;
    
    for (int i = 0; i < numPings; i++) {
        unsigned long startTime = micros();
        
        if (Ping.ping(WiFi.gatewayIP().toString().c_str(), 1)) {
            unsigned long latency = micros() - startTime;
            totalTime += latency;
            successCount++;
            Serial.printf("Ping %d: %lu μs\n", i+1, latency);
        } else {
            Serial.printf("Ping %d: TIMEOUT\n", i+1);
        }
        
        delay(100);
    }
    
    if (successCount > 0) {
        float avgLatency = totalTime / (float)successCount;
        Serial.printf("Average latency: %.2f μs (%.2f ms)\n", 
                     avgLatency, avgLatency / 1000.0);
        Serial.printf("Success rate: %d/%d (%.1f%%)\n", 
                     successCount, numPings, 
                     successCount * 100.0 / numPings);
    }
}
```

---

## Assessment Checklist

### Lab Completion Requirements

- [ ] **Lab 1 Complete:** Network interface analysis and ESP32 configuration
- [ ] **Lab 2 Complete:** Packet capture and analysis with Wireshark
- [ ] **Lab 3 Complete:** MQTT implementation and testing
- [ ] **Lab 4 Complete:** Network troubleshooting exercises
- [ ] **Lab 5 Complete:** Performance testing and measurement

### Knowledge Verification

- [ ] Can identify network classes and calculate subnet information
- [ ] Understands the difference between MAC and IP addressing
- [ ] Can analyse protocol layers in packet captures
- [ ] Knows when to use TCP vs UDP for different applications
- [ ] Can implement and debug MQTT communication
- [ ] Can systematically troubleshoot network connectivity issues
- [ ] Understands performance implications of different protocols

### Practical Skills Demonstrated

- [ ] Successfully configured ESP32 network settings
- [ ] Captured and analysed network traffic
- [ ] Implemented working MQTT publisher/subscriber
- [ ] Diagnosed and resolved connectivity problems
- [ ] Measured network performance metrics
- [ ] Documented findings and solutions

---

## Additional Resources

### Command Reference
```bash
# Network diagnostics
ping google.com
traceroute google.com       # Linux/Mac
tracert google.com          # Windows
nslookup google.com
dig google.com             # Linux/Mac

# Interface information
ifconfig                   # Linux/Mac
ipconfig                   # Windows
ip addr show              # Linux
ip route show             # Linux
netstat -rn               # Routing table
arp -a                    # ARP table

# Wireshark filters
host 192.168.1.100        # Traffic to/from specific IP
port 80                   # HTTP traffic
tcp.port == 1883          # MQTT traffic
udp                       # All UDP traffic
```

### Troubleshooting Flowchart
1. **Physical Layer:** Check cables, Wi-Fi signal strength
2. **Data Link Layer:** Verify MAC addresses, switch connectivity
3. **Network Layer:** Check IP configuration, routing, ping tests
4. **Transport Layer:** Verify port numbers, firewall rules
5. **Application Layer:** Test specific protocols, check logs