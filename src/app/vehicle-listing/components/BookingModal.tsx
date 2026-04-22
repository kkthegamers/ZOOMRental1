'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { X, MapPin, Calendar, Loader2, Star, Shield, Info } from 'lucide-react';
import { Vehicle } from './vehicleData';
import AppImage from '@/components/ui/AppImage';
import { useRouter } from 'next/navigation';

interface Props {
  vehicle: Vehicle;
  onClose: () => void;
}

interface BookingFormValues {
  pickupDate: string;
  returnDate: string;
  pickupLocation: string;
  addDriver: boolean;
  addInsurance: boolean;
  notes: string;
}

function formatINR(amount: number) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function BookingModal({ vehicle, onClose }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      pickupDate: '',
      returnDate: '',
      pickupLocation: vehicle.location,
      addDriver: false,
      addInsurance: true,
      notes: '',
    },
  });

  const pickupDate = watch('pickupDate');
  const returnDate = watch('returnDate');
  const addDriver = watch('addDriver');
  const addInsurance = watch('addInsurance');

  const days = pickupDate && returnDate
    ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / 86400000))
    : 1;

  const baseAmount = vehicle.pricePerDay * days;
  const driverFee = addDriver ? 500 * days : 0;
  const insuranceFee = addInsurance ? 199 * days : 0;
  const gst = Math.round((baseAmount + driverFee + insuranceFee) * 0.18);
  const total = baseAmount + driverFee + insuranceFee + gst;

  // Backend integration point: POST /api/bookings/create
  const onSubmit = async (_data: BookingFormValues) => {
    await new Promise((r) => setTimeout(r, 1500));
    toast.success(`Booking confirmed for ${vehicle.name}! Booking ID: BK-${Math.floor(10000 + Math.random() * 90000)}`);
    onClose();
    router.push('/my-bookings');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="font-bold text-lg">Book {vehicle.name}</h2>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Step {step} of 2 — {step === 1 ? 'Trip details' : 'Review & confirm'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5 fade-in">
                {/* Vehicle summary */}
                <div className="flex gap-4 p-4 bg-[hsl(var(--secondary))] rounded-xl">
                  <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <AppImage
                      src={vehicle.imageUrl}
                      alt={vehicle.imageAlt}
                      width={80}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{vehicle.brand}</p>
                    <p className="font-semibold">{vehicle.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{vehicle.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))]">
                        <MapPin size={11} />
                        <span className="truncate">{vehicle.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold font-mono tabular-nums">{formatINR(vehicle.pricePerDay)}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">per day</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Pickup Date
                      </span>
                    </label>
                    <input
                      type="date"
                      min={today}
                      className="input-field"
                      {...register('pickupDate', { required: 'Pickup date is required' })}
                    />
                    {errors.pickupDate && <p className="mt-1 text-xs text-red-600">{errors.pickupDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Return Date
                      </span>
                    </label>
                    <input
                      type="date"
                      min={pickupDate || today}
                      className="input-field"
                      {...register('returnDate', {
                        required: 'Return date is required',
                        validate: (v) => !pickupDate || v >= pickupDate || 'Return must be after pickup',
                      })}
                    />
                    {errors.returnDate && <p className="mt-1 text-xs text-red-600">{errors.returnDate.message}</p>}
                  </div>
                </div>

                {/* Pickup location */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Pickup Location</label>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">
                    Vehicle will be ready at this address. Doorstep delivery available for an additional fee.
                  </p>
                  <input
                    type="text"
                    className="input-field"
                    {...register('pickupLocation', { required: 'Pickup location is required' })}
                  />
                  {errors.pickupLocation && <p className="mt-1 text-xs text-red-600">{errors.pickupLocation.message}</p>}
                </div>

                {/* Add-ons */}
                <div>
                  <p className="text-sm font-medium mb-3">Add-ons</p>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-[hsl(var(--border))] cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[hsl(var(--primary))]"
                          {...register('addInsurance')}
                        />
                        <div>
                          <p className="text-sm font-medium flex items-center gap-1.5">
                            <Shield size={14} className="text-blue-600" />
                            Rental Insurance
                          </p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Covers damage, theft & 3rd party liability</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[hsl(var(--primary))] font-mono">₹199/day</span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-[hsl(var(--border))] cursor-pointer hover:bg-[hsl(var(--secondary))] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-[hsl(var(--primary))]"
                          {...register('addDriver')}
                        />
                        <div>
                          <p className="text-sm font-medium">Add a Driver</p>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">Verified, background-checked driver included</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[hsl(var(--primary))] font-mono">₹500/day</span>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Special Requests (optional)</label>
                  <textarea
                    rows={2}
                    className="input-field resize-none"
                    placeholder="Any special requests or notes for the vehicle host…"
                    {...register('notes')}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full btn-primary py-2.5"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5 fade-in">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl text-sm text-blue-800">
                  <Info size={16} className="flex-shrink-0" />
                  Review your booking details before confirming. Payment will be collected securely.
                </div>

                {/* Bill summary */}
                <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
                  <div className="bg-[hsl(var(--secondary))] px-4 py-3">
                    <p className="text-sm font-semibold">Billing Summary</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      {days} day{days !== 1 ? 's' : ''} rental
                    </p>
                  </div>
                  <div className="p-4 space-y-2.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">Base rental ({days} × {formatINR(vehicle.pricePerDay)})</span>
                      <span className="font-mono tabular-nums font-medium">{formatINR(baseAmount)}</span>
                    </div>
                    {insuranceFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[hsl(var(--muted-foreground))]">Insurance ({days} × ₹199)</span>
                        <span className="font-mono tabular-nums font-medium">{formatINR(insuranceFee)}</span>
                      </div>
                    )}
                    {driverFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[hsl(var(--muted-foreground))]">Driver service ({days} × ₹500)</span>
                        <span className="font-mono tabular-nums font-medium">{formatINR(driverFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">GST (18%)</span>
                      <span className="font-mono tabular-nums font-medium">{formatINR(gst)}</span>
                    </div>
                    <div className="border-t border-[hsl(var(--border))] pt-2.5 flex justify-between">
                      <span className="font-semibold">Total Payable</span>
                      <span className="font-bold text-lg font-mono tabular-nums text-[hsl(var(--primary))]">
                        {formatINR(total)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[hsl(var(--muted-foreground))]">Refundable deposit</span>
                      <span className="font-mono tabular-nums text-[hsl(var(--muted-foreground))]">{formatINR(vehicle.deposit)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 btn-secondary py-2.5"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary py-2.5 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Confirming…
                      </>
                    ) : (
                      `Confirm & Pay ${formatINR(total)}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}