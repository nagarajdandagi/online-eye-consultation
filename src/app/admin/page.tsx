"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Building2,
  Stethoscope,
  Activity,
  FileCheck,
  RefreshCw,
  Plus,
  X,
  Edit3,
  Trash2,
  ChevronRight
} from "lucide-react";
import { DOCTORS } from "@/lib/data/doctors";
import { SAMPLE_APPOINTMENTS } from "@/lib/data/appointments";
import { formatCurrency } from "@/lib/utils";
import { Doctor } from "@/types";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "doctors" | "appointments" | "payments">("doctors");

  // Doctor state
  const [doctorList, setDoctorList] = useState<Doctor[]>(DOCTORS);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);

  // New Doctor Form State
  const [newDocName, setNewDocName] = useState("");
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocGender, setNewDocGender] = useState<"Male" | "Female">("Female");
  const [newDocQual, setNewDocQual] = useState("MBBS, MS (Ophthalmology), DNB");
  const [newDocSpec, setNewDocSpec] = useState("Vitreo-Retina & Macular Surgery");
  const [newDocSub, setNewDocSub] = useState("Diabetic Retinopathy, Macular Holes, Retinal Detachment");
  const [newDocExp, setNewDocExp] = useState("12");
  const [newDocReg, setNewDocReg] = useState("KMC-89214");
  const [newDocCity, setNewDocCity] = useState("Bangalore");
  const [newDocLocality, setNewDocLocality] = useState("Indiranagar");
  const [newDocOnlineFee, setNewDocOnlineFee] = useState("750");
  const [newDocClinicFee, setNewDocClinicFee] = useState("950");
  const [newDocAbout, setNewDocAbout] = useState("");

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: "pending-1",
      name: "Dr. K.V. Ramanathan",
      degree: "MBBS, MS (Ophthalmology), DNB",
      regNo: "KMC-92810",
      council: "Karnataka Medical Council",
      specialty: "Cataract & Glaucoma",
      experience: "11 Years",
      appliedDate: "03 October 2026",
      status: "PENDING_VERIFICATION"
    },
    {
      id: "pending-2",
      name: "Dr. Shalini Mukhopadhyay",
      degree: "MBBS, MS, Fellowship Vitreo-Retina (AIIMS)",
      regNo: "WBMC-74192",
      council: "West Bengal Medical Council",
      specialty: "Vitreo-Retina",
      experience: "8 Years",
      appliedDate: "04 October 2026",
      status: "PENDING_VERIFICATION"
    }
  ]);

  const handleApproveDoctor = (id: string) => {
    const candidate = pendingApprovals.find((d) => d.id === id);
    if (!candidate) return;

    const approvedDoc: Doctor = {
      id: `doc-${Date.now()}`,
      slug: candidate.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: candidate.name,
      title: `Consultant ${candidate.specialty} Surgeon`,
      gender: "Male",
      profileImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
      qualifications: candidate.degree.split(", "),
      specialization: candidate.specialty,
      subSpecialties: [candidate.specialty, "Comprehensive Eye Care"],
      experienceYears: parseInt(candidate.experience) || 10,
      registrationNumber: candidate.regNo,
      languages: ["English", "Hindi"],
      onlineConsultation: true,
      clinicConsultation: true,
      onlineFee: 700,
      clinicFee: 850,
      rating: 4.9,
      reviewCount: 0,
      patientsTreated: 0,
      about: `${candidate.name} is a certified eye surgeon registered with ${candidate.council}.`,
      expertise: [candidate.specialty],
      servicesOffered: [{ name: "Consultation & Slit-lamp Exam", price: 800 }],
      education: [{ degree: candidate.degree, institution: "Medical College", year: "2012" }],
      hospital: {
        id: "hosp-1",
        name: "OptiCure Apex Eye Hospital",
        city: "Bangalore",
        locality: "Indiranagar",
        address: "100 Feet Road, Indiranagar, Bengaluru",
        phone: "+91 80 4920 1100",
        rating: 4.9
      },
      clinic: {
        id: "clinic-1",
        name: "OptiCure Specialty Clinic",
        city: "Bangalore",
        locality: "Indiranagar",
        address: "100 Feet Rd, Indiranagar",
        phone: "+91 80 4920 1101"
      },
      nextAvailableSlot: {
        date: "Tomorrow",
        time: "11:00 AM",
        mode: "ONLINE"
      },
      isVerified: true,
      isFeatured: false
    };

    setDoctorList([approvedDoc, ...doctorList]);
    setPendingApprovals((prev) => prev.filter((d) => d.id !== id));
    alert(`Doctor ${candidate.name} (${candidate.regNo}) verified with Medical Council and approved!`);
  };

  const handleRejectDoctor = (id: string) => {
    setPendingApprovals((prev) => prev.filter((d) => d.id !== id));
    alert("Application rejected.");
  };

  const handleCreateNewDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim() || !newDocReg.trim()) {
      alert("Please enter doctor name and medical registration number.");
      return;
    }

    const slug = newDocName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newDoctor: Doctor = {
      id: `doc-${Date.now()}`,
      slug,
      name: newDocName,
      title: newDocTitle || `Consultant ${newDocSpec} Specialist`,
      gender: newDocGender,
      profileImage:
        newDocGender === "Male"
          ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
          : "https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=400",
      qualifications: newDocQual.split(",").map((q) => q.trim()),
      specialization: newDocSpec,
      subSpecialties: newDocSub.split(",").map((s) => s.trim()),
      experienceYears: parseInt(newDocExp) || 10,
      registrationNumber: newDocReg,
      languages: ["English", "Hindi"],
      onlineConsultation: true,
      clinicConsultation: true,
      onlineFee: parseInt(newDocOnlineFee) || 750,
      clinicFee: parseInt(newDocClinicFee) || 950,
      rating: 4.95,
      reviewCount: 0,
      patientsTreated: 0,
      about:
        newDocAbout ||
        `${newDocName} is an experienced ophthalmologist specializing in ${newDocSpec} with ${newDocExp}+ years of clinical experience.`,
      expertise: newDocSub.split(",").map((s) => s.trim()),
      servicesOffered: [
        { name: "Comprehensive Slit-lamp & Dilated Exam", price: 850 },
        { name: `${newDocSpec} Specialized Procedure Consultation`, price: 1600 }
      ],
      education: [{ degree: newDocQual, institution: "Premier Eye Hospital", year: "2014" }],
      hospital: {
        id: `hosp-${Date.now()}`,
        name: `OptiCure ${newDocCity} Eye Center`,
        city: newDocCity,
        locality: newDocLocality,
        address: `${newDocLocality}, ${newDocCity}`,
        phone: "+91 80 4920 1100",
        rating: 4.9
      },
      clinic: {
        id: `clinic-${Date.now()}`,
        name: `OptiCure ${newDocLocality} Clinic`,
        city: newDocCity,
        locality: newDocLocality,
        address: `${newDocLocality}, ${newDocCity}`,
        phone: "+91 80 4920 1101"
      },
      nextAvailableSlot: {
        date: "Tomorrow",
        time: "10:00 AM",
        mode: "ONLINE"
      },
      isVerified: true,
      isFeatured: true
    };

    setDoctorList([newDoctor, ...doctorList]);
    setIsAddDoctorModalOpen(false);

    // Reset form
    setNewDocName("");
    setNewDocTitle("");
    setNewDocAbout("");
    alert(`Doctor ${newDoctor.name} added successfully! The doctor profile is now live.`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 subtle-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center font-bold text-white shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black">
                  OptiCure Healthcare Admin Console
                </h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Hospital Network Governance, Doctor Verifications, and Financial Audit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddDoctorModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add New Doctor
            </button>
          </div>
        </div>

        {/* Global Executive Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
              <span>Total Patients</span>
              <Users className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">14,280</div>
            <div className="text-[11px] text-teal-600 mt-1">+184 this week</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
              <span>Active Surgeons</span>
              <Stethoscope className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{doctorList.length}</div>
            <div className="text-[11px] text-amber-600 mt-1">{pendingApprovals.length} Pending verification</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
              <span>Gross Consultations</span>
              <Calendar className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">1,942</div>
            <div className="text-[11px] text-emerald-600 mt-1">98.4% Completion rate</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
              <span>Platform Revenue</span>
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(1485000)}</div>
            <div className="text-[11px] text-purple-600 mt-1">Razorpay Verified</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1 text-xs font-bold text-slate-600 subtle-shadow">
          {[
            { id: "doctors", label: `Doctor Management & Approvals (${pendingApprovals.length} Pending)` },
            { id: "appointments", label: "Appointments Ledger" },
            { id: "payments", label: "Razorpay Financial Audit" },
            { id: "overview", label: "Executive Overview" }
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

        {/* 1. Doctor Management Tab */}
        {activeTab === "doctors" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-8">
            {/* Header + Add Doctor Trigger */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Doctor Onboarding & Verification Desk
                </h3>
                <p className="text-xs text-slate-500">
                  Review medical registrations against State Medical Councils and onboard new ophthalmologists.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddDoctorModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Ophthalmologist</span>
              </button>
            </div>

            {/* Pending Verifications */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Pending Verification Requests ({pendingApprovals.length})
              </h4>

              {pendingApprovals.length > 0 ? (
                <div className="space-y-3">
                  {pendingApprovals.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{doc.name}</span>
                          <span className="font-mono text-teal-700 font-bold bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            {doc.regNo}
                          </span>
                        </div>
                        <p className="text-slate-600 font-medium">
                          {doc.degree} • {doc.specialty} ({doc.experience})
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Registered with: <strong>{doc.council}</strong> • Applied: {doc.appliedDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleApproveDoctor(doc.id)}
                          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verify & Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectDoctor(doc.id)}
                          className="px-3.5 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                  ✓ All pending applications have been processed.
                </div>
              )}
            </div>

            {/* Active Doctors Master List */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">
                  Active Verified Surgeons ({doctorList.length})
                </h4>
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin/doctors"
                    className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 hover:bg-teal-100 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Full Doctor Console</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/doctors"
                    className="text-xs font-bold text-slate-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    <span>View Public Directory</span>
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-700 font-bold">
                    <tr>
                      <th className="p-3">Surgeon Name</th>
                      <th className="p-3">Sub-Specialty</th>
                      <th className="p-3">Council Reg No</th>
                      <th className="p-3">City / Locality</th>
                      <th className="p-3">Fees (Video / Clinic)</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {doctorList.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-800">
                          <Link href={`/admin/doctors/${d.id}/edit`} className="hover:text-teal-700">
                            {d.name}
                          </Link>
                        </td>
                        <td className="p-3 text-slate-600">{d.specialization}</td>
                        <td className="p-3 font-mono text-teal-800">{d.registrationNumber}</td>
                        <td className="p-3">
                          {d.hospital.city} ({d.hospital.locality})
                        </td>
                        <td className="p-3 font-semibold">
                          {formatCurrency(d.onlineFee)} / {formatCurrency(d.clinicFee)}
                        </td>
                        <td className="p-3 font-bold text-amber-600">★ {d.rating}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/doctors/${d.id}/edit`}
                              className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold text-[11px] hover:bg-teal-700 flex items-center gap-1 shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit Doctor</span>
                            </Link>
                            <Link
                              href={`/doctors/${d.slug}`}
                              className="text-xs text-slate-500 hover:text-teal-700 font-semibold"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. Appointments Ledger Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Central Appointments Ledger</h3>
                <p className="text-xs text-slate-500">Live booking logs across all hospital branches and telemedicine rooms.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Apt #</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Scheduled Date & Time</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SAMPLE_APPOINTMENTS.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-teal-700">{apt.appointmentNumber}</td>
                      <td className="p-3 font-semibold text-slate-800">{apt.patientName}</td>
                      <td className="p-3 text-slate-700">{apt.doctor.name}</td>
                      <td className="p-3 font-medium">
                        {apt.type === "ONLINE" ? "Video Telehealth" : "Hospital Visit"}
                      </td>
                      <td className="p-3">{apt.scheduledDate} at {apt.timeSlot}</td>
                      <td className="p-3 font-bold text-slate-900">{formatCurrency(apt.totalAmount)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Razorpay Financial Audit Tab */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Razorpay Payment Gateway Transactions</h3>
                <p className="text-xs text-slate-500">Real-time payment order IDs, settlement logs, and refund receipts.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {[
                {
                  orderId: "order_rzp_9921a8f",
                  paymentId: "pay_rzp_9921_success",
                  patient: "Rahul Sharma",
                  amount: 835,
                  method: "UPI (Google Pay)",
                  status: "SETTLED"
                },
                {
                  orderId: "order_rzp_8430b2c",
                  paymentId: "pay_rzp_8430_success",
                  patient: "Meenakshi Sundaram",
                  amount: 1097,
                  method: "Credit Card (HDFC)",
                  status: "SETTLED"
                },
                {
                  orderId: "order_rzp_7104c9e",
                  paymentId: "pay_rzp_7104_refund",
                  patient: "Sanjay R. Patel",
                  amount: 730,
                  method: "NetBanking (SBI)",
                  status: "REFUNDED"
                }
              ].map((tx, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                >
                  <div>
                    <div className="font-mono font-bold text-slate-900">{tx.orderId}</div>
                    <div className="text-slate-500 mt-0.5">
                      Tx ID: {tx.paymentId} • Patient: {tx.patient} • Via: {tx.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-sm text-slate-900">{formatCurrency(tx.amount)}</div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 subtle-shadow space-y-3">
              <h3 className="font-bold text-base text-slate-900">Platform Health & Telehealth Uptime</h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>WebRTC Video Call Server Uptime</span>
                  <span className="font-bold text-emerald-600">99.98% (Normal)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Razorpay Payment Gateway API</span>
                  <span className="font-bold text-emerald-600">Operational</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Prescription Generation & S3 Storage</span>
                  <span className="font-bold text-emerald-600">Operational</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>NABH Compliance Audit Log</span>
                  <span className="font-bold text-teal-700">Verified Oct 2026</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 subtle-shadow space-y-3">
              <h3 className="font-bold text-base text-slate-900">Hospital Network Capacity</h3>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Bangalore Apex & Clinics</span>
                  <span className="font-bold text-slate-800">7 Active Surgeons • 48 Slots Today</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Mumbai Bandra Vision Center</span>
                  <span className="font-bold text-slate-800">4 Active Surgeons • 26 Slots Today</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Hyderabad Hitec City Eye Institute</span>
                  <span className="font-bold text-slate-800">3 Active Surgeons • 20 Slots Today</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Delhi-NCR South Extension Center</span>
                  <span className="font-bold text-slate-800">3 Active Surgeons • 18 Slots Today</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Doctor Interactive Modal */}
        {isAddDoctorModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Add New Eye Doctor</h3>
                  <p className="text-xs text-slate-500">
                    Register a licensed ophthalmologist directly to the OptiCure platform.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddDoctorModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateNewDoctor} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Doctor Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Mehra"
                      value={newDocName}
                      onChange={(e) => setNewDocName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Professional Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Vitreo-Retinal Surgeon"
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Gender</label>
                    <select
                      value={newDocGender}
                      onChange={(e) => setNewDocGender(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Medical Council Reg. Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KMC-72941"
                      value={newDocReg}
                      onChange={(e) => setNewDocReg(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Qualifications (Degrees)</label>
                    <input
                      type="text"
                      value={newDocQual}
                      onChange={(e) => setNewDocQual(e.target.value)}
                      placeholder="e.g. MBBS, MS, DNB, FICO"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Experience (Years)</label>
                    <input
                      type="number"
                      value={newDocExp}
                      onChange={(e) => setNewDocExp(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Primary Sub-Specialty</label>
                    <select
                      value={newDocSpec}
                      onChange={(e) => setNewDocSpec(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white"
                    >
                      <option>Vitreo-Retina & Macular Surgery</option>
                      <option>Cornea, External Diseases & LASIK</option>
                      <option>Cataract & Refractive Surgery</option>
                      <option>Glaucoma & Micro-Incision Cataract (MICS)</option>
                      <option>Pediatric Ophthalmology & Squint</option>
                      <option>Oculoplasty & Facial Aesthetics</option>
                      <option>Advanced Dry Eye & Digital Strain</option>
                      <option>Neuro-Ophthalmology & Optic Nerve Disorders</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">City / Hospital Center</label>
                    <select
                      value={newDocCity}
                      onChange={(e) => setNewDocCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white"
                    >
                      <option>Bangalore</option>
                      <option>Mumbai</option>
                      <option>Delhi-NCR</option>
                      <option>Hyderabad</option>
                      <option>Chennai</option>
                      <option>Pune</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Locality / Branch</label>
                    <input
                      type="text"
                      value={newDocLocality}
                      onChange={(e) => setNewDocLocality(e.target.value)}
                      placeholder="e.g. Indiranagar, Whitefield, Bandra"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Online Video Fee (₹)</label>
                    <input
                      type="number"
                      value={newDocOnlineFee}
                      onChange={(e) => setNewDocOnlineFee(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-teal-800"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">In-Clinic Visit Fee (₹)</label>
                    <input
                      type="number"
                      value={newDocClinicFee}
                      onChange={(e) => setNewDocClinicFee(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Sub-Specialties / Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={newDocSub}
                    onChange={(e) => setNewDocSub(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Doctor Bio & Philosophy</label>
                  <textarea
                    rows={2}
                    value={newDocAbout}
                    onChange={(e) => setNewDocAbout(e.target.value)}
                    placeholder="Brief background on surgical experience, fellowships, and patient care philosophy..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddDoctorModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md cursor-pointer"
                  >
                    Confirm & Publish Doctor
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
