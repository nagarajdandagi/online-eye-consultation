import { NextResponse } from "next/server";
import { getDoctorById, updateDoctor, deleteDoctor } from "@/lib/services/doctorService";
import { checkAdminAuth } from "@/lib/auth/adminAuth";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const doctor = getDoctorById(id);

  if (!doctor) {
    return NextResponse.json(
      { success: false, message: "Doctor not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: doctor
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;

  try {
    const updates = await request.json();
    const updated = updateDoctor(id, updates, auth.adminEmail);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Doctor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Doctor profile updated successfully.",
      doctor: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update doctor." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const success = deleteDoctor(id, auth.adminEmail);

  if (!success) {
    return NextResponse.json(
      { success: false, message: "Doctor not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Doctor deleted successfully."
  });
}
