"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import "../church-manager.css";

interface FeedItem {
  id: string;
  k: "g" | "";
  t: string;
  w: string;
}

const sampleNames = [
  "Adaeze O.",
  "Tunde B.",
  "Grace E.",
  "Samuel A.",
  "Ruth L.",
  "Daniel K.",
  "Mercy A.",
  "Emeka N.",
  "Bukola M.",
  "Chinedu O.",
  "Blessing P.",
  "Femi D.",
];

export default function ChurchManagerLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "attendance" | "giving" | "events">("overview");

  // Dashboard simulation states
  const [members, setMembers] = useState(248);
  const [present, setPresent] = useState(112);
  const [giving, setGiving] = useState(1250000);
  const [isSimulating, setIsSimulating] = useState(true);
  const [currency, setCurrency] = useState<"NGN" | "USD">("USD");
  const [annualBilling, setAnnualBilling] = useState(false);

  // Weekly attendance percentages
  const wk = [62, 71, 78, 85];
  const todayPercent = Math.min(100, Math.round((present / members) * 100 * 1.6));

  // Live activity feed
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: "1", k: "", t: "Adaeze O. checked in", w: "just now" },
    { id: "2", k: "g", t: "Tunde B. gave ₦5,000", w: "3s ago" },
    { id: "3", k: "", t: "Grace E. joined the church", w: "6s ago" },
    { id: "4", k: "", t: "Samuel A. checked in", w: "9s ago" },
  ]);

  // Contact form submission state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Random helper
  const pickRandomName = () => sampleNames[Math.floor(Math.random() * sampleNames.length)];

  // Simulation tick
  const triggerTick = useCallback(() => {
    const r = Math.random();
    const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);

    let newItem: FeedItem;

    if (r < 0.5) {
      setPresent((prev) => prev + 1);
      newItem = { id, k: "", t: `${name} checked in`, w: "just now" };
    } else if (r < 0.85) {
      const amount = (Math.floor(Math.random() * 9) + 1) * 1000;
      setGiving((prev) => prev + amount);
      newItem = { id, k: "g", t: `${name} gave ₦${amount.toLocaleString("en-NG")}`, w: "just now" };
    } else {
      setMembers((prev) => prev + 1);
      newItem = { id, k: "", t: `${name} joined the church`, w: "just now" };
    }

    setFeed((prev) => {
      const updated = [newItem, ...prev.slice(0, 5)];
      return updated.map((item, index) => {
        if (index === 0) return { ...item, w: "just now" };
        return { ...item, w: `${index * 3}s ago` };
      });
    });
  }, []);

  // Run simulation interval
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      triggerTick();
    }, 2200);

    return () => clearInterval(interval);
  }, [isSimulating, triggerTick]);

  // Manual actions
  const handleCheckInManually = () => {
    const name = pickRandomName();
    const id = Date.now().toString();
    setPresent((prev) => prev + 1);
    setFeed((prev) => [
      { id, k: "", t: `${name} checked in (manual)`, w: "just now" },
      ...prev.slice(0, 4),
    ]);
  };

  const handleGiveManually = () => {
    const name = pickRandomName();
    const id = Date.now().toString();
    const amount = 10000;
    setGiving((prev) => prev + amount);
    setFeed((prev) => [
      { id, k: "g", t: `${name} gave ₦${amount.toLocaleString("en-NG")} tithe`, w: "just now" },
      ...prev.slice(0, 4),
    ]);
  };

  const handleJoinManually = () => {
    const name = pickRandomName();
    const id = Date.now().toString();
    setMembers((prev) => prev + 1);
    setFeed((prev) => [
      { id, k: "", t: `${name} registered as new member`, w: "just now" },
      ...prev.slice(0, 4),
    ]);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  // Pricing calculations
  const growthPrice = currency === "USD" 
    ? (annualBilling ? "$12" : "$15") 
    : (annualBilling ? "₦12,000" : "₦15,000");

  const ministryPrice = currency === "USD" 
    ? (annualBilling ? "$31" : "$39") 
    : (annualBilling ? "₦31,000" : "₦39,000");

  return (
    <div className="cm-theme">
      {/* Sticky Header / Navbar */}
      <nav className="cm-nav">
        <div className="cm-w cm-nb">
          <Link href="#home" className="cm-brand">
            <span className="cm-logo">
              <svg viewBox="0 0 24 24">
                <path d="M12 3v18M6 9h12" />
              </svg>
            </span>
            <span>Church Manager</span>
          </Link>

          <div className="cm-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="cm-cta">
            <Link href="/portal/login" className="cm-btn">
              Sign In
            </Link>
            <Link href="/portal/login" className="cm-btn r">
              Create Account
            </Link>
            <button
              className="cm-burger"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div
          className={`cm-mob ${mobileMenuOpen ? "open" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <Link href="/portal/login" style={{ color: "var(--bl)", fontWeight: 700 }}>
            Sign In to Portal
          </Link>
          <Link href="/portal/login" style={{ color: "var(--rd)", fontWeight: 700 }}>
            Create Account
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="cm-hero" id="home">
        <div className="cm-w">
          <span className="cm-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Built for churches of every size
          </span>

          <h1>
            Shepherd your <em>people</em>,<br />
            not your <u>spreadsheets</u>.
          </h1>

          <p className="l">
            Members, attendance, giving and events in one live dashboard for pastors, leaders and members.
          </p>

          <div className="cm-hb">
            <Link href="/portal/login" className="cm-btn r big">
              Create Account
            </Link>
            <Link href="/portal/login" className="cm-btn big">
              Sign In
            </Link>
            <Link
              href="/portal"
              className="cm-btn big"
              style={{ background: "#fff", borderColor: "var(--bd)", color: "var(--tx)" }}
            >
              Instant Demo Portal →
            </Link>
          </div>

          {/* Live Interactive Dashboard Preview */}
          <div className="cm-dash" aria-label="Live dashboard preview">
            {/* Window Bar */}
            <div className="cm-dt">
              <i title="Close" />
              <i title="Minimize" />
              <i title="Maximize" />
              <div className="cm-live-badge">
                <span>{isSimulating ? "LIVE FEED ACTIVE" : "SIMULATION PAUSED"}</span>
              </div>
            </div>

            {/* Dashboard Inner Container */}
            <div className="cm-db">
              {/* Left Sidebar Tabs */}
              <div className="cm-sb">
                <button
                  type="button"
                  className={activeTab === "overview" ? "on" : ""}
                  onClick={() => setActiveTab("overview")}
                >
                  <span>📊</span> Overview
                </button>
                <button
                  type="button"
                  className={activeTab === "members" ? "on" : ""}
                  onClick={() => setActiveTab("members")}
                >
                  <span>👥</span> Members
                </button>
                <button
                  type="button"
                  className={activeTab === "attendance" ? "on" : ""}
                  onClick={() => setActiveTab("attendance")}
                >
                  <span>📈</span> Attendance
                </button>
                <button
                  type="button"
                  className={activeTab === "giving" ? "on" : ""}
                  onClick={() => setActiveTab("giving")}
                >
                  <span>💵</span> Giving
                </button>
                <button
                  type="button"
                  className={activeTab === "events" ? "on" : ""}
                  onClick={() => setActiveTab("events")}
                >
                  <span>📅</span> Events
                </button>
              </div>

              {/* Main Content Area */}
              <div className="cm-mn">
                {activeTab === "overview" && (
                  <>
                    {/* Key Stats Bar */}
                    <div className="cm-st">
                      <div className="cm-s u">
                        <small>Total members</small>
                        <b>{members}</b>
                      </div>
                      <div className="cm-s">
                        <small>Present today</small>
                        <b>{present}</b>
                      </div>
                      <div className="cm-s r">
                        <small>Giving this month</small>
                        <b>₦{giving.toLocaleString("en-NG")}</b>
                      </div>
                    </div>

                    {/* Panels */}
                    <div className="cm-pn">
                      {/* Attendance Chart */}
                      <div className="cm-bx">
                        <h4>
                          <span>Weekly attendance</span>
                          <span style={{ fontSize: "11px", color: "var(--rd)", fontWeight: 700 }}>
                            {todayPercent}% Today
                          </span>
                        </h4>
                        <div className="cm-ch">
                          {wk.map((val, idx) => (
                            <div
                              key={idx}
                              style={{ height: `${val}%` }}
                              title={`Week ${idx + 1}: ${val}% attendance`}
                            />
                          ))}
                          <div
                            className="today-bar"
                            style={{ height: `${todayPercent}%` }}
                            title={`Today: ${todayPercent}% attendance`}
                          />
                        </div>
                        <div className="cm-cl">
                          <span>Wk1</span>
                          <span>Wk2</span>
                          <span>Wk3</span>
                          <span>Wk4</span>
                          <span style={{ color: "var(--rd)", fontWeight: 700 }}>Today</span>
                        </div>
                      </div>

                      {/* Live Activity Feed */}
                      <div className="cm-bx">
                        <h4>
                          <span>Live activity</span>
                          <span style={{ fontSize: "11px", color: "var(--mu)", fontWeight: 500 }}>
                            Real-time
                          </span>
                        </h4>
                        <div className="cm-fd">
                          {feed.slice(0, 4).map((f) => (
                            <div key={f.id}>
                              <i className={f.k} />
                              <span style={{ color: "var(--tx)", fontWeight: 500 }}>{f.t}</span>
                              <span>{f.w}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Simulator Controls */}
                    <div
                      style={{
                        marginTop: "14px",
                        padding: "10px 14px",
                        background: "var(--soft)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                        fontSize: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontWeight: 700, color: "var(--mu)" }}>SIMULATOR:</span>
                        <button
                          type="button"
                          onClick={() => setIsSimulating(!isSimulating)}
                          style={{
                            background: isSimulating ? "#dcfce7" : "#fee2e2",
                            color: isSimulating ? "#15803d" : "#b91c1c",
                            border: "none",
                            borderRadius: "6px",
                            padding: "3px 8px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {isSimulating ? "● Pause Auto-Tick" : "▶ Resume Auto-Tick"}
                        </button>
                      </div>

                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          type="button"
                          onClick={handleCheckInManually}
                          style={{
                            background: "#fff",
                            border: "1px solid var(--bd)",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            color: "var(--bl)",
                          }}
                        >
                          + Check In
                        </button>
                        <button
                          type="button"
                          onClick={handleGiveManually}
                          style={{
                            background: "#fff",
                            border: "1px solid var(--bd)",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            color: "var(--rd)",
                          }}
                        >
                          + ₦10k Tithe
                        </button>
                        <button
                          type="button"
                          onClick={handleJoinManually}
                          style={{
                            background: "#fff",
                            border: "1px solid var(--bd)",
                            borderRadius: "6px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontWeight: 600,
                            color: "var(--tx)",
                          }}
                        >
                          + New Member
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Members Tab View */}
                {activeTab === "members" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--tx)" }}>
                        Church Members Directory ({members})
                      </h4>
                      <Link href="/portal/admin/members" className="cm-btn" style={{ padding: "4px 10px", fontSize: "12px" }}>
                        Open in Admin →
                      </Link>
                    </div>
                    <div style={{ background: "#fff", borderRadius: "10px", border: "1px solid var(--bd)", overflow: "hidden", fontSize: "13px" }}>
                      {[
                        { name: "Pastor David O.", dept: "Pastoral Board", role: "Lead Pastor", status: "Active" },
                        { name: "Deaconess Grace E.", dept: "Ushering Unit", role: "Head Usher", status: "Active" },
                        { name: "Brother Tunde B.", dept: "Choir (Voices of Zion)", role: "Instrumentalist", status: "Active" },
                        { name: "Sister Adaeze O.", dept: "Media & Technical", role: "Media Lead", status: "Active" },
                        { name: "Brother Samuel A.", dept: "First Timers", role: "Visitor (Sunday)", status: "New" },
                      ].map((m, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "9px 12px",
                            borderBottom: i < 4 ? "1px solid var(--bd)" : "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                background: i % 2 === 0 ? "var(--bl2)" : "var(--rd2)",
                                color: i % 2 === 0 ? "var(--bl)" : "var(--rd)",
                                display: "grid",
                                placeItems: "center",
                                fontWeight: 700,
                                fontSize: "11px",
                              }}
                            >
                              {m.name.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: "var(--tx)" }}>{m.name}</div>
                              <div style={{ fontSize: "11px", color: "var(--mu)" }}>{m.dept}</div>
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 8px",
                              borderRadius: "99px",
                              background: m.status === "New" ? "var(--rd2)" : "#dcfce7",
                              color: m.status === "New" ? "var(--rd)" : "#15803d",
                              fontWeight: 700,
                            }}
                          >
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attendance Tab View */}
                {activeTab === "attendance" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--tx)" }}>
                        Service Attendance Breakdown
                      </h4>
                      <Link href="/portal/admin/attendance" className="cm-btn" style={{ padding: "4px 10px", fontSize: "12px" }}>
                        View Full Reports →
                      </Link>
                    </div>
                    <div style={{ display: "grid", gap: "10px" }}>
                      {[
                        { name: "Sunday 1st Service (Early Manna)", count: "118 attendees", pct: 85, color: "var(--bl)" },
                        { name: "Sunday 2nd Service (Celebration)", count: "214 attendees", pct: 94, color: "var(--rd)" },
                        { name: "Wednesday Midweek Breakthrough", count: "89 attendees", pct: 65, color: "var(--bl)" },
                        { name: "Youth Church (Teens & Campus)", count: "76 attendees", pct: 80, color: "var(--tx)" },
                      ].map((item, idx) => (
                        <div key={idx} style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "10px", padding: "10px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                            <span>{item.name}</span>
                            <span style={{ color: item.color, fontWeight: 700 }}>{item.count}</span>
                          </div>
                          <div style={{ height: "7px", background: "var(--soft)", borderRadius: "99px", overflow: "hidden" }}>
                            <div style={{ width: `${item.pct}%`, height: "100%", background: item.color, borderRadius: "99px" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Giving Tab View */}
                {activeTab === "giving" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--tx)" }}>
                        Monthly Giving Allocations
                      </h4>
                      <Link href="/portal/admin/finances" className="cm-btn" style={{ padding: "4px 10px", fontSize: "12px" }}>
                        Financial Ledger →
                      </Link>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
                      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "10px", padding: "12px" }}>
                        <small style={{ color: "var(--mu)", fontWeight: 600, fontSize: "11px" }}>TITHES RECORDED</small>
                        <b style={{ display: "block", fontSize: "20px", color: "var(--bl)", marginTop: "4px" }}>
                          ₦{(giving * 0.62).toLocaleString("en-NG", { maximumFractionDigits: 0 })}
                        </b>
                      </div>
                      <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "10px", padding: "12px" }}>
                        <small style={{ color: "var(--mu)", fontWeight: 600, fontSize: "11px" }}>OFFERINGS & SEED</small>
                        <b style={{ display: "block", fontSize: "20px", color: "var(--rd)", marginTop: "4px" }}>
                          ₦{(giving * 0.38).toLocaleString("en-NG", { maximumFractionDigits: 0 })}
                        </b>
                      </div>
                    </div>
                    <div style={{ background: "#fff", border: "1px solid var(--bd)", borderRadius: "10px", padding: "12px", fontSize: "12.5px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginBottom: "6px" }}>
                        <span>Progress Towards Monthly Budget (₦1,500,000)</span>
                        <span style={{ color: "var(--rd)" }}>{Math.min(100, Math.round((giving / 1500000) * 100))}%</span>
                      </div>
                      <div style={{ height: "8px", background: "var(--soft)", borderRadius: "99px", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${Math.min(100, (giving / 1500000) * 100)}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, var(--bl), var(--rd))",
                            borderRadius: "99px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Events Tab View */}
                {activeTab === "events" && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--tx)" }}>
                        Upcoming Church Events & RSVPs
                      </h4>
                      <Link href="/portal/admin/roster" className="cm-btn" style={{ padding: "4px 10px", fontSize: "12px" }}>
                        Manage Events →
                      </Link>
                    </div>
                    <div style={{ display: "grid", gap: "8px" }}>
                      {[
                        { title: "Sunday Holy Communion Service", date: "This Sunday, 9:00 AM", rsvps: "184 Confirmed" },
                        { title: "Worship & Miracle Night", date: "Last Friday, 10:00 PM", rsvps: "112 Confirmed" },
                        { title: "Couples & Marriage Banquet", date: "Nov 14, 5:00 PM", rsvps: "46 Confirmed" },
                      ].map((ev, i) => (
                        <div
                          key={i}
                          style={{
                            background: "#fff",
                            border: "1px solid var(--bd)",
                            borderRadius: "10px",
                            padding: "10px 14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "13.5px", color: "var(--tx)" }}>{ev.title}</div>
                            <div style={{ fontSize: "11.5px", color: "var(--mu)" }}>{ev.date}</div>
                          </div>
                          <span
                            style={{
                              background: "var(--bl2)",
                              color: "var(--bl)",
                              fontWeight: 700,
                              fontSize: "11px",
                              padding: "4px 8px",
                              borderRadius: "6px",
                            }}
                          >
                            {ev.rsvps}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="cm-section" id="features">
        <div className="cm-w">
          <h2>Everything your church needs</h2>
          <p className="cm-sub">
            Replace notebooks and scattered chats with one tool your whole team can use.
          </p>

          <div className="cm-g">
            {/* Feature 1 */}
            <div className="cm-c">
              <div className="cm-ic">
                <svg viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Member Management</h3>
              <p>Keep profiles, departments and contact details organized and searchable.</p>
            </div>

            {/* Feature 2 */}
            <div className="cm-c">
              <div className="cm-ic">
                <svg viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
              </div>
              <h3>Attendance Tracking</h3>
              <p>Mark attendance in seconds and see trends across every service.</p>
            </div>

            {/* Feature 3 */}
            <div className="cm-c">
              <div className="cm-ic">
                <svg viewBox="0 0 24 24">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>
              <h3>Giving Records</h3>
              <p>Record tithes and offerings and give members their own giving history.</p>
            </div>

            {/* Feature 4 */}
            <div className="cm-c">
              <div className="cm-ic">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3>Events &amp; RSVPs</h3>
              <p>Publish services and programs, and let members RSVP in one tap.</p>
            </div>

            {/* Feature 5 */}
            <div className="cm-c">
              <div className="cm-ic">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Role-Based Access</h3>
              <p>Admins manage everything while members only see what is theirs.</p>
            </div>

            {/* Feature 6 */}
            <div className="cm-c">
              <div className="cm-ic">
                <svg viewBox="0 0 24 24">
                  <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              </div>
              <h3>Announcements</h3>
              <p>Share updates with the whole church or a single department.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="cm-section cm-alt" id="how">
        <div className="cm-w">
          <h2>Up and running in minutes</h2>
          <p className="cm-sub">No training needed. If you can send a message, you can use it.</p>

          <div className="cm-g">
            <div className="cm-c">
              <div className="cm-num">1</div>
              <h3>Create your account</h3>
              <p>Sign up and set up your church profile and departments.</p>
            </div>
            <div className="cm-c">
              <div className="cm-num">2</div>
              <h3>Add your members</h3>
              <p>Add people one by one or invite them to join themselves.</p>
            </div>
            <div className="cm-c">
              <div className="cm-num">3</div>
              <h3>Manage with ease</h3>
              <p>Track attendance, record giving and plan events from one dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="cm-section" id="pricing">
        <div className="cm-w">
          <h2>Simple pricing</h2>
          <p className="cm-sub">Start free and upgrade as your church grows.</p>

          {/* Pricing Controls: Currency & Billing Frequency */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginBottom: "36px",
              flexWrap: "wrap",
            }}
          >
            {/* Billing Toggle */}
            <div
              style={{
                display: "inline-flex",
                background: "var(--soft)",
                padding: "4px",
                borderRadius: "99px",
                border: "1px solid var(--bd)",
              }}
            >
              <button
                type="button"
                onClick={() => setAnnualBilling(false)}
                style={{
                  border: "none",
                  background: !annualBilling ? "var(--bl)" : "transparent",
                  color: !annualBilling ? "#fff" : "var(--mu)",
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnualBilling(true)}
                style={{
                  border: "none",
                  background: annualBilling ? "var(--bl)" : "transparent",
                  color: annualBilling ? "#fff" : "var(--mu)",
                  padding: "6px 14px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Annual <span style={{ color: annualBilling ? "#fee2e2" : "var(--rd)", fontSize: "11px", fontWeight: 800 }}>-20%</span>
              </button>
            </div>

            {/* Currency Selector */}
            <div
              style={{
                display: "inline-flex",
                background: "var(--soft)",
                padding: "4px",
                borderRadius: "99px",
                border: "1px solid var(--bd)",
              }}
            >
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                style={{
                  border: "none",
                  background: currency === "USD" ? "#fff" : "transparent",
                  color: currency === "USD" ? "var(--tx)" : "var(--mu)",
                  padding: "6px 12px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: currency === "USD" ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                }}
              >
                USD ($)
              </button>
              <button
                type="button"
                onClick={() => setCurrency("NGN")}
                style={{
                  border: "none",
                  background: currency === "NGN" ? "#fff" : "transparent",
                  color: currency === "NGN" ? "var(--tx)" : "var(--mu)",
                  padding: "6px 12px",
                  borderRadius: "99px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: currency === "NGN" ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
                }}
              >
                NGN (₦)
              </button>
            </div>
          </div>

          <div className="cm-g">
            {/* Starter */}
            <div className="cm-c">
              <h3>Starter</h3>
              <div className="cm-price">Free</div>
              <ul>
                <li>Up to 50 members</li>
                <li>Attendance &amp; events</li>
                <li>Member dashboard</li>
                <li>Community prayer requests</li>
              </ul>
              <Link href="/portal/login" className="cm-btn">
                Get Started
              </Link>
            </div>

            {/* Growth */}
            <div className="cm-c feat">
              <h3>Growth</h3>
              <div className="cm-price">
                {growthPrice}
                <small> /month</small>
              </div>
              <ul>
                <li>Up to 500 members</li>
                <li>Giving records &amp; reports</li>
                <li>Announcements broadcast</li>
                <li>Duty roster scheduling</li>
                <li>Attendance trends &amp; analytics</li>
              </ul>
              <Link href="/portal/login" className="cm-btn r">
                Create Account
              </Link>
            </div>

            {/* Ministry */}
            <div className="cm-c">
              <h3>Ministry</h3>
              <div className="cm-price">
                {ministryPrice}
                <small> /month</small>
              </div>
              <ul>
                <li>Unlimited members</li>
                <li>Multiple pastoral admins</li>
                <li>Priority WhatsApp &amp; phone support</li>
                <li>Custom church branding</li>
                <li>Financial exports (Excel/PDF)</li>
              </ul>
              <Link href="/portal/login" className="cm-btn">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="cm-section cm-alt" id="contact">
        <div className="cm-w">
          <h2>Get in touch</h2>
          <p className="cm-sub">Questions or want a walkthrough? Send us a note.</p>

          {contactSubmitted ? (
            <div
              style={{
                maxWidth: "480px",
                margin: "0 auto",
                padding: "30px",
                background: "var(--card)",
                borderRadius: "14px",
                border: "1px solid var(--bd)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#dcfce7",
                  color: "#15803d",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "24px",
                  margin: "0 auto 16px",
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: "20px" }}>Message Received!</h3>
              <p style={{ color: "var(--mu)", margin: "0 0 20px" }}>
                Thanks, {contactName || "friend"}! We will review your message and reply shortly to{" "}
                <strong>{contactEmail || "your email"}</strong>.
              </p>
              <button
                type="button"
                className="cm-btn"
                onClick={() => {
                  setContactSubmitted(false);
                  setContactName("");
                  setContactEmail("");
                  setContactMessage("");
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="cm-form" onSubmit={handleContactSubmit}>
              <input
                required
                className="cm-input"
                placeholder="Your name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <input
                required
                type="email"
                className="cm-input"
                placeholder="Email address"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <textarea
                required
                rows={4}
                className="cm-textarea"
                placeholder="How can we help your church or ministry?"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <button className="cm-btn b big" type="submit" style={{ width: "100%" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="cm-footer">
        <div className="cm-w cm-footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="cm-logo" style={{ width: "26px", height: "26px", borderRadius: "6px" }}>
              <svg viewBox="0 0 24 24" style={{ width: "15px", height: "15px" }}>
                <path d="M12 3v18M6 9h12" />
              </svg>
            </span>
            <span style={{ fontWeight: 700, color: "var(--tx)" }}>Church Manager</span>
          </div>

          <div>© 2026 Church Manager. All rights reserved.</div>

          <div style={{ display: "flex", gap: "16px", fontSize: "13px" }}>
            <Link href="/portal/login" style={{ color: "var(--bl)", fontWeight: 600 }}>
              Admin Portal
            </Link>
            <Link href="/portal/checkin" style={{ color: "var(--mu)" }}>
              Sunday Check-In
            </Link>
            <Link href="/portal/my-profile" style={{ color: "var(--mu)" }}>
              Member Hub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
