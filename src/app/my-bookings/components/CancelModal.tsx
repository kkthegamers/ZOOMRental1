'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { Booking } from './bookingsData';

interface Props {
  booking: Booking;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelModal({ booking, onConfirm, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  // Backend integration point: PATCH /api/bookings/:id/cancel
  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    onConfirm();
    toast.success(`Booking #${booking.id} cancelled. Refund will be processed in 3–5 business days.`);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-md scale-in">
        <div className="p-6">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle size={22} className="text-red-600" />
          </div>

          <h2 className="text-lg font-bold mb-1">Cancel this booking?</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            You&apos;re about to cancel booking{' '}
            <span className="font-mono font-semibold text-[hsl(var(--foreground))]">#{booking.id}</span>{' '}
            for <span className="font-semibold text-[hsl(var(--foreground))]">{booking.vehicleName}</span>{' '}
            ({booking.pickupDate} → {booking.returnDate}).
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-5">
            <p className="text-xs font-semibold text-amber-800 mb-1">Cancellation Policy</p>
            <ul className="text-xs text-amber-900 space-y-0.5">
              <li>· Full refund if cancelled 48+ hours before pickup</li>
              <li>· 50% refund if cancelled within 24–48 hours</li>
              <li>· No refund within 24 hours of pickup</li>
              <li>· Deposit refunded within 3–5 business days</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 btn-secondary py-2.5"
            >
              Keep Booking
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Cancelling…
                </>
              ) : (
                'Yes, Cancel Booking'
              )}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}