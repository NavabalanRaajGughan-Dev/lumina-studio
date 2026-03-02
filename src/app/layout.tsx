import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Lumina Photography Studio | Sri Lanka",
    description:
        "Premium photography studio in Sri Lanka specializing in portrait, wedding, event, fashion, commercial, and architectural photography. Capturing moments that last forever.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <ClientShell>{children}</ClientShell>
            </body>
        </html>
    );
}

// Import the client shell lazily to keep layout a server component
import { ClientShell } from "@/components/ClientShell";
