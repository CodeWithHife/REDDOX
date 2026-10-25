"use client";

import { Suspense } from "react";
import AuthPage from "@/app/components/AuthPage";

export default function AuthRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f9f1e3] text-[#2b2015]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-[#6d2a3c] border-t-transparent rounded-full animate-spin" />
            <span className="font-serif text-sm font-semibold tracking-wide text-[#75654f]">
              Loading Church Manager…
            </span>
          </div>
        </div>
      }
    >
      <AuthPage />
    </Suspense>
  );
}
