"use client";

import React, { useState } from "react";
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
  Menu,
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

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 p-3 bg-swiss-yellow text-swiss-black font-bold shadow-swiss-lg hover:shadow-swiss-xl transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
      >
        <Menu className="w-5 h-5" />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40 animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 h-full z-50 bg-white border-l-4 border-swiss-yellow transition-all duration-300 flex flex-col shadow-swiss-2xl",
          collapsed ? "w-20" : "w-80",
          mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b-4 border-swiss-green">
          {!collapsed && (
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-12 h-12 bg-swiss-yellow flex items-center justify-center shadow-swiss-lg animate-float">
                <span className="text-swiss-black font-bold text-lg">UGI</span>
              </div>
              <div>
                <h1 className="text-swiss-black font-bold text-xl uppercase tracking-wider">UGI Learn</h1>
                <p className="text-swiss-gray-lighter text-xs uppercase tracking-widest">الجامعة الألمانية الذكية</p>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-12 h-12 bg-swiss-yellow flex items-center justify-center mx-auto shadow-swiss-lg animate-float">
              <span className="text-swiss-black font-bold text-sm">UGI</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-2 hover:bg-swiss-gray text-swiss-gray-lighter transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 hover:bg-swiss-gray text-swiss-gray-lighter transition-all duration-200 hover:rotate-180"
            >
              <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", collapsed && "rotate-180")} />
            </button>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 group animate-fade-in-right stagger-" + (index + 1),
                  isActive
                    ? "bg-swiss-yellow text-swiss-black border-l-4 border-swiss-green shadow-swiss-lg"
                    : "text-swiss-gray-lighter hover:bg-swiss-gray hover:text-swiss-black border-l-4 border-transparent hover:shadow-swiss hover:-translate-x-1"
                )}
                title={collapsed ? item.label : undefined}
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
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t-4 border-swiss-pink">
          <div className={cn("flex items-center gap-3 px-4 py-3 bg-swiss-gray shadow-inner-light", collapsed && "justify-center")}>
            <div className="w-10 h-10 bg-swiss-green flex items-center justify-center flex-shrink-0 shadow-swiss">
              <span className="text-swiss-black text-xs font-bold">م</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-swiss-black text-sm font-bold uppercase tracking-wider">محمد زغلول</p>
                <p className="text-swiss-gray-lighter text-xs tracking-widest">202400123</p>
              </div>
            )}
            {!collapsed && (
              <button className="p-2 hover:bg-swiss-gray text-swiss-gray-lighter hover:text-swiss-pink transition-all duration-200 hover:scale-110">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
