import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "Pricing | Lumina Photography Studio",
    description:
        "View our transparent photography pricing and packages. Find the perfect plan for portraits, weddings, events, and more.",
};

const PricingView = dynamic(
    () => import("@/views/Pricing").then((m) => ({ default: m.Pricing })),
    { loading: () => <PageSkeleton /> }
);

export default function PricingPage() {
    return <PricingView />;
}
