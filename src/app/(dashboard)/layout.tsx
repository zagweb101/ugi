"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-swiss-gray">
      <Sidebar />

      <div className="lg:mr-72 min-h-screen flex flex-col">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b-4 border-swiss-yellow shadow-swiss animate-fade-in-down">
          <div className="flex items-center justify-between h-18 px-8">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-swiss-gray-lighter" />
                <Input
                  type="text"
                  placeholder="بحث..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-swiss-gray text-swiss-gray-lighter hover:text-swiss-black transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-swiss-pink" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 lg:p-10 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
