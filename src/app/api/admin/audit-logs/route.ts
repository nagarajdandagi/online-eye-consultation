import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth/adminAuth";
import { getAuditLogs } from "@/lib/services/auditService";

export async function GET(request: Request) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return auth.response;
  }

  const logs = getAuditLogs();
  return NextResponse.json({
    success: true,
    data: logs,
    total: logs.length
  });
}
