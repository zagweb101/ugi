import { NextResponse } from "next/server";
import { INSTRUCTORS } from "@/lib/constants";

export async function GET() {
  try {
    return NextResponse.json(
      { success: true, instructors: INSTRUCTORS },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}
