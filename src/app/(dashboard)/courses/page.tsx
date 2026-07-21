"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, CreditCard, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEVEL_1_COURSES, INSTRUCTORS } from "@/lib/constants";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const getInstructorForCourse = (courseCode: string) => {
    const instructor = INSTRUCTORS.find((inst) => inst.courses.includes(courseCode));
    if (!instructor) return "";
    return `${instructor.title} ${instructor.firstName} ${instructor.lastName}`;
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return LEVEL_1_COURSES;
    const q = searchQuery.toLowerCase();
    return LEVEL_1_COURSES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.includes(q)
    );
  }, [searchQuery]);

  const courseColors = ["border-swiss-yellow", "border-swiss-green", "border-swiss-blue", "border-swiss-pink"];
  const courseBadgeColors = ["bg-swiss-yellow text-swiss-black", "bg-swiss-green text-swiss-black", "bg-swiss-blue text-swiss-black", "bg-swiss-pink text-swiss-black"];
  const courseIconColors = ["text-swiss-yellow", "text-swiss-green", "text-swiss-blue", "text-swiss-pink"];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center gap-3 sm:gap-4 animate-fade-in-down">
        <div className="w-12 sm:w-14 h-12 sm:h-14 bg-swiss-green flex items-center justify-center shadow-swiss-lg animate-float">
          <BookOpen className="w-6 sm:w-7 h-6 sm:h-7 text-swiss-black" />
        </div>
        <div>
          <h1 className="text-swiss-black font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider">مقرراتي</h1>
          <p className="text-swiss-gray-lighter text-xs sm:text-sm uppercase tracking-widest mt-1">
            {LEVEL_1_COURSES.length} مقررات في الفصل الأول - المستوى الأول
          </p>
        </div>
      </div>

      <div className="relative max-w-lg animate-fade-in-up stagger-1">
        <Search className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-swiss-gray-lighter" />
        <Input type="text" placeholder="ابحث بالاسم أو الكود..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pr-10 sm:pr-12 h-11 sm:h-12 text-sm sm:text-base" />
      </div>

      {filteredCourses.length === 0 ? (
        <Card className="bg-white border-4 border-swiss-border shadow-swiss-lg animate-fade-in-up">
          <CardContent className="py-16 sm:py-20 text-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-swiss-border mx-auto flex items-center justify-center mb-4 sm:mb-6 animate-float shadow-inner-light">
              <BookOpen className="w-8 sm:w-10 h-8 sm:h-10 text-swiss-gray-lighter" />
            </div>
            <p className="text-swiss-gray-lighter text-lg sm:text-xl font-bold uppercase tracking-wider">لا توجد نتائج مطابقة للبحث</p>
            <p className="text-swiss-gray-lighter/60 text-xs sm:text-sm mt-2 uppercase tracking-widest">جرب البحث بكلمات مختلفة</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course, index) => (
            <Card
              key={course.id}
              className={cn(
                "group cursor-pointer border-4 transition-all duration-300 bg-white animate-fade-in-up",
                courseColors[index % courseColors.length],
                selectedCourse === course.id ? "shadow-swiss-xl border-swiss-yellow scale-[1.02]" : "hover:shadow-swiss-lg hover:-translate-y-1 active:scale-[0.98]"
              )}
              onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
            >
              <CardContent className="p-0">
                <div className={cn("h-3 sm:h-4 transition-all duration-300", courseBadgeColors[index % courseBadgeColors.length], selectedCourse === course.id && "h-5 sm:h-6")} />
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={cn("swiss-badge text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1", courseBadgeColors[index % courseBadgeColors.length])}>{course.code}</Badge>
                      <div className={cn("w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-swiss-gray group-hover:bg-swiss-yellow transition-all duration-300", courseIconColors[index % courseIconColors.length])}>
                        <BookOpen className="w-4 sm:w-5 h-4 sm:h-5 text-swiss-black" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-swiss-black mt-2 sm:mt-3 uppercase tracking-wider leading-relaxed">{course.name}</h3>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-swiss-gray-lighter font-bold uppercase tracking-widest">
                      <CreditCard className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-swiss-yellow flex-shrink-0" />
                      <span>{course.credits} ساعات معتمدة</span>
                    </div>
                    {getInstructorForCourse(course.code) && (
                      <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-swiss-gray-lighter font-bold uppercase tracking-widest">
                        <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-swiss-green flex-shrink-0" />
                        <span className="truncate">{getInstructorForCourse(course.code)}</span>
                      </div>
                    )}
                  </div>
                  {selectedCourse === course.id && (
                    <div className="pt-3 sm:pt-4 border-t-2 border-swiss-border animate-fade-in">
                      <Button className="w-full bg-swiss-yellow hover:bg-swiss-yellow/90 text-swiss-black font-bold uppercase tracking-wider shadow-swiss-lg h-11">
                        عرض التفاصيل
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
