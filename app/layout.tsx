import type { Metadata } from "next";
import { Providers } from "./providers";
import { PageLoadingWrapper } from "./components/ui/LoadingSpinner";
import "./styles/globals.css";
import "./styles/onboarding-styles.css";

export const metadata: Metadata = {
    title: "JanSaarthi",
    description: "AI-powered platform for government services",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <PageLoadingWrapper>
                        {children}
                    </PageLoadingWrapper>
                </Providers>
            </body>
        </html>
    );
}
