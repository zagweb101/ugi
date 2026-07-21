"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, CheckCircle2, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState<"exams" | "quizzes">("exams");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 animate-fade-in-down">
        <div className="w-14 h-14 bg-swiss-pink flex items-center justify-center shadow-swiss-lg animate-float">
          <Trophy className="w-7 h-7 text-swiss-black" />
        </div>
        <div>
          <h1 className="text-swiss-black font-bold text-3xl lg:text-4xl uppercase tracking-wider">الامتحانات والاختبارات</h1>
          <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest mt-1">جدول الامتحانات والاختبارات القادمة</p>
        </div>
      </div>

      <div className="flex gap-0 max-w-sm animate-fade-in-up stagger-1">
        <button onClick={() => setActiveTab("exams")} className={cn("flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2", activeTab === "exams" ? "bg-swiss-yellow text-swiss-black border-swiss-yellow shadow-swiss-lg" : "bg-white text-swiss-gray-lighter border-swiss-border hover:text-swiss-black hover:shadow-swiss")}>
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4" />
            الامتحانات
          </div>
        </button>
        <button onClick={() => setActiveTab("quizzes")} className={cn("flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2", activeTab === "quizzes" ? "bg-swiss-green text-swiss-black border-swiss-green shadow-swiss-lg" : "bg-white text-swiss-gray-lighter border-swiss-border hover:text-swiss-black hover:shadow-swiss")}>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            الاختبارات
          </div>
        </button>
      </div>

      {activeTab === "exams" && (
        <Card className="bg-white border-4 border-swiss-yellow shadow-swiss-lg animate-fade-in-up">
          <CardContent className="py-20 text-center">
            <div className="w-20 h-20 bg-swiss-yellow mx-auto flex items-center justify-center mb-6 animate-float shadow-swiss">
              <Trophy className="w-10 h-10 text-swiss-black" />
            </div>
            <p className="text-swiss-gray-lighter text-xl font-bold uppercase tracking-wider">لا توجد امتحانات بعد</p>
            <p className="text-swiss-gray-lighter/60 text-sm mt-2 uppercase tracking-widest">سيتم عرض الامتحانات هنا عندما يتم إضافتها</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-swiss-gray-lighter text-sm font-bold uppercase tracking-widest">
                <Calendar className="w-4 h-4 text-swiss-yellow" />
                <span>قريبًا</span>
              </div>
              <div className="flex items-center gap-2 text-swiss-gray-lighter text-sm font-bold uppercase tracking-widest">
                <Clock className="w-4 h-4 text-swiss-green" />
                <span>في انتظار الجدول</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "quizzes" && (
        <Card className="bg-white border-4 border-swiss-green shadow-swiss-lg animate-fade-in-up">
          <CardContent className="py-20 text-center">
            <div className="w-20 h-20 bg-swiss-green mx-auto flex items-center justify-center mb-6 animate-float shadow-swiss">
              <CheckCircle2 className="w-10 h-10 text-swiss-black" />
            </div>
            <p className="text-swiss-gray-lighter text-xl font-bold uppercase tracking-wider">لا توجد اختبارات بعد</p>
            <p className="text-swiss-gray-lighter/60 text-sm mt-2 uppercase tracking-widest">سيتم عرض الاختبارات هنا عندما يتم إضافتها</p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-swiss-gray-lighter text-sm font-bold uppercase tracking-widest">
                <Calendar className="w-4 h-4 text-swiss-green" />
                <span>قريبًا</span>
              </div>
              <div className="flex items-center gap-2 text-swiss-gray-lighter text-sm font-bold uppercase tracking-widest">
                <Clock className="w-4 h-4 text-swiss-yellow" />
                <span>في انتظار الجدول</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
