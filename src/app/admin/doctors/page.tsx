"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  Power,
  RefreshCw,
  Phone,
  MapPin,
  Clock,
  ArrowUpDown,
  History,
  FileCheck,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";
import { ExtendedDoctor } from "@/lib/services/doctorService";
import { formatCurrency } from "@/lib/utils";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<ExtendedDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "DEACTIVATED" | "VERIFIED" | "UNVERIFIED">("ALL");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("ALL");

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "DELETE" | "STATUS" | "VERIFY";
    doctorId: string;
    doctorName: string;
    targetValue?: boolean;
    message: string;
    isDestructive: boolean;
  }>({
    isOpen: false,
    type: "STATUS",
    doctorId: "",
    doctorName: "",
    message: "",
    isDestructive: false
  });

  // Action in progress state
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/doctors", {
        headers: {
          "x-user-role": "ADMIN",
          "x-admin-email": "admin@opticurehealth.com"
        }
      });
      const data = await res.json();
      if (data.success) {
        setDoctors(data.data);
      } else {
        setError(data.message || "Failed to load doctors");
      }
    } catch (err: any) {
      setError(err.message || "Network error loading doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Handle Status Toggle (Activate/Deactivate)
  const handleToggleStatus = async (doctor: ExtendedDoctor) => {
    const nextStatus = !doctor.isActive;
    setConfirmModal({
      isOpen: true,
      type: "STATUS",
      doctorId: doctor.id,
      doctorName: doctor.name,
      targetValue: nextStatus,
      isDestructive: !nextStatus,
      message: nextStatus
        ? `Are you sure you want to ACTIVATE ${doctor.name}? They will be visible to patients and able to receive appointments.`
        : `Are you sure you want to DEACTIVATE ${doctor.name}? They will be immediately hidden from patient search and booking.`
    });
  };

  // Handle Verification Toggle
  const handleToggleVerify = async (doctor: ExtendedDoctor) => {
    const nextStatus = !doctor.isVerified;
    setConfirmModal({
      isOpen: true,
      type: "VERIFY",
      doctorId: doctor.id,
      doctorName: doctor.name,
      targetValue: nextStatus,
      isDestructive: !nextStatus,
      message: nextStatus
        ? `Mark ${doctor.name}'s Medical Council license as VERIFIED? This will grant the official verification shield badge.`
        : `Revoke the verified badge for ${doctor.name}?`
    });
  };

  // Handle Delete Doctor
  const handleDeletePrompt = (doctor: ExtendedDoctor) => {
    setConfirmModal({
      isOpen: true,
      type: "DELETE",
      doctorId: doctor.id,
      doctorName: doctor.name,
      isDestructive: true,
      message: `WARNING: Are you sure you want to permanently DELETE ${doctor.name}? This action CANNOT be undone and will remove all profile associations.`
    });
  };

  // Execute Confirmed Action
  const executeConfirmedAction = async () => {
    const { type, doctorId, targetValue, doctorName } = confirmModal;
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    setActionLoadingId(doctorId);

    try {
      if (type === "STATUS") {
        const res = await fetch(`/api/admin/doctors/${doctorId}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-role": "ADMIN",
            "x-admin-email": "admin@opticurehealth.com"
          },
          body: JSON.stringify({ isActive: targetValue })
        });
        const result = await res.json();
        if (result.success) {
          setDoctors((prev) =>
            prev.map((d) => (d.id === doctorId ? { ...d, isActive: !!targetValue } : d))
          );
          showToast(`${doctorName} has been ${targetValue ? "ACTIVATED" : "DEACTIVATED"} successfully.`);
        } else {
          showToast(result.message || "Failed to update status", "error");
        }
      } else if (type === "VERIFY") {
        const res = await fetch(`/api/admin/doctors/${doctorId}/verify`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-role": "ADMIN",
            "x-admin-email": "admin@opticurehealth.com"
          },
          body: JSON.stringify({ isVerified: targetValue })
        });
        const result = await res.json();
        if (result.success) {
          setDoctors((prev) =>
            prev.map((d) => (d.id === doctorId ? { ...d, isVerified: !!targetValue } : d))
          );
          showToast(`${doctorName} verification status updated to ${targetValue ? "VERIFIED" : "UNVERIFIED"}.`);
        } else {
          showToast(result.message || "Failed to update verification", "error");
        }
      } else if (type === "DELETE") {
        const res = await fetch(`/api/admin/doctors/${doctorId}`, {
          method: "DELETE",
          headers: {
            "x-user-role": "ADMIN",
            "x-admin-email": "admin@opticurehealth.com"
          }
        });
        const result = await res.json();
        if (result.success) {
          setDoctors((prev) => prev.filter((d) => d.id !== doctorId));
          showToast(`${doctorName} was permanently removed.`, "success");
        } else {
          showToast(result.message || "Failed to delete doctor", "error");
        }
      }
    } catch (err: any) {
      showToast(err.message || "Action failed due to network error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.hospital?.city && doc.hospital.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.clinicDetails?.city && doc.clinicDetails.city.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
        ? doc.isActive
        : statusFilter === "DEACTIVATED"
        ? !doc.isActive
        : statusFilter === "VERIFIED"
        ? doc.isVerified
        : !doc.isVerified;

    const matchesSpecialty =
      specialtyFilter === "ALL" || doc.specialization.toLowerCase().includes(specialtyFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const allSpecialties = Array.from(new Set(doctors.map((d) => d.specialization)));

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl border flex items-center gap-3 transition-all animate-fade-in ${
            toastMessage.type === "success"
              ? "bg-emerald-950 text-emerald-100 border-emerald-800"
              : "bg-rose-950 text-rose-100 border-rose-800"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          )}
          <span className="text-xs font-semibold">{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Confirmation Dialog Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  confirmModal.isDestructive ? "bg-rose-100 text-rose-600" : "bg-teal-100 text-teal-700"
                }`}
              >
                {confirmModal.isDestructive ? (
                  <AlertTriangle className="w-6 h-6" />
                ) : (
                  <ShieldCheck className="w-6 h-6" />
                )}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {confirmModal.type === "DELETE"
                    ? "Delete Doctor Account"
                    : confirmModal.type === "STATUS"
                    ? "Change Account Status"
                    : "Update Verification"}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{confirmModal.doctorName}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {confirmModal.message}
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeConfirmedAction}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-xs ${
                  confirmModal.isDestructive
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                    : "bg-teal-600 hover:bg-teal-700 shadow-teal-600/20"
                }`}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 subtle-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Administration
              </span>
              <span className="text-xs text-slate-400">/</span>
              <span className="text-xs text-slate-300 font-medium">Doctor Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Doctor Profiles Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Full authority to view, add, edit, verify, activate/deactivate, and audit ophthalmologists across all hospital clinics.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/admin/audit-logs"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <History className="w-4 h-4 text-teal-400" />
              <span>Audit Logs</span>
            </Link>

            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Doctor</span>
            </Link>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 subtle-shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, specialty, registration #, city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-teal-600 focus:border-teal-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div className="md:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-teal-600"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active Accounts</option>
                <option value="DEACTIVATED">Deactivated Accounts</option>
                <option value="VERIFIED">Verified Doctors</option>
                <option value="UNVERIFIED">Pending / Unverified</option>
              </select>
            </div>

            {/* Specialty Filter */}
            <div className="md:col-span-3">
              <select
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-teal-600"
              >
                <option value="ALL">All Specialties</option>
                {allSpecialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <span>
                Showing <strong>{filteredDoctors.length}</strong> of {doctors.length} doctors
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-semibold">
                ● {doctors.filter((d) => d.isActive).length} Active
              </span>
              <span className="text-amber-700 font-semibold">
                ● {doctors.filter((d) => d.isVerified).length} Verified
              </span>
            </div>

            <button
              onClick={fetchDoctors}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Doctor Listing Content */}
        {loading ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 subtle-shadow space-y-3">
            <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-600">Loading doctor profiles from database...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-rose-50 rounded-3xl border border-rose-200 text-rose-800 space-y-3">
            <AlertTriangle className="w-8 h-8 text-rose-600 mx-auto" />
            <p className="text-sm font-bold">{error}</p>
            <button
              onClick={fetchDoctors}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
            >
              Try Again
            </button>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 subtle-shadow space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No doctors match your search filters</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search terms or clearing the status filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("ALL");
                setSpecialtyFilter("ALL");
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table Layout (hidden on small screens) */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 subtle-shadow overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-600">
                    <th className="py-4 px-4">Doctor</th>
                    <th className="py-4 px-4">Specialization & Qualifications</th>
                    <th className="py-4 px-4">Experience & Reg #</th>
                    <th className="py-4 px-4">Consultation Fees</th>
                    <th className="py-4 px-4">Consultation Modes</th>
                    <th className="py-4 px-4">Status & Verification</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredDoctors.map((doc) => {
                    const isProcessing = actionLoadingId === doc.id;
                    return (
                      <tr
                        key={doc.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          !doc.isActive ? "bg-slate-50/50 opacity-75" : ""
                        }`}
                      >
                        {/* Profile Photo & Name */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <Image
                                src={doc.profileImage}
                                alt={doc.name}
                                fill
                                sizes="48px"
                                className="object-cover object-top"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                <Link
                                  href={`/admin/doctors/${doc.id}/edit`}
                                  className="font-bold text-slate-900 hover:text-teal-700 transition-colors"
                                >
                                  {doc.name}
                                </Link>
                                {doc.isVerified && (
                                  <ShieldCheck className="w-4 h-4 text-teal-600" title="Council Verified" />
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {doc.hospital?.city || doc.clinicDetails?.city || "Bangalore"} •{" "}
                                {doc.hospital?.locality || doc.clinicDetails?.area || "Main"}
                              </p>
                              <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                                <span>★ {doc.rating.toFixed(1)}</span>
                                <span className="text-slate-400 font-normal">({doc.reviewCount || 48})</span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Specialization & Qualifications */}
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-800">{doc.specialization}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {Array.isArray(doc.qualifications)
                              ? doc.qualifications.join(", ")
                              : doc.qualifications}
                          </p>
                        </td>

                        {/* Experience & Registration */}
                        <td className="py-4 px-4 space-y-0.5">
                          <p className="font-semibold text-slate-800">{doc.experienceYears}+ Years Exp</p>
                          <p className="font-mono text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md inline-block border border-teal-100">
                            {doc.registrationNumber}
                          </p>
                        </td>

                        {/* Consultation Fees */}
                        <td className="py-4 px-4 space-y-0.5">
                          <div className="font-bold text-slate-900">
                            Video: <span className="text-teal-700">{formatCurrency(doc.onlineFee)}</span>
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Clinic: <span className="font-semibold">{formatCurrency(doc.clinicFee)}</span>
                          </div>
                        </td>

                        {/* Modes Available */}
                        <td className="py-4 px-4 space-y-1">
                          <div className="flex items-center gap-1 text-[11px]">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                doc.onlineConsultation ? "bg-teal-500" : "bg-slate-300"
                              }`}
                            />
                            <span className={doc.onlineConsultation ? "text-slate-800" : "text-slate-400"}>
                              Online Video
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px]">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                doc.clinicConsultation ? "bg-sky-500" : "bg-slate-300"
                              }`}
                            />
                            <span className={doc.clinicConsultation ? "text-slate-800" : "text-slate-400"}>
                              In-Clinic Visit
                            </span>
                          </div>
                        </td>

                        {/* Status & Verification Badges */}
                        <td className="py-4 px-4 space-y-1">
                          <div>
                            {doc.isActive ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                ACTIVE
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300">
                                DEACTIVATED
                              </span>
                            )}
                          </div>
                          <div>
                            {doc.isVerified ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                                <CheckCircle2 className="w-3 h-3 text-teal-600" />
                                VERIFIED
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                UNVERIFIED
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* View Profile */}
                            <Link
                              href={`/doctors/${doc.slug}`}
                              target="_blank"
                              title="View Public Profile"
                              className="p-2 rounded-xl text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            {/* Edit Doctor */}
                            <Link
                              href={`/admin/doctors/${doc.id}/edit`}
                              title="Edit Doctor Profile"
                              className="p-2 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-colors font-bold flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              <span className="text-[11px]">Edit</span>
                            </Link>

                            {/* Toggle Verification */}
                            <button
                              type="button"
                              onClick={() => handleToggleVerify(doc)}
                              disabled={isProcessing}
                              title={doc.isVerified ? "Revoke Verification" : "Verify Doctor"}
                              className={`p-2 rounded-xl transition-colors ${
                                doc.isVerified
                                  ? "text-teal-700 hover:bg-teal-50"
                                  : "text-slate-400 hover:text-teal-600 hover:bg-slate-100"
                              }`}
                            >
                              <ShieldCheck className="w-4 h-4" />
                            </button>

                            {/* Toggle Status (Activate / Deactivate) */}
                            <button
                              type="button"
                              onClick={() => handleToggleStatus(doc)}
                              disabled={isProcessing}
                              title={doc.isActive ? "Deactivate Doctor" : "Activate Doctor"}
                              className={`p-2 rounded-xl transition-colors ${
                                doc.isActive
                                  ? "text-emerald-700 hover:bg-emerald-50"
                                  : "text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                              }`}
                            >
                              <Power className="w-4 h-4" />
                            </button>

                            {/* Delete Doctor */}
                            <button
                              type="button"
                              onClick={() => handleDeletePrompt(doc)}
                              disabled={isProcessing}
                              title="Permanently Delete Doctor"
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout (visible on small/medium screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
              {filteredDoctors.map((doc) => {
                const isProcessing = actionLoadingId === doc.id;
                return (
                  <div
                    key={doc.id}
                    className={`bg-white rounded-3xl p-5 border border-slate-200 subtle-shadow space-y-4 ${
                      !doc.isActive ? "opacity-75 bg-slate-50/50" : ""
                    }`}
                  >
                    {/* Header info */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <Image
                          src={doc.profileImage}
                          alt={doc.name}
                          fill
                          sizes="64px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Link
                            href={`/admin/doctors/${doc.id}/edit`}
                            className="font-black text-slate-900 hover:text-teal-700 text-sm truncate"
                          >
                            {doc.name}
                          </Link>
                          {doc.isVerified && (
                            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-slate-600 truncate">
                          {doc.specialization}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {doc.experienceYears}+ yrs • {doc.hospital?.city || "Bangalore"}
                        </p>
                      </div>
                    </div>

                    {/* Registration & Badges */}
                    <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100">
                      <span className="font-mono text-[11px] text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                        {doc.registrationNumber}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {doc.isActive ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-300">
                            INACTIVE
                          </span>
                        )}
                        {doc.isVerified ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                            VERIFIED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            PENDING
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Fees and Mode */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">Video Fee</span>
                        <p className="font-bold text-teal-800">{formatCurrency(doc.onlineFee)}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium">Clinic Fee</span>
                        <p className="font-bold text-slate-800">{formatCurrency(doc.clinicFee)}</p>
                      </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                      <Link
                        href={`/admin/doctors/${doc.id}/edit`}
                        className="py-2 rounded-xl bg-teal-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1 col-span-2 shadow-xs"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Doctor</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(doc)}
                        disabled={isProcessing}
                        className={`py-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 ${
                          doc.isActive
                            ? "border-emerald-200 text-emerald-700 bg-emerald-50/50"
                            : "border-slate-200 text-slate-600 bg-slate-50"
                        }`}
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{doc.isActive ? "Deactivate" : "Activate"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePrompt(doc)}
                        disabled={isProcessing}
                        className="py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center justify-center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
