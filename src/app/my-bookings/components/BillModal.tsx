'use client';

import React from 'react';
import { X, Download, Car, Bike, Shield, User, CheckCircle } from 'lucide-react';
import { Booking } from './bookingsData';

interface Props {
  booking: Booking;
  onClose: () => void;
}

function Row({ label, value, mono, bold }: { label: string; value: string; mono?: boolean; bold?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 ${bold ? 'border-t border-[hsl(var(--border))] mt-1 pt-3' : ''}`}>
      <span className={`text-sm ${bold ? 'font-semibold' : 'text-[hsl(var(--muted-foreground))]'}`}>{label}</span>
      <span className={`text-sm ${bold ? 'font-bold text-[hsl(var(--primary))]' : ''} ${mono ? 'font-mono tabular-nums' : ''}`}>
        {value}
      </span>
    </div>
  );
}

export default function BillModal({ booking, onClose }: Props) {
  const subtotal = booking.baseAmount + booking.insuranceFee + booking.driverFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg max-h-[90vh] overflow-y-auto scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="font-bold text-lg">Rental Invoice</h2>
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono mt-0.5">#{booking.id}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-secondary flex items-center gap-1.5 py-1.5 px-3 text-xs"
              onClick={() => {/* Backend integration point: GET /api/bookings/:id/invoice/pdf */}}
            >
              <Download size={13} />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[hsl(var(--secondary))] transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status banner */}
          {booking.status === 'Completed' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-800 font-medium">Rental completed successfully</p>
            </div>
          )}
          {booking.status === 'Cancelled' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
              <X size={16} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800 font-medium">This booking was cancelled. Refund processed.</p>
            </div>
          )}
          {booking.status === 'Active' && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-blue-800 font-medium">Rental is currently active</p>
            </div>
          )}

          {/* Vehicle info */}
          <div className="flex items-center gap-4 p-4 bg-[hsl(var(--secondary))] rounded-xl">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              booking.vehicleType === 'Car' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
            }`}>
              {booking.vehicleType === 'Car' ? <Car size={20} /> : <Bike size={20} />}
            </div>
            <div className="flex-1">
              <p className="font-semibold">{booking.vehicleName}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{booking.vehicleBrand} · {booking.fuelType} · {booking.vehicleType}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Booking date</p>
              <p className="text-sm font-medium">{booking.createdAt}</p>
            </div>
          </div>

          {/* Trip details */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">
              Trip Details
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'td-pickup', label: 'Pickup', value: booking.pickupDate },
                { id: 'td-return', label: 'Return', value: booking.returnDate },
                { id: 'td-duration', label: 'Duration', value: `${booking.durationDays} day${booking.durationDays !== 1 ? 's' : ''}` },
                { id: 'td-location', label: 'Location', value: booking.pickupLocation },
                { id: 'td-kmlimit', label: 'KM Limit', value: `${booking.kmLimit} km/day` },
                ...(booking.kmDriven !== undefined
                  ? [{ id: 'td-kmdriven', label: 'KM Driven', value: `${booking.kmDriven} km` }]
                  : []),
              ].map((item) => (
                <div key={item.id} className="bg-white border border-[hsl(var(--border))] rounded-lg px-3 py-2.5">
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))] uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-medium mt-0.5 font-mono">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {(booking.hasInsurance || booking.hasDriver) && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2">
                Add-ons
              </p>
              <div className="space-y-2">
                {booking.hasInsurance && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield size={14} className="text-blue-600" />
                    <span>Rental Insurance</span>
                    <span className="ml-auto font-mono tabular-nums font-medium">
                      +₹{booking.insuranceFee.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {booking.hasDriver && (
                  <div className="flex items-center gap-2 text-sm">
                    <User size={14} className="text-purple-600" />
                    <span>Driver Service</span>
                    <span className="ml-auto font-mono tabular-nums font-medium">
                      +₹{booking.driverFee.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bill breakdown */}
          <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
            <div className="bg-[hsl(var(--secondary))] px-4 py-3">
              <p className="text-sm font-semibold">Billing Breakdown</p>
            </div>
            <div className="px-4 py-3">
              <Row
                label={`Base Rental (${booking.durationDays} day${booking.durationDays !== 1 ? 's' : ''})`}
                value={`₹${booking.baseAmount.toLocaleString('en-IN')}`}
                mono
              />
              {booking.insuranceFee > 0 && (
                <Row label="Insurance" value={`₹${booking.insuranceFee.toLocaleString('en-IN')}`} mono />
              )}
              {booking.driverFee > 0 && (
                <Row label="Driver Service" value={`₹${booking.driverFee.toLocaleString('en-IN')}`} mono />
              )}
              <Row label="Subtotal" value={`₹${subtotal.toLocaleString('en-IN')}`} mono />
              <Row label="GST (18%)" value={`₹${booking.gst.toLocaleString('en-IN')}`} mono />
              <Row
                label="Total Paid"
                value={`₹${booking.totalAmount.toLocaleString('en-IN')}`}
                mono
                bold
              />
              <div className="flex justify-between items-center py-2 mt-1">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Refundable Deposit</span>
                <span className="text-sm font-mono tabular-nums text-[hsl(var(--muted-foreground))]">
                  ₹{booking.deposit.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="flex items-center justify-between p-3 bg-[hsl(var(--secondary))] rounded-xl">
            <div>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Payment Method</p>
              <p className="text-sm font-medium mt-0.5">{booking.paymentMethod}</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              booking.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
              booking.paymentStatus === 'Refunded' ? 'bg-purple-100 text-purple-700' :
              booking.paymentStatus === 'Pending'? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>
              {booking.paymentStatus}
            </span>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-semibold text-amber-800 mb-1">Notes</p>
              <p className="text-sm text-amber-900">{booking.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}