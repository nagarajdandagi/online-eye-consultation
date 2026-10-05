import { Doctor } from "@/types";
import { DOCTORS } from "@/lib/data/doctors";
import { logAudit } from "./auditService";

export interface ExtendedDoctor extends Doctor {
  email?: string;
  phone?: string;
  dob?: string;
  registrationAuthority?: string;
  followUpFee?: number;
  consultationDuration?: number;
  isActive: boolean;
  clinicDetails?: {
    clinicName: string;
    hospitalName: string;
    address: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    mapsLink?: string;
    phone: string;
  };
  availabilityConfig?: {
    workingDays: string[];
    workingHours: string;
    breakTime: string;
    slotDuration: number;
    onlineEnabled: boolean;
    clinicEnabled: boolean;
  };
}

// Global in-memory singleton to persist runtime admin updates across requests
declare global {
  // eslint-disable-next-line no-var
  var __OPTICURE_DOCTORS__: ExtendedDoctor[] | undefined;
}

function initializeDoctors(): ExtendedDoctor[] {
  return DOCTORS.map((d) => ({
    ...d,
    email: `${d.slug}@opticurehealth.com`,
    phone: "+91 98450 " + Math.floor(10000 + Math.random() * 90000),
    dob: "1982-05-15",
    registrationAuthority: "Karnataka Medical Council",
    followUpFee: Math.round(d.onlineFee * 0.7),
    consultationDuration: 20,
    isActive: true,
    clinicDetails: {
      clinicName: d.clinic.name,
      hospitalName: d.hospital.name,
      address: d.clinic.address,
      area: d.clinic.locality,
      city: d.hospital.city,
      state: "Karnataka",
      pincode: "560038",
      mapsLink: "https://maps.google.com/?q=" + encodeURIComponent(`${d.clinic.name} ${d.hospital.city}`),
      phone: d.clinic.phone
    },
    availabilityConfig: {
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      workingHours: "09:00 AM - 07:00 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slotDuration: 20,
      onlineEnabled: d.onlineConsultation,
      clinicEnabled: d.clinicConsultation
    }
  }));
}

if (!global.__OPTICURE_DOCTORS__) {
  global.__OPTICURE_DOCTORS__ = initializeDoctors();
}

export function getAllDoctors(): ExtendedDoctor[] {
  if (!global.__OPTICURE_DOCTORS__) {
    global.__OPTICURE_DOCTORS__ = initializeDoctors();
  }
  return global.__OPTICURE_DOCTORS__;
}

export function getDoctorById(id: string): ExtendedDoctor | undefined {
  const doctors = getAllDoctors();
  return doctors.find((d) => d.id === id || d.slug === id);
}

