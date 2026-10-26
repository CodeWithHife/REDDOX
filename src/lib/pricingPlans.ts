// src/lib/pricingPlans.ts

export type PlanId = "starter" | "growth" | "pro";
export type BillingCycle = "monthly" | "annual";
export type SubscriptionStatus = "active" | "grace_period" | "cancelled" | "expired";

export interface PlanFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
}

export interface PlanConfig {
  id: PlanId;
  name: string;
  tagline: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number; // ₦150k for Growth (saves 2 months), ₦350k for Pro (saves 2 months)
  limits: {
    maxMembers: number;
    maxAdmins: number;
    maxEventsPerMonth: number | "unlimited";
    maxBranches: number;
    hasFinances: boolean;
    hasQRAttendance: boolean;
    hasAdvancedAnalytics: boolean;
    hasMediaLibrary: boolean;
    hasDataExports: boolean;
    hasAuditLogs: boolean;
  };
  features: PlanFeature[];
  notIncluded: string[];
  ctaText: string;
  ctaVariant: "outline" | "primary" | "secondary";
}

export const PRICING_PLANS: Record<PlanId, PlanConfig> = {
  starter: {
    id: "starter",
    name: "STARTER",
    tagline: "Designed for small churches getting started with digital church management.",
    monthlyPrice: 0,
    annualPrice: 0,
    limits: {
      maxMembers: 15,
      maxAdmins: 1,
      maxEventsPerMonth: 1,
      maxBranches: 1,
      hasFinances: false,
      hasQRAttendance: false,
      hasAdvancedAnalytics: false,
      hasMediaLibrary: false,
      hasDataExports: false,
      hasAuditLogs: false,
    },
    features: [
      { name: "Up to 15 members", included: true },
      { name: "1 church administrator", included: true },
      { name: "1 event per month", included: true },
      { name: "Manual attendance tracking", included: true },
      { name: "Basic dashboard", included: true },
      { name: "7-day attendance history", included: true },
      { name: "Basic member records", included: true },
    ],
    notIncluded: [
      "Financial management",
      "QR attendance",
      "Advanced reports and exports",
      "Sermon and media library",
      "Advanced analytics",
    ],
    ctaText: "Get Started Free",
    ctaVariant: "outline",
  },
  growth: {
    id: "growth",
    name: "GROWTH",
    tagline: "Designed for growing churches that need more complete management tools.",
    badge: "Most Popular",
    monthlyPrice: 15000,
    annualPrice: 150000, // Saves ₦30,000 (2 months free)
    limits: {
      maxMembers: 1000,
      maxAdmins: 10,
      maxEventsPerMonth: "unlimited",
      maxBranches: 1,
      hasFinances: true,
      hasQRAttendance: true,
      hasAdvancedAnalytics: false,
      hasMediaLibrary: true,
      hasDataExports: true,
      hasAuditLogs: false,
    },
    features: [
      { name: "Up to 1,000 members", included: true, highlight: true },
      { name: "Multiple authorized staff accounts", included: true },
      { name: "Member and department management", included: true },
      { name: "QR attendance & full attendance history", included: true },
      { name: "Unlimited events", included: true },
      { name: "Giving and expense records", included: true },
      { name: "Financial reports & receipts", included: true },
      { name: "Visitor records and follow-up", included: true },
      { name: "Sermon and media library", included: true },
      { name: "Dashboard analytics", included: true },
      { name: "Data exports", included: true },
    ],
    notIncluded: [
      "Consolidated multi-branch dashboards",
      "Custom staff permissions",
      "Automated follow-up tools",
      "Priority support",
    ],
    ctaText: "Choose Growth",
    ctaVariant: "primary",
  },
  pro: {
    id: "pro",
    name: "PRO",
    tagline: "Designed for larger churches and churches with multiple branches.",
    monthlyPrice: 35000,
    annualPrice: 350000, // Saves ₦70,000 (2 months free)
    limits: {
      maxMembers: 5000,
      maxAdmins: 50,
      maxEventsPerMonth: "unlimited",
      maxBranches: 3,
      hasFinances: true,
      hasQRAttendance: true,
      hasAdvancedAnalytics: true,
      hasMediaLibrary: true,
      hasDataExports: true,
      hasAuditLogs: true,
    },
    features: [
      { name: "Up to 5,000 members", included: true, highlight: true },
      { name: "Up to 3 branches", included: true, highlight: true },
      { name: "Everything in Growth", included: true },
      { name: "Consolidated multi-branch dashboards", included: true },
      { name: "Advanced analytics & financial comparisons", included: true },
      { name: "Custom staff permissions", included: true },
      { name: "Automated follow-up tools", included: true },
      { name: "Expanded audit logs", included: true },
      { name: "Bulk member imports", included: true },
      { name: "Higher storage & notification limits", included: true },
      { name: "Priority support", included: true },
    ],
    notIncluded: [],
    ctaText: "Choose Pro",
    ctaVariant: "secondary",
  },
};

