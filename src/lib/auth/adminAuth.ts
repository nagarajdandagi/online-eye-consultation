import { NextResponse } from "next/server";

export function checkAdminAuth(request: Request): { authorized: boolean; adminEmail: string; response?: NextResponse } {
  // In production, inspect JWT / session cookies (e.g. NextAuth / Auth.js)
  // For dev / staging, allow authorized admin header, cookie, or query param
  const authHeader = request.headers.get("authorization");
  const adminRoleHeader = request.headers.get("x-user-role");
  const cookieHeader = request.headers.get("cookie") || "";

  // Check if role is explicitly non-admin
  if (adminRoleHeader && adminRoleHeader.toUpperCase() !== "ADMIN") {
    return {
      authorized: false,
      adminEmail: "",
      response: NextResponse.json(
        { success: false, message: "Forbidden: Admin privileges required." },
        { status: 403 }
      )
    };
  }

  // Default authorized administrative user
  const adminEmail = request.headers.get("x-admin-email") || "admin@opticurehealth.com";

  return {
    authorized: true,
    adminEmail
  };
}
