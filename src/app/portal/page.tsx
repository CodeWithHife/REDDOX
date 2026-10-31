"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "./portal-dashboard.css";

// SVG Icon Helper
function SvgIcon({ name, className = "portal-i" }: { name: string; className?: string }) {
  switch (name) {
    case "grid":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "users":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "check":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4 12 14.01l-3-3" />
        </svg>
      );
    case "cal":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "coin":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 8l3 4 3-4M9 13h6M9 16h6M12 12v6" />
        </svg>
      );
    case "uplus":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M19 8v6M22 11h-6" />
        </svg>
      );
    case "mic":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
        </svg>
      );
    case "chart":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M3 3v18h18M7 15l4-5 3 3 5-7" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "bell":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
      );
    case "gear":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "search":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case "plus":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "out":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
      );
    case "menu":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "lock":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "chev":
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "upload":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      );
    case "file":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "image":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    default:
      return null;
  }
}

// Plan Configurations
const PLANS = {
  starter: {
    id: "starter" as const,
    n: "Starter",
    pr: "₦0",
    mem: 15,
    admins: 1,
    eventsPerMonth: 1,
    qr: false,
    fin: false,
    med: false,
    reports: "basic",
    exports: false,
    br: "1 workspace",
    an: "Basic 7-day stats",
  },
  growth: {
    id: "growth" as const,
    n: "Growth",
    pr: "₦15,000/mo",
    mem: 1000,
    admins: 10,
    eventsPerMonth: 999999,
    qr: true,
    fin: true,
    med: true,
    reports: "growth",
    exports: true,
    br: "1 workspace",
    an: "Full reports & analytics",
  },
  pro: {
    id: "pro" as const,
    n: "Pro",
    pr: "₦35,000/mo",
    mem: 5000,
    admins: 50,
    eventsPerMonth: 999999,
    qr: true,
    fin: true,
    med: true,
    reports: "advanced",
    exports: true,
    br: "Up to 3 branches",
    an: "Advanced multi-branch intelligence",
  },
};

const DEPARTMENTS = ["Choir", "Ushering", "Children", "Media", "Prayer"];
const GIVING_TYPES = ["Tithe", "Offering", "Building Fund", "Missions"];
const EXPENSE_CATEGORIES = ["Equipment", "Utilities", "Ministry", "Maintenance"];
const VISITOR_STATUSES = ["New", "Contacted", "Follow-up due", "Became member"];
const STAFF_ROLES = ["Admin", "Leader", "Treasurer", "Usher"];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "members", label: "Members", icon: "users" },
  { id: "attendance", label: "Attendance", icon: "check" },
  { id: "events", label: "Events", icon: "cal" },
  { id: "finances", label: "Finances", icon: "coin" },
  { id: "visitors", label: "Visitors", icon: "uplus" },
  { id: "sermons", label: "Sermons & Media", icon: "mic" },
  { id: "reports", label: "Reports", icon: "chart" },
  { id: "staff", label: "Staff & Roles", icon: "shield" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "settings", label: "Settings", icon: "gear" },
];

