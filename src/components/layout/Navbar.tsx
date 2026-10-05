"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Eye,
  MapPin,
  Search,
  Video,
  Building2,
  Calendar,
  User,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  PhoneCall,
  Activity,
  Stethoscope
} from "lucide-react";
import { CITIES } from "@/lib/data/doctors";

export default function Navbar() {
  const pathname = usePathname();
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show top banner inside telehealth video room to minimize clutter
  const isVideoRoom = pathname.startsWith("/consultation/");

  return (
    <>
      {/* Top Clinical Announcement & Emergency Trust Bar */}
      {!isVideoRoom && (
        <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                NABH & QCI Accredited Eye Care
              </span>
              <span className="hidden md:inline text-slate-500">•</span>
              <span className="hidden md:inline text-slate-300">
                100% Medical Council Verified Surgeons
              </span>
              <span className="hidden lg:inline text-slate-500">•</span>
              <span className="hidden lg:inline text-teal-300">
                ⚡ Instant Video Consult in 15 Minutes
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                24x7 Eye Emergency: 1800-419-3937
              </span>
              <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3">
                <Link
                  href="/doctor/dashboard"
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Doctor Portal
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/admin/doctors"
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Manage Doctors
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors text-slate-400"
                >
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Glass Navbar */}
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                  <Eye className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-bold tracking-tight text-slate-900">
                      Opti<span className="text-teal-600">Cure</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
                      Eye Care
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                    Precision Ophthalmology & Telehealth
                  </p>
                </div>
              </Link>

              {/* Location Picker */}
              <div className="relative hidden xl:block">
                <button
                  type="button"
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  <span>{selectedCity}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isCityDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Select Your City
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city.name}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city.name);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex justify-between items-center hover:bg-teal-50/60 transition-colors ${
                          selectedCity === city.name
                            ? "font-bold text-teal-700 bg-teal-50/80"
                            : "text-slate-700"
                        }`}
                      >
                        <span>{city.name}</span>
                        <span className="text-[10px] text-slate-400">
                          {city.localities.length} locations
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
              <Link
                href="/doctors"
                className={`transition-colors hover:text-teal-700 flex items-center gap-1.5 ${
                  pathname === "/doctors" ? "text-teal-700 font-semibold" : ""
                }`}
              >
                <Search className="w-4 h-4 text-teal-600" />
                Find Doctors
              </Link>
              <Link
                href="/specialities"
                className={`transition-colors hover:text-teal-700 flex items-center gap-1.5 ${
                  pathname.startsWith("/specialities")
                    ? "text-teal-700 font-semibold"
                    : ""
                }`}
              >
                <Activity className="w-4 h-4 text-teal-600" />
                Specialities
              </Link>
              <Link
                href="/doctors?mode=online"
                className="transition-colors hover:text-teal-700 flex items-center gap-1.5 text-slate-700"
              >
                <Video className="w-4 h-4 text-blue-600" />
                Online Consultation
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Live
                </span>
              </Link>
              <Link
                href="/doctors?mode=clinic"
                className="transition-colors hover:text-teal-700 flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4 text-teal-600" />
                Hospitals & Clinics
              </Link>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/patient/dashboard"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-700 hover:bg-slate-100/80 rounded-xl transition-all"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>My Appointments</span>
              </Link>

              <Link
                href="/doctors"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                href="/doctors"
                className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold"
              >
                Book
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-hidden"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
              <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-600" /> Selected City:
              </span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-bold text-slate-800 bg-transparent border-none outline-hidden"
              >
                {CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm font-medium">
              <Link
                href="/doctors"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                <Search className="w-4 h-4 text-teal-600" />
                Find an Eye Doctor
              </Link>
              <Link
                href="/specialities"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                <Activity className="w-4 h-4 text-teal-600" />
                Eye Specialties & Conditions
              </Link>
              <Link
                href="/doctors?mode=online"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-blue-700 font-semibold"
              >
                <Video className="w-4 h-4 text-blue-600" />
                Instant Online Video Consult
              </Link>
              <Link
                href="/doctors?mode=clinic"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                <Building2 className="w-4 h-4 text-teal-600" />
                Clinics & Hospital Directory
              </Link>
              <Link
                href="/patient/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                <User className="w-4 h-4 text-teal-600" />
                Patient Dashboard & Records
              </Link>
              <Link
                href="/doctor/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                <Stethoscope className="w-4 h-4 text-teal-600" />
                Doctor Portal / EMR
              </Link>
              <Link
                href="/admin/doctors"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-teal-700 font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Admin Doctor Management
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-700"
              >
                <Building2 className="w-4 h-4 text-teal-600" />
                Hospital Admin Console
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
