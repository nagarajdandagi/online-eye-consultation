export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export type ConsultationType = "ONLINE" | "CLINIC" | "BOTH";

export interface Hospital {
  id: string;
  name: string;
  city: string;
  locality: string;
  address: string;
  phone: string;
  rating: number;
  image?: string;
}

export interface Clinic {
  id: string;
  name: string;
  hospitalName?: string;
  city: string;
  locality: string;
  address: string;
  phone: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  gender: "Male" | "Female";
  profileImage: string;
  qualifications: string[]; // e.g. ["MBBS", "MS (Ophthalmology)", "DNB", "FICO (UK)"]
  specialization: string; // e.g. "Cataract & Refractive Surgeon"
  subSpecialties: string[]; // e.g. ["Vitreo-Retina", "Diabetic Retinopathy", "Macular Degeneration"]
  experienceYears: number;
  registrationNumber: string; // e.g. "KMC-74921"
  languages: string[];
  onlineConsultation: boolean;
  clinicConsultation: boolean;
  onlineFee: number;
  clinicFee: number;
  rating: number;
  reviewCount: number;
  patientsTreated: number;
  about: string;
  expertise: string[];
  servicesOffered: { name: string; price?: number }[];
  education: { degree: string; institution: string; year: string }[];
  hospital: Hospital;
  clinic: Clinic;
  nextAvailableSlot: {
    date: string;
    time: string;
    mode: "ONLINE" | "CLINIC";
  };
  isVerified: boolean;
  isFeatured?: boolean;
}

export type AppointmentStatus =
  | "CONFIRMED"
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED"
  | "RESCHEDULED"
  | "NO_SHOW";

export type PaymentStatus = "PAID" | "PENDING" | "REFUNDED" | "FAILED";

export interface Appointment {
  id: string;
  appointmentNumber: string;
  doctorId: string;
  doctor: Doctor;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: "Male" | "Female" | "Other";
  patientPhone: string;
  patientEmail: string;
  type: "ONLINE" | "CLINIC";
  scheduledDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:30 AM"
  symptoms: string[];
  reason: string;
  status: AppointmentStatus;
  fee: number;
  platformFee: number;
  tax: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  meetingLink?: string;
  notes?: string;
  createdAt: string;
}

export interface Medication {
  name: string;
  form: "Eye Drops" | "Eye Ointment" | "Tablet" | "Capsule";
  dosage: string; // e.g. "1 drop"
  frequency: string; // e.g. "3 times daily"
  eye: "OD (Right Eye)" | "OS (Left Eye)" | "OU (Both Eyes)";
  duration: string; // e.g. "7 days"
  instructions: string; // e.g. "Shake well, 5 mins apart from other drops"
}

export interface EyeRefraction {
  sphere: string;
  cylinder: string;
  axis: string;
  va: string; // Visual Acuity e.g. "6/6", "20/20"
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  doctorRegNumber: string;
  doctorQualifications: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  diagnosis: string;
  clinicalNotes: string;
  refractionRight: EyeRefraction;
  refractionLeft: EyeRefraction;
  iopOd?: string; // Intraocular Pressure OD (mmHg)
  iopOs?: string; // Intraocular Pressure OS (mmHg)
  medications: Medication[];
  advice: string[];
  followUpDate?: string;
}

export interface PatientReview {
  id: string;
  doctorId: string;
  patientName: string;
  rating: number;
  date: string;
  conditionTreated: string;
  comment: string;
  verified: boolean;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  title: string;
  category: "OCT Scan" | "Visual Field (Perimetry)" | "Fundus Photo" | "Prescription" | "Discharge Summary";
  date: string;
  doctorName: string;
  fileSize: string;
  fileUrl: string;
}

export interface SpecialityInfo {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  commonConditions: string[];
  keySymptoms: string[];
  diagnosticProcedures: string[];
  iconName: string;
}
