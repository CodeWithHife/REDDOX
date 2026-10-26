// src/app/api/subscription/route.ts
import { NextResponse } from "next/server";
import { PRICING_PLANS, PlanId, BillingCycle, getPlanPrice } from "@/lib/pricingPlans";

// In-memory / server-side subscription store (simulating database for demo/production)
export interface ServerSubscription {
  churchId: string;
  churchName: string;
  planId: PlanId;
  billingCycle: BillingCycle;
  status: "active" | "grace_period" | "cancelled" | "expired";
  amountPaid: number;
  currency: string;
  paymentReference: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethod: string;
}

// Global server cache for tenant subscriptions
const subscriptionStore = new Map<string, ServerSubscription>();
const processedReferences = new Set<string>(); // Idempotency check to prevent duplicate activations

// Seed initial subscription for default demo church
subscriptionStore.set("church-1", {
  churchId: "church-1",
  churchName: "Grace Chapel",
  planId: "growth",
  billingCycle: "monthly",
  status: "active",
  amountPaid: 15000,
  currency: "NGN",
  paymentReference: "SEED_INIT_REF_001",
  currentPeriodStart: new Date().toISOString(),
  currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  cancelAtPeriodEnd: false,
  paymentMethod: "Paystack Card (•••• 4242)",
});

// GET: Retrieve current tenant subscription
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const churchId = searchParams.get("churchId") || "church-1";

  const sub = subscriptionStore.get(churchId) || {
    churchId,
    churchName: "Grace Chapel",
    planId: "starter" as PlanId,
    billingCycle: "monthly" as BillingCycle,
    status: "active" as const,
    amountPaid: 0,
    currency: "NGN",
    paymentReference: "STARTER_FREE_REF",
    currentPeriodStart: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    cancelAtPeriodEnd: false,
    paymentMethod: "Free Plan",
  };

  return NextResponse.json({
    success: true,
    subscription: sub,
    planDetails: PRICING_PLANS[sub.planId],
  });
}

// POST: Initialize Checkout or Free Plan Activation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { churchId = "church-1", churchName = "Grace Chapel", planId, billingCycle } = body;

    if (!planId || !PRICING_PLANS[planId as PlanId]) {
      return NextResponse.json(
        { success: false, error: "Invalid plan identifier." },
        { status: 400 }
      );
    }

    const selectedPlan = PRICING_PLANS[planId as PlanId];
    const cycle: BillingCycle = billingCycle === "annual" ? "annual" : "monthly";
    const price = getPlanPrice(selectedPlan.id, cycle);

    // Free Starter Plan activation does not require payment
    if (selectedPlan.id === "starter" || price === 0) {
      const now = new Date();
      const nextYear = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

      const starterSub: ServerSubscription = {
        churchId,
        churchName,
        planId: "starter",
        billingCycle: "monthly",
        status: "active",
        amountPaid: 0,
        currency: "NGN",
        paymentReference: `FREE_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        currentPeriodStart: now.toISOString(),
        currentPeriodEnd: nextYear.toISOString(),
        cancelAtPeriodEnd: false,
        paymentMethod: "Free Forever",
      };

      subscriptionStore.set(churchId, starterSub);

      return NextResponse.json({
        success: true,
        isFree: true,
        message: "Starter plan activated successfully.",
        subscription: starterSub,
      });
    }

    // For paid plans: Create verifiable payment reference
    const reference = `RDX_${selectedPlan.id.toUpperCase()}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    return NextResponse.json({
      success: true,
      isFree: false,
      checkout: {
        reference,
        amount: price,
        currency: "NGN",
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        billingCycle: cycle,
        churchId,
        churchName,
        // Paystack public key configuration hook
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_test_reddox_demo_key",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error processing checkout." },
      { status: 500 }
    );
  }
}
