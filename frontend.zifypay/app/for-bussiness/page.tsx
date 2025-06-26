"use client";

import dynamic from "next/dynamic";

// ✅ Dynamically load with SSR disabled
const BusinessLandingPage = dynamic(
  () => import("@/components/for-buisness"),
  { ssr: false }
);

export default function Page() {
  return <BusinessLandingPage />;
}
