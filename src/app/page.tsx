import type { Metadata } from "next";
import ChurchManagerLanding from "./components/ChurchManagerLanding";

export const metadata: Metadata = {
  title: "Church Manager – Run your church with ease",
  description:
    "Welcome first-timers, track Sunday attendance, record tithes and offerings, and keep every ministry in step, all in one place for pastors, ushers and members.",
};

export default function Home() {
  return <ChurchManagerLanding />;
}