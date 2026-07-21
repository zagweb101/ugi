import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { universityId, password } = body;

    if (!universityId || !password) {
      return NextResponse.json(
        { success: false, message: "يجب إدخال الرقم الجامعي وكلمة المرور" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        student: {
          id: "stu_001",
          universityId,
          firstName: "محمد",
          lastName: "أحمد",
          email: "mohammed.ahmed@ugi.edu.sa",
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}
