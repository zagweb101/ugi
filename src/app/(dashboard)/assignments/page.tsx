"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ClipboardList, Calendar, Clock, CheckCircle2, FileText, Plus, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LEVEL_1_COURSES } from "@/lib/constants";

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  score: number | null;
}

const statusConfig: Record<string, { label: string; variant: "warning" | "info" | "success"; icon: typeof Clock }> = {
  pending: { label: "معلق", variant: "warning", icon: Clock },
  submitted: { label: "تم التسليم", variant: "info", icon: CheckCircle2 },
  graded: { label: "تم التصحيح", variant: "success", icon: CheckCircle2 },
};

function getCountdown(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "منتهي";
  if (days === 0) return "اليوم";
  if (days === 1) return "غداً";
  return `${days} يوم متبقي`;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", course: "", dueDate: "" });
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.course || !form.dueDate) return;
    setAssignments((prev) => [{ id: Date.now(), title: form.title, course: form.course, dueDate: form.dueDate, status: "pending", score: null }, ...prev]);
    setForm({ title: "", course: "", dueDate: "" });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in-down">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-swiss-yellow flex items-center justify-center shadow-swiss-lg animate-float">
            <ClipboardList className="w-7 h-7 text-swiss-black" />
          </div>
          <div>
            <h1 className="text-swiss-black font-bold text-3xl lg:text-4xl uppercase tracking-wider">الواجبات</h1>
            <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest mt-1">{assignments.length} واجبات في هذا الفصل</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-swiss-yellow hover:bg-swiss-yellow/90 text-swiss-black font-bold px-8 py-3 uppercase tracking-wider shadow-swiss-lg hover:shadow-swiss-xl transition-all duration-300">
          {showForm ? <><X className="w-5 h-5 ml-2" />إلغاء</> : <><Plus className="w-5 h-5 ml-2" />إضافة واجب</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-4 border-swiss-yellow bg-white shadow-swiss-xl animate-slide-in">
          <CardContent className="p-8">
            <form onSubmit={handleAdd} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-swiss-yellow uppercase tracking-widest">عنوان الواجب <span className="text-swiss-pink">*</span></label>
                  <Input type="text" placeholder="مثال: واجب الكتابة الرقمية" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required className="h-12" />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-swiss-green uppercase tracking-widest">المقرر <span className="text-swiss-pink">*</span></label>
                  <select value={form.course} onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))} required className={cn("w-full h-12 px-4 bg-white border-2 border-swiss-border text-swiss-black font-bold uppercase tracking-wider cursor-pointer transition-all focus:border-swiss-yellow focus:outline-none", !form.course && "text-swiss-gray-lighter")}>
                    <option value="">اختر المقرر</option>
                    {LEVEL_1_COURSES.map((c) => (<option key={c.code} value={c.name}>{c.code} - {c.name}</option>))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-swiss-blue uppercase tracking-widest">تاريخ التسليم <span className="text-swiss-pink">*</span></label>
                  <Input type="date" value={form.dueDate} onChange={(e) => setForm((p) => ({ ...p, dueDate: e.target.value }))} required className="h-12" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="bg-swiss-green hover:bg-swiss-green/90 text-swiss-black font-bold px-8 py-3 uppercase tracking-wider shadow-swiss-lg hover:shadow-swiss-xl transition-all duration-300">إضافة الواجب</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {assignments.length === 0 ? (
        <Card className="bg-white border-4 border-swiss-border shadow-swiss-lg animate-fade-in-up">
          <CardContent className="py-20 text-center">
            <div className="w-20 h-20 bg-swiss-border mx-auto flex items-center justify-center mb-6 animate-float shadow-inner-light">
              <ClipboardList className="w-10 h-10 text-swiss-gray-lighter" />
            </div>
            <p className="text-swiss-gray-lighter text-xl font-bold uppercase tracking-wider">لا توجد واجبات بعد</p>
            <p className="text-swiss-gray-lighter/60 text-sm mt-2 uppercase tracking-widest">اضغط على &quot;إضافة واجب&quot; لإضافة واجب جديد</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {assignments.map((assignment, index) => {
            const status = statusConfig[assignment.status];
            const StatusIcon = status.icon;
            const countdown = getCountdown(assignment.dueDate);
            return (
              <Card key={assignment.id} className={cn("border-4 border-swiss-border hover:border-swiss-yellow hover:shadow-swiss-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white animate-fade-in-up stagger-" + ((index % 4) + 1))}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-5 flex-1">
                      <div className="w-14 h-14 bg-swiss-blue flex items-center justify-center flex-shrink-0 shadow-swiss">
                        <FileText className="w-7 h-7 text-swiss-black" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-swiss-black font-bold uppercase tracking-wider text-lg">{assignment.title}</h3>
                          <Badge variant={status.variant} className="flex items-center gap-1 swiss-badge"><StatusIcon className="w-3 h-3" />{status.label}</Badge>
                        </div>
                        <div className="flex items-center gap-5 mt-3 text-sm text-swiss-gray-lighter font-bold uppercase tracking-widest">
                          <span className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-swiss-yellow" />{assignment.course}</span>
                          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-swiss-green" />{new Date(assignment.dueDate).toLocaleDateString("ar-SA")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-shrink-0">
                      <div className="text-center">
                        <p className={cn("text-sm font-bold uppercase tracking-wider", countdown === "اليوم" || countdown === "غداً" ? "text-swiss-pink" : countdown === "منتهي" ? "text-swiss-gray-lighter" : "text-swiss-yellow")}>{countdown}</p>
                      </div>
                      {assignment.score !== null && (
                        <div className="text-center px-5 py-3 bg-swiss-green/20 border-2 border-swiss-green">
                          <p className="text-3xl font-bold text-swiss-green">{assignment.score}</p>
                          <p className="text-xs text-swiss-green/70">/100</p>
                        </div>
                      )}
                      {deleteConfirm === assignment.id ? (
                        <div className="flex items-center gap-2 animate-scale-in">
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(assignment.id)} className="text-swiss-pink hover:bg-swiss-pink/10">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(null)} className="text-swiss-gray-lighter hover:bg-swiss-gray">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(assignment.id)} className="text-swiss-gray-lighter hover:text-swiss-pink hover:bg-swiss-pink/10">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
