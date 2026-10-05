import { NextResponse } from "next/server";
import { SAMPLE_APPOINTMENTS } from "@/lib/data/appointments";

export async function GET() {
  return NextResponse.json({
    success: true,
    total: SAMPLE_APPOINTMENTS.length,
    data: SAMPLE_APPOINTMENTS
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { doctorId, patientName, patientPhone, type, scheduledDate, timeSlot } = body;

    if (!doctorId || !patientName || !patientPhone) {
      return NextResponse.json(
        { success: false, message: "Missing required patient details." },
        { status: 400 }
      );
    }

    const newAppointmentNumber = `OPT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newAppointment = {
      id: `apt-${Date.now()}`,
      appointmentNumber: newAppointmentNumber,
      doctorId,
      patientName,
      patientPhone,
      type: type || "ONLINE",
      scheduledDate: scheduledDate || "Today",
      timeSlot: timeSlot || "04:30 PM",
      status: "CONFIRMED",
      paymentStatus: "PAID",
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: "Appointment confirmed successfully.",
      data: newAppointment
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create appointment." },
      { status: 500 }
    );
  }
}
