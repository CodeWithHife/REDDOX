// src/app/onboarding/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "./onboarding.css";

const DENOMINATIONS = [
  "Pentecostal",
  "Baptist",
  "Anglican",
  "Catholic",
  "Methodist",
  "Presbyterian",
  "Orthodox",
  "Non-denominational",
  "Other",
];

const ONBOARDING_STORAGE_KEY = "reddox-onboarding-draft";

export interface OnboardingData {
  addr: string;
  phone: string;
  den: string;
  denO: string;
  members: string;
  branches: string;
  imp: "yes" | "no";
  logoUrl?: string | null;
  logoName?: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Signed-in Church Account Details
  const [account, setAccount] = useState({
    church: "Grace Chapel",
    name: "Pastor Adewale",
    email: "adewale@gracechapel.org",
  });

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"fw" | "bw">("fw");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [offlineError, setOfflineError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState<OnboardingData>({
    addr: "",
    phone: "",
    den: "",
    denO: "",
    members: "",
    branches: "1",
    imp: "no",
    logoUrl: null,
    logoName: "",
  });

  const [logoError, setLogoError] = useState("");

  // Load registered church data & draft from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Check if user just signed up with church details
      const registeredChurch = localStorage.getItem("reddox_pending_signup");
      if (registeredChurch) {
        try {
          const reg = JSON.parse(registeredChurch);
          setAccount({
            church: reg.churchName || "Grace Chapel",
            name: reg.pastorName || user?.name || "Pastor " + (reg.churchName ? reg.churchName.split(" ")[0] : "Adewale"),
            email: reg.email || user?.email || "pastor@gracechapel.org",
          });
        } catch (e) {
          // fallback
        }
      } else if (user) {
        setAccount({
          church: "Grace Chapel",
          name: user.name || "Pastor Adewale",
          email: user.email || "adewale@gracechapel.org",
        });
      }

      // 2. Load draft if exists
      try {
        const draft = localStorage.getItem(ONBOARDING_STORAGE_KEY);
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed.d) setFormData((prev) => ({ ...prev, ...parsed.d }));
          if (parsed.step && parsed.step >= 1 && parsed.step <= 3) setStep(parsed.step);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [user]);

