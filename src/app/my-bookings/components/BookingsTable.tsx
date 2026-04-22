'use client';

import React from 'react';
import { FileText, XCircle, Car, Bike, ChevronUp, ChevronDown } from 'lucide-react';
import { Booking, BookingStatus, PaymentStatus } from './bookingsData';

interface Props {
  bookings: Booking[];
  onViewBill: (b: Booking) => void;
  onCancel: (b: Booking) => void;
}

const BOOKING_STATUS_STYLES: Record<BookingStatus, string> = {
  Active: 'bg-green-100 text-green-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-gray-100 text-gray-700',
  Cancelled: 'bg-red-100 text-red-700',
  Pending: 'bg-yellow-100 text-yellow-800',
};

const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  Paid: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  Refunded: 'bg-purple-50 text-purple-700',
  Failed: 'bg-red-50 text-red-700',
};

const BOOKING_STATUS_DOT: Record<BookingStatus, string> = {
  Active: 'bg-green-500',
  Confirmed: 'bg-blue-500',
  Completed: 'bg-gray-400',
  Cancelled: 'bg-red-500',
  Pending: 'bg-yellow-500',
};

export default function BookingsTable({ bookings, onViewBill, onCancel }: Props) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-[hsl(var(--secondary))] border-b border-[hsl(var(--border))]">
              {[
                { id: 'col-id', label: 'Booking ID' },
                { id: 'col-vehicle', label: 'Vehicle' },
                { id: 'col-dates', label: 'Dates' },
                { id: 'col-duration', label: 'Duration' },
                { id: 'col-amount', label: 'Amount' },
                { id: 'col-payment', label: 'Payment' },
                { id: 'col-status', label: 'Status' },
                { id: 'col-actions', label: 'Actions' },
              ].map((col) => (
                <th
                  key={col.id}
                  className="text-left px-4 py-3 text-xs font-600 uppercase tracking-wider text-[hsl(var(--muted-foreground))]"
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.id !== 'col-actions' && (
                      <span className="flex flex-col opacity-30">
                        <ChevronUp size={10} />
                        <ChevronDown size={10} className="-mt-1" />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[hsl(var(--border))]">
            {bookings.map((booking) => {
              const canCancel = booking.status === 'Confirmed' || booking.status === 'Pending';
              return (
                <tr
                  key={booking.id}
                  className="hover:bg-[hsl(var(--secondary))/50] transition-colors group"
                >
                  {/* Booking ID */}
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-sm font-semibold text-[hsl(var(--primary))]">
                      #{booking.id}
                    </span>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{booking.createdAt}</p>
                  </td>

                  {/* Vehicle */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        booking.vehicleType === 'Car' ?'bg-blue-50 text-blue-600' :'bg-orange-50 text-orange-600'
                      }`}>
                        {booking.vehicleType === 'Car' ? <Car size={14} /> : <Bike size={14} />}
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-tight">{booking.vehicleName}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">{booking.vehicleBrand} · {booking.fuelType}</p>
                      </div>
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-mono tabular-nums text-[hsl(var(--foreground))]">{booking.pickupDate}</p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">→ {booking.returnDate}</p>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium tabular-nums">
                      {booking.durationDays} day{booking.durationDays !== 1 ? 's' : ''}
                    </p>
                    {booking.kmDriven !== undefined && (
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                        {booking.kmDriven} / {booking.kmLimit} km
                      </p>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-bold font-mono tabular-nums">
                      ₹{booking.totalAmount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                      incl. GST
                    </p>
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${PAYMENT_STATUS_STYLES[booking.paymentStatus]}`}>
                      {booking.paymentStatus}
                    </span>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 truncate max-w-[120px]">
                      {booking.paymentMethod}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${BOOKING_STATUS_STYLES[booking.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${BOOKING_STATUS_DOT[booking.status]}`} />
                      {booking.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {/* View Bill */}
                      <div className="relative group/tooltip">
                        <button
                          onClick={() => onViewBill(booking)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-[hsl(var(--muted-foreground))] hover:text-blue-700 transition-colors"
                        >
                          <FileText size={15} />
                        </button>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 pointer-events-none z-20">
                          View Bill
                        </span>
                      </div>

                      {/* Cancel */}
                      {canCancel && (
                        <div className="relative group/tooltip">
                          <button
                            onClick={() => onCancel(booking)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-[hsl(var(--muted-foreground))] hover:text-red-600 transition-colors"
                          >
                            <XCircle size={15} />
                          </button>
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 pointer-events-none z-20">
                            Cancel Booking
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Always show for completed/active */}
                    {(booking.status === 'Completed' || booking.status === 'Active') && (
                      <button
                        onClick={() => onViewBill(booking)}
                        className="text-xs text-[hsl(var(--primary))] hover:underline font-medium"
                      >
                        View Bill
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table footer */}
      <div className="px-4 py-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--secondary))] flex items-center justify-between">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Showing {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Total spent: ₹{bookings.reduce((s, b) => s + (b.status !== 'Cancelled' ? b.totalAmount : 0), 0).toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}