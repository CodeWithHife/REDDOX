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
    case "copy":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      );
    case "church":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v5M9.5 4.5h5" />
          <path d="M5 22V12l7-5 7 5v10z" />
          <path d="M10 22v-5a2 2 0 0 1 4 0v5" />
        </svg>
      );
    case "pin":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "db":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    case "call":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "globe":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "cam":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "user":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
    case "eye":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "eyeoff":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3l18 18" />
          <path d="M10.6 6.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1" />
        </svg>
      );
    case "trash":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 11v6M14 11v6" />
        </svg>
      );
    case "dl":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
        </svg>
      );
    case "pc":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "ph":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "key":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="15" r="4" />
          <path d="m11 12 9-9M16 7l3 3" />
        </svg>
      );
    case "zap":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "msg":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "qr":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01" />
        </svg>
      );
    case "x":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
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
const STAFF_ROLES = [
  "Administrator",
  "Resident Pastor",
  "Associate Pastor",
  "Youth Pastor",
  "Leader",
  "Treasurer",
  "Usher",
  "Head Usher",
  "Choir Director",
  "Media & Sound Director",
  "Sunday School Teacher",
  "Welfare Coordinator",
  "Custom Role",
];

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

function formatFileSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
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
    {
      id: 1,
      category: "Sunday Celebration Service",
      n: "Sunday Celebration Service (1st Service)",
      d: "Oct 25",
      time: "09:00 AM",
      preacher: "Pastor Tosin Adewale",
      notes: "Theme: Divine Supernatural Enlargement",
      p: [1, 2, 4, 5, 7, 8, 10, 11],
      qrScans: [
        { id: "qr-1", memberId: 1, name: "Adaeze Okoye", time: "08:45 AM", device: "Mobile QR Scan" },
        { id: "qr-2", memberId: 4, name: "Samuel Adeyemi", time: "08:52 AM", device: "Entrance Kiosk" },
        { id: "qr-3", memberId: 10, name: "Chidi Obi", time: "09:02 AM", device: "Mobile QR Scan" },
      ],
      visitors: [
        { id: 101, n: "Kemi Ajayi", ph: "0803 111 2233", em: "kemi@mail.com", g: "Female", w: "Tunde Bakare", dept: "Choir", nt: "Invited by colleague, interested in music ministry", tm: "08:55 AM", s: "New" },
        { id: 102, n: "Obinna Eze", ph: "0805 444 7788", em: "obinna@mail.com", g: "Male", w: "Ruth Lawal", dept: "Youth", nt: "New resident in Abeokuta, seeking church home", tm: "09:10 AM", s: "Follow-up due" },
      ],
    },
    {
      id: 2,
      category: "Sunday Celebration Service",
      n: "Sunday Celebration Service",
      d: "Oct 18",
      time: "09:00 AM",
      preacher: "Pastor Tosin Adewale",
      notes: "Thanksgiving & Anointing Service",
      p: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11],
      qrScans: [
        { id: "qr-4", memberId: 2, name: "Tunde Bakare", time: "08:50 AM", device: "Mobile QR Scan" },
        { id: "qr-5", memberId: 5, name: "Ruth Lawal", time: "08:55 AM", device: "Entrance Kiosk" },
      ],
      visitors: [
        { id: 103, n: "Halima Yusuf", ph: "0802 888 9900", em: "halima@mail.com", g: "Female", w: "Tunde Bakare", dept: "Media", nt: "Wants prayer for career direction", tm: "09:05 AM", s: "Contacted" },
      ],
    },
    {
      id: 3,
      category: "Midweek Bible Study",
      n: "Midweek Digging Deep",
      d: "Oct 14",
      time: "05:30 PM",
      preacher: "Pastor Adewale",
      notes: "Book of Ephesians Chapter 3 Expository",
      p: [1, 2, 4, 5, 8, 10, 11],
      qrScans: [
        { id: "qr-6", memberId: 1, name: "Adaeze Okoye", time: "05:15 PM", device: "Mobile QR Scan" },
      ],
      visitors: [],
    },
    {
      id: 4,
      category: "Youth Fellowship",
      n: "Youth Fire & Destiny Ignite",
      d: "Oct 10",
      time: "04:00 PM",
      preacher: "Bro Samuel Adeyemi",
      notes: "Youth Career and Destiny Alignment",
      p: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12],
      qrScans: [
        { id: "qr-7", memberId: 4, name: "Samuel Adeyemi", time: "04:05 PM", device: "Mobile QR Scan" },
        { id: "qr-8", memberId: 11, name: "Bisi Ade", time: "04:10 PM", device: "Mobile QR Scan" },
      ],
      visitors: [
        { id: 104, n: "Peter Danjuma", ph: "0807 222 3344", em: "peter@mail.com", g: "Male", w: "Ruth Lawal", dept: "Youth", nt: "University student from FUNAAB", tm: "04:15 PM", s: "Became member" },
      ],
    },
    {
      id: 5,
      category: "Faith Clinic & Prayer",
      n: "Midweek Faith Clinic & Deliverance",
      d: "Sep 27",
      time: "05:30 PM",
      preacher: "Pastor Adewale",
      notes: "Healing and Deliverance Night",
      p: [1, 4, 5, 7, 8, 10],
      qrScans: [],
      visitors: [],
    },
    {
      id: 6,
      category: "Workers & Leaders Meeting",
      n: "Monthly Workers & Ministers Meeting",
      d: "Sep 20",
      time: "07:30 AM",
      preacher: "Pastor Adewale",
      notes: "Spiritual Preparedness and Ministry Excellence",
      p: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12],
      qrScans: [
        { id: "qr-9", memberId: 2, name: "Tunde Bakare", time: "07:30 AM", device: "Mobile QR Scan" },
      ],
      visitors: [],
    },
  ]);
  const [currentSessionId, setCurrentSessionId] = useState(1);

  const [events, setEvents] = useState([
    {
      id: 1,
      t: "Thanksgiving & Anointing Celebration",
      category: "Worship Service",
      d: "08",
      mo: "NOV",
      yr: "2026",
      fullDate: "Sunday, Nov 08, 2026",
      tm: "09:00 AM - 12:30 PM",
      venue: "Main Sanctuary & Auditorium",
      preacher: "Pastor Tosin Adewale",
      theme: "Entering His Gates with Praise & Power",
      status: "Upcoming",
      r: 42,
      capacity: 350,
      attendees: [
        { name: "Adaeze Okoye", role: "Choir", time: "Nov 05" },
        { name: "Tunde Bakare", role: "Leader", time: "Nov 05" },
        { name: "Samuel Adeyemi", role: "Youth", time: "Nov 06" },
        { name: "Ruth Lawal", role: "Treasurer", time: "Nov 06" },
      ],
    },
    {
      id: 2,
      t: "Midweek Digging Deep & Bible Exposition",
      category: "Bible Study",
      d: "11",
      mo: "NOV",
      yr: "2026",
      fullDate: "Wednesday, Nov 11, 2026",
      tm: "05:30 PM - 07:15 PM",
      venue: "Main Hall & YouTube Live",
      preacher: "Pastor Adewale",
      theme: "Ephesians Chapter 4 - Walking in Your Calling",
      status: "Upcoming",
      r: 28,
      capacity: 200,
      attendees: [
        { name: "Chidi Obi", role: "Member", time: "Nov 06" },
        { name: "Bisi Ade", role: "Usher", time: "Nov 06" },
      ],
    },
    {
      id: 3,
      t: "Youth Fire & Career Alignment Summit",
      category: "Youth & Singles",
      d: "13",
      mo: "NOV",
      yr: "2026",
      fullDate: "Friday, Nov 13, 2026",
      tm: "04:30 PM - 07:00 PM",
      venue: "Youth Innovation Center",
      preacher: "Bro Samuel Adeyemi",
      theme: "Positioned for Marketplace Excellence",
      status: "Upcoming",
      r: 35,
      capacity: 150,
      attendees: [
        { name: "Samuel Adeyemi", role: "Leader", time: "Nov 04" },
        { name: "Peter Danjuma", role: "Student", time: "Nov 05" },
      ],
    },
    {
      id: 4,
      t: "Faith Clinic & Healing Deliverance",
      category: "Prayer & Vigil",
      d: "17",
      mo: "NOV",
      yr: "2026",
      fullDate: "Tuesday, Nov 17, 2026",
      tm: "05:30 PM - 07:30 PM",
      venue: "Main Sanctuary",
      preacher: "Pastor Adewale",
      theme: "By His Stripes We Are Healed",
      status: "Upcoming",
      r: 19,
      capacity: 250,
      attendees: [],
    },
    {
      id: 5,
      t: "All-Night Workers & Ministers Vigil",
      category: "Prayer & Vigil",
      d: "20",
      mo: "NOV",
      yr: "2026",
      fullDate: "Friday, Nov 20, 2026",
      tm: "11:00 PM - 04:30 AM",
      venue: "Main Sanctuary",
      preacher: "Pastor Tosin Adewale",
      theme: "Fresh Fire & Spiritual Stamina for 2027",
      status: "Upcoming",
      r: 48,
      capacity: 300,
      attendees: [],
    },
    {
      id: 6,
      t: "Community Medical Fair & Welfare Outreach",
      category: "Outreach & Community",
      d: "28",
      mo: "NOV",
      yr: "2026",
      fullDate: "Saturday, Nov 28, 2026",
      tm: "08:00 AM - 02:00 PM",
      venue: "Community Outreach Ground",
      preacher: "Missions & Welfare Board",
      theme: "Hands and Feet of Christ in Abeokuta",
      status: "Upcoming",
      r: 65,
      capacity: 500,
      attendees: [],
    },
  ]);

  const [giving, setGiving] = useState([
    // November 2026 (Current Month)
    { id: 11, m: 1, t: "Tithe", a: 75000, w: "Nov 03", month: "Nov 2026", ref: "TX-948111", receiptName: "gtbank_transfer_nov03.png" },
    { id: 12, m: 4, t: "Offering", a: 34000, w: "Nov 05", month: "Nov 2026", ref: "TX-948112" },
    { id: 13, m: 7, t: "Building Fund", a: 50000, w: "Nov 06", month: "Nov 2026", ref: "TX-948113", receiptName: "zenith_cheque_nov.jpg" },
    // October 2026
    { id: 1, m: 1, t: "Tithe", a: 45000, w: "Oct 25", month: "Oct 2026", ref: "TX-948102", receiptName: "gtbank_transfer_oct25.png" },
    { id: 2, m: 2, t: "Offering", a: 8000, w: "Oct 25", month: "Oct 2026", ref: "TX-948103" },
    { id: 3, m: 4, t: "Building Fund", a: 60000, w: "Oct 25", month: "Oct 2026", ref: "TX-948104", receiptName: "zenith_cheque_slip.jpg" },
    { id: 4, m: 5, t: "Tithe", a: 30000, w: "Oct 21", month: "Oct 2026", ref: "TX-948105" },
    { id: 5, m: 7, t: "Missions", a: 15000, w: "Oct 25", month: "Oct 2026", ref: "TX-948106", receiptName: "pos_receipt_missions.png" },
    { id: 6, m: 1, t: "Offering", a: 12000, w: "Oct 18", month: "Oct 2026", ref: "TX-948107" },
    { id: 7, m: 10, t: "Tithe", a: 52000, w: "Oct 18", month: "Oct 2026", ref: "TX-948108", receiptName: "access_wire_slip.pdf" },
    { id: 8, m: 8, t: "Building Fund", a: 25000, w: "Oct 21", month: "Oct 2026", ref: "TX-948109" },
    // September 2026
    { id: 9, m: 2, t: "Tithe", a: 38000, w: "Sep 28", month: "Sep 2026", ref: "TX-948091" },
    { id: 10, m: 5, t: "Offering", a: 14000, w: "Sep 21", month: "Sep 2026", ref: "TX-948092" },
  ]);

  const [expenses, setExpenses] = useState([
    // November 2026 (Current Month)
    { id: 201, t: "Generator diesel fuel", c: "Utilities", a: 32000, w: "Nov 02", month: "Nov 2026", ref: "EXP-201", receiptName: "total_diesel_receipt.pdf" },
    { id: 202, t: "Guest minister honorarium", c: "Honorarium", a: 40000, w: "Nov 05", month: "Nov 2026", ref: "EXP-202" },
    // October 2026
    { id: 101, t: "Sound equipment repair", c: "Equipment", a: 35000, w: "Oct 22", month: "Oct 2026", ref: "EXP-101", receiptName: "alaba_sound_invoice.pdf" },
    { id: 102, t: "Electricity bill (Eko Electric)", c: "Utilities", a: 48000, w: "Oct 15", month: "Oct 2026", ref: "EXP-102", receiptName: "ekedc_token_receipt.png" },
    { id: 103, t: "Children's class supplies", c: "Ministry", a: 12500, w: "Oct 12", month: "Oct 2026", ref: "EXP-103" },
    // September 2026
    { id: 301, t: "Altar floral decorations", c: "Maintenance", a: 18000, w: "Sep 15", month: "Sep 2026", ref: "EXP-301" },
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
                  <span className="portal-plan-sep">·</span>
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
                      {user?.name ? getInitials(user.name) : "SB"}
                    </span>
                    <span className="portal-av-online" />
                  </div>
                  <div className="portal-user-text">
                    <span className="portal-user-name">
                      {user?.name || "Sister Blessing Adeyemi"}
                    </span>
                    <span className="portal-user-badge">Administrator</span>
                  </div>
                  <SvgIcon name="chev" className="portal-user-chev" />
                </button>
                {activeDropdown === "user" && (
                  <div className="portal-dd">
                    <div className="portal-user-card">
                      <span className="portal-av lg">
                        {user?.name ? getInitials(user.name) : "SB"}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <strong>{user?.name || "Sister Blessing Adeyemi"}</strong>
                        <small>{user?.email || "blessing.adeyemi@gmail.com"}</small>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
                          <span className="portal-user-badge">Administrator</span>
                          <span style={{ fontSize: 11, color: "var(--mu)" }}>· {currentChurch.n}</span>
                        </div>
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
                  showToast("All members marked present for this session.");
                }}
                onClearAllPresent={() => {
                  setSessions((prev) =>
                    prev.map((s) =>
                      s.id === currentSessionId ? { ...s, p: [] } : s
                    )
                  );
                  showToast("Attendance reset for this session.");
                }}
                onAddQrScan={(scan: any) => {
                  setSessions((prev) =>
                    prev.map((s) => {
                      if (s.id !== currentSessionId) return s;
                      const existing = s.qrScans || [];
                      if (existing.some((q: any) => q.memberId === scan.memberId)) {
                        return s;
                      }
                      return {
                        ...s,
                        qrScans: [scan, ...existing],
                      };
                    })
                  );
                  showToast(`QR Check-in recorded for ${scan.name}`);
                }}
                onRemoveQrScan={(scanId: any) => {
                  setSessions((prev) =>
                    prev.map((s) => {
                      if (s.id !== currentSessionId) return s;
                      return {
                        ...s,
                        qrScans: (s.qrScans || []).filter((q: any) => q.id !== scanId),
                      };
                    })
                  );
                  showToast("QR scan entry removed.");
                }}
                onAddSessionVisitor={(vis: any) => {
                  setSessions((prev) =>
                    prev.map((s) => {
                      if (s.id !== currentSessionId) return s;
                      return {
                        ...s,
                        visitors: [vis, ...(s.visitors || [])],
                      };
                    })
                  );
                  setVisitors((prev) => [
                    {
                      id: vis.id,
                      n: vis.n,
                      d: vis.d || "Today",
                      w: vis.w || "Ushering Unit",
                      s: "New",
                      nt: vis.nt || `First-timer at ${vis.serviceCategory || "Service"}`,
                    },
                    ...prev,
                  ]);
                  showToast(`Visitor ${vis.n} recorded for this service.`);
                }}
                onRemoveSessionVisitor={(visitorId: any) => {
                  setSessions((prev) =>
                    prev.map((s) => {
                      if (s.id !== currentSessionId) return s;
                      return {
                        ...s,
                        visitors: (s.visitors || []).filter((v: any) => v.id !== visitorId),
                      };
                    })
                  );
                  showToast("Visitor record removed from session.");
                }}
                onNewSession={() => setActiveModal("newSession")}
                showToast={showToast}
              />
            )}

            {activeView === "events" && (
              <EventsView
                events={events}
                members={members}
                plan={currentPlan}
                onCreateEvent={() => {
                  if (currentPlan.eventsPerMonth === 1 && events.length >= 1) {
                    showToast("Starter plan allows 1 event per month. Upgrade to Growth for unlimited events.");
                  }
                  setActiveModal("createEvent");
                }}
                onRegister={(eventId: any, attendee?: any) => {
                  setEvents((prev) =>
                    prev.map((ev) =>
                      ev.id === eventId || ev.t === eventId
                        ? {
                          ...ev,
                          r: (ev.r || 0) + 1,
                          attendees: [
                            ...(ev.attendees || []),
                            attendee || {
                              name: "Congregation Member",
                              role: "Worshipper",
                              time: "Just now",
                            },
                          ],
                        }
                        : ev
                    )
                  );
                  showToast("RSVP registered successfully.");
                }}
                onRemoveEvent={(eventId: any) => {
                  setEvents((prev) => prev.filter((ev) => ev.id !== eventId && ev.t !== eventId));
                  showToast("Event deleted from calendar.");
                }}
                showToast={showToast}
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
                  showToast("Notification preference updated.");
                }}
                onToggleRead={(id: number) => {
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, u: !n.u } : n))
                  );
                }}
                onDismiss={(id: number) => {
                  setNotifications((prev) => prev.filter((n) => n.id !== id));
                  showToast("Notification dismissed.");
                }}
                onClearAll={() => {
                  setNotifications([]);
                  showToast("All notifications cleared.");
                }}
              />
            )}

            {activeView === "settings" && (
              <SettingsView
                church={currentChurch}
                plan={selectedPlan}
                activity={activity}
                memberCount={members.length}
                sessionsCount={sessions.length}
                eventsCount={events.length}
                showToast={showToast}
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
                    } catch (e) { }
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
              { id: Date.now(), ...gift, w: gift.w || "Nov 07", month: gift.month || "Nov 2026" },
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
            setExpenses([{ id: Date.now(), ...exp, w: exp.w || "Nov 07", month: exp.month || "Nov 2026" }, ...expenses]);
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
            setSessions([
              {
                id,
                category: sess.category || "Sunday Celebration Service",
                n: sess.n,
                d: sess.d,
                time: sess.time || "09:00 AM",
                preacher: sess.preacher || "Pastor in charge",
                notes: sess.notes || "",
                p: [],
                qrScans: [],
                visitors: [],
              },
              ...sessions,
            ]);
            setCurrentSessionId(id);
            showToast(`New ${sess.category || "service"} attendance session created.`);
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
                  className={`portal-pill ${v.s === "New"
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
   VIEW 3: ATTENDANCE TRACKER (SERVICE CATEGORIES, TRI-CHANNEL & AUTO-REPORTS)
   ===================================================================== */
const SERVICE_CATEGORIES = [
  "All Categories",
  "Sunday Celebration Service",
  "Midweek Bible Study",
  "Faith Clinic & Prayer",
  "Youth Fellowship",
  "Workers & Leaders Meeting",
  "Special Program & Vigil",
];

function AttendanceView({
  members,
  sessions,
  currentSessionId,
  plan,
  onSelectSession,
  onToggleAttendance,
  onMarkAllPresent,
  onClearAllPresent,
  onAddQrScan,
  onRemoveQrScan,
  onAddSessionVisitor,
  onRemoveSessionVisitor,
  onNewSession,
  showToast,
}: any) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState<"manual" | "qr" | "visitor" | "reports">("manual");
  const [memberSearch, setMemberSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [isKioskOpen, setIsKioskOpen] = useState(false);
  const [selectedScanMemberId, setSelectedScanMemberId] = useState<string>("");

  // Visitor Form State
  const [visName, setVisName] = useState("");
  const [visPhone, setVisPhone] = useState("");
  const [visEmail, setVisEmail] = useState("");
  const [visGender, setVisGender] = useState("Female");
  const [visInvitedBy, setVisInvitedBy] = useState("");
  const [visDept, setVisDept] = useState("Choir");
  const [visNotes, setVisNotes] = useState("");
  const [visError, setVisError] = useState("");

  // Filtered Sessions according to selected category
  const filteredSessions = useMemo(() => {
    if (selectedCategory === "All Categories") return sessions;
    return sessions.filter((s: any) => (s.category || "Sunday Celebration Service") === selectedCategory);
  }, [sessions, selectedCategory]);

  // Current session resolution
  const currentSession = useMemo(() => {
    const match = sessions.find((s: any) => s.id === currentSessionId);
    if (match) return match;
    return filteredSessions[0] || sessions[0];
  }, [sessions, currentSessionId, filteredSessions]);

  // Handle category chip change: also switch to a valid session in that category if needed
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All Categories") return;
    const sessionInCat = sessions.find((s: any) => (s.category || "Sunday Celebration Service") === cat);
    if (sessionInCat) {
      onSelectSession(sessionInCat.id);
    }
  };

  // Calculations for current session
  const manualList = useMemo(() => {
    return currentSession ? (currentSession.p || []) : [];
  }, [currentSession]);

  const qrList = useMemo(() => {
    return currentSession ? (currentSession.qrScans || []) : [];
  }, [currentSession]);

  const visitorList = useMemo(() => {
    return currentSession ? (currentSession.visitors || []) : [];
  }, [currentSession]);

  const manualCount = manualList.length;
  const qrCount = qrList.length;
  const visitorCount = visitorList.length;
  const totalAttendance = manualCount + qrCount + visitorCount;
  const totalMembers = members.length;
  const manualPct = totalMembers ? Math.round((manualCount / totalMembers) * 100) : 0;

  // Tri-channel share percentages
  const safeTotal = totalAttendance || 1;
  const manualShare = Math.round((manualCount / safeTotal) * 100);
  const qrShare = Math.round((qrCount / safeTotal) * 100);
  const visitorShare = Math.round((visitorCount / safeTotal) * 100);

  // Departments list
  const departments = useMemo(() => {
    const depts = new Set<string>();
    members.forEach((m: any) => {
      if (m.d) depts.add(m.d);
    });
    return ["All", ...Array.from(depts)];
  }, [members]);

  // Filtered members for manual attendance roster
  const filteredMembers = useMemo(() => {
    return members.filter((m: any) => {
      const matchSearch =
        m.n.toLowerCase().includes(memberSearch.toLowerCase()) ||
        (m.ph && m.ph.includes(memberSearch));
      const matchDept = deptFilter === "All" || m.d === deptFilter;
      return matchSearch && matchDept;
    });
  }, [members, memberSearch, deptFilter]);

  // Members eligible to scan (who haven't scanned in via QR yet)
  const unscannedMembers = useMemo(() => {
    const scannedIds = new Set(qrList.map((q: any) => q.memberId));
    return members.filter((m: any) => !scannedIds.has(m.id));
  }, [members, qrList]);

  // Quick Action: Simulate QR Check-in
  const handleSimulateQrScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScanMemberId) {
      showToast?.("Please select a member to simulate entrance QR scan.");
      return;
    }
    const mem = members.find((m: any) => m.id === Number(selectedScanMemberId));
    if (!mem) return;

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    onAddQrScan({
      id: `qr-${Date.now()}`,
      memberId: mem.id,
      name: mem.n,
      dept: mem.d,
      time: timeFormatted,
      device: "Entrance Kiosk Fast-Scan",
    });

    setSelectedScanMemberId("");
  };

  // Quick Action: Register Visitor
  const handleRegisterVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visName.trim()) {
      setVisError("Please enter the visitor's full name.");
      return;
    }
    if (!visPhone.trim()) {
      setVisError("Please enter a phone number for pastoral follow-up.");
      return;
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newVis = {
      id: Date.now(),
      n: visName.trim(),
      ph: visPhone.trim(),
      em: visEmail.trim(),
      g: visGender,
      w: visInvitedBy.trim() || "Ushering Unit",
      dept: visDept,
      nt: visNotes.trim() || `First time worshipper at ${currentSession?.category || "Service"}`,
      tm: timeFormatted,
      d: currentSession?.d || "Today",
      serviceCategory: currentSession?.category || "Sunday Celebration Service",
      s: "New",
    };

    onAddSessionVisitor(newVis);

    // Reset form
    setVisName("");
    setVisPhone("");
    setVisEmail("");
    setVisInvitedBy("");
    setVisNotes("");
    setVisError("");
  };

  // Quick Action: Send WhatsApp Welcome Message to Visitor
  const handleSendWelcome = (vis: any) => {
    const greeting = `Praise God ${vis.n}! Thank you for worshipping with us today at ${currentSession?.n || "RCCG Rehoboth Chapel"}. It was an honor having you! We pray God's supernatural blessings and open doors upon your life. We look forward to seeing you again. - RCCG Rehoboth Pastoral Care`;
    navigator.clipboard?.writeText(greeting);
    showToast?.(`Personalized welcome message for ${vis.n} copied to clipboard! Ready to paste into WhatsApp.`);
  };

  // Export Comprehensive CSV Service Attendance Report
  const handleExportCSV = () => {
    if (!currentSession) return;
    const headers = [
      "Service Category",
      "Session Title",
      "Date",
      "Minister",
      "Attendance Channel",
      "Attendee Name",
      "Department / Source",
      "Contact / Details",
      "Time / Status",
    ];

    const rows: string[][] = [];

    // 1. Manual Attendees
    members.forEach((m: any) => {
      if (currentSession.p?.includes(m.id)) {
        rows.push([
          currentSession.category || "General",
          currentSession.n,
          currentSession.d,
          currentSession.preacher || "Pastor in charge",
          "Manual Usher Roster",
          m.n,
          m.d,
          m.ph || "N/A",
          "Present",
        ]);
      }
    });

    // 2. QR Code Scans
    (currentSession.qrScans || []).forEach((q: any) => {
      rows.push([
        currentSession.category || "General",
        currentSession.n,
        currentSession.d,
        currentSession.preacher || "Pastor in charge",
        "Entrance QR Scan",
        q.name,
        q.dept || "Member",
        q.device || "Mobile QR",
        q.time || "Logged",
      ]);
    });

    // 3. Visitors
    (currentSession.visitors || []).forEach((v: any) => {
      rows.push([
        currentSession.category || "General",
        currentSession.n,
        currentSession.d,
        currentSession.preacher || "Pastor in charge",
        "First-Time Visitor",
        v.n,
        `Invited by: ${v.w || "Walk-in"}`,
        v.ph || "N/A",
        v.tm || "Welcomed",
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${(val || "").replace(/"/g, '""')}"`).join(","))].join(
        "\n"
      );
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `attendance_${(currentSession.n || "service").toLowerCase().replace(/[^a-z0-9]/g, "_")}_${(currentSession.d || "").toLowerCase().replace(/[^a-z0-9]/g, "_")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.("Service attendance report downloaded as CSV.");
  };

  // Copy Official Executive Summary for Pastor
  const handleCopyPastorBrief = () => {
    if (!currentSession) return;
    const brief = `*RCCG REHOBOTH CHAPEL - OFFICIAL SERVICE ATTENDANCE REPORT*
--------------------------------------------------
Service Category: ${currentSession.category || "Sunday Service"}
Service Name: ${currentSession.n}
Date: ${currentSession.d} (${currentSession.time || "09:00 AM"})
Minister: ${currentSession.preacher || "Pastor in charge"}
Theme: ${currentSession.notes || "Worship Service"}

*ATTENDANCE METRICS SUMMARY:*
• Total Worshippers: ${totalAttendance} worshippers
• Manual Usher Roster: ${manualCount} members (${manualShare}% contribution)
• Entrance QR Self Check-Ins: ${qrCount} members (${qrShare}% contribution)
• First-Time Visitors: ${visitorCount} souls welcomed (${visitorShare}% contribution)

*FIRST-TIMERS HARVEST:*
${visitorList.length > 0 ? visitorList.map((v: any, idx: number) => `${idx + 1}. ${v.n} (${v.g}) - Invited by ${v.w}`).join("\n") : "None recorded for this service."}

_Prepared automatically by REDDOX Church Management System._`;

    navigator.clipboard?.writeText(brief);
    showToast?.("Pastor's executive attendance brief copied to clipboard!");
  };

  return (
    <>
      {/* Page Header */}
      <div className="portal-hd" style={{ marginBottom: 12 }}>
        <div>
          <h1>Attendance &amp; Service Headcount</h1>
          <p>
            Track attendance organized by service categories across Manual Roster, Entrance QR Check-Ins, and First-Time Visitors.
          </p>
        </div>
        <div className="portal-acts">
          <button onClick={onNewSession} className="portal-btn p">
            <SvgIcon name="plus" />
            <span>New service session</span>
          </button>
        </div>
      </div>

      {/* 1. Category Filter Strip */}
      <div className="portal-cat-bar">
        {SERVICE_CATEGORIES.map((cat) => {
          const count =
            cat === "All Categories"
              ? sessions.length
              : sessions.filter((s: any) => (s.category || "Sunday Celebration Service") === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              className={`portal-cat-chip ${isActive ? "active" : ""}`}
              onClick={() => handleCategorySelect(cat)}
            >
              <span>{cat}</span>
              <span className="chip-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Streamlined Active Session Ribbon (Zero Sagging) */}
      {currentSession ? (
        <div className="portal-att-ribbon">
          <div className="portal-att-ribbon-left">
            <div className="portal-att-ribbon-title-row">
              <span className="portal-session-badge">
                <SvgIcon name="cal" />
                {currentSession.category || "Sunday Celebration Service"}
              </span>
              <h2>{currentSession.n}</h2>
            </div>
            <div className="portal-att-ribbon-meta">
              <span className="portal-att-meta-item">
                <SvgIcon name="cal" />
                <span>{currentSession.d}</span>
              </span>
              <span className="portal-att-meta-item">
                <SvgIcon name="clock" />
                <span>{currentSession.time || "09:00 AM"}</span>
              </span>
              {currentSession.preacher && (
                <span className="portal-att-meta-item">
                  <SvgIcon name="mic" />
                  <span>{currentSession.preacher}</span>
                </span>
              )}
              {currentSession.notes && currentSession.notes !== "hh" && (
                <span style={{ fontStyle: "italic", opacity: 0.85 }}>
                  &ldquo;{currentSession.notes}&rdquo;
                </span>
              )}
            </div>
          </div>

          <div className="portal-att-ribbon-right">
            {/* Compact Mini Stat Chips */}
            <div className="portal-att-mini-stats">
              <div className="portal-att-mini-chip total">
                <div className="portal-att-mini-chip-lbl">Total</div>
                <div className="portal-att-mini-chip-val">{totalAttendance}</div>
              </div>
              <div className="portal-att-mini-chip">
                <div className="portal-att-mini-chip-lbl">Manual</div>
                <div className="portal-att-mini-chip-val" style={{ color: "#059669" }}>
                  {manualCount}
                </div>
              </div>
              <div className="portal-att-mini-chip">
                <div className="portal-att-mini-chip-lbl">QR Scans</div>
                <div className="portal-att-mini-chip-val" style={{ color: "#2563eb" }}>
                  {qrCount}
                </div>
              </div>
              <div className="portal-att-mini-chip">
                <div className="portal-att-mini-chip-lbl">Visitors</div>
                <div className="portal-att-mini-chip-val" style={{ color: "var(--rd)" }}>
                  {visitorCount}
                </div>
              </div>
            </div>

            {/* Compact Switcher */}
            <select
              value={currentSession.id}
              onChange={(e) => onSelectSession(Number(e.target.value))}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid var(--bd)",
                background: "#ffffff",
                fontSize: 12.5,
                fontWeight: 600,
                color: "var(--tx)",
                maxWidth: 220,
              }}
            >
              {filteredSessions.map((s: any) => {
                const sTotal = (s.p?.length || 0) + (s.qrScans?.length || 0) + (s.visitors?.length || 0);
                return (
                  <option key={s.id} value={s.id}>
                    {s.n} · {s.d} ({sTotal})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      ) : (
        <div className="portal-cd portal-emp" style={{ padding: "24px 16px", marginBottom: 16 }}>
          <h3>No attendance session found for {selectedCategory}</h3>
          <p>Create a new attendance session for this service category to start tracking.</p>
          <button onClick={onNewSession} className="portal-btn p sm">
            <SvgIcon name="plus" />
            <span>Create Session</span>
          </button>
        </div>
      )}

      {/* 3. The 4 Tri-Channel Navigation Tabs */}
      {currentSession && (
        <>
          <div className="portal-att-nav">
            <button
              type="button"
              className={`portal-att-nav-btn ${activeTab === "manual" ? "active" : ""}`}
              onClick={() => setActiveTab("manual")}
            >
              <SvgIcon name="users" />
              <span>Manual Roster</span>
              <span className="portal-att-nav-badge">{manualCount}</span>
            </button>

            <button
              type="button"
              className={`portal-att-nav-btn ${activeTab === "qr" ? "active" : ""}`}
              onClick={() => setActiveTab("qr")}
            >
              <SvgIcon name="qr" />
              <span>QR Scanner</span>
              <span className="portal-att-nav-badge">{qrCount}</span>
            </button>

            <button
              type="button"
              className={`portal-att-nav-btn ${activeTab === "visitor" ? "active" : ""}`}
              onClick={() => setActiveTab("visitor")}
            >
              <SvgIcon name="uplus" />
              <span>Visitors</span>
              <span className="portal-att-nav-badge">{visitorCount}</span>
            </button>

            <button
              type="button"
              className={`portal-att-nav-btn ${activeTab === "reports" ? "active" : ""}`}
              onClick={() => setActiveTab("reports")}
            >
              <SvgIcon name="chart" />
              <span>Automated Reports</span>
            </button>
          </div>

          {/* =========================================================
              TAB 1: MANUAL ATTENDANCE (USHER ROSTER)
              ========================================================= */}
          {activeTab === "manual" && (
            <div className="portal-cd">
              {/* Toolbar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 10, flex: 1, minWidth: 260 }}>
                  <input
                    type="text"
                    placeholder="Search members by name or phone..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    style={{ flex: 1, padding: "8px 12px", fontSize: 13, borderRadius: 8, border: "1px solid var(--bd)" }}
                  />
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    style={{ padding: "8px 12px", fontSize: 13, borderRadius: 8, border: "1px solid var(--bd)", minWidth: 150 }}
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d === "All" ? "All Departments" : d}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={onMarkAllPresent} className="portal-btn sm p">
                    <SvgIcon name="check" />
                    <span>Mark all</span>
                  </button>
                  <button onClick={onClearAllPresent} className="portal-btn sm">
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                  padding: "8px 12px",
                  background: "var(--bl2)",
                  borderRadius: 10,
                }}
              >
                <div className="portal-pb" style={{ flex: 1, height: 8, margin: 0, background: "#ffffff" }}>
                  <i style={{ width: `${manualPct}%`, background: "#059669" }} />
                </div>
                <span style={{ color: "var(--bl)", fontSize: 12.5, fontWeight: 700 }}>
                  {manualCount} of {totalMembers} members present ({manualPct}%)
                </span>
              </div>

              {/* Member Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {filteredMembers.map((m: any) => {
                  const isPresent = currentSession.p?.includes(m.id);
                  return (
                    <div key={m.id} className="portal-li" style={{ background: isPresent ? "rgba(5, 150, 105, 0.03)" : undefined }}>
                      <span className="portal-a" style={{ background: isPresent ? "#059669" : undefined, color: isPresent ? "#fff" : undefined }}>
                        {getInitials(m.n)}
                      </span>
                      <p>
                        <strong>{m.n}</strong>
                        <br />
                        <small style={{ color: "var(--mu)" }}>
                          {m.d} · {m.ph || "No phone"}
                        </small>
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

                {filteredMembers.length === 0 && (
                  <div className="portal-emp" style={{ padding: "20px 16px" }}>
                    <p style={{ margin: 0 }}>No members match your search or department filter.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: QR ATTENDANCE (2-COLUMN CLEAN GRID)
              ========================================================= */}
          {activeTab === "qr" && (
            <div className="portal-att-2col">
              {/* Left Column: Clean QR Code Card */}
              <div className="portal-qr-box">
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "#2563eb" }}>
                  Entrance QR Code
                </span>
                <h3 style={{ margin: "4px 0 2px", fontSize: 15 }}>{currentSession.category}</h3>
                <p style={{ margin: "0 0 10px", color: "var(--mu)", fontSize: 12 }}>
                  Attendees scan to self-check-in.
                </p>

                <div className="portal-qr-code-wrapper">
                  <svg className="portal-qr" viewBox="0 0 21 21" style={{ width: 130, height: 130 }} shapeRendering="crispEdges">
                    <path
                      fill="#2b2015"
                      d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM1 1v5h5V1zM15 1v5h5V1zM1 15v5h5v-5zM2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM8 0h2v2H8zM11 1h2v2h-2zM8 4h3v2H8zM12 5h1v2h-1zM0 8h2v2H0zM3 9h3v2H3zM8 8h2v3H8zM12 8h3v2h-3zM16 9h2v2h-2zM19 8h2v3h-2zM8 12h2v2H8zM11 13h2v2h-2zM14 12h2v2h-2zM18 13h3v2h-3zM8 16h3v2H8zM12 17h2v3h-2zM15 16h2v2h-2zM18 18h3v3h-3zM9 19h2v2H9z"
                    />
                  </svg>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--mu)", marginTop: 4 }}>
                    TOKEN: SVC-{currentSession.id}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => setIsKioskOpen(true)}
                    className="portal-btn sm p"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <SvgIcon name="pc" />
                    <span>Launch Kiosk Mode</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const link = `${typeof window !== "undefined" ? window.location.origin : ""}/portal/checkin?session=${currentSession.id}`;
                      navigator.clipboard?.writeText(link);
                      showToast?.("Check-in link copied to clipboard!");
                    }}
                    className="portal-btn sm"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    <SvgIcon name="copy" />
                    <span>Copy Member Link</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Fast Scan & Live Feed */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Fast Scan Bar */}
                <div className="portal-fast-scan-bar">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--tx)", display: "flex", alignItems: "center", gap: 6 }}>
                      <SvgIcon name="zap" />
                      <span>Usher Entrance Fast-Logger</span>
                    </span>
                    <span style={{ fontSize: 11.5, color: "var(--mu)" }}>
                      {unscannedMembers.length} not yet scanned
                    </span>
                  </div>

                  <form onSubmit={handleSimulateQrScan} style={{ display: "flex", gap: 8 }}>
                    <select
                      value={selectedScanMemberId}
                      onChange={(e) => setSelectedScanMemberId(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: 8,
                        border: "1px solid var(--bd)",
                        background: "#ffffff",
                        fontSize: 12.5,
                      }}
                    >
                      <option value="">Select arriving member to fast-log...</option>
                      {unscannedMembers.map((m: any) => (
                        <option key={m.id} value={m.id}>
                          {m.n} ({m.d})
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="portal-btn sm p" style={{ background: "#2563eb", borderColor: "#2563eb" }}>
                      <SvgIcon name="zap" />
                      <span>Log Scan</span>
                    </button>
                  </form>
                </div>

                {/* Scanned Attendees Feed */}
                <div className="portal-cd" style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <h4 style={{ margin: 0, fontSize: 14 }}>
                      Live Scanned Feed ({qrCount})
                    </h4>
                    <span style={{ fontSize: 11.5, color: "var(--mu)" }}>
                      Real-time digital check-in records
                    </span>
                  </div>

                  {qrList.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", textAlign: "left", fontSize: 12.5, borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--bd)", color: "var(--mu)" }}>
                            <th style={{ padding: "6px 8px" }}>Member Name</th>
                            <th style={{ padding: "6px 8px" }}>Check-In Time</th>
                            <th style={{ padding: "6px 8px" }}>Channel</th>
                            <th style={{ padding: "6px 8px", textAlign: "right" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {qrList.map((q: any) => (
                            <tr key={q.id} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.04)" }}>
                              <td style={{ padding: "8px", fontWeight: 700, color: "var(--tx)" }}>
                                {q.name}
                              </td>
                              <td style={{ padding: "8px", color: "var(--mu)" }}>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                  <SvgIcon name="clock" />
                                  <span>{q.time || "Recent"}</span>
                                </span>
                              </td>
                              <td style={{ padding: "8px" }}>
                                <span style={{ fontSize: 11, padding: "2px 7px", borderRadius: 99, background: "rgba(37, 99, 235, 0.08)", color: "#2563eb", fontWeight: 600 }}>
                                  {q.device || "Mobile QR"}
                                </span>
                              </td>
                              <td style={{ padding: "8px", textAlign: "right" }}>
                                <button
                                  type="button"
                                  onClick={() => onRemoveQrScan(q.id)}
                                  style={{ background: "transparent", border: 0, color: "var(--er)", cursor: "pointer", fontSize: 11.5, fontWeight: 600 }}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="portal-emp" style={{ padding: "20px 16px" }}>
                      <div className="portal-ico" style={{ margin: "0 auto 8px" }}>
                        <SvgIcon name="qr" />
                      </div>
                      <h4 style={{ margin: "0 0 4px", fontSize: 14 }}>Ready for QR check-ins</h4>
                      <p style={{ margin: 0, fontSize: 12 }}>
                        Arriving worshippers scanning the entrance code or logged by ushers will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: VISITOR ATTENDANCE (2-COLUMN CLEAN GRID)
              ========================================================= */}
          {activeTab === "visitor" && (
            <div className="portal-att-2col">
              {/* Left Column: Clean Visitor Registration Form */}
              <div className="portal-cd" style={{ padding: "16px" }}>
                <h3 style={{ margin: "0 0 2px", fontSize: 15 }}>Register First-Time Visitor</h3>
                <p style={{ margin: "0 0 12px", color: "var(--mu)", fontSize: 12 }}>
                  For {currentSession.category}.
                </p>

                <form onSubmit={handleRegisterVisitor} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {visError && (
                    <div style={{ padding: "6px 10px", background: "rgba(179, 38, 30, 0.08)", border: "1px solid var(--er)", borderRadius: 8, color: "var(--er)", fontSize: 12 }}>
                      {visError}
                    </div>
                  )}

                  <div className="portal-fi" style={{ margin: 0 }}>
                    <label style={{ fontSize: 11 }}>Full Name *</label>
                    <input
                      placeholder="e.g. Sister Grace Adeleke"
                      value={visName}
                      onChange={(e) => setVisName(e.target.value)}
                      style={{ padding: "8px 10px", fontSize: 12.5 }}
                    />
                  </div>

                  <div className="portal-fi" style={{ margin: 0 }}>
                    <label style={{ fontSize: 11 }}>Phone Number *</label>
                    <input
                      placeholder="e.g. 0803 123 4567"
                      value={visPhone}
                      onChange={(e) => setVisPhone(e.target.value)}
                      style={{ padding: "8px 10px", fontSize: 12.5 }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div className="portal-fi" style={{ margin: 0 }}>
                      <label style={{ fontSize: 11 }}>Gender</label>
                      <select value={visGender} onChange={(e) => setVisGender(e.target.value)} style={{ padding: "8px 10px", fontSize: 12.5 }}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>
                    <div className="portal-fi" style={{ margin: 0 }}>
                      <label style={{ fontSize: 11 }}>Interest</label>
                      <select value={visDept} onChange={(e) => setVisDept(e.target.value)} style={{ padding: "8px 10px", fontSize: 12.5 }}>
                        <option value="Choir">Choir</option>
                        <option value="Ushering">Ushering</option>
                        <option value="Youth">Youth</option>
                        <option value="Media">Media</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                  </div>

                  <div className="portal-fi" style={{ margin: 0 }}>
                    <label style={{ fontSize: 11 }}>Invited By / Source</label>
                    <input
                      placeholder="e.g. Brother Samuel / Outreach"
                      value={visInvitedBy}
                      onChange={(e) => setVisInvitedBy(e.target.value)}
                      style={{ padding: "8px 10px", fontSize: 12.5 }}
                    />
                  </div>

                  <div className="portal-fi" style={{ margin: 0 }}>
                    <label style={{ fontSize: 11 }}>Prayer Request / Notes</label>
                    <input
                      placeholder="e.g. Praying for employment breakthrough"
                      value={visNotes}
                      onChange={(e) => setVisNotes(e.target.value)}
                      style={{ padding: "8px 10px", fontSize: 12.5 }}
                    />
                  </div>

                  <button type="submit" className="portal-btn sm p" style={{ marginTop: 4, justifyContent: "center" }}>
                    <SvgIcon name="uplus" />
                    <span>Register Visitor</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Registered Visitors List */}
              <div className="portal-cd" style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 14 }}>
                      Visitors Welcomed ({visitorCount})
                    </h4>
                    <p style={{ margin: "2px 0 0", color: "var(--mu)", fontSize: 12 }}>
                      Recorded for {currentSession.d}.
                    </p>
                  </div>
                </div>

                {visitorList.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {visitorList.map((vis: any) => (
                      <div key={vis.id} className="portal-vis-card">
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "var(--rd2)",
                              color: "var(--rd)",
                              display: "grid",
                              placeItems: "center",
                              fontWeight: 800,
                              fontSize: 12,
                              flexShrink: 0,
                            }}
                          >
                            {getInitials(vis.n)}
                          </span>
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                              <strong style={{ fontSize: 13, color: "var(--tx)" }}>{vis.n}</strong>
                              <span style={{ fontSize: 10.5, padding: "1px 6px", borderRadius: 99, background: "rgba(184, 134, 45, 0.12)", color: "var(--rd)", fontWeight: 700 }}>
                                {vis.g || "Guest"}
                              </span>
                            </div>
                            <div style={{ fontSize: 11.5, color: "var(--mu)", marginTop: 1, display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                                <SvgIcon name="ph" />
                                <span>{vis.ph}</span>
                              </span>
                              <span>·</span>
                              <span>Invited by: <strong>{vis.w || "Walk-in"}</strong></span>
                            </div>
                            {vis.nt && (
                              <div style={{ fontSize: 11.5, color: "var(--tx)", fontStyle: "italic", marginTop: 2 }}>
                                &ldquo;{vis.nt}&rdquo;
                              </div>
                            )}
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <button
                            type="button"
                            onClick={() => handleSendWelcome(vis)}
                            className="portal-btn sm"
                            style={{ color: "#059669", borderColor: "rgba(5, 150, 105, 0.3)", padding: "4px 8px", fontSize: 11.5 }}
                          >
                            <SvgIcon name="msg" />
                            <span>WhatsApp Welcome</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveSessionVisitor(vis.id)}
                            style={{ background: "transparent", border: 0, color: "var(--er)", cursor: "pointer", fontSize: 14, padding: "4px 6px" }}
                            title="Remove visitor"
                          >
                            <SvgIcon name="x" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="portal-emp" style={{ padding: "20px 16px" }}>
                    <div className="portal-ico" style={{ margin: "0 auto 8px" }}>
                      <SvgIcon name="users" />
                    </div>
                    <h4 style={{ margin: "0 0 4px", fontSize: 14 }}>No visitors logged yet</h4>
                    <p style={{ margin: 0, fontSize: 12 }}>
                      Use the registration form on the left to welcome and log first-time guests.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 4: AUTOMATIC REPORTS (THE THREE COMBINED & ANALYZED)
              ========================================================= */}
          {activeTab === "reports" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Top Consolidated Metrics */}
              <div className="portal-cd" style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16 }}>
                      Consolidated Service Report: {currentSession.category}
                    </h3>
                    <p style={{ margin: "2px 0 0", color: "var(--mu)", fontSize: 12 }}>
                      Live aggregated intelligence combining Manual Roster, Digital QR Scans, and First-Timer Harvest.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleExportCSV} className="portal-btn sm">
                      <SvgIcon name="dl" />
                      <span>Download CSV</span>
                    </button>
                    <button onClick={handleCopyPastorBrief} className="portal-btn sm p">
                      <SvgIcon name="copy" />
                      <span>Copy Brief</span>
                    </button>
                  </div>
                </div>

                {/* Visual Proportion Meter */}
                <div className="portal-tri-meter-box">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--mu)" }}>
                      Tri-Channel Distribution
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: "var(--tx)" }}>
                      {totalAttendance} Total Recorded
                    </span>
                  </div>

                  <div className="portal-tri-meter-bar">
                    <div className="portal-tri-seg manual" style={{ width: `${manualShare}%` }} title={`Manual: ${manualCount} (${manualShare}%)`} />
                    <div className="portal-tri-seg qr" style={{ width: `${qrShare}%` }} title={`QR: ${qrCount} (${qrShare}%)`} />
                    <div className="portal-tri-seg visitor" style={{ width: `${visitorShare}%` }} title={`Visitors: ${visitorCount} (${visitorShare}%)`} />
                  </div>

                  <div className="portal-tri-legend">
                    <div className="portal-tri-legend-item">
                      <span className="portal-tri-dot manual" />
                      <span>Manual Roster: <strong>{manualCount} ({manualShare}%)</strong></span>
                    </div>
                    <div className="portal-tri-legend-item">
                      <span className="portal-tri-dot qr" />
                      <span>QR Scans: <strong>{qrCount} ({qrShare}%)</strong></span>
                    </div>
                    <div className="portal-tri-legend-item">
                      <span className="portal-tri-dot visitor" />
                      <span>First-Time Visitors: <strong>{visitorCount} ({visitorShare}%)</strong></span>
                    </div>
                  </div>
                </div>

                {/* Department Turnout Breakdown */}
                <div style={{ marginTop: 14 }}>
                  <h4 style={{ margin: "0 0 10px", fontSize: 13 }}>
                    Department Turnout Breakdown (Manual Roster)
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
                    {departments.filter((d) => d !== "All").map((dept) => {
                      const deptMembers = members.filter((m: any) => m.d === dept);
                      const deptPresent = deptMembers.filter((m: any) => currentSession.p?.includes(m.id)).length;
                      const deptPct = deptMembers.length ? Math.round((deptPresent / deptMembers.length) * 100) : 0;
                      return (
                        <div key={dept} style={{ background: "rgba(0,0,0,0.02)", border: "1px solid var(--bd)", borderRadius: 10, padding: "10px 12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                            <span>{dept}</span>
                            <span style={{ color: deptPct > 50 ? "#059669" : "var(--mu)" }}>
                              {deptPresent}/{deptMembers.length} ({deptPct}%)
                            </span>
                          </div>
                          <div className="portal-pb" style={{ height: 6, margin: 0, background: "rgba(0,0,0,0.06)" }}>
                            <i style={{ width: `${deptPct}%`, background: deptPct > 50 ? "#059669" : "var(--bl)" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pastor's Executive Bulletin */}
              <div className="portal-brief-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.6, color: "var(--rd)" }}>
                      Executive Summary
                    </span>
                    <h3 style={{ margin: "2px 0 0", fontSize: 15 }}>
                      Pastor &amp; Leadership Board Briefing
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPastorBrief}
                    className="portal-btn sm"
                    style={{ background: "#ffffff", padding: "6px 10px", fontSize: 12 }}
                  >
                    <SvgIcon name="copy" />
                    <span>Copy Brief</span>
                  </button>
                </div>

                <div
                  style={{
                    background: "rgba(43, 32, 21, 0.03)",
                    border: "1px solid var(--bd)",
                    borderRadius: 10,
                    padding: "12px 16px",
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "var(--tx)",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {`RCCG REHOBOTH CHAPEL - OFFICIAL SERVICE ATTENDANCE REPORT
==========================================================
Service Category : ${currentSession.category || "Sunday Service"}
Service Session  : ${currentSession.n}
Date & Time      : ${currentSession.d} (${currentSession.time || "09:00 AM"})
Presiding Pastor : ${currentSession.preacher || "Pastor in charge"}

ATTENDANCE CHANNELS BREAKDOWN:
----------------------------------------------------------
1. Manual Usher Roster       : ${manualCount} members (${manualShare}%)
2. Digital QR Code Check-Ins : ${qrCount} members (${qrShare}%)
3. First-Time Visitors       : ${visitorCount} souls welcomed (${visitorShare}%)
----------------------------------------------------------
TOTAL CONGREGATION HEADCOUNT : ${totalAttendance} Worshippers

FIRST-TIMERS HARVEST LIST:
${visitorList.length > 0 ? visitorList.map((v: any, i: number) => ` [${i + 1}] ${v.n} (${v.g}) | Phone: ${v.ph} | Invited: ${v.w}`).join("\n") : " None recorded for this service."}

AUTOMATED SUMMARY INSIGHT:
${totalAttendance > 0 ? `Service attendance reached ${totalAttendance} worshippers across the 3 channels. ${manualCount} regular members were checked in by ushers, while ${qrCount} worshippers used digital entrance QR scans. ${visitorCount} first-time visitors were welcomed into church fellowship.` : "No attendance recorded yet for this service session."}`}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* =========================================================
          FULLSCREEN ENTRANCE KIOSK MODAL (CLEAN & EMOJI-FREE)
          ========================================================= */}
      {isKioskOpen && currentSession && (
        <div className="portal-kiosk-modal" onClick={() => setIsKioskOpen(false)}>
          <div className="portal-kiosk-card" onClick={(e) => e.stopPropagation()}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 0.8,
                color: "var(--rd)",
                background: "var(--rd2)",
                padding: "4px 12px",
                borderRadius: 99,
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              RCCG Rehoboth Chapel · Entrance Check-In
            </span>

            <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 6px", color: "var(--tx)" }}>
              Welcome to {currentSession.category}!
            </h2>
            <p style={{ margin: "0 0 16px", color: "var(--mu)", fontSize: 13 }}>
              Scan the code with your smartphone camera to check in instantly.
            </p>

            <div
              style={{
                display: "inline-block",
                background: "#ffffff",
                padding: 18,
                borderRadius: 18,
                border: "2px solid var(--bd)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                marginBottom: 16,
              }}
            >
              <svg className="portal-qr" viewBox="0 0 21 21" style={{ width: 180, height: 180 }} shapeRendering="crispEdges">
                <path
                  fill="#2b2015"
                  d="M0 0h7v7H0zM14 0h7v7h-7zM0 14h7v7H0zM1 1v5h5V1zM15 1v5h5V1zM1 15v5h5v-5zM2 2h3v3H2zM16 2h3v3h-3zM2 16h3v3H2zM8 0h2v2H8zM11 1h2v2h-2zM8 4h3v2H8zM12 5h1v2h-1zM0 8h2v2H0zM3 9h3v2H3zM8 8h2v3H8zM12 8h3v2h-3zM16 9h2v2h-2zM19 8h2v3h-2zM8 12h2v2H8zM11 13h2v2h-2zM14 12h2v2h-2zM18 13h3v2h-3zM8 16h3v2H8zM12 17h2v3h-2zM15 16h2v2h-2zM18 18h3v3h-3zM9 19h2v2H9z"
                />
              </svg>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 12.5, color: "var(--mu)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <SvgIcon name="zap" />
                <span><strong>{qrCount}</strong> digital check-ins</span>
              </span>
              <span style={{ color: "var(--bd)" }}>|</span>
              <span style={{ fontSize: 12.5, color: "var(--mu)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                <SvgIcon name="users" />
                <span>Total: <strong>{totalAttendance}</strong></span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsKioskOpen(false)}
              className="portal-btn p"
              style={{ width: "100%", padding: "10px 16px", justifyContent: "center" }}
            >
              <SvgIcon name="x" />
              <span>Close Kiosk</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =====================================================================
   MODAL: RSVP MEMBER TO EVENT
   ===================================================================== */
function RsvpMemberModal({ event, members, onClose, onRsvp }: any) {
  const [isGuest, setIsGuest] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || 1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest) {
      if (!guestName.trim()) {
        setError("Please enter the guest's name.");
        return;
      }
      onRsvp({
        name: guestName.trim(),
        role: "Guest / Visitor",
        phone: guestPhone.trim() || "—",
        time: "Just now",
      });
    } else {
      const found = members.find((m: any) => m.id === Number(selectedMemberId));
      onRsvp({
        name: found ? found.n : "Church Member",
        role: found ? found.d : "Member",
        phone: found ? found.ph : "—",
        time: "Just now",
      });
    }
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{ maxWidth: 480 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Register RSVP for Event</h2>
          <button type="button" onClick={onClose} className="portal-srch-clear" style={{ position: "static", transform: "none" }}>✕</button>
        </div>
        <p style={{ color: "var(--mu)", fontSize: 13, margin: "0 0 16px" }}>
          Confirm attendance for <strong>{event.t}</strong> ({event.mo} {event.d})
        </p>

        <div className="portal-tabs-toggle" style={{ marginBottom: 16 }}>
          <button
            type="button"
            className={`portal-tab-btn ${!isGuest ? "active" : ""}`}
            onClick={() => setIsGuest(false)}
          >
            Registered Member
          </button>
          <button
            type="button"
            className={`portal-tab-btn ${isGuest ? "active" : ""}`}
            onClick={() => setIsGuest(true)}
          >
            First-Timer / Guest
          </button>
        </div>

        {!isGuest ? (
          <div className="portal-fi">
            <label>Select Congregation Member</label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(Number(e.target.value))}
            >
              {members.map((m: any) => (
                <option key={m.id} value={m.id}>
                  {m.n} ({m.d})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div className={`portal-fi ${error ? "bad" : ""}`}>
              <label>Guest Full Name</label>
              <input
                placeholder="e.g. Bro Emmanuel Oladipo"
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  setError("");
                }}
                autoFocus
              />
              <div className="er">{error}</div>
            </div>
            <div className="portal-fi">
              <label>Phone Number (Optional)</label>
              <input
                placeholder="0803 123 4567"
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="portal-mf">
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Confirm RSVP
          </button>
        </div>
      </form>
    </div>
  );
}

/* =====================================================================
   MODAL: VIEW REGISTERED ATTENDEES FOR EVENT
   ===================================================================== */
function EventAttendeesModal({ event, onClose }: any) {
  const [search, setSearch] = useState("");
  const attendees = event?.attendees || [];
  const filtered = attendees.filter((a: any) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="portal-mo" onClick={onClose}>
      <div
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 520 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18 }}>Registered Attendees ({event.r || 0})</h2>
            <small style={{ color: "var(--mu)" }}>{event.t} · {event.fullDate || `${event.mo} ${event.d}`}</small>
          </div>
          <button type="button" onClick={onClose} className="portal-srch-clear" style={{ position: "static", transform: "none" }}>✕</button>
        </div>

        <div className="portal-srch" style={{ margin: "12px 0 16px" }}>
          <input
            type="text"
            placeholder="Search registered names…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ maxHeight: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length > 0 ? (
            filtered.map((att: any, idx: number) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  background: "rgba(43, 32, 21, 0.03)",
                  borderRadius: 10,
                  border: "1px solid var(--bd)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--rd6)",
                      color: "var(--rd)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {getInitials(att.name)}
                  </div>
                  <div>
                    <strong style={{ fontSize: 13, display: "block" }}>{att.name}</strong>
                    <small style={{ color: "var(--mu)", fontSize: 11 }}>{att.role || "Worshipper"}</small>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "var(--mu)" }}>{att.time || "Confirmed"}</span>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "24px 0", color: "var(--mu)", fontSize: 13 }}>
              {attendees.length === 0 ? "No individual attendee names logged yet. Use '+ RSVP' to record participants." : "No attendees match your search."}
            </div>
          )}
        </div>

        <div className="portal-mf" style={{ marginTop: 16 }}>
          <button type="button" onClick={onClose} className="portal-btn p" style={{ width: "100%", justifyContent: "center" }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   VIEW 4: EVENTS & RSVPS (MODERN & SENSIBLE)
   ===================================================================== */
function EventsView({
  events,
  members,
  plan,
  onCreateEvent,
  onRegister,
  onRemoveEvent,
  showToast,
}: any) {
  const [catFilter, setCatFilter] = useState("All");
  const [selectedRsvpEvent, setSelectedRsvpEvent] = useState<any | null>(null);
  const [selectedAttendeesEvent, setSelectedAttendeesEvent] = useState<any | null>(null);

  const categories = [
    "All",
    "Worship Service",
    "Bible Study",
    "Youth & Singles",
    "Prayer & Vigil",
    "Outreach & Community",
  ];

  const filteredEvents = catFilter === "All"
    ? events
    : events.filter((ev: any) => ev.category === catFilter);

  const totalRsvps = events.reduce((acc: number, ev: any) => acc + (ev.r || 0), 0);
  const nextEvent = events[0];

  const handleCopyInvite = (ev: any) => {
    const text = `⛪ ${ev.t}\n📅 ${ev.fullDate || `${ev.mo} ${ev.d}`}\n⏰ ${ev.tm}\n📍 ${ev.venue || "Main Sanctuary"}\n🎙️ Preacher: ${ev.preacher || "Pastor Tosin Adewale"}\n${ev.theme ? `✨ Theme: "${ev.theme}"` : ""}\nJoin us for fellowship!`;
    navigator.clipboard?.writeText(text);
    if (showToast) showToast("Event details copied to clipboard!");
  };

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Church Events &amp; Services</h1>
          <p>
            Schedule worship services, bible studies, vigils, and track congregation RSVPs
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
              Starter Plan Quota: 1 Event Per Month
            </strong>
            <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--mu)" }}>
              {events.length >= 1
                ? "You have reached your 1-event monthly allowance on Starter. Upgrade to Growth for unlimited scheduled events & ticket registrations."
                : "Free Starter churches can publish 1 event per month. Upgrade to Growth for unlimited scheduled events."}
            </p>
          </div>
          <Link href="/checkout?plan=growth" className="portal-btn sm p" style={{ textDecoration: "none" }}>
            Upgrade to Growth &rarr;
          </Link>
        </div>
      )}

      {/* Events Metrics Row */}
      <div className="portal-gs">
        <div className="portal-cd portal-st">
          <small>Scheduled Events</small>
          <b>{events.length}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Total Congregation RSVPs</small>
          <b>{totalRsvps}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Next Coming Service</small>
          <b>{nextEvent ? `${nextEvent.mo} ${nextEvent.d}` : "None"}</b>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="portal-cat-bar">
        {categories.map((cat) => {
          const count = cat === "All" ? events.length : events.filter((e: any) => e.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              className={`portal-cat-btn ${catFilter === cat ? "active" : ""}`}
              onClick={() => setCatFilter(cat)}
            >
              <span>{cat}</span>
              <span className="portal-cat-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="portal-events-grid">
          {filteredEvents.map((ev: any, idx: number) => {
            const capacity = ev.capacity || 250;
            const rsvpCount = ev.r || 0;
            const pct = Math.min(100, Math.round((rsvpCount / capacity) * 100));
            return (
              <div key={ev.id || idx} className="portal-event-card">
                <div className="portal-event-card-top">
                  <div className="portal-event-datebox">
                    <span className="portal-event-datebox-mo">{ev.mo}</span>
                    <span className="portal-event-datebox-day">{ev.d}</span>
                  </div>
                  <div className="portal-event-headline">
                    <div className="portal-event-tags">
                      <span className="portal-event-cat-tag">{ev.category || "Service"}</span>
                      <span className={`portal-event-status-tag ${ev.status === "This Week" ? "this-week" : "upcoming"}`}>
                        {ev.status || "Upcoming"}
                      </span>
                    </div>
                    <h3 className="portal-event-title">{ev.t}</h3>
                    {ev.theme && <p className="portal-event-theme">"{ev.theme}"</p>}
                  </div>
                </div>

                <div className="portal-event-body">
                  <div className="portal-event-meta-row">
                    <SvgIcon name="cal" />
                    <span>{ev.fullDate || `${ev.mo} ${ev.d}, 2026`} · {ev.tm}</span>
                  </div>

                  <div className="portal-event-meta-row">
                    <SvgIcon name="shield" />
                    <span>{ev.venue || "Main Sanctuary & Auditorium"}</span>
                  </div>

                  <div className="portal-event-meta-row">
                    <SvgIcon name="user" />
                    <span>Minister: <strong>{ev.preacher || "Pastor Tosin Adewale"}</strong></span>
                  </div>

                  <div className="portal-event-rsvp-block">
                    <div className="portal-event-rsvp-header">
                      <span>RSVP Attendance</span>
                      <strong>{rsvpCount} / {capacity} ({pct}%)</strong>
                    </div>
                    <div className="portal-event-rsvp-bar">
                      <i style={{ width: `${Math.max(4, pct)}%` }} />
                    </div>
                  </div>
                </div>

                <div className="portal-event-footer">
                  <div className="portal-event-card-actions">
                    <button
                      type="button"
                      onClick={() => setSelectedRsvpEvent(ev)}
                      className="portal-btn sm p"
                    >
                      + RSVP
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAttendeesEvent(ev)}
                      className="portal-btn sm"
                    >
                      Attendees ({rsvpCount})
                    </button>
                  </div>
                  <div className="portal-event-card-actions">
                    <button
                      type="button"
                      onClick={() => handleCopyInvite(ev)}
                      className="portal-receipt-btn"
                      title="Copy event invite"
                    >
                      Share
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveEvent(ev.id || ev.t)}
                      className="portal-srch-clear"
                      style={{ position: "static", transform: "none", fontSize: 13 }}
                      title="Delete event"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="portal-cd portal-emp" style={{ padding: "48px 24px", textAlign: "center" }}>
          <div className="portal-ico" style={{ margin: "0 auto 12px" }}>
            <SvgIcon name="cal" />
          </div>
          <h3>No events found in this category</h3>
          <p>Schedule your services, revivals, and ministry fellowships.</p>
          <button onClick={onCreateEvent} className="portal-btn p" style={{ margin: "12px auto 0" }}>
            Create event
          </button>
        </div>
      )}

      {/* RSVP Modal */}
      {selectedRsvpEvent && (
        <RsvpMemberModal
          event={selectedRsvpEvent}
          members={members}
          onClose={() => setSelectedRsvpEvent(null)}
          onRsvp={(attendee: any) => {
            onRegister(selectedRsvpEvent.id || selectedRsvpEvent.t, attendee);
            setSelectedRsvpEvent(null);
          }}
        />
      )}

      {/* Attendees Modal */}
      {selectedAttendeesEvent && (
        <EventAttendeesModal
          event={selectedAttendeesEvent}
          onClose={() => setSelectedAttendeesEvent(null)}
        />
      )}
    </>
  );
}

/* =====================================================================
   VIEW 5: FINANCES & TITHES (MONTHLY LEDGER)
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

  const [selectedMonth, setSelectedMonth] = useState("Nov 2026");
  const [viewingReceipt, setViewingReceipt] = useState<any | null>(null);

  // Month resolution helper
  function getItemMonth(item: any): string {
    if (item.month) return item.month;
    const w = String(item.w || "");
    if (w.includes("Nov") || w === "Today" || w === "Just now") return "Nov 2026";
    if (w.includes("Oct")) return "Oct 2026";
    if (w.includes("Sep")) return "Sep 2026";
    if (w.includes("Aug")) return "Aug 2026";
    return "Nov 2026";
  }

  const monthsList = ["Nov 2026", "Oct 2026", "Sep 2026", "All Time"];

  // Filtered dataset
  const filteredGiving = selectedMonth === "All Time"
    ? giving
    : giving.filter((g: any) => getItemMonth(g) === selectedMonth);

  const filteredExpenses = selectedMonth === "All Time"
    ? expenses
    : expenses.filter((x: any) => getItemMonth(x) === selectedMonth);

  const monthGiving = filteredGiving.reduce((acc: number, g: any) => acc + g.a, 0);
  const monthExp = filteredExpenses.reduce((acc: number, x: any) => acc + x.a, 0);
  const monthNet = monthGiving - monthExp;

  // Monthly Statements Breakdown
  const monthlyStatements = ["Nov 2026", "Oct 2026", "Sep 2026"].map((m) => {
    const gList = giving.filter((g: any) => getItemMonth(g) === m);
    const xList = expenses.filter((x: any) => getItemMonth(x) === m);
    const gSum = gList.reduce((acc: number, g: any) => acc + g.a, 0);
    const xSum = xList.reduce((acc: number, x: any) => acc + x.a, 0);
    const net = gSum - xSum;
    return {
      month: m,
      givingSum: gSum,
      givingCount: gList.length,
      expSum: xSum,
      expCount: xList.length,
      net,
      isSurplus: net >= 0,
    };
  });

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Treasury &amp; Financials</h1>
          <p>Tithes, Sunday offerings, pledges, and ministry expenses organized by month</p>
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

      {/* Month Filter Selector Ribbon */}
      <div className="portal-month-bar">
        {monthsList.map((m) => {
          const isCurrent = m === "Nov 2026";
          const mGives = m === "All Time" ? giving : giving.filter((g: any) => getItemMonth(g) === m);
          const mTotal = mGives.reduce((acc: number, g: any) => acc + g.a, 0);
          return (
            <button
              key={m}
              type="button"
              className={`portal-month-pill ${selectedMonth === m ? "active" : ""}`}
              onClick={() => setSelectedMonth(m)}
            >
              <span>{m}{isCurrent ? " (Current)" : ""}</span>
              <span className="portal-month-count">{formatNaira(mTotal)}</span>
            </button>
          );
        })}
      </div>

      {/* Active Month Indicator Banner */}
      <div className="portal-month-banner">
        <div>
          <strong>
            {selectedMonth === "All Time" ? "Viewing All-Time Cumulative Ledger" : `Viewing Financials for ${selectedMonth}`}
          </strong>
          <span style={{ color: "var(--mu)", marginLeft: 8 }}>
            ({filteredGiving.length} giving entries · {filteredExpenses.length} expense vouchers)
          </span>
        </div>
        {selectedMonth !== "Nov 2026" ? (
          <button
            type="button"
            className="portal-receipt-btn"
            onClick={() => setSelectedMonth("Nov 2026")}
          >
            Switch to Current Month (Nov 2026)
          </button>
        ) : (
          <button
            type="button"
            className="portal-receipt-btn"
            onClick={() => setSelectedMonth("All Time")}
          >
            View Cumulative Ledger
          </button>
        )}
      </div>

      {/* Stats Cards (Dynamic to Selected Month) */}
      <div className="portal-gs">
        <div className="portal-cd portal-st">
          <small>Total Giving ({selectedMonth})</small>
          <b>{formatNaira(monthGiving)}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Total Expenses ({selectedMonth})</small>
          <b>{formatNaira(monthExp)}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Net Balance ({selectedMonth})</small>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <b style={{ color: monthNet >= 0 ? "var(--tx)" : "var(--er)" }}>
              {formatNaira(monthNet)}
            </b>
            <span className={`portal-statement-badge ${monthNet >= 0 ? "surplus" : "deficit"}`}>
              {monthNet >= 0 ? "Surplus" : "Deficit"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="portal-tabs">
        <button
          className={tab === "give" ? "on" : ""}
          onClick={() => onTabChange("give")}
        >
          Giving &amp; Tithes ({filteredGiving.length})
        </button>
        <button
          className={tab === "exp" ? "on" : ""}
          onClick={() => onTabChange("exp")}
        >
          Expenses ({filteredExpenses.length})
        </button>
        <button
          className={tab === "statement" ? "on" : ""}
          onClick={() => onTabChange("statement")}
        >
          Monthly Treasury Statement
        </button>
      </div>

      {/* TAB 1: GIVING TABLE */}
      {tab === "give" && (
        <div className="portal-cd">
          <div className="portal-tw">
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Receipt / Slip</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredGiving.map((g: any) => (
                  <tr key={g.id}>
                    <td>{getMemberName(g.m)}</td>
                    <td>
                      <span className="portal-pill">{g.t}</span>
                    </td>
                    <td>{g.w}</td>
                    <td>
                      {g.receiptImage || g.receiptName ? (
                        <button
                          type="button"
                          className="portal-receipt-btn"
                          onClick={() =>
                            setViewingReceipt({
                              title: `${g.t} Payment Slip`,
                              image: g.receiptImage,
                              fileName: g.receiptName,
                              category: g.t,
                              party: getMemberName(g.m),
                              amount: g.a,
                              date: g.w,
                              ref: g.ref || `GIV-${g.id}`,
                            })
                          }
                          title="View receipt voucher"
                        >
                          <SvgIcon name="file" />
                          <span>
                            {g.receiptName
                              ? g.receiptName.length > 18
                                ? g.receiptName.slice(0, 16) + "…"
                                : g.receiptName
                              : "View Slip"}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="portal-receipt-btn empty"
                          onClick={() =>
                            setViewingReceipt({
                              title: `${g.t} Digital Voucher`,
                              image: undefined,
                              fileName: undefined,
                              category: g.t,
                              party: getMemberName(g.m),
                              amount: g.a,
                              date: g.w,
                              ref: g.ref || `GIV-${g.id}`,
                            })
                          }
                          title="View digital treasury voucher"
                        >
                          <SvgIcon name="file" />
                          <span>Voucher</span>
                        </button>
                      )}
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                      {formatNaira(g.a)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: EXPENSES TABLE */}
      {tab === "exp" && (
        <div className="portal-cd">
          <div className="portal-tw">
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Receipt / Bill</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((x: any, idx: number) => (
                  <tr key={idx}>
                    <td>{x.t}</td>
                    <td>
                      <span className="portal-pill go">{x.c}</span>
                    </td>
                    <td>{x.w}</td>
                    <td>
                      {x.receiptImage || x.receiptName ? (
                        <button
                          type="button"
                          className="portal-receipt-btn"
                          onClick={() =>
                            setViewingReceipt({
                              title: `${x.t} Receipt`,
                              image: x.receiptImage,
                              fileName: x.receiptName,
                              category: x.c,
                              party: "Ministry Vendor / Supplier",
                              amount: x.a,
                              date: x.w,
                              ref: x.ref || `EXP-${idx + 1}`,
                            })
                          }
                          title="View expense receipt"
                        >
                          <SvgIcon name="file" />
                          <span>
                            {x.receiptName
                              ? x.receiptName.length > 18
                                ? x.receiptName.slice(0, 16) + "…"
                                : x.receiptName
                              : "Receipt"}
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="portal-receipt-btn empty"
                          onClick={() =>
                            setViewingReceipt({
                              title: `${x.t} Disbursement Voucher`,
                              image: undefined,
                              fileName: undefined,
                              category: x.c,
                              party: "Ministry Vendor / Supplier",
                              amount: x.a,
                              date: x.w,
                              ref: x.ref || `EXP-${idx + 1}`,
                            })
                          }
                          title="View disbursement voucher"
                        >
                          <SvgIcon name="file" />
                          <span>Voucher</span>
                        </button>
                      )}
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>
                      {formatNaira(x.a)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MONTHLY COMPARATIVE STATEMENT */}
      {tab === "statement" && (
        <div className="portal-cd">
          <div className="portal-tw">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Total Giving &amp; Tithes</th>
                  <th>Total Expenses</th>
                  <th>Net Result</th>
                  <th>Health</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {monthlyStatements.map((stm) => (
                  <tr key={stm.month}>
                    <td>
                      <strong>{stm.month}</strong>
                      {stm.month === "Nov 2026" && (
                        <span className="portal-statement-badge surplus" style={{ marginLeft: 6, fontSize: 10 }}>
                          Current
                        </span>
                      )}
                    </td>
                    <td>
                      <strong style={{ color: "var(--rd)" }}>{formatNaira(stm.givingSum)}</strong>
                      <small style={{ color: "var(--mu)", marginLeft: 6 }}>({stm.givingCount} entries)</small>
                    </td>
                    <td>
                      <strong>{formatNaira(stm.expSum)}</strong>
                      <small style={{ color: "var(--mu)", marginLeft: 6 }}>({stm.expCount} vouchers)</small>
                    </td>
                    <td>
                      <strong style={{ color: stm.isSurplus ? "var(--tx)" : "var(--er)" }}>
                        {formatNaira(stm.net)}
                      </strong>
                    </td>
                    <td>
                      <span className={`portal-statement-badge ${stm.isSurplus ? "surplus" : "deficit"}`}>
                        {stm.isSurplus ? "Surplus" : "Deficit"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        className="portal-btn sm"
                        onClick={() => {
                          setSelectedMonth(stm.month);
                          onTabChange("give");
                        }}
                      >
                        View Entries &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Breakdown by Type (Filtered to Current Selected Month) */}
      <div className="portal-cd">
        <h3>Giving breakdown by category {selectedMonth !== "All Time" ? `(${selectedMonth})` : "(All Time)"}</h3>
        {GIVING_TYPES.map((t) => {
          const typeSum = filteredGiving
            .filter((g: any) => g.t === t)
            .reduce((acc: number, g: any) => acc + g.a, 0);
          const typePct = monthGiving ? Math.round((typeSum / monthGiving) * 100) : 0;
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

      {/* Receipt Preview Modal */}
      {viewingReceipt && (
        <ReceiptViewerModal
          receipt={viewingReceipt}
          onClose={() => setViewingReceipt(null)}
        />
      )}
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
                className={`portal-pill ${s.v === "Public" ? "ok" : s.v === "Hidden" ? "no" : ""
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
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "Custom Role") {
                          const custom = prompt("Enter custom ministry role title:", s.r);
                          if (custom && custom.trim()) {
                            onRoleChange(idx, custom.trim());
                          }
                        } else {
                          onRoleChange(idx, val);
                        }
                      }}
                    >
                      {!STAFF_ROLES.includes(s.r) && (
                        <option value={s.r}>{s.r} (Custom)</option>
                      )}
                      {STAFF_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span
                      className={`portal-pill ${s.s === "Active" ? "ok" : "go"
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
   VIEW 10: NOTIFICATIONS & ALERTS (TOP-NOTCH PASTORAL HUB)
   ===================================================================== */
function NotificationsView({
  notifications,
  notifPrefs,
  onMarkAllRead,
  onTogglePref,
  onToggleRead,
  onDismiss,
  onClearAll,
}: any) {
  const [filter, setFilter] = useState<"all" | "unread" | "visitors" | "giving" | "events">("all");

  const unreadCount = notifications.filter((n: any) => n.u).length;

  const filteredNotifications = notifications.filter((n: any) => {
    if (filter === "unread") return n.u;
    const t = (n.t || "").toLowerCase();
    if (filter === "visitors") return t.includes("visitor") || t.includes("follow-up");
    if (filter === "giving") return t.includes("gave") || t.includes("tithe") || t.includes("offering");
    if (filter === "events") return t.includes("fellowship") || t.includes("service") || t.includes("event") || t.includes("study");
    return true;
  });

  const PREF_LABELS: Record<string, { title: string; desc: string }> = {
    fu: {
      title: "First-timer guest follow-up reminders",
      desc: "Receive alerts when a newly registered guest hasn't been contacted within 48 hours",
    },
    ev: {
      title: "Service headcount & calendar event alerts",
      desc: "Daily alerts for upcoming worship services, prayer vigils, and RSVP threshold updates",
    },
    vi: {
      title: "New member & visitor registrations",
      desc: "Instant notifications whenever a newcomer is checked in via usher roster or entrance QR",
    },
  };

  const getNotifCategory = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes("visitor") || t.includes("follow-up")) return "visitor";
    if (t.includes("gave") || t.includes("tithe") || t.includes("offering") || t.includes("recorded")) return "giving";
    if (t.includes("service") || t.includes("fellowship") || t.includes("event") || t.includes("study")) return "event";
    return "general";
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "visitor":
        return <SvgIcon name="uplus" />;
      case "giving":
        return <SvgIcon name="coin" />;
      case "event":
        return <SvgIcon name="cal" />;
      default:
        return <SvgIcon name="bell" />;
    }
  };

  return (
    <>
      <div className="portal-hd">
        <div>
          <h1>Pastoral Alerts &amp; Notifications</h1>
          <p>
            Real-time ministry notifications, pastoral follow-up tasks, and congregation activity
          </p>
        </div>
        <div className="portal-acts">
          {notifications.length > 0 && (
            <>
              <button
                type="button"
                onClick={onMarkAllRead}
                className="portal-btn"
                title="Mark all notifications as read"
              >
                <SvgIcon name="check" />
                <span>Mark all read</span>
              </button>
              <button
                type="button"
                onClick={onClearAll}
                className="portal-btn"
                title="Clear all alerts"
              >
                <span>Clear all</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overview Stat KPIs */}
      <div className="portal-gs">
        <div className="portal-cd portal-st">
          <small>Total Alerts</small>
          <b>{notifications.length}</b>
        </div>
        <div className="portal-cd portal-st">
          <small>Unread Notifications</small>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <b style={{ color: unreadCount > 0 ? "var(--rd)" : "var(--tx)" }}>{unreadCount}</b>
            {unreadCount > 0 && <span className="portal-statement-badge deficit">Requires Attention</span>}
          </div>
        </div>
        <div className="portal-cd portal-st">
          <small>Delivery Channels</small>
          <b>In-App &bull; SMS Alerts</b>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="portal-cat-bar" style={{ marginBottom: 16 }}>
        <button
          type="button"
          className={`portal-cat-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <span>All Notifications</span>
          <span className="portal-cat-count">{notifications.length}</span>
        </button>
        <button
          type="button"
          className={`portal-cat-btn ${filter === "unread" ? "active" : ""}`}
          onClick={() => setFilter("unread")}
        >
          <span>Unread</span>
          <span className="portal-cat-count">{unreadCount}</span>
        </button>
        <button
          type="button"
          className={`portal-cat-btn ${filter === "visitors" ? "active" : ""}`}
          onClick={() => setFilter("visitors")}
        >
          <span>Follow-ups &amp; Visitors</span>
        </button>
        <button
          type="button"
          className={`portal-cat-btn ${filter === "giving" ? "active" : ""}`}
          onClick={() => setFilter("giving")}
        >
          <span>Finances &amp; Tithes</span>
        </button>
        <button
          type="button"
          className={`portal-cat-btn ${filter === "events" ? "active" : ""}`}
          onClick={() => setFilter("events")}
        >
          <span>Events &amp; Services</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="portal-cd" style={{ padding: "16px" }}>
        {filteredNotifications.length ? (
          <div className="portal-notif-list">
            {filteredNotifications.map((n: any) => {
              const cat = getNotifCategory(n.t);
              return (
                <div key={n.id} className={`portal-notif-card ${n.u ? "unread" : ""}`}>
                  <div className={`portal-notif-icon-wrap ${cat}`}>
                    {getCategoryIcon(cat)}
                  </div>
                  <div className="portal-notif-content">
                    <div className="portal-notif-head">
                      <h4 className="portal-notif-title">{n.t}</h4>
                      <span className="portal-notif-time">{n.w}</span>
                    </div>
                    <p className="portal-notif-body">
                      {cat === "visitor"
                        ? "Congregation newcomer requires personal follow-up call from pastoral care ministry."
                        : cat === "giving"
                          ? "Official remittance voucher generated and recorded in parish financial ledger."
                          : cat === "event"
                            ? "Upcoming service preparation and ministerial department coordination update."
                            : "System operational advisory for Grace Chapel administrators."}
                    </p>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      {n.u && (
                        <button
                          type="button"
                          onClick={() => onToggleRead(n.id)}
                          className="portal-receipt-btn"
                          style={{ fontSize: 11, padding: "2px 8px" }}
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onDismiss(n.id)}
                        className="portal-receipt-btn empty"
                        style={{ fontSize: 11, padding: "2px 8px" }}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                  {n.u && <span className="portal-notif-dot" title="Unread notification" />}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="portal-emp" style={{ padding: "40px 16px" }}>
            <div className="portal-ico">
              <SvgIcon name="bell" />
            </div>
            <h3>No notifications here</h3>
            <p>You're all caught up with your pastoral alerts and follow-ups.</p>
          </div>
        )}
      </div>

      {/* Preferences Section */}
      <div className="portal-cd" style={{ marginTop: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--rd6)", color: "var(--rd)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <SvgIcon name="gear" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Notification Delivery Channels &amp; Rules</h3>
            <small style={{ color: "var(--mu)" }}>Configure which alerts are routed to your pastoral team</small>
          </div>
        </div>

        {Object.keys(PREF_LABELS).map((k) => (
          <div key={k} className="portal-li" style={{ padding: "12px 14px" }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 14 }}>
              <strong style={{ fontSize: 13.5, display: "block", color: "var(--tx)" }}>
                {PREF_LABELS[k].title}
              </strong>
              <small style={{ color: "var(--mu)", fontSize: 12, lineHeight: 1.4, display: "block", marginTop: 2 }}>
                {PREF_LABELS[k].desc}
              </small>
            </div>
            <button
              type="button"
              className={`portal-sw ${(notifPrefs as any)[k] ? "on" : ""}`}
              onClick={() => onTogglePref(k)}
              aria-label={PREF_LABELS[k].title}
            />
          </div>
        ))}
      </div>
    </>
  );
}

/* =====================================================================
   VIEW 11: SETTINGS, PLANS & WORKSPACE CREDENTIALS
   ===================================================================== */
/* =====================================================================
   VIEW 11: SETTINGS, PLANS & WORKSPACE CREDENTIALS (LUXURY SYSTEM)
   ===================================================================== */
function SettingsView({
  church,
  plan,
  activity,
  memberCount = 12,
  sessionsCount = 6,
  eventsCount = 4,
  onSaveProfile,
  onSelectPlan,
  onExportData,
  showToast,
}: any) {
  const [activeTab, setActiveTab] = useState<"profile" | "account" | "plan" | "branches" | "data">("profile");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Logo state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Church Profile Form
  const [profileData, setProfileData] = useState({
    churchName: church.n,
    denomination: "Pentecostal",
    leadPastor: "Pastor Adewale",
    phone: "0801 234 5678",
    contactEmail: "contact@gracechapel.org",
    address: "Plot 14, Commercial Avenue, Ikeja, Lagos",
    website: "www.gracechapel.org",
    timezone: "West Africa Time (WAT)",
  });

  // Section Edit State (allows updating flexible contact fields while onboarding identity stays locked)
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState({
    address: "Plot 14, Commercial Avenue, Ikeja, Lagos",
    phone: "0801 234 5678",
    contactEmail: "contact@gracechapel.org",
    website: "www.gracechapel.org",
    timezone: "West Africa Time (WAT)",
  });

  // Account Owner Form
  const [accountData, setAccountData] = useState({
    name: "Pastor Adewale",
    phone: "0801 234 5678",
    email: "adewale@gracechapel.org",
  });

  // Password Update Form
  const [pwData, setPwData] = useState({
    cur: "",
    nw: "",
    cf: "",
  });
  const [showCur, setShowCur] = useState(false);
  const [showNw, setShowNw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  // Branches
  const [branches, setBranches] = useState<Array<{ n: string; a: string }>>([
    { n: "Main campus", a: "Plot 14, Commercial Avenue, Ikeja, Lagos" },
  ]);
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [branchForm, setBranchForm] = useState({ n: "", a: "" });

  // Danger Zone Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("reddox_church_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const loadedProfile = {
            churchName: parsed.churchName || church.n,
            denomination: parsed.denomination || "Pentecostal",
            leadPastor: parsed.leadPastor || "Pastor Adewale",
            phone: parsed.phone || "0801 234 5678",
            contactEmail: parsed.contactEmail || "contact@gracechapel.org",
            address: parsed.address || "Plot 14, Commercial Avenue, Ikeja, Lagos",
            website: parsed.website || "www.gracechapel.org",
            timezone: parsed.timezone || "West Africa Time (WAT)",
          };
          setProfileData(loadedProfile);
          setContactForm({
            address: loadedProfile.address,
            phone: loadedProfile.phone,
            contactEmail: loadedProfile.contactEmail,
            website: loadedProfile.website,
            timezone: loadedProfile.timezone,
          });
        } catch (e) { }
      }
      const savedLogo = localStorage.getItem("reddox_church_logo");
      if (savedLogo) {
        setLogoUrl(savedLogo);
      }
    }
  }, [church.n]);

  const handleSaveContactSection = () => {
    const updated = {
      ...profileData,
      ...contactForm,
    };
    setProfileData(updated);
    if (typeof window !== "undefined") {
      try {
        const existing = localStorage.getItem("reddox_church_profile");
        const prevData = existing ? JSON.parse(existing) : {};
        localStorage.setItem("reddox_church_profile", JSON.stringify({ ...prevData, ...updated }));
      } catch (e) { }
    }
    onSaveProfile?.(updated);
    setIsEditingContact(false);
    showToast?.("Parish contact details updated successfully.");
  };

  const handleCancelContactEdit = () => {
    setContactForm({
      address: profileData.address,
      phone: profileData.phone,
      contactEmail: profileData.contactEmail,
      website: profileData.website,
      timezone: profileData.timezone,
    });
    setIsEditingContact(false);
  };

  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast?.(`Copied ${key.toUpperCase()} to clipboard.`);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const calculatePwStrength = (v: string) => {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwData.cur) {
      showToast?.("Enter your current password.");
      return;
    }
    if (pwData.nw.length < 8) {
      showToast?.("New password must be at least 8 characters.");
      return;
    }
    if (pwData.nw !== pwData.cf) {
      showToast?.("Passwords do not match.");
      return;
    }
    setPwData({ cur: "", nw: "", cf: "" });
    showToast?.("Password updated successfully (Demo).");
  };

  const handleAddBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchForm.n.trim()) {
      showToast?.("Please give the branch a name.");
      return;
    }
    setBranches((prev) => [...prev, { n: branchForm.n.trim(), a: branchForm.a.trim() }]);
    setBranchForm({ n: "", a: "" });
    setIsAddBranchOpen(false);
    showToast?.("Branch added to church workspace.");
  };

  const handleRemoveBranch = (idx: number) => {
    setBranches((prev) => prev.filter((_, i) => i !== idx));
    showToast?.("Branch removed.");
  };

  const handleDeleteWorkspaceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmInput.trim() !== profileData.churchName.trim()) {
      showToast?.("Church name does not match. Workspace was not deleted.");
      return;
    }
    setIsDeleteModalOpen(false);
    setDeleteConfirmInput("");
    showToast?.("Workspace deletion is disabled in demo mode.");
  };

  const getInitials = (name: string) => {
    return (
      name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "GC"
    );
  };

  const currentPlanConfig = PLANS[plan as keyof typeof PLANS] || PLANS.starter;
  const pwStrength = calculatePwStrength(pwData.nw);
  const STRENGTH_COLORS = ["#bdc1c6", "#b3261e", "#d9902f", "#b8862d", "#6d2a3c"];

  // Quota calculation for SVG ring
  const quotaRatio = Math.min(1, memberCount / (currentPlanConfig.mem || 15));
  const strokeDashoffset = 339.3 * (1 - quotaRatio);

  const TABS_CONFIG = [
    { id: "profile", label: "Church profile", icon: "church" },
    { id: "account", label: "Account", icon: "user" },
    { id: "plan", label: "Plan & billing", icon: "coin" },
    { id: "branches", label: "Branches", icon: "pin" },
    { id: "data", label: "Audit & data", icon: "db" },
  ] as const;

  const PLAN_FEATURES: Record<string, string[]> = {
    starter: [
      "Up to 15 members quota",
      "Manual Sunday attendance",
      "Events & visitors roster",
      "Essential security protection",
    ],
    growth: [
      "Up to 1,000 members quota",
      "Instant QR check-in kiosk",
      "Core financial ledger & tithes",
      "Full export & weekly reports",
      "Essential security protection",
    ],
    pro: [
      "Up to 5,000 members quota",
      "Up to 3 multi-site campuses",
      "Advanced finance & analytics",
      "Priority server cluster",
      "Everything in Growth tier",
    ],
  };

  return (
    <div className="portal-settings-shell">
      <div className="portal-settings-wrap">
        {/* Workspace Command Topbar */}
        <div className="portal-settings-topbar">
          <div className="portal-settings-crumb">
            <span className="portal-crumb-node">
              <SvgIcon name="church" />
              <span>{profileData.churchName}</span>
            </span>
            <span className="portal-crumb-sep">/</span>
            <span style={{ fontWeight: 600 }}>Workspace Settings</span>
            <span className="portal-crumb-sep">/</span>
            <span className="portal-crumb-active">
              {TABS_CONFIG.find((t) => t.id === activeTab)?.label}
            </span>
          </div>

          <div className="portal-settings-meta-chips">
            <div className="portal-meta-chip">
              <span className="portal-status-dot-green" />
              <span>Live Node: <strong>af-south-1</strong></span>
            </div>
            <div className="portal-meta-chip">
              <SvgIcon name="shield" />
              <span>Role: <strong>Level 1 Admin</strong></span>
            </div>
            <div className="portal-meta-chip">
              <SvgIcon name="lock" />
              <span>Tenant: <strong>RDX-WS-84920</strong></span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="portal-settings-hero">
          <span className="portal-rn" />
          <span className="portal-rn" />
          <div className="portal-hid">
            <div
              className="portal-av"
              title="Registered Church Emblem"
              style={{ cursor: "default" }}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Church logo" />
              ) : (
                getInitials(profileData.churchName)
              )}
              <b>
                <SvgIcon name="church" />
              </b>
            </div>
            <div>
              <h1>{profileData.churchName}</h1>
              <p>{profileData.denomination} &bull; Church Workspace</p>
              <div className="portal-bdg">
                <span className="gd">{currentPlanConfig.n} plan</span>
                <span>Owner: {accountData.name}</span>
              </div>
            </div>
            <div className="portal-hs">
              <div>
                <b>{memberCount}</b>
                <small>Members</small>
              </div>
              <div>
                <b>{branches.length}</b>
                <small>Branch{branches.length > 1 ? "es" : ""}</small>
              </div>
              <div>
                <b>{sessionsCount}</b>
                <small>Sessions</small>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <nav className="portal-tabs-nav" aria-label="Settings sections">
          {TABS_CONFIG.map((t) => (
            <button
              key={t.id}
              type="button"
              className={activeTab === t.id ? "on" : ""}
              onClick={() => setActiveTab(t.id)}
            >
              <SvgIcon name={t.icon} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        {/* ==============================================================
            TAB 1: CHURCH PROFILE (READ-ONLY ONBOARDING RECORD)
            ============================================================== */}
        {activeTab === "profile" && (
          <div>
            {/* Section 1: Church Identity */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="church" />
                </div>
                <h3>Church identity</h3>
                <p>Primary ministry identification parameters recorded during church onboarding.</p>
              </div>
              <div>
                <div className="portal-cred-grid">
                  <div className="portal-cred-tile">
                    <div className="portal-cred-tile-head">
                      <span className="portal-cred-tile-label">
                        <SvgIcon name="church" />
                        <span>Registered Church Name</span>
                      </span>
                      <span className="portal-ro-tag-locked">
                        <SvgIcon name="lock" />
                        <span>Locked</span>
                      </span>
                    </div>
                    <div className="portal-cred-tile-val">{profileData.churchName}</div>
                    <div className="portal-cred-tile-sub">Primary workspace identity registered during onboarding</div>
                  </div>

                  <div className="portal-cred-tile">
                    <div className="portal-cred-tile-head">
                      <span className="portal-cred-tile-label">
                        <SvgIcon name="user" />
                        <span>Denomination</span>
                      </span>
                      <span className="portal-ro-tag-locked">
                        <SvgIcon name="lock" />
                        <span>Locked</span>
                      </span>
                    </div>
                    <div className="portal-cred-tile-val">{profileData.denomination}</div>
                    <div className="portal-cred-tile-sub">Liturgical classification and ecclesiastical structure</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "center" }}>
                  <span className="portal-verified-chip">
                    <SvgIcon name="check" />
                    <span>Verified Onboarding Identity</span>
                  </span>
                </div>
                <p className="portal-hint">
                  Church name and denomination were registered during account initialization and are locked for multi-tenant database compliance.
                </p>
              </div>
            </section>

            {/* Section 2: Contact Details */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="pin" />
                </div>
                <h3>Contact details</h3>
                <p>Registered address, primary contact lines, and regional timezone.</p>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div>
                    <h4 style={{ margin: "0 0 2px", fontSize: 15, fontWeight: 700, color: "var(--tx)" }}>
                      Parish Contact Channels
                    </h4>
                    <small style={{ color: "var(--mu)" }}>
                      {isEditingContact
                        ? "Edit your church's address, phone, email, and public website below."
                        : "Public channels used by parish members and visitors."}
                    </small>
                  </div>
                  <button
                    type="button"
                    className={`portal-btn sm ${isEditingContact ? "" : "p"}`}
                    onClick={() => {
                      if (isEditingContact) {
                        handleCancelContactEdit();
                      } else {
                        setIsEditingContact(true);
                      }
                    }}
                  >
                    <SvgIcon name={isEditingContact ? "out" : "gear"} />
                    <span>{isEditingContact ? "Cancel Editing" : "Edit this section"}</span>
                  </button>
                </div>

                {isEditingContact ? (
                  /* Editable Mode for Contact Fields */
                  <div className="portal-edit-section-box">
                    <div className="portal-edit-badge">
                      <SvgIcon name="gear" />
                      <span>Editing Parish Contact Channels</span>
                    </div>

                    <div className="portal-fg">
                      <div className="portal-field w">
                        <label>
                          <span>Address or parish location</span>
                          <span className="opt">Editable</span>
                        </label>
                        <div className="portal-input-wrap">
                          <SvgIcon name="pin" />
                          <input
                            value={contactForm.address}
                            onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                            placeholder="Street, area or landmark"
                          />
                        </div>
                      </div>

                      <div className="portal-field">
                        <label>
                          <span>Phone number</span>
                          <span className="opt">Editable</span>
                        </label>
                        <div className="portal-input-wrap">
                          <SvgIcon name="call" />
                          <input
                            type="tel"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            placeholder="0801 234 5678"
                          />
                        </div>
                      </div>

                      <div className="portal-field">
                        <label>
                          <span>Contact email</span>
                          <span className="opt">Editable</span>
                        </label>
                        <div className="portal-input-wrap">
                          <SvgIcon name="mail" />
                          <input
                            type="email"
                            value={contactForm.contactEmail}
                            onChange={(e) => setContactForm({ ...contactForm, contactEmail: e.target.value })}
                            placeholder="contact@yourchurch.org"
                          />
                        </div>
                      </div>

                      <div className="portal-field">
                        <label>
                          <span>Website</span>
                          <span className="opt">Editable</span>
                        </label>
                        <div className="portal-input-wrap">
                          <SvgIcon name="globe" />
                          <input
                            value={contactForm.website}
                            onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })}
                            placeholder="www.yourchurch.org"
                          />
                        </div>
                      </div>

                      <div className="portal-field">
                        <label>Timezone</label>
                        <div className="portal-input-wrap">
                          <SvgIcon name="clock" />
                          <select
                            value={contactForm.timezone}
                            onChange={(e) => setContactForm({ ...contactForm, timezone: e.target.value })}
                          >
                            <option value="West Africa Time (WAT)">West Africa Time (WAT - UTC+1)</option>
                            <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
                            <option value="East Africa Time (EAT)">East Africa Time (EAT - UTC+3)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="portal-edit-actions">
                      <button
                        type="button"
                        className="portal-btn sm p"
                        onClick={handleSaveContactSection}
                      >
                        <SvgIcon name="check" />
                        <span>Save Section Updates</span>
                      </button>
                      <button
                        type="button"
                        className="portal-btn sm"
                        onClick={handleCancelContactEdit}
                      >
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Read-Only Mode for Contact Fields */
                  <div>
                    <div className="portal-cred-grid">
                      <div className="portal-cred-tile w">
                        <div className="portal-cred-tile-head">
                          <span className="portal-cred-tile-label">
                            <SvgIcon name="pin" />
                            <span>Parish Address / Physical Location</span>
                          </span>
                          <span className="portal-ro-tag-gold">Parish Location</span>
                        </div>
                        <div className="portal-cred-tile-val">{profileData.address || "Plot 14, Commercial Avenue, Ikeja, Lagos"}</div>
                        <div className="portal-cred-tile-sub">Physical campus visited by congregation and guests</div>
                      </div>

                      <div className="portal-cred-tile">
                        <div className="portal-cred-tile-head">
                          <span className="portal-cred-tile-label">
                            <SvgIcon name="call" />
                            <span>Office Phone</span>
                          </span>
                          <span className="portal-ro-tag-gold">Official Line</span>
                        </div>
                        <div className="portal-cred-tile-val">{profileData.phone || "0801 234 5678"}</div>
                        <div className="portal-cred-tile-sub">Church administrative and member helpline</div>
                      </div>

                      <div className="portal-cred-tile">
                        <div className="portal-cred-tile-head">
                          <span className="portal-cred-tile-label">
                            <SvgIcon name="mail" />
                            <span>Contact Email</span>
                          </span>
                          <span className="portal-ro-tag-gold">Official Mail</span>
                        </div>
                        <div className="portal-cred-tile-val">{profileData.contactEmail || "contact@gracechapel.org"}</div>
                        <div className="portal-cred-tile-sub">Official communication and general inquiries</div>
                      </div>

                      <div className="portal-cred-tile">
                        <div className="portal-cred-tile-head">
                          <span className="portal-cred-tile-label">
                            <SvgIcon name="globe" />
                            <span>Public Website</span>
                          </span>
                          <span className="portal-ro-tag-gold">Web Portal</span>
                        </div>
                        <div className="portal-cred-tile-val">{profileData.website || "www.gracechapel.org"}</div>
                        <div className="portal-cred-tile-sub">Parish portal and online streaming URL</div>
                      </div>

                      <div className="portal-cred-tile">
                        <div className="portal-cred-tile-head">
                          <span className="portal-cred-tile-label">
                            <SvgIcon name="clock" />
                            <span>Regional Timezone</span>
                          </span>
                          <span className="portal-ro-tag-gold">WAT (UTC+1)</span>
                        </div>
                        <div className="portal-cred-tile-val">{profileData.timezone || "West Africa Time (WAT)"}</div>
                        <div className="portal-cred-tile-sub">Service schedules, kiosk attendance &amp; event timestamps</div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 18,
                        padding: "12px 16px",
                        borderRadius: 14,
                        background: "rgba(109, 42, 60, 0.05)",
                        border: "1px solid rgba(109, 42, 60, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 13,
                        color: "var(--tx)",
                      }}
                    >
                      <div style={{ color: "var(--bl)", display: "flex", flexShrink: 0 }}>
                        <SvgIcon name="lock" />
                      </div>
                      <span>
                        <strong>Onboarding Protection:</strong> Core church identity (Name &amp; Denomination) is locked. You can click <strong>&ldquo;Edit this section&rdquo;</strong> above to update your contact channels.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ==============================================================
          TAB 2: ACCOUNT & SECURITY
          ============================================================== */}
        {activeTab === "account" && (
          <div>
            {/* Section 1: Your Details */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="user" />
                </div>
                <h3>Your details</h3>
                <p>The registered church administrator who owns this ministry workspace.</p>
              </div>
              <div>
                {/* Administrator Identity Banner */}
                <div className="portal-admin-id-banner">
                  <div className="portal-admin-id-left">
                    <div className="portal-admin-id-avatar">
                      <SvgIcon name="user" />
                    </div>
                    <div className="portal-admin-id-text">
                      <h4>{accountData.name}</h4>
                      <p>Lead Administrator &bull; Registered Owner of {profileData.churchName}</p>
                    </div>
                  </div>
                  <span className="portal-ro-tag-green">
                    <SvgIcon name="check" />
                    <span>Level 1 Authority</span>
                  </span>
                </div>

                <div className="portal-cred-grid">
                  <div className="portal-cred-tile">
                    <div className="portal-cred-tile-head">
                      <span className="portal-cred-tile-label">
                        <SvgIcon name="user" />
                        <span>Full Name</span>
                      </span>
                      <span className="portal-ro-tag-locked">
                        <SvgIcon name="lock" />
                        <span>Admin</span>
                      </span>
                    </div>
                    <div className="portal-cred-tile-val">{accountData.name}</div>
                    <div className="portal-cred-tile-sub">Primary contact recorded during church onboarding</div>
                  </div>

                  <div className="portal-cred-tile">
                    <div className="portal-cred-tile-head">
                      <span className="portal-cred-tile-label">
                        <SvgIcon name="call" />
                        <span>Direct Phone</span>
                      </span>
                      <span className="portal-ro-tag-gold">Verified</span>
                    </div>
                    <div className="portal-cred-tile-val">{accountData.phone}</div>
                    <div className="portal-cred-tile-sub">Administrative line for priority notices &amp; 2FA</div>
                  </div>

                  <div className="portal-cred-tile w">
                    <div className="portal-cred-tile-head">
                      <span className="portal-cred-tile-label">
                        <SvgIcon name="lock" />
                        <span>Primary Sign-In Email Address</span>
                      </span>
                      <span className="portal-ro-tag-locked">
                        <SvgIcon name="lock" />
                        <span>Primary Auth</span>
                      </span>
                    </div>
                    <div className="portal-cred-tile-val">{accountData.email}</div>
                    <div className="portal-cred-tile-sub" style={{ color: "var(--tx)", marginTop: 8 }}>
                      Your sign-in email is cryptographically locked for tenant security. To initiate an administrative ownership transfer, contact REDDOX Support.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Password */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="key" />
                </div>
                <h3>Password</h3>
                <p>Use at least 8 characters, combining uppercase, lowercase, numbers, and symbols.</p>
              </div>
              <div>
                <form onSubmit={handleUpdatePassword}>
                  <div className="portal-fg">
                    <div className="portal-field w">
                      <label>Current password</label>
                      <div className="portal-input-wrap pw">
                        <SvgIcon name="lock" />
                        <input
                          type={showCur ? "text" : "password"}
                          value={pwData.cur}
                          onChange={(e) => setPwData({ ...pwData, cur: e.target.value })}
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          className="portal-eye-btn"
                          onClick={() => setShowCur(!showCur)}
                          aria-label="Toggle password visibility"
                        >
                          <SvgIcon name={showCur ? "eyeoff" : "eye"} />
                        </button>
                      </div>
                    </div>

                    <div className="portal-field">
                      <label>New password</label>
                      <div className="portal-input-wrap pw">
                        <SvgIcon name="lock" />
                        <input
                          type={showNw ? "text" : "password"}
                          value={pwData.nw}
                          onChange={(e) => setPwData({ ...pwData, nw: e.target.value })}
                          placeholder="At least 8 characters"
                          required
                        />
                        <button
                          type="button"
                          className="portal-eye-btn"
                          onClick={() => setShowNw(!showNw)}
                          aria-label="Toggle password visibility"
                        >
                          <SvgIcon name={showNw ? "eyeoff" : "eye"} />
                        </button>
                      </div>
                      {/* Password Strength Meter */}
                      <div className="portal-mt">
                        {[0, 1, 2, 3].map((idx) => (
                          <i
                            key={idx}
                            style={{
                              background:
                                pwData.nw && idx < Math.max(pwStrength, 1)
                                  ? STRENGTH_COLORS[pwStrength]
                                  : "var(--bd)",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="portal-field">
                      <label>Confirm new password</label>
                      <div className="portal-input-wrap pw">
                        <SvgIcon name="lock" />
                        <input
                          type={showCf ? "text" : "password"}
                          value={pwData.cf}
                          onChange={(e) => setPwData({ ...pwData, cf: e.target.value })}
                          placeholder="Repeat new password"
                          required
                        />
                        <button
                          type="button"
                          className="portal-eye-btn"
                          onClick={() => setShowCf(!showCf)}
                          aria-label="Toggle password visibility"
                        >
                          <SvgIcon name={showCf ? "eyeoff" : "eye"} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <button type="submit" className="portal-btn p">
                      Update password
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Section 3: Where you're signed in */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="shield" />
                </div>
                <h3>Where you&rsquo;re signed in</h3>
                <p>Active security sessions across your authorized browsers and church administration devices.</p>
              </div>
              <div>
                <div className="portal-ssn">
                  <span className="ic">
                    <SvgIcon name="pc" />
                  </span>
                  <p>
                    <b>This workstation &bull; Windows Chrome</b>
                    <br />
                    <small>Active now &bull; IP: 102.89.44.12 &bull; Lagos, NG</small>
                  </p>
                  <span className="portal-verified-chip">Current</span>
                </div>

                <div className="portal-ssn">
                  <span className="ic">
                    <SvgIcon name="ph" />
                  </span>
                  <p>
                    <b>iPhone 15 &bull; REDDOX Mobile Check-in</b>
                    <br />
                    <small>2 days ago &bull; Ikeja Branch</small>
                  </p>
                </div>

                <div style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    className="portal-btn sm"
                    onClick={() => showToast?.("All other remote devices signed out.")}
                  >
                    Sign out other devices
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==============================================================
          TAB 3: PLAN & BILLING
          ============================================================== */}
        {activeTab === "plan" && (
          <div>
            {/* Section 1: Current Plan & Usage Gauge */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="coin" />
                </div>
                <h3>Current plan</h3>
                <p>Your subscription sets your member capacity and advanced ministry tooling permissions.</p>
              </div>
              <div>
                <div className="portal-us">
                  <div className="portal-rgw">
                    <svg viewBox="0 0 120 120">
                      <circle className="b" cx="60" cy="60" r="54" />
                      <circle
                        className="f"
                        cx="60"
                        cy="60"
                        r="54"
                        style={{ strokeDashoffset }}
                      />
                    </svg>
                    <div>
                      <span>
                        {memberCount}
                        <small>of {currentPlanConfig.mem.toLocaleString("en-NG")}</small>
                      </span>
                    </div>
                  </div>

                  <div>
                    <div style={{ font: "600 26px 'Playfair Display', Georgia, serif", color: "var(--tx)" }}>
                      {currentPlanConfig.n} Tier
                    </div>
                    <div style={{ color: "var(--mu)", margin: "4px 0 10px", fontSize: 15, fontWeight: 600 }}>
                      {currentPlanConfig.pr} {plan !== "starter" ? "" : "(Free Forever)"}
                    </div>
                    <p className="portal-hint" style={{ maxWidth: 420 }}>
                      Essential member directory security, offline records backup, and access to all existing profiles are included on every tier.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: 3-Tier Cards */}
            <div className="portal-pcs">
              {(["starter", "growth", "pro"] as const).map((k) => {
                const isCurrent = plan === k;
                const pItem = PLANS[k];
                const cardClass = `portal-pcd ${k === "growth" ? "g" : k === "pro" ? "k" : ""} ${isCurrent ? "on" : ""
                  }`;

                return (
                  <div key={k} className={cardClass}>
                    {isCurrent && <span className="tg">CURRENT</span>}
                    <h4>{pItem.n}</h4>
                    <div className="pr">
                      {pItem.pr}
                      <small>{k === "starter" ? " forever" : ""}</small>
                    </div>
                    <ul>
                      {PLAN_FEATURES[k].map((feat, fIdx) => (
                        <li key={fIdx}>{feat}</li>
                      ))}
                    </ul>

                    {isCurrent ? (
                      <button type="button" className="portal-btn" disabled style={{ opacity: 0.7 }}>
                        Active Plan
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="portal-btn p"
                        onClick={() => onSelectPlan(k)}
                      >
                        Switch to {pItem.n} (Demo)
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Section 3: Invoices & Billing History */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="db" />
                </div>
                <h3>Billing history</h3>
                <p>Receipts, Paystack transaction IDs, and value-added tax invoices.</p>
              </div>
              <div>
                <div className="portal-emp">
                  <div className="portal-ch" style={{ background: "var(--bl2)", color: "var(--bl)" }}>
                    <SvgIcon name="dl" />
                  </div>
                  <b style={{ color: "var(--tx)", fontSize: 16 }}>No paid invoices yet</b>
                  <span style={{ fontSize: 13, marginTop: 4 }}>
                    Invoices and official VAT tax receipts will appear here once automated gateway billing is connected.
                  </span>
                </div>
                <p className="portal-hint">
                  If a subscription ever lapses, your church records always remain available to read, review, and export.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* ==============================================================
          TAB 4: BRANCHES & MULTI-CAMPUS
          ============================================================== */}
        {activeTab === "branches" && (
          <div>
            {plan !== "pro" && (
              <div className="portal-lkc">
                <div className="portal-ch">
                  <SvgIcon name="lock" />
                </div>
                <div>
                  <b>Multiple branches are included on Pro</b>
                  <p>
                    Your current {currentPlanConfig.n} plan includes 1 centralized church workspace. Pro supports up to 3 separate branch campuses.
                  </p>
                </div>
                <button
                  type="button"
                  className="portal-btn sm p"
                  onClick={() => setActiveTab("plan")}
                >
                  View Pro plan
                </button>
              </div>
            )}

            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="pin" />
                </div>
                <h3>Branches</h3>
                <p>
                  {plan === "pro"
                    ? `${branches.length} of 3 branch campuses utilized.`
                    : "Your primary church campus."}
                </p>
              </div>
              <div>
                <div className="portal-bg3">
                  {branches.map((b, i) => (
                    <div key={i} className="portal-brc">
                      <div className="ic">
                        <SvgIcon name="church" />
                      </div>
                      <b>{b.n}</b>
                      {i === 0 && (
                        <span className="portal-verified-chip" style={{ marginLeft: 6 }}>
                          Main
                        </span>
                      )}
                      <p className="portal-hint">{b.a || "No address specified yet"}</p>
                      {i > 0 && (
                        <button
                          type="button"
                          className="portal-btn sm"
                          style={{ marginTop: 12 }}
                          onClick={() => handleRemoveBranch(i)}
                        >
                          Remove branch
                        </button>
                      )}
                    </div>
                  ))}

                  {plan === "pro" && branches.length < 3 && (
                    <button
                      type="button"
                      className="portal-brc add"
                      onClick={() => setIsAddBranchOpen(true)}
                    >
                      <span>
                        <SvgIcon name="plus" />
                        <br />
                        Add campus branch
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==============================================================
          TAB 5: AUDIT, DATA & READ-ONLY SYSTEM ARCHITECTURE
          ============================================================== */}
        {activeTab === "data" && (
          <div>
            {/* Section 1: Your Data Snapshot */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="db" />
                </div>
                <h3>Your data</h3>
                <p>A live snapshot of active ministry entities stored within this church workspace.</p>
              </div>
              <div>
                <div className="portal-st3">
                  <div>
                    <b>{memberCount}</b>
                    <small>Members</small>
                  </div>
                  <div>
                    <b>{sessionsCount}</b>
                    <small>Sessions</small>
                  </div>
                  <div>
                    <b>{eventsCount}</b>
                    <small>Events</small>
                  </div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <button
                    type="button"
                    className="portal-btn p"
                    onClick={onExportData}
                  >
                    <SvgIcon name="dl" />
                    <span>Export complete database (JSON / CSV)</span>
                  </button>
                </div>
                <p className="portal-hint">
                  You can download an encrypted snapshot of all church members, tithe records, and registers at any time on every plan.
                </p>
              </div>
            </section>

            {/* Section 2: Protected System Architecture (READ-ONLY CREDENTIALS) */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="shield" />
                </div>
                <h3>System credentials</h3>
                <p>Cryptographically protected tenant parameters configured on the REDDOX Cloud infrastructure.</p>
              </div>
              <div>
                <div className="portal-settings-grid">
                  {/* Card 1: Workspace Identifier */}
                  <div className="portal-ro-card">
                    <div className="portal-ro-head">
                      <span className="portal-ro-label">
                        <SvgIcon name="lock" />
                        <span>Workspace Identifier</span>
                      </span>
                      <span className="portal-ro-tag">Read-Only</span>
                    </div>
                    <div className="portal-ro-body">
                      <span className="portal-ro-val mono">RDX-WS-84920</span>
                      <button
                        type="button"
                        className="portal-copy-btn"
                        onClick={() => handleCopy("RDX-WS-84920", "ws")}
                        title="Copy Workspace ID"
                      >
                        <SvgIcon name="copy" />
                        <span>{copiedKey === "ws" ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Dedicated Tenant URL */}
                  <div className="portal-ro-card">
                    <div className="portal-ro-head">
                      <span className="portal-ro-label">
                        <SvgIcon name="lock" />
                        <span>Dedicated Tenant URL</span>
                      </span>
                      <span className="portal-ro-tag">Configured</span>
                    </div>
                    <div className="portal-ro-body">
                      <span className="portal-ro-val mono">gracechapel.reddox.app</span>
                      <button
                        type="button"
                        className="portal-copy-btn"
                        onClick={() => handleCopy("https://gracechapel.reddox.app", "url")}
                        title="Copy Subdomain"
                      >
                        <SvgIcon name="copy" />
                        <span>{copiedKey === "url" ? "Copied!" : "Copy"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Account Authority */}
                  <div className="portal-ro-card">
                    <div className="portal-ro-head">
                      <span className="portal-ro-label">
                        <SvgIcon name="shield" />
                        <span>Administrative Role</span>
                      </span>
                      <span className="portal-ro-tag">Level 1 Authority</span>
                    </div>
                    <div className="portal-ro-body">
                      <span className="portal-ro-val">Lead Administrator (Owner)</span>
                      <span className="portal-verified-chip">Verified</span>
                    </div>
                  </div>

                  {/* Card 4: Datacenter Region */}
                  <div className="portal-ro-card">
                    <div className="portal-ro-head">
                      <span className="portal-ro-label">
                        <SvgIcon name="globe" />
                        <span>Hosting Node &amp; Cluster</span>
                      </span>
                      <span className="portal-status-online">
                        <span className="portal-status-dot" />
                        <span>Online (99.99%)</span>
                      </span>
                    </div>
                    <div className="portal-ro-body">
                      <span className="portal-ro-val">af-south-1 (Lagos Primary Node)</span>
                      <small style={{ color: "var(--mu)", fontSize: 11 }}>18ms latency</small>
                    </div>
                  </div>

                  {/* Card 5: Security Protocol */}
                  <div className="portal-ro-card">
                    <div className="portal-ro-head">
                      <span className="portal-ro-label">
                        <SvgIcon name="lock" />
                        <span>Data Encryption Protocol</span>
                      </span>
                      <span className="portal-ro-tag">AES-256</span>
                    </div>
                    <div className="portal-ro-body">
                      <span className="portal-ro-val">TLS 1.3 &bull; End-to-End Encrypted</span>
                      <span className="portal-verified-chip">Strict HTTPS</span>
                    </div>
                  </div>

                  {/* Card 6: Database Registration */}
                  <div className="portal-ro-card">
                    <div className="portal-ro-head">
                      <span className="portal-ro-label">
                        <SvgIcon name="clock" />
                        <span>Registration &amp; Backup Node</span>
                      </span>
                      <span className="portal-ro-tag">Active</span>
                    </div>
                    <div className="portal-ro-body">
                      <span className="portal-ro-val">Registered Nov 12, 2024</span>
                      <small style={{ color: "var(--mu)", fontSize: 11 }}>Auto-Sync: 02:00 WAT</small>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Audit History Timeline */}
            <section className="portal-sec">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="clock" />
                </div>
                <h3>Audit history</h3>
                <p>Recent administrative changes logged across your parish workspace.</p>
              </div>
              <div>
                <div className="portal-tln">
                  {activity.slice(0, 6).map((x: any, i: number) => (
                    <div key={i} style={{ animationDelay: `${i * 70}ms` }}>
                      <b>{x.t || x[0]}</b>
                      <small>
                        {accountData.name} &bull; {x.w || x[1] || "Recently"}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4: Danger Zone */}
            <section className="portal-sec portal-dz">
              <div className="portal-sh">
                <div className="portal-ch">
                  <SvgIcon name="trash" />
                </div>
                <h3>Danger zone</h3>
                <p>This action is irreversible and permanently removes church data.</p>
              </div>
              <div>
                <p style={{ margin: "0 0 14px", color: "var(--tx)", fontSize: 13.5 }}>
                  Deleting the church workspace permanently removes all member lists, tithe histories, attendance records, and media entries.
                </p>
                <button
                  type="button"
                  className="portal-btn-dg"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <SvgIcon name="trash" />
                  <span>Delete church workspace</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ==============================================================
          MODAL: ADD CAMPUS BRANCH
          ============================================================== */}
        {isAddBranchOpen && (
          <div
            className="portal-mo"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsAddBranchOpen(false);
            }}
          >
            <form className="portal-md" onSubmit={handleAddBranchSubmit}>
              <h2>Add Campus Branch</h2>
              <div className="portal-field" style={{ marginBottom: 14 }}>
                <label>Branch name *</label>
                <div className="portal-input-wrap">
                  <SvgIcon name="church" />
                  <input
                    value={branchForm.n}
                    onChange={(e) => setBranchForm({ ...branchForm, n: e.target.value })}
                    placeholder="e.g. Lekki Campus"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="portal-field" style={{ marginBottom: 14 }}>
                <label>Address / location</label>
                <div className="portal-input-wrap">
                  <SvgIcon name="pin" />
                  <input
                    value={branchForm.a}
                    onChange={(e) => setBranchForm({ ...branchForm, a: e.target.value })}
                    placeholder="Street, area or landmark"
                  />
                </div>
              </div>

              <div className="portal-mf">
                <button
                  type="button"
                  className="portal-btn"
                  onClick={() => setIsAddBranchOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="portal-btn p">
                  Add branch
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ==============================================================
          MODAL: CONFIRM WORKSPACE DELETION
          ============================================================== */}
        {isDeleteModalOpen && (
          <div
            className="portal-mo"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsDeleteModalOpen(false);
            }}
          >
            <form className="portal-md" onSubmit={handleDeleteWorkspaceSubmit}>
              <h2 style={{ color: "var(--er)" }}>Delete Church Workspace</h2>
              <p style={{ margin: "0 0 14px", fontSize: 13.5, color: "var(--tx)" }}>
                This will permanently purge all database records for <b>{profileData.churchName}</b>.
                To confirm, please type <strong>{profileData.churchName}</strong> below:
              </p>

              <div className="portal-field" style={{ marginBottom: 16 }}>
                <div className="portal-input-wrap">
                  <SvgIcon name="church" />
                  <input
                    value={deleteConfirmInput}
                    onChange={(e) => setDeleteConfirmInput(e.target.value)}
                    placeholder={`Type "${profileData.churchName}"`}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="portal-mf">
                <button
                  type="button"
                  className="portal-btn"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteConfirmInput("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="portal-btn-dg"
                  disabled={deleteConfirmInput.trim() !== profileData.churchName.trim()}
                >
                  Permanently Delete
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
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
   RECEIPT VIEWER MODAL
   ===================================================================== */
function ReceiptViewerModal({ receipt, onClose }: { receipt: any; onClose: () => void }) {
  if (!receipt) return null;

  return (
    <div className="portal-mo" onClick={onClose}>
      <div
        className="portal-md portal-receipt-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 540 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "var(--rd6)",
                color: "var(--rd)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SvgIcon name="file" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>
                {receipt.title || "Transaction Slip"}
              </h3>
              <small style={{ color: "var(--mu)", fontSize: 12 }}>
                {receipt.date || "Today"} · {receipt.category || "Treasury"}
              </small>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="portal-srch-clear"
            style={{ position: "static", transform: "none" }}
            title="Close modal"
          >
            ✕
          </button>
        </div>

        {receipt.image ? (
          <div
            style={{
              marginBottom: 16,
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid var(--bd)",
              background: "#0c0a09",
              textAlign: "center",
              maxHeight: 380,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 6,
            }}
          >
            <img
              src={receipt.image}
              alt="Receipt Voucher"
              style={{
                maxWidth: "100%",
                maxHeight: 360,
                objectFit: "contain",
                display: "block",
                borderRadius: 6,
              }}
            />
          </div>
        ) : (
          <div className="portal-receipt-voucher">
            <div className="portal-receipt-voucher-header">
              <span className="portal-receipt-seal">OFFICIAL TREASURY VOUCHER</span>
              <span className="portal-receipt-ref">
                REF: {receipt.ref || `TX-${Math.floor(100000 + Math.random() * 900000)}`}
              </span>
            </div>
            <div className="portal-receipt-voucher-body">
              <div className="portal-receipt-row">
                <span>Category / Fund</span>
                <strong>{receipt.category || "General Fund"}</strong>
              </div>
              <div className="portal-receipt-row">
                <span>Payer / Payee</span>
                <strong>{receipt.party || "Congregation Member"}</strong>
              </div>
              <div className="portal-receipt-row">
                <span>Date Logged</span>
                <strong>{receipt.date || "Today"}</strong>
              </div>
              <div className="portal-receipt-row total">
                <span>Amount Remitted</span>
                <strong style={{ color: "var(--rd)", fontSize: 18, fontWeight: 800 }}>
                  {formatNaira(receipt.amount || 0)}
                </strong>
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16,
            paddingTop: 12,
            borderTop: "1px solid var(--bd)",
          }}
        >
          <span style={{ fontSize: 12, color: "var(--mu)" }}>
            {receipt.fileName ? receipt.fileName : "Audited digital treasury record"}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {receipt.image && (
              <a
                href={receipt.image}
                download={receipt.fileName || "receipt.png"}
                className="portal-btn sm"
                style={{ textDecoration: "none" }}
              >
                Download Slip
              </a>
            )}
            <button type="button" onClick={onClose} className="portal-btn sm p">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   MODAL 3: RECORD GIVING (WITH SLIP / RECEIPT UPLOAD)
   ===================================================================== */
function RecordGivingModal({ members, onClose, onSave }: any) {
  const [tab, setTab] = useState<"manual" | "upload">("manual");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const manualFileInputRef = useRef<HTMLInputElement>(null);

  const [memberId, setMemberId] = useState(members[0]?.id || 1);
  const [type, setType] = useState("Tithe");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Receipt image attachment state
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>("");
  const [receiptName, setReceiptName] = useState<string>("");

  const processFile = (file: File) => {
    setReceiptFile(file);
    setReceiptName(file.name);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        setReceiptPreview(loadEv.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(amount);
    if (!(a > 0)) {
      setError("Please enter a valid donation amount above zero.");
      return;
    }
    onSave({
      m: Number(memberId),
      t: type,
      a,
      receiptImage: receiptPreview || undefined,
      receiptName: receiptName || undefined,
      ref: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <div className="portal-md" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
        <h2>Record giving &amp; tithe</h2>

        {/* Tab Toggle */}
        <div className="portal-tabs-toggle" style={{ marginBottom: 16 }}>
          <button
            type="button"
            className={`portal-tab-btn ${tab === "manual" ? "active" : ""}`}
            onClick={() => setTab("manual")}
          >
            Manual Entry
          </button>
          <button
            type="button"
            className={`portal-tab-btn ${tab === "upload" ? "active" : ""}`}
            onClick={() => setTab("upload")}
          >
            Upload Slip / Receipt
          </button>
        </div>

        {/* TAB 1: MANUAL ENTRY */}
        {tab === "manual" && (
          <form onSubmit={handleSubmit} noValidate>
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

            {/* Receipt Attachment Section */}
            <div className="portal-fi">
              <label>Attach Payment Proof / Bank Slip (Optional)</label>
              <input
                ref={manualFileInputRef}
                type="file"
                accept="image/*,.pdf"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {receiptName ? (
                <div className="portal-receipt-thumb">
                  {receiptPreview ? (
                    <img src={receiptPreview} alt="Receipt preview" className="portal-receipt-thumb-img" />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: 6, background: "var(--rd6)", color: "var(--rd)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <SvgIcon name="file" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {receiptName}
                    </div>
                    <small style={{ color: "var(--mu)" }}>
                      {receiptFile ? formatFileSize(receiptFile.size) : "Attached"}
                    </small>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReceiptFile(null);
                      setReceiptPreview("");
                      setReceiptName("");
                    }}
                    className="portal-srch-clear"
                    style={{ position: "static", transform: "none" }}
                    title="Remove attachment"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="portal-receipt-btn"
                  onClick={() => manualFileInputRef.current?.click()}
                  style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                >
                  <SvgIcon name="upload" />
                  <span>Attach Bank Slip / Transfer Screenshot</span>
                </button>
              )}
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
        )}

        {/* TAB 2: UPLOAD RECEIPT / SLIP FIRST */}
        {tab === "upload" && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {!receiptName ? (
              <div
                className="portal-dropzone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="portal-dropzone-icon">
                  <SvgIcon name="upload" />
                </div>
                <h4>Upload Bank Transfer Slip or Cheque</h4>
                <p>Click or drag a screenshot of bank transfer, POS slip or cheque</p>
                <div className="portal-file-badge">
                  <SvgIcon name="image" />
                  <span>JPG, PNG</span>
                  <span className="portal-dot-sep">·</span>
                  <SvgIcon name="file" />
                  <span>PDF Receipt</span>
                </div>
              </div>
            ) : (
              <div>
                {/* Uploaded File Info Card */}
                <div className="portal-receipt-thumb" style={{ marginBottom: 16 }}>
                  {receiptPreview ? (
                    <img src={receiptPreview} alt="Receipt preview" className="portal-receipt-thumb-img" />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: 6, background: "var(--rd6)", color: "var(--rd)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <SvgIcon name="file" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {receiptName}
                    </div>
                    <small style={{ color: "var(--mu)" }}>
                      {receiptFile ? formatFileSize(receiptFile.size) : "Ready"} · Verified payment proof
                    </small>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setReceiptFile(null);
                      setReceiptPreview("");
                      setReceiptName("");
                    }}
                    className="portal-srch-clear"
                    style={{ position: "static", transform: "none" }}
                    title="Change file"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} noValidate>
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
                    <label>Amount on Slip (₦)</label>
                    <input
                      type="number"
                      placeholder="e.g. 50000"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setError("");
                      }}
                      autoFocus
                    />
                    <div className="er">{error}</div>
                  </div>

                  <div className="portal-mf">
                    <button type="button" onClick={onClose} className="portal-btn">
                      Cancel
                    </button>
                    <button type="submit" className="portal-btn p">
                      Record giving from slip
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   MODAL 4: ADD EXPENSE (WITH INVOICE / RECEIPT UPLOAD)
   ===================================================================== */
function AddExpenseModal({ onClose, onSave }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Equipment");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // Invoice / receipt file attachment
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string>("");
  const [receiptName, setReceiptName] = useState<string>("");

  const processFile = (file: File) => {
    setReceiptFile(file);
    setReceiptName(file.name);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        setReceiptPreview(loadEv.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setReceiptPreview("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

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
    onSave({
      t: desc.trim(),
      c: category,
      a,
      receiptImage: receiptPreview || undefined,
      receiptName: receiptName || undefined,
      ref: `EXP-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
        style={{ maxWidth: 540 }}
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

        {/* Invoice / Bill Attachment */}
        <div className="portal-fi">
          <label>Attach Invoice / POS Slip / Bill (Optional)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {receiptName ? (
            <div className="portal-receipt-thumb">
              {receiptPreview ? (
                <img src={receiptPreview} alt="Invoice preview" className="portal-receipt-thumb-img" />
              ) : (
                <div style={{ width: 52, height: 52, borderRadius: 6, background: "var(--rd6)", color: "var(--rd)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SvgIcon name="file" />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {receiptName}
                </div>
                <small style={{ color: "var(--mu)" }}>
                  {receiptFile ? formatFileSize(receiptFile.size) : "Attached"} · Disbursement record
                </small>
              </div>
              <button
                type="button"
                onClick={() => {
                  setReceiptFile(null);
                  setReceiptPreview("");
                  setReceiptName("");
                }}
                className="portal-srch-clear"
                style={{ position: "static", transform: "none" }}
                title="Remove invoice"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="portal-receipt-btn"
              onClick={() => fileInputRef.current?.click()}
              style={{ width: "100%", justifyContent: "center", padding: "10px" }}
            >
              <SvgIcon name="upload" />
              <span>Attach Receipt or Invoice Document</span>
            </button>
          )}
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
  const [category, setCategory] = useState("Worship Service");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("09:00 AM");
  const [venue, setVenue] = useState("Main Sanctuary & Auditorium");
  const [preacher, setPreacher] = useState("Pastor Tosin Adewale");
  const [theme, setTheme] = useState("");
  const [capacity, setCapacity] = useState("350");
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
      id: Date.now(),
      t: title.trim(),
      category,
      d: ("0" + d.getDate()).slice(-2),
      mo: d.toLocaleString("en", { month: "short" }).toUpperCase(),
      yr: String(d.getFullYear()),
      fullDate: d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" }),
      tm: timeStr || "TBA",
      venue: venue.trim() || "Main Sanctuary",
      preacher: preacher.trim() || "Church Leadership",
      theme: theme.trim(),
      status: "Upcoming",
      r: 0,
      capacity: Number(capacity) || 300,
      attendees: [],
    });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
        style={{ maxWidth: 540 }}
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
            placeholder="e.g. Annual Thanksgiving & Anointing Celebration"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
          <div className="er">{error}</div>
        </div>

        <div className="portal-fi">
          <label>Event Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Worship Service">Worship Service</option>
            <option value="Bible Study">Bible Study &amp; Digging Deep</option>
            <option value="Youth & Singles">Youth &amp; Singles Fellowship</option>
            <option value="Prayer & Vigil">Prayer &amp; All-Night Vigil</option>
            <option value="Outreach & Community">Community Outreach &amp; Missions</option>
            <option value="Special Program">Special Program &amp; Conference</option>
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
              placeholder="09:00 AM"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
            />
          </div>
        </div>

        <div className="portal-fi">
          <label>Venue / Location</label>
          <input
            placeholder="e.g. Main Sanctuary & Auditorium"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
          <div className="portal-fi">
            <label>Preacher / Minister</label>
            <input
              placeholder="e.g. Pastor Tosin Adewale"
              value={preacher}
              onChange={(e) => setPreacher(e.target.value)}
            />
          </div>

          <div className="portal-fi">
            <label>Target Capacity</label>
            <input
              type="number"
              placeholder="350"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
        </div>

        <div className="portal-fi">
          <label>Theme / Scripture / Description (Optional)</label>
          <input
            placeholder="e.g. Entering His Gates with Praise & Power"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
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
   MODAL 6: NEW ATTENDANCE SESSION WITH SERVICE CATEGORY
   ===================================================================== */
function NewSessionModal({ onClose, onSave }: any) {
  const [category, setCategory] = useState("Sunday Celebration Service");
  const [name, setName] = useState("Sunday Celebration Service");
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0]);
  const [timeStr, setTimeStr] = useState("09:00 AM");
  const [preacher, setPreacher] = useState("Pastor Tosin Adewale");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setName(cat);
    if (cat.includes("Midweek") || cat.includes("Clinic")) {
      setTimeStr("05:30 PM");
    } else if (cat.includes("Youth")) {
      setTimeStr("04:00 PM");
    } else if (cat.includes("Vigil") || cat.includes("Night")) {
      setTimeStr("10:00 PM");
    } else if (cat.includes("Workers")) {
      setTimeStr("07:30 AM");
    } else {
      setTimeStr("09:00 AM");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide a name or title for this attendance session.");
      return;
    }
    const d = dateStr
      ? new Date(dateStr + "T12:00:00").toLocaleString("en", {
        month: "short",
        day: "numeric",
      })
      : "Today";

    onSave({
      category,
      n: name.trim(),
      d,
      time: timeStr,
      preacher: preacher.trim() || "Pastor in charge",
      notes: notes.trim(),
    });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
        style={{ maxWidth: 520 }}
      >
        <h2>Create Service Attendance Session</h2>
        <p style={{ margin: "-8px 0 16px", color: "var(--mu)", fontSize: 13 }}>
          Organize attendance by service category with manual roster, QR kiosk, and visitor tracking.
        </p>

        <div className="portal-fi">
          <label>Service Category *</label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="Sunday Celebration Service">Sunday Celebration Service</option>
            <option value="Midweek Bible Study">Midweek Bible Study (Digging Deep)</option>
            <option value="Faith Clinic & Prayer">Faith Clinic &amp; Prayer Meeting</option>
            <option value="Youth Fellowship">Youth &amp; Young Adults Fellowship</option>
            <option value="Workers & Leaders Meeting">Workers &amp; Leaders Meeting</option>
            <option value="Special Program & Vigil">Special Program / Night Vigil</option>
          </select>
        </div>

        <div className={`portal-fi ${error ? "bad" : ""}`}>
          <label>Session Title / Service Name *</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g. Sunday Celebration Service (1st Service)"
          />
          <div className="er">{error}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="portal-fi">
            <label>Service Date *</label>
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
            />
          </div>
          <div className="portal-fi">
            <label>Service Time</label>
            <input
              type="text"
              value={timeStr}
              onChange={(e) => setTimeStr(e.target.value)}
              placeholder="e.g. 09:00 AM"
            />
          </div>
        </div>

        <div className="portal-fi">
          <label>Minister / Preacher</label>
          <input
            type="text"
            value={preacher}
            onChange={(e) => setPreacher(e.target.value)}
            placeholder="e.g. Pastor Tosin Adewale"
          />
        </div>

        <div className="portal-fi">
          <label>Sermon Theme / Service Notes (Optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Supernatural Fruitfulness & Open Doors"
          />
        </div>

        <div
          style={{
            background: "rgba(109, 42, 60, 0.05)",
            border: "1px dashed var(--bd)",
            borderRadius: 12,
            padding: "10px 14px",
            fontSize: 12,
            color: "var(--mu)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ color: "var(--bl)", display: "grid", placeItems: "center" }}>
            <SvgIcon name="zap" />
          </div>
          <span>
            This session will be ready for <strong>Manual Attendance</strong>, <strong>Entrance QR Check-In</strong>, and <strong>Visitor Registration</strong> with real-time automatic reports.
          </span>
        </div>

        <div className="portal-mf" style={{ marginTop: 16 }}>
          <button type="button" onClick={onClose} className="portal-btn">
            Cancel
          </button>
          <button type="submit" className="portal-btn p">
            Create Attendance Session
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
   MODAL 9: INVITE STAFF (WITH CUSTOM ROLE SUPPORT)
   ===================================================================== */
function InviteStaffModal({ plan, currentCount = 0, onClose, onSave, onUpgrade }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Department Leader");
  const [customRole, setCustomRole] = useState("");
  const [error, setError] = useState("");

  const isStarterAtLimit = plan?.admins === 1 && currentCount >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid staff email address.");
      return;
    }
    const finalRole = role === "Custom Role" ? customRole.trim() : role;
    if (role === "Custom Role" && !finalRole) {
      setError("Please specify the custom ministry role title.");
      return;
    }
    const finalName = name.trim() || email.split("@")[0];
    onSave({ n: finalName, e: email.trim(), r: finalRole });
  };

  return (
    <div className="portal-mo" onClick={onClose}>
      <form
        className="portal-md"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        noValidate
        style={{ maxWidth: 480 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Invite Pastoral Staff or Leader</h2>
          <button type="button" onClick={onClose} className="portal-srch-clear" style={{ position: "static", transform: "none" }}>✕</button>
        </div>

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

        <div className="portal-fi">
          <label>Full Name / Title</label>
          <input
            placeholder="e.g. Pastor Tunde Bakare"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <label>Ministry Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {STAFF_ROLES.map((r) => (
              <option key={r} value={r}>
                {r === "Custom Role" ? "✦ Other / Custom Role (Type your own)..." : r}
              </option>
            ))}
          </select>
        </div>

        {role === "Custom Role" && (
          <div className="portal-fi">
            <label>Specify Custom Role Title</label>
            <input
              placeholder="e.g. Evangelism Coordinator, Youth Deacon, Sanctuary Keeper"
              value={customRole}
              onChange={(e) => setCustomRole(e.target.value)}
              autoFocus
            />
            <small style={{ color: "var(--mu)", fontSize: 11.5, marginTop: 4, display: "block" }}>
              Type any departmental assignment or ministerial title.
            </small>
          </div>
        )}

        <small style={{ color: "var(--mu)", display: "block", marginBottom: 14 }}>
          Invited workers will receive access credentials for their assigned permissions.
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
