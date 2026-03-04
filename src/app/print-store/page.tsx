"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const PrintStore = dynamic(() => import("@/views/PrintStore").then((m) => ({ default: m.PrintStore })), {
    loading: () => <PageSkeleton />,
});

export default PrintStore;
