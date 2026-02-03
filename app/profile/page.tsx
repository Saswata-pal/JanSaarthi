'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileForm from '../components/ProfileForm';
import { ProfileUpdateInput } from '@/types/Profile';

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileUpdateInput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/profile');
            const data = await response.json();

            if (data.success && data.data) {
                setProfile(data.data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (formData: ProfileUpdateInput) => {
        try {
            const response = await fetch('/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setProfile(formData);
                setTimeout(() => setMessage(null), 3000);
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update profile' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: 'An error occurred while updating profile' });
        }
    };

    if (isLoading) {
        return (
            <div className="auth-container">
                <div className="auth-content">
                    <div className="auth-card">
                        <div className="profile-loading">
                            <span className="auth-spinner" style={{ width: '40px', height: '40px' }}></span>
                            <p>Loading profile...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-gradient-orb auth-gradient-orb-1"></div>
                <div className="auth-gradient-orb auth-gradient-orb-2"></div>
                <div className="auth-gradient-orb auth-gradient-orb-3"></div>
            </div>

            <div className="auth-content" style={{ maxWidth: '600px' }}>
                <div className="auth-card">
                    <div className="auth-header">
                        <Link href="/" className="auth-logo">
                            <span className="text-gradient-civic">JanSaarthi</span>
                        </Link>
                        <h1 className="auth-title">Your Profile</h1>
                        <p className="auth-subtitle">Manage your personal information</p>
                    </div>

                    {message && (
                        <div className={`profile-message ${message.type === 'success' ? 'profile-message-success' : 'auth-error-banner'}`}>
                            {message.type === 'success' ? '✓' : '⚠'} {message.text}
                        </div>
                    )}

                    <ProfileForm />

                    <div className="auth-footer" style={{ marginTop: 'var(--spacing-lg)' }}>
                        <Link href="/" className="auth-link">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
