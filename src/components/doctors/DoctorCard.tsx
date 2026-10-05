"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { Doctor } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface DoctorCardProps {
  doctor: Doctor;
  preferredMode?: "ALL" | "ONLINE" | "CLINIC";
}

export default function DoctorCard({ doctor, preferredMode = "ALL" }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 hover-lift subtle-shadow transition-all relative flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {/* Doctor Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-teal-500/30 shadow-xs relative">
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {doctor.isVerified && (
              <div
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs"
                title="Medical Council Verified Surgeon"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-50" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">
                <Link
                  href={`/doctors/${doctor.slug}`}
                  className="hover:text-teal-700 transition-colors"
                >
                  {doctor.name}
                </Link>
              </h3>
              {doctor.isFeatured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center gap-1">
                  ⭐ Top Specialist
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-teal-700 mb-1">
              {doctor.specialization}
            </p>

            <p className="text-xs text-slate-500 line-clamp-1 mb-2 font-medium">
              {doctor.qualifications.join(" • ")}
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
              <div className="flex items-center gap-1 font-semibold text-slate-800">
                <span className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                </span>
                <span>{doctor.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">
                  ({doctor.reviewCount} verified reviews)
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="font-medium text-slate-700">
                <strong>{doctor.experienceYears}+ Years</strong> Experience
              </div>
              <span className="text-slate-300">•</span>
              <div className="text-slate-500 truncate">
                Languages: {doctor.languages.slice(0, 3).join(", ")}
              </div>
            </div>

            {/* Hospital and Location */}
            <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-600">
              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-700 truncate">
                {doctor.clinic.name}, {doctor.clinic.locality} ({doctor.hospital.city})
              </span>
            </div>
          </div>
        </div>

        {/* Sub-specialties tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {doctor.subSpecialties.slice(0, 3).map((sub, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-slate-100/90 text-slate-700 border border-slate-200/60"
            >
              {sub}
            </span>
          ))}
          {doctor.subSpecialties.length > 3 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{doctor.subSpecialties.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Fee & Actions Bar */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Fees & Earliest Slot */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div>
            <div className="text-[11px] font-medium text-slate-400">Consultation Fee</div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-slate-900">
                {formatCurrency(doctor.onlineFee)}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                (Video) / {formatCurrency(doctor.clinicFee)} (Clinic)
              </span>
            </div>
          </div>

          <div className="border-l border-slate-200 pl-3">
            <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-600" /> Next Available:
            </div>
            <div className="text-xs font-bold text-emerald-700">
              {doctor.nextAvailableSlot.date}, {doctor.nextAvailableSlot.time}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="flex-1 sm:flex-none text-center px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            View Profile
          </Link>

          <Link
            href={`/book/${doctor.id}?mode=${doctor.onlineConsultation ? "online" : "clinic"}`}
            className="flex-1 sm:flex-none text-center px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-xs hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
