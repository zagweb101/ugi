"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, TrendingUp, BarChart3 } from "lucide-react";
import { LEVEL_1_COURSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function GradesPage() {
  const cardColors = ["border-swiss-yellow", "border-swiss-green", "border-swiss-blue"];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 animate-fade-in-down">
        <div className="w-14 h-14 bg-swiss-yellow flex items-center justify-center shadow-swiss-lg animate-float">
          <Award className="w-7 h-7 text-swiss-black" />
        </div>
        <div>
          <h1 className="text-swiss-black font-bold text-3xl lg:text-4xl uppercase tracking-wider">الدرجات</h1>
          <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest mt-1">ملخص درجاتك وترتيبك الأكاديمي</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className={cn("sm:col-span-1 border-4 animate-fade-in-up stagger-1 shadow-swiss hover:shadow-swiss-lg hover:-translate-y-1 transition-all duration-300", cardColors[0])}>
          <CardContent className="p-8 text-center">
            <div className="w-14 h-14 bg-swiss-yellow mx-auto flex items-center justify-center mb-4 shadow-swiss animate-float">
              <TrendingUp className="w-7 h-7 text-swiss-black" />
            </div>
            <p className="text-swiss-gray-lighter text-sm mb-3 font-bold uppercase tracking-widest">المعدل التراكمي</p>
            <p className="text-5xl font-bold text-swiss-yellow">\u2014</p>
            <p className="text-swiss-gray-lighter text-sm mt-3 font-bold uppercase tracking-widest">من 4.00</p>
          </CardContent>
        </Card>
        <Card className={cn("sm:col-span-1 border-4 animate-fade-in-up stagger-2 shadow-swiss hover:shadow-swiss-lg hover:-translate-y-1 transition-all duration-300", cardColors[1])}>
          <CardContent className="p-8 text-center">
            <div className="w-14 h-14 bg-swiss-green mx-auto flex items-center justify-center mb-4 shadow-swiss animate-float">
              <BookOpen className="w-7 h-7 text-swiss-black" />
            </div>
            <p className="text-swiss-gray-lighter text-sm mb-3 font-bold uppercase tracking-widest">إجمالي الساعات</p>
            <p className="text-5xl font-bold text-swiss-black">12</p>
            <p className="text-swiss-gray-lighter text-sm mt-3 font-bold uppercase tracking-widest">ساعة معتمدة</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-swiss-blue text-sm font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>4 مقررات</span>
            </div>
          </CardContent>
        </Card>
        <Card className={cn("sm:col-span-1 border-4 animate-fade-in-up stagger-3 shadow-swiss hover:shadow-swiss-lg hover:-translate-y-1 transition-all duration-300", cardColors[2])}>
          <CardContent className="p-8 text-center">
            <div className="w-14 h-14 bg-swiss-blue mx-auto flex items-center justify-center mb-4 shadow-swiss animate-float">
              <BarChart3 className="w-7 h-7 text-swiss-black" />
            </div>
            <p className="text-swiss-gray-lighter text-sm mb-3 font-bold uppercase tracking-widest">توزيع الدرجات</p>
            <div className="py-8">
              <p className="text-swiss-gray-lighter/60 text-sm font-bold uppercase tracking-widest">لم تُسجل أي درجات بعد</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-4 border-swiss-border shadow-swiss-lg animate-fade-in-up stagger-4">
        <CardHeader className="border-b-2 border-swiss-border p-6">
          <CardTitle className="flex items-center gap-3 text-swiss-green uppercase tracking-wider font-bold text-lg">
            <BookOpen className="w-6 h-6" />
            تفاصيل الدرجات
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-swiss-border">
                  <th className="text-right py-4 px-5 text-swiss-yellow font-bold uppercase tracking-widest text-xs">المقرر</th>
                  <th className="text-right py-4 px-5 text-swiss-yellow font-bold uppercase tracking-widest text-xs">الكود</th>
                  <th className="text-center py-4 px-5 text-swiss-yellow font-bold uppercase tracking-widest text-xs">الساعات</th>
                  <th className="text-center py-4 px-5 text-swiss-yellow font-bold uppercase tracking-widest text-xs">المعدل</th>
                  <th className="text-center py-4 px-5 text-swiss-yellow font-bold uppercase tracking-widest text-xs">التقدير</th>
                </tr>
              </thead>
              <tbody>
                {LEVEL_1_COURSES.map((course, index) => (
                  <tr key={course.id} className="border-b border-swiss-border/50 hover:bg-swiss-gray transition-all duration-200 cursor-pointer">
                    <td className="py-4 px-5 text-swiss-black font-bold uppercase tracking-wider">{course.name}</td>
                    <td className="py-4 px-5">
                      <span className={cn("inline-block px-3 py-1 text-xs font-bold text-swiss-black", index === 0 ? "bg-swiss-yellow" : index === 1 ? "bg-swiss-green" : index === 2 ? "bg-swiss-blue" : "bg-swiss-pink")}>
                        {course.code}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center text-swiss-gray-lighter font-bold">{course.credits}</td>
                    <td className="py-4 px-5 text-center text-swiss-gray-lighter font-bold">\u2014</td>
                    <td className="py-4 px-5 text-center text-swiss-gray-lighter font-bold">\u2014</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
