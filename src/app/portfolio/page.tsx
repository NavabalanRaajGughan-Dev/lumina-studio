"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const Portfolio = dynamic(() => import("@/views/Portfolio").then((m) => ({ default: m.Portfolio })), {
    loading: () => <PageSkeleton />,
});

export default Portfolio;
