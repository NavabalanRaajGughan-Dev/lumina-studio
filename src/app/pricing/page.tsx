"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const Pricing = dynamic(() => import("@/views/Pricing").then((m) => ({ default: m.Pricing })), {
    loading: () => <PageSkeleton />,
});

export default Pricing;
