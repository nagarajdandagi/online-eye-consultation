"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Share2,
  MessageSquare,
  FileText,
  User,
  ShieldCheck,
  Clock,
  Sparkles,
  Send,
  Download,
  AlertCircle,
  Eye,
  CheckCircle2
} from "lucide-react";
import { SAMPLE_APPOINTMENTS } from "@/lib/data/appointments";
import { SAMPLE_PRESCRIPTIONS } from "@/lib/data/prescriptions";

export default function ConsultationRoomPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params?.id as string;

  const appointment = SAMPLE_APPOINTMENTS.find((a) => a.id === appointmentId) || SAMPLE_APPOINTMENTS[0];
  const prescription = SAMPLE_PRESCRIPTIONS[0];

  // Video controls
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeRightTab, setActiveRightTab] = useState<"patient" | "chat" | "prescription">("patient");
  const [isCallEnded, setIsCallEnded] = useState(false);

  // Call timer
  const [secondsElapsed, setSecondsElapsed] = useState(142); // 2m 22s elapsed

  useEffect(() => {
    if (isCallEnded) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCallEnded]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // In-call chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "Dr. Arundhati Deshmukh",
      text: "Hello Rahul, I can see your video clearly. How has your right eye vision been since the last evaluation?",
      time: "04:31 PM"
    },
    {
      sender: "Rahul Sharma",
      text: "Hi Doctor! It feels less blurry today, but I still see slight floaters when looking at white screens.",
      time: "04:32 PM"
    }
  ]);
  const [newChatText, setNewChatText] = useState("");

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "Rahul Sharma",
        text: newChatText.trim(),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
    setNewChatText("");
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col justify-between">
      {/* Top Telehealth Header Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
            <Eye className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-100">
                Live Consultation: {appointment.doctor.name}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                HD WebRTC Encrypted
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Patient: {appointment.patientName} • Apt #{appointment.appointmentNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-mono text-emerald-400 font-bold">
            <Clock className="w-3.5 h-3.5" />
            {formatTimer(secondsElapsed)}
          </div>
          <Link
            href="/patient/dashboard"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Main Video & Chart Split View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 max-w-7xl mx-auto w-full">
        {/* Left: Video Canvas (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden min-h-[480px]">
          {/* Main Remote Feed (Doctor) */}
          <div className="relative w-full h-full flex-1 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=1200"
              alt="Doctor Stream"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

            {/* Doctor Name Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white">{appointment.doctor.name}</span>
              <span className="text-[10px] text-teal-300 font-medium">Vitreo-Retina</span>
            </div>

            {/* Floating Picture-in-Picture Local Camera (Patient) */}
            <div className="absolute bottom-4 right-4 z-10 w-36 h-28 sm:w-48 sm:h-36 rounded-2xl overflow-hidden border-2 border-teal-500/50 shadow-2xl bg-slate-800">
              {isCameraOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-900 text-xs">
                  <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                  Camera Off
                </div>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
                  alt="Patient Self View"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute bottom-1 left-2 text-[10px] font-semibold text-white drop-shadow-md">
                You ({appointment.patientName})
              </div>
            </div>
          </div>

          {/* In-Call Controls Toolbar */}
          <div className="p-4 bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-center gap-3 sm:gap-4 z-20">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3.5 rounded-2xl transition-all ${
                isMuted
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
              title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsCameraOff(!isCameraOff)}
              className={`p-3.5 rounded-2xl transition-all ${
                isCameraOff
                  ? "bg-rose-600 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
              title={isCameraOff ? "Turn On Camera" : "Turn Off Camera"}
            >
              {isCameraOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-3.5 rounded-2xl transition-all ${
                isScreenSharing
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
              title="Share OCT Scan or Medical Report Screen"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setActiveRightTab("chat")}
              className={`p-3.5 rounded-2xl transition-all ${
                activeRightTab === "chat"
                  ? "bg-teal-600 text-white"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
              title="Open Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsCallEnded(true)}
              className="px-5 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <PhoneOff className="w-5 h-5" />
              <span>End Call</span>
            </button>
          </div>
        </div>

        {/* Right: Patient Dossier, Chat & Prescriptions (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="p-2 border-b border-slate-800 flex gap-1 text-xs font-bold text-slate-400">
            <button
              type="button"
              onClick={() => setActiveRightTab("patient")}
              className={`flex-1 py-2 rounded-xl transition-colors ${
                activeRightTab === "patient" ? "bg-slate-800 text-white" : "hover:text-white"
              }`}
            >
              Patient Dossier
            </button>
            <button
              type="button"
              onClick={() => setActiveRightTab("chat")}
              className={`flex-1 py-2 rounded-xl transition-colors ${
                activeRightTab === "chat" ? "bg-slate-800 text-white" : "hover:text-white"
              }`}
            >
              In-Call Chat
            </button>
            <button
              type="button"
              onClick={() => setActiveRightTab("prescription")}
              className={`flex-1 py-2 rounded-xl transition-colors ${
                activeRightTab === "prescription" ? "bg-slate-800 text-white" : "hover:text-white"
              }`}
            >
              Prescription
            </button>
          </div>

          {/* Tab 1: Patient Details & Symptoms */}
          {activeRightTab === "patient" && (
            <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  Chief Clinical Complaint
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">
                  {appointment.reason}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {appointment.symptoms.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Patient Background
                </span>
                <div className="space-y-1 text-slate-300">
                  <div>Age/Gender: <strong>{appointment.patientAge} Yrs, {appointment.patientGender}</strong></div>
                  <div>Phone: <strong>{appointment.patientPhone}</strong></div>
                  <div>Known Allergies: <strong className="text-emerald-400">None reported</strong></div>
                  <div>Spectacles Power: <strong>OD: -2.25 D, OS: -2.00 D</strong></div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-900/30 border border-teal-700/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  Doctor Clinical Guidance
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Doctor is examining right foveal contour. Patient advised to reduce continuous screen exposure and maintain strict glycemic control.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Chat */}
          {activeRightTab === "chat" && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="p-4 space-y-3 overflow-y-auto flex-1 custom-scrollbar text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl space-y-1 ${
                      msg.sender === "Rahul Sharma"
                        ? "bg-teal-600/30 border border-teal-500/40 ml-4"
                        : "bg-slate-800 border border-slate-700 mr-4"
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-300">{msg.sender}</span>
                      <span className="text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={newChatText}
                  onChange={(e) => setNewChatText(e.target.value)}
                  placeholder="Type a message or questions..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Prescription Live Preview */}
          {activeRightTab === "prescription" && (
            <div className="p-4 space-y-4 overflow-y-auto flex-1 custom-scrollbar text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">
                  Diagnosis
                </span>
                <p className="font-semibold text-slate-200">{prescription.diagnosis}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Medications Prescribed
                </span>
                {prescription.medications.map((m, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                    <div className="font-bold text-teal-300">{m.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {m.dosage} • {m.frequency} • {m.eye}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/patient/dashboard"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors block text-center"
              >
                <Download className="w-3.5 h-3.5" />
                Download Official Prescription PDF
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Post-Call Modal */}
      {isCallEnded && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">Consultation Completed</h3>
              <p className="text-xs text-slate-400">
                Total Duration: {formatTimer(secondsElapsed)} with {appointment.doctor.name}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Prescription Status:</span>
                <span className="font-bold text-emerald-400">Ready for Download</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Follow-up Recommended:</span>
                <span className="font-bold text-slate-200">15 November 2026</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/patient/dashboard"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Go to Patient Dashboard & View Prescription
              </Link>
              <Link
                href="/doctors"
                className="w-full py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold text-xs transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
