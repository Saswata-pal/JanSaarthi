"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthRedirect() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);
    const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkOnboardingStatus() {
            if (status === "loading") return;

            if (status === "unauthenticated") {
                router.replace("/auth/signin");
                return;
            }

            if (session?.user?.email) {
                try {
                    // Check database for onboarding status
                    const response = await fetch('/api/user/onboarding-status');
                    const data = await response.json();

                    setIsOnboarded(data.isOnboarded);
                    setIsChecking(false);

                    // Redirect based on onboarding status
                    if (data.isOnboarded) {
                        router.replace("/dashboard");
                    } else {
                        router.replace("/onboarding");
                    }
                } catch (error) {
                    console.error("Error checking onboarding status:", error);
                    // Default to onboarding if there's an error
                    router.replace("/onboarding");
                }
            }
        }

        checkOnboardingStatus();
    }, [session, status, router]);

    // Loading screen
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="text-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
                    <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-blue-200 mx-auto"></div>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-800 font-semibold text-lg"
                >
                    Welcome to JanSaarthi! 🎉
                </motion.p>
                <p className="text-gray-600 text-sm mt-2">
                    {isChecking ? "Setting up your account..." : "Redirecting..."}
                </p>
            </div>
        </div>
    );
}
