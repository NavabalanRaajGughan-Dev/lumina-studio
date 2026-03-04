"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/shared/PageSkeleton";

const Contact = dynamic(() => import("@/views/Contact").then((m) => ({ default: m.Contact })), {
    loading: () => <PageSkeleton />,
});

export default Contact;
