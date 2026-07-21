"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  ClipboardList,
  Trophy,
  Clock,
  Calendar,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Flame,
} from "lucide-react";
import { WEEKLY_SCHEDULE } from "@/lib/constants";

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "صباح الخير";
  if (h < 17) return "مساء الخير";
  return "مساء الخير";
}

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("");
  const [streak] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("ugi-streak") || "1", 10);
    }
    return 1;
  });
  const [showMotivation, setShowMotivation] = useState(false);

  const motivations = [
    "كل يوم جديد هو فرصة للتعلم",
    "النجاح يبدأ بخطوة صغيرة",
    "استمر في التعلم، النتائج ستأتي",
    "أنت تخطو نحو مستقبلك الرقمي",
    "العلم نور، والاستمرارية مفتاح التفوق",
  ];

  useEffect(() => {
    setGreeting(getGreeting());
    const timer = setTimeout(() => setShowMotivation(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "المقررات", value: "4", icon: BookOpen, bg: "bg-swiss-yellow", href: "/courses", glow: "hover-glow-yellow", trend: "+2 هذا الفصل" },
    { label: "المحاضرات", value: "1", icon: FileText, bg: "bg-swiss-green", href: "/lectures", glow: "hover-glow-green", trend: "جديدة" },
    { label: "الواجبات", value: "0", icon: ClipboardList, bg: "bg-swiss-blue", href: "/assignments", glow: "hover-glow-blue", trend: "لا واجبات" },
    { label: "المعدل", value: "\u2014", icon: Trophy, bg: "bg-swiss-pink", href: "/grades", glow: "hover-glow-pink", trend: "قريبًا" },
  ];

  const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];

  return (
    <div className="space-y-8">
      {/* Hero greeting */}
      <div className="relative p-8 lg:p-10 bg-swiss-yellow border-4 border-swiss-black shadow-swiss-xl animate-fade-in-down overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 bg-swiss-black/5 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-swiss-black/5 translate-x-1/2 translate-y-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-swiss-black animate-pulse" />
            <span className="text-swiss-black/60 text-sm font-bold uppercase tracking-widest">{greeting}</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-swiss-black uppercase tracking-wider">
            مرحباً بك في UGI Learn
          </h1>
          <p className="text-swiss-black/70 mt-2 font-bold uppercase tracking-widest text-base">
            تخصص الإعلام الرقمي - المستوى الأول
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 bg-swiss-black/10 px-4 py-2">
              <Flame className="w-4 h-4 text-swiss-black" />
              <span className="text-swiss-black text-sm font-bold uppercase tracking-wider">{streak} أيام تعلم متتالية</span>
            </div>
            <div className="flex items-center gap-2 bg-swiss-black/10 px-4 py-2">
              <TrendingUp className="w-4 h-4 text-swiss-black" />
              <span className="text-swiss-black text-sm font-bold uppercase tracking-wider">تقدم مستمر</span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivation card */}
      {showMotivation && (
        <Card className="border-4 border-swiss-green bg-swiss-green/5 shadow-swiss animate-fade-in-up">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-swiss-green flex items-center justify-center flex-shrink-0 shadow-swiss animate-bounce-in">
              <Sparkles className="w-6 h-6 text-swiss-black" />
            </div>
            <div>
              <p className="text-swiss-black font-bold text-lg uppercase tracking-wider">{randomMotivation}</p>
              <p className="text-swiss-gray-lighter text-sm font-bold uppercase tracking-widest mt-1">رسالة يومية للتحفيز</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={stat.label} href={stat.href} className={cn("animate-fade-in-up stagger-" + (index + 1))}>
            <Card className={cn("hover:border-swiss-yellow transition-all duration-300 cursor-pointer border-4 shadow-swiss group", stat.glow)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-swiss-gray-lighter text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                    <p className="text-4xl font-bold text-swiss-black mt-2">{stat.value}</p>
                    <p className="text-swiss-gray-lighter text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </p>
                  </div>
                  <div className={`w-14 h-14 ${stat.bg} flex items-center justify-center animate-float shadow-swiss group-hover:shadow-swiss-lg transition-all duration-300`}>
                    <stat.icon className="w-7 h-7 text-swiss-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Schedule and Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-4 border-swiss-green shadow-swiss-lg animate-fade-in-up stagger-5">
          <CardHeader className="border-b-2 border-swiss-border p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-swiss-green uppercase tracking-wider font-bold text-lg">
                <Calendar className="w-6 h-6" />
                جدول الأسبوع
              </CardTitle>
              <Link href="/courses" className="text-swiss-gray-lighter hover:text-swiss-yellow text-sm flex items-center gap-1 transition-colors font-bold uppercase tracking-widest">
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6 p-6">
            <div className="space-y-5">
              {WEEKLY_SCHEDULE.map((scheduleDay) => (
                <div key={scheduleDay.day} className="space-y-3">
                  <h3 className="text-swiss-yellow font-bold text-sm uppercase tracking-wider">{scheduleDay.day}</h3>
                  <div className="space-y-2">
                    {scheduleDay.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-swiss-gray border-l-4 border-swiss-blue hover:border-swiss-yellow hover:shadow-swiss transition-all duration-200 cursor-pointer hover:-translate-x-1 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 bg-swiss-blue flex items-center justify-center group-hover:bg-swiss-yellow transition-colors">
                            <Clock className="w-5 h-5 text-swiss-black" />
                          </div>
                          <div>
                            <p className="text-swiss-black text-sm font-bold uppercase tracking-wider">{item.courseName}</p>
                            <p className="text-swiss-gray-lighter text-xs">{item.instructor} - {item.room}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge className={cn(
                            "swiss-badge",
                            item.type === "محاضرة" ? "bg-swiss-yellow text-swiss-black" : "bg-swiss-green text-swiss-black"
                          )}>
                            {item.type}
                          </Badge>
                          <span className="text-swiss-gray-lighter text-xs font-bold">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-swiss-pink shadow-swiss-lg animate-fade-in-up stagger-6">
          <CardHeader className="border-b-2 border-swiss-border p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-swiss-pink uppercase tracking-wider font-bold text-lg">
                <FileText className="w-6 h-6" />
                آخر المحاضرات
              </CardTitle>
              <Link href="/lectures" className="text-swiss-gray-lighter hover:text-swiss-yellow text-sm flex items-center gap-1 transition-colors font-bold uppercase tracking-widest">
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6 p-6">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-swiss-border mx-auto flex items-center justify-center mb-6 animate-float shadow-inner-light">
                <FileText className="w-10 h-10 text-swiss-gray-lighter" />
              </div>
              <p className="text-swiss-gray-lighter text-xl font-bold uppercase tracking-wider">لم تُرفع أي محاضرات بعد</p>
              <p className="text-swiss-gray-lighter/60 text-sm mt-2 uppercase tracking-widest">
                ابدأ برفع محاضراتك لتجد كل شيء هنا
              </p>
              <Link href="/lectures">
                <Button className="mt-6 bg-swiss-pink hover:bg-swiss-pink/90 text-swiss-black font-bold uppercase tracking-wider shadow-swiss-lg hover:shadow-swiss-xl transition-all duration-300 px-8 py-3">
                  رفع محاضرة الآن
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
