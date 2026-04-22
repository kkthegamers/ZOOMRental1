'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface SignupValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={`strength-bar-${i}`}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${score <= 1 ? 'text-red-500' : score === 2 ? 'text-orange-500' : score === 3 ? 'text-yellow-600' : 'text-green-600'}`}>
        {labels[score]} password
      </p>
    </div>
  );
}

export default function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>();

  const passwordValue = watch('password', '');

  // Backend integration point: POST /api/auth/register
  const onSubmit = async (_data: SignupValues) => {
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! You can now book vehicles.');
    router.push('/vehicle-listing');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full name */}
      <div>
        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
          Full name
        </label>
        <input
          type="text"
          className="input-field"
          placeholder="Arjun Reddy"
          {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
          Email address
        </label>
        <input
          type="email"
          className="input-field"
          placeholder="arjun@example.in"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
          Mobile number
        </label>
        <div className="flex gap-2">
          <span className="input-field w-14 flex items-center justify-center text-sm font-medium text-[hsl(var(--muted-foreground))] cursor-default flex-shrink-0">
            +91
          </span>
          <input
            type="tel"
            className="input-field flex-1"
            placeholder="98765 43210"
            {...register('phone', {
              required: 'Mobile number is required',
              pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
            })}
          />
        </div>
        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
          Password
        </label>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
          Min. 8 characters with uppercase, number, and symbol
        </p>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            className="input-field pr-10"
            placeholder="••••••••"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Minimum 8 characters' },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <PasswordStrength password={passwordValue} />
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
      </div>

      {/* Confirm password */}
      <div>
        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
          Confirm password
        </label>
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            className="input-field pr-10"
            placeholder="••••••••"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (v) => v === passwordValue || 'Passwords do not match',
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 mt-0.5 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
          {...register('terms', { required: 'You must accept the terms to continue' })}
        />
        <label htmlFor="terms" className="text-sm text-[hsl(var(--muted-foreground))] leading-snug">
          I agree to ZoomRental&apos;s{' '}
          <span className="text-[hsl(var(--primary))] hover:underline cursor-pointer">Terms of Service</span>{' '}
          and{' '}
          <span className="text-[hsl(var(--primary))] hover:underline cursor-pointer">Privacy Policy</span>
        </label>
      </div>
      {errors.terms && <p className="text-xs text-red-600">{errors.terms.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Creating account…</span>
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[hsl(var(--primary))] font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}