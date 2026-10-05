import { NextResponse } from "next/server";
import os from "os";
import QRCode from "qrcode";

export async function GET() {
  const nets = os.networkInterfaces();
  const interfaces: Array<{ name: string; ip: string; isWiFi: boolean; url: string }> = [];
  const port = process.env.PORT || "3000";

  for (const name of Object.keys(nets)) {
    const ifaces = nets[name];
    if (!ifaces) continue;
    for (const net of ifaces) {
      if (net.family === "IPv4" && !net.internal && !net.address.startsWith("169.254")) {
        const isWiFi =
          name.toLowerCase().includes("wi-fi") ||
          name.toLowerCase().includes("wireless") ||
          name.toLowerCase().includes("wlan");
        interfaces.push({
          name,
          ip: net.address,
          isWiFi,
          url: `http://${net.address}:${port}`
        });
      }
    }
  }

  // Sort so Wi-Fi is prioritized
  interfaces.sort((a, b) => (b.isWiFi ? 1 : 0) - (a.isWiFi ? 1 : 0));

  const primary = interfaces.length > 0 ? interfaces[0] : { name: "Local", ip: "127.0.0.1", isWiFi: false, url: `http://localhost:${port}` };
  const mobileUrl = primary.url;
  const localUrl = `http://localhost:${port}`;

  let qrCodeDataUrl = "";
  try {
    qrCodeDataUrl = await QRCode.toDataURL(mobileUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: "#0f172a",
        light: "#ffffff"
      }
    });
  } catch (e: any) {
    console.error("QR Code error:", e);
  }

  return NextResponse.json({
    success: true,
    port,
    localUrl,
    mobileUrl,
    primaryInterface: primary.name,
    primaryIp: primary.ip,
    interfaces,
    qrCodeDataUrl,
    firewallCommand: `New-NetFirewallRule -DisplayName "Next.js Dev (Port ${port})" -Direction Inbound -LocalPort ${port} -Protocol TCP -Action Allow`
  });
}
