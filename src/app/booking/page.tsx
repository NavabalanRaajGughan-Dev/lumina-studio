"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const Booking = dynamic(() => import("@/views/Booking").then((m) => ({ default: m.Booking })), {
    loading: () => <PageSkeleton />,
});

export default Booking;
