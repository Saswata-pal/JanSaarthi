'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Zap, Globe } from 'lucide-react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
    showFeatures?: boolean;
}

export default function AuthLayout({ children, title, subtitle, showFeatures = true }: AuthLayoutProps) {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A44] via-[#1A3A5C] to-[#0A1D30]">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-[#2E7D32] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#F39C12] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex">
                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                    <div className="w-full max-w-md">
                        {/* Back to Home */}
                        <Link
                            href="/"
                            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>

                        {/* Main Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="auth-card backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-10 shadow-2xl"
                        >
                            {/* Logo & Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="flex items-center justify-center mb-6"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-2xl blur-lg opacity-50"></div>
                                        <div className="relative w-16 h-16 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-2xl flex items-center justify-center">
                                            <Image
                                                src="/images/logo.png"
                                                alt="JanSaarthi Logo"
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-3xl lg:text-4xl font-bold text-white mb-3"
                                >
                                    {title}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="text-white/70 text-base lg:text-lg"
                                >
                                    {subtitle}
                                </motion.p>
                            </div>

                            {/* Form Content */}
                            {children}
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
                                <div className="flex items-center">
                                    <Shield className="w-4 h-4 mr-1.5" />
                                    Secure
                                </div>
                                <div className="flex items-center">
                                    <Zap className="w-4 h-4 mr-1.5" />
                                    Fast
                                </div>
                                <div className="flex items-center">
                                    <Globe className="w-4 h-4 mr-1.5" />
                                    Multilingual
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Features (Hidden on mobile) */}
                {showFeatures && (
                    <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-lg"
                        >
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Empowering Citizens with AI
                            </h2>
                            <p className="text-white/80 text-lg mb-8">
                                JanSaarthi makes government services accessible to everyone through intelligent recommendations and multilingual support.
                            </p>

                            {/* Feature Cards */}
                            <div className="space-y-4">
                                {[
                                    {
                                        icon: '🎯',
                                        title: 'Smart Recommendations',
                                        description: 'AI-powered suggestions for schemes you qualify for'
                                    },
                                    {
                                        icon: '🌐',
                                        title: 'Multilingual Support',
                                        description: 'Access services in your preferred language'
                                    },
                                    {
                                        icon: '📄',
                                        title: 'Document Assistance',
                                        description: 'Guided help for applications and forms'
                                    }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                                    >
                                        <div className="text-3xl">{feature.icon}</div>
                                        <div>
                                            <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                                            <p className="text-white/60 text-sm">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-12 grid grid-cols-3 gap-6">
                                {[
                                    { value: '10K+', label: 'Citizens' },
                                    { value: '500+', label: 'Schemes' },
                                    { value: '12+', label: 'Languages' }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-white/60 text-sm">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .bg-grid-pattern {
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
            `}</style>
        </div>
    );
}
