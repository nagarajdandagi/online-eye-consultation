"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  Building2,
  FileText,
  User,
  Download,
  AlertCircle,
  Eye,
  CheckCircle2,
  ArrowRight,
  Plus,
  Printer,
  ChevronRight,
  ShieldCheck,
  Activity,
  Droplets
} from "lucide-react";
import { SAMPLE_APPOINTMENTS } from "@/lib/data/appointments";
import { SAMPLE_PRESCRIPTIONS } from "@/lib/data/prescriptions";
import { formatCurrency } from "@/lib/utils";
import { Prescription } from "@/types";

export default function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "prescriptions" | "reports" | "profile">("overview");
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [appointmentFilter, setAppointmentFilter] = useState<"ALL" | "UPCOMING" | "COMPLETED" | "CANCELLED">("ALL");

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "CONFIRMED" || a.status === "PENDING"
  );
  const completedAppointments = appointments.filter((a) => a.status === "COMPLETED");

  const filteredAppointments = appointments.filter((a) => {
    if (appointmentFilter === "UPCOMING") return a.status === "CONFIRMED" || a.status === "PENDING";
    if (appointmentFilter === "COMPLETED") return a.status === "COMPLETED";
    if (appointmentFilter === "CANCELLED") return a.status === "CANCELLED";
    return true;
  });

  const handleCancelAppointment = (id: string) => {
    if (confirm("Are you sure you want to cancel this appointment? 100% of your fee will be refunded.")) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CANCELLED", paymentStatus: "REFUNDED" } : a))
      );
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-700 to-sky-500 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">
                  Welcome back, Rahul Sharma
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Patient ID: OPT-P-8812
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Last eye consultation: 04 October 2026 with Dr. Arundhati Deshmukh
              </p>
            </div>
          </div>

          <Link
            href="/doctors"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Book New Eye Consultation
          </Link>
        </div>

        {/* Dashboard Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1 text-xs font-bold text-slate-600 subtle-shadow">
          {[
            { id: "overview", label: "Dashboard Overview" },
            { id: "appointments", label: `Appointments (${appointments.length})` },
            { id: "prescriptions", label: "Prescriptions & Refraction" },
            { id: "reports", label: "Diagnostic Scans (OCT/Fundus)" },
            { id: "profile", label: "My Profile" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 rounded-xl transition-all text-center whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-xs"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
                <div className="text-xs font-bold text-slate-500 uppercase">Upcoming Visits</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{upcomingAppointments.length}</div>
                <div className="text-[11px] text-teal-600 mt-1">Confirmed & Scheduled</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
                <div className="text-xs font-bold text-slate-500 uppercase">Digital Prescriptions</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{SAMPLE_PRESCRIPTIONS.length}</div>
                <div className="text-[11px] text-teal-600 mt-1">With Left/Right Refraction</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
                <div className="text-xs font-bold text-slate-500 uppercase">Eye Pressure (IOP)</div>
                <div className="text-2xl font-black text-slate-900 mt-1">15 mmHg</div>
                <div className="text-[11px] text-emerald-600 mt-1">Normal Range (10-21)</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
                <div className="text-xs font-bold text-slate-500 uppercase">Current Spectacle Power</div>
                <div className="text-lg font-bold text-slate-900 mt-1">-2.25 D / -2.00 D</div>
                <div className="text-[11px] text-slate-500 mt-1">OD / OS Spherical</div>
              </div>
            </div>

            {/* Upcoming Appointment Alert Card */}
            {upcomingAppointments.length > 0 && (
              <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 subtle-shadow relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      ⚡ Next Upcoming Appointment
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">
                      {upcomingAppointments[0].doctor.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {upcomingAppointments[0].scheduledDate} at {upcomingAppointments[0].timeSlot} •{" "}
                      {upcomingAppointments[0].type === "ONLINE"
                        ? "Encrypted WebRTC Video Room"
                        : `${upcomingAppointments[0].doctor.hospital.name} (${upcomingAppointments[0].doctor.hospital.locality})`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {upcomingAppointments[0].type === "ONLINE" ? (
                      <Link
                        href={`/consultation/${upcomingAppointments[0].id}`}
                        className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Join Video Consultation Room
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => alert(`Clinic Address: ${upcomingAppointments[0].doctor.hospital.address}`)}
                        className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                      >
                        <Building2 className="w-4 h-4" />
                        Get Hospital Directions
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCancelAppointment(upcomingAppointments[0].id)}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold"
                    >
                      Cancel / Reschedule
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Prescriptions Preview */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 subtle-shadow space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900">Recent Medical Prescriptions</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("prescriptions")}
                  className="text-xs font-bold text-teal-700 hover:underline"
                >
                  View All & Print
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {SAMPLE_PRESCRIPTIONS.map((rx) => (
                  <div key={rx.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-800">{rx.doctorName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">#{rx.prescriptionNumber}</span>
                      </div>
                      <p className="text-xs text-teal-800 font-medium mt-0.5">{rx.diagnosis}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Date: {rx.date}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPrescription(rx)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-teal-600" />
                      View Ophthalmic Slip
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Appointment Management</h3>
                <p className="text-xs text-slate-500">
                  Track upcoming and completed consultations, download slips, or reschedule.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex gap-1.5 text-xs font-semibold">
                {(["ALL", "UPCOMING", "COMPLETED", "CANCELLED"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setAppointmentFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all capitalize ${
                      appointmentFilter === filter
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      <img
                        src={apt.doctor.profileImage}
                        alt={apt.doctor.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{apt.doctor.name}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            apt.status === "CONFIRMED"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : apt.status === "COMPLETED"
                              ? "bg-blue-50 text-blue-800 border border-blue-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {apt.scheduledDate} at {apt.timeSlot} • Mode:{" "}
                        <strong>{apt.type === "ONLINE" ? "Video Call" : "Hospital Visit"}</strong>
                      </p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                        Reason: {apt.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    {apt.status === "CONFIRMED" && apt.type === "ONLINE" && (
                      <Link
                        href={`/consultation/${apt.id}`}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Room
                      </Link>
                    )}

                    {apt.status === "CONFIRMED" && (
                      <button
                        type="button"
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    )}

                    {apt.status === "COMPLETED" && (
                      <button
                        type="button"
                        onClick={() => setSelectedPrescription(SAMPLE_PRESCRIPTIONS[0])}
                        className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        Prescription
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Prescriptions & Refraction Tab */}
        {activeTab === "prescriptions" && (
          <div className="space-y-6">
            {/* Visual Acuity & Refraction History Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Ophthalmic Refraction History (Glasses Power & Visual Acuity)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Record of your subjective and objective vision examinations over time.
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                  Latest: Oct 2026
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Eye Side</th>
                      <th className="p-3">Sphere (Sph)</th>
                      <th className="p-3">Cylinder (Cyl)</th>
                      <th className="p-3">Axis</th>
                      <th className="p-3">Visual Acuity (VA)</th>
                      <th className="p-3">IOP (Pressure)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold text-teal-800">OD (Right Eye)</td>
                      <td className="p-3 font-mono font-semibold">-2.25 D</td>
                      <td className="p-3 font-mono font-semibold">-0.75 D</td>
                      <td className="p-3 font-mono">90°</td>
                      <td className="p-3 font-bold text-emerald-700">6/9</td>
                      <td className="p-3">15 mmHg</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-sky-800">OS (Left Eye)</td>
                      <td className="p-3 font-mono font-semibold">-2.00 D</td>
                      <td className="p-3 font-mono font-semibold">-0.50 D</td>
                      <td className="p-3 font-mono">85°</td>
                      <td className="p-3 font-bold text-emerald-700">6/6</td>
                      <td className="p-3">14 mmHg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prescriptions List */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
              <h3 className="text-base font-bold text-slate-900">Digital Consultation Prescriptions</h3>

              <div className="space-y-4">
                {SAMPLE_PRESCRIPTIONS.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-5 rounded-2xl border border-slate-200 space-y-4 bg-slate-50/50"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
                      <div>
                        <div className="text-sm font-bold text-slate-900">{rx.doctorName}</div>
                        <div className="text-xs text-slate-500">{rx.doctorQualifications}</div>
                      </div>
                      <div className="text-left sm:text-right text-xs">
                        <div className="font-mono text-slate-500 font-semibold">{rx.prescriptionNumber}</div>
                        <div className="text-slate-400">{rx.date}</div>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <strong className="text-slate-700">Diagnosis:</strong>
                      <p className="text-slate-900 font-medium">{rx.diagnosis}</p>
                    </div>

                    {/* Medications Table */}
                    <div className="space-y-2">
                      <strong className="text-xs text-slate-700">Prescribed Eye Medications:</strong>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {rx.medications.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1"
                          >
                            <div className="font-bold text-teal-800">{m.name}</div>
                            <div className="text-slate-600">
                              {m.dosage} • {m.frequency} • <strong className="text-slate-800">{m.eye}</strong>
                            </div>
                            <div className="text-[11px] text-slate-500">Duration: {m.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedPrescription(rx)}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print / Download PDF Slip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. Diagnostic Scans (OCT/Fundus) Tab */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Diagnostic Scans & Medical Records</h3>
                <p className="text-xs text-slate-500">
                  Upload previous OCT, Visual Field (HVF), or Fundus photo scans for your ophthalmologist.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert("Document upload simulation: Select your OCT / corneal scan file.")}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Upload Scan File
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "High-Definition Macular OCT Scan (OD)",
                  date: "28 September 2026",
                  type: "OCT Scan",
                  size: "4.2 MB",
                  facility: "OptiCure Apex Eye Hospital"
                },
                {
                  title: "Humphrey Automated Visual Field (HVF 24-2)",
                  date: "15 August 2026",
                  type: "Perimetry",
                  size: "1.8 MB",
                  facility: "City Eye Institute"
                },
                {
                  title: "Ultra-Widefield Digital Fundus Image",
                  date: "10 July 2026",
                  type: "Fundus Photo",
                  size: "6.5 MB",
                  facility: "OptiCure Whitefield Center"
                }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-slate-500 mt-0.5">{doc.facility}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{doc.date} • {doc.size}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading ${doc.title}...`)}
                    className="p-2 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-white"
                    title="Download Scan"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Personal & Emergency Clinical Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  defaultValue="Rahul Sharma"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Date of Birth</label>
                <input
                  type="text"
                  defaultValue="14 July 1988"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Phone</label>
                <input
                  type="text"
                  defaultValue="+91 98765 43210"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email</label>
                <input
                  type="email"
                  defaultValue="rahul.sharma@example.com"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">Residential Address</label>
                <input
                  type="text"
                  defaultValue="402, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Emergency Contact Name & Relation</label>
                <input
                  type="text"
                  defaultValue="Priya Sharma (Spouse)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Emergency Contact Number</label>
                <input
                  type="text"
                  defaultValue="+91 98765 43219"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => alert("Profile updated successfully!")}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Printable Official Ophthalmic Prescription Modal */}
        {selectedPrescription && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
              {/* Header with Hospital & Doctor Letterhead */}
              <div className="flex justify-between items-start border-b-2 border-teal-600 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                      <Eye className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-slate-900">
                      Opti<span className="text-teal-600">Cure</span> Eye Health
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    NABH Accredited Ophthalmic Telemedicine Network
                  </p>
                </div>

                <div className="text-right text-xs">
                  <h4 className="font-bold text-slate-900">{selectedPrescription.doctorName}</h4>
                  <p className="text-[11px] text-slate-500">{selectedPrescription.doctorQualifications}</p>
                  <p className="text-[10px] text-teal-700 font-bold">
                    Reg No: {selectedPrescription.doctorRegNumber}
                  </p>
                </div>
              </div>

              {/* Patient Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-slate-50 text-xs border border-slate-200">
                <div>
                  <span className="text-slate-400">Patient:</span>
                  <div className="font-bold text-slate-800">{selectedPrescription.patientName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Age / Gender:</span>
                  <div className="font-bold text-slate-800">
                    {selectedPrescription.patientAge} Y / {selectedPrescription.patientGender}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Date:</span>
                  <div className="font-bold text-slate-800">{selectedPrescription.date}</div>
                </div>
                <div>
                  <span className="text-slate-400">Rx Number:</span>
                  <div className="font-bold font-mono text-teal-800">{selectedPrescription.prescriptionNumber}</div>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="space-y-1 text-xs">
                <strong className="text-slate-700">Diagnosis & Clinical Examination:</strong>
                <p className="p-2.5 rounded-lg bg-teal-50/60 border border-teal-200 text-slate-800 font-medium leading-relaxed">
                  {selectedPrescription.diagnosis}
                </p>
              </div>

              {/* Refraction Table */}
              <div className="space-y-1 text-xs">
                <strong className="text-slate-700">Ocular Refraction & Intraocular Pressure:</strong>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-center">
                    <thead className="bg-slate-100 font-bold">
                      <tr>
                        <th className="p-2 text-left">Eye</th>
                        <th className="p-2">Sph</th>
                        <th className="p-2">Cyl</th>
                        <th className="p-2">Axis</th>
                        <th className="p-2">VA</th>
                        <th className="p-2">IOP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr>
                        <td className="p-2 text-left font-sans font-bold text-teal-800">Right (OD)</td>
                        <td className="p-2">{selectedPrescription.refractionRight.sphere}</td>
                        <td className="p-2">{selectedPrescription.refractionRight.cylinder}</td>
                        <td className="p-2">{selectedPrescription.refractionRight.axis}</td>
                        <td className="p-2 font-bold text-emerald-700">{selectedPrescription.refractionRight.va}</td>
                        <td className="p-2">{selectedPrescription.iopOd || "15 mmHg"}</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-sans font-bold text-sky-800">Left (OS)</td>
                        <td className="p-2">{selectedPrescription.refractionLeft.sphere}</td>
                        <td className="p-2">{selectedPrescription.refractionLeft.cylinder}</td>
                        <td className="p-2">{selectedPrescription.refractionLeft.axis}</td>
                        <td className="p-2 font-bold text-emerald-700">{selectedPrescription.refractionLeft.va}</td>
                        <td className="p-2">{selectedPrescription.iopOs || "14 mmHg"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Medications Rx */}
              <div className="space-y-2 text-xs">
                <strong className="text-slate-700">℞ Prescribed Medications & Eye Drops:</strong>
                <div className="space-y-2">
                  {selectedPrescription.medications.map((med, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                        <span className="font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                          {med.eye}
                        </span>
                      </div>
                      <div className="text-slate-600">
                        Dosage: <strong>{med.dosage}</strong> • Frequency: <strong>{med.frequency}</strong> • Duration: {med.duration}
                      </div>
                      <div className="text-[11px] text-slate-500 italic">Instructions: {med.instructions}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Advice */}
              <div className="space-y-1 text-xs">
                <strong className="text-slate-700">Special Clinical Instructions:</strong>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  {selectedPrescription.advice.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Footer Signature */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-xs">
                <div className="text-slate-500">
                  Next Follow-up Review: <strong>{selectedPrescription.followUpDate || "In 4 weeks"}</strong>
                </div>
                <div className="text-right">
                  <div className="font-cursive font-bold text-teal-800 text-base">
                    {selectedPrescription.doctorName}
                  </div>
                  <p className="text-[10px] text-slate-400">Digitally Verified Medical Signature</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedPrescription(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
