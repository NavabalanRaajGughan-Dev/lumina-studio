import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

export const metadata: Metadata = {
    title: "Booking | Lumina Photography Studio",
    description:
        "Book your photography session with Lumina Studio in Sri Lanka. Choose your package, pick a date, and let us capture your special moments.",
};

const BookingView = dynamic(
    () => import("@/views/Booking").then((m) => ({ default: m.Booking })),
    { loading: () => <PageSkeleton /> }
);

export default function BookingPage() {
    return <BookingView />;
}
