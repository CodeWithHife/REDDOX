"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "../auth.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["#b3261e", "#b3261e", "#d9902f", "#b8862d", "#6d2a3c"];

function scorePassword(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return p.length < 8 ? Math.min(s, 1) : s;
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginAs } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [forgotMsg, setForgotMsg] = useState("");

  // Sign In State
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [showSigninPassword, setShowSigninPassword] = useState(false);
  const [signinErrors, setSigninErrors] = useState<{ email?: string; password?: string }>({});

  // Sign Up State
  const [churchName, setChurchName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupErrors, setSignupErrors] = useState<{
    church?: string;
    email?: string;
    password?: string;
    confirm?: string;
    terms?: string;
  }>({});

  // Status & Done
  const [loading, setLoading] = useState(false);
  const [doneData, setDoneData] = useState<{ title: string; msg: string } | null>(null);

  // Sync mode with URL hash or query params
  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "signup" || window.location.hash === "#signup") {
      setMode("signup");
      document.title = "Church Manager – Create account";
    } else {
      setMode("signin");
      document.title = "Church Manager – Sign in";
    }

    const handleHashChange = () => {
      if (window.location.hash === "#signup") {
        setMode("signup");
        document.title = "Church Manager – Create account";
      } else if (window.location.hash === "#signin") {
        setMode("signin");
        document.title = "Church Manager – Sign in";
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [searchParams]);

  const switchMode = (newMode: "signin" | "signup") => {
    setMode(newMode);
    setForgotMsg("");
    setSigninErrors({});
    setSignupErrors({});
    document.title = newMode === "signup" ? "Church Manager – Create account" : "Church Manager – Sign in";
    window.history.replaceState(null, "", `#${newMode}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Sign In Form Submit
  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};

    if (!EMAIL_REGEX.test(signinEmail.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!signinPassword) {
      errors.password = "Enter your password.";
    }

    if (Object.keys(errors).length > 0) {
      setSigninErrors(errors);
      return;
    }

    setSigninErrors({});
    setLoading(true);

    setTimeout(() => {
      // Determine role based on identifier
      if (
        signinEmail.toLowerCase().includes("pastor") ||
        signinEmail.toLowerCase().includes("admin") ||
        signinPassword.toLowerCase().includes("admin")
      ) {
        loginAs("admin");
      } else {
        loginAs("member");
      }

      setLoading(false);
      setDoneData({
        title: "Welcome back",
        msg: "Signing you in to your dashboard…",
      });

      setTimeout(() => {
        router.push("/portal");
      }, 1200);
    }, 900);
  };

  // Quick 1-Click Demo Login
  const handleQuickLogin = (role: "admin" | "member", memberId?: string) => {
    setLoading(true);
    setTimeout(() => {
      loginAs(role, memberId);
      setLoading(false);
      setDoneData({
        title: "Welcome back",
        msg: role === "admin" ? "Opening Pastor & Admin Dashboard…" : "Opening Member Hub…",
      });
      setTimeout(() => {
        router.push("/portal");
      }, 1100);
    }, 500);
  };

  // Sign Up Form Submit
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      church?: string;
      email?: string;
      password?: string;
      confirm?: string;
      terms?: string;
    } = {};

    if (churchName.trim().length < 2) {
      errors.church = "Enter your church name.";
    }
    if (!EMAIL_REGEX.test(signupEmail.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (signupPassword.length < 8) {
      errors.password = "Use at least 8 characters.";
    }
    if (!confirmPassword) {
      errors.confirm = "Confirm your password.";
    } else if (confirmPassword !== signupPassword) {
      errors.confirm = "Passwords do not match.";
    }
    if (!termsAccepted) {
      errors.terms = "Please accept the terms to continue.";
    }

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setSignupErrors({});
    setLoading(true);

    setTimeout(() => {
      loginAs("admin");
      setLoading(false);
      setDoneData({
        title: "Account created",
        msg: `${churchName.trim() || "Your church"} is ready to go.`,
      });

      setTimeout(() => {
        router.push("/portal");
      }, 1200);
    }, 1000);
  };

  // Live password strength calculation
  const pwdScore = scorePassword(signupPassword);
  const passwordsMatch = confirmPassword.length > 0 && confirmPassword === signupPassword;

  return (
    <div className="auth-page">
      {/* Background with floating orbs */}
      <div className="auth-bg">
        <b className="auth-orb auth-o1" />
        <b className="auth-orb auth-o2" />
      </div>

      <div className="auth-shell">
        {/* Top Header Bar */}
        <header className="auth-top">
          <Link href="/" className="auth-brand">
            <span className="auth-logo">
              <svg viewBox="0 0 24 24">
                <path d="M12 3v18M6 9h12" />
              </svg>
            </span>
            <span>Church Manager</span>
          </Link>
          <Link href="/" className="auth-back">
            <span>&larr;</span> Back to home
          </Link>
        </header>

        {/* Main Glassmorphic Auth Box */}
        <main className="auth-main">
          {doneData ? (
            <section className="auth-view auth-glass" style={{ maxWidth: 460 }}>
              <div className="auth-fw">
                <div className="auth-done">
                  <svg viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="29" />
                    <path d="M24 37l8 8 16-17" />
                  </svg>
                  <h1>{doneData.title}</h1>
                  <p className="auth-sub">{doneData.msg}</p>
                  <small>Redirecting to your church portal…</small>
                  <Link href="/portal" className="auth-btn" style={{ height: 42, fontSize: 14 }}>
                    Continue to Dashboard &rarr;
                  </Link>
                </div>
              </div>
            </section>
          ) : mode === "signin" ? (
            /* ================= SIGN IN VIEW ================= */
            <section className="auth-view auth-glass" id="auth-signin">
              <div className="auth-fw" style={{ padding: 0 }}>
                <h1 className="auth-h1">Welcome back</h1>
                <p className="auth-sub">Sign in to manage your church.</p>

                {forgotMsg && <div className="auth-toast">{forgotMsg}</div>}

                {/* 1-Click Instant Demo Login */}
                <div className="auth-demo-box">
                  <div className="auth-demo-title">⚡ 1-Click Instant Demo Access</div>
                  <div className="auth-demo-grid">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin("admin")}
                      className="auth-demo-btn"
                    >
                      <span className="flex items-center gap-2">
                        <span>👑 Pastor Tosin Adewale</span>
                      </span>
                      <span className="badge" style={{ background: "#f3e4e6", color: "#6d2a3c" }}>
                        Pastor / Admin
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin("member", "mem-2")}
                      className="auth-demo-btn"
                    >
                      <span className="flex items-center gap-2">
                        <span>👤 Sister Blessing Adeyemi</span>
                      </span>
                      <span className="badge" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                        Member Hub
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin("member", "mem-3")}
                      className="auth-demo-btn"
                    >
                      <span className="flex items-center gap-2">
                        <span>👤 Brother Samuel Okon</span>
                      </span>
                      <span className="badge" style={{ background: "#f1f5f9", color: "#475569" }}>
                        Usher / Worker
                      </span>
                    </button>
                  </div>
                </div>

                <div className="auth-divider">
                  <div className="auth-divider-line" />
                  <span className="auth-divider-text">Or Sign In with Email</span>
                </div>

                <form onSubmit={handleSigninSubmit} noValidate>
                  {/* Email Field */}
                  <div className={`auth-f ${signinErrors.email ? "bad" : ""}`}>
                    <label htmlFor="e1">Email</label>
                    <div className="auth-in">
                      <svg className="auth-i" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                      <input
                        id="e1"
                        type="email"
                        autoComplete="email"
                        placeholder="you@yourchurch.org"
                        value={signinEmail}
                        onChange={(e) => {
                          setSigninEmail(e.target.value);
                          if (signinErrors.email) setSigninErrors({ ...signinErrors, email: undefined });
                        }}
                      />
                    </div>
                    <div className="auth-er">{signinErrors.email}</div>
                  </div>

                  {/* Password Field */}
                  <div className={`auth-f ${signinErrors.password ? "bad" : ""}`}>
                    <label htmlFor="p1">Password</label>
                    <div className="auth-in">
                      <svg className="auth-i" viewBox="0 0 24 24">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      <input
                        id="p1"
                        type={showSigninPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Your password"
                        value={signinPassword}
                        onChange={(e) => {
                          setSigninPassword(e.target.value);
                          if (signinErrors.password)
                            setSigninErrors({ ...signinErrors, password: undefined });
                        }}
                      />
                      <button
                        type="button"
                        className="auth-eye"
                        aria-label={showSigninPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowSigninPassword(!showSigninPassword)}
                      >
                        {showSigninPassword ? (
                          <svg viewBox="0 0 24 24">
                            <path d="M3 3l18 18" />
                            <path d="M10.6 6.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="auth-er">{signinErrors.password}</div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="auth-row">
                    <label className="auth-chk">
                      <input type="checkbox" defaultChecked />
                      <span>Remember me</span>
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        setForgotMsg(
                          "Demo mode: To reset password, please contact your church admin or use the 1-Click login above."
                        );
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    className={`auth-btn ${loading ? "load" : ""}`}
                    type="submit"
                    disabled={loading}
                  >
                    <span className="auth-spin" />
                    <span className="auth-lbl">Sign In</span>
                    <svg className="auth-arr" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>

                <p className="auth-swp">
                  New to Church Manager?{" "}
                  <a
                    href="#signup"
                    onClick={(e) => {
                      e.preventDefault();
                      switchMode("signup");
                    }}
                  >
                    Create your church account
                  </a>
                </p>
              </div>
            </section>
          ) : (
            /* ================= SIGN UP VIEW (SPLIT CARD) ================= */
            <section className="auth-view auth-glass auth-split" id="auth-signup">
              {/* Left Brand Panel */}
              <div className="auth-side">
                <h2>Bring your whole church together</h2>
                <p>Set up in minutes. Free for up to 50 members.</p>
                <ul>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                    <span>Track members and Sunday attendance</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                    <span>Record tithes and offerings clearly</span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                    <span>Give every member their own dashboard</span>
                  </li>
                </ul>
              </div>

              {/* Right Form Panel */}
              <div className="auth-fw">
                <h1 className="auth-h1">Create your account</h1>
                <p className="auth-sub">Register your church to get started.</p>

                <form onSubmit={handleSignupSubmit} noValidate>
                  {/* Church Name */}
                  <div className={`auth-f ${signupErrors.church ? "bad" : ""}`}>
                    <label htmlFor="c2">Church name</label>
                    <div className="auth-in">
                      <svg className="auth-i" viewBox="0 0 24 24">
                        <path d="M12 2v5M9.5 4.5h5" />
                        <path d="M5 22V12l7-5 7 5v10z" />
                        <path d="M10 22v-5a2 2 0 0 1 4 0v5" />
                      </svg>
                      <input
                        id="c2"
                        type="text"
                        autoComplete="organization"
                        placeholder="e.g. Grace Chapel"
                        value={churchName}
                        onChange={(e) => {
                          setChurchName(e.target.value);
                          if (signupErrors.church)
                            setSignupErrors({ ...signupErrors, church: undefined });
                        }}
                      />
                    </div>
                    <div className="auth-er">{signupErrors.church}</div>
                  </div>

                  {/* Email */}
                  <div className={`auth-f ${signupErrors.email ? "bad" : ""}`}>
                    <label htmlFor="e2">Email</label>
                    <div className="auth-in">
                      <svg className="auth-i" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                      <input
                        id="e2"
                        type="email"
                        autoComplete="email"
                        placeholder="you@yourchurch.org"
                        value={signupEmail}
                        onChange={(e) => {
                          setSignupEmail(e.target.value);
                          if (signupErrors.email)
                            setSignupErrors({ ...signupErrors, email: undefined });
                        }}
                      />
                    </div>
                    <div className="auth-er">{signupErrors.email}</div>
                  </div>

                  {/* Password */}
                  <div className={`auth-f ${signupErrors.password ? "bad" : ""}`}>
                    <label htmlFor="p2">Password</label>
                    <div className="auth-in">
                      <svg className="auth-i" viewBox="0 0 24 24">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      <input
                        id="p2"
                        type={showSignupPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        value={signupPassword}
                        onChange={(e) => {
                          setSignupPassword(e.target.value);
                          if (signupErrors.password)
                            setSignupErrors({ ...signupErrors, password: undefined });
                        }}
                      />
                      <button
                        type="button"
                        className="auth-eye"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                      >
                        {showSignupPassword ? (
                          <svg viewBox="0 0 24 24">
                            <path d="M3 3l18 18" />
                            <path d="M10.6 6.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Password Strength Meter */}
                    <div className="auth-meter">
                      {[0, 1, 2, 3].map((idx) => {
                        const active = signupPassword.length > 0 && idx < Math.max(pwdScore, 1);
                        const color = active ? STRENGTH_COLORS[pwdScore] : "";
                        return (
                          <i
                            key={idx}
                            style={{
                              background: color || "var(--bd)",
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="auth-sl">
                      {signupPassword ? (
                        <>
                          <span style={{ fontWeight: 600, color: STRENGTH_COLORS[pwdScore] }}>
                            {STRENGTH_LABELS[pwdScore]}
                          </span>
                          {pwdScore < 3 && " – try mixing letters, numbers & symbols"}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="auth-er">{signupErrors.password}</div>
                  </div>

                  {/* Confirm Password */}
                  <div
                    className={`auth-f ${signupErrors.confirm ? "bad" : ""} ${
                      passwordsMatch ? "good" : ""
                    }`}
                  >
                    <label htmlFor="q2">Confirm password</label>
                    <div className="auth-in">
                      <svg className="auth-i" viewBox="0 0 24 24">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                      <input
                        id="q2"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (signupErrors.confirm)
                            setSignupErrors({ ...signupErrors, confirm: undefined });
                        }}
                      />
                      <button
                        type="button"
                        className="auth-eye"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg viewBox="0 0 24 24">
                            <path d="M3 3l18 18" />
                            <path d="M10.6 6.1A9.7 9.7 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6C3.7 8.4 2 12 2 12s4 7 10 7c1.6 0 3-.4 4.3-1" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="auth-er">{signupErrors.confirm}</div>
                    <div className="auth-ok">✓ Passwords match</div>
                  </div>

                  {/* Terms & Privacy */}
                  <div className={`auth-f ${signupErrors.terms ? "bad" : ""}`}>
                    <label className="auth-chk">
                      <input
                        id="t2"
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => {
                          setTermsAccepted(e.target.checked);
                          if (signupErrors.terms)
                            setSignupErrors({ ...signupErrors, terms: undefined });
                        }}
                      />
                      <span>I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                    <div className="auth-er">{signupErrors.terms}</div>
                  </div>

                  {/* Submit Button */}
                  <button
                    className={`auth-btn ${loading ? "load" : ""}`}
                    type="submit"
                    disabled={loading}
                  >
                    <span className="auth-spin" />
                    <span className="auth-lbl">Create Account</span>
                    <svg className="auth-arr" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </form>

                <p className="auth-swp">
                  Already have an account?{" "}
                  <a
                    href="#signin"
                    onClick={(e) => {
                      e.preventDefault();
                      switchMode("signin");
                    }}
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
