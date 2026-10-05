import os from "os";
import QRCode from "qrcode";

export function getLocalIpAddresses() {
  const nets = os.networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    const interfaces = nets[name];
    if (!interfaces) continue;
    for (const net of interfaces) {
      if (net.family === "IPv4" && !net.internal && !net.address.startsWith("169.254")) {
        const isWiFi = name.toLowerCase().includes("wi-fi") || name.toLowerCase().includes("wireless") || name.toLowerCase().includes("wlan");
        results.push({
          interface: name,
          ip: net.address,
          isWiFi
        });
      }
    }
  }

  // Sort so Wi-Fi comes first
  results.sort((a, b) => (b.isWiFi ? 1 : 0) - (a.isWiFi ? 1 : 0));
  return results;
}

export function getPrimaryIp() {
  const ips = getLocalIpAddresses();
  return ips.length > 0 ? ips[0].ip : "127.0.0.1";
}

async function main() {
  const port = process.env.PORT || "3000";
  const ips = getLocalIpAddresses();
  const primaryIp = getPrimaryIp();
  const mobileUrl = `http://${primaryIp}:${port}`;
  const localUrl = `http://localhost:${port}`;

  console.log("\n========================================================");
  console.log("   OptiCure Healthcare - Mobile Device Testing Utility");
  console.log("========================================================\n");
  console.log(`💻 Local Computer:  ${localUrl}`);
  console.log(`📱 Mobile Device:   ${mobileUrl}`);

  if (ips.length > 1) {
    console.log("\nAvailable Network Interfaces:");
    ips.forEach((item) => {
      console.log(` - ${item.interface}: http://${item.ip}:${port} ${item.isWiFi ? "(Wi-Fi Recommended)" : ""}`);
    });
  }

  console.log("\n📲 Scan the QR Code below with your mobile phone camera:");
  console.log("--------------------------------------------------------");

  try {
    const qrString = await QRCode.toString(mobileUrl, {
      type: "terminal",
      small: true
    });
    console.log(qrString);
  } catch (err) {
    console.log("Could not generate terminal QR:", err.message);
  }

  console.log("--------------------------------------------------------");
  console.log("Troubleshooting Mobile Connection:");
  console.log("1. Make sure your phone and computer are on the SAME Wi-Fi network.");
  console.log("2. If your phone cannot connect, Windows Firewall may be blocking port " + port + ".");
  console.log("   Run PowerShell as Administrator and execute:");
  console.log(`   New-NetFirewallRule -DisplayName "Next.js Dev (Port ${port})" -Direction Inbound -LocalPort ${port} -Protocol TCP -Action Allow\n`);
}

main().catch(console.error);
