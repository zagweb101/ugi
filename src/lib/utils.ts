import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  return time;
}

export function getDayName(dayIndex: number): string {
  const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  return days[dayIndex] || "";
}

export function getGradeColor(grade: string): string {
  switch (grade) {
    case "A+": return "text-emerald-400";
    case "A": return "text-emerald-400";
    case "B+": return "text-blue-400";
    case "B": return "text-blue-400";
    case "C+": return "text-yellow-400";
    case "C": return "text-yellow-400";
    case "D": return "text-orange-400";
    case "F": return "text-red-400";
    default: return "text-gray-400";
  }
}

export function getFileIcon(type: string): string {
  if (type.includes("pdf")) return "pdf";
  if (type.includes("presentation") || type.includes("powerpoint") || type.includes("pptx")) return "ppt";
  if (type.includes("word") || type.includes("document")) return "doc";
  if (type.includes("image")) return "image";
  if (type.includes("video")) return "video";
  return "file";
}
