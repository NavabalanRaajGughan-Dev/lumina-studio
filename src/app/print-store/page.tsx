import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "Print Store | Lumina Photography Studio",
    description:
        "Shop premium photography prints, wall art, and photo products from Lumina Studio. Museum-quality prints delivered to your door.",
};

const PrintStoreView = dynamic(
    () => import("@/views/PrintStore").then((m) => ({ default: m.PrintStore })),
    { loading: () => <PageSkeleton /> }
);

export default function PrintStorePage() {
    return <PrintStoreView />;
}
