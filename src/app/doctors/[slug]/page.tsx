"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  MapPin,
  GraduationCap,
  Award,
  Phone,
  ArrowRight,
  User,
  Heart,
  Share2,
  ChevronRight,
  Info
} from "lucide-react";
import { DOCTORS } from "@/lib/data/doctors";
import { PATIENT_REVIEWS } from "@/lib/data/reviews";
import { formatCurrency } from "@/lib/utils";

export default function DoctorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  // Find doctor by slug or fallback to first doctor
  const doctor = DOCTORS.find((d) => d.slug === slug) || DOCTORS[0];

  // Booking widget state
  const [selectedMode, setSelectedMode] = useState<"ONLINE" | "CLINIC">(
    doctor.onlineConsultation ? "ONLINE" : "CLINIC"
  );
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("04:30 PM");
  const [activeTab, setActiveTab] = useState<"about" | "services" | "reviews" | "hospital">("about");

  const doctorReviews = PATIENT_REVIEWS.filter((r) => r.doctorId === doctor.id);

  const DATE_OPTIONS = [
    { label: "Today", sub: "Oct 6" },
    { label: "Tomorrow", sub: "Oct 7" },
    { label: "Wed", sub: "Oct 8" },
    { label: "Thu", sub: "Oct 9" },
    { label: "Fri", sub: "Oct 10" },
    { label: "Sat", sub: "Oct 11" }
  ];

  const TIME_SLOTS = {
    morning: ["09:30 AM", "10:15 AM", "11:00 AM", "11:45 AM"],
    afternoon: ["01:30 PM", "02:15 PM", "03:00 PM", "03:45 PM"],
    evening: ["04:30 PM", "05:15 PM", "06:00 PM", "07:30 PM"]
  };

  const handleProceedBooking = () => {
    router.push(
      `/book/${doctor.id}?mode=${selectedMode.toLowerCase()}&date=${encodeURIComponent(
        selectedDate
      )}&slot=${encodeURIComponent(selectedTimeSlot)}`
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-teal-700">Doctors</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{doctor.name}</span>
        </div>

        {/* Doctor Header Banner Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
            {/* Doctor Photo */}
            <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden bg-slate-100 border-4 border-teal-500/20 shadow-md">
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-teal-600 fill-teal-50" />
              </div>
            </div>

            {/* Doctor Profile Info */}
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                  {doctor.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                  Verified Surgeon
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Reg No: <strong>{doctor.registrationNumber}</strong>
                </span>
              </div>

              <p className="text-sm font-bold text-teal-700">{doctor.title}</p>
              <p className="text-xs text-slate-500 font-medium">
                {doctor.qualifications.join(" • ")}
              </p>

              {/* Badges / Metrics */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>{doctor.rating}</span>
                  <span className="text-slate-400 font-normal">
                    ({doctor.reviewCount} Reviews)
                  </span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="text-slate-700">
                  <strong>{doctor.experienceYears}+ Years</strong> Surgical Exp.
                </div>
                <span className="text-slate-300">•</span>
                <div className="text-slate-700">
                  <strong>{doctor.patientsTreated.toLocaleString()}+</strong> Treated
                </div>
                <span className="text-slate-300">•</span>
                <div className="text-slate-500">
                  Languages: <strong>{doctor.languages.join(", ")}</strong>
                </div>
              </div>

              {/* Affiliated Clinic */}
              <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-xs text-slate-600">
                <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>
                  Affiliated with <strong>{doctor.hospital.name}</strong> ({doctor.hospital.locality}, {doctor.hospital.city})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Columns: Details on Left (8 cols) + Sticky Booking Box on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details Section */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabs Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-1 flex gap-1 text-xs font-bold text-slate-600 subtle-shadow">
              {[
                { id: "about", label: "About & Expertise" },
                { id: "services", label: "Procedures & Pricing" },
                { id: "hospital", label: "Clinic Location" },
                { id: "reviews", label: `Reviews (${doctorReviews.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2.5 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-teal-600 text-white shadow-xs"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: About & Expertise */}
            {activeTab === "about" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    Professional Biography
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {doctor.about}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    Areas of Clinical Focus
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {doctor.expertise.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 mb-3">
                    Medical Education & Fellowships
                  </h3>
                  <div className="space-y-3">
                    {doctor.education.map((edu, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <GraduationCap className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800">{edu.degree}</span>
                          <p className="text-slate-500">
                            {edu.institution} ({edu.year})
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Services & Pricing */}
            {activeTab === "services" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow space-y-4">
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Procedures & Clinical Fees
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Transparent, all-inclusive estimates. Exact surgical costs may vary based on chosen intraocular lens (IOL) type.
                </p>
                <div className="divide-y divide-slate-100">
                  {doctor.servicesOffered.map((service, idx) => (
                    <div
                      key={idx}
                      className="py-3.5 flex items-center justify-between text-xs sm:text-sm"
                    >
                      <span className="font-medium text-slate-800">{service.name}</span>
                      <span className="font-bold text-teal-700">
                        {service.price ? formatCurrency(service.price) : "Quote upon exam"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Clinic Location */}
            {activeTab === "hospital" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Hospital & Practice Center
                </h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    {doctor.hospital.name}
                  </div>
                  <p className="text-slate-600">{doctor.hospital.address}</p>
                  <p className="text-slate-500">
                    Phone: <strong>{doctor.hospital.phone}</strong>
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900">
                  <strong className="block mb-1">In-Person Clinic Hours:</strong>
                  Monday – Saturday: 09:00 AM – 01:00 PM & 04:00 PM – 07:00 PM.
                </div>
              </div>
            )}

            {/* Tab: Patient Reviews */}
            {activeTab === "reviews" && (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    Patient Reviews ({doctorReviews.length})
                  </h3>
                  <div className="flex items-center gap-1 font-bold text-sm text-slate-900">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{doctor.rating} Overall Rating</span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {doctorReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-900">{rev.patientName}</span>
                        <span className="text-slate-400">{rev.date}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-md inline-block">
                        {rev.conditionTreated}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky Booking Widget (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="bg-white rounded-3xl border-2 border-teal-600/30 p-6 subtle-shadow space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Book Appointment
                </h3>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  Instant Confirmation
                </span>
              </div>

              {/* Step 1: Mode Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">1. Select Consultation Mode</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSelectedMode("ONLINE")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedMode === "ONLINE"
                        ? "border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-600/30 font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-black">{formatCurrency(doctor.onlineFee)}</span>
                    </div>
                    <div>Online Video</div>
                    <div className="text-[10px] text-slate-500 font-normal">Browser Telehealth</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMode("CLINIC")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedMode === "CLINIC"
                        ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/30 font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Building2 className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-black">{formatCurrency(doctor.clinicFee)}</span>
                    </div>
                    <div>Hospital Visit</div>
                    <div className="text-[10px] text-slate-500 font-normal">{doctor.hospital.locality}</div>
                  </button>
                </div>
              </div>

              {/* Step 2: Date Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">2. Select Date</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center">
                  {DATE_OPTIONS.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setSelectedDate(d.label)}
                      className={`p-2 rounded-xl text-xs transition-all ${
                        selectedDate === d.label
                          ? "bg-teal-600 text-white font-bold shadow-xs scale-102"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <div className="text-[10px] opacity-80">{d.label}</div>
                      <div className="font-extrabold">{d.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Time Slot Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">3. Select Time Slot</label>

                {/* Slot groups */}
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      🌅 Morning Slots
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 mt-1">
                      {TIME_SLOTS.morning.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                            selectedTimeSlot === slot
                              ? "border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600/30"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      ☀️ Afternoon Slots
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 mt-1">
                      {TIME_SLOTS.afternoon.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                            selectedTimeSlot === slot
                              ? "border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600/30"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      🌆 Evening Slots
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 mt-1">
                      {TIME_SLOTS.evening.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                            selectedTimeSlot === slot
                              ? "border-teal-600 bg-teal-50 text-teal-800 ring-2 ring-teal-600/30"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Summary */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Selected Slot:</span>
                  <div className="font-bold text-slate-900">
                    {selectedDate}, {selectedTimeSlot}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-medium">Fee:</span>
                  <div className="text-base font-extrabold text-teal-700">
                    {formatCurrency(
                      selectedMode === "ONLINE" ? doctor.onlineFee : doctor.clinicFee
                    )}
                  </div>
                </div>
              </div>

              {/* Proceed CTA Button */}
              <button
                type="button"
                onClick={handleProceedBooking}
                className="w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Book Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Refundable up to 2 hours before slot
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
