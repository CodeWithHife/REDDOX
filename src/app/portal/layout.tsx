"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, demoAccounts } from "@/context/AuthContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, role, logout, loginAs } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render cleanly without portal shell
  if (pathname === "/portal/login") {
    return <>{children}</>;
  }

  const memberNav = [
    { name: "My Dashboard", href: "/portal", icon: "🏠" },
    { name: "My Profile", href: "/portal/my-profile", icon: "👤" },
    { name: "My Giving History", href: "/portal/my-giving", icon: "💰" },
    { name: "My Duty Roster", href: "/portal/my-roster", icon: "📅" },
    { name: "Prayer Requests", href: "/portal/prayer-requests", icon: "🙏" },
    { name: "Testimonies", href: "/portal/testimonies", icon: "🌟" },
    { name: "Sunday Check-In", href: "/portal/checkin", icon: "📍" },
  ];

  const adminNav = [
    { name: "Executive Overview", href: "/portal", icon: "📊" },
    { name: "Members & First-Timers", href: "/portal/admin/members", icon: "👥" },
    { name: "Attendance Tracker", href: "/portal/admin/attendance", icon: "📈" },
    { name: "Church Finances", href: "/portal/admin/finances", icon: "💵" },
    { name: "Duty Roster Builder", href: "/portal/admin/roster", icon: "📋" },
    { name: "WhatsApp Broadcast", href: "/portal/admin/broadcast", icon: "📢" },
  ];

  const currentNav = role === "admin" ? adminNav : memberNav;

  return (
    <div className="min-h-screen bg-[#071326] text-slate-100 flex flex-col md:flex-row pt-20">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#0B1E3D] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-20 z-30">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-[#D4AF37]">
            {role === "admin" ? "PASTOR PORTAL" : "MEMBER HUB"}
          </span>
          <span className="text-xs text-slate-300">({user?.name?.split(" ")[0]})</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold text-white border border-white/15"
        >
          {sidebarOpen ? "Close Menu" : "Menu ☰"}
        </button>
      </div>

      {/* Left Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 bg-[#091830] border-r border-white/10 flex flex-col justify-between shrink-0 p-4 transition-all duration-300 z-20 ${
          sidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Active User Card & Role Switcher */}
          <div className="p-4 rounded-2xl bg-[#0B1E3D] border border-white/10 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                role === "admin" ? "bg-[#D4AF37] text-[#0B1E3D]" : "bg-blue-600 text-white"
              }`}>
                {role === "admin" ? "👑 Pastor / Admin" : "👤 Church Member"}
              </span>
            </div>
            <p className="font-serif font-bold text-white text-sm truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.department || "Member"}</p>

            {/* Fast Role Switcher for Testing */}
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Switch:</span>
              <button
                onClick={() => loginAs("admin")}
                className={`text-[10px] px-2 py-1 rounded transition-colors ${
                  role === "admin" ? "bg-[#D4AF37] text-[#0B1E3D] font-bold" : "bg-white/5 text-slate-300 hover:text-white"
                }`}
              >
                Pastor
              </button>
              <button
                onClick={() => loginAs("member")}
                className={`text-[10px] px-2 py-1 rounded transition-colors ${
                  role === "member" ? "bg-[#D4AF37] text-[#0B1E3D] font-bold" : "bg-white/5 text-slate-300 hover:text-white"
                }`}
              >
                Member
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {currentNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#D4AF37] text-[#0B1E3D] font-bold shadow-md"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#D4AF37] px-3 py-2 transition-colors"
          >
            <span>&larr; Back to Main Website</span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/portal/login");
            }}
            className="w-full text-left text-xs font-bold text-red-400 hover:text-red-300 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
