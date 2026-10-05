"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"PATIENT" | "DOCTOR" | "ADMIN">("PATIENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "PATIENT") router.push("/patient/dashboard");
    else if (role === "DOCTOR") router.push("/doctor/dashboard");
    else router.push("/admin");
  };

  const handleQuickDemoLogin = (selectedRole: "PATIENT" | "DOCTOR" | "ADMIN") => {
    if (selectedRole === "PATIENT") {
      router.push("/patient/dashboard");
    } else if (selectedRole === "DOCTOR") {
      router.push("/doctor/dashboard");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
              <Eye className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Opti<span className="text-teal-600">Cure</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">Sign in to your Healthcare Portal</h2>
          <p className="text-xs text-slate-500">
            Access appointments, digital prescriptions, and clinical records
          </p>
        </div>

        {/* Quick Demo Switcher Card */}
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Instant Demo Access (1-Click)
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("PATIENT")}
              className="py-2 px-1 rounded-xl bg-white hover:bg-teal-600 hover:text-white text-teal-900 border border-teal-300 transition-all shadow-xs text-center"
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("DOCTOR")}
              className="py-2 px-1 rounded-xl bg-white hover:bg-teal-600 hover:text-white text-teal-900 border border-teal-300 transition-all shadow-xs text-center"
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin("ADMIN")}
              className="py-2 px-1 rounded-xl bg-white hover:bg-teal-600 hover:text-white text-teal-900 border border-teal-300 transition-all shadow-xs text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-5">
          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setRole("PATIENT")}
              className={`py-2 rounded-lg transition-all ${
                role === "PATIENT" ? "bg-white text-teal-800 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setRole("DOCTOR")}
              className={`py-2 rounded-lg transition-all ${
                role === "DOCTOR" ? "bg-white text-teal-800 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => setRole("ADMIN")}
              className={`py-2 rounded-lg transition-all ${
                role === "ADMIN" ? "bg-white text-teal-800 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Email or Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder={
                    role === "PATIENT"
                      ? "patient@example.com or +91 98765 43210"
                      : role === "DOCTOR"
                      ? "doctor@opticurehealth.com"
                      : "admin@opticurehealth.com"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Password</label>
                <a href="#" className="text-teal-700 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  defaultValue="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Sign In as {role}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Don't have an OptiCure account?{" "}
            <Link href="/auth/signup" className="text-teal-700 font-bold hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
