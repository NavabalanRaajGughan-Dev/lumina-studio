import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "Services | Lumina Photography Studio",
    description:
        "Explore our professional photography services — portraits, weddings, events, fashion, commercial, and architectural photography in Sri Lanka.",
};

const ServicesView = dynamic(
    () => import("@/views/Services").then((m) => ({ default: m.Services })),
    { loading: () => <PageSkeleton /> }
);

export default function ServicesPage() {
    return <ServicesView />;
}