export function addDoctor(newDocData: Partial<ExtendedDoctor>, adminEmail = "admin@opticurehealth.com"): ExtendedDoctor {
  const doctors = getAllDoctors();
  const id = newDocData.id || `doc-${Date.now()}`;
  const slug = (newDocData.name || "doctor")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const fullDoctor: ExtendedDoctor = {
    id,
    slug,
    name: newDocData.name || "Dr. New Specialist",
    title: newDocData.title || `Consultant ${newDocData.specialization || "Ophthalmologist"}`,
    gender: newDocData.gender || "Female",
    profileImage:
      newDocData.profileImage ||
      (newDocData.gender === "Male"
        ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
        : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"),
    qualifications: newDocData.qualifications || ["MBBS", "MS (Ophthalmology)"],
    specialization: newDocData.specialization || "Comprehensive Ophthalmology",
    subSpecialties: newDocData.subSpecialties || ["General Eye Care"],
    experienceYears: Number(newDocData.experienceYears) || 10,
    registrationNumber: newDocData.registrationNumber || "KMC-" + Math.floor(10000 + Math.random() * 90000),
    registrationAuthority: newDocData.registrationAuthority || "State Medical Council",
    languages: newDocData.languages || ["English", "Hindi"],
    onlineConsultation: newDocData.onlineConsultation !== false,
    clinicConsultation: newDocData.clinicConsultation !== false,
    onlineFee: Number(newDocData.onlineFee) || 700,
    clinicFee: Number(newDocData.clinicFee) || 900,
    followUpFee: Number(newDocData.followUpFee) || 500,
    consultationDuration: Number(newDocData.consultationDuration) || 20,
    rating: 4.9,
    reviewCount: 0,
    patientsTreated: 0,
    about: newDocData.about || "Experienced eye specialist dedicated to patient wellness.",
    expertise: newDocData.expertise || newDocData.subSpecialties || ["Clinical Examination"],
    servicesOffered: newDocData.servicesOffered || [
      { name: "Consultation & Slit-lamp Exam", price: 800 }
    ],
    education: newDocData.education || [
      { degree: "MBBS, MS", institution: "Medical College", year: "2012" }
    ],
    hospital: newDocData.hospital || {
      id: "hosp-1",
      name: "OptiCure Apex Eye Hospital",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      phone: "+91 80 4920 1100",
      rating: 4.9
    },
    clinic: newDocData.clinic || {
      id: "clinic-1",
      name: "OptiCure Specialty Clinic",
      city: "Bangalore",
      locality: "Indiranagar",
      address: "100 Feet Rd, Indiranagar",
      phone: "+91 80 4920 1101"
    },
    nextAvailableSlot: {
      date: "Tomorrow",
      time: "10:00 AM",
      mode: "ONLINE"
    },
    isVerified: newDocData.isVerified ?? true,
    isFeatured: newDocData.isFeatured ?? false,
    isActive: true,
    email: newDocData.email || `${slug}@opticurehealth.com`,
    phone: newDocData.phone || "+91 98450 11223",
    dob: newDocData.dob || "1985-01-01",
    clinicDetails: newDocData.clinicDetails || {
      clinicName: "OptiCure Specialty Clinic",
      hospitalName: "OptiCure Apex Eye Hospital",
      address: "100 Feet Road, Indiranagar",
      area: "Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 80 4920 1101"
    },
    availabilityConfig: newDocData.availabilityConfig || {
      workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      workingHours: "09:00 AM - 07:00 PM",
      breakTime: "01:00 PM - 02:00 PM",
      slotDuration: 20,
      onlineEnabled: true,
      clinicEnabled: true
    }
  };

  global.__OPTICURE_DOCTORS__ = [fullDoctor, ...doctors];

  logAudit({
    adminUser: adminEmail,
    action: "CREATED_DOCTOR",
    doctorId: fullDoctor.id,
    doctorName: fullDoctor.name,
    details: `Created new doctor profile for ${fullDoctor.name} (${fullDoctor.specialization})`
  });

  return fullDoctor;
}

export function updateDoctor(
  id: string,
  updates: Partial<ExtendedDoctor>,
  adminEmail = "admin@opticurehealth.com"
): ExtendedDoctor | null {
  const doctors = getAllDoctors();
  const index = doctors.findIndex((d) => d.id === id || d.slug === id);
  if (index === -1) return null;

  const currentDoc = doctors[index];
  const changes: string[] = [];

  // Track changed fields for audit log
  Object.keys(updates).forEach((key) => {
    const k = key as keyof ExtendedDoctor;
    if (JSON.stringify(currentDoc[k]) !== JSON.stringify(updates[k])) {
      changes.push(`${key}: ${JSON.stringify(currentDoc[k])} → ${JSON.stringify(updates[k])}`);
    }
  });

  const updatedDoc: ExtendedDoctor = {
    ...currentDoc,
    ...updates,
    hospital: {
      ...currentDoc.hospital,
      ...(updates.hospital || {})
    },
    clinic: {
      ...currentDoc.clinic,
      ...(updates.clinic || {})
    },
    clinicDetails: {
      ...(currentDoc.clinicDetails || ({} as any)),
      ...(updates.clinicDetails || {})
    },
    availabilityConfig: {
      ...(currentDoc.availabilityConfig || ({} as any)),
      ...(updates.availabilityConfig || {})
    }
  };

  doctors[index] = updatedDoc;
  global.__OPTICURE_DOCTORS__ = doctors;

  if (changes.length > 0) {
    logAudit({
      adminUser: adminEmail,
      action: "UPDATED_DOCTOR",
      doctorId: updatedDoc.id,
      doctorName: updatedDoc.name,
      details: `Updated fields: ${changes.slice(0, 3).join("; ")}${changes.length > 3 ? ` (+${changes.length - 3} more)` : ""}`
    });
  }

  return updatedDoc;
}

export function toggleDoctorStatus(
  id: string,
  isActive: boolean,
  adminEmail = "admin@opticurehealth.com"
): ExtendedDoctor | null {
  const doctor = updateDoctor(id, { isActive }, adminEmail);
  if (doctor) {
    logAudit({
      adminUser: adminEmail,
      action: isActive ? "ACTIVATED_DOCTOR" : "DEACTIVATED_DOCTOR",
      doctorId: doctor.id,
      doctorName: doctor.name,
      details: `Account status set to ${isActive ? "ACTIVE" : "DEACTIVATED"}`
    });
  }
  return doctor;
}

export function toggleDoctorVerification(
  id: string,
  isVerified: boolean,
  adminEmail = "admin@opticurehealth.com"
): ExtendedDoctor | null {
  const doctor = updateDoctor(id, { isVerified }, adminEmail);
  if (doctor) {
    logAudit({
      adminUser: adminEmail,
      action: isVerified ? "VERIFIED_DOCTOR" : "UNVERIFIED_DOCTOR",
      doctorId: doctor.id,
      doctorName: doctor.name,
      details: `Medical council credentials marked ${isVerified ? "VERIFIED" : "UNVERIFIED"}`
    });
  }
  return doctor;
}

export function deleteDoctor(id: string, adminEmail = "admin@opticurehealth.com"): boolean {
  const doctors = getAllDoctors();
  const existing = doctors.find((d) => d.id === id || d.slug === id);
  if (!existing) return false;

  global.__OPTICURE_DOCTORS__ = doctors.filter((d) => d.id !== id && d.slug !== id);

  logAudit({
    adminUser: adminEmail,
    action: "DELETED_DOCTOR",
    doctorId: existing.id,
    doctorName: existing.name,
    details: `Doctor permanently deleted by administrator`
  });

  return true;
}
