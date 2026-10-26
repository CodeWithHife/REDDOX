// src/app/api/subscription/manage/route.ts
import { NextResponse } from "next/server";
import { PRICING_PLANS, PlanId } from "@/lib/pricingPlans";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, churchId = "church-1", targetPlanId } = body;

    if (!action) {
      return NextResponse.json(
        { success: false, error: "Action is required ('cancel', 'reactivate', 'downgrade')." },
        { status: 400 }
      );
    }

    if (action === "cancel") {
      // Cancellation applies at period end.
      // Explain grace period and preservation of data
      return NextResponse.json({
        success: true,
        action: "cancel",
        status: "cancelled",
        cancelAtPeriodEnd: true,
        message:
          "Subscription will not renew at the end of the current billing cycle. All your church data, finances, and member histories are safely preserved and will remain accessible with read-only and export permissions.",
        gracePeriodDays: 14,
      });
    }

    if (action === "reactivate") {
      return NextResponse.json({
        success: true,
        action: "reactivate",
        status: "active",
        cancelAtPeriodEnd: false,
        message: "Your subscription renewal has been successfully reactivated.",
      });
    }

    if (action === "downgrade") {
      if (!targetPlanId || !PRICING_PLANS[targetPlanId as PlanId]) {
        return NextResponse.json({ success: false, error: "Invalid target plan." }, { status: 400 });
      }

      const targetPlan = PRICING_PLANS[targetPlanId as PlanId];
      return NextResponse.json({
        success: true,
        action: "downgrade",
        targetPlan: targetPlan.name,
        message: `Plan scheduled to switch to ${targetPlan.name} at the end of the current billing period.`,
      });
    }

    return NextResponse.json({ success: false, error: "Unknown action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Server error managing subscription." },
      { status: 500 }
    );
  }
}
