import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "About | Lumina Photography Studio",
    description:
        "Learn about Lumina Photography Studio — our story, team, and passion for capturing life's most beautiful moments in Sri Lanka.",
};

const AboutView = dynamic(
    () => import("@/views/About").then((m) => ({ default: m.About })),
    { loading: () => <PageSkeleton /> }
);

export default function AboutPage() {
    return <AboutView />;
}
