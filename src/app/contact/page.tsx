import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "Contact | Lumina Photography Studio",
    description:
        "Get in touch with Lumina Photography Studio. Book a consultation, ask about pricing, or visit our studio in Sri Lanka.",
};

const ContactView = dynamic(
    () => import("@/views/Contact").then((m) => ({ default: m.Contact })),
    { loading: () => <PageSkeleton /> }
);

export default function ContactPage() {
    return <ContactView />;
}
