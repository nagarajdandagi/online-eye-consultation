"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Video,
  Building2,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  Layers,
  Activity,
  HeartHandshake,
  Zap,
  Droplets,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { DOCTORS, CITIES } from "@/lib/data/doctors";
import { EYE_SPECIALTIES, POPULAR_CONDITIONS } from "@/lib/data/specialties";
import { PATIENT_REVIEWS } from "@/lib/data/reviews";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [selectedMode, setSelectedMode] = useState<"ALL" | "ONLINE" | "CLINIC">("ALL");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const featuredDoctors = DOCTORS.filter((d) => d.isFeatured).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCity) params.set("city", selectedCity);
    if (selectedMode !== "ALL") params.set("mode", selectedMode.toLowerCase());
    router.push(`/doctors?${params.toString()}`);
  };

  const FAQS = [
    {
      q: "Can eye diseases accurately be diagnosed through an online consultation?",
      a: "Yes, many ocular symptoms—such as digital eye strain, conjunctivitis, blepharitis, dry eyes, allergic irritation, and post-surgery routine follow-ups—can be thoroughly evaluated via high-definition video consultation. If our ophthalmologist notices signs of acute retinal emergencies, severe intraocular pressure, or corneal tears, they will immediately coordinate an urgent physical evaluation at the nearest OptiCure partner hospital."
    },
    {
      q: "What is the difference between an Optometrist and an Ophthalmologist?",
      a: "An optometrist conducts primary vision tests and prescribes spectacles or contact lenses. An ophthalmologist (MS/DNB/FRCS) is a licensed eye surgeon and medical specialist who diagnoses complex conditions (cataracts, diabetic retinopathy, glaucoma, corneal dystrophies), prescribes therapeutic drugs, and performs laser and microsurgeries."
    },
    {
      q: "How does the digital prescription work?",
      a: "Immediately following your consultation, your ophthalmologist prepares an official digital prescription containing your diagnostic findings, Left/Right Eye (OD/OS) refractive measurements, intraocular pressure (IOP), and a precise eye-drop dosage schedule. You can download this PDF directly from your OptiCure Patient Dashboard anytime."
    },
    {
      q: "Are the consultation fees refundable if I need to cancel or reschedule?",
      a: "Yes! OptiCure provides a 100% full refund policy if an appointment is cancelled at least 2 hours before the scheduled time slot. You can also reschedule your consultation once at zero extra cost directly through your patient portal."
    },
    {
      q: "Can I consult an ophthalmologist for my child's squint or vision problems?",
      a: "Absolutely. We have fellowship-trained Pediatric Ophthalmologists who specialize in lazy eye (amblyopia), child strabismus (squint), and juvenile myopia management."
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-slate-50 to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/60">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-300 blur-3xl" />
          <div className="absolute top-60 -left-20 w-80 h-80 rounded-full bg-sky-200 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 text-teal-800 text-xs font-semibold border border-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              India's Premier Ophthalmic Consultation Platform
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Expert Eye Care,{" "}
              <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
                Wherever You Are.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              Find verified ophthalmologists, compare clinical sub-specialties, and book online video or hospital appointments in under 60 seconds.
            </p>
          </div>

          {/* Search Box Card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/60 border border-slate-200/90">
            {/* Consultation Mode Switcher Pills */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedMode("ALL")}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedMode === "ALL"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                All Consultations
              </button>
              <button
                type="button"
                onClick={() => setSelectedMode("ONLINE")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedMode === "ONLINE"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                Online Video Call
              </button>
              <button
                type="button"
                onClick={() => setSelectedMode("CLINIC")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
                  selectedMode === "CLINIC"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                In-Clinic Hospital Visit
              </button>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Query Field */}
              <div className="md:col-span-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4 text-teal-600" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Doctor name, eye condition (Cataract, Dry Eye) or LASIK..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
                />
              </div>

              {/* City Field */}
              <div className="md:col-span-3 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4 text-teal-600" />
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent appearance-none cursor-pointer transition-all"
                >
                  {CITIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Find Doctors</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Popular Quick Searches */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Popular:</span>
              {["Cataract Surgery", "Diabetic Retina", "Contoura LASIK", "Glaucoma", "Squint (Child)", "Dry Eyes"].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      router.push(`/doctors?q=${encodeURIComponent(term)}&city=${selectedCity}`);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Trust Badges Bar */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="text-xl md:text-2xl font-black text-slate-900">20+</div>
              <div className="text-xs text-slate-500 font-medium">Top Eye Specialists</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="text-xl md:text-2xl font-black text-teal-700">15 Mins</div>
              <div className="text-xs text-slate-500 font-medium">Avg. Video Wait Time</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="text-xl md:text-2xl font-black text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium">Medical Council Verified</div>
            </div>
            <div className="p-3 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="text-xl md:text-2xl font-black text-emerald-700">4.9 ★</div>
              <div className="text-xs text-slate-500 font-medium">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Clinical Action Pathways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/doctors?mode=online"
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-200/70 hover:border-blue-400 hover-lift subtle-shadow transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              Instant Connect
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">
              Online Video Consult
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect in 15 minutes with a top eye specialist via browser HD call. Prescriptions delivered instantly.
            </p>
          </Link>

          <Link
            href="/doctors?mode=clinic"
            className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-200/70 hover:border-teal-400 hover-lift subtle-shadow transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
              Hospital Visit
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">
              In-Clinic Appointment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full ophthalmic diagnostic workup at NABH accredited eye hospitals with zero queue waiting.
            </p>
          </Link>

          <Link
            href="/specialities/lasik-refractive"
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200/70 hover:border-purple-400 hover-lift subtle-shadow transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              Glasses Free
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">
              LASIK & SMILE Evaluation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Blade-free Contoura Vision and SMILE Pro. Check your corneal thickness and candidacy today.
            </p>
          </Link>

          <Link
            href="/specialities/pediatric-squint"
            className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200/70 hover:border-amber-400 hover-lift subtle-shadow transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Children & Squint
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">
              Pediatric Eye Clinic
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Amblyopia lazy eye management, child myopia control, and gentle strabismus alignment.
            </p>
          </Link>
        </div>
      </section>

      {/* 3. Common Eye Symptoms Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="max-w-2xl space-y-2 mb-6">
            <span className="text-xs uppercase tracking-wider font-bold text-teal-400">
              Interactive Symptom Router
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              What eye symptoms are you experiencing?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Select your primary concern to instantly route to the right ophthalmic sub-specialist.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { label: "Cloudy or Blurry Vision", condition: "cataract", icon: Eye },
              { label: "Floaters & Flashes of Light", condition: "retina", icon: Sparkles },
              { label: "Eye Burning & Screen Fatigue", condition: "dry-eye", icon: Droplets },
              { label: "High Eye Pressure / Glaucoma", condition: "glaucoma", icon: Activity },
              { label: "Glasses Freedom / LASIK", condition: "lasik", icon: Zap },
              { label: "Child Eye Squint / Lazy Eye", condition: "pediatric", icon: HeartHandshake },
              { label: "Redness, Pain & Grittiness", condition: "cornea", icon: Layers },
              { label: "Drooping Eyelid / Ptosis", condition: "oculoplasty", icon: ShieldCheck }
            ].map((symptom, idx) => {
              const IconComp = symptom.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => router.push(`/doctors?specialty=${symptom.condition}`)}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/80 hover:bg-teal-900/40 border border-slate-700 hover:border-teal-500 text-left transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {symptom.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Ophthalmology Sub-Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Clinical Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ophthalmic Sub-Specialties
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive medical and surgical eye care under one trusted roof.
            </p>
          </div>
          <Link
            href="/specialities"
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
          >
            <span>View All Specialties Guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EYE_SPECIALTIES.map((spec) => (
            <div
              key={spec.slug}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover-lift subtle-shadow transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{spec.name}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {spec.tagline}
                </p>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Key Conditions:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {spec.commonConditions.slice(0, 2).map((cond, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <Link
                  href={`/specialities/${spec.slug}`}
                  className="text-slate-500 hover:text-slate-800"
                >
                  Learn More
                </Link>
                <Link
                  href={`/doctors?specialty=${spec.slug}`}
                  className="text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  Find Doctors
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Ophthalmologists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Verified Practitioners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Featured Eye Surgeons
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Board-certified specialists with fellowships from premier institutes (AIIMS, Sankara Nethralaya, LVPEI).
            </p>
          </div>
          <Link
            href="/doctors"
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <span>Explore All 20+ Doctors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* 6. How It Works (3 Simple Steps) */}
      <section className="bg-slate-100/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              Frictionless Healthcare
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              How OptiCure Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Book guaranteed real-time appointments without waiting for phone calls or callbacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3 relative subtle-shadow">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-lg mx-auto">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Choose Specialist & Mode</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter ophthalmologists by sub-specialty, language, experience, and select either an Online Video Call or In-Clinic hospital visit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3 relative subtle-shadow">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-lg mx-auto">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Select Instant Slot & Pay</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick a guaranteed slot across Morning, Afternoon, or Evening. Complete checkout via Razorpay UPI, Cards, or NetBanking.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3 relative subtle-shadow">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-lg mx-auto">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Consult & Get Prescription</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join our browser HD telehealth room or walk into the clinic. Receive your official digital eye prescription with OD/OS metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Patient Testimonials & Verified Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Real Clinical Outcomes
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Stories of Restored Vision
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Read verified feedback from patients treated by our network of ophthalmologists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATIENT_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 subtle-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/50 inline-block mb-3">
                  {review.conditionTreated}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">{review.patientName}</span>
                <span className="text-emerald-700 flex items-center gap-1 font-medium text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Asked Questions (with Accordion) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Answers & Clarity
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden subtle-shadow transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 text-sm sm:text-base font-bold text-slate-800 hover:text-teal-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-teal-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. Bottom High-Intent Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to protect your most precious sense?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Don't ignore subtle vision changes. Book an online consultation in 15 minutes or schedule a clinic exam with an accredited eye surgeon.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/doctors?mode=online"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-teal-800 hover:bg-slate-100 text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Start Instant Video Consult
              </Link>
              <Link
                href="/doctors"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600/60 hover:bg-teal-600 border border-teal-400/40 text-white text-xs font-bold transition-all"
              >
                Browse All Eye Specialists
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
