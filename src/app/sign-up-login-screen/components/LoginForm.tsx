'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, Copy, Check } from 'lucide-react';

interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

const DEMO_CREDENTIALS = { email: 'arjun.reddy@zoomrental.in', password: 'Zoom@2026' };

export default function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const [showPw, setShowPw] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ defaultValues: { remember: false } });

  const handleCopy = async (field: 'email' | 'password') => {
    await navigator.clipboard.writeText(DEMO_CREDENTIALS[field]);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const autofill = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
  };

  // Backend integration point: POST /api/auth/login
  const onSubmit = async (data: LoginValues) => {
    await new Promise((r) => setTimeout(r, 1200));
    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      toast.success('Signed in successfully! Welcome back, Arjun.');
      router.push('/vehicle-listing');
    } else {
      toast.error('Invalid credentials — use the demo account below to sign in.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-1.5">
          Email address
        </label>
        <input
          type="email"
          className="input-field"
          placeholder="you@example.in"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">Password</label>
          <button type="button" className="text-xs text-[hsl(var(--primary))] hover:underline">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            className="input-field pr-10"
            placeholder="••••••••"
            {...register('password', { required: 'Password is required' })}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
          {...register('remember')}
        />
        <label htmlFor="remember" className="text-sm text-[hsl(var(--muted-foreground))]">
          Keep me signed in for 30 days
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-2.5 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Signing in…</span>
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-sm text-[hsl(var(--muted-foreground))]">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-[hsl(var(--primary))] font-semibold hover:underline"
        >
          Sign up free
        </button>
      </p>

      {/* Demo credentials box */}
      <div className="mt-4 rounded-xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--secondary))] p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
            Demo Account
          </p>
          <button
            type="button"
            onClick={autofill}
            className="text-xs text-[hsl(var(--primary))] font-semibold hover:underline"
          >
            Autofill
          </button>
        </div>
        <div className="space-y-2">
          {(['email', 'password'] as const).map((field) => (
            <div key={`cred-${field}`} className="flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-1.5 border border-[hsl(var(--border))]">
              <div className="min-w-0">
                <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{field}</p>
                <p className="text-xs font-mono font-medium text-[hsl(var(--foreground))] truncate">
                  {field === 'password' ? '••••••••' : DEMO_CREDENTIALS[field]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(field)}
                className="flex-shrink-0 p-1 rounded hover:bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                {copiedField === field ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}