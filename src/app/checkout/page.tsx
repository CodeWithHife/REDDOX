// src/app/checkout/page.tsx
"use client";

import React, { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  PRICING_PLANS,
  PlanId,
  BillingCycle,
  getPlanPrice,
  formatNaira,
  getAnnualSavings,
} from "@/lib/pricingPlans";
import "./checkout.css";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, loginAs } = useAuth();

  // URL Query Parameters
  const initialPlan = (searchParams.get("plan") as PlanId) || "growth";
  const initialCycle = (searchParams.get("billing") as BillingCycle) || "monthly";

  const [selectedPlanId, setSelectedPlanId] = useState<PlanId>(
    PRICING_PLANS[initialPlan] ? initialPlan : "growth"
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    initialCycle === "annual" ? "annual" : "monthly"
  );

  // Checkout Processing States
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "pending" | "verifying" | "success" | "failed"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [activePaymentMethod, setActivePaymentMethod] = useState<"card" | "transfer">("card");

  // Keep state synced if URL parameters change
  useEffect(() => {
    const qPlan = searchParams.get("plan") as PlanId;
    const qCycle = searchParams.get("billing") as BillingCycle;
    if (qPlan && PRICING_PLANS[qPlan]) setSelectedPlanId(qPlan);
    if (qCycle && (qCycle === "monthly" || qCycle === "annual")) setBillingCycle(qCycle);
  }, [searchParams]);

  const currentPlan = PRICING_PLANS[selectedPlanId];
  const price = getPlanPrice(selectedPlanId, billingCycle);
  const savings = getAnnualSavings(selectedPlanId);

  // Activate Starter Plan (100% Free Forever)
  const handleActivateStarter = async () => {
    setLoading(true);
    setPaymentStatus("verifying");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          churchId: "church-1",
          churchName: "Grace Chapel",
          planId: "starter",
          billingCycle: "monthly",
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("reddox_active_plan", "starter");
        }
        setPaymentStatus("success");
        setTimeout(() => {
          router.push("/portal?plan=starter&toast=Starter%20plan%20activated!");
        }, 1200);
      } else {
        setPaymentStatus("failed");
        setErrorMessage(data.error || "Could not activate Starter plan. Please try again.");
      }
    } catch (err: any) {
      setPaymentStatus("failed");
      setErrorMessage(err?.message || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Process Paid Plan (Growth / Pro) with Server Verification
  const handleProcessPaidPlan = async () => {
    setLoading(true);
    setPaymentStatus("pending");
    setErrorMessage("");

    try {
      // 1. Initialize checkout on server to get valid reference
      const initRes = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          churchId: "church-1",
          churchName: "Grace Chapel",
          planId: selectedPlanId,
          billingCycle,
        }),
      });

      const initData = await initRes.json();
      if (!initData.success) {
        throw new Error(initData.error || "Failed to initialize payment session.");
      }

      const { reference } = initData.checkout;

      // 2. Simulated payment gateway completion -> triggers server verification
      // (In production with Paystack, Paystack inline popup verifies this reference)
      setPaymentStatus("verifying");

      const verifyRes = await fetch("/api/subscription/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          churchId: "church-1",
          churchName: "Grace Chapel",
          planId: selectedPlanId,
          billingCycle,
          provider: "paystack",
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyData.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("reddox_active_plan", selectedPlanId);
        }
        setPaymentStatus("success");
        setTimeout(() => {
          router.push(`/portal?plan=${selectedPlanId}&toast=${encodeURIComponent(`${currentPlan.name} plan activated!`)}`);
        }, 1500);
      } else {
        setPaymentStatus("failed");
        setErrorMessage(verifyData.error || "Server could not verify payment.");
      }
    } catch (err: any) {
      setPaymentStatus("failed");
      setErrorMessage(err?.message || "An unexpected error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-shell">
      {/* Ambient background glow */}
      <div className="checkout-glow">
        <i />
        <i />
      </div>

      {/* Top Navbar */}
      <header className="checkout-nav">
        <Link href="/" className="checkout-brand">
          <span className="checkout-logo">
            <Image src="/logo.png" alt="REDDOX" width={22} height={22} priority />
          </span>
          <span>REDDOX</span>
        </Link>
        <Link href="/portal" className="checkout-back">
          <span>&larr;</span> Back to Dashboard
        </Link>
      </header>

      <main className="checkout-main">
        <div className="checkout-header">
          <h1>Confirm Your Subscription</h1>
          <p>Elevate your church operations with transparent, predictable pricing.</p>

          {/* Billing Cycle Switcher */}
          <div className="checkout-cycle-toggle">
            <button
              type="button"
              className={`checkout-cycle-btn ${billingCycle === "monthly" ? "active" : ""}`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              className={`checkout-cycle-btn ${billingCycle === "annual" ? "active" : ""}`}
              onClick={() => setBillingCycle("annual")}
            >
              <span>Annual Billing</span>
              <span className="checkout-savings-pill">2 Months Free</span>
            </button>
          </div>
        </div>

        {/* If user is not authenticated, show intuitive sign-in prompt retaining plan */}
        {!user && (
          <div className="chk-card" style={{ maxWidth: 540, margin: "0 auto 30px", textAlign: "center" }}>
            <div className="chk-status-icon pending">
              <svg viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M19 8v6M22 11h-6" />
              </svg>
            </div>
            <h3>Account Required</h3>
            <p style={{ color: "var(--chk-mu)", marginBottom: 20 }}>
              Please sign in or create your church account before completing your subscription to the{" "}
              <b>{currentPlan.name}</b> plan.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Link
                href={`/auth#signup?plan=${selectedPlanId}&billing=${billingCycle}`}
                className="chk-btn primary"
                style={{ width: "auto", padding: "0 24px" }}
              >
                Create Account
              </Link>
              <Link
                href={`/auth#signin?returnTo=/checkout?plan=${selectedPlanId}&billing=${billingCycle}`}
                className="chk-btn secondary"
                style={{ width: "auto", padding: "0 24px" }}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}

        {/* Two-Column Grid: Plan Summary + Payment / Activation */}
        <div className="checkout-grid">
          {/* Left Column: Plan Breakdown & Features */}
          <div className="chk-card">
            <div className="chk-plan-head">
              <div>
                {currentPlan.badge && <span className="chk-plan-badge">{currentPlan.badge}</span>}
                <h2 className="chk-plan-title">{currentPlan.name}</h2>
                <p className="chk-plan-tagline">{currentPlan.tagline}</p>
              </div>
              <div className="chk-plan-price-box">
                <span className="chk-plan-price-num">{formatNaira(price)}</span>
                <span className="chk-plan-price-cycle">
                  {billingCycle === "annual" ? "per year (saves 2 months)" : "per month"}
                </span>
              </div>
            </div>

            {/* Included Features */}
            <h4 style={{ margin: "20px 0 10px", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--chk-mu)" }}>
              What&apos;s Included in {currentPlan.name}
            </h4>
            <ul className="chk-features">
              {currentPlan.features.map((f, i) => (
                <li key={i} className="chk-feature-item">
                  <span className="chk-feature-icon">
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span style={{ fontWeight: f.highlight ? 700 : 500 }}>{f.name}</span>
                </li>
              ))}
            </ul>

            {currentPlan.notIncluded.length > 0 && (
              <>
                <h4 style={{ margin: "20px 0 8px", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#a8997f" }}>
                  Not Included
                </h4>
                <ul className="chk-features" style={{ opacity: 0.65 }}>
                  {currentPlan.notIncluded.map((item, idx) => (
                    <li key={idx} className="chk-feature-item">
                      <span className="chk-feature-icon" style={{ background: "#eee", color: "#777" }}>
                        &times;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Quick Switcher Between Plans */}
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(43,32,21,0.08)" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--chk-mu)" }}>SWITCH PLAN:</span>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {(["starter", "growth", "pro"] as PlanId[]).map((pid) => (
                  <button
                    key={pid}
                    type="button"
                    onClick={() => setSelectedPlanId(pid)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 99,
                      border: "1px solid var(--chk-bd)",
                      background: selectedPlanId === pid ? "var(--chk-bl)" : "#fff",
                      color: selectedPlanId === pid ? "#fff" : "var(--chk-tx)",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {PRICING_PLANS[pid].name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Actions */}
          <div className="chk-card">
            <h3>Order Summary</h3>

            <div className="chk-summary-row">
              <span>Selected Plan</span>
              <b>{currentPlan.name}</b>
            </div>

            <div className="chk-summary-row">
              <span>Billing Cycle</span>
              <span style={{ textTransform: "capitalize" }}>{billingCycle}</span>
            </div>

            {billingCycle === "annual" && savings > 0 && (
              <div className="chk-summary-row" style={{ color: "var(--chk-ok)" }}>
                <span>Annual Savings (2 months free)</span>
                <b>-{formatNaira(savings)}</b>
              </div>
            )}

            <div className="chk-summary-row">
              <span>Church Tenancy</span>
              <span>Grace Chapel (Admin)</span>
            </div>

            <div className="chk-summary-row total">
              <span>Total Due Today</span>
              <span className="amount">{formatNaira(price)}</span>
            </div>

            {/* Payment Method / Action Buttons */}
            {selectedPlanId === "starter" ? (
              /* Free Plan Instant Activation */
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 13, color: "var(--chk-mu)", marginBottom: 14 }}>
                  The Starter plan is completely free forever. No payment card required.
                </p>
                <button
                  type="button"
                  className="chk-btn primary"
                  disabled={loading}
                  onClick={handleActivateStarter}
                >
                  {loading ? "Activating..." : "Activate Free Plan"}
                </button>
              </div>
            ) : (
              /* Paid Plan Checkout Options */
              <div style={{ marginTop: 20 }}>
                <div style={{ marginBottom: 14 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--chk-mu)", display: "block", marginBottom: 8 }}>
                    PAYMENT CHANNEL
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setActivePaymentMethod("card")}
                      style={{
                        padding: "10px",
                        borderRadius: 10,
                        border: `1.5px solid ${activePaymentMethod === "card" ? "var(--chk-bl)" : "var(--chk-bd)"}`,
                        background: activePaymentMethod === "card" ? "var(--chk-bl2)" : "#fff",
                        color: "var(--chk-tx)",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Debit / Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePaymentMethod("transfer")}
                      style={{
                        padding: "10px",
                        borderRadius: 10,
                        border: `1.5px solid ${activePaymentMethod === "transfer" ? "var(--chk-bl)" : "var(--chk-bd)"}`,
                        background: activePaymentMethod === "transfer" ? "var(--chk-bl2)" : "#fff",
                        color: "var(--chk-tx)",
                        fontWeight: 600,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Bank Transfer
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="chk-btn primary"
                  disabled={loading}
                  onClick={handleProcessPaidPlan}
                >
                  {loading ? "Verifying Transaction..." : `Pay ${formatNaira(price)} & Subscribe`}
                </button>

                <p style={{ fontSize: 11.5, color: "var(--chk-mu)", textAlign: "center", marginTop: 10 }}>
                  Secured by 256-bit SSL encryption. Verified server-side.
                </p>
              </div>
            )}

            {/* Status Messages */}
            {paymentStatus === "verifying" && (
              <div className="chk-status-box">
                <div className="chk-spinner" />
                <h4 style={{ margin: 0 }}>Verifying with Server</h4>
                <p style={{ fontSize: 13, color: "var(--chk-mu)", margin: "4px 0 0" }}>
                  Confirming your payment signature and activating your church workspace...
                </p>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="chk-status-box">
                <div className="chk-status-icon success">
                  <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ margin: "0 0 4px" }}>Subscription Active!</h3>
                <p style={{ fontSize: 13, color: "var(--chk-mu)" }}>
                  Redirecting you to your REDDOX ministry dashboard...
                </p>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="chk-status-box" style={{ background: "#fff5f5", borderRadius: 12, marginTop: 16 }}>
                <div className="chk-status-icon failed">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <h4 style={{ color: "var(--chk-er)", margin: "0 0 6px" }}>Payment Unsuccessful</h4>
                <p style={{ fontSize: 12.5, color: "var(--chk-tx)", margin: "0 0 12px" }}>
                  {errorMessage}
                </p>
                <button
                  type="button"
                  className="chk-btn secondary"
                  style={{ height: 38, fontSize: 13 }}
                  onClick={() => setPaymentStatus("idle")}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="chk-trust">
              <div className="chk-trust-item">
                <svg viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>SSL Encrypted</span>
              </div>
              <div className="chk-trust-item">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>No Hidden Fees</span>
              </div>
              <div className="chk-trust-item">
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Data Preserved</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
