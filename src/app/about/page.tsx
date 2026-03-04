"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const About = dynamic(() => import("@/views/About").then((m) => ({ default: m.About })), {
    loading: () => <PageSkeleton />,
});

export default About;
