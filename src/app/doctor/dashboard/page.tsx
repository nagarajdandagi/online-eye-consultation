"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Plus,
  CheckCircle2,
  XCircle,
  Settings,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Printer,
  Eye,
  Sliders
} from "lucide-react";
import { SAMPLE_APPOINTMENTS } from "@/lib/data/appointments";
import { formatCurrency } from "@/lib/utils";

export default function DoctorDashboardPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "availability" | "prescription-writer" | "patients">("queue");
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS);

  // Availability state
  const [workingDays, setWorkingDays] = useState({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true,
    Sun: false
  });
  const [morningHours, setMorningHours] = useState("09:00 AM – 01:00 PM");
  const [eveningHours, setEveningHours] = useState("04:00 PM – 08:00 PM");
  const [slotDuration, setSlotDuration] = useState("20 Mins");
  const [isSavedSchedule, setIsSavedSchedule] = useState(false);

  // Prescription writer state
  const [rxDiagnosis, setRxDiagnosis] = useState("Acute Allergic Blepharoconjunctivitis with Superficial Punctate Keratitis");
  const [rxOdSph, setRxOdSph] = useState("-2.25");
  const [rxOdCyl, setRxOdCyl] = useState("-0.75");
  const [rxOdAxis, setRxOdAxis] = useState("90°");
  const [rxOdVa, setRxOdVa] = useState("6/6");
  const [rxIopOd, setRxIopOd] = useState("15");

  const [rxOsSph, setRxOsSph] = useState("-2.00");
  const [rxOsCyl, setRxOsCyl] = useState("-0.50");
  const [rxOsAxis, setRxOsAxis] = useState("85°");
  const [rxOsVa, setRxOsVa] = useState("6/6");
  const [rxIopOs, setRxIopOs] = useState("14");

  const [medications, setMedications] = useState([
    {
      name: "Olopatadine 0.2% Ophthalmic Solution",
      dosage: "1 drop",
      frequency: "Once daily (OD) morning",
      eye: "OU (Both Eyes)",
      duration: "14 days",
      instructions: "Fast anti-allergic relief."
    },
    {
      name: "Fluorometholone 0.1% (FML) Eye Suspension",
      dosage: "1 drop",
      frequency: "3 times daily, tapering over 10 days",
      eye: "OU (Both Eyes)",
      duration: "10 days",
      instructions: "Mild ocular steroid. Shake well before instilling."
    },
    {
      name: "Sodium Hyaluronate 0.1% Lubricating Drops",
      dosage: "1 drop",
      frequency: "4 times daily as needed",
      eye: "OU (Both Eyes)",
      duration: "30 days",
      instructions: "Preservative-free tear substitute."
    }
  ]);

  const [rxFollowUp, setRxFollowUp] = useState("In 10 days for corneal re-evaluation");
  const [isRxGenerated, setIsRxGenerated] = useState(false);

  const toggleDay = (day: string) => {
    setWorkingDays((prev: any) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSaveSchedule = () => {
    setIsSavedSchedule(true);
    setTimeout(() => setIsSavedSchedule(false), 2500);
  };

  const handleGeneratePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRxGenerated(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Doctor Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 subtle-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-teal-500/20 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=400"
                alt="Dr. Arundhati Deshmukh"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black text-slate-900">
                  Dr. Arundhati Deshmukh
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Doctor EMR Portal
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Senior Consultant Vitreo-Retinal Surgeon • KMC-64812 • OptiCure Apex Eye Hospital
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("prescription-writer")}
              className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Write Digital Prescription
            </button>
          </div>
        </div>

        {/* Practice Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Today's Patients</span>
              <Users className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">12</div>
            <div className="text-[11px] text-teal-600 mt-1">5 Video • 7 In-Clinic</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Today's Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(9600)}</div>
            <div className="text-[11px] text-emerald-600 mt-1">Direct Bank Payout</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Surgical Consults</span>
              <Stethoscope className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">384</div>
            <div className="text-[11px] text-sky-600 mt-1">This month</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 subtle-shadow">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
              <span>Patient Satisfaction</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">4.9 ★</div>
            <div className="text-[11px] text-slate-400 mt-1">From 380+ reviews</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex flex-wrap gap-1 text-xs font-bold text-slate-600 subtle-shadow">
          {[
            { id: "queue", label: `Today's Appointments (${appointments.length})` },
            { id: "prescription-writer", label: "Write Ophthalmic Prescription" },
            { id: "availability", label: "Working Hours & Slot Settings" },
            { id: "patients", label: "Patient Dossiers & EMR" }
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

        {/* Tab 1: Queue */}
        {activeTab === "queue" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Consultation Schedule</h3>
                <p className="text-xs text-slate-500">Patients queued for today across Video and Hospital visits.</p>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Oct 06, 2026
              </span>
            </div>

            <div className="space-y-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{apt.patientName}</span>
                      <span className="text-xs text-slate-500">
                        ({apt.patientAge} Yrs, {apt.patientGender})
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          apt.type === "ONLINE"
                            ? "bg-blue-50 text-blue-800 border border-blue-200"
                            : "bg-teal-50 text-teal-800 border border-teal-200"
                        }`}
                      >
                        {apt.type === "ONLINE" ? "Video Telehealth" : "In-Clinic"}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 font-medium">
                      Slot: <strong className="text-slate-800">{apt.timeSlot}</strong> • Phone: {apt.patientPhone}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-1 italic">
                      Chief Complaint: {apt.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {apt.type === "ONLINE" ? (
                      <Link
                        href={`/consultation/${apt.id}`}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Start Video Call
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => alert(`Marking patient ${apt.patientName} checked-in at hospital desk.`)}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Check-in Patient
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveTab("prescription-writer")}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold"
                    >
                      Issue Rx
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Prescription Writer */}
        {activeTab === "prescription-writer" && (
          <form onSubmit={handleGeneratePrescription} className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Digital Ophthalmic Prescription Writer
                </h3>
                <p className="text-xs text-slate-500">
                  Enter Left/Right eye refraction parameters, IOP, and therapeutic eye-drop dosage schedule.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Patient: Rahul Sharma (38 Yrs)
              </span>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Diagnosis & Clinical Findings *</label>
              <textarea
                rows={2}
                required
                value={rxDiagnosis}
                onChange={(e) => setRxDiagnosis(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
              />
            </div>

            {/* Refraction Table Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Ophthalmic Refraction & Intraocular Pressure (IOP)
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Right Eye OD */}
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
                  <div className="font-bold text-xs text-teal-900 flex justify-between">
                    <span>OD (Right Eye)</span>
                    <span className="text-teal-700">Oculus Dexter</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500">Sph (D)</span>
                      <input
                        type="text"
                        value={rxOdSph}
                        onChange={(e) => setRxOdSph(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Cyl (D)</span>
                      <input
                        type="text"
                        value={rxOdCyl}
                        onChange={(e) => setRxOdCyl(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Axis</span>
                      <input
                        type="text"
                        value={rxOdAxis}
                        onChange={(e) => setRxOdAxis(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">VA</span>
                      <input
                        type="text"
                        value={rxOdVa}
                        onChange={(e) => setRxOdVa(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-bold text-teal-800"
                      />
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">IOP (Tonometry):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={rxIopOd}
                        onChange={(e) => setRxIopOd(e.target.value)}
                        className="w-16 p-1.5 rounded-lg border border-slate-200 bg-white text-center font-mono"
                      />
                      <span className="text-[11px] text-slate-500">mmHg</span>
                    </div>
                  </div>
                </div>

                {/* Left Eye OS */}
                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3">
                  <div className="font-bold text-xs text-sky-900 flex justify-between">
                    <span>OS (Left Eye)</span>
                    <span className="text-sky-700">Oculus Sinister</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500">Sph (D)</span>
                      <input
                        type="text"
                        value={rxOsSph}
                        onChange={(e) => setRxOsSph(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Cyl (D)</span>
                      <input
                        type="text"
                        value={rxOsCyl}
                        onChange={(e) => setRxOsCyl(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">Axis</span>
                      <input
                        type="text"
                        value={rxOsAxis}
                        onChange={(e) => setRxOsAxis(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500">VA</span>
                      <input
                        type="text"
                        value={rxOsVa}
                        onChange={(e) => setRxOsVa(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white font-bold text-sky-800"
                      />
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">IOP (Tonometry):</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={rxIopOs}
                        onChange={(e) => setRxIopOs(e.target.value)}
                        className="w-16 p-1.5 rounded-lg border border-slate-200 bg-white text-center font-mono"
                      />
                      <span className="text-[11px] text-slate-500">mmHg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prescribed Medications */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">
                  ℞ Prescribed Eye Drops & Oral Medications
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setMedications((prev) => [
                      ...prev,
                      {
                        name: "Carboxymethylcellulose 0.5%",
                        dosage: "1 drop",
                        frequency: "4 times daily",
                        eye: "OU (Both Eyes)",
                        duration: "30 days",
                        instructions: "Lubricating drops."
                      }
                    ])
                  }
                  className="text-xs text-teal-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Medicine
                </button>
              </div>

              <div className="space-y-2">
                {medications.map((med, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-center"
                  >
                    <div className="sm:col-span-4 font-bold text-slate-900">{med.name}</div>
                    <div className="sm:col-span-3 text-slate-600">{med.dosage} • {med.frequency}</div>
                    <div className="sm:col-span-2 font-bold text-teal-700">{med.eye}</div>
                    <div className="sm:col-span-2 text-slate-500">{med.duration}</div>
                    <div className="sm:col-span-1 text-right">
                      <button
                        type="button"
                        onClick={() => setMedications((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-rose-500 hover:text-rose-700 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow-up Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Follow-up Recommendation</label>
              <input
                type="text"
                value={rxFollowUp}
                onChange={(e) => setRxFollowUp(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Issue Digital Prescription</span>
              </button>
              {isRxGenerated && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  ✓ Prescription issued and sent to patient's dashboard & email!
                </span>
              )}
            </div>
          </form>
        )}

        {/* Tab 3: Availability & Slot Settings */}
        {activeTab === "availability" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Consultation Availability & Schedule Configuration
              </h3>
              <p className="text-xs text-slate-500">
                Configure your active practice days, morning/evening shifts, and telehealth slot intervals.
              </p>
            </div>

            {/* Working Days */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Active Working Days</label>
              <div className="grid grid-cols-7 gap-2">
                {Object.entries(workingDays).map(([day, active]) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`py-3 rounded-2xl text-xs font-extrabold border transition-all ${
                      active
                        ? "bg-teal-600 border-teal-600 text-white shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Shifts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Morning Shift (In-Clinic + Video)</label>
                <input
                  type="text"
                  value={morningHours}
                  onChange={(e) => setMorningHours(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Evening Shift (Telehealth Only)</label>
                <input
                  type="text"
                  value={eveningHours}
                  onChange={(e) => setEveningHours(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Slot Duration</label>
                <select
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white"
                >
                  <option>15 Mins</option>
                  <option>20 Mins</option>
                  <option>30 Mins</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Buffer Break Between Calls</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white">
                  <option>5 Mins Buffer</option>
                  <option>10 Mins Buffer</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveSchedule}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
              >
                Save Schedule Changes
              </button>
              {isSavedSchedule && (
                <span className="text-xs font-bold text-emerald-700">
                  ✓ Schedule saved! Updated slots are now live on your profile.
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Patients EMR */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Patient Clinical Dossiers & Past Consultations
            </h3>

            <div className="divide-y divide-slate-100 text-xs">
              {[
                {
                  name: "Rahul Sharma",
                  age: 38,
                  gender: "Male",
                  lastVisit: "04 Oct 2026",
                  condition: "Diabetic Retinopathy & DME",
                  phone: "+91 98765 43210"
                },
                {
                  name: "Meenakshi Sundaram",
                  age: 54,
                  gender: "Female",
                  lastVisit: "04 Aug 2026",
                  condition: "Retinal Tear Barrage Laser",
                  phone: "+91 98450 11223"
                },
                {
                  name: "Sanjay R. Patel",
                  age: 62,
                  gender: "Male",
                  lastVisit: "18 Sep 2026",
                  condition: "Macular Edema Anti-VEGF Protocol",
                  phone: "+91 98200 44556"
                }
              ].map((p, idx) => (
                <div key={idx} className="py-4 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-sm text-slate-900">{p.name}</div>
                    <div className="text-slate-500 mt-0.5">
                      {p.age} Yrs, {p.gender} • Last consult: {p.lastVisit}
                    </div>
                    <div className="text-teal-700 font-semibold mt-0.5">{p.condition}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveTab("prescription-writer")}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold"
                  >
                    View EMR
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
