import { NextResponse } from "next/server";
import { getAllDoctors, addDoctor } from "@/lib/services/doctorService";
import { checkAdminAuth } from "@/lib/auth/adminAuth";

export async function GET(request: Request) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  const doctors = getAllDoctors();
  return NextResponse.json({
    success: true,
    total: doctors.length,
    data: doctors
  });
}

export async function POST(request: Request) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const body = await request.json();

    if (!body.name || !body.specialization || !body.registrationNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor name, specialization, and medical registration number are required."
        },
        { status: 400 }
      );
    }

    const createdDoctor = addDoctor(body, auth.adminEmail);

    return NextResponse.json({
      success: true,
      message: "Doctor created successfully.",
      doctor: createdDoctor
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create doctor." },
      { status: 500 }
    );
  }
}
