import { NextResponse } from "next/server";
import { getDoctorById, updateDoctor } from "@/lib/services/doctorService";
import { checkAdminAuth } from "@/lib/auth/adminAuth";
import { logAudit } from "@/lib/services/auditService";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(
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

  try {
    const contentType = request.headers.get("content-type") || "";

    let imageUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("image") as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, message: "No image file provided." },
          { status: 400 }
        );
      }

      // Validate MIME type
      if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid file type. Please upload a JPG, PNG, or WEBP image."
          },
          { status: 400 }
        );
      }

      // Validate File Size (5MB limit)
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            success: false,
            message: "File too large. Maximum allowed size is 5 MB."
          },
          { status: 400 }
        );
      }

      // Convert buffer to WebP / Data URL representation for immediate reliable zero-setup hosting
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    } else {
      // JSON body with base64 data URL
      const body = await request.json();
      if (!body.imageUrl) {
        return NextResponse.json(
          { success: false, message: "imageUrl is required." },
          { status: 400 }
        );
      }

      // If base64 data URL, validate format
      if (body.imageUrl.startsWith("data:")) {
        const mimeMatch = body.imageUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (!mimeMatch || !ALLOWED_MIME_TYPES.includes(mimeMatch[1])) {
          return NextResponse.json(
            {
              success: false,
              message: "Invalid image format. Supported formats: JPG, PNG, WEBP."
            },
            { status: 400 }
          );
        }
      }

      imageUrl = body.imageUrl;
    }

    const previousImage = doctor.profileImage;
    const updated = updateDoctor(id, { profileImage: imageUrl }, auth.adminEmail);

    logAudit({
      adminUser: auth.adminEmail,
      action: "UPLOADED_IMAGE",
      doctorId: doctor.id,
      doctorName: doctor.name,
      details: `Replaced doctor profile image (Previous: ${previousImage.substring(0, 30)}...)`
    });

    return NextResponse.json({
      success: true,
      message: "Doctor profile photo updated successfully.",
      imageUrl,
      doctor: updated
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload image." },
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
  const doctor = getDoctorById(id);

  if (!doctor) {
    return NextResponse.json(
      { success: false, message: "Doctor not found." },
      { status: 404 }
    );
  }

  // Revert to standard professional avatar
  const defaultImage =
    doctor.gender === "Male"
      ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
      : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400";

  const updated = updateDoctor(id, { profileImage: defaultImage }, auth.adminEmail);

  logAudit({
    adminUser: auth.adminEmail,
    action: "DELETED_IMAGE",
    doctorId: doctor.id,
    doctorName: doctor.name,
    details: "Reset profile photo to default system avatar"
  });

  return NextResponse.json({
    success: true,
    message: "Doctor profile image reset to default avatar.",
    doctor: updated
  });
}
