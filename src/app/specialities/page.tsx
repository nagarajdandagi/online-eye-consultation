"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  Sparkles,
  Layers,
  Activity,
  HeartHandshake,
  ShieldCheck,
  Zap,
  Droplets,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { EYE_SPECIALTIES } from "@/lib/data/specialties";

export default function SpecialtiesIndexPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Clinical Guide & Department Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ophthalmic Sub-Specialties
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            From precision laser vision correction and cataract removal to micro-retinal surgery and pediatric squint alignment, discover specialized eye care tailored to your exact condition.
          </p>
        </div>

        {/* Grid of Specialties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EYE_SPECIALTIES.map((spec) => (
            <div
              key={spec.slug}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-7 hover-lift subtle-shadow transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  <Eye className="w-6 h-6 stroke-[2]" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{spec.name}</h3>
                  <p className="text-xs font-semibold text-teal-700 mb-2">{spec.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {spec.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Common Conditions Treated:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {spec.commonConditions.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <Link
                  href={`/specialities/${spec.slug}`}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Clinical Guide
                </Link>
                <Link
                  href={`/doctors?specialty=${spec.slug}`}
                  className="text-teal-700 hover:text-teal-800 flex items-center gap-1"
                >
                  <span>Consult Specialists</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
