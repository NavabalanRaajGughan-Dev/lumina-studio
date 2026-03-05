import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "Portfolio | Lumina Photography Studio",
    description:
        "Browse our portfolio of stunning photography work — from weddings and portraits to commercial and architectural projects.",
};

const PortfolioView = dynamic(
    () => import("@/views/Portfolio").then((m) => ({ default: m.Portfolio })),
    { loading: () => <PageSkeleton /> }
);

export default function PortfolioPage() {
    return <PortfolioView />;
}
