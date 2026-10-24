"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../church-manager.css";
import AnimatedFAQ from "./AnimatedFAQ";

export default function ChurchManagerLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Add js class to html root
    document.documentElement.classList.add("js");
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = "var(--bg)";
    document.body.style.color = "var(--tx)";

    // Scroll reveal observer
    const els = document.querySelectorAll(".rv");
    let io: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
    } else {
      io = new IntersectionObserver(
        (es, obs) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((e) => io?.observe(e));
    }

    // Dashboard simulation logic
    let ft = 6;
    let present = 112;
    let giving = 1250000;
    let members = 248;
    const wk = [62, 71, 78, 85];
    const names = [
      "Adaeze O.",
      "Tunde B.",
      "Grace E.",
      "Samuel A.",
      "Ruth L.",
      "Daniel K.",
      "Mercy A.",
      "Emeka N.",
    ];
    let feed: { k: string; t: string; w: string }[] = [];

    const ch = document.getElementById("ch");
    const fd = document.getElementById("fd");

    function flash(el: HTMLElement | null) {
      if (!el) return;
      el.classList.remove("stat-pulse");
      void el.offsetWidth;
      el.classList.add("stat-pulse");
    }

    function bars() {
      if (!ch) return;
      const todayVal = Math.min(100, Math.max(25, Math.round((present / members) * 100 * 1.55)));
      ch.innerHTML = wk
        .map(
          (v) =>
            `<div class="ch-bar" style="height:${v}%"><span class="ch-tip">${v}%</span></div>`
        )
        .concat([
          `<div class="ch-bar today" style="height:${todayVal}%">
            <span class="ch-glow"></span>
            <span class="ch-tip today-tip">${todayVal}%</span>
          </div>`,
        ])
        .join("");
    }

    function paint(updatedKey?: string) {
      const m1 = document.getElementById("m1");
      const m2 = document.getElementById("m2");
      const m3 = document.getElementById("m3");
      const m4 = document.getElementById("m4");
      if (m1) {
        m1.textContent = members.toString();
        if (updatedKey === "m1") flash(m1);
      }
      if (m2) {
        m2.textContent = present.toString();
        if (updatedKey === "m2") flash(m2);
      }
      if (m3) {
        m3.textContent = "₦" + giving.toLocaleString("en-NG");
        if (updatedKey === "m3") flash(m3);
      }
      if (m4) {
        m4.textContent = ft.toString();
        if (updatedKey === "m4") flash(m4);
      }
      bars();
      if (fd) {
        fd.innerHTML = feed
          .slice(0, 4)
          .map(function (f, idx) {
            return (
              '<div class="feed-item' +
              (idx === 0 ? " feed-item-new" : "") +
              '">' +
              '<i class="' +
              f.k +
              '"></i>' +
              '<span class="feed-text">' +
              f.t +
              "</span>" +
              '<span class="feed-time">' +
              f.w +
              "</span>" +
              "</div>"
            );
          })
          .join("");
      }
    }

    function pick() {
      return names[Math.floor(Math.random() * names.length)];
    }

    function tick() {
      const r = Math.random();
      const n = pick();
      let updatedKey = "m2";
      if (r < 0.5) {
        present++;
        feed.unshift({ k: "", t: n + " checked in", w: "just now" });
        updatedKey = "m2";
      } else if (r < 0.85) {
        const a = (Math.floor(Math.random() * 9) + 1) * 1000;
        giving += a;
        feed.unshift({
          k: "g",
          t: n + " gave ₦" + a.toLocaleString("en-NG") + " tithe",
          w: "just now",
        });
        updatedKey = "m3";
      } else {
        members++;
        ft++;
        feed.unshift({ k: "", t: "First-timer: " + n, w: "just now" });
        updatedKey = "m4";
      }
      feed = feed.slice(0, 6);
      feed.forEach(function (f, i) {
        if (i) f.w = i * 3 + "s ago";
      });
      paint(updatedKey);
    }

    for (let i = 0; i < 4; i++) {
      tick();
    }
    const tickTimer = setInterval(tick, 1900);

    let s = 0;
    const recTimer = setInterval(function () {
      s++;
      const rt = document.getElementById("rt");
      if (rt) {
        rt.textContent =
          "REC " + Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
      }
    }, 1000);

    const dash = document.querySelector(".dash");
    const cur = document.getElementById("cur");
    const rip = document.getElementById("rip");
    const nv = document.querySelectorAll(".sb div");
    const ov = document.querySelectorAll(".ov");

    function sl(t: number) {
      return new Promise<void>(function (r) {
        setTimeout(r, t);
      });
    }

    function go(el: Element | null) {
      if (!el || !dash || !cur) return Promise.resolve();
      const a = el.getBoundingClientRect();
      const b = dash.getBoundingClientRect();
      cur.style.transform =
        "translate(" +
        (a.left - b.left + a.width * 0.45) +
        "px," +
        (a.top - b.top + a.height * 0.5) +
        "px)";
      return sl(1000);
    }

    function clk() {
      if (!cur || !rip) return;
      const m = cur.style.transform.match(
        /translate\(([\d.-]+)px,\s*([\d.-]+)px\)/
      );
      if (!m) return;
      rip.style.left = parseFloat(m[1]) - 14 + "px";
      rip.style.top = parseFloat(m[2]) - 14 + "px";
      rip.classList.remove("go");
      void rip.offsetWidth;
      rip.classList.add("go");
    }

    function show(idx: number) {
      for (let k = 0; k < 5; k++) {
        if (nv[k]) nv[k].className = k === idx ? "on" : "";
      }
      ov.forEach(function (e) {
        e.classList.toggle("off", idx > 0);
      });
      for (let k = 1; k < 5; k++) {
        const vk = document.getElementById("v" + k);
        if (vk) vk.classList.toggle("on", k === idx);
      }
    }

    // Attach click listeners to tabs so manual clicking works too
    nv.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        show(index);
      });
    });

    let active = true;
    async function loop() {
      const m2 = document.getElementById("m2");
      if (m2) await go(m2);
      await sl(500);
      while (active) {
        for (let i = 0; i < 5 && active; i++) {
          if (nv[i]) {
            await go(nv[i]);
            if (!active) break;
            clk();
            show(i);
            await sl(600);
          }
          if (!active) break;
          if (i === 0) {
            const m3Parent = document.getElementById("m3")?.parentNode as HTMLElement;
            if (m3Parent) await go(m3Parent);
          }
          if (i === 1) {
            const r = document.querySelectorAll(".mr");
            for (let j = 1; j < 4 && active; j++) {
              if (r[j - 1]) r[j - 1].classList.remove("hv");
              if (r[j]) {
                r[j].classList.add("hv");
                await go(r[j]);
              }
            }
          }
          if (i === 2) {
            const t = document.querySelectorAll(".tg")[1];
            if (t) {
              await go(t);
              if (!active) break;
              clk();
              t.classList.toggle("on");
              t.classList.toggle("off");
              t.textContent = t.classList.contains("on") ? "Present" : "Absent";
            }
          }
          if (i === 3) {
            const gt = document.getElementById("gt");
            if (gt) await go(gt);
          }
          if (i === 4) {
            const ev = document.querySelector(".ev");
            if (ev) await go(ev);
          }
          if (!active) break;
          await sl(900);
        }
      }
    }

    loop();

    return () => {
      active = false;
      clearInterval(tickTimer);
      clearInterval(recTimer);
      io?.disconnect();
      document.documentElement.classList.remove("js");
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
    };
  }, []);

  return (
    <div className="church-manager-page">
      {/* Navigation */}
      <nav>
        <div className="w nb">
          <a href="#home" className="brand">
            <span className="logo">
              <Image
                src="/logo.png"
                alt="REDDOX"
                width={28}
                height={28}
                className="logo-img"
                priority
              />
            </span>
            <span className="brand-name">
              RED<span className="brand-dox">DOX</span>
            </span>
          </a>
          <div className="links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="cta">
            <Link href="/portal/login" className="btn">
              Sign In
            </Link>
            <Link href="/portal/login" className="btn r">
              Create Account
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <button
              className="burger"
              aria-label="Menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`mob ${mobileOpen ? "open" : ""}`}
          id="m"
          onClick={() => setMobileOpen(false)}
        >
          <div className="mob-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="mob-actions">
            <Link href="/portal/login" className="btn">
              Sign In
            </Link>
            <Link href="/portal/login" className="btn r">
              Create Account
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="bgfx">
          <b className="ray"></b>
          <b className="ray r2"></b>
          <i style={{ left: "6%", animationDelay: "-1s", animationDuration: "10s" }}></i>
          <i style={{ left: "14%", animationDelay: "-6s", animationDuration: "13s" }}></i>
          <i style={{ left: "23%", animationDelay: "-3s", animationDuration: "11s" }}></i>
          <i style={{ left: "33%", animationDelay: "-9s", animationDuration: "14s" }}></i>
          <i style={{ left: "44%", animationDelay: "-2s", animationDuration: "12s" }}></i>
          <i style={{ left: "54%", animationDelay: "-7s", animationDuration: "10s" }}></i>
          <i style={{ left: "63%", animationDelay: "-4s", animationDuration: "13s" }}></i>
          <i style={{ left: "72%", animationDelay: "-10s", animationDuration: "11s" }}></i>
          <i style={{ left: "81%", animationDelay: "-5s", animationDuration: "14s" }}></i>
          <i style={{ left: "90%", animationDelay: "-8s", animationDuration: "12s" }}></i>
          <i style={{ left: "97%", animationDelay: "-0s", animationDuration: "10s" }}></i>
        </div>
        <div className="w">
          <h1>
            Every <em>soul</em> counted.<br className="hero-br" />
            Every <u>service</u> remembered.
          </h1>
          <p className="l">
            Welcome first-timers, track service attendance, record tithes and
            offerings, and keep every ministry in step, all in one place for
            pastors, ushers and members.
          </p>
          <div className="hb">
            <Link href="/portal/login" className="btn r big">
              Get Started
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/portal/login" className="btn big">
              Sign In
            </Link>
          </div>
          <div className="hero-trust">
            <span className="hero-trust-item">
              <span className="trust-check-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3.5 8.2 6.5 11.2 12.5 4.8" />
                </svg>
              </span>
              Zero training needed
            </span>
            <span className="hero-trust-item">
              <span className="trust-check-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3.5 8.2 6.5 11.2 12.5 4.8" />
                </svg>
              </span>
              No credit card required
            </span>
            <span className="hero-trust-item">
              <span className="trust-check-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3.5 8.2 6.5 11.2 12.5 4.8" />
                </svg>
              </span>
              Instant 3-minute setup
            </span>
          </div>

          <div className="dash" aria-label="Dashboard demo">
            <svg className="cur" id="cur" viewBox="0 0 24 24">
              <path
                d="M3 2l14 8-6 2-2 7z"
                fill="#fff"
                stroke="#222"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span className="rip" id="rip"></span>
            <div className="dt">
              <i></i>
              <i></i>
              <i></i>
              <span id="rt">REC 0:00</span>
            </div>
            <div className="db">
              <div className="sb">
                <div className="on">Overview</div>
                <div>Members</div>
                <div>Attendance</div>
                <div>Giving</div>
                <div>Services</div>
              </div>
              <div className="mn">
                <div className="tb">
                  <div>
                    <b>Good morning, Pastor</b>
                    <small>Sunday service · 9:00 AM</small>
                  </div>
                  <div className="sr">Search members, services…</div>
                  <i className="av">PA</i>
                </div>
                <div className="v" id="v1">
                  <div className="bx">
                    <h4>Members · 248</h4>
                    <div className="rw mr">
                      <i>AO</i>Adaeze Okoye<span>Choir</span>
                    </div>
                    <div className="rw mr">
                      <i>TB</i>Tunde Bakare<span>Ushering</span>
                    </div>
                    <div className="rw mr">
                      <i>GE</i>Grace Eze<span>Children</span>
                    </div>
                    <div className="rw mr">
                      <i>SA</i>Samuel Adeyemi<span>Media</span>
                    </div>
                  </div>
                </div>
                <div className="v" id="v2">
                  <div className="bx">
                    <h4>Sunday service attendance</h4>
                    <div className="rw">
                      <i>AO</i>Adaeze Okoye<span className="tg on">Present</span>
                    </div>
                    <div className="rw">
                      <i>TB</i>Tunde Bakare<span className="tg on">Present</span>
                    </div>
                    <div className="rw">
                      <i>GE</i>Grace Eze<span className="tg off">Absent</span>
                    </div>
                    <div className="rw">
                      <i>SA</i>Samuel Adeyemi<span className="tg on">Present</span>
                    </div>
                  </div>
                </div>
                <div className="v" id="v3">
                  <div className="bx">
                    <h4>Giving this month</h4>
                    <div className="rw" id="gt">
                      <i>₦</i>Tithes<span>₦640,000</span>
                    </div>
                    <div className="rw">
                      <i>₦</i>Offerings<span>₦380,000</span>
                    </div>
                    <div className="rw">
                      <i>₦</i>Building fund<span>₦230,000</span>
                    </div>
                  </div>
                </div>
                <div className="v" id="v4">
                  <div className="bx">
                    <h4>Upcoming services</h4>
                    <div className="rw">
                      <i>25</i>Sunday Service<span>9:00 AM</span>
                    </div>
                    <div className="rw ev">
                      <i>28</i>Midweek Bible Study<span>5:30 PM</span>
                    </div>
                    <div className="rw">
                      <i>31</i>Youth Fellowship<span>4:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="st ov">
                  <div className="s u">
                    <small>Congregation</small>
                    <b id="m1">248</b>
                  </div>
                  <div className="s">
                    <small>In service today</small>
                    <b id="m2">0</b>
                  </div>
                  <div className="s r">
                    <small>Tithes &amp; offerings</small>
                    <b id="m3">₦0</b>
                  </div>
                  <div className="s">
                    <small>First-timers</small>
                    <b id="m4">0</b>
                  </div>
                </div>
                <div className="pn ov">
                  <div className="bx">
                    <h4>Sunday attendance</h4>
                    <div className="ch" id="ch"></div>
                    <div className="cl">
                      <span>Wk1</span>
                      <span>Wk2</span>
                      <span>Wk3</span>
                      <span>Wk4</span>
                      <span>Today</span>
                    </div>
                  </div>
                  <div className="bx">
                    <h4>This Sunday</h4>
                    <div className="fd" id="fd"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Moving Details Banner under Hero */}
      <div className="rolling-marquee-container" aria-label="Moving feature highlights">
        <div className="rolling-marquee-track">
          {[1, 2].map((group) => (
            <React.Fragment key={group}>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>1,420+ Active Churches Connected</span>
              </div>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>Instant Sunday Check-In Under 3 Seconds</span>
              </div>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>Automated Tithes, Envelopes &amp; Online Giving</span>
              </div>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>Role-Based Security for Pastors &amp; Ushers</span>
              </div>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>100% Cloud-Backed &amp; Mobile-Ready</span>
              </div>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>First-Timer Automated Welcome &amp; Follow-Up</span>
              </div>
              <div className="rolling-marquee-item">
                <span className="rolling-marquee-star">✦</span>
                <span>Zero Installation — Runs in Any Browser</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <section id="problem">
        <div className="w">
          <h2 className="rv">Administration made simple</h2>
          <p className="sub rv">
            Most churches lose valuable hours to notebooks, group chats and spreadsheets. Here is
            what that costs your ministry.
          </p>
          <div className="g">
            <div className="c rv" style={{ "--d": "0ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M8 13h8M8 17h5" />
                </svg>
              </div>
              <h3>Scattered records</h3>
              <p>
                Member details live in notebooks, phones and spreadsheets, and
                nobody has the full picture.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "90ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="m17 8 5 5M22 8l-5 5" />
                </svg>
              </div>
              <h3>First-timers slip away</h3>
              <p>
                Without a simple follow-up, new visitors come once and are never
                contactated again.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "180ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M9.5 9.5c0-1 1-1.5 2.5-1.5s2.5.7 2.5 1.8c0 2.4-5 1.4-5 3.9 0 1.1 1 1.8 2.5 1.8s2.5-.5 2.5-1.5" />
                </svg>
              </div>
              <h3>Giving is hard to track</h3>
              <p>
                Tithes and offerings get written down in different places and
                rarely add up at month end.
              </p>
            </div>
          </div>
          <p
            className="rv"
            style={{
              textAlign: "center",
              margin: "32px auto 0",
              fontWeight: 600,
              maxWidth: "560px",
            }}
          >
            Church Manager puts every member, service and offering in one place.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="alt" id="features">
        <div className="w">
          <h2 className="rv">Everything your church needs</h2>
          <p className="sub rv">
            Replace notebooks and scattered chats with one tool your whole team
            can use.
          </p>
          <div className="g">
            <div className="c rv" style={{ "--d": "0ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Member Management</h3>
              <p>
                Keep profiles, departments and contact details organized and
                searchable.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "90ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4 12 14.01l-3-3" />
                </svg>
              </div>
              <h3>Attendance Tracking</h3>
              <p>
                Mark attendance in seconds and see trends across every service.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "180ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>
              <h3>Giving Records</h3>
              <p>
                Record tithes and offerings and give members their own giving
                history.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "270ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3>Events &amp; RSVPs</h3>
              <p>
                Publish services and programs, and let members RSVP in one tap.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "360ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Role-Based Access</h3>
              <p>
                Admins manage everything while members only see what is theirs.
              </p>
            </div>
            <div className="c rv" style={{ "--d": "450ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              </div>
              <h3>Announcements</h3>
              <p>
                Share updates with the whole church or a single department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how">
        <div className="w">
          <h2 className="rv">Up and running in minutes</h2>
          <p className="sub rv">
            No training needed. If you can send a message, you can use it.
          </p>
          <div className="tl rv">
            <i className="fill"></i>
            <div className="step" style={{ "--k": 0 } as React.CSSProperties}>
              <div className="num">1</div>
              <h3>Create your account</h3>
              <p>Sign up and set up your church profile and departments.</p>
            </div>
            <div className="step" style={{ "--k": 1 } as React.CSSProperties}>
              <div className="num">2</div>
              <h3>Add your members</h3>
              <p>Add people one by one or invite them to join themselves.</p>
            </div>
            <div className="step" style={{ "--k": 2 } as React.CSSProperties}>
              <div className="num">3</div>
              <h3>Manage with ease</h3>
              <p>
                Track attendance, record giving and plan events from one
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="alt" id="pricing">
        <div className="w">
          <h2 className="rv">Simple pricing</h2>
          <p className="sub rv">Start free and upgrade as your church grows.</p>
          <div className="pg">
            <div className="pc rv" style={{ "--d": "0ms" } as React.CSSProperties}>
              <h3>Starter</h3>
              <p className="tg">For small fellowships getting started.</p>
              <div className="pr">
                <b>Free</b>
              </div>
              <Link href="/portal/login" className="btn">
                Get Started
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <hr />
              <ul>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Up to 50 members
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Attendance tracking
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Events &amp; RSVPs
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Member dashboard
                </li>
              </ul>
            </div>
            <div className="pc rv pop" style={{ "--d": "100ms" } as React.CSSProperties}>
              <span className="badge">Most popular</span>
              <h3>Growth</h3>
              <p className="tg">For churches ready to grow.</p>
              <div className="pr">
                <span className="dol">₦</span>
                <b>15,000</b>
                <span>/month</span>
              </div>
              <Link href="/portal/login" className="btn r">
                Get Started
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <hr />
              <ul>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Everything in Starter
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Up to 500 members
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Giving records &amp; reports
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Announcements
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Priority email support
                </li>
              </ul>
            </div>
            <div className="pc rv" style={{ "--d": "200ms" } as React.CSSProperties}>
              <h3>Ministry</h3>
              <p className="tg">For large churches and networks.</p>
              <div className="pr">
                <span className="dol">₦</span>
                <b>35,000</b>
                <span>/month</span>
              </div>
              <Link href="/portal/login" className="btn">
                Get Started
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <hr />
              <ul>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Everything in Growth
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Unlimited members
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Multiple admins &amp; roles
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Advanced reports &amp; exports
                </li>
                <li>
                  <svg viewBox="0 0 24 24">
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                  Dedicated onboarding
                </li>
              </ul>
            </div>
          </div>
          <p className="pnote rv">Prices in Nigerian Naira. Cancel anytime.</p>
        </div>
      </section>

      {/* Security Section */}
      <section id="security">
        <div className="w">
          <h2 className="rv">Security you can trust</h2>
          <p className="sub rv">
            Your congregation trusts you with their details. We treat that seriously.
          </p>
          <div className="g">
            <div className="c rv" style={{ "--d": "0ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3>Role-based access</h3>
              <p>Admins, leaders and members each see only what they should.</p>
            </div>
            <div className="c rv" style={{ "--d": "90ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3>Encrypted data</h3>
              <p>Information is encrypted in transit and at rest.</p>
            </div>
            <div className="c rv" style={{ "--d": "180ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <path d="M18 10a6 6 0 0 0-11.7-1.5A4.5 4.5 0 0 0 6.5 18H18a4 4 0 0 0 0-8z" />
                </svg>
              </div>
              <h3>Regular backups</h3>
              <p>Your records are backed up so nothing is lost.</p>
            </div>
            <div className="c rv" style={{ "--d": "270ms" } as React.CSSProperties}>
              <div className="ic">
                <svg viewBox="0 0 24 24">
                  <ellipse cx="12" cy="5" rx="8" ry="3" />
                  <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                </svg>
              </div>
              <h3>You own your data</h3>
              <p>Export your member and giving records whenever you want.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated FAQ Section */}
      <section className="alt" id="faq">
        <div className="w">
          <h2 className="rv">Questions, answered</h2>
          <p className="sub rv">Can&rsquo;t find what you need? Search below or reach out directly.</p>
          <AnimatedFAQ />
        </div>
      </section>

      {/* Final Call To Action */}
      <section>
        <div className="w">
          <div className="cta2 rv">
            <h2>Ready to shepherd with clarity?</h2>
            <p>
              Create your free account in minutes and bring your whole church into
              one place.
            </p>
            <div className="hb">
              <Link href="/portal/login" className="btn r big">
                Create Account
                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link href="/portal/login" className="btn big">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="w">
          <div className="fg">
            <div>
              <div
                className="brand"
                style={{ marginBottom: "10px", color: "var(--tx)" }}
              >
                <span className="logo">
                  <Image
                    src="/logo.png"
                    alt="REDDOX"
                    width={28}
                    height={28}
                    className="logo-img"
                  />
                </span>
                <span className="brand-name">
                  RED<span className="brand-dox">DOX</span>
                </span>
              </div>
              <p style={{ margin: 0, maxWidth: "320px" }}>
                Church operations, reimagined. Simple tools for churches to care for people, track attendance and
                manage giving.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how">How It Works</a>
              <a href="#pricing">Pricing</a>
              <a href="#security">Security</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact us</a>
            </div>
            <div>
              <h4>Account</h4>
              <Link href="/portal/login">Sign In</Link>
              <Link href="/portal/login">Create Account</Link>
            </div>
          </div>
          <div className="fb">
            <span>&copy; 2026 REDDOX. All rights reserved.</span>
            <span>Church operations, reimagined</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
