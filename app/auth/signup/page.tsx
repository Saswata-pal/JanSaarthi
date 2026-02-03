'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const validateForm = () => {
        const newErrors: {
            name?: string;
            email?: string;
            password?: string;
            confirmPassword?: string;
        } = {};

        // Name validation
        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!acceptedTerms) {
            setErrors({ general: 'Please accept the terms and conditions' });
            return;
        }

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/auth/signup', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         name: formData.name,
            //         email: formData.email,
            //         password: formData.password,
            //     }),
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demo purposes - redirect to sign in
            router.push('/auth/signin');
        } catch (error) {
            setErrors({ general: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-gradient-orb auth-gradient-orb-1"></div>
                <div className="auth-gradient-orb auth-gradient-orb-2"></div>
                <div className="auth-gradient-orb auth-gradient-orb-3"></div>
            </div>

            <div className="auth-content">
                <div className="auth-card">
                    <div className="auth-header">
                        <Link href="/" className="auth-logo">
                            <span className="text-gradient-civic">JanSaarthi</span>
                        </Link>
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join JanSaarthi to access government services</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {errors.general && (
                            <div className="auth-error-banner">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="currentColor" />
                                </svg>
                                {errors.general}
                            </div>
                        )}

                        <div className="auth-form-group">
                            <label htmlFor="name" className="auth-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`auth-input ${errors.name ? 'auth-input-error' : ''}`}
                                placeholder="John Doe"
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <span className="auth-error-message">{errors.name}</span>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor="email" className="auth-label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
                                placeholder="you@example.com"
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <span className="auth-error-message">{errors.email}</span>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor="password" className="auth-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <span className="auth-error-message">{errors.password}</span>
                            )}
                            <div className="auth-password-strength">
                                <div className="auth-password-requirements">
                                    <span className={formData.password.length >= 8 ? 'valid' : ''}>
                                        ✓ At least 8 characters
                                    </span>
                                    <span className={/[A-Z]/.test(formData.password) ? 'valid' : ''}>
                                        ✓ One uppercase letter
                                    </span>
                                    <span className={/[a-z]/.test(formData.password) ? 'valid' : ''}>
                                        ✓ One lowercase letter
                                    </span>
                                    <span className={/\d/.test(formData.password) ? 'valid' : ''}>
                                        ✓ One number
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor="confirmPassword" className="auth-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <span className="auth-error-message">{errors.confirmPassword}</span>
                            )}
                        </div>

                        <div className="auth-checkbox-group">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="auth-checkbox"
                            />
                            <label htmlFor="terms" className="auth-checkbox-label">
                                I agree to the{' '}
                                <Link href="/terms" className="auth-link">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="auth-link">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="auth-spinner"></span>
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div className="auth-divider">
                            <span>or continue with</span>
                        </div>

                        <button
                            type="button"
                            className="auth-social-btn"
                            disabled={isLoading}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                            </svg>
                            Sign up with Google
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link href="/auth/signin" className="auth-link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}