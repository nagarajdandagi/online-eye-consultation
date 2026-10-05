"use client";

import React, { useState, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  QrCode,
  ArrowRight,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Download,
  Lock,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { DOCTORS } from "@/lib/data/doctors";
import { formatCurrency } from "@/lib/utils";

function BookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const doctorId = params?.doctorId as string;

  const doctor = DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0];

  // Pre-filled from URL query params
  const initialMode = (searchParams.get("mode")?.toUpperCase() === "CLINIC" ? "CLINIC" : "ONLINE") as "ONLINE" | "CLINIC";
  const initialDate = searchParams.get("date") || "Today";
  const initialSlot = searchParams.get("slot") || "04:30 PM";

  // Multi-step states
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Patient Details & Symptoms, 2: Payment, 3: Confirmed
  const [consultationMode, setConsultationMode] = useState<"ONLINE" | "CLINIC">(initialMode);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedSlot, setSelectedSlot] = useState(initialSlot);

  // Patient Form
  const [patientName, setPatientName] = useState("Rahul Sharma");
  const [patientAge, setPatientAge] = useState("38");
  const [patientGender, setPatientGender] = useState("Male");
  const [patientPhone, setPatientPhone] = useState("+91 98765 43210");
  const [patientEmail, setPatientEmail] = useState("rahul.sharma@example.com");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    "Blurry vision",
    "Digital screen strain"
  ]);
  const [consultReason, setConsultReason] = useState(
    "Routine evaluation of progressive blurry vision in right eye and eye strain."
  );

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NETBANKING">("UPI");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>("");

  // Fee calculation
  const baseFee = consultationMode === "ONLINE" ? doctor.onlineFee : doctor.clinicFee;
  const platformFee = 49;
  const gst = Math.round(baseFee * 0.05);
  const totalAmount = baseFee + platformFee + gst;

  const COMMON_SYMPTOMS = [
    "Blurry vision",
    "Eye dryness / gritty feeling",
    "Floaters or flashes",
    "Digital screen strain",
    "Redness / itching",
    "Pain around eye",
    "Squint / alignment",
    "Spectacle power change"
  ];

  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(sym) ? prev.filter((s) => s !== sym) : [...prev, sym]
    );
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert("Please fill in patient name and phone number.");
      return;
    }
    setStep(2);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const newBookingId = `OPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedBookingId(newBookingId);
      setStep(3);

      // Trigger celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb / Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Link href="/" className="hover:text-teal-700">Home</Link>
            <span>/</span>
            <Link href={`/doctors/${doctor.slug}`} className="hover:text-teal-700">{doctor.name}</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Appointment Booking</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span className={`px-2.5 py-1 rounded-full ${step >= 1 ? "bg-teal-600 text-white" : "bg-slate-200"}`}>
              1. Details
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className={`px-2.5 py-1 rounded-full ${step >= 2 ? "bg-teal-600 text-white" : "bg-slate-200"}`}>
              2. Payment
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className={`px-2.5 py-1 rounded-full ${step === 3 ? "bg-teal-600 text-white" : "bg-slate-200"}`}>
              3. Confirmed
            </span>
          </div>
        </div>

        {/* Doctor & Slot Overview Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 subtle-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-teal-500/20 shrink-0">
              <img
                src={doctor.profileImage}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">{doctor.name}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {doctor.specialization}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {doctor.hospital.name}, {doctor.hospital.city}
              </p>
            </div>
          </div>

          <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700">
              {consultationMode === "ONLINE" ? (
                <>
                  <Video className="w-3.5 h-3.5" /> Online Video Call
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5" /> In-Clinic Visit
                </>
              )}
            </div>
            <div className="text-xs text-slate-600 font-semibold">
              {selectedDate} at {selectedSlot}
            </div>
          </div>
        </div>

        {/* Step 1: Patient Information & Clinical Reason */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Patient Details</h3>
                <p className="text-xs text-slate-500">
                  Please provide the details of the person who will be attending the eye consultation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Age *</label>
                    <input
                      type="number"
                      required
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Gender *</label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mobile Phone (for SMS / WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address (for Prescription PDF) *</label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Symptoms Picker */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Symptoms (Helps the doctor prepare before consultation)
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SYMPTOMS.map((sym) => {
                    const isSelected = selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          isSelected
                            ? "bg-teal-50 border-teal-600 text-teal-900 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "} {sym}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reason for consultation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Brief Clinical Reason or Prior History
                </label>
                <textarea
                  rows={3}
                  value={consultReason}
                  onChange={(e) => setConsultReason(e.target.value)}
                  placeholder="Describe when the symptoms started, current glasses power, or any past surgery..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 subtle-shadow space-y-3">
              <h4 className="text-sm font-bold text-slate-900">Payment Summary</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Ophthalmologist Consultation Fee</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(baseFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Digital Telehealth / Hospital Platform Fee</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(platformFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(gst)}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Amount Payable</span>
                  <span className="text-teal-700 text-base">{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Secure Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment Gateway Simulation */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 subtle-shadow space-y-6">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  Razorpay Secure Checkout
                </h3>
                <p className="text-xs text-slate-500">256-Bit Encrypted Healthcare Transaction</p>
              </div>
              <span className="text-sm font-extrabold text-teal-700">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod("UPI")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === "UPI"
                    ? "border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-600/20"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <QrCode className="w-5 h-5 text-teal-600" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("CARD")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === "CARD"
                    ? "border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-600/20"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <CreditCard className="w-5 h-5 text-teal-600" />
                <span>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("NETBANKING")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === "NETBANKING"
                    ? "border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-600/20"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-5 h-5 text-teal-600" />
                <span>NetBanking</span>
              </button>
            </div>

            {/* Method Details */}
            {paymentMethod === "UPI" && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                <div className="w-32 h-32 bg-white rounded-xl mx-auto border border-slate-300 p-2 flex items-center justify-center shadow-xs">
                  <div className="text-center space-y-1">
                    <QrCode className="w-16 h-16 mx-auto text-slate-800" />
                    <span className="text-[10px] font-bold text-teal-700">Scan via GPay / PhonePe / Paytm</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  Instant verification via Razorpay UPI Autopay
                </div>
              </div>
            )}

            {paymentMethod === "CARD" && (
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Card Number</label>
                  <input
                    type="text"
                    defaultValue="4111 2222 3333 4444"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Valid Thru</label>
                    <input
                      type="text"
                      defaultValue="08/29"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">CVV</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "NETBANKING" && (
              <div className="space-y-2 text-xs">
                <label className="font-bold text-slate-700">Select Bank</label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white">
                  <option>HDFC Bank</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessingPayment}
                className="flex-1 py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <span>Processing Razorpay Verification...</span>
                ) : (
                  <>
                    <span>Pay {formatCurrency(totalAmount)} & Confirm Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Instant Confirmation Screen */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 subtle-shadow text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900">
                Appointment Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Booking Reference: <strong className="text-teal-700">{confirmedBookingId}</strong>
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Ophthalmologist:</span>
                <span className="font-bold text-slate-800">{doctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="font-bold text-slate-800">{selectedDate} at {selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mode:</span>
                <span className="font-bold text-teal-700">
                  {consultationMode === "ONLINE" ? "Online Video Room" : "In-Clinic Hospital Visit"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-800">{patientName} ({patientAge} yrs, {patientGender})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-emerald-700">{formatCurrency(totalAmount)} (Verified)</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              A confirmation SMS and WhatsApp message with video room links and clinic directions have been dispatched to <strong>{patientPhone}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {consultationMode === "ONLINE" ? (
                <Link
                  href="/consultation/apt-101"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  Enter Live Telehealth Consultation Room
                </Link>
              ) : (
                <Link
                  href="/patient/dashboard"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Building2 className="w-4 h-4" />
                  View Clinic Directions & Token
                </Link>
              )}

              <Link
                href="/patient/dashboard"
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-all"
              >
                Go to Patient Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded-md w-1/3 mx-auto"></div>
            <div className="h-4 bg-slate-200 rounded-md w-1/4 mx-auto"></div>
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