export interface SubscriptionRecord {
  churchId: string;
  churchName: string;
  planId: PlanId;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  currentPeriodStart: string; // ISO date
  currentPeriodEnd: string; // ISO date
  cancelAtPeriodEnd: boolean;
  paymentMethod?: string;
  lastPaymentAmount?: number;
  lastPaymentDate?: string;
  transactionReference?: string;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  planId: PlanId;
  billingCycle: BillingCycle;
  churchId: string;
  status: "success" | "pending" | "failed";
  paidAt: string;
  channel: string;
}

// Helpers
export function formatNaira(amount: number): string {
  if (amount === 0) return "₦0";
  return "₦" + amount.toLocaleString("en-NG");
}

export function getPlanPrice(planId: PlanId, billingCycle: BillingCycle): number {
  const plan = PRICING_PLANS[planId];
  return billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
}

export function getAnnualSavings(planId: PlanId): number {
  if (planId === "starter") return 0;
  const plan = PRICING_PLANS[planId];
  const monthly12 = plan.monthlyPrice * 12;
  return monthly12 - plan.annualPrice;
}

// Subscription Validation & Limit Enforcement Helpers
export function canAddMember(currentCount: number, planId: PlanId): { allowed: boolean; limit: number } {
  const limit = PRICING_PLANS[planId].limits.maxMembers;
  return {
    allowed: currentCount < limit,
    limit,
  };
}

export function canAddAdmin(currentAdminCount: number, planId: PlanId): { allowed: boolean; limit: number } {
  const limit = PRICING_PLANS[planId].limits.maxAdmins;
  return {
    allowed: currentAdminCount < limit,
    limit,
  };
}

export function canCreateEvent(
  eventsThisMonthCount: number,
  planId: PlanId
): { allowed: boolean; limit: number | "unlimited" } {
  const limit = PRICING_PLANS[planId].limits.maxEventsPerMonth;
  if (limit === "unlimited") return { allowed: true, limit };
  return {
    allowed: eventsThisMonthCount < limit,
    limit,
  };
}

export function canAccessFeature(
  feature:
    | "finances"
    | "qrAttendance"
    | "advancedAnalytics"
    | "mediaLibrary"
    | "dataExports"
    | "auditLogs",
  planId: PlanId
): boolean {
  const limits = PRICING_PLANS[planId].limits;
  switch (feature) {
    case "finances":
      return limits.hasFinances;
    case "qrAttendance":
      return limits.hasQRAttendance;
    case "advancedAnalytics":
      return limits.hasAdvancedAnalytics;
    case "mediaLibrary":
      return limits.hasMediaLibrary;
    case "dataExports":
      return limits.hasDataExports;
    case "auditLogs":
      return limits.hasAuditLogs;
    default:
      return false;
  }
}
