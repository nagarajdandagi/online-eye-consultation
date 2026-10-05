"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"PATIENT" | "DOCTOR">("PATIENT");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "PATIENT") {
      router.push("/patient/dashboard");
    } else {
      router.push("/doctor/dashboard");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 md:py-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-md">
              <Eye className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Opti<span className="text-teal-600">Cure</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-slate-900">Create an OptiCure Account</h2>
          <p className="text-xs text-slate-500">
            Join thousands of patients and ophthalmologists for precision eye care
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-5">
          {/* Role selector */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setRole("PATIENT")}
              className={`py-2 rounded-lg transition-all ${
                role === "PATIENT" ? "bg-white text-teal-800 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Patient Registration
            </button>
            <button
              type="button"
              onClick={() => setRole("DOCTOR")}
              className={`py-2 rounded-lg transition-all ${
                role === "DOCTOR" ? "bg-white text-teal-800 shadow-xs" : "hover:text-slate-900"
              }`}
            >
              Doctor Onboarding
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Mobile Phone *</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {role === "DOCTOR" && (
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Medical Council Registration No. *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KMC-12345"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono font-medium focus:ring-2 focus:ring-teal-600"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Create Password *</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Complete {role === "PATIENT" ? "Patient" : "Doctor"} Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-teal-700 font-bold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
