import { NextResponse } from "next/server";
import { LEVEL_1_COURSES } from "@/lib/constants";

export async function GET() {
  try {
    const grades = LEVEL_1_COURSES.map((course) => ({
      courseId: course.id,
      courseCode: course.code,
      courseName: course.name,
      credits: course.credits,
      grade: null,
      gpaPoints: null,
    }));

    return NextResponse.json(
      {
        success: true,
        student: {
          id: "",
          name: "محمد",
          universityId: "",
        },
        gpa: null,
        totalCredits: LEVEL_1_COURSES.reduce((sum, c) => sum + c.credits, 0),
        grades,
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
