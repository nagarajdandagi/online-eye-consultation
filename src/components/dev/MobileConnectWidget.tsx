"use client";

import React, { useState, useEffect } from "react";
import { Smartphone, X, QrCode, Wifi, Copy, Check, ExternalLink } from "lucide-react";

export default function MobileConnectWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<{
    mobileUrl: string;
    localUrl: string;
    primaryIp: string;
    primaryInterface: string;
    qrCodeDataUrl: string;
    firewallCommand: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/dev/network")
      .then((r) => r.json())
      .then((d) => setNetworkInfo(d))
      .catch((e) => console.error("MobileConnectWidget error:", e));
  }, []);

  if (!networkInfo) return null;

  const copyUrl = () => {
    if (networkInfo?.mobileUrl) {
      navigator.clipboard.writeText(networkInfo.mobileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-bold shadow-lg border border-slate-700/80 backdrop-blur-md flex items-center gap-2 group transition-all cursor-pointer hover:scale-105"
        title="Open Mobile Testing QR Code & LAN URL"
      >
        <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
        <Smartphone className="w-3.5 h-3.5 text-teal-400" />
        <span className="hidden sm:inline">Mobile Test (LAN)</span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-white space-y-4 shadow-2xl animate-scale-in text-center relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center justify-center gap-1">
                <Wifi className="w-3 h-3" />
                Wi-Fi: {networkInfo.primaryInterface} ({networkInfo.primaryIp})
              </span>
              <h3 className="text-base font-black">Scan with Phone Camera</h3>
              <p className="text-xs text-slate-400">
                Point your phone's camera at this QR code to open the site directly on your mobile device.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="p-3 bg-white rounded-2xl mx-auto w-52 h-52 flex items-center justify-center shadow-md">
              {networkInfo.qrCodeDataUrl ? (
                <img
                  src={networkInfo.qrCodeDataUrl}
                  alt="Mobile Access QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-slate-400 text-xs">Generating QR...</div>
              )}
            </div>

            {/* Mobile URL & Copy */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between gap-2 text-xs">
              <span className="font-mono text-teal-300 truncate text-[11px]">
                {networkInfo.mobileUrl}
              </span>
              <button
                onClick={copyUrl}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <a
                href="/opticure-eye-health.zip"
                download="opticure-eye-health.zip"
                className="w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>📦 Download Complete Project (.ZIP)</span>
              </a>
            </div>

            <p className="text-[10px] text-slate-400">
              Note: Smartphone and computer must be on the same Wi-Fi.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
