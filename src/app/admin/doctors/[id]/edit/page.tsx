"use client";

import React, { useState, useEffect, use, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Camera,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  User,
  Award,
  Trash2,
  X,
  ExternalLink,
  Crop,
  RefreshCw,
  FileCheck
} from "lucide-react";
import { ExtendedDoctor } from "@/lib/services/doctorService";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditDoctorPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const doctorId = resolvedParams.id;
  const router = useRouter();

  const [doctor, setDoctor] = useState<ExtendedDoctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "basic" | "professional" | "consultation" | "clinic" | "availability" | "image" | "account"
  >("basic");

  // Track if form is modified (Unsaved Changes)
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavigationPath, setPendingNavigationPath] = useState<string | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    gender: "Female",
    email: "",
    phone: "",
    dob: "1982-05-15",
    registrationNumber: "",
    registrationAuthority: "Karnataka Medical Council",
    qualification: "",
    specialization: "",
    subSpecialties: "",
    experienceYears: 10,
    about: "",
    expertise: "",
    services: "",
    languages: "English, Hindi, Kannada",
    onlineConsultation: true,
    clinicConsultation: true,
    onlineFee: 700,
    clinicFee: 900,
    followUpFee: 500,
    consultationDuration: 20,
    clinicName: "",
    hospitalName: "",
    address: "",
    area: "",
    city: "",
    state: "Karnataka",
    pincode: "",
    mapsLink: "",
    clinicPhone: "",
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    workingHours: "09:00 AM - 07:00 PM",
    breakTime: "01:00 PM - 02:00 PM",
    onlineAvailability: true,
    offlineAvailability: true,
    isActive: true,
    isVerified: true
  });

  // Image Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageSuccess, setImageSuccess] = useState(false);

  // Fetch current doctor details
  useEffect(() => {
    async function loadDoctor() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/doctors/${doctorId}`, {
          headers: {
            "x-user-role": "ADMIN",
            "x-admin-email": "admin@opticurehealth.com"
          }
        });
        const json = await res.json();
        if (json.success && json.data) {
          const doc: ExtendedDoctor = json.data;
          setDoctor(doc);
          setImagePreview(doc.profileImage);

          setFormData({
            name: doc.name || "",
            title: doc.title || "",
            gender: doc.gender || "Female",
            email: doc.email || `${doc.slug}@opticurehealth.com`,
            phone: doc.phone || "+91 98450 11223",
            dob: doc.dob || "1985-05-15",
            registrationNumber: doc.registrationNumber || "",
            registrationAuthority: doc.registrationAuthority || "Karnataka Medical Council",
            qualification: Array.isArray(doc.qualifications)
              ? doc.qualifications.join(", ")
              : doc.qualifications || "",
            specialization: doc.specialization || "",
            subSpecialties: Array.isArray(doc.subSpecialties)
              ? doc.subSpecialties.join(", ")
              : doc.subSpecialties || "",
            experienceYears: doc.experienceYears || 10,
            about: doc.about || "",
            expertise: Array.isArray(doc.expertise) ? doc.expertise.join(", ") : doc.expertise || "",
            services: Array.isArray(doc.servicesOffered)
              ? doc.servicesOffered.map((s) => `${s.name} (₹${s.price})`).join("\n")
              : "",
            languages: Array.isArray(doc.languages) ? doc.languages.join(", ") : "English, Hindi",
            onlineConsultation: doc.onlineConsultation !== false,
            clinicConsultation: doc.clinicConsultation !== false,
            onlineFee: doc.onlineFee || 700,
            clinicFee: doc.clinicFee || 900,
            followUpFee: doc.followUpFee || 500,
            consultationDuration: doc.consultationDuration || 20,
            clinicName: doc.clinicDetails?.clinicName || doc.clinic?.name || "OptiCure Eye Center",
            hospitalName: doc.clinicDetails?.hospitalName || doc.hospital?.name || "Apex Eye Hospital",
            address: doc.clinicDetails?.address || doc.clinic?.address || "",
            area: doc.clinicDetails?.area || doc.clinic?.locality || "",
            city: doc.clinicDetails?.city || doc.hospital?.city || "Bangalore",
            state: doc.clinicDetails?.state || "Karnataka",
            pincode: doc.clinicDetails?.pincode || "560038",
            mapsLink: doc.clinicDetails?.mapsLink || "",
            clinicPhone: doc.clinicDetails?.phone || doc.clinic?.phone || "",
            workingDays: doc.availabilityConfig?.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            workingHours: doc.availabilityConfig?.workingHours || "09:00 AM - 07:00 PM",
            breakTime: doc.availabilityConfig?.breakTime || "01:00 PM - 02:00 PM",
            onlineAvailability: doc.availabilityConfig?.onlineEnabled ?? true,
            offlineAvailability: doc.availabilityConfig?.clinicEnabled ?? true,
            isActive: doc.isActive !== false,
            isVerified: doc.isVerified ?? true
          });
        } else {
          setError(json.message || "Doctor not found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load doctor profile.");
      } finally {
        setLoading(false);
      }
    }

    loadDoctor();
  }, [doctorId]);

  // Warning when leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    setSaveSuccess(false);
  };

  const handleNavigateWithUnsavedCheck = (e: React.MouseEvent, path: string) => {
    if (isDirty) {
      e.preventDefault();
      setPendingNavigationPath(path);
      setShowUnsavedModal(true);
    }
  };

  // Image Upload Handler (Compliant with Sections 39-44)
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError(null);
    setImageSuccess(false);

    // 1. Validate file format: JPG, JPEG, PNG, WEBP only
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setImageError("Please upload a JPG, PNG, or WEBP image smaller than 5 MB.");
      return;
    }

    // 2. Validate file size: Maximum 5 MB
    const maxBytes = 5 * 1024 * 1024;
    if (file.size > maxBytes) {
      setImageError("File size exceeds 5 MB. Please upload an image smaller than 5 MB.");
      return;
    }

    // 3. Show instant preview using FileReader
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      setImagePreview(base64Data);

      // 4. Auto-crop/resize to 1:1 square canvas & convert to WebP
      try {
        setIsUploadingImage(true);
        const img = new window.Image();
        img.src = base64Data;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const size = Math.min(img.width, img.height);
          canvas.width = Math.min(size, 800);
          canvas.height = Math.min(size, 800);
          const ctx = canvas.getContext("2d");
          if (ctx) {
            // Center crop to 1:1 aspect ratio
            const sx = (img.width - size) / 2;
            const sy = (img.height - size) / 2;
            ctx.drawImage(img, sx, sy, size, size, 0, 0, canvas.width, canvas.height);
          }
          const webpDataUrl = canvas.toDataURL("image/webp", 0.9);

          // 5. Upload to API
          const uploadRes = await fetch(`/api/admin/doctors/${doctorId}/image`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-user-role": "ADMIN",
              "x-admin-email": "admin@opticurehealth.com"
            },
            body: JSON.stringify({ image: webpDataUrl })
          });

          const uploadJson = await uploadRes.json();
          if (uploadJson.success) {
            setImageSuccess(true);
            setIsDirty(true);
            if (doctor) {
              setDoctor({ ...doctor, profileImage: uploadJson.imageUrl });
            }
          } else {
            setImageError(uploadJson.message || "Failed to upload image to storage.");
          }
          setIsUploadingImage(false);
        };
      } catch (err: any) {
        setImageError("Error processing image file: " + err.message);
        setIsUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Submit Doctor Changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const payload: Partial<ExtendedDoctor> = {
        name: formData.name,
        title: formData.title,
        gender: formData.gender as any,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        registrationNumber: formData.registrationNumber,
        registrationAuthority: formData.registrationAuthority,
        qualifications: formData.qualification.split(",").map((q) => q.trim()),
        specialization: formData.specialization,
        subSpecialties: formData.subSpecialties.split(",").map((s) => s.trim()),
        experienceYears: Number(formData.experienceYears),
        about: formData.about,
        expertise: formData.expertise.split(",").map((e) => e.trim()),
        languages: formData.languages.split(",").map((l) => l.trim()),
        onlineConsultation: formData.onlineConsultation,
        clinicConsultation: formData.clinicConsultation,
        onlineFee: Number(formData.onlineFee),
        clinicFee: Number(formData.clinicFee),
        followUpFee: Number(formData.followUpFee),
        consultationDuration: Number(formData.consultationDuration),
        isActive: formData.isActive,
        isVerified: formData.isVerified,
        clinicDetails: {
          clinicName: formData.clinicName,
          hospitalName: formData.hospitalName,
          address: formData.address,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          mapsLink: formData.mapsLink,
          phone: formData.clinicPhone
        },
        availabilityConfig: {
          workingDays: formData.workingDays,
          workingHours: formData.workingHours,
          breakTime: formData.breakTime,
          slotDuration: Number(formData.consultationDuration),
          onlineEnabled: formData.onlineAvailability,
          clinicEnabled: formData.offlineAvailability
        }
      };

      const res = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": "ADMIN",
          "x-admin-email": "admin@opticurehealth.com"
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setIsDirty(false);
        setDoctor(json.data);
      } else {
        setError(json.message || "Failed to update doctor profile.");
      }
    } catch (err: any) {
      setError(err.message || "Network error updating doctor.");
    } finally {
      setSaving(false);
    }
  };

  const toggleWorkingDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.workingDays.includes(day);
      const updated = exists ? prev.workingDays.filter((d) => d !== day) : [...prev.workingDays, day];
      setIsDirty(true);
      return { ...prev, workingDays: updated };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-700">Loading Doctor Profile Editor...</p>
        </div>
      </div>
    );
  }

  if (error && !doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-xl">
          <AlertTriangle className="w-10 h-10 text-rose-600 mx-auto" />
          <h2 className="text-lg font-black text-slate-900">Doctor Profile Not Found</h2>
          <p className="text-xs text-slate-500">{error}</p>
          <Link
            href="/admin/doctors"
            className="inline-block px-5 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold"
          >
            Back to Doctor Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 pb-28">
      {/* Unsaved Changes Confirmation Modal */}
      {showUnsavedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">You have unsaved changes</h3>
                <p className="text-xs text-slate-500">Are you sure you want to leave?</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
              Any unsaved changes made to {doctor?.name || "this doctor"} will be lost if you leave without saving.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUnsavedModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUnsavedModal(false);
                  setIsDirty(false);
                  if (pendingNavigationPath) {
                    router.push(pendingNavigationPath);
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition-colors"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/doctors"
              onClick={(e) => handleNavigateWithUnsavedCheck(e, "/admin/doctors")}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors subtle-shadow"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  Edit Doctor Profile
                </h1>
                {doctor?.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
                {doctor?.isActive ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-300">
                    INACTIVE
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {doctor?.name} • Reg #{doctor?.registrationNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {doctor && (
              <Link
                href={`/doctors/${doctor.slug}`}
                target="_blank"
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-teal-700 text-xs font-bold flex items-center gap-1.5 transition-colors subtle-shadow"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Public View</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success / Error Notification Banners */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>✓ Doctor profile updated successfully</span>
            </div>
            <button
              onClick={() => setSaveSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-700 hover:text-rose-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Navigation Tabs (Desktop & Horizontal Scroll Mobile) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 flex overflow-x-auto gap-1 text-xs font-bold text-slate-600 subtle-shadow no-scrollbar">
          {[
            { id: "basic", label: "Basic Details" },
            { id: "professional", label: "Professional" },
            { id: "consultation", label: "Consultation" },
            { id: "clinic", label: "Clinic Information" },
            { id: "availability", label: "Availability" },
            { id: "image", label: "Profile Image" },
            { id: "account", label: "Account Governance" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-teal-600 text-white shadow-xs"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: Basic Information */}
          {activeTab === "basic" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Basic Information</h3>
                <p className="text-xs text-slate-500">Personal and regulatory registration credentials.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Title / Designation</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="e.g. Senior Vitreo-Retinal Surgeon"
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Official Doctor Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-mono focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleFieldChange("gender", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-white font-medium focus:outline-teal-600"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleFieldChange("dob", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Medical Registration Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.registrationNumber}
                    onChange={(e) => handleFieldChange("registrationNumber", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-teal-800 font-mono font-bold focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Registration Authority / Council</label>
                  <input
                    type="text"
                    value={formData.registrationAuthority}
                    onChange={(e) => handleFieldChange("registrationAuthority", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Professional Information */}
          {activeTab === "professional" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Professional Qualifications & Expertise</h3>
                <p className="text-xs text-slate-500">Surgical qualifications, sub-specialties, languages, and bio.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Qualifications (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={formData.qualification}
                      onChange={(e) => handleFieldChange("qualification", e.target.value)}
                      placeholder="e.g. MBBS, MS (Ophthalmology), DNB, FICO"
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Years of Experience *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={60}
                      value={formData.experienceYears}
                      onChange={(e) => handleFieldChange("experienceYears", e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Primary Specialization *</label>
                    <select
                      value={formData.specialization}
                      onChange={(e) => handleFieldChange("specialization", e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-white focus:outline-teal-600"
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

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Languages Spoken</label>
                    <input
                      type="text"
                      value={formData.languages}
                      onChange={(e) => handleFieldChange("languages", e.target.value)}
                      placeholder="e.g. English, Hindi, Kannada, Tamil"
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Sub-Specialties & Clinical Focus</label>
                  <input
                    type="text"
                    value={formData.subSpecialties}
                    onChange={(e) => handleFieldChange("subSpecialties", e.target.value)}
                    placeholder="e.g. Diabetic Retinopathy, Macular Holes, FLACS Laser Cataract"
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Areas of Expertise</label>
                  <input
                    type="text"
                    value={formData.expertise}
                    onChange={(e) => handleFieldChange("expertise", e.target.value)}
                    placeholder="e.g. 27G Vitrectomy, Premium Multifocal IOLs, Anti-VEGF Therapy"
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">About Doctor (Bio & Clinical Philosophy)</label>
                  <textarea
                    rows={4}
                    value={formData.about}
                    onChange={(e) => handleFieldChange("about", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Consultation Information */}
          {activeTab === "consultation" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Consultation Pricing & Duration</h3>
                <p className="text-xs text-slate-500">Configure appointment fees for video telehealth and in-person hospital visits.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Online Video Toggle */}
                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">Online Video Consultation</h4>
                    <p className="text-[11px] text-slate-500">Enable WebRTC telemedicine calls</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.onlineConsultation}
                    onChange={(e) => handleFieldChange("onlineConsultation", e.target.checked)}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                {/* Clinic Toggle */}
                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">In-Clinic Consultation</h4>
                    <p className="text-[11px] text-slate-500">Enable physical hospital appointments</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.clinicConsultation}
                    onChange={(e) => handleFieldChange("clinicConsultation", e.target.checked)}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Online Consultation Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.onlineFee}
                    onChange={(e) => handleFieldChange("onlineFee", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-teal-800 font-bold focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Clinic Consultation Fee (₹) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.clinicFee}
                    onChange={(e) => handleFieldChange("clinicFee", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Follow-up Consultation Fee (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.followUpFee}
                    onChange={(e) => handleFieldChange("followUpFee", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-medium focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Slot Duration (Minutes)</label>
                  <select
                    value={formData.consultationDuration}
                    onChange={(e) => handleFieldChange("consultationDuration", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 bg-white font-medium focus:outline-teal-600"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={20}>20 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Clinic Information */}
          {activeTab === "clinic" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Clinic & Hospital Practice Location</h3>
                <p className="text-xs text-slate-500">Address, city, maps location, and contact desk.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Hospital / Facility Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.hospitalName}
                    onChange={(e) => handleFieldChange("hospitalName", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Clinic / Wing Name</label>
                  <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => handleFieldChange("clinicName", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-700">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleFieldChange("address", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Area / Locality *</label>
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => handleFieldChange("area", e.target.value)}
                    placeholder="e.g. Indiranagar, Whitefield, Koramangala"
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleFieldChange("city", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleFieldChange("state", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">PIN Code</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleFieldChange("pincode", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 font-mono focus:outline-teal-600"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-slate-700">Google Maps Link</label>
                  <input
                    type="url"
                    value={formData.mapsLink}
                    onChange={(e) => handleFieldChange("mapsLink", e.target.value)}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Availability */}
          {activeTab === "availability" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Working Schedule & Availability</h3>
                <p className="text-xs text-slate-500">Configure practice days, working shifts, and lunch break intervals.</p>
              </div>

              <div className="space-y-5 text-xs">
                {/* Working Days */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-700">Working Days</label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                      const isSelected = formData.workingDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleWorkingDay(day)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isSelected
                              ? "bg-teal-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Working Hours</label>
                    <input
                      type="text"
                      value={formData.workingHours}
                      onChange={(e) => handleFieldChange("workingHours", e.target.value)}
                      placeholder="e.g. 09:00 AM - 07:00 PM"
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Break Time</label>
                    <input
                      type="text"
                      value={formData.breakTime}
                      onChange={(e) => handleFieldChange("breakTime", e.target.value)}
                      placeholder="e.g. 01:00 PM - 02:00 PM"
                      className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-teal-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Profile Image Upload & UX (Compliant with Sections 39-44) */}
          {activeTab === "image" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Doctor Profile Photo</h3>
                <p className="text-xs text-slate-500">
                  Upload a high-resolution, professional portrait. Aspect ratio 1:1, up to 5 MB (JPG, PNG, WebP).
                </p>
              </div>

              {/* Upload Component Card */}
              <div className="max-w-md mx-auto p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-teal-500 transition-colors text-center space-y-5 bg-slate-50/50">
                {/* 1:1 Aspect Ratio Preview Frame */}
                <div className="relative w-44 h-44 mx-auto rounded-3xl overflow-hidden bg-slate-200 border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt={doctor?.name || "Doctor Preview"}
                      fill
                      sizes="176px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Camera className="w-12 h-12" />
                    </div>
                  )}

                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex flex-col items-center justify-center text-white text-xs font-bold gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-teal-400" />
                      <span>Optimizing & Saving...</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Aspect Ratio 1:1 • Max 5 MB
                  </h4>
                  <p className="text-[11px] text-slate-400">Supported formats: JPG, JPEG, PNG, WEBP</p>
                </div>

                {/* Hidden Native File Input supporting Mobile Camera, Gallery, and Desktop File System */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Change Image</span>
                  </button>
                </div>

                {imageSuccess && (
                  <p className="text-xs font-bold text-emerald-700 animate-fade-in flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Image optimized to WebP and saved successfully!
                  </p>
                )}

                {imageError && (
                  <p className="text-xs font-bold text-rose-600 animate-fade-in flex items-center justify-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    {imageError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: Account Governance */}
          {activeTab === "account" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 subtle-shadow space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Account Governance & Security</h3>
                <p className="text-xs text-slate-500">Supervisory controls for activation, medical council verification, and profile deletion.</p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Account Active State */}
                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900">Doctor Account Active Status</h4>
                    <p className="text-slate-500 text-[11px]">
                      When deactivated, the doctor will be instantly hidden from patient searches and booking.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleFieldChange("isActive", e.target.checked)}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                {/* Medical Council Verification */}
                <div className="p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900">Medical Council Verified Badge</h4>
                    <p className="text-slate-500 text-[11px]">
                      Displays official verified badge on public profile after council registration check.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => handleFieldChange("isVerified", e.target.checked)}
                    className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                  />
                </div>

                {/* Danger Zone */}
                <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-3">
                  <h4 className="font-bold text-rose-800 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    Danger Zone
                  </h4>
                  <p className="text-xs text-rose-700">
                    Permanently delete this doctor profile and unbind from hospital departments.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Permanently delete ${doctor?.name}? This cannot be undone.`)) {
                        fetch(`/api/admin/doctors/${doctorId}`, {
                          method: "DELETE",
                          headers: {
                            "x-user-role": "ADMIN",
                            "x-admin-email": "admin@opticurehealth.com"
                          }
                        }).then(() => router.push("/admin/doctors"));
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
                  >
                    Delete Doctor Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Sticky Mobile/Desktop Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="text-xs">
              {isDirty ? (
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  You have unsaved changes
                </span>
              ) : (
                <span className="text-slate-400 font-medium">All changes saved</span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/admin/doctors"
                onClick={(e) => handleNavigateWithUnsavedCheck(e, "/admin/doctors")}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-teal-600/20 transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
