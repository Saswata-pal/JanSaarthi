"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;

        // Redirect to sign in if not authenticated
        if (!session) {
            router.push("/auth/signin");
            return;
        }

        // Redirect to onboarding if profile is incomplete
        if (!session.user?.isOnboarded) {
            router.push("/onboarding");
        }
    }, [session, status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session?.user?.isOnboarded) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                        JanSaarthi Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                                {session.user.role}
                            </p>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Welcome, {session.user.name}! 👋
                    </h2>
                    <p className="text-gray-600">
                        You are logged in as a <span className="font-semibold capitalize">{session.user.role}</span>.
                    </p>
                </div>

                {/* Role-specific content */}
                {session.user.role === "citizen" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardCard
                            title="My Services"
                            description="View and manage your government services"
                            icon="📋"
                        />
                        <DashboardCard
                            title="Apply for Services"
                            description="Browse and apply for new services"
                            icon="✍️"
                        />
                        <DashboardCard
                            title="Track Applications"
                            description="Check the status of your applications"
                            icon="📊"
                        />
                    </div>
                )}

                {session.user.role === "volunteer" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardCard
                            title="Help Citizens"
                            description="Assist citizens with their applications"
                            icon="🤝"
                        />
                        <DashboardCard
                            title="My Cases"
                            description="View cases you're helping with"
                            icon="📁"
                        />
                        <DashboardCard
                            title="Resources"
                            description="Access guides and documentation"
                            icon="📚"
                        />
                    </div>
                )}

                {session.user.role === "admin" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DashboardCard
                            title="User Management"
                            description="Manage users and permissions"
                            icon="👥"
                        />
                        <DashboardCard
                            title="Service Management"
                            description="Configure available services"
                            icon="⚙️"
                        />
                        <DashboardCard
                            title="Analytics"
                            description="View platform statistics"
                            icon="📈"
                        />
                    </div>
                )}
            </main>
        </div>
    );
}

function DashboardCard({ title, description, icon }: { title: string; description: string; icon: string }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
}
