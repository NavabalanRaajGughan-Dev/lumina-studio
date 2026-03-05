import type { Metadata } from "next";
import { DM_Sans, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-dm-sans",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-manrope",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Lumina Photography Studio | Sri Lanka",
    description:
        "Premium photography studio in Sri Lanka specializing in portrait, wedding, event, fashion, commercial, and architectural photography. Capturing moments that last forever.",
};

// Import the client shell to keep layout a server component
import { ClientShell } from "@/components/ClientShell";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${dmSans.variable} ${manrope.variable} ${playfair.variable}`}
        >
            <body>
                <ClientShell>{children}</ClientShell>
            </body>
        </html>
    );
}
