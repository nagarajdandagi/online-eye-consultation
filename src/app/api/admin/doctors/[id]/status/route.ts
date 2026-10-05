import { NextResponse } from "next/server";
import { toggleDoctorStatus } from "@/lib/services/doctorService";
import { checkAdminAuth } from "@/lib/auth/adminAuth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;

  try {
    const { isActive } = await request.json();
    const updated = toggleDoctorStatus(id, Boolean(isActive), auth.adminEmail);

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Doctor not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Doctor account ${isActive ? "activated" : "deactivated"} successfully.`,
      doctor: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update status." },
      { status: 500 }
    );
  }
}
