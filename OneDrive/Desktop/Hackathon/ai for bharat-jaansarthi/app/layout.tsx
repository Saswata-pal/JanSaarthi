import type { Metadata } from "next";
import { PageLoadingWrapper } from "./components/ui/LoadingSpinner";
import "./styles/globals.css";

export const metadata: Metadata = {
    title: "AI for Bharat - Jaansarthi",
    description: "Modern landing page for AI for Bharat Jaansarthi platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <PageLoadingWrapper>
                    {children}
                </PageLoadingWrapper>
            </body>
        </html>
    );
}
