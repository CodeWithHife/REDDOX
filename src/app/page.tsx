import type { Metadata } from "next";
import ChurchManagerLanding from "./components/ChurchManagerLanding";

export const metadata: Metadata = {
  title: "Church Manager – Run your church with ease",
  description:
    "Members, attendance, giving and events in one live dashboard for pastors, leaders and members.",
};

export default function Home() {
  return <ChurchManagerLanding />;
}