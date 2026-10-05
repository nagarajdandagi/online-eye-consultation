import { NextResponse } from "next/server";
import { DOCTORS } from "@/lib/data/doctors";
import { Doctor } from "@/types";

// In-memory runtime storage so newly added doctors persist across API requests in this dev process
let runtimeDoctors: Doctor[] = [...DOCTORS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();
  const city = searchParams.get("city")?.toLowerCase();
  const specialty = searchParams.get("specialty")?.toLowerCase();
  const mode = searchParams.get("mode")?.toLowerCase();

  let results = [...runtimeDoctors];

  if (q) {
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q) ||
        d.subSpecialties.some((sub) => sub.toLowerCase().includes(q))
    );
  }

  if (city) {
    results = results.filter((d) => d.hospital.city.toLowerCase() === city);
  }

  if (specialty) {
    results = results.filter(
      (d) =>
        d.specialization.toLowerCase().includes(specialty) ||
        d.subSpecialties.some((sub) => sub.toLowerCase().includes(specialty))
    );
  }

  if (mode === "online") {
    results = results.filter((d) => d.onlineConsultation);
  } else if (mode === "clinic") {
    results = results.filter((d) => d.clinicConsultation);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      title,
      gender,
      qualifications,
      specialization,
      subSpecialties,
      experienceYears,
      registrationNumber,
      languages,
      onlineFee,
      clinicFee,
      city,
      locality,
      hospitalName,
      about
    } = body;

    if (!name || !specialization || !registrationNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor name, specialization, and registration number are required."
        },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newDoctor: Doctor = {
      id: `doc-${Date.now()}`,
      slug,
      name,
      title: title || `Consultant ${specialization}`,
      gender: gender || "Female",
      profileImage:
        gender === "Male"
          ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
          : "https://images.unsplash.com/photo-1594824813589-44e21a2c3569?auto=format&fit=crop&q=80&w=400",
      qualifications: qualifications || ["MBBS", "MS (Ophthalmology)"],
      specialization,
      subSpecialties: subSpecialties || [specialization],
      experienceYears: Number(experienceYears) || 10,
      registrationNumber,
      languages: languages || ["English", "Hindi"],
      onlineConsultation: true,
      clinicConsultation: true,
      onlineFee: Number(onlineFee) || 700,
      clinicFee: Number(clinicFee) || 900,
      rating: 4.9,
      reviewCount: 0,
      patientsTreated: 0,
      about:
        about ||
        `${name} is a dedicated ophthalmologist specializing in ${specialization} with ${experienceYears || 10}+ years of clinical experience.`,
      expertise: subSpecialties || [specialization],
      servicesOffered: [
        { name: "Ophthalmic Examination & Slit-lamp Biomicroscopy", price: 800 },
        { name: `${specialization} Specialized Workup`, price: 1500 }
      ],
      education: [
        { degree: "MBBS", institution: "Medical College", year: "2010" },
        { degree: "MS Ophthalmology", institution: "Institute of Ophthalmology", year: "2014" }
      ],
      hospital: {
        id: `hosp-${Date.now()}`,
        name: hospitalName || "OptiCure Eye Center",
        city: city || "Bangalore",
        locality: locality || "Indiranagar",
        address: `${locality || "Indiranagar"}, ${city || "Bangalore"}`,
        phone: "+91 80 4920 1100",
        rating: 4.9
      },
      clinic: {
        id: `clinic-${Date.now()}`,
        name: `${hospitalName || "OptiCure"} Specialty Clinic`,
        city: city || "Bangalore",
        locality: locality || "Indiranagar",
        address: `${locality || "Indiranagar"}, ${city || "Bangalore"}`,
        phone: "+91 80 4920 1101"
      },
      nextAvailableSlot: {
        date: "Tomorrow",
        time: "10:00 AM",
        mode: "ONLINE"
      },
      isVerified: true,
      isFeatured: false
    };

    runtimeDoctors = [newDoctor, ...runtimeDoctors];

    return NextResponse.json({
      success: true,
      message: "Doctor added successfully.",
      doctor: newDoctor
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to add doctor." },
      { status: 500 }
    );
  }
}