  // Save draft
  const saveDraft = (updatedData: OnboardingData, currentStep: number) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          ONBOARDING_STORAGE_KEY,
          JSON.stringify({ step: currentStep, d: updatedData })
        );
      } catch (e) {
        // storage quota exceeded or disabled
      }
    }
  };

  const getInitials = (n: string) => {
    return n
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (formData.addr.trim().length < 5) {
      errs.addr = "Enter your church’s address or location (at least 5 characters).";
    }

    const cleanPhone = formData.phone.replace(/[\s\-().]/g, "");
    if (!cleanPhone) {
      errs.phone = "Enter a phone number for your church.";
    } else if (!/^\+?\d{7,15}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid phone number, for example 0801 234 5678.";
    }

    if (formData.den === "Other" && formData.denO.trim().length > 60) {
      errs.denO = "Keep this under 60 characters.";
    }

    return errs;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.members !== "") {
      const num = Number(formData.members);
      if (isNaN(num) || num < 0 || num > 1000000) {
        errs.members = "Enter a whole number, or leave it blank.";
      }
    }

    const brNum = Number(formData.branches);
    if (isNaN(brNum) || brNum < 1 || brNum > 50) {
      errs.branches = "Enter a number of branches from 1 to 50.";
    }

    return errs;
  };

  const handleNext = () => {
    if (busy) return;

    if (step === 1) {
      const errs1 = validateStep1();
      setErrors(errs1);
      if (Object.keys(errs1).length > 0) return;
      setDirection("fw");
      setStep(2);
      saveDraft(formData, 2);
      window.scrollTo(0, 0);
      return;
    }

    if (step === 2) {
      const errs2 = validateStep2();
      setErrors(errs2);
      if (Object.keys(errs2).length > 0) return;
      setDirection("fw");
      setStep(3);
      saveDraft(formData, 3);
      window.scrollTo(0, 0);
      return;
    }

    handleFinish();
  };

  const handleBack = (targetStep?: number) => {
    setDirection("bw");
    setErrors({});
    const nextS = targetStep || step - 1;
    setStep(nextS);
    saveDraft(formData, nextS);
    window.scrollTo(0, 0);
  };

  const handleSkipStep2 = () => {
    const updated = {
      ...formData,
      members: "",
      branches: formData.branches || "1",
    };
    setFormData(updated);
    setErrors({});
    setDirection("fw");
    setStep(3);
    saveDraft(updated, 3);
    window.scrollTo(0, 0);
  };

  // Logo file pick & preview
  const handleLogoFile = (file: File) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type)) {
      setLogoError("Please choose a PNG, JPG, WebP or SVG image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoError("That file is over 2 MB. Choose a smaller image.");
      return;
    }

    setLogoError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const updated = {
        ...formData,
        logoUrl: result,
        logoName: file.name,
      };
      setFormData(updated);
      saveDraft(updated, step);
    };
    reader.readAsDataURL(file);
  };

  // Complete Onboarding & Save
  const handleFinish = () => {
    if (busy) return;

    const errs1 = validateStep1();
    if (Object.keys(errs1).length > 0) {
      setErrors(errs1);
      setDirection("bw");
      setStep(1);
      return;
    }

    const errs2 = validateStep2();
    if (Object.keys(errs2).length > 0) {
      setErrors(errs2);
      setDirection("bw");
      setStep(2);
      return;
    }

    if (!navigator.onLine) {
      setOfflineError("You appear to be offline. Check your connection and retry.");
      return;
    }

    setBusy(true);
    setOfflineError("");

    setTimeout(() => {
      setBusy(false);
      setDone(true);

      // Save complete church profile to localStorage for portal dashboard
      const profile = {
        churchName: account.church,
        pastorName: account.name,
        contactEmail: account.email,
        address: formData.addr,
        phone: formData.phone,
        denomination: formData.den === "Other" ? formData.denO || "Other" : formData.den || "Pentecostal",
        branchesCount: parseInt(formData.branches, 10) || 1,
        approximateMembers: formData.members ? parseInt(formData.members, 10) : 0,
        importPreference: formData.imp,
        logoUrl: formData.logoUrl,
        onboardedAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("reddox_church_profile", JSON.stringify(profile));
        if (!localStorage.getItem("reddox_active_plan")) {
          localStorage.setItem("reddox_active_plan", "starter");
        }
        localStorage.removeItem(ONBOARDING_STORAGE_KEY);
        localStorage.removeItem("reddox_pending_signup");
      }

      window.scrollTo(0, 0);
    }, 1200);
  };

  const denominationDisplay =
    formData.den === "Other" ? formData.denO || "Other" : formData.den;

  return (
    <div className="onboarding-shell">
      {/* Background Luminous Glow */}
      <div className="onboarding-glow">
        <i />
        <i />
      </div>

      {/* Top Navbar */}
      <header className="ob-top">
        <Link href="/" className="ob-brand">
          <span className="ob-logo">
            <Image src="/logo.png" alt="REDDOX" width={22} height={22} priority />
          </span>
          <span>REDDOX</span>
        </Link>
        <div className="ob-who">Signed in as {account.email}</div>
      </header>

      {/* Main Flow Card */}
      <main className="ob-main">
        <section className="ob-card" aria-live="polite">
          {done ? (
            /* ================= SUCCESS DONE VIEW ================= */
            <div className="ob-done">
              <div className="ob-ck">
                <svg className="ob-c" viewBox="0 0 84 84">
                  <circle cx="42" cy="42" r="36" />
                  <path d="M28 43l10 10 19-21" />
                </svg>
              </div>
              <div className="ob-eyebrow">You’re all set</div>
              <h1>Welcome to REDDOX, {account.name.split(" ").pop()}</h1>
              <p className="ob-sub" style={{ maxWidth: 460, margin: "0 auto" }}>
                <b>{account.church}</b>’s workspace is ready to go.
              </p>
              <div className="ob-acts">
                <button
                  type="button"
                  className="ob-btn p"
                  onClick={() => router.push("/portal?plan=starter")}
                >
                  <span>Go to Dashboard</span>
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stepper Progress Bar */}
              <div className="ob-stp" role="list">
                <div className="ob-ln">
                  <i style={{ width: `${(step - 1) * 50}%` }} />
                </div>
                {[
                  { n: 1, title: "Church info" },
                  { n: 2, title: "Setup" },
                  { n: 3, title: "Review" },
                ].map((s) => {
                  const isDone = s.n < step;
                  const isCurrent = s.n === step;
                  return (
                    <div
                      key={s.n}
                      className={`ob-s ${isDone ? "dn" : isCurrent ? "on" : ""}`}
                      role="listitem"
                      aria-current={isCurrent ? "step" : undefined}
                    >
                      <b>
                        {isDone ? (
                          <svg viewBox="0 0 24 24">
                            <path d="m5 12 4 4 10-10" />
                          </svg>
                        ) : (
                          s.n
                        )}
                      </b>
                      <span>{s.title}</span>
                    </div>
                  );
                })}
              </div>

              {/* Step Forms */}
              <form
                className={`ob-stepv ${direction === "bw" ? "bw" : ""}`}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                noValidate
              >
                {step === 1 && (
                  /* ================= STEP 1: CHURCH INFO ================= */
                  <div>
                    <div className="ob-eyebrow">Step 1 of 3</div>
                    <h1>Tell us about your church</h1>
                    <p className="ob-sub">
                      We already have your name and church name. Just a few more details.
                    </p>

                    {/* Verified Account Banner */}
                    <div className="ob-acct">
                      <span className="ob-a">{getInitials(account.name)}</span>
                      <div>
                        <b>{account.church}</b>
                        <small>
                          {account.name} &middot; {account.email}
                        </small>
                      </div>
                      <svg viewBox="0 0 24 24" aria-label="From your account">
                        <rect x="4" y="11" width="16" height="10" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    </div>

                    {/* Address Field */}
                    <div className={`ob-fi ${errors.addr ? "bad" : ""}`}>
                      <label htmlFor="f-addr">Church address or location</label>
                      <input
                        id="f-addr"
                        type="text"
                        autoComplete="street-address"
                        placeholder="Street, area or landmark"
                        value={formData.addr}
                        onChange={(e) => {
                          const updated = { ...formData, addr: e.target.value };
                          setFormData(updated);
                          if (errors.addr) setErrors({ ...errors, addr: "" });
                          saveDraft(updated, 1);
                        }}
                      />
                      <div className="ob-er">{errors.addr}</div>
                    </div>

                    {/* Phone Field */}
                    <div className={`ob-fi ${errors.phone ? "bad" : ""}`}>
                      <label htmlFor="f-phone">Church phone number</label>
                      <input
                        id="f-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="0801 234 5678"
                        value={formData.phone}
                        onChange={(e) => {
                          const updated = { ...formData, phone: e.target.value };
                          setFormData(updated);
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                          saveDraft(updated, 1);
                        }}
                      />
                      <div className="ob-er">{errors.phone}</div>
                    </div>

                    {/* Denomination Field */}
                    <div className="ob-g2">
                      <div className="ob-fi">
                        <label htmlFor="f-den">
                          <span>Denomination</span>
                          <span className="ob-opt">Optional</span>
                        </label>
                        <select
                          id="f-den"
                          value={formData.den}
                          onChange={(e) => {
                            const updated = { ...formData, den: e.target.value };
                            setFormData(updated);
                            saveDraft(updated, 1);
                          }}
                        >
                          <option value="">Select (optional)</option>
                          {DENOMINATIONS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formData.den === "Other" ? (
                        <div className={`ob-fi ${errors.denO ? "bad" : ""}`}>
                          <label htmlFor="f-denO">
                            <span>Your denomination</span>
                            <span className="ob-opt">Optional</span>
                          </label>
                          <input
                            id="f-denO"
                            type="text"
                            placeholder="Type it here"
                            value={formData.denO}
                            onChange={(e) => {
                              const updated = { ...formData, denO: e.target.value };
                              setFormData(updated);
                              if (errors.denO) setErrors({ ...errors, denO: "" });
                              saveDraft(updated, 1);
                            }}
                          />
                          <div className="ob-er">{errors.denO}</div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Logo Upload Field */}
                    <div className={`ob-fi ${logoError ? "bad" : ""}`}>
                      <div className="ob-lab">
                        <span>Church logo</span>
                        <span className="ob-opt">Optional</span>
                      </div>
                      <label
                        className="ob-drop"
                        id="drop"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add("ov");
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("ov");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove("ov");
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleLogoFile(e.dataTransfer.files[0]);
                          }
                        }}
                      >
                        <input
                          id="f-logo"
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleLogoFile(e.target.files[0]);
                            }
                          }}
                        />
                        <span className="ob-thumb">
                          {formData.logoUrl ? (
                            <img alt="Logo preview" src={formData.logoUrl} />
                          ) : (
                            <svg viewBox="0 0 24 24">
                              <rect x="3" y="3" width="18" height="18" rx="3" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-5-5L5 21" />
                            </svg>
                          )}
                        </span>
                        <p>
                          <b>{formData.logoName || "Upload a logo"}</b>
                          <small>
                            {formData.logoUrl
                              ? "Click or drag to replace"
                              : "PNG, JPG, WebP or SVG, up to 2 MB. Drag and drop works too."}
                          </small>
                        </p>
                        {formData.logoUrl && (
                          <button
                            type="button"
                            className="ob-lk"
                            onClick={(e) => {
                              e.preventDefault();
                              const updated = {
                                ...formData,
                                logoUrl: null,
                                logoName: "",
                              };
                              setFormData(updated);
                              setLogoError("");
                              saveDraft(updated, 1);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </label>
                      <div className="ob-er">{logoError}</div>
                    </div>

                    {/* Step 1 Action Bar */}
                    <div className="ob-bar">
                      <span />
                      <div className="ob-r">
                        <button type="submit" className="ob-btn p" id="nx">
                          <span>Continue</span>
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  /* ================= STEP 2: SETUP ================= */
                  <div>
                    <div className="ob-eyebrow">Step 2 of 3</div>
                    <h1>Set up your church</h1>
                    <p className="ob-sub">
                      Rough answers are fine. Everything here is optional and can be changed in Settings.
                    </p>

                    {/* Members Estimate Field */}
                    <div className={`ob-fi ${errors.members ? "bad" : ""}`}>
                      <label htmlFor="f-members">
                        <span>Approximate number of members</span>
                        <span className="ob-opt">Optional</span>
                      </label>
                      <input
                        id="f-members"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        placeholder="e.g. 120"
                        value={formData.members}
                        onChange={(e) => {
                          const updated = { ...formData, members: e.target.value };
                          setFormData(updated);
                          if (errors.members) setErrors({ ...errors, members: "" });
                          saveDraft(updated, 2);
                        }}
                      />
                      <div className="ob-hint">A rough estimate helps us tailor your dashboard.</div>
                      <div className="ob-er">{errors.members}</div>
                    </div>

                    {/* Branches Stepper Field */}
                    <div className={`ob-fi ${errors.branches ? "bad" : ""}`}>
                      <label htmlFor="f-branches">Number of branches</label>
                      <div className="ob-num">
                        <button
                          type="button"
                          aria-label="Fewer branches"
                          onClick={() => {
                            const current = parseInt(formData.branches, 10) || 1;
                            const nextVal = Math.max(1, current - 1);
                            const updated = { ...formData, branches: String(nextVal) };
                            setFormData(updated);
                            saveDraft(updated, 2);
                          }}
                        >
                          &minus;
                        </button>
                        <input
                          id="f-branches"
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="50"
                          value={formData.branches}
                          onChange={(e) => {
                            const updated = { ...formData, branches: e.target.value };
                            setFormData(updated);
                            saveDraft(updated, 2);
                          }}
                        />
                        <button
                          type="button"
                          aria-label="More branches"
                          onClick={() => {
                            const current = parseInt(formData.branches, 10) || 1;
                            const nextVal = Math.min(50, current + 1);
                            const updated = { ...formData, branches: String(nextVal) };
                            setFormData(updated);
                            saveDraft(updated, 2);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="ob-hint">Most churches start with 1.</div>
                      <div className="ob-er">{errors.branches}</div>
                    </div>

                    {/* Import Records Radio Field */}
                    <div className="ob-fi">
                      <div className="ob-lab" id="imp-l">
                        Do you have existing member records to import?
                      </div>
                      <div className="ob-rad" role="radiogroup" aria-labelledby="imp-l">
                        <label
                          className={formData.imp === "yes" ? "on" : ""}
                          onClick={() => {
                            const updated = { ...formData, imp: "yes" as const };
                            setFormData(updated);
                            saveDraft(updated, 2);
                          }}
                        >
                          <input
                            type="radio"
                            name="imp"
                            value="yes"
                            checked={formData.imp === "yes"}
                            readOnly
                          />
                          <span className="ob-dot" />
                          <span>
                            <b>Yes</b>
                            <small>I have a list or spreadsheet</small>
                          </span>
                        </label>
                        <label
                          className={formData.imp === "no" ? "on" : ""}
                          onClick={() => {
                            const updated = { ...formData, imp: "no" as const };
                            setFormData(updated);
                            saveDraft(updated, 2);
                          }}
                        >
                          <input
                            type="radio"
                            name="imp"
                            value="no"
                            checked={formData.imp === "no"}
                            readOnly
                          />
                          <span className="ob-dot" />
                          <span>
                            <b>No</b>
                            <small>I’ll start fresh</small>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Step 2 Action Bar */}
                    <div className="ob-bar">
                      <button
                        type="button"
                        className="ob-btn"
                        onClick={() => handleBack(1)}
                      >
                        Back
                      </button>
                      <div className="ob-r">
                        <button
                          type="button"
                          className="ob-lk"
                          onClick={handleSkipStep2}
                        >
                          Skip for now
                        </button>
                        <button type="submit" className="ob-btn p" id="nx">
                          <span>Continue</span>
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  /* ================= STEP 3: REVIEW & FINISH ================= */
                  <div>
                    <div className="ob-eyebrow">Step 3 of 3</div>
                    <h1>Review and finish</h1>
                    <p className="ob-sub">
                      Check your details. You can go back to edit anything.
                    </p>

                    {offlineError && (
                      <div className="ob-banner" role="alert">
                        <span>{offlineError}</span>
                        <button
                          type="button"
                          className="ob-lk"
                          onClick={handleFinish}
                        >
                          Retry
                        </button>
                      </div>
                    )}

                    {/* Review Card: Account */}
                    <div className="ob-rv">
                      <h4>
                        Account
                        <span className="ob-lockn">
                          <svg viewBox="0 0 24 24">
                            <rect x="4" y="11" width="16" height="10" rx="2" />
                            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                          </svg>
                          From your account
                        </span>
                      </h4>
                      <dl>
                        <div className="ob-r">
                          <dt>Church name</dt>
                          <dd>{account.church}</dd>
                        </div>
                        <div className="ob-r">
                          <dt>Owner</dt>
                          <dd>{account.name}</dd>
                        </div>
                        <div className="ob-r">
                          <dt>Email</dt>
                          <dd>{account.email}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Review Card: Church Info */}
                    <div className="ob-rv">
                      <h4>
                        Church information
                        <button
                          type="button"
                          className="ob-lk"
                          onClick={() => handleBack(1)}
                        >
                          Edit
                        </button>
                      </h4>
                      <dl>
                        <div className="ob-r">
                          <dt>Address</dt>
                          <dd>{formData.addr || <span className="ob-na">Not provided</span>}</dd>
                        </div>
                        <div className="ob-r">
                          <dt>Phone</dt>
                          <dd>{formData.phone || <span className="ob-na">Not provided</span>}</dd>
                        </div>
                        <div className="ob-r">
                          <dt>Denomination</dt>
                          <dd>
                            {denominationDisplay || <span className="ob-na">Not provided</span>}
                          </dd>
                        </div>
                        <div className="ob-r">
                          <dt>Logo</dt>
                          <dd>
                            {formData.logoUrl ? (
                              <>
                                <img alt="" src={formData.logoUrl} />
                                <span>{formData.logoName || "Uploaded"}</span>
                              </>
                            ) : (
                              <span className="ob-na">Not provided</span>
                            )}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    {/* Review Card: Setup */}
                    <div className="ob-rv">
                      <h4>
                        Setup
                        <button
                          type="button"
                          className="ob-lk"
                          onClick={() => handleBack(2)}
                        >
                          Edit
                        </button>
                      </h4>
                      <dl>
                        <div className="ob-r">
                          <dt>Members</dt>
                          <dd>
                            {formData.members ? (
                              `${formData.members} (approx.)`
                            ) : (
                              <span className="ob-na">Not provided</span>
                            )}
                          </dd>
                        </div>
                        <div className="ob-r">
                          <dt>Branches</dt>
                          <dd>{formData.branches || "1"}</dd>
                        </div>
                        <div className="ob-r">
                          <dt>Import existing records</dt>
                          <dd>{formData.imp === "yes" ? "Yes" : "No"}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Step 3 Action Bar */}
                    <div className="ob-bar">
                      <button
                        type="button"
                        className="ob-btn"
                        onClick={() => handleBack(2)}
                      >
                        Back
                      </button>
                      <div className="ob-r">
                        <button
                          type="button"
                          className={`ob-btn p ${busy ? "ob-busy" : ""}`}
                          disabled={busy}
                          onClick={handleFinish}
                        >
                          <span className="ob-spin" />
                          <span className="ob-lbl">Complete Setup</span>
                          <svg viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </section>

        <p className="ob-foot">You can change everything here later in Settings.</p>
      </main>
    </div>
  );
}