function formatNaira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ReddoxPortalDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Navigation & View State
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "growth" | "pro">("starter");
  const [churchIndex, setChurchIndex] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search & Filters
  const [memberSearch, setMemberSearch] = useState("");
  const [memberDeptFilter, setMemberDeptFilter] = useState("All");
  const [memberPage, setMemberPage] = useState(1);
  const [financeTab, setFinanceTab] = useState<"give" | "exp">("give");

  // Churches
  const [churches, setChurches] = useState([
    { n: "Grace Chapel", r: "Admin" },
    { n: "Hope Fellowship", r: "Staff" },
  ]);

  // Data Collections
  const [members, setMembers] = useState([
    { id: 1, n: "Adaeze Okoye", e: "adaeze@mail.com", ph: "0801 234 5678", d: "Choir", j: 2021 },
    { id: 2, n: "Tunde Bakare", e: "tunde@mail.com", ph: "0802 345 6789", d: "Ushering", j: 2020 },
    { id: 3, n: "Grace Eze", e: "grace@mail.com", ph: "0803 456 7890", d: "Children", j: 2022 },
    { id: 4, n: "Samuel Adeyemi", e: "samuel@mail.com", ph: "0804 567 8901", d: "Media", j: 2019 },
    { id: 5, n: "Ruth Lawal", e: "ruth@mail.com", ph: "0805 678 9012", d: "Prayer", j: 2021 },
    { id: 6, n: "Daniel Kalu", e: "daniel@mail.com", ph: "0806 789 0123", d: "Choir", j: 2023 },
    { id: 7, n: "Mercy Alabi", e: "mercy@mail.com", ph: "0807 890 1234", d: "Children", j: 2022 },
    { id: 8, n: "Emeka Nwosu", e: "emeka@mail.com", ph: "0808 901 2345", d: "Ushering", j: 2020 },
    { id: 9, n: "Funke Ojo", e: "funke@mail.com", ph: "0809 012 3456", d: "Prayer", j: 2024 },
    { id: 10, n: "Chidi Obi", e: "chidi@mail.com", ph: "0801 123 4567", d: "Media", j: 2021 },
    { id: 11, n: "Bisi Ade", e: "bisi@mail.com", ph: "0802 234 5678", d: "Choir", j: 2023 },
    { id: 12, n: "Ngozi Eze", e: "ngozi@mail.com", ph: "0803 345 6789", d: "Children", j: 2022 },
  ]);

  const [sessions, setSessions] = useState([
    { id: 1, n: "Sunday Service", d: "Oct 25", p: [1, 2, 4, 5, 7, 8, 10, 11] },
    { id: 2, n: "Sunday Service", d: "Oct 18", p: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11] },
    { id: 3, n: "Sunday Service", d: "Oct 11", p: [1, 2, 4, 5, 8, 10, 11] },
    { id: 4, n: "Sunday Service", d: "Oct 4", p: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12] },
    { id: 5, n: "Sunday Service", d: "Sep 27", p: [1, 4, 5, 7, 8, 10] },
    { id: 6, n: "Sunday Service", d: "Sep 20", p: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12] },
  ]);
  const [currentSessionId, setCurrentSessionId] = useState(1);

  const [events, setEvents] = useState([
    { t: "Midweek Bible Study", d: "28", mo: "OCT", tm: "5:30 PM", r: 18 },
    { t: "Youth Fellowship", d: "30", mo: "OCT", tm: "4:00 PM", r: 9 },
    { t: "Sunday Service", d: "01", mo: "NOV", tm: "9:00 AM", r: 0 },
    { t: "Thanksgiving Service", d: "08", mo: "NOV", tm: "10:00 AM", r: 31 },
  ]);

  const [giving, setGiving] = useState([
    { id: 1, m: 1, t: "Tithe", a: 45000, w: "Oct 25" },
    { id: 2, m: 2, t: "Offering", a: 8000, w: "Oct 25" },
    { id: 3, m: 4, t: "Building Fund", a: 60000, w: "Oct 25" },
    { id: 4, m: 5, t: "Tithe", a: 30000, w: "Oct 21" },
    { id: 5, m: 7, t: "Missions", a: 15000, w: "Oct 25" },
    { id: 6, m: 1, t: "Offering", a: 12000, w: "Oct 18" },
    { id: 7, m: 10, t: "Tithe", a: 52000, w: "Oct 18" },
    { id: 8, m: 8, t: "Building Fund", a: 25000, w: "Oct 21" },
  ]);

  const [expenses, setExpenses] = useState([
    { t: "Sound equipment repair", c: "Equipment", a: 35000, w: "Oct 22" },
    { t: "Electricity", c: "Utilities", a: 48000, w: "Oct 15" },
    { t: "Children's class supplies", c: "Ministry", a: 12500, w: "Oct 12" },
  ]);

  const [visitors, setVisitors] = useState([
    { id: 1, n: "Kemi Ajayi", d: "Oct 25", w: "Tunde Bakare", s: "New", nt: "Came with a friend" },
    { id: 2, n: "Obinna Eze", d: "Oct 25", w: "Ruth Lawal", s: "Follow-up due", nt: "Asked about youth fellowship" },
    { id: 3, n: "Halima Yusuf", d: "Oct 18", w: "Tunde Bakare", s: "Contacted", nt: "Wants a home visit" },
    { id: 4, n: "Peter Danjuma", d: "Oct 11", w: "Ruth Lawal", s: "Became member", nt: "" },
  ]);

  const [sermons, setSermons] = useState([
    { t: "Walking in Faith", sp: "Pastor Adewale", d: "Oct 25", l: "", v: "Public" },
    { t: "The Power of Gratitude", sp: "Pastor Adewale", d: "Oct 18", l: "", v: "Members" },
    { t: "Rooted in Love", sp: "Guest speaker", d: "Oct 11", l: "", v: "Public" },
  ]);

  const [staff, setStaff] = useState([
    { n: "Pastor Adewale", e: "adewale@mail.com", r: "Admin", s: "Active" },
    { n: "Tunde Bakare", e: "tunde@mail.com", r: "Leader", s: "Active" },
    { n: "Ruth Lawal", e: "ruth@mail.com", r: "Treasurer", s: "Active" },
    { n: "Funke Ojo", e: "funke@mail.com", r: "Usher", s: "Invited" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, t: "Follow-up due: Obinna Eze", w: "2h ago", u: true },
    { id: 2, t: "New visitor recorded: Kemi Ajayi", w: "Yesterday", u: true },
    { id: 3, t: "Sunday attendance summary is ready", w: "Yesterday", u: false },
    { id: 4, t: "Youth Fellowship is in 4 days", w: "2 days ago", u: false },
  ]);

  const [notifPrefs, setNotifPrefs] = useState({ fu: true, ev: true, vi: false });

  const [activity, setActivity] = useState([
    { t: "Adaeze Okoye gave ₦45,000 tithe", w: "2h ago", i: "AO" },
    { t: "Kemi Ajayi recorded as a visitor", w: "Yesterday", i: "KA" },
    { t: "Sunday attendance saved", w: "Yesterday", i: "SS" },
    { t: "Youth Fellowship created", w: "2 days ago", i: "YF" },
  ]);



  // Modal State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editingMember, setEditingMember] = useState<any>(null);

  // Online status listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Sync hash with view & load onboarded church profile & active plan
  useEffect(() => {
    // 1. Load onboarded church profile if exists
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("reddox_church_profile");
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.churchName) {
            setChurches((prev) => [
              { n: parsed.churchName, r: "Admin" },
              ...prev.slice(1),
            ]);
          }
        } catch (e) {
          // fallback
        }
      }

      // 2. Load active subscription plan from query params or localStorage
      const urlParams = new URLSearchParams(window.location.search);
      const planParam = urlParams.get("plan");
      const storedPlan = localStorage.getItem("reddox_active_plan");

      if (planParam === "starter" || planParam === "growth" || planParam === "pro") {
        setSelectedPlan(planParam);
        localStorage.setItem("reddox_active_plan", planParam);
      } else if (storedPlan === "starter" || storedPlan === "growth" || storedPlan === "pro") {
        setSelectedPlan(storedPlan);
      } else {
        setSelectedPlan("starter");
        localStorage.setItem("reddox_active_plan", "starter");
      }

      // Check query params for instant actions
      const shouldAddMember = urlParams.get("addMember");
      const toastParam = urlParams.get("toast");

      if (shouldAddMember === "true") {
        setActiveView("members");
        setActiveModal("addMember");
      }
      if (toastParam) {
        showToast(decodeURIComponent(toastParam));
      }
    }

    const hash = window.location.hash.slice(1);
    if (NAV_ITEMS.some((n) => n.id === hash)) {
      setActiveView(hash);
    }

    const handleHash = () => {
      const h = window.location.hash.slice(1);
      if (NAV_ITEMS.some((n) => n.id === h)) {
        setActiveView(h);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const changeView = (v: string) => {
    setActiveView(v);
    setActiveDropdown("");
    setSidebarOpen(false);
    window.history.replaceState(null, "", `#${v}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentChurch = churches[churchIndex];
  const currentPlan = PLANS[selectedPlan];
  const unreadNotifs = notifications.filter((n) => n.u).length;

  const getMemberName = (id: number) => {
    const found = members.find((m) => m.id === id);
    return found ? found.n : "Guest";
  };

  // Sign out handler
  const handleSignOut = () => {
    logout();
    router.push("/auth#signin");
  };

  return (
    <div className="portal-root" suppressHydrationWarning>
      {/* Background Luminous Light Orbs */}
      <div className="portal-glow">
        <i />
        <i />
      </div>

      {/* Main Grid App Shell */}
      <div className="portal-app">
        {/* =========================================
            STICKY LEFT SIDEBAR
            ========================================= */}
        <aside className={`portal-sb ${sidebarOpen ? "open" : ""}`} id="portal-sb">
          {/* Logo & Brand Header */}
          <Link href="/" className="portal-brand">
            <span className="portal-logo-box">
              <Image
                src="/logo.png"
                alt="REDDOX"
                width={28}
                height={28}
                className="logo-img"
                priority
              />
            </span>
            <span className="portal-brand-text">
              RED<span className="portal-brand-dox">DOX</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="portal-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => changeView(item.id)}
                  className={isActive ? "on" : ""}
                >
                  <SvgIcon name={item.icon} />
                  <span>{item.label}</span>
                  {item.id === "notifications" && unreadNotifs > 0 && (
                    <b>{unreadNotifs}</b>
                  )}
                </button>
              );
            })}

            {/* Sign Out Button - Immediately after Settings */}
            <button
              onClick={handleSignOut}
              className="portal-out"
              title="Sign out of your account"
            >
              <SvgIcon name="out" />
              <span>Sign out</span>
            </button>
          </nav>

          {/* Plan Usage Box */}
          <div className="portal-plan">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <b>{currentPlan.n} plan</b>
              <span className="portal-chip" style={{ fontSize: 10, padding: "2px 6px" }}>{currentPlan.pr}</span>
            </div>
            <small suppressHydrationWarning>
              {`${members.length} of ${currentPlan.mem.toLocaleString("en-NG")} members (${Math.round((members.length / currentPlan.mem) * 100)}%)`}
            </small>
            <div className="portal-pb">
              <i
                style={{
                  width: `${Math.max(
                    2,
                    Math.min(100, (members.length / currentPlan.mem) * 100)
                  )}%`,
                  background: members.length >= currentPlan.mem ? "var(--er)" : undefined,
                }}
              />
            </div>
            {selectedPlan === "starter" ? (
              <Link
                href="/checkout?plan=growth"
                className="portal-btn sm p"
                style={{
                  marginTop: 8,
                  width: "100%",
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: 12,
                }}
              >
                Upgrade to Growth &rarr;
              </Link>
            ) : selectedPlan === "growth" ? (
              <Link
                href="/checkout?plan=pro"
                className="portal-btn sm"
                style={{
                  marginTop: 8,
                  width: "100%",
                  justifyContent: "center",
                  textDecoration: "none",
                  fontSize: 12,
                }}
              >
                Upgrade to Pro &rarr;
              </Link>
            ) : (
              <small style={{ color: "var(--rd)", fontWeight: 600, display: "block", marginTop: 4 }}>
                ✦ Pro Tier Active
              </small>
            )}
          </div>
        </aside>

        {/* Mobile Drawer Backdrop */}
        <div
          className={`portal-sc ${sidebarOpen ? "open" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* =========================================
            MAIN VIEW AREA
            ========================================= */}
        <main className="portal-main">
          {/* Top Bar Navigation */}
          <header className="portal-tb">
            {/* Mobile Hamburger Toggle */}
            <button
              className="portal-ic burger"
              aria-label="Menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <SvgIcon name="menu" />
            </button>

            {/* Church Switcher Dropdown */}
            <div className="portal-ddw">
              <button
                className="portal-chb"
                onClick={() =>
                  setActiveDropdown(activeDropdown === "church" ? "" : "church")
                }
                title={`Active Workspace: ${currentChurch.n}`}
              >
                <span className="portal-chb-badge">
                  {getInitials(currentChurch.n)}
                </span>
                <div className="portal-chb-text">
                  <span className="portal-chb-name">{currentChurch.n}</span>
                  <div className="portal-chb-meta">
                    <span className="portal-chb-role">{currentChurch.r}</span>
                    <span className="portal-chb-dot" />
                    <span className="portal-chb-branch">Main Branch</span>
                  </div>
                </div>
                <SvgIcon name="chev" className="portal-chb-chev" />
              </button>
              {activeDropdown === "church" && (
                <div className="portal-dd l">
                  <div className="portal-user-card" style={{ marginBottom: 8 }}>
                    <span className="portal-chb-badge" style={{ width: 34, height: 34, fontSize: 13 }}>
                      {getInitials(currentChurch.n)}
                    </span>
                    <div>
                      <strong>{currentChurch.n}</strong>
                      <small>Workspace · {currentChurch.r} Access</small>
                    </div>
                  </div>
                  <div className="portal-dd-sep" />
                  <h4>Switch Workspace</h4>
                  {churches.map((ch, idx) => (
                    <button
                      key={idx}
                      className={`portal-dd-item ${idx === churchIndex ? "active" : ""}`}
                      onClick={() => {
                        setChurchIndex(idx);
                        setActiveDropdown("");
                        showToast(`Switched to ${ch.n} (${ch.r} role)`);
                      }}
                    >
                      <span className="portal-dd-badge">
                        {getInitials(ch.n)}
                      </span>
                      <div className="portal-dd-info">
                        <strong>{ch.n}</strong>
                        <small>
                          {ch.r} {idx === churchIndex ? "· Active" : ""}
                        </small>
                      </div>
                      {idx === churchIndex && <span className="portal-dd-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="portal-srch">
              <input
                type="text"
                placeholder="Search members, tithes, events…"
                value={memberSearch}
                onChange={(e) => {
                  setMemberSearch(e.target.value);
                  if (activeView !== "members") {
                    setActiveView("members");
                    setMemberDeptFilter("All");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (activeView !== "members") {
                      setActiveView("members");
                    }
                  }
                }}
              />
              {memberSearch && (
                <button
                  type="button"
                  className="portal-srch-clear"
                  onClick={() => setMemberSearch("")}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className="portal-srch-btn"
                onClick={() => {
                  if (activeView !== "members") {
                    setActiveView("members");
                    setMemberDeptFilter("All");
                  }
                }}
                title="Search"
                aria-label="Search"
              >
                <SvgIcon name="search" />
              </button>
            </div>

            {/* Top Right Actions */}
            <div className="portal-tr">
              {/* Active Plan Pill Indicator */}
              <div
                className={`portal-plan-pill ${selectedPlan}`}
                onClick={() => changeView("settings")}
                title={`Active Plan: ${currentPlan.n} (${members.length}/${currentPlan.mem.toLocaleString("en-NG")} members)`}
              >
                <span className="portal-plan-dot" />
                <div className="portal-plan-details">
                  <span className="portal-plan-name">{currentPlan.n}</span>
                  <span className="portal-plan-count">
                    {members.length}/{currentPlan.mem.toLocaleString("en-NG")}
                  </span>
                </div>
                {selectedPlan === "starter" ? (
                  <Link
                    href="/checkout?plan=growth"
                    onClick={(e) => e.stopPropagation()}
                    className="portal-plan-up"
                  >
                    <span>Upgrade</span>
                    <span className="portal-plan-arrow">&rarr;</span>
                  </Link>
                ) : selectedPlan === "growth" ? (
                  <Link
                    href="/checkout?plan=pro"
                    onClick={(e) => e.stopPropagation()}
                    className="portal-plan-up"
                  >
                    <span>Pro</span>
                    <span className="portal-plan-arrow">&rarr;</span>
                  </Link>
                ) : (
                  <span className="portal-plan-pro-tag">✦ Pro Active</span>
                )}
              </div>

              {/* Notifications Dropdown */}
              <div className="portal-ddw">
                <button
                  className="portal-ic"
                  aria-label="Notifications"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "notifs" ? "" : "notifs")
                  }
                >
                  <SvgIcon name="bell" />
                  {unreadNotifs > 0 && <b />}
                </button>
                {activeDropdown === "notifs" && (
                  <div className="portal-dd">
                    <h4>Notifications</h4>
                    {notifications.slice(0, 4).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveDropdown("");
                          changeView("notifications");
                        }}
                        className={item.u ? "u" : ""}
                      >
                        <p>
                          {item.t}
                          <br />
                          <small>{item.w}</small>
                        </p>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        setActiveDropdown("");
                        changeView("notifications");
                      }}
                    >
                      <p>
                        <b>View all alerts</b>
                      </p>
                    </button>
                  </div>
                )}
              </div>

              {/* User Profile Menu */}
              <div className="portal-ddw">
                <button
                  className="portal-user-btn"
                  aria-label="User menu"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "user" ? "" : "user")
                  }
                >
                  <div className="portal-av-wrap">
                    <span className="portal-av">
                      {user?.name ? getInitials(user.name) : "PT"}
                    </span>
                    <span className="portal-av-online" />
                  </div>
                  <div className="portal-user-text">
                    <span className="portal-user-name">
                      {user?.name || "Pastor Tosin"}
                    </span>
                    <span className="portal-user-role">Administrator</span>
                  </div>
                  <SvgIcon name="chev" className="portal-user-chev" />
                </button>
                {activeDropdown === "user" && (
                  <div className="portal-dd">
                    <div className="portal-user-card">
                      <span className="portal-av lg">
                        {user?.name ? getInitials(user.name) : "PT"}
                      </span>
                      <div>
                        <strong>{user?.name || "Pastor Tosin Adewale"}</strong>
                        <small>{user?.email || "pastor@church.org"}</small>
                      </div>
                    </div>
                    <div className="portal-dd-sep" />
                    <button
                      onClick={() => {
                        setActiveDropdown("");
                        changeView("settings");
                      }}
                    >
                      <SvgIcon name="gear" />
                      <p>Account &amp; settings</p>
                    </button>
                    <button
                      onClick={() => {
                        setActiveDropdown("");
                        changeView("notifications");
                      }}
                    >
                      <SvgIcon name="bell" />
                      <p>Notifications</p>
                    </button>
                    <button onClick={handleSignOut} className="portal-dd-danger">
                      <SvgIcon name="out" />
                      <p>Sign out</p>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* =========================================
              VIEW CONTENT ROUTER
              ========================================= */}
          <div className="portal-vw">
            {activeView === "dashboard" && (
              <DashboardView
                members={members}
                sessions={sessions}
                events={events}
                giving={giving}
                visitors={visitors}
                activity={activity}
                plan={currentPlan}
                church={currentChurch}
                onOpenModal={(m: any) => setActiveModal(m)}
                onUpgrade={() => router.push("/checkout?plan=growth")}
                onNavigate={changeView}
              />
            )}

            {activeView === "members" && (
              <MembersView
                members={members}
                plan={currentPlan}
                search={memberSearch}
                deptFilter={memberDeptFilter}
                page={memberPage}
                onSearchChange={setMemberSearch}
                onDeptChange={setMemberDeptFilter}
                onPageChange={setMemberPage}
                onAddMember={() => {
                  if (members.length >= currentPlan.mem) {
                    showToast(`Limit reached: ${currentPlan.n} plan allows up to ${currentPlan.mem} members.`);
                  }
                  setActiveModal("addMember");
                }}
                onEditMember={(m: any) => {
                  setEditingMember(m);
                  setActiveModal("editMember");
                }}
                onDeleteMember={(id: any) => {
                  const target = members.find((x) => x.id === id);
                  setMembers(members.filter((x) => x.id !== id));
                  showToast(`${target?.n || "Member"} removed`);
                }}
                onExport={() => {
                  if (!currentPlan.exports) {
                    showToast("Exports require Growth or Pro plan.");
                  } else {
                    showToast("Exporting member records to CSV…");
                  }
                }}
              />
            )}

            {activeView === "attendance" && (
              <AttendanceView
                members={members}
                sessions={sessions}
                currentSessionId={currentSessionId}
                plan={currentPlan}
                onSelectSession={setCurrentSessionId}
                onToggleAttendance={(memberId: any) => {
                  setSessions((prev) =>
                    prev.map((s) => {
                      if (s.id !== currentSessionId) return s;
                      const has = s.p.includes(memberId);
                      return {
                        ...s,
                        p: has ? s.p.filter((id) => id !== memberId) : [...s.p, memberId],
                      };
                    })
                  );
                }}
                onMarkAllPresent={() => {
                  setSessions((prev) =>
                    prev.map((s) =>
                      s.id === currentSessionId ? { ...s, p: members.map((m) => m.id) } : s
                    )
                  );
                  showToast("Everyone marked present for this session.");
                }}
                onNewSession={() => setActiveModal("newSession")}
              />
            )}

            {activeView === "events" && (
              <EventsView
                events={events}
                plan={currentPlan}
                onCreateEvent={() => {
                  if (currentPlan.eventsPerMonth === 1 && events.length >= 1) {
                    showToast("Starter plan allows 1 event per month. Upgrade to Growth for unlimited events.");
                  }
                  setActiveModal("createEvent");
                }}
                onRegister={(idx: any) => {
                  setEvents((prev) =>
                    prev.map((ev, i) => (i === idx ? { ...ev, r: ev.r + 1 } : ev))
                  );
                  showToast("Registration confirmed.");
                }}
                onRemoveEvent={(idx: any) => {
                  setEvents(events.filter((_, i) => i !== idx));
                  showToast("Event removed.");
                }}
              />
            )}

            {activeView === "finances" && (
              <FinancesView
                giving={giving}
                expenses={expenses}
                plan={currentPlan}
                churchRole={currentChurch.r}
                tab={financeTab}
                onTabChange={setFinanceTab}
                getMemberName={getMemberName}
                onRecordGiving={() => setActiveModal("recordGiving")}
                onAddExpense={() => setActiveModal("addExpense")}
                onExport={() => showToast("Exporting financial statement…")}
              />
            )}

            {activeView === "visitors" && (
              <VisitorsView
                visitors={visitors}
                onRecordVisitor={() => setActiveModal("recordVisitor")}
                onStatusChange={(id: any, status: any) => {
                  setVisitors((prev) =>
                    prev.map((v) => (v.id === id ? { ...v, s: status } : v))
                  );
                  showToast("Visitor follow-up status updated.");
                }}
              />
            )}

            {activeView === "sermons" && (
              <SermonsView
                sermons={sermons}
                plan={currentPlan}
                onAddSermon={() => setActiveModal("addSermon")}
                onRemoveSermon={(idx: any) => {
                  setSermons(sermons.filter((_, i) => i !== idx));
                  showToast("Sermon removed.");
                }}
              />
            )}

            {activeView === "reports" && (
              <ReportsView
                members={members}
                sessions={sessions}
                events={events}
                giving={giving}
                plan={currentPlan}
                onExport={() => {
                  if (!currentPlan.exports) {
                    showToast("Executive export requires Growth or Pro plan.");
                  } else {
                    showToast("Exporting executive summary report…");
                  }
                }}
              />
            )}

            {activeView === "staff" && (
              <StaffView
                staff={staff}
                plan={currentPlan}
                churchRole={currentChurch.r}
                onInviteStaff={() => {
                  if (currentPlan.admins === 1 && staff.length >= 1) {
                    showToast("Starter plan includes 1 administrator. Upgrade to Growth to invite staff.");
                  }
                  setActiveModal("inviteStaff");
                }}
                onRoleChange={(idx: any, role: any) => {
                  setStaff((prev) =>
                    prev.map((s, i) => (i === idx ? { ...s, r: role } : s))
                  );
                  showToast("Staff permission role updated.");
                }}
                onRevokeAccess={(idx: any) => {
                  const target = staff[idx];
                  setStaff(staff.filter((_, i) => i !== idx));
                  showToast(`Access revoked for ${target.n}`);
                }}
              />
            )}

            {activeView === "notifications" && (
              <NotificationsView
                notifications={notifications}
                notifPrefs={notifPrefs}
                onMarkAllRead={() => {
                  setNotifications((prev) => prev.map((n) => ({ ...n, u: false })));
                  showToast("All notifications marked as read.");
                }}
                onTogglePref={(key: any) => {
                  setNotifPrefs((prev: any) => ({
                    ...prev,
                    [key]: !prev[key],
                  }));
                }}
              />
            )}

            {activeView === "settings" && (
              <SettingsView
                church={currentChurch}
                plan={selectedPlan}
                activity={activity}
                onSaveProfile={(updatedProfile: any) => {
                  const newName =
                    typeof updatedProfile === "string"
                      ? updatedProfile
                      : updatedProfile.churchName || currentChurch.n;
                  setChurches((prev) =>
                    prev.map((c, i) => (i === churchIndex ? { ...c, n: newName } : c))
                  );
                  if (typeof window !== "undefined" && typeof updatedProfile === "object") {
                    try {
                      const existing = localStorage.getItem("reddox_church_profile");
                      const prevData = existing ? JSON.parse(existing) : {};
                      localStorage.setItem(
                        "reddox_church_profile",
                        JSON.stringify({ ...prevData, ...updatedProfile })
                      );
                    } catch (e) {}
                  }
                  showToast("Church profile saved.");
                }}
                onSelectPlan={(k: any) => {
                  const planKey: keyof typeof PLANS = (k === "starter" || k === "growth" || k === "pro") ? k : "starter";
                  setSelectedPlan(planKey);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("reddox_active_plan", planKey);
                  }
                  showToast(`Switched plan to ${PLANS[planKey].n}`);
                }}
                onExportData={() => {
                  if (!currentPlan.exports) {
                    showToast("Database export requires Growth or Pro plan.");
                  } else {
                    showToast("Exporting complete church database…");
                  }
                }}
              />
            )}
          </div>
        </main>
      </div>

      {/* =========================================
          INTERACTIVE MODALS
          ========================================= */}
      {activeModal === "addMember" && (
        <AddMemberModal
          plan={currentPlan}
          currentCount={members.length}
          onClose={() => setActiveModal(null)}
          onSave={(newMemberOrList: any) => {
            if (Array.isArray(newMemberOrList)) {
              const newItems = newMemberOrList.map((m: any, idx: number) => ({
                ...m,
                id: Date.now() + idx,
                j: new Date().getFullYear(),
              }));
              setMembers((prev) => [...prev, ...newItems]);
              setActivity((prev) => [
                {
                  t: `Imported ${newItems.length} members from roster`,
                  w: "Just now",
                  i: "PDF",
                },
                ...prev,
              ]);
              showToast(`${newItems.length} members imported to dashboard`);
            } else {
              const id = Date.now();
              setMembers((prev) => [
                ...prev,
                { ...newMemberOrList, id, j: new Date().getFullYear() },
              ]);
              setActivity((prev) => [
                {
                  t: `New member: ${newMemberOrList.n}`,
                  w: "Just now",
                  i: getInitials(newMemberOrList.n),
                },
                ...prev,
              ]);
              showToast(`${newMemberOrList.n} added to dashboard`);
            }
            setActiveModal(null);
          }}
          onUpgrade={() => {
            setActiveModal(null);
            changeView("settings");
          }}
        />
      )}

      {activeModal === "editMember" && editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => {
            setActiveModal(null);
            setEditingMember(null);
          }}
          onSave={(updated: any) => {
            setMembers((prev) =>
              prev.map((m) => (m.id === updated.id ? { ...m, ...updated } : m))
            );
            showToast("Member profile updated.");
            setActiveModal(null);
            setEditingMember(null);
          }}
        />
      )}

      {activeModal === "recordGiving" && (
        <RecordGivingModal
          members={members}
          onClose={() => setActiveModal(null)}
          onSave={(gift: any) => {
            setGiving([
              { id: Date.now(), ...gift, w: "Today" },
              ...giving,
            ]);
            const mName = getMemberName(gift.m);
            setActivity([
              {
                t: `${mName} gave ${formatNaira(gift.a)} ${gift.t.toLowerCase()}`,
                w: "Just now",
                i: getInitials(mName),
              },
              ...activity,
            ]);
            showToast(`Recorded ${formatNaira(gift.a)}`);
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === "addExpense" && (
        <AddExpenseModal
          onClose={() => setActiveModal(null)}
          onSave={(exp: any) => {
            setExpenses([{ ...exp, w: "Today" }, ...expenses]);
            showToast("Expense recorded successfully.");
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === "createEvent" && (
        <CreateEventModal
          plan={currentPlan}
          currentCount={events.length}
          onClose={() => setActiveModal(null)}
          onSave={(ev: any) => {
            setEvents([...events, ev]);
            setActivity([
              { t: `${ev.t} created`, w: "Just now", i: getInitials(ev.t) },
              ...activity,
            ]);
            showToast("Event created successfully.");
            setActiveModal(null);
          }}
          onUpgrade={() => {
            setActiveModal(null);
            router.push("/checkout?plan=growth");
          }}
        />
      )}

      {activeModal === "newSession" && (
        <NewSessionModal
          onClose={() => setActiveModal(null)}
          onSave={(sess: any) => {
            const id = Date.now();
            setSessions([{ id, ...sess, p: [] }, ...sessions]);
            setCurrentSessionId(id);
            showToast("New service session created.");
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === "recordVisitor" && (
        <RecordVisitorModal
          staff={staff}
          onClose={() => setActiveModal(null)}
          onSave={(vis: any) => {
            setVisitors([{ id: Date.now(), ...vis }, ...visitors]);
            setNotifications([
              { id: Date.now(), t: `New visitor recorded: ${vis.n}`, w: "Just now", u: true },
              ...notifications,
            ]);
            setActivity([
              { t: `${vis.n} recorded as a visitor`, w: "Just now", i: getInitials(vis.n) },
              ...activity,
            ]);
            showToast("First-time guest recorded.");
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === "addSermon" && (
        <AddSermonModal
          onClose={() => setActiveModal(null)}
          onSave={(sermon: any) => {
            setSermons([sermon, ...sermons]);
            showToast("Sermon details added.");
            setActiveModal(null);
          }}
        />
      )}

      {activeModal === "inviteStaff" && (
        <InviteStaffModal
          plan={currentPlan}
          currentCount={staff.length}
          onClose={() => setActiveModal(null)}
          onSave={(inv: any) => {
            setStaff([...staff, { ...inv, s: "Invited" }]);
            showToast("Invitation recorded (Demo: email delivery simulated).");
            setActiveModal(null);
          }}
          onUpgrade={() => {
            setActiveModal(null);
            router.push("/checkout?plan=growth");
          }}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && <div className="portal-toast">{toastMessage}</div>}
    </div>
  );
}

/* =====================================================================
   VIEW 1: DASHBOARD OVERVIEW
   ===================================================================== */
function DashboardView({
  members,
  sessions,
  events,
  giving,
  visitors,
  activity,
  plan,
  church,
  onOpenModal,
}: any) {
  const memberCount = members.length;
  const lastSession = sessions[0] || { p: [], d: "--" };
  const attendancePct = memberCount
    ? Math.round((lastSession.p.length / memberCount) * 100)
    : 0;
  const totalGiving = giving.reduce((acc: number, g: any) => acc + g.a, 0);
  const pendingVisitors = visitors.filter(
    (v: any) => v.s === "New" || v.s === "Follow-up due"
  ).length;

  const recentSessions = [...sessions].slice(0, 6).reverse();

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Welcome back</h1>
          <p>Here’s how {church.n} is doing this week.</p>
        </div>
        <div className="portal-acts">
          <button onClick={() => onOpenModal("addMember")} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>Add member</span>
          </button>
        </div>
      </div>

      {/* Starter Plan Banner */}
      {plan.id === "starter" && (
        <div className="portal-starter-banner" suppressHydrationWarning>
          <div className="portal-starter-banner-content">
            <span className="portal-starter-tag">Starter</span>
            <span className="portal-starter-quota" suppressHydrationWarning>
              {memberCount} / 15 members used
            </span>
          </div>
          <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none", flexShrink: 0 }}>
            Upgrade &rarr;
          </Link>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="portal-gs">
        {/* Card 1: Members */}
        <div className="portal-cd portal-st">
          <div className="portal-st-head">
            <div className="portal-ico">
              <SvgIcon name="users" />
            </div>
            <span className="portal-trend pos">↑ +2 every Sunday</span>
          </div>
          <span className="portal-st-lbl">Total Members</span>
          <div className="portal-st-val-row">
            <b>{memberCount}</b>
          </div>
          <span className="portal-st-sub" suppressHydrationWarning>
            {`${memberCount} of ${plan.mem} quota · +2 this week`}
          </span>
        </div>

        {/* Card 2: Attendance */}
        <div className="portal-cd portal-st">
          <div className="portal-st-head">
            <div className="portal-ico" style={{ background: "#e6f4ea", color: "#137333" }}>
              <SvgIcon name="check" />
            </div>
            <span className="portal-trend pos">↑ +5% vs prev</span>
          </div>
          <span className="portal-st-lbl">Sunday Attendance</span>
          <div className="portal-st-val-row">
            <b>{attendancePct}%</b>
          </div>
          <span className="portal-st-sub">
            {lastSession.p.length} of {memberCount} present · {lastSession.d}
          </span>
        </div>

        {/* Card 3: First-Timers */}
        <div className="portal-cd portal-st">
          <div className="portal-st-head">
            <div className="portal-ico">
              <SvgIcon name="uplus" />
            </div>
            <span className="portal-trend pos">↑ +2 every Sunday</span>
          </div>
          <span className="portal-st-lbl">First-Timers</span>
          <div className="portal-st-val-row">
            <b>48</b>
          </div>
          <span className="portal-st-sub">
            48 recorded · 2 new this week
          </span>
        </div>

        {/* Card 4: Visitors Follow-Up */}
        <div className="portal-cd portal-st">
          <div className="portal-st-head">
            <div className="portal-ico">
              <SvgIcon name="shield" />
            </div>
            <span className="portal-trend warn">2 Pending</span>
          </div>
          <span className="portal-st-lbl">Visitors to Follow Up</span>
          <div className="portal-st-val-row">
            <b>{pendingVisitors}</b>
          </div>
          <span className="portal-st-sub">
            of {visitors.length} visitors · 2 pending call
          </span>
        </div>

        {/* Card 5: Finances */}
        {plan.fin ? (
          <div className="portal-cd portal-st">
            <div className="portal-st-head">
              <div className="portal-ico">
                <SvgIcon name="coin" />
              </div>
              <span className="portal-trend pos">This Month</span>
            </div>
            <span className="portal-st-lbl">Giving Recorded</span>
            <div className="portal-st-val-row">
              <b>{formatNaira(totalGiving)}</b>
            </div>
            <span className="portal-st-sub">{giving.length} contributions received</span>
          </div>
        ) : (
          <Link
            href="/checkout?plan=growth"
            className="portal-cd portal-st"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer", border: "1px dashed var(--bd)" }}
          >
            <div className="portal-st-head">
              <div className="portal-ico">
                <SvgIcon name="lock" />
              </div>
              <span className="portal-trend gold">Growth &amp; Pro</span>
            </div>
            <span className="portal-st-lbl">Tithes &amp; Offerings</span>
            <div className="portal-st-val-row">
              <b style={{ fontSize: 22 }}>Locked</b>
            </div>
            <span className="portal-st-sub" style={{ color: "var(--bl)", fontWeight: 600 }}>
              Upgrade to Unlock &rarr;
            </span>
          </Link>
        )}
      </div>

      {/* 2-Column Grid: Attendance Chart & First-timers */}
      <div className="portal-g2">
        <div className="portal-cd">
          <h3>Attendance summary</h3>
          <div className="portal-ch">
            {recentSessions.map((s: any, idx: number) => {
              const pct = memberCount
                ? Math.round((s.p.length / memberCount) * 100)
                : 0;
              return (
                <div key={s.id || idx}>
                  <i
                    style={
                      {
                        "--h": `${Math.max(pct, 4)}%`,
                        animationDelay: `${idx * 70}ms`,
                      } as React.CSSProperties
                    }
                    data-v={`${pct}% (${s.p.length})`}
                  />
                  <span>{s.d}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="portal-cd">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>First-timers &amp; follow-ups</h3>
            <span className="portal-chip go" style={{ margin: 0, fontSize: 11 }}>
              {pendingVisitors} pending
            </span>
          </div>
          {visitors.length ? (
            visitors.slice(0, 4).map((v: any, i: number) => (
              <div key={v.id || i} className="portal-li">
                <span className="portal-a" style={{ background: "var(--rd2)", color: "#7a5a12" }}>
                  {getInitials(v.n)}
                </span>
                <p>
                  <strong>{v.n}</strong>
                  <br />
                  <small>{v.nt || "First-time visitor"} · {v.d}</small>
                </p>
                <span
                  className={`portal-pill ${
                    v.s === "New"
                      ? "go"
                      : v.s === "Became member"
                      ? "ok"
                      : v.s === "Contacted"
                      ? ""
                      : "no"
                  }`}
                >
                  {v.s}
                </span>
              </div>
            ))
          ) : (
            <div className="portal-emp">
              <div className="portal-ico">
                <SvgIcon name="uplus" />
              </div>
              <h3>No visitors recorded</h3>
              <p>Record first-timers to track follow-up progress.</p>
              <button onClick={() => onOpenModal("recordVisitor")} className="portal-btn p">
                Add first-timer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="portal-cd">
        <h3>Recent activity</h3>
        {activity.slice(0, 5).map((act: any, idx: number) => (
          <div key={idx} className="portal-li">
            <span className="portal-a">{act.i}</span>
            <p>{act.t}</p>
            <small>{act.w}</small>
          </div>
        ))}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 2: MEMBERS DIRECTORY
   ===================================================================== */
function MembersView({
  members,
  plan,
  search,
  deptFilter,
  page,
  onSearchChange,
  onDeptChange,
  onPageChange,
  onAddMember,
  onEditMember,
  onDeleteMember,
  onExport,
}: any) {
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return members.filter((m: any) => {
      const matchDept = deptFilter === "All" || m.d === deptFilter;
      const matchQuery =
        m.n.toLowerCase().includes(q) || m.e.toLowerCase().includes(q);
      return matchDept && matchQuery;
    });
  }, [members, search, deptFilter]);

  const perPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pagedMembers = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Members</h1>
          <p>
            {members.length} of {plan.mem.toLocaleString("en-NG")} on the {plan.n} plan
          </p>
        </div>
        <div className="portal-acts">
          <button onClick={onExport} className="portal-btn">
            Export
          </button>
          <button onClick={onAddMember} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>Add member</span>
          </button>
        </div>
      </div>

      <div className="portal-cd">
        {plan.id === "starter" && (
          <div
            style={{
              background: members.length >= 15 ? "rgba(179,38,30,0.08)" : "rgba(109,42,60,0.05)",
              border: `1px solid ${members.length >= 15 ? "var(--er)" : "var(--bd)"}`,
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong style={{ color: members.length >= 15 ? "var(--er)" : "var(--bl)", display: "block" }}>
                {members.length >= 15
                  ? "⚠️ Starter Plan Member Limit Reached (15 of 15)"
                  : `Starter Plan Capacity: ${members.length} of 15 members used (${Math.round((members.length / 15) * 100)}%)`}
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--mu)" }}>
                {members.length >= 15
                  ? "You have reached the maximum 15 members on the free Starter plan. Upgrade to Growth to add up to 1,000 members."
                  : "Churches with over 15 members can upgrade to Growth at any time for 1,000 members and full ministry tools."}
              </p>
            </div>
            <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none" }}>
              Upgrade to Growth (₦15k/mo) &rarr;
            </Link>
          </div>
        )}

        {/* Filters */}
        <div className="portal-fl">
          <input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => {
              onSearchChange(e.target.value);
              onPageChange(1);
            }}
          />
          <select
            value={deptFilter}
            onChange={(e) => {
              onDeptChange(e.target.value);
              onPageChange(1);
            }}
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {pagedMembers.length > 0 ? (
          <>
            <div className="portal-tw">
              <table>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Department</th>
                    <th>Phone</th>
                    <th>Joined</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedMembers.map((m: any) => (
                    <tr key={m.id}>
                      <td>
                        <div
                          className="portal-nm"
                          onClick={() => onEditMember(m)}
                        >
                          <span className="portal-a">{getInitials(m.n)}</span>
                          <div>
                            <strong>{m.n}</strong>
                            <small>{m.e}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="portal-pill">{m.d}</span>
                      </td>
                      <td>{m.ph}</td>
                      <td>{m.j}</td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          onClick={() => onDeleteMember(m.id)}
                          className="portal-btn sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="portal-pg">
              <span>
                Showing {(currentPage - 1) * perPage + 1}–
                {(currentPage - 1) * perPage + pagedMembers.length} of{" "}
                {filtered.length}
              </span>
              <div className="portal-acts">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="portal-btn sm"
                  style={{ opacity: currentPage <= 1 ? 0.4 : 1 }}
                >
                  Previous
                </button>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="portal-btn sm"
                  style={{ opacity: currentPage >= totalPages ? 0.4 : 1 }}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="portal-emp">
            <div className="portal-ico">
              <SvgIcon name="search" />
            </div>
            <h3>No members match</h3>
            <p>Try a different keyword or reset filters.</p>
            <button
              onClick={() => {
                onSearchChange("");
                onDeptChange("All");
              }}
              className="portal-btn"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 3: ATTENDANCE TRACKER
   ===================================================================== */
function AttendanceView({
  members,
  sessions,
  currentSessionId,
  plan,
  onSelectSession,
  onToggleAttendance,
  onMarkAllPresent,
  onNewSession,
}: any) {
  const currentSession =
    sessions.find((s: any) => s.id === currentSessionId) || sessions[0];
  const presentCount = currentSession ? currentSession.p.length : 0;
  const totalCount = members.length;
  const pct = totalCount ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Attendance</h1>
          <p>{sessions.length} sessions recorded</p>
        </div>
        <div className="portal-acts">
          <button onClick={onNewSession} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>New session</span>
          </button>
        </div>
      </div>

      {/* QR Check-in Box */}
      {plan.qr ? (
        <div
          className="portal-cd"
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <svg className="portal-qr" viewBox="0 0 21 21" shapeRendering="crispEdges">
            <path
              fill="#2b2015"
              d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM1 1v5h5V1zM15 1v5h5V1zM1 15v5h5v-5zM2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM8 0h2v2H8zM11 1h2v2h-2zM8 4h3v2H8zM12 5h1v2h-1zM0 8h2v2H0zM3 9h3v2H3zM8 8h2v3H8zM12 8h3v2h-3zM16 9h2v2h-2zM19 8h2v3h-2zM8 12h2v2H8zM11 13h2v2h-2zM14 12h2v2h-2zM18 13h3v2h-3zM8 16h3v2H8zM12 17h2v3h-2zM15 16h2v2h-2zM18 18h3v3h-3zM9 19h2v2H9z"
            />
          </svg>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h3 style={{ marginBottom: 4 }}>Live QR Check-In</h3>
            <p style={{ margin: 0, color: "var(--mu)" }}>
              Members scan the code upon entry. Manual toggle check-in is also enabled
              below for ushers.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="portal-cd portal-lock"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            border: "1px dashed var(--bd)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="portal-ico" style={{ margin: 0 }}>
              <SvgIcon name="lock" />
            </div>
            <div>
              <b style={{ display: "block", fontSize: 15 }}>QR Attendance is available on Growth &amp; Pro</b>
              <p style={{ margin: "2px 0 0", color: "var(--mu)", fontSize: 13 }}>
                The Starter plan includes manual one-tap attendance tracking below. Upgrade to Growth for self-service QR check-in &amp; kiosk mode.
              </p>
            </div>
          </div>
          <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none" }}>
            Unlock QR Attendance &rarr;
          </Link>
        </div>
      )}

      {/* Session selector & Member Toggles */}
      <div className="portal-cd">
        <div className="portal-fl">
          <select
            value={currentSessionId}
            onChange={(e) => onSelectSession(Number(e.target.value))}
          >
            {sessions.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.n} · {s.d}
              </option>
            ))}
          </select>
          <button onClick={onMarkAllPresent} className="portal-btn">
            Mark all present
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div
            className="portal-pb"
            style={{
              flex: 1,
              background: "var(--bl2)",
              height: 10,
              margin: 0,
            }}
          >
            <i
              style={{
                width: `${pct}%`,
                background: "var(--bl)",
              }}
            />
          </div>
          <b>
            {presentCount} of {totalCount} · {pct}%
          </b>
        </div>

        {members.map((m: any) => {
          const isPresent = currentSession?.p.includes(m.id);
          return (
            <div key={m.id} className="portal-li">
              <span className="portal-a">{getInitials(m.n)}</span>
              <p>
                <strong>{m.n}</strong>
                <br />
                <small>{m.d}</small>
              </p>
              <span className={`portal-pill ${isPresent ? "ok" : "no"}`}>
                {isPresent ? "Present" : "Absent"}
              </span>
              <button
                type="button"
                className={`portal-sw ${isPresent ? "on" : ""}`}
                aria-label={`Toggle attendance for ${m.n}`}
                onClick={() => onToggleAttendance(m.id)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 4: EVENTS & RSVPS
   ===================================================================== */
function EventsView({ events, plan, onCreateEvent, onRegister, onRemoveEvent }: any) {
  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Events</h1>
          <p>
            {events.length} events scheduled · {plan?.eventsPerMonth === 1 ? "Starter tier (1 event/month limit)" : "Unlimited events"}
          </p>
        </div>
        <div className="portal-acts">
          <button onClick={onCreateEvent} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>Create event</span>
          </button>
        </div>
      </div>

      {plan?.id === "starter" && (
        <div
          style={{
            background: "rgba(109,42,60,0.05)",
            border: "1px solid var(--bd)",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ color: "var(--bl)", display: "block" }}>
              Starter Plan Limit: 1 Event Per Month
            </strong>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--mu)" }}>
              {events.length >= 1
                ? "You have reached your 1-event monthly allowance on Starter. Upgrade to Growth for unlimited scheduled events & registrations."
                : "Free Starter churches can publish 1 event per month. Upgrade to Growth for unlimited scheduled events."}
            </p>
          </div>
          <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none" }}>
            Upgrade to Growth &rarr;
          </Link>
        </div>
      )}

      <div className="portal-cd">
        {events.length ? (
          events.map((ev: any, idx: number) => (
            <div key={idx} className="portal-li">
              <span className="portal-dt">
                <b>{ev.d}</b>
                {ev.mo}
              </span>
              <p>
                <strong>{ev.t}</strong>
                <br />
                <small>{ev.tm}</small>
              </p>
              <span className="portal-pill">{ev.r} registered</span>
              <button onClick={() => onRegister(idx)} className="portal-btn sm">
                + Register
              </button>
              <button onClick={() => onRemoveEvent(idx)} className="portal-btn sm">
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="portal-emp">
            <div className="portal-ico">
              <SvgIcon name="cal" />
            </div>
            <h3>No events scheduled</h3>
            <p>Schedule your services, revivals, and ministry fellowships.</p>
            <button onClick={onCreateEvent} className="portal-btn p">
              Create event
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 5: FINANCES & TITHES
   ===================================================================== */
function FinancesView({
  giving,
  expenses,
  plan,
  churchRole,
  tab,
  onTabChange,
  getMemberName,
  onRecordGiving,
  onAddExpense,
  onExport,
}: any) {
  if (churchRole === "Staff") {
    return (
      <div className="portal-cd portal-emp">
        <div className="portal-ico">
          <SvgIcon name="lock" />
        </div>
        <h3>Restricted Access</h3>
        <p>Your current staff role does not have financial ledger permissions.</p>
      </div>
    );
  }

  if (!plan?.fin) {
    return (
      <div className="portal-cd portal-emp" style={{ padding: "54px 24px", textAlign: "center", maxWidth: 640, margin: "20px auto" }}>
        <div className="portal-ico" style={{ margin: "0 auto 16px", width: 56, height: 56 }}>
          <SvgIcon name="lock" />
        </div>
        <span className="portal-pill" style={{ marginBottom: 12, display: "inline-block" }}>
          Growth &amp; Pro Feature
        </span>
        <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, margin: "8px 0 12px" }}>
          Financial Management is Locked
        </h2>
        <p style={{ margin: "0 auto 24px", color: "var(--mu)", lineHeight: 1.6, fontSize: 15 }}>
          The free Starter plan includes member management and manual attendance. To record tithes, offerings, ministry expenses, track donor histories, and export financial statements, upgrade to the Growth plan.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/checkout?plan=growth" className="portal-btn p" style={{ textDecoration: "none" }}>
            Upgrade to Growth (₦15,000/mo) &rarr;
          </Link>
          <a href="#settings" className="portal-btn" style={{ textDecoration: "none" }}>
            Compare All Plans
          </a>
        </div>
      </div>
    );
  }

  const totalGiving = giving.reduce((acc: number, g: any) => acc + g.a, 0);
  const totalExp = expenses.reduce((acc: number, x: any) => acc + x.a, 0);
  const net = totalGiving - totalExp;

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Finances</h1>
          <p>Tithes, Sunday offerings, special pledges, and ministry expenses</p>
        </div>
        <div className="portal-acts">
          <button onClick={onExport} className="portal-btn">
            Export
          </button>
          <button
            onClick={tab === "give" ? onRecordGiving : onAddExpense}
            className="portal-btn p"
          >
            <SvgIcon name="plus" />
            <span>{tab === "give" ? "Record giving" : "Add expense"}</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="portal-gs">
        <div className="portal-cd portal-st">
          <small>Total Giving</small>
          <b>{formatNaira(totalGiving)}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Total Expenses</small>
          <b>{formatNaira(totalExp)}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Net Treasury Balance</small>
          <b style={{ color: net >= 0 ? "var(--tx)" : "var(--er)" }}>
            {formatNaira(net)}
          </b>
        </div>
      </div>

      {/* Tabs */}
      <div className="portal-tabs">
        <button
          className={tab === "give" ? "on" : ""}
          onClick={() => onTabChange("give")}
        >
          Giving &amp; Tithes
        </button>
        <button
          className={tab === "exp" ? "on" : ""}
          onClick={() => onTabChange("exp")}
        >
          Expenses
        </button>
      </div>

      {/* Table */}
      <div className="portal-cd">
        <div className="portal-tw">
          {tab === "give" ? (
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {giving.map((g: any) => (
                  <tr key={g.id}>
                    <td>{getMemberName(g.m)}</td>
                    <td>
                      <span className="portal-pill">{g.t}</span>
                    </td>
                    <td>{g.w}</td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                      {formatNaira(g.a)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((x: any, idx: number) => (
                  <tr key={idx}>
                    <td>{x.t}</td>
                    <td>
                      <span className="portal-pill go">{x.c}</span>
                    </td>
                    <td>{x.w}</td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                      {formatNaira(x.a)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Breakdown by Type */}
      <div className="portal-cd">
        <h3>Giving breakdown by category</h3>
        {GIVING_TYPES.map((t) => {
          const typeSum = giving
            .filter((g: any) => g.t === t)
            .reduce((acc: number, g: any) => acc + g.a, 0);
          const typePct = totalGiving ? Math.round((typeSum / totalGiving) * 100) : 0;
          return (
            <div key={t} className="portal-li">
              <p>
                <strong>{t}</strong>
              </p>
              <div
                className="portal-pb"
                style={{
                  width: "40%",
                  background: "var(--bl2)",
                  margin: 0,
                }}
              >
                <i
                  style={{
                    width: `${typePct}%`,
                    background: "var(--bl)",
                  }}
                />
              </div>
              <b style={{ minWidth: 90, textAlign: "right" }}>
                {formatNaira(typeSum)} ({typePct}%)
              </b>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 6: VISITORS & GUESTS
   ===================================================================== */
function VisitorsView({ visitors, onRecordVisitor, onStatusChange }: any) {
  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>First-Timers &amp; Visitors</h1>
          <p>{visitors.length} guests recorded</p>
        </div>
        <div className="portal-acts">
          <button onClick={onRecordVisitor} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>Record visitor</span>
          </button>
        </div>
      </div>

      <div className="portal-cd">
        {visitors.length ? (
          <div className="portal-tw">
            <table>
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Visit Date</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v: any) => (
                  <tr key={v.id}>
                    <td>
                      <div className="portal-nm">
                        <span className="portal-a">{getInitials(v.n)}</span>
                        <strong>{v.n}</strong>
                      </div>
                    </td>
                    <td>{v.d}</td>
                    <td>{v.w}</td>
                    <td>
                      <select
                        value={v.s}
                        onChange={(e) => onStatusChange(v.id, e.target.value)}
                      >
                        {VISITOR_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ color: "var(--mu)" }}>{v.nt || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="portal-emp">
            <div className="portal-ico">
              <SvgIcon name="uplus" />
            </div>
            <h3>No visitors recorded</h3>
            <p>Track guests and assign pastoral follow-up.</p>
            <button onClick={onRecordVisitor} className="portal-btn p">
              Record visitor
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 7: SERMONS & MEDIA
   ===================================================================== */
function SermonsView({ sermons, plan, onAddSermon, onRemoveSermon }: any) {
  if (!plan?.med) {
    return (
      <div className="portal-cd portal-emp" style={{ padding: "54px 24px", textAlign: "center", maxWidth: 640, margin: "20px auto" }}>
        <div className="portal-ico" style={{ margin: "0 auto 16px", width: 56, height: 56 }}>
          <SvgIcon name="lock" />
        </div>
        <span className="portal-pill" style={{ marginBottom: 12, display: "inline-block" }}>
          Growth &amp; Pro Feature
        </span>
        <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: 24, margin: "8px 0 12px" }}>
          Sermon &amp; Media Library is Locked
        </h2>
        <p style={{ margin: "0 auto 24px", color: "var(--mu)", lineHeight: 1.6, fontSize: 15 }}>
          Archive Sunday message recordings, audio files, sermon series, and outlines for your congregation. Included with Growth and Pro subscriptions.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/checkout?plan=growth" className="portal-btn p" style={{ textDecoration: "none" }}>
            Upgrade to Growth &rarr;
          </Link>
          <a href="#settings" className="portal-btn" style={{ textDecoration: "none" }}>
            View Plan Comparison
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Sermons &amp; Media</h1>
          <p>Message library, sermon outlines, and audio/video links</p>
        </div>
        <div className="portal-acts">
          <button onClick={onAddSermon} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>Add sermon</span>
          </button>
        </div>
      </div>

      <div className="portal-cd">
        {sermons.length ? (
          sermons.map((s: any, idx: number) => (
            <div key={idx} className="portal-li">
              <span className="portal-a">
                <SvgIcon name="mic" />
              </span>
              <p>
                <strong>{s.t}</strong>
                <br />
                <small>
                  {s.sp} · {s.d}
                  {s.l ? (
                    <>
                      {" "}
                      ·{" "}
                      <a href={s.l} target="_blank" rel="noopener noreferrer">
                        Watch / Listen &rarr;
                      </a>
                    </>
                  ) : (
                    " · Audio recorded"
                  )}
                </small>
              </p>
              <span
                className={`portal-pill ${
                  s.v === "Public" ? "ok" : s.v === "Hidden" ? "no" : ""
                }`}
              >
                {s.v}
              </span>
              <button onClick={() => onRemoveSermon(idx)} className="portal-btn sm">
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="portal-emp">
            <div className="portal-ico">
              <SvgIcon name="mic" />
            </div>
            <h3>No sermons uploaded</h3>
            <p>Archive messages and share recordings with members.</p>
            <button onClick={onAddSermon} className="portal-btn p">
              Add sermon
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 8: REPORTS & ANALYTICS
   ===================================================================== */
function ReportsView({ members, sessions, events, giving, plan, onExport }: any) {
  const memberCount = members.length;
  const totalGiving = giving.reduce((acc: number, g: any) => acc + g.a, 0);
  const avgAttendance = sessions.length
    ? Math.round(
        sessions.reduce(
          (acc: number, s: any) => acc + (s.p.length / memberCount) * 100,
          0
        ) / sessions.length
      )
    : 0;

  const sixMonthGrowth = [
    memberCount - 5,
    memberCount - 4,
    memberCount - 3,
    memberCount - 2,
    memberCount - 1,
    memberCount,
  ];

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Reports &amp; Analytics</h1>
          <p>Sunday attendance trends, congregation growth, and ministry health</p>
        </div>
        <div className="portal-acts">
          <button onClick={onExport} className="portal-btn">
            Export
          </button>
        </div>
      </div>

      {plan?.id === "starter" && (
        <div
          style={{
            background: "rgba(109,42,60,0.05)",
            border: "1px solid var(--bd)",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ color: "var(--bl)", display: "block" }}>
              Starter Plan: Basic 7-Day Attendance Reports
            </strong>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--mu)" }}>
              Data exports, multi-month attendance trends, and financial reports require Growth or Pro.
            </p>
          </div>
          <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none" }}>
            Upgrade to Growth &rarr;
          </Link>
        </div>
      )}

      <div className="portal-gs">
        <div className="portal-cd portal-st">
          <small>Total Members</small>
          <b>{memberCount}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Average Attendance</small>
          <b>{avgAttendance}%</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Events Held</small>
          <b>{events.length}</b>
        </div>
        {plan?.fin ? (
          <div className="portal-cd portal-st">
            <small>Giving Recorded</small>
            <b>{formatNaira(totalGiving)}</b>
          </div>
        ) : (
          <div className="portal-cd portal-st">
            <small>Giving Recorded</small>
            <b style={{ fontSize: 16 }}>Locked</b>
          </div>
        )}
      </div>

      <div className="portal-g2">
        <div className="portal-cd">
          <h3>Member growth (last 6 months)</h3>
          <div className="portal-ch">
            {sixMonthGrowth.map((v, i) => (
              <div key={i}>
                <i
                  style={
                    {
                      "--h": `${Math.round((v / memberCount) * 100)}%`,
                      animationDelay: `${i * 70}ms`,
                    } as React.CSSProperties
                  }
                  data-v={`${v} members`}
                />
                <span>M{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="portal-cd">
          <h3>Attendance by Sunday</h3>
          <div className="portal-ch">
            {sessions
              .slice(0, 6)
              .reverse()
              .map((s: any, i: number) => {
                const pct = memberCount
                  ? Math.round((s.p.length / memberCount) * 100)
                  : 0;
                return (
                  <div key={s.id || i}>
                    <i
                      style={
                        {
                          "--h": `${Math.max(pct, 5)}%`,
                          animationDelay: `${i * 70}ms`,
                        } as React.CSSProperties
                      }
                      data-v={`${pct}%`}
                    />
                    <span>{s.d.split(" ")[1] || s.d}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="portal-cd">
        <h3>Advanced ministry intelligence</h3>
        {plan?.id === "pro" ? (
          <p style={{ margin: 0, color: "var(--mu)" }}>
            Multi-branch retention metrics, first-timer guest conversion ratios, and departmental duty
            insights are continuously updated with live service activity.
          </p>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <p style={{ margin: 0, color: "var(--mu)" }}>
              Multi-branch comparisons and executive ministry health metrics are included in the Pro tier.
            </p>
            <Link href="/checkout?plan=pro" className="portal-btn sm" style={{ textDecoration: "none" }}>
              Unlock Pro Intelligence &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 9: STAFF & ROLES
   ===================================================================== */
function StaffView({ staff, plan, churchRole, onInviteStaff, onRoleChange, onRevokeAccess }: any) {
  if (churchRole === "Staff") {
    return (
      <div className="portal-cd portal-emp">
        <div className="portal-ico">
          <SvgIcon name="lock" />
        </div>
        <h3>Restricted Access</h3>
        <p>Only Church Administrators can manage pastoral staff and role permissions.</p>
      </div>
    );
  }

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Staff &amp; Roles</h1>
          <p>
            Manage access permissions for pastors, department leaders, and ushers · {plan?.admins === 1 ? "1 admin limit (Starter)" : `Up to ${plan?.admins} staff accounts`}
          </p>
        </div>
        <div className="portal-acts">
          <button onClick={onInviteStaff} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>Invite staff</span>
          </button>
        </div>
      </div>

      {plan?.id === "starter" && (
        <div
          style={{
            background: "rgba(109,42,60,0.05)",
            border: "1px solid var(--bd)",
            borderRadius: 12,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong style={{ color: "var(--bl)", display: "block" }}>
              Starter Plan: 1 Administrator Account Included
            </strong>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--mu)" }}>
              Multi-staff logins, departmental role permissions, and treasurer access are available on Growth (up to 10 staff) and Pro (up to 50 staff).
            </p>
          </div>
          <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none" }}>
            Upgrade to Growth &rarr;
          </Link>
        </div>
      )}

      <div className="portal-cd">
        <div className="portal-tw">
          <table>
            <thead>
              <tr>
                <th>Person</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((s: any, idx: number) => (
                <tr key={idx}>
                  <td>
                    <div className="portal-nm">
                      <span className="portal-a">{getInitials(s.n)}</span>
                      <div>
                        <strong>{s.n}</strong>
                        <small>{s.e}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      value={s.r}
                      disabled={idx === 0}
                      onChange={(e) => onRoleChange(idx, e.target.value)}
                    >
                      {STAFF_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span
                      className={`portal-pill ${
                        s.s === "Active" ? "ok" : "go"
                      }`}
                    >
                      {s.s}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {idx === 0 ? (
                      <small style={{ color: "var(--mu)" }}>Primary Admin</small>
                    ) : (
                      <button
                        onClick={() => onRevokeAccess(idx)}
                        className="portal-btn sm"
                      >
                        Revoke access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 10: NOTIFICATIONS & ALERTS
   ===================================================================== */
function NotificationsView({
  notifications,
  notifPrefs,
  onMarkAllRead,
  onTogglePref,
}: any) {
  const PREF_LABELS: Record<string, string> = {
    fu: "Follow-up reminders for first-timers",
    ev: "Event & prayer schedule reminders",
    vi: "New visitor registration alerts",
  };

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Notifications</h1>
          <p>Real-time alerts, follow-up reminders, and pastoral duty updates</p>
        </div>
        <div className="portal-acts">
          <button onClick={onMarkAllRead} className="portal-btn">
            Mark all read
          </button>
        </div>
      </div>

      <div className="portal-cd">
        {notifications.length ? (
          notifications.map((n: any) => (
            <div key={n.id} className="portal-li">
              <span
                className="portal-a"
                style={{ opacity: n.u ? 1 : 0.45 }}
              >
                <SvgIcon name="bell" />
              </span>
              <p>
                {n.u ? <strong>{n.t}</strong> : n.t}
                <br />
                <small>{n.w}</small>
              </p>
            </div>
          ))
        ) : (
          <div className="portal-emp">
            <div className="portal-ico">
              <SvgIcon name="bell" />
            </div>
            <h3>You’re all caught up</h3>
            <p>No new notifications at this time.</p>
          </div>
        )}
      </div>

      <div className="portal-cd">
        <h3>Notification preferences</h3>
        {Object.keys(PREF_LABELS).map((k) => (
          <div key={k} className="portal-li">
            <p>{PREF_LABELS[k]}</p>
            <button
              type="button"
              className={`portal-sw ${(notifPrefs as any)[k] ? "on" : ""}`}
              onClick={() => onTogglePref(k)}
              aria-label={PREF_LABELS[k]}
            />
          </div>
        ))}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 11: SETTINGS, PLANS & PROFILE
   ===================================================================== */
function SettingsView({
  church,
  plan,
  activity,
  onSaveProfile,
  onSelectPlan,
  onExportData,
}: any) {
  const [profileData, setProfileData] = useState({
    churchName: church.n,
    contactEmail: "pastor@gracechapel.org",
    address: "",
    phone: "",
    denomination: "Pentecostal",
    branchesCount: 1,
    timezone: "West Africa Time (WAT)",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reddox_church_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfileData((prev) => ({
            ...prev,
            churchName: parsed.churchName || church.n,
            contactEmail: parsed.contactEmail || "pastor@gracechapel.org",
            address: parsed.address || "",
            phone: parsed.phone || "",
            denomination: parsed.denomination || "Pentecostal",
            branchesCount: parsed.branchesCount || 1,
          }));
        } catch (e) {}
      }
    }
  }, [church.n]);

  const COMPARISON_ROWS: Array<[string, (p: any) => string]> = [
    ["Member Capacity", (p: any) => p.mem.toLocaleString("en-NG") + " members"],
    ["Administrator Accounts", (p: any) => p.admins === 1 ? "1 Admin" : `Up to ${p.admins} staff`],
    ["Monthly Events", (p: any) => p.eventsPerMonth === 1 ? "1 event / month" : "Unlimited events"],
    ["QR Attendance", (p: any) => (p.qr ? "Yes (Kiosk & mobile)" : "No (Manual only)")],
    ["Financial Management (Tithes & Expenses)", (p: any) => (p.fin ? "Included (Full ledger)" : "Locked")],
    ["Sermon & Media Library", (p: any) => (p.med ? "Included (Audio/Video/Notes)" : "Locked")],
    ["Data Exports (CSV / PDF)", (p: any) => (p.exports ? "Included" : "Locked")],
    ["Branches Allowed", (p: any) => p.br],
    ["Analytics Depth", (p: any) => p.an],
  ];

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Settings</h1>
          <p>Church configuration, subscription tiers, and audit history</p>
        </div>
      </div>

      {/* Church Profile Card */}
      <div className="portal-cd">
        <h3>Church profile</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveProfile(profileData);
          }}
        >
          <div className="portal-fi">
            <label>Church Name</label>
            <input
              value={profileData.churchName}
              onChange={(e) =>
                setProfileData({ ...profileData, churchName: e.target.value })
              }
              required
            />
          </div>
          <div className="portal-fi">
            <label>Contact Email</label>
            <input
              type="email"
              value={profileData.contactEmail}
              onChange={(e) =>
                setProfileData({ ...profileData, contactEmail: e.target.value })
              }
            />
          </div>
          <div className="portal-fi">
            <label>Church Address / Location</label>
            <input
              value={profileData.address}
              placeholder="Street, area or landmark"
              onChange={(e) =>
                setProfileData({ ...profileData, address: e.target.value })
              }
            />
          </div>
          <div className="portal-fi">
            <label>Church Phone Number</label>
            <input
              type="tel"
              value={profileData.phone}
              placeholder="0801 234 5678"
              onChange={(e) =>
                setProfileData({ ...profileData, phone: e.target.value })
              }
            />
          </div>
          <div className="portal-fi">
            <label>Denomination</label>
            <select
              value={profileData.denomination}
              onChange={(e) =>
                setProfileData({ ...profileData, denomination: e.target.value })
              }
            >
              {[
                "Pentecostal",
                "Baptist",
                "Anglican",
                "Catholic",
                "Methodist",
                "Presbyterian",
                "Orthodox",
                "Non-denominational",
                "Other",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="portal-fi">
            <label>Active Branches</label>
            <input
              type="number"
              min="1"
              max="50"
              value={profileData.branchesCount}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  branchesCount: parseInt(e.target.value, 10) || 1,
                })
              }
            />
          </div>
          <div className="portal-fi">
            <label>Timezone</label>
            <select
              value={profileData.timezone}
              onChange={(e) =>
                setProfileData({ ...profileData, timezone: e.target.value })
              }
            >
              <option>West Africa Time (WAT)</option>
              <option>Greenwich Mean Time (GMT)</option>
              <option>East Africa Time (EAT)</option>
            </select>
          </div>
          <button type="submit" className="portal-btn p">
            Save profile
          </button>
        </form>
      </div>

      {/* Plans & Billing Comparison */}
      <div className="portal-cd">
        <h3>Plan &amp; subscription tiers</h3>
        <div className="portal-nt">
          Switching tiers here demonstrates the immediate feature unlocks. If a plan
          ever changes, your records remain safely accessible.
        </div>
        <div className="portal-tw">
          <table className="portal-cmp">
            <thead>
              <tr>
                <th />
                {(["starter", "growth", "pro"] as const).map((k) => (
                  <th key={k} className={plan === k ? "cur" : ""}>
                    {PLANS[k].n}
                    <br />
                    <small style={{ textTransform: "none", letterSpacing: 0 }}>
                      {PLANS[k].pr}
                    </small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((r, i) => (
                <tr key={i}>
                  <td>
                    <strong>{r[0]}</strong>
                  </td>
                  {(["starter", "growth", "pro"] as const).map((k) => (
                    <td key={k} className={plan === k ? "cur" : ""}>
                      {r[1](PLANS[k])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="portal-acts" style={{ marginTop: 14, flexWrap: "wrap", gap: 10 }}>
          {(["starter", "growth", "pro"] as const).map((k) => (
            <button
              key={k}
              className={`portal-btn ${plan === k ? "p" : ""}`}
              onClick={() => onSelectPlan(k)}
            >
              {plan === k ? "✓ Active: " : "Switch (Demo): "}
              {PLANS[k].n}
            </button>
          ))}
          {plan !== "pro" && (
            <Link
              href={plan === "starter" ? "/checkout?plan=growth" : "/checkout?plan=pro"}
              className="portal-btn p"
              style={{ textDecoration: "none" }}
            >
              {plan === "starter" ? "Go to Checkout: Upgrade to Growth →" : "Go to Checkout: Upgrade to Pro →"}
            </Link>
          )}
        </div>
      </div>

      {/* Audit History Card */}
      <div className="portal-cd">
        <h3>Audit history &amp; data backup</h3>
        {activity.slice(0, 4).map((a: any, idx: number) => (
          <div key={idx} className="portal-li">
            <span className="portal-a">{a.i}</span>
            <p>{a.t}</p>
            <small>{a.w}</small>
          </div>
        ))}
        <div className="portal-acts" style={{ marginTop: 12 }}>
          <button onClick={onExportData} className="portal-btn">
            Export all data (JSON / CSV)
          </button>
        </div>
      </div>
    </>
  );
}

/* =====================================================================
   MODAL 1: ADD MEMBER (MANUAL OR PDF / IMAGE ROSTER UPLOAD)
   ===================================================================== */
function AddMemberModal({ plan, currentCount, onClose, onSave, onUpgrade }: any) {
  const [tab, setTab] = useState<"manual" | "upload">("manual");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manual Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("Choir");
  const [error, setError] = useState("");

  // Upload Roster State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedMembers, setExtractedMembers] = useState<any[]>([]);
  const [uploadError, setUploadError] = useState("");

  const isLimitReached = currentCount >= plan.mem;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter the member's full name.");
      return;
    }
    if (currentCount >= plan.mem) {
      setError(`You have reached the ${plan.mem}-member limit on ${plan.n} plan.`);
      return;
    }
    onSave({ n: name.trim(), e: email.trim() || "—", ph: phone.trim() || "—", d: dept });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);
    setUploadError("");

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".csv") || fileName.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = (event.target?.result as string) || "";
          const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
          const parsed = lines
            .slice(0, 20)
            .map((line, idx) => {
              const parts = line.split(/[,;\t]/);
              return {
                n: parts[0]?.trim() || `Member ${idx + 1}`,
                e: parts[1]?.includes("@") ? parts[1].trim() : "—",
                ph: parts[2]?.trim() || "080" + Math.floor(10000000 + Math.random() * 90000000),
                d: DEPARTMENTS[idx % DEPARTMENTS.length],
              };
            })
            .filter((m) => m.n && m.n.toLowerCase() !== "name");

          setExtractedMembers(
            parsed.length
              ? parsed
              : [
                  { n: "Pastor David Adeleke", e: "david@mail.com", ph: "0802 345 6789", d: "Sanctuary / General" },
                  { n: "Sister Kelechi Okon", e: "kelechi@mail.com", ph: "0803 456 7890", d: "Choir" },
                ]
          );
        } catch (err) {
          setUploadError("Could not parse file. Using standard roster sample.");
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsText(file);
    } else {
      // PDF or Image: simulate document roster extraction
      setTimeout(() => {
        const sampleExtracted = [
          { n: "Pastor David Adeleke", e: "david.adeleke@church.org", ph: "0802 345 6789", d: "Sanctuary / General" },
          { n: "Sister Kelechi Okon", e: "kelechi.o@mail.com", ph: "0803 456 7890", d: "Choir" },
          { n: "Brother Femi Alabi", e: "femi.alabi@yahoo.com", ph: "0805 678 9012", d: "Ushering" },
          { n: "Deaconess Mary Johnson", e: "mary.j@church.org", ph: "0807 890 1234", d: "Prayer" },
        ];
        setExtractedMembers(sampleExtracted);
        setIsProcessing(false);
      }, 750);
    }
  };

  const handleRemoveExtracted = (idx: number) => {
    setExtractedMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImportExtracted = () => {
    if (!extractedMembers.length) {
      setUploadError("No members found to import. Please upload a PDF or image.");
      return;
    }
    const availableQuota = plan.mem - currentCount;
    if (availableQuota <= 0) {
      setUploadError(`Member limit reached (${plan.mem}/${plan.mem}). Please upgrade to import more.`);
      return;
    }

    if (extractedMembers.length > availableQuota) {
      const allowed = extractedMembers.slice(0, availableQuota);
      onSave(allowed);
      return;
    }

    onSave(extractedMembers);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <div
        className="portal-md"
        style={{ maxWidth: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add church members</h2>

        {isLimitReached ? (
          <div className="portal-nt">
            <strong>
              You have reached the {plan.mem}-member limit on the {plan.n} plan.
            </strong>
            <p style={{ margin: "6px 0 10px" }}>
              Upgrade to the Growth or Pro plan to import and manage up to 1,000+ members.
            </p>
            <button type="button" onClick={onUpgrade} className="portal-btn p sm">
              Upgrade plan &rarr;
            </button>
          </div>
        ) : (
          <>
            {/* Mode Tabs */}
            <div className="portal-tabs-toggle">
              <button
                type="button"
                className={`portal-tab-btn ${tab === "manual" ? "active" : ""}`}
                onClick={() => setTab("manual")}
              >
                <SvgIcon name="users" />
                <span>Add manually</span>
              </button>
              <button
                type="button"
                className={`portal-tab-btn ${tab === "upload" ? "active" : ""}`}
                onClick={() => setTab("upload")}
              >
                <SvgIcon name="file" />
                <span>Upload PDF / Image</span>
              </button>
            </div>

            {/* TAB 1: MANUAL ENTRY */}
            {tab === "manual" && (
              <form onSubmit={handleManualSubmit} noValidate>
                <div className={`portal-fi ${error ? "bad" : ""}`}>
                  <label>Full Name *</label>
                  <input
                    placeholder="e.g. Grace Okafor"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    required
                  />
                  <div className="er">{error}</div>
                </div>

                <div className="portal-fi">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="grace@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="portal-fi">
                  <label>Phone Number</label>
                  <input
                    placeholder="0801 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="portal-fi">
                  <label>Ministry Department</label>
                  <select value={dept} onChange={(e) => setDept(e.target.value)}>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="portal-mf">
                  <button type="button" onClick={onClose} className="portal-btn">
                    Cancel
                  </button>
                  <button type="submit" className="portal-btn p">
                    Add member
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: PDF / IMAGE UPLOAD */}
            {tab === "upload" && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,image/*,.csv,.txt"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />

                {!uploadedFile ? (
                  <div
                    className="portal-dropzone"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="portal-dropzone-icon">
                      <SvgIcon name="upload" />
                    </div>
                    <h4>Upload Member List (PDF or Image)</h4>
                    <p>Click or drag a PDF roster or photo of your member register</p>
                    <div className="portal-file-badge">
                      <SvgIcon name="file" />
                      <span>PDF (Recommended)</span>
                      <span className="portal-dot-sep">·</span>
                      <SvgIcon name="image" />
                      <span>Photo / Image</span>
                      <span className="portal-dot-sep">·</span>
                      <span>CSV</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Uploaded File Info Card */}
                    <div className="portal-file-card">
                      <div className="portal-file-info">
                        <SvgIcon name="file" />
                        <div>
                          <div className="portal-file-name">{uploadedFile.name}</div>
                          <div className="portal-file-size">
                            {formatFileSize(uploadedFile.size)} · {isProcessing ? "Analyzing roster..." : "Ready to import"}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFile(null);
                          setExtractedMembers([]);
                        }}
                        className="portal-srch-clear"
                        style={{ position: "static", transform: "none" }}
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>

                    {isProcessing ? (
                      <div style={{ textAlign: "center", padding: "20px 0", color: "var(--mu)" }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>Extracting member roster from PDF…</div>
                        <small style={{ opacity: 0.8 }}>Reading names, phone numbers, and departments</small>
                      </div>
                    ) : extractedMembers.length > 0 ? (
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <strong style={{ fontSize: 13, color: "var(--tx)" }}>
                            Detected Members ({extractedMembers.length})
                          </strong>
                          <small style={{ color: "var(--mu)" }}>
                            {Math.max(0, plan.mem - currentCount)} spots remaining
                          </small>
                        </div>

                        <div className="portal-extracted-preview">
                          {extractedMembers.map((m, idx) => (
                            <div key={idx} className="portal-extracted-row">
                              <div>
                                <span className="portal-extracted-name">{m.n}</span>
                                <span className="portal-extracted-sub">
                                  {m.d} · {m.ph}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveExtracted(idx)}
                                style={{
                                  border: 0,
                                  background: "none",
                                  color: "var(--mu)",
                                  cursor: "pointer",
                                  fontSize: 14,
                                }}
                                title="Remove from import"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {uploadError && (
                      <div style={{ color: "var(--er)", fontSize: 12.5, marginBottom: 12, fontWeight: 600 }}>
                        {uploadError}
                      </div>
                    )}
                  </div>
                )}

                <div className="portal-mf">
                  <button type="button" onClick={onClose} className="portal-btn">
                    Cancel
                  </button>
                  {uploadedFile && extractedMembers.length > 0 && (
                    <button
                      type="button"
                      onClick={handleImportExtracted}
                      disabled={isProcessing}
                      className="portal-btn p"
                    >
                      Import {extractedMembers.length} to Dashboard &rarr;
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   MODAL 2: EDIT MEMBER DETAILS
   ===================================================================== */
function EditMemberModal({ member, onClose, onSave }: any) {
  const [name, setName] = useState(member.n);
  const [email, setEmail] = useState(member.e);
  const [phone, setPhone] = useState(member.ph);
  const [dept, setDept] = useState(member.d);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    onSave({ id: member.id, n: name.trim(), e, ph: phone, d: dept });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Member details</h2>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="portal-fi">
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="portal-fi">
          <label>Department</label>
          <select value={dept} onChange={(e) => setDept(e.target.value)}>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <small style={{ color: "var(--mu)", display: "block", marginBottom: 12 }}>
          Member since {member.j}
        </small>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 3: RECORD GIVING
   ===================================================================== */
function RecordGivingModal({ members, onClose, onSave }: any) {
  const [memberId, setMemberId] = useState(members[0]?.id || 1);
  const [type, setType] = useState("Tithe");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(amount);
    if (!(a > 0)) {
      setError("Please enter a valid donation amount above zero.");
      return;
    }
    onSave({ m: Number(memberId), t: type, a });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Record giving &amp; tithe</h2>

        <div className="portal-fi">
          <label>Member Donor</label>
          <select
            value={memberId}
            onChange={(e) => setMemberId(Number(e.target.value))}
          >
            {members.map((m: any) => (
              <option key={m.id} value={m.id}>
                {m.n} ({m.d})
              </option>
            ))}
          </select>
        </div>

        <div className="portal-fi">
          <label>Category</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {GIVING_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Amount (₦)</label>
          <input
            type="number"
            placeholder="15000"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Record giving
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 4: ADD EXPENSE
   ===================================================================== */
function AddExpenseModal({ onClose, onSave }: any) {
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Equipment");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(amount);
    if (!desc.trim()) {
      setError("Please describe the expense item.");
      return;
    }
    if (!(a > 0)) {
      setError("Please enter a valid amount.");
      return;
    }
    onSave({ t: desc.trim(), c: category, a });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Record ministry expense</h2>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Description</label>
          <input
            placeholder="e.g. Generator diesel fuel"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="portal-fi">
          <label>Amount (₦)</label>
          <input
            type="number"
            placeholder="25000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Add expense
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 5: CREATE EVENT
   ===================================================================== */
function CreateEventModal({ plan, currentCount = 0, onClose, onSave, onUpgrade }: any) {
  const [title, setTitle] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("6:00 PM");
  const [error, setError] = useState("");

  const isStarterAtLimit = plan?.eventsPerMonth === 1 && currentCount >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please give the event a title.");
      return;
    }
    const d = dateStr ? new Date(dateStr + "T12:00:00") : new Date();
    onSave({
      t: title.trim(),
      d: ("0" + d.getDate()).slice(-2),
      mo: d.toLocaleString("en", { month: "short" }).toUpperCase(),
      tm: timeStr || "TBA",
      r: 0,
    });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Create church event</h2>

        {isStarterAtLimit && (
          <div className="portal-nt" style={{ background: "rgba(184, 134, 45, 0.12)", border: "1px solid var(--bd)" }}>
            <strong>Starter Plan Quota (1 Event/Month)</strong>
            <p style={{ margin: "4px 0 8px", fontSize: 12.5, color: "var(--mu)" }}>
              Starter includes 1 monthly calendar event. Upgrade to Growth to publish unlimited events, ticket registrations, and send automated reminders.
            </p>
            {onUpgrade && (
              <button type="button" onClick={onUpgrade} className="portal-btn sm p">
                Upgrade to Growth &rarr;
              </button>
            )}
          </div>
        )}

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Event Title</label>
          <input
            placeholder="e.g. Night of Praise & Worship"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Event Date</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
          />
        </div>

        <div className="portal-fi">
          <label>Start Time</label>
          <input
            placeholder="6:00 PM"
            value={timeStr}
            onChange={(e) => setTimeStr(e.target.value)}
          />
        </div>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Create event
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 6: NEW ATTENDANCE SESSION
   ===================================================================== */
function NewSessionModal({ onClose, onSave }: any) {
  const [name, setName] = useState("Sunday Service");
  const [dateStr, setDateStr] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please name the attendance session.");
      return;
    }
    const d = dateStr
      ? new Date(dateStr + "T12:00:00").toLocaleString("en", {
          month: "short",
          day: "numeric",
        })
      : "Today";
    onSave({ n: name.trim(), d });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>New attendance session</h2>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Session Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Date</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
          />
        </div>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Create session
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 7: RECORD VISITOR
   ===================================================================== */
function RecordVisitorModal({ staff, onClose, onSave }: any) {
  const [name, setName] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [worker, setWorker] = useState(staff[0]?.n || "Pastor Adewale");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter the visitor's name.");
      return;
    }
    const d = dateStr
      ? new Date(dateStr + "T12:00:00").toLocaleString("en", {
          month: "short",
          day: "numeric",
        })
      : "Today";
    onSave({ n: name.trim(), d, w: worker, s: "New", nt: notes.trim() });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Record first-time guest</h2>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Visitor's Full Name</label>
          <input
            placeholder="e.g. Sister Bola Ade"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Visit Date</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
          />
        </div>

        <div className="portal-fi">
          <label>Assigned Follow-Up Worker</label>
          <select value={worker} onChange={(e) => setWorker(e.target.value)}>
            {staff.map((s: any) => (
              <option key={s.n} value={s.n}>
                {s.n} ({s.r})
              </option>
            ))}
          </select>
        </div>

        <div className="portal-fi">
          <label>Pastoral Notes (Optional)</label>
          <textarea
            placeholder="e.g. Relocated to town, interested in choir"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Save visitor
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 8: ADD SERMON
   ===================================================================== */
function AddSermonModal({ onClose, onSave }: any) {
  const [title, setTitle] = useState("");
  const [speaker, setSpeaker] = useState("Pastor Adewale");
  const [link, setLink] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter the sermon title.");
      return;
    }
    onSave({
      t: title.trim(),
      sp: speaker.trim() || "Pastor",
      d: "Today",
      l: link.trim(),
      v: visibility,
    });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Add message / sermon</h2>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Sermon Title</label>
          <input
            placeholder="e.g. Walking in Supernatural Grace"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Preacher / Speaker</label>
          <input
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
          />
        </div>

        <div className="portal-fi">
          <label>Recording Link (YouTube, Vimeo, Drive, Audio)</label>
          <input
            type="url"
            placeholder="https://..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="portal-fi">
          <label>Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option>Public</option>
            <option>Members</option>
            <option>Hidden</option>
          </select>
        </div>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Add sermon
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL 9: INVITE STAFF
   ===================================================================== */
function InviteStaffModal({ plan, currentCount = 0, onClose, onSave, onUpgrade }: any) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Leader");
  const [error, setError] = useState("");

  const isStarterAtLimit = plan?.admins === 1 && currentCount >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid staff email address.");
      return;
    }
    const name = email.split("@")[0];
    onSave({ n: name, e: email.trim(), r: role });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2>Invite pastoral staff</h2>

        {isStarterAtLimit && (
          <div className="portal-nt" style={{ background: "rgba(184, 134, 45, 0.12)", border: "1px solid var(--bd)" }}>
            <strong>Starter Plan Limit (1 Administrator)</strong>
            <p style={{ margin: "4px 0 8px", fontSize: 12.5, color: "var(--mu)" }}>
              Starter includes 1 admin login. Upgrade to Growth (10 staff logins) or Pro (50 staff logins) to invite pastoral team members and departmental leaders.
            </p>
            {onUpgrade && (
              <button type="button" onClick={onUpgrade} className="portal-btn sm p">
                Upgrade to Growth &rarr;
              </button>
            )}
          </div>
        )}

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="leader@yourchurch.org"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {STAFF_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <small style={{ color: "var(--mu)", display: "block", marginBottom: 14 }}>
          Invited workers will receive access credentials for their respective role.
        </small>

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Send invite
          </button>
        </div>
      </form>
    </div>
  );
}
