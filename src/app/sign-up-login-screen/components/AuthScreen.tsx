'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AppLogo from '@/components/ui/AppLogo';
import { Car, MapPin, Shield, Zap } from 'lucide-react';

const features = [
  { id: 'feat-instant', icon: <Zap size={18} />, text: 'Instant booking confirmation' },
  { id: 'feat-fleet', icon: <Car size={18} />, text: '500+ cars & bikes across 12 cities' },
  { id: 'feat-transparent', icon: <Shield size={18} />, text: 'Transparent pricing, no hidden fees' },
  { id: 'feat-pickup', icon: <MapPin size={18} />, text: 'Doorstep pickup & drop available' },
];

export default function AuthScreen() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex">
      {/* Left — Brand panel */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] bg-[hsl(var(--primary))] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 right-1/3 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full bg-[hsl(var(--accent))]/10" />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <AppLogo size={40} />
          <span className="text-white font-bold text-2xl tracking-tight">ZoomRental</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-white text-4xl xl:text-5xl font-bold leading-tight mb-4">
              Your journey,<br />
              <span className="text-[hsl(var(--accent))]">your wheels.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Book a car or bike in under 2 minutes. No paperwork, no hassle — just pick up and go.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.id} className="flex items-center gap-3 text-white/85">
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 text-[hsl(var(--accent))]">
                  {f.icon}
                </span>
                <span className="text-sm font-medium">{f.text}</span>
              </li>
            ))}
          </ul>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
            {[
              { id: 'stat-cities', val: '12', label: 'Cities' },
              { id: 'stat-vehicles', val: '500+', label: 'Vehicles' },
              { id: 'stat-users', val: '40K+', label: 'Happy Renters' },
            ].map((s) => (
              <div key={s.id}>
                <p className="text-white font-bold text-2xl tabular-nums">{s.val}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/40 text-xs relative z-10">
          © 2026 ZoomRental Pvt. Ltd. All rights reserved.
        </p>
      </div>

      {/* Right — Auth form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-12 overflow-y-auto bg-[hsl(var(--background))]">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <AppLogo size={32} />
          <span className="font-bold text-lg text-[hsl(var(--primary))]">ZoomRental</span>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
              {tab === 'login' ?'Sign in to manage your bookings and rentals.' :'Start renting vehicles in minutes.'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-[hsl(var(--secondary))] rounded-xl p-1 mb-8">
            {(['login', 'signup'] as const).map((t) => (
              <button
                key={`tab-${t}`}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  tab === t
                    ? 'bg-white shadow-sm text-[hsl(var(--primary))]'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Forms */}
          <div className="fade-in">
            {tab === 'login' ? (
              <LoginForm onSwitchToSignup={() => setTab('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setTab('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}