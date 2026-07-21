"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, GraduationCap, Mail, BookOpen, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { INSTRUCTORS, LEVEL_1_COURSES } from "@/lib/constants";

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedInstructor, setExpandedInstructor] = useState<string | null>(null);

  const getCourseName = (code: string) => {
    const course = LEVEL_1_COURSES.find((c) => c.code === code);
    return course ? `${code} - ${course.name}` : code;
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return INSTRUCTORS;
    const q = searchQuery.toLowerCase();
    return INSTRUCTORS.filter(
      (inst) => `${inst.firstName} ${inst.lastName}`.includes(q) || inst.department.includes(q) || inst.email.includes(q)
    );
  }, [searchQuery]);

  const cardColors = ["border-swiss-yellow", "border-swiss-green", "border-swiss-blue", "border-swiss-pink"];
  const avatarColors = ["bg-swiss-yellow", "bg-swiss-green", "bg-swiss-blue", "bg-swiss-pink"];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 animate-fade-in-down">
        <div className="w-14 h-14 bg-swiss-blue flex items-center justify-center shadow-swiss-lg animate-float">
          <GraduationCap className="w-7 h-7 text-swiss-black" />
        </div>
        <div>
          <h1 className="text-swiss-black font-bold text-3xl lg:text-4xl uppercase tracking-wider">المدرسين</h1>
          <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest mt-1">قائمة المدرسين المسجلين في مقررات الفصل الأول</p>
        </div>
      </div>

      <div className="relative max-w-lg animate-fade-in-up stagger-1">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-swiss-gray-lighter" />
        <Input type="text" placeholder="ابحث بالاسم أو القسم..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-12 h-12 text-base" />
      </div>

      {filtered.length === 0 ? (
        <Card className="bg-white border-4 border-swiss-border shadow-swiss-lg animate-fade-in-up">
          <CardContent className="py-20 text-center">
            <div className="w-20 h-20 bg-swiss-border mx-auto flex items-center justify-center mb-6 animate-float shadow-inner-light">
              <GraduationCap className="w-10 h-10 text-swiss-gray-lighter" />
            </div>
            <p className="text-swiss-gray-lighter text-xl font-bold uppercase tracking-wider">لا توجد نتائج مطابقة للبحث</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((inst, index) => (
            <Card
              key={inst.id}
              className={cn(
                "border-4 transition-all duration-300 bg-white animate-fade-in-up",
                cardColors[index % cardColors.length],
                expandedInstructor === inst.id ? "shadow-swiss-xl border-swiss-yellow" : "hover:shadow-swiss-lg hover:-translate-y-1"
              )}
              onClick={() => setExpandedInstructor(expandedInstructor === inst.id ? null : inst.id)}
            >
              <CardContent className="p-6 space-y-5">
                <div className="flex items-center gap-5">
                  <div className={cn("w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-swiss transition-all duration-300", avatarColors[index % avatarColors.length])}>
                    <span className="text-swiss-black text-xl font-bold">{inst.lastName.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-swiss-black font-bold text-lg truncate uppercase tracking-wider">
                      {inst.title} {inst.firstName} {inst.lastName}
                    </h3>
                    <Badge className="bg-swiss-gray border-swiss-border text-swiss-gray-lighter swiss-badge mt-2">{inst.department}</Badge>
                  </div>
                </div>
                <div className="space-y-3 pt-3 border-t-2 border-swiss-border">
                  {inst.email && (
                    <div className="flex items-center gap-3 text-sm text-swiss-gray-lighter font-bold uppercase tracking-widest">
                      <Mail className="w-4 h-4 flex-shrink-0 text-swiss-yellow" />
                      <span className="truncate" dir="ltr">{inst.email}</span>
                    </div>
                  )}
                  {inst.courses.length > 0 && (
                    <div className="space-y-2">
                      {inst.courses.map((code) => (
                        <div key={code} className="flex items-center gap-3 text-sm text-swiss-gray-lighter font-bold uppercase tracking-widest">
                          <BookOpen className="w-4 h-4 flex-shrink-0 text-swiss-green" />
                          <span className="truncate">{getCourseName(code)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {expandedInstructor === inst.id && (
                  <div className="pt-3 border-t-2 border-swiss-border animate-fade-in">
                    <div className="flex items-center gap-3 text-sm text-swiss-gray-lighter font-bold uppercase tracking-widest">
                      <Phone className="w-4 h-4 flex-shrink-0 text-swiss-pink" />
                      <span>متاح في مكتبته</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
