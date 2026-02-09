'use client'

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Shield, Globe, Zap } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/auth-redirect')
        }
    }, [status, router])

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        setError('')
        try {
            await signIn('google', { callbackUrl: '/auth-redirect' })
        } catch (error) {
            setError('Failed to sign in with Google')
            setIsLoading(false)
        }
    }

    if (status === "authenticated") {
        return null
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #EBF4FF 0%, #FFFFFF 50%, #F3E8FF 100%)',
            padding: '2rem 1rem',
            width: '100%'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '450px',
                margin: '0 auto'
            }}>
                {/* Back to Home */}
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        color: '#6B7280',
                        marginBottom: '2rem',
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s'
                    }}
                >
                    <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: 'white',
                        borderRadius: '1rem',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        border: '1px solid #E5E7EB',
                        padding: '2rem',
                        width: '100%'
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                            <Image
                                src="/images/logo.png"
                                alt="JanSaarthi Logo"
                                width={64}
                                height={64}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <h1 style={{
                            fontSize: '1.875rem',
                            fontWeight: '700',
                            color: '#111827',
                            marginBottom: '0.5rem',
                            lineHeight: '1.2'
                        }}>
                            Welcome Back
                        </h1>
                        <p style={{
                            fontSize: '1rem',
                            color: '#6B7280',
                            lineHeight: '1.5'
                        }}>
                            Sign in to continue your journey
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: '0.75rem 1rem',
                                background: '#FEF2F2',
                                border: '1px solid #FECACA',
                                borderRadius: '0.5rem',
                                color: '#B91C1C',
                                marginBottom: '1rem',
                                fontSize: '0.875rem'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.875rem 1.5rem',
                            border: '2px solid #D1D5DB',
                            borderRadius: '0.5rem',
                            background: 'white',
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#374151',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                            opacity: isLoading ? 0.5 : 1,
                            marginBottom: '1rem'
                        }}
                    >
                        <FcGoogle style={{ width: '24px', height: '24px', marginRight: '0.75rem' }} />
                        <span>Continue with Google</span>
                    </button>

                    {/* Loading State */}
                    {isLoading && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid #E5E7EB',
                                borderTopColor: '#3B82F6',
                                borderRadius: '50%',
                                animation: 'spin 0.6s linear infinite',
                                marginRight: '0.5rem'
                            }}></div>
                            <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Signing you in...</span>
                        </div>
                    )}

                    {/* Benefits */}
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #EBF4FF 0%, #F3E8FF 100%)',
                        borderRadius: '0.5rem'
                    }}>
                        <h3 style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#1F2937',
                            marginBottom: '0.75rem'
                        }}>
                            Why choose JanSaarthi?
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#374151' }}>
                                <Brain style={{ width: '16px', height: '16px', color: '#3B82F6', marginRight: '0.5rem', flexShrink: 0 }} />
                                <span>AI-powered scheme recommendations</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#374151' }}>
                                <Zap style={{ width: '16px', height: '16px', color: '#8B5CF6', marginRight: '0.5rem', flexShrink: 0 }} />
                                <span>Personalized assistance</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#374151' }}>
                                <Shield style={{ width: '16px', height: '16px', color: '#10B981', marginRight: '0.5rem', flexShrink: 0 }} />
                                <span>Privacy-first, secure</span>
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                            New to JanSaarthi?{' '}
                            <Link
                                href="/auth/signup"
                                style={{
                                    color: '#3B82F6',
                                    fontWeight: '500',
                                    textDecoration: 'none'
                                }}
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Trust Signals */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        textAlign: 'center',
                        marginTop: '1.5rem',
                        fontSize: '0.875rem',
                        color: '#6B7280'
                    }}
                >
                    <p>Secure authentication • Privacy protected • Trusted by citizens</p>
                </motion.div>
            </div>

            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    )
}
