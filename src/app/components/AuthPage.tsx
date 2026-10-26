"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const { loginAs } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [toastMsg, setToastMsg] = useState("");

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

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // Status & Completion State (no portal redirect)
  const [isLoading, setIsLoading] = useState(false);
  const [doneState, setDoneState] = useState<{
    title: string;
    subtitle: string;
    accountName: string;
  } | null>(null);

  // Sync mode with URL hash or query params
  useEffect(() => {
    const qMode = searchParams.get("mode");
    const hash = window.location.hash;

    if (qMode === "signup" || hash === "#signup") {
      setMode("signup");
      document.title = "REDDOX – Create Account";
    } else if (qMode === "forgot" || hash === "#forgot") {
      setMode("forgot");
      document.title = "REDDOX – Reset Password";
    } else {
      setMode("signin");
      document.title = "REDDOX – Sign In";
    }

    const handleHash = () => {
      if (window.location.hash === "#signup") {
        setMode("signup");
        document.title = "REDDOX – Create Account";
      } else if (window.location.hash === "#forgot") {
        setMode("forgot");
        document.title = "REDDOX – Reset Password";
      } else if (window.location.hash === "#signin") {
        setMode("signin");
        document.title = "REDDOX – Sign In";
      }
    };

    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [searchParams]);

  const switchMode = (newMode: "signin" | "signup" | "forgot") => {
    setMode(newMode);
    setToastMsg("");
    setSigninErrors({});
    setSignupErrors({});
    setForgotError("");
    setForgotSent(false);
    setDoneState(null);

    const titleMap = {
      signin: "REDDOX – Sign In",
      signup: "REDDOX – Create Account",
      forgot: "REDDOX – Reset Password",
    };
    document.title = titleMap[newMode];
    window.history.replaceState(null, "", `#${newMode}`);
  };

  // Sign In Submit
  const handleSigninSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { email?: string; password?: string } = {};

    if (!EMAIL_REGEX.test(signinEmail.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!signinPassword) {
      errors.password = "Please enter your password.";
    }

    if (Object.keys(errors).length > 0) {
      setSigninErrors(errors);
      return;
    }

    setSigninErrors({});
    setIsLoading(true);

    setTimeout(() => {
      const isPastor =
        signinEmail.toLowerCase().includes("pastor") ||
        signinEmail.toLowerCase().includes("admin");

      loginAs(isPastor ? "admin" : "member");
      setIsLoading(false);
      setDoneState({
        title: "Welcome Back!",
        subtitle: "You have signed in successfully. Authentication verified.",
        accountName: isPastor ? "Pastor Tosin Adewale" : signinEmail || "Church Member",
      });
    }, 750);
  };

  // Sign Up Submit
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
      errors.church = "Please enter your church name (min 2 characters).";
    }
    if (!EMAIL_REGEX.test(signupEmail.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (signupPassword.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      errors.confirm = "Please confirm your password.";
    } else if (confirmPassword !== signupPassword) {
      errors.confirm = "Passwords do not match.";
    }
    if (!termsAccepted) {
      errors.terms = "Please accept the Terms of Service & Privacy Policy to continue.";
    }

    if (Object.keys(errors).length > 0) {
      setSignupErrors(errors);
      return;
    }

    setSignupErrors({});
    setIsLoading(true);

    setTimeout(() => {
      loginAs("admin");
      setIsLoading(false);
      setDoneState({
        title: "Account Created!",
        subtitle: `${churchName.trim()} has been registered successfully on REDDOX.`,
        accountName: churchName.trim(),
      });
    }, 850);
  };

  // Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(forgotEmail.trim())) {
      setForgotError("Please enter a valid registered email address.");
      return;
    }

    setForgotError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setForgotSent(true);
    }, 700);
  };

  // Password calculations
  const pwdScore = scorePassword(signupPassword);
  const passwordsMatch = confirmPassword.length > 0 && confirmPassword === signupPassword;

  return (
    <div className="fs-auth">
      {/* =========================================================
          LEFT COLUMN: BRANDED HERO PANEL (Desktop only)
          Removed on mobile via CSS (display: none !important)
          ========================================================= */}
      <aside className="fs-hero" aria-hidden="true">
        {/* Animated aura rings */}
        <div className="fs-hero-rings">
          <div className="fs-hero-ring" />
          <div className="fs-hero-ring" />
          <div className="fs-hero-ring" />
        </div>

        {/* Ambient floating glowing light orbs */}
        <div className="fs-hero-glow1" />
        <div className="fs-hero-glow2" />

        {/* Hero Top Logo & REDDOX Brand */}
        <div className="fs-hero-content">
          <Link href="/" className="fs-hero-brand">
            <span className="fs-brand-logo-box">
              <Image
                src="/logo.png"
                alt="REDDOX Logo"
                width={36}
                height={36}
                className="logo-img"
                priority
              />
            </span>
            <div>
              <div className="fs-hero-name">
                RED<span className="fs-hero-dox">DOX</span>
              </div>
              <div className="fs-hero-tag">Church Operations, Reimagined</div>
            </div>
          </Link>
        </div>

        {/* Hero Middle Content (Adaptive to Mode) */}
        <div className="fs-hero-body">
          <div className="fs-hero-badge">
            <span>✦</span>
            <span>All-in-one ministry platform</span>
          </div>

          {mode === "signin" ? (
            <div className="fs-fade-in" key="hero-signin">
              <h1 className="fs-hero-title">
                Welcome back to your church workspace.
              </h1>
              <p className="fs-hero-desc">
                Everything your pastoral team, ushers, and church members need to
                track services, care for souls, and steward giving with complete clarity.
              </p>
              <ul className="fs-hero-list">
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Instant Sunday attendance & first-timer registers</span>
                </li>
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Automated tithes, offerings & transparent giving records</span>
                </li>
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Direct ministry duty rosters & WhatsApp announcements</span>
                </li>
              </ul>
            </div>
          ) : mode === "signup" ? (
            <div className="fs-fade-in" key="hero-signup">
              <h1 className="fs-hero-title">
                Bring your whole church together.
              </h1>
              <p className="fs-hero-desc">
                Set up in under two minutes. Completely free for up to 50 members.
                Built specifically for pastors, ushers, and growing congregations.
              </p>
              <ul className="fs-hero-list">
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Track members, converts, and weekly service growth</span>
                </li>
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Record tithes, special pledges & accounting exports</span>
                </li>
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Empower every member with their own private hub</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="fs-fade-in" key="hero-forgot">
              <h1 className="fs-hero-title">
                Secure account recovery.
              </h1>
              <p className="fs-hero-desc">
                We'll help you regain access to your REDDOX ministry dashboard safely
                and quickly.
              </p>
              <ul className="fs-hero-list">
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Direct email reset link delivered instantly</span>
                </li>
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>Protected by industry-standard encryption</span>
                </li>
                <li className="fs-hero-item">
                  <span className="fs-hero-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  </span>
                  <span>No data loss, everything preserved safely</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Hero Footer */}
        <div className="fs-hero-foot">
          <span>&copy; 2026 REDDOX. All rights reserved.</span>
          <span>Encrypted Ministry Workspace</span>
        </div>
      </aside>

      {/* =========================================================
          RIGHT COLUMN: FULL-SCREEN FORM PANEL (Gum to screen)
          ========================================================= */}
      <main className="fs-form-panel">
        {/* Soft background radial lighting */}
        <div className="fs-form-orb1" />
        <div className="fs-form-orb2" />

        {/* Form Top Navigation Bar */}
        <nav className="fs-form-top">
          <div className="fs-top-row">
            {/* Mobile brand (shown only on mobile when side panel is hidden) */}
            <Link href="/" className="fs-mobile-brand">
              <span className="fs-mobile-brand-box">
                <Image
                  src="/logo.png"
                  alt="REDDOX"
                  width={28}
                  height={28}
                  className="logo-img"
                  priority
                />
              </span>
              <span className="fs-mobile-title">
                RED<span className="fs-mobile-dox">DOX</span>
              </span>
            </Link>

            {/* Back to Home Link */}
            <Link href="/" className="fs-back-btn">
              <span>&larr;</span> Back to Home
            </Link>
          </div>

          {/* Pill Switcher between Sign In & Create Account */}
          {mode !== "forgot" && (
            <div className="fs-switch-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signin"}
                className={`fs-tab-btn ${mode === "signin" ? "active" : ""}`}
                onClick={() => switchMode("signin")}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signup"}
                className={`fs-tab-btn ${mode === "signup" ? "active" : ""}`}
                onClick={() => switchMode("signup")}
              >
                Create Account
              </button>
            </div>
          )}
        </nav>

        {/* Centered Edge-to-Edge Form Container */}
        <div className="fs-form-container">
          {doneState ? (
            /* ================= SUCCESS STATE (No portal redirect) ================= */
            <div className="fs-done-box">
              <svg className="fs-done-svg" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="29" />
                <path d="M24 37l8 8 16-17" />
              </svg>
              <h2>{doneState.title}</h2>
              <p>{doneState.subtitle}</p>

              <div className="fs-done-actions">
                <Link href="/" className="fs-btn">
                  <span>Return to Home Page</span>
                  <svg className="fs-arr" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => setDoneState(null)}
                  className="fs-done-btn-outline"
                >
                  {mode === "signin" ? "Sign In with another account" : "Register another church"}
                </button>
              </div>
            </div>
          ) : mode === "signin" ? (
            /* ================= SIGN IN VIEW ================= */
            <div className="fs-fade-in" key="view-signin">
              <h2 className="fs-form-title">Welcome back</h2>
              <p className="fs-form-subtitle">
                Sign in to manage your church operations on REDDOX.
              </p>

              {toastMsg && <div className="fs-toast">{toastMsg}</div>}

              <form onSubmit={handleSigninSubmit} noValidate>
                {/* Email Field */}
                <div className={`fs-field ${signinErrors.email ? "has-error" : ""}`}>
                  <label htmlFor="fs-e1">Email Address</label>
                  <div className="fs-input-box">
                    <input
                      id="fs-e1"
                      type="email"
                      autoComplete="email"
                      placeholder="you@yourchurch.org"
                      value={signinEmail}
                      onChange={(e) => {
                        setSigninEmail(e.target.value);
                        if (signinErrors.email)
                          setSigninErrors({ ...signinErrors, email: undefined });
                      }}
                    />
                    <svg className="fs-input-icon" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>
                  <div className="fs-error-msg">{signinErrors.email}</div>
                </div>

                {/* Password Field */}
                <div className={`fs-field ${signinErrors.password ? "has-error" : ""}`}>
                  <label htmlFor="fs-p1">Password</label>
                  <div className="fs-input-box">
                    <input
                      id="fs-p1"
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
                    <svg className="fs-input-icon" viewBox="0 0 24 24">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <button
                      type="button"
                      className="fs-eye-btn"
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
                  <div className="fs-error-msg">{signinErrors.password}</div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="fs-row">
                  <label className="fs-chk">
                    <input type="checkbox" defaultChecked />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      switchMode("forgot");
                    }}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`fs-btn ${isLoading ? "is-loading" : ""}`}
                >
                  <span className="fs-spin" />
                  <span className="fs-lbl">Sign In to Account</span>
                  <svg className="fs-arr" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>

              <div className="fs-bottom-switch">
                New to REDDOX?{" "}
                <a
                  href="#signup"
                  onClick={(e) => {
                    e.preventDefault();
                    switchMode("signup");
                  }}
                >
                  Create your church account
                </a>
              </div>
            </div>
          ) : mode === "signup" ? (
            /* ================= SIGN UP VIEW ================= */
            <div className="fs-fade-in" key="view-signup">
              <h2 className="fs-form-title">Create your account</h2>
              <p className="fs-form-subtitle">
                Register your church to get started with unified operations.
              </p>

              <form onSubmit={handleSignupSubmit} noValidate>
                {/* Church Name */}
                <div className={`fs-field ${signupErrors.church ? "has-error" : ""}`}>
                  <label htmlFor="fs-c2">Church Name</label>
                  <div className="fs-input-box">
                    <input
                      id="fs-c2"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Grace Chapel Abeokuta"
                      value={churchName}
                      onChange={(e) => {
                        setChurchName(e.target.value);
                        if (signupErrors.church)
                          setSignupErrors({ ...signupErrors, church: undefined });
                      }}
                    />
                    <svg className="fs-input-icon" viewBox="0 0 24 24">
                      <path d="M12 2v5M9.5 4.5h5" />
                      <path d="M5 22V12l7-5 7 5v10z" />
                      <path d="M10 22v-5a2 2 0 0 1 4 0v5" />
                    </svg>
                  </div>
                  <div className="fs-error-msg">{signupErrors.church}</div>
                </div>

                {/* Email Address */}
                <div className={`fs-field ${signupErrors.email ? "has-error" : ""}`}>
                  <label htmlFor="fs-e2">Work / Church Email</label>
                  <div className="fs-input-box">
                    <input
                      id="fs-e2"
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
                    <svg className="fs-input-icon" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>
                  <div className="fs-error-msg">{signupErrors.email}</div>
                </div>

                {/* Password Field */}
                <div className={`fs-field ${signupErrors.password ? "has-error" : ""}`}>
                  <label htmlFor="fs-p2">Password</label>
                  <div className="fs-input-box">
                    <input
                      id="fs-p2"
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
                    <svg className="fs-input-icon" viewBox="0 0 24 24">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <button
                      type="button"
                      className="fs-eye-btn"
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
                  <div className="fs-meter-bars">
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
                  <div className="fs-meter-hint">
                    {signupPassword ? (
                      <>
                        <span style={{ fontWeight: 700, color: STRENGTH_COLORS[pwdScore] }}>
                          {STRENGTH_LABELS[pwdScore]}
                        </span>
                        {pwdScore < 3 && " – mix letters, numbers & symbols for strength"}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="fs-error-msg">{signupErrors.password}</div>
                </div>

                {/* Confirm Password */}
                <div
                  className={`fs-field ${signupErrors.confirm ? "has-error" : ""} ${
                    passwordsMatch ? "is-match" : ""
                  }`}
                >
                  <label htmlFor="fs-q2">Confirm Password</label>
                  <div className="fs-input-box">
                    <input
                      id="fs-q2"
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
                    <svg className="fs-input-icon" viewBox="0 0 24 24">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    <button
                      type="button"
                      className="fs-eye-btn"
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
                  <div className="fs-error-msg">{signupErrors.confirm}</div>
                  <div className="fs-match-msg">✓ Passwords match</div>
                </div>

                {/* Terms & Privacy */}
                <div className={`fs-field ${signupErrors.terms ? "has-error" : ""}`}>
                  <label className="fs-chk">
                    <input
                      id="fs-t2"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (signupErrors.terms)
                          setSignupErrors({ ...signupErrors, terms: undefined });
                      }}
                    />
                    <span>
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </label>
                  <div className="fs-error-msg">{signupErrors.terms}</div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`fs-btn ${isLoading ? "is-loading" : ""}`}
                >
                  <span className="fs-spin" />
                  <span className="fs-lbl">Register Church Account</span>
                  <svg className="fs-arr" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </form>

              <div className="fs-bottom-switch">
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
              </div>
            </div>
          ) : (
            /* ================= FORGOT / RESET PASSWORD VIEW ================= */
            <div className="fs-fade-in" key="view-forgot">
              <h2 className="fs-form-title">Reset your password</h2>
              <p className="fs-form-subtitle">
                Enter your registered church email address and we will send you recovery instructions.
              </p>

              {forgotSent ? (
                <div className="fs-done-box" style={{ padding: "20px 0" }}>
                  <svg className="fs-done-svg" viewBox="0 0 72 72">
                    <circle cx="36" cy="36" r="29" />
                    <path d="M24 37l8 8 16-17" />
                  </svg>
                  <h3 style={{ fontSize: 22, margin: "0 0 8px" }}>Check your inbox</h3>
                  <p style={{ fontSize: 14.5 }}>
                    We have sent password recovery instructions to{" "}
                    <strong>{forgotEmail}</strong>. Follow the link in the email to reset your credentials.
                  </p>
                  <div className="fs-done-actions" style={{ marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => switchMode("signin")}
                      className="fs-btn"
                    >
                      &larr; Back to Sign In
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} noValidate>
                  {/* Email Field */}
                  <div className={`fs-field ${forgotError ? "has-error" : ""}`}>
                    <label htmlFor="fs-f1">Your Registered Email</label>
                    <div className="fs-input-box">
                      <input
                        id="fs-f1"
                        type="email"
                        autoComplete="email"
                        placeholder="you@yourchurch.org"
                        value={forgotEmail}
                        onChange={(e) => {
                          setForgotEmail(e.target.value);
                          if (forgotError) setForgotError("");
                        }}
                      />
                      <svg className="fs-input-icon" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </div>
                    <div className="fs-error-msg">{forgotError}</div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`fs-btn ${isLoading ? "is-loading" : ""}`}
                  >
                    <span className="fs-spin" />
                    <span className="fs-lbl">Send Recovery Link</span>
                    <svg className="fs-arr" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>

                  <div className="fs-bottom-switch">
                    Remembered your password?{" "}
                    <a
                      href="#signin"
                      onClick={(e) => {
                        e.preventDefault();
                        switchMode("signin");
                      }}
                    >
                      &larr; Return to Sign In
                    </a>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
