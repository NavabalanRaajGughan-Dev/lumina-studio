"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const Services = dynamic(() => import("@/views/Services").then((m) => ({ default: m.Services })), {
    loading: () => <PageSkeleton />,
});

export default Services;
