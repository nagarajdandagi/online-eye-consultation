"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Smartphone,
  Wifi,
  Shield,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Laptop,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  QrCode,
  ArrowRight
} from "lucide-react";

interface NetworkInfo {
  port: string;
  localUrl: string;
  mobileUrl: string;
  primaryInterface: string;
  primaryIp: string;
  interfaces: Array<{ name: string; ip: string; isWiFi: boolean; url: string }>;
  qrCodeDataUrl: string;
  firewallCommand: string;
}

export default function MobileTestingPage() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [selectedViewport, setSelectedViewport] = useState<{ name: string; width: number; height: number; device: string } | null>(null);

  const fetchNetwork = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/dev/network");
      const data = await res.json();
      setNetworkInfo(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetwork();
  }, []);

  const copyToClipboard = (text: string, type: "url" | "cmd") => {
    navigator.clipboard.writeText(text);
    if (type === "url") {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  const VIEWPORTS = [
    { name: "Small Android", width: 360, height: 800, device: "Galaxy S20 / A-series" },
    { name: "iPhone Standard", width: 390, height: 844, device: "iPhone 13 / 14 / 15" },
    { name: "Large Android", width: 412, height: 915, device: "Pixel 7 / 8 / Galaxy Ultra" },
    { name: "iPad Mini / Tablet", width: 768, height: 1024, device: "iPad / Galaxy Tab" },
    { name: "iPad Pro", width: 1024, height: 1366, device: "iPad Pro 12.9\"" },
    { name: "Laptop Small", width: 1440, height: 900, device: "MacBook Air / Dell XPS" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Developer Utility
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Section 36 Compliance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-teal-400" />
              Mobile Device Testing & LAN Access
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Access and test OptiCure Telehealth from real smartphone devices connected to the same Wi-Fi.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href="/opticure-eye-health.zip"
              download="opticure-eye-health.zip"
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>⬇ Download Project (.ZIP)</span>
            </a>
            <button
              onClick={fetchNetwork}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh IP</span>
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* QR Code and Quick Connect Cards */}
        {loading || !networkInfo ? (
          <div className="p-16 text-center bg-slate-800/50 rounded-3xl border border-slate-800 space-y-3">
            <RefreshCw className="w-8 h-8 text-teal-400 animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-300">Detecting local network interfaces...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* QR Code Card */}
            <div className="md:col-span-5 bg-slate-800/70 rounded-3xl p-6 sm:p-8 border border-slate-700/80 flex flex-col items-center text-center space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center justify-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  Instant Scan & Connect
                </span>
                <h3 className="text-base font-bold text-white">Scan with Phone Camera</h3>
                <p className="text-[11px] text-slate-400">
                  Open Camera on iOS or Google Lens / QR Scanner on Android
                </p>
              </div>

              {/* Dynamic QR Code */}
              <div className="p-4 bg-white rounded-2xl shadow-lg border-4 border-teal-500/20">
                {networkInfo.qrCodeDataUrl ? (
                  <img
                    src={networkInfo.qrCodeDataUrl}
                    alt="Mobile Access QR Code"
                    className="w-56 h-56 rounded-lg object-contain mx-auto"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-xs">
                    QR Generation...
                  </div>
                )}
              </div>

              <div className="w-full space-y-2">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-left flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile URL</span>
                    <span className="font-mono text-xs font-bold text-teal-300 truncate block">
                      {networkInfo.mobileUrl}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(networkInfo.mobileUrl, "url")}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 shrink-0"
                    title="Copy URL"
                  >
                    {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Connection Instructions & Network Details */}
            <div className="md:col-span-7 space-y-6">
              {/* Network Status Box */}
              <div className="bg-slate-800/70 rounded-3xl p-6 border border-slate-700/80 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-teal-400" />
                  Active Network Detection
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Primary Interface</span>
                    <span className="font-bold text-white text-sm flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {networkInfo.primaryInterface}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">Server Port</span>
                    <span className="font-mono font-bold text-teal-300 text-sm mt-0.5 block">
                      {networkInfo.port} (0.0.0.0)
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    All Detected Network Adapters:
                  </span>
                  <div className="space-y-1.5">
                    {networkInfo.interfaces.map((iface) => (
                      <div
                        key={iface.name}
                        className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">{iface.name}</span>
                          {iface.isWiFi && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30">
                              Wi-Fi
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs text-slate-400">{iface.url}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Connection Instructions */}
              <div className="bg-slate-800/70 rounded-3xl p-6 border border-slate-700/80 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  3 Simple Steps to Connect Your Phone
                </h3>

                <ol className="space-y-3 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                  <li className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800">
                    <strong className="text-white">Connect to Same Wi-Fi:</strong> Ensure your smartphone is connected to the same local Wi-Fi router as this computer (not mobile cellular data).
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800">
                    <strong className="text-white">Scan QR Code or Type URL:</strong> Scan the QR code with your camera or open your mobile browser (Safari, Chrome, Samsung Internet) and visit:{" "}
                    <code className="text-teal-300 font-bold font-mono px-1 py-0.5 bg-slate-800 rounded">
                      {networkInfo.mobileUrl}
                    </code>
                  </li>
                  <li className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800">
                    <strong className="text-white">If Connection Fails (Firewall):</strong> Windows Firewall sometimes blocks incoming port 3000. Run the command below in PowerShell as Administrator to allow it instantly.
                  </li>
                </ol>

                {/* Firewall Command Box */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold">
                    <span>Windows Firewall PowerShell Command</span>
                    <button
                      onClick={() => copyToClipboard(networkInfo.firewallCommand, "cmd")}
                      className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCmd ? "Copied" : "Copy Command"}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono text-slate-300 whitespace-pre-wrap break-all bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {networkInfo.firewallCommand}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsive Testing Viewport Matrix */}
        <div className="bg-slate-800/70 rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-teal-400" />
                Required Mobile Breakpoint Verification (Spec #36)
              </h3>
              <p className="text-xs text-slate-400">
                Test responsive layouts, touch targets (&ge;44px), sticky CTAs, and hamburger drawers across standard screen dimensions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {VIEWPORTS.map((vp) => (
              <div
                key={vp.name}
                className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 transition-all text-xs space-y-1"
              >
                <span className="font-bold text-slate-200 block truncate">{vp.name}</span>
                <span className="font-mono text-teal-400 font-bold block">
                  {vp.width} × {vp.height}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">{vp.device}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
