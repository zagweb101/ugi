import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "لم يتم اختيار ملف" },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        { success: false, message: "الملف فارغ" },
        { status: 400 }
      );
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: "حجم الملف يتجاوز 100 ميجابايت" },
        { status: 400 }
      );
    }

    const mockFileUrl = `https://storage.example.com/uploads/${Date.now()}_${file.name}`;

    return NextResponse.json(
      {
        success: true,
        file: {
          name: file.name,
          url: mockFileUrl,
          type: file.type,
          size: file.size,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "حدث خطأ في الخادم" },
      { status: 500 }
    );
  }
}
