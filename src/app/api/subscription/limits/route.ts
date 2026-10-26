// src/app/api/subscription/limits/route.ts
import { NextResponse } from "next/server";
import {
  PRICING_PLANS,
  PlanId,
  canAddMember,
  canAddAdmin,
  canCreateEvent,
  canAccessFeature,
} from "@/lib/pricingPlans";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      planId = "starter",
      action, // "addMember" | "createEvent" | "addAdmin" | "accessFeature"
      currentCount = 0,
      featureName,
    } = body;

    const validPlanId: PlanId = PRICING_PLANS[planId as PlanId] ? (planId as PlanId) : "starter";

    if (action === "addMember") {
      const check = canAddMember(Number(currentCount), validPlanId);
      if (!check.allowed) {
        return NextResponse.json({
          allowed: false,
          reason: `You have reached the maximum limit of ${check.limit} members on the ${PRICING_PLANS[validPlanId].name} plan.`,
          upgradeRequired: true,
          suggestedPlan: validPlanId === "starter" ? "growth" : "pro",
        });
      }
      return NextResponse.json({ allowed: true, limit: check.limit });
    }

    if (action === "createEvent") {
      const check = canCreateEvent(Number(currentCount), validPlanId);
      if (!check.allowed) {
        return NextResponse.json({
          allowed: false,
          reason: `Starter churches are limited to 1 event per month. Upgrade to Growth for unlimited events.`,
          upgradeRequired: true,
          suggestedPlan: "growth",
        });
      }
      return NextResponse.json({ allowed: true, limit: check.limit });
    }

    if (action === "addAdmin") {
      const check = canAddAdmin(Number(currentCount), validPlanId);
      if (!check.allowed) {
        return NextResponse.json({
          allowed: false,
          reason: `Starter plan includes 1 church administrator. Upgrade to Growth for multiple staff accounts.`,
          upgradeRequired: true,
          suggestedPlan: "growth",
        });
      }
      return NextResponse.json({ allowed: true, limit: check.limit });
    }

    if (action === "accessFeature" && featureName) {
      const allowed = canAccessFeature(featureName, validPlanId);
      return NextResponse.json({
        allowed,
        feature: featureName,
        plan: PRICING_PLANS[validPlanId].name,
      });
    }

    return NextResponse.json({ allowed: true });
  } catch (err: any) {
    return NextResponse.json(
      { allowed: false, error: err?.message || "Limit evaluation error." },
      { status: 500 }
    );
  }
}
