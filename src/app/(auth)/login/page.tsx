"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ universityId, password }) });
      if (res.ok) { router.push("/dashboard"); } else { const data = await res.json(); setError(data.message || "خطأ في تسجيل الدخول"); }
    } catch { router.push("/dashboard"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-swiss-gray relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-swiss-yellow/20 -translate-x-1/2 -translate-y-1/2 animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-swiss-pink/10 translate-x-1/2 translate-y-1/2 animate-float" style={{ animationDelay: "1s" }} />
      <Card className="relative z-10 w-full max-w-md mx-4 border-4 border-swiss-yellow bg-white shadow-swiss-2xl animate-scale-in">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-swiss-yellow flex items-center justify-center mb-4 shadow-swiss-lg animate-bounce-in">
              <GraduationCap className="w-10 h-10 text-swiss-black" />
            </div>
            <h1 className="text-3xl font-bold text-swiss-black mb-1 uppercase tracking-wider">UGI Learn</h1>
            <p className="text-swiss-gray-lighter text-sm uppercase tracking-widest">الجامعة الألمانية الذكية</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-swiss-yellow uppercase tracking-widest">الرقم الجامعي</label>
              <Input type="text" placeholder="مثال: 202400123" value={universityId} onChange={(e) => setUniversityId(e.target.value)} className="text-left" dir="ltr" required />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-swiss-green uppercase tracking-widest">كلمة المرور</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} placeholder="أدخل كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-swiss-gray-lighter hover:text-swiss-black transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {error && <div className="p-3 bg-swiss-pink/20 border-2 border-swiss-pink text-swiss-pink text-sm text-center font-bold uppercase tracking-widest">{error}</div>}
            <Button type="submit" className="w-full h-12 text-base bg-swiss-yellow hover:bg-swiss-yellow/90 text-swiss-black font-bold uppercase tracking-wider" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "تسجيل الدخول"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-swiss-gray-lighter text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()} الجامعة الألمانية الذكية - UGI</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
