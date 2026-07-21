"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FileText,
  ClipboardList,
  Trophy,
  Award,
  X,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard, color: "bg-swiss-yellow" },
  { href: "/courses", label: "مقرراتي", icon: BookOpen, color: "bg-swiss-green" },
  { href: "/lectures", label: "المحاضرات", icon: FileText, color: "bg-swiss-blue" },
  { href: "/instructors", label: "المدرسين", icon: GraduationCap, color: "bg-swiss-pink" },
  { href: "/assignments", label: "الواجبات", icon: ClipboardList, color: "bg-swiss-yellow" },
  { href: "/exams", label: "الامتحانات", icon: Trophy, color: "bg-swiss-green" },
  { href: "/grades", label: "الدرجات", icon: Award, color: "bg-swiss-blue" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 animate-fade-in backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-[100dvh] z-50 bg-white border-l-4 border-swiss-yellow transition-all duration-300 flex flex-col shadow-swiss-2xl",
          "w-80",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-4 border-swiss-green flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-swiss-yellow flex items-center justify-center shadow-swiss-lg animate-float">
              <span className="text-swiss-black font-bold text-lg">UGI</span>
            </div>
            <div>
              <h1 className="text-swiss-black font-bold text-xl uppercase tracking-wider">UGI Learn</h1>
              <p className="text-swiss-gray-lighter text-xs uppercase tracking-widest">الجامعة الألمانية الذكية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-swiss-gray text-swiss-gray-lighter transition-all duration-200"
            aria-label="إغلاق القائمة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto overscroll-contain">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 group",
                  isActive
                    ? "bg-swiss-yellow text-swiss-black border-l-4 border-swiss-green shadow-swiss-lg"
                    : "text-swiss-gray-lighter hover:bg-swiss-gray hover:text-swiss-black border-l-4 border-transparent hover:shadow-swiss active:scale-[0.98]"
                )}
              >
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  isActive ? item.color : "bg-swiss-gray group-hover:" + item.color
                )}>
                  <item.icon className={cn(
                    "w-5 h-5 transition-all duration-200",
                    isActive ? "text-swiss-black" : "text-swiss-gray-lighter group-hover:text-swiss-black"
                  )} />
                </div>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t-4 border-swiss-pink flex-shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 bg-swiss-gray shadow-inner-light">
            <div className="w-10 h-10 bg-swiss-green flex items-center justify-center flex-shrink-0 shadow-swiss">
              <span className="text-swiss-black text-xs font-bold">م</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-swiss-black text-sm font-bold uppercase tracking-wider">محمد زغلول</p>
              <p className="text-swiss-gray-lighter text-xs tracking-widest">202400123</p>
            </div>
            <button className="p-2 hover:bg-swiss-gray text-swiss-gray-lighter hover:text-swiss-pink transition-all duration-200" aria-label="تسجيل الخروج">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
