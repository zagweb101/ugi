import { NextResponse } from "next/server";
import { LEVEL_1_COURSES } from "@/lib/constants";

export async function GET() {
  try {
    return NextResponse.json(
      { success: true, courses: LEVEL_1_COURSES },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}
