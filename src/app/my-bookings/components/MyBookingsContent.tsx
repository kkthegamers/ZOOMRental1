'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, Download, CalendarCheck } from 'lucide-react';
import { BOOKINGS, Booking, BookingStatus } from './bookingsData';
import BookingsTable from './BookingsTable';
import BillModal from './BillModal';
import CancelModal from './CancelModal';

const STATUS_TABS: { id: string; label: string; value: BookingStatus | 'All' }[] = [
  { id: 'tab-all', label: 'All Bookings', value: 'All' },
  { id: 'tab-confirmed', label: 'Confirmed', value: 'Confirmed' },
  { id: 'tab-active', label: 'Active', value: 'Active' },
  { id: 'tab-completed', label: 'Completed', value: 'Completed' },
  { id: 'tab-cancelled', label: 'Cancelled', value: 'Cancelled' },
  { id: 'tab-pending', label: 'Pending', value: 'Pending' },
];

function getTabCount(bookings: Booking[], status: BookingStatus | 'All') {
  if (status === 'All') return bookings.length;
  return bookings.filter((b) => b.status === status).length;
}

export default function MyBookingsContent() {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'All'>('All');
  const [search, setSearch] = useState('');
  const [billBooking, setBillBooking] = useState<Booking | null>(null);
  const [cancelBooking, setCancelBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);

  const filtered = useMemo(() => {
    let result = [...bookings];
    if (activeTab !== 'All') {
      result = result.filter((b) => b.status === activeTab);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.vehicleName.toLowerCase().includes(q) ||
          b.vehicleBrand.toLowerCase().includes(q) ||
          b.pickupLocation.toLowerCase().includes(q)
      );
    }
    return result;
  }, [bookings, activeTab, search]);

  const handleCancel = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? { ...b, status: 'Cancelled' as BookingStatus, paymentStatus: 'Refunded' as const }
          : b
      )
    );
    setCancelBooking(null);
  };

  const activeCount = bookings.filter((b) => b.status === 'Active').length;

  return (
    <div className="flex flex-col min-h-full">
      {/* Page header */}
      <div className="bg-white border-b border-[hsl(var(--border))] px-6 py-5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">My Bookings</h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
                {activeCount > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 text-green-700 font-medium">
                    · {activeCount} currently active
                  </span>
                )}
              </p>
            </div>
            <button className="btn-secondary flex items-center gap-2 self-start sm:self-auto">
              <Download size={15} />
              Export History
            </button>
          </div>

          {/* Alert for active booking */}
          {activeCount > 0 && (
            <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-sm text-green-800 font-medium">
                You have {activeCount} active rental{activeCount > 1 ? 's' : ''} in progress.
                Return before your scheduled date to avoid late fees.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-screen-2xl mx-auto w-full">
        {/* Search + tabs */}
        <div className="mb-5 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by booking ID, vehicle, or location…"
              className="input-field pl-9 pr-9"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {STATUS_TABS.map((tab) => {
              const count = getTabCount(bookings, tab.value);
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-[hsl(var(--primary))] text-white'
                      : 'bg-white border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]'
                  }`}
                >
                  {tab.label}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--muted-foreground))]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Table or empty */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center card p-12">
            <div className="w-16 h-16 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center mb-4">
              <CalendarCheck size={28} className="text-[hsl(var(--muted-foreground))]" />
            </div>
            <h3 className="text-lg font-semibold mb-1">
              {search ? 'No bookings match your search' : `No ${activeTab === 'All' ? '' : activeTab.toLowerCase() + ' '}bookings yet`}
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-sm mb-4">
              {search
                ? 'Try a different search term or booking ID.'
                : 'Your booking history will appear here once you complete your first rental.'}
            </p>
            {!search && (
              <a href="/vehicle-listing" className="btn-primary">
                Browse Vehicles
              </a>
            )}
          </div>
        ) : (
          <BookingsTable
            bookings={filtered}
            onViewBill={(b) => setBillBooking(b)}
            onCancel={(b) => setCancelBooking(b)}
          />
        )}
      </div>

      {/* Bill modal */}
      {billBooking && (
        <BillModal booking={billBooking} onClose={() => setBillBooking(null)} />
      )}

      {/* Cancel confirm modal */}
      {cancelBooking && (
        <CancelModal
          booking={cancelBooking}
          onConfirm={() => handleCancel(cancelBooking.id)}
          onClose={() => setCancelBooking(null)}
        />
      )}
    </div>
  );
}