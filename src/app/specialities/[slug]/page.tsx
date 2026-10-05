"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight,
  ShieldCheck,
  Search,
  Calendar,
  Sparkles
} from "lucide-react";
import { EYE_SPECIALTIES } from "@/lib/data/specialties";
import { DOCTORS } from "@/lib/data/doctors";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function SpecialtyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const specialty = EYE_SPECIALTIES.find((s) => s.slug === slug) || EYE_SPECIALTIES[0];
  const relatedDoctors = DOCTORS.filter(
    (d) =>
      d.specialization.toLowerCase().includes(specialty.name.toLowerCase().split(" ")[0]) ||
      d.subSpecialties.some((sub) =>
        specialty.commonConditions.some((c) => sub.toLowerCase().includes(c.toLowerCase().split(" ")[0]))
      )
  ).slice(0, 2);

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-teal-700">Home</Link>
          <span>/</span>
          <Link href="/specialities" className="hover:text-teal-700">Specialities</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{specialty.name}</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 subtle-shadow space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Clinical Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {specialty.name}
          </h1>
          <p className="text-base text-teal-700 font-semibold">{specialty.tagline}</p>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {specialty.description}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href={`/doctors?specialty=${specialty.slug}`}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment with {specialty.name.split(" ")[0]} Specialist</span>
            </Link>
          </div>
        </div>

        {/* Symptoms & Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Symptoms */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Symptoms That Require Urgent Evaluation
            </h3>
            <div className="space-y-2.5">
              {specialty.keySymptoms.map((sym, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span className="font-medium leading-relaxed">{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Procedures */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Advanced Diagnostic Tests Available
            </h3>
            <div className="space-y-2.5">
              {specialty.diagnosticProcedures.map((proc, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{proc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Doctors for this specialty */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">
              Leading Specialists in {specialty.name}
            </h3>
            <Link
              href={`/doctors?specialty=${specialty.slug}`}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(relatedDoctors.length > 0 ? relatedDoctors : DOCTORS.slice(0, 2)).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
