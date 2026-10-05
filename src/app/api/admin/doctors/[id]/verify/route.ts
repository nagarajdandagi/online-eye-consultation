import { NextResponse } from "next/server";
import { toggleDoctorVerification } from "@/lib/services/doctorService";
import { checkAdminAuth } from "@/lib/auth/adminAuth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;

  try {
    const { isVerified } = await request.json();
    const updated = toggleDoctorVerification(id, Boolean(isVerified), auth.adminEmail);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Doctor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Doctor credentials marked as ${isVerified ? "Verified" : "Unverified"}.`,
      doctor: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update verification." },
      { status: 500 }
    );
  }
}
