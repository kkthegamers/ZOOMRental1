'use client';

import React from 'react';
import { FilterX } from 'lucide-react';
import { FilterState } from './VehicleListingContent';
import { FuelType, Transmission, VehicleType } from './vehicleData';

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
}

const FUEL_TYPES: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'CNG'];
const TRANSMISSIONS: Transmission[] = ['Manual', 'Automatic'];
const VEHICLE_TYPES: { id: string; label: string; value: VehicleType | 'All' }[] = [
  { id: 'vt-all', label: 'All', value: 'All' },
  { id: 'vt-car', label: 'Cars', value: 'Car' },
  { id: 'vt-bike', label: 'Bikes', value: 'Bike' },
];
const SEAT_OPTIONS = [
  { id: 'seat-1', label: 'Any', value: 1 },
  { id: 'seat-2', label: '2+', value: 2 },
  { id: 'seat-5', label: '5+', value: 5 },
  { id: 'seat-7', label: '7+', value: 7 },
];

function toggleArray<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

export default function FilterSidebar({ filters, onChange, onReset }: Props) {
  return (
    <div className="p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[15px]">Filters</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--destructive))] transition-colors"
        >
          <FilterX size={13} />
          Reset
        </button>
      </div>

      {/* Vehicle type */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2.5">
          Vehicle Type
        </p>
        <div className="flex gap-2">
          {VEHICLE_TYPES.map((vt) => (
            <button
              key={vt.id}
              onClick={() => onChange({ ...filters, vehicleType: vt.value })}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                filters.vehicleType === vt.value
                  ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]'
                  : 'bg-white text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]'
              }`}
            >
              {vt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability toggle */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Available Only</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">Hide booked & maintenance</p>
        </div>
        <button
          onClick={() => onChange({ ...filters, availableOnly: !filters.availableOnly })}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
            filters.availableOnly ? 'bg-[hsl(var(--primary))]' : 'bg-gray-200'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              filters.availableOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Fuel type */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2.5">
          Fuel Type
        </p>
        <div className="space-y-2">
          {FUEL_TYPES.map((fuel) => (
            <label key={`fuel-${fuel}`} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.fuelTypes.includes(fuel)}
                onChange={() => onChange({ ...filters, fuelTypes: toggleArray(filters.fuelTypes, fuel) })}
                className="w-4 h-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
              />
              <span className="text-sm group-hover:text-[hsl(var(--foreground))] text-[hsl(var(--muted-foreground))] transition-colors">
                {fuel}
              </span>
              {fuel === 'Electric' && (
                <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                  Eco
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2.5">
          Transmission
        </p>
        <div className="space-y-2">
          {TRANSMISSIONS.map((tx) => (
            <label key={`tx-${tx}`} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.transmissions.includes(tx)}
                onChange={() => onChange({ ...filters, transmissions: toggleArray(filters.transmissions, tx) })}
                className="w-4 h-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
              />
              <span className="text-sm group-hover:text-[hsl(var(--foreground))] text-[hsl(var(--muted-foreground))] transition-colors">
                {tx}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
            Max Price / Day
          </p>
          <span className="text-sm font-semibold text-[hsl(var(--primary))] font-mono tabular-nums">
            ₹{filters.maxPrice.toLocaleString('en-IN')}
          </span>
        </div>
        <input
          type="range"
          min={300}
          max={6000}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[hsl(var(--primary))] h-1.5 rounded-full"
        />
        <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-1">
          <span>₹300</span>
          <span>₹6,000</span>
        </div>
      </div>

      {/* Seats */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2.5">
          Minimum Seats
        </p>
        <div className="flex gap-2 flex-wrap">
          {SEAT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange({ ...filters, minSeats: opt.value })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                filters.minSeats === opt.value
                  ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]'
                  : 'bg-white text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}