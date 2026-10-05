import { NextResponse } from "next/server";
import { EYE_SPECIALTIES } from "@/lib/data/specialties";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: EYE_SPECIALTIES.length,
    data: EYE_SPECIALTIES
  });
}
