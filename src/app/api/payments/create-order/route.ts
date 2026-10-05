import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { amount, appointmentId } = await request.json();

    // Mock Razorpay Order ID generation
    const orderId = `order_rzp_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        amount: Math.round(amount * 100), // in paise
        currency: "INR",
        receipt: `receipt_${appointmentId}`
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create payment order." },
      { status: 500 }
    );
  }
}
