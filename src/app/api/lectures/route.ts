import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json(
      { success: true, lectures: [] },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}
