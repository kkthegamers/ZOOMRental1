'use client';

import React from 'react';
import { MapPin, Star, Fuel, Users, Zap, Settings2 } from 'lucide-react';
import { Vehicle } from './vehicleData';
import AppImage from '@/components/ui/AppImage';

interface Props {
  vehicle: Vehicle;
  onBook: () => void;
}

const AVAILABILITY_STYLES: Record<string, string> = {
  Available: 'bg-green-100 text-green-700',
  Booked: 'bg-orange-100 text-orange-700',
  Maintenance: 'bg-gray-100 text-gray-500',
};

const FUEL_ICON: Record<string, React.ReactNode> = {
  Petrol: <Fuel size={12} />,
  Diesel: <Fuel size={12} />,
  Electric: <Zap size={12} />,
  CNG: <Fuel size={12} />,
};

const FUEL_COLOR: Record<string, string> = {
  Petrol: 'bg-blue-50 text-blue-700',
  Diesel: 'bg-slate-100 text-slate-700',
  Electric: 'bg-green-50 text-green-700',
  CNG: 'bg-teal-50 text-teal-700',
};

export default function VehicleCard({ vehicle, onBook }: Props) {
  const isUnavailable = vehicle.availability !== 'Available';

  return (
    <div className={`card flex flex-col overflow-hidden transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 ${isUnavailable ? 'opacity-80' : ''}`}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <AppImage
          src={vehicle.imageUrl}
          alt={vehicle.imageAlt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Type badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[hsl(var(--primary))] text-white text-[11px] font-semibold rounded-md">
          {vehicle.type}
        </span>
        {/* Availability */}
        <span className={`absolute top-3 right-3 px-2 py-0.5 text-[11px] font-semibold rounded-md ${AVAILABILITY_STYLES[vehicle.availability]}`}>
          {vehicle.availability}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Name & rating */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="text-[11px] text-[hsl(var(--muted-foreground))] font-medium">{vehicle.brand}</p>
            <h3 className="font-semibold text-[15px] leading-tight">{vehicle.name}</h3>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold tabular-nums">{vehicle.rating}</span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">({vehicle.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] mb-3">
          <MapPin size={11} />
          <span className="truncate">{vehicle.location}</span>
        </div>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${FUEL_COLOR[vehicle.fuelType]}`}>
            {FUEL_ICON[vehicle.fuelType]}
            {vehicle.fuelType}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700">
            <Settings2 size={11} />
            {vehicle.transmission}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-600">
            <Users size={11} />
            {vehicle.seats} seats
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700">
            {vehicle.kmLimit} km/day
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {vehicle.features.slice(0, 3).map((f) => (
            <span key={`feat-${vehicle.id}-${f}`} className="text-[10px] text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] px-1.5 py-0.5 rounded">
              {f}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="text-[10px] text-[hsl(var(--muted-foreground))] bg-[hsl(var(--secondary))] px-1.5 py-0.5 rounded">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold text-[hsl(var(--foreground))] tabular-nums font-mono">
                ₹{vehicle.pricePerDay.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">/day</span>
            </div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
              +₹{vehicle.deposit.toLocaleString('en-IN')} deposit
            </p>
          </div>
          <button
            onClick={onBook}
            disabled={isUnavailable}
            className="btn-primary px-4 py-2 text-sm flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isUnavailable ? vehicle.availability : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
}