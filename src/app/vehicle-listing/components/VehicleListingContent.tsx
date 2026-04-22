'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { VEHICLES, Vehicle, VehicleType, FuelType, Transmission } from './vehicleData';
import VehicleCard from './VehicleCard';
import FilterSidebar from './FilterSidebar';
import BookingModal from './BookingModal';

export interface FilterState {
  vehicleType: VehicleType | 'All';
  fuelTypes: FuelType[];
  transmissions: Transmission[];
  maxPrice: number;
  minSeats: number;
  availableOnly: boolean;
}

const SORT_OPTIONS = [
  { id: 'sort-price-asc', label: 'Price: Low to High', value: 'price-asc' },
  { id: 'sort-price-desc', label: 'Price: High to Low', value: 'price-desc' },
  { id: 'sort-rating', label: 'Highest Rated', value: 'rating' },
  { id: 'sort-popular', label: 'Most Popular', value: 'popular' },
];

const DEFAULT_FILTERS: FilterState = {
  vehicleType: 'All',
  fuelTypes: [],
  transmissions: [],
  maxPrice: 6000,
  minSeats: 1,
  availableOnly: false,
};

function applyFilters(vehicles: Vehicle[], filters: FilterState, search: string, sort: string): Vehicle[] {
  let result = [...vehicles];

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
    );
  }

  if (filters.vehicleType !== 'All') {
    result = result.filter((v) => v.type === filters.vehicleType);
  }
  if (filters.fuelTypes.length > 0) {
    result = result.filter((v) => filters.fuelTypes.includes(v.fuelType));
  }
  if (filters.transmissions.length > 0) {
    result = result.filter((v) => filters.transmissions.includes(v.transmission));
  }
  result = result.filter((v) => v.pricePerDay <= filters.maxPrice);
  result = result.filter((v) => v.seats >= filters.minSeats);
  if (filters.availableOnly) {
    result = result.filter((v) => v.availability === 'Available');
  }

  if (sort === 'price-asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sort === 'price-desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  if (sort === 'popular') result.sort((a, b) => b.reviewCount - a.reviewCount);

  return result;
}

export default function VehicleListingContent() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('price-asc');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const filtered = useMemo(
    () => applyFilters(VEHICLES, filters, search, sort),
    [filters, search, sort]
  );

  const activeFilterCount =
    (filters.vehicleType !== 'All' ? 1 : 0) +
    filters.fuelTypes.length +
    filters.transmissions.length +
    (filters.maxPrice < 6000 ? 1 : 0) +
    (filters.minSeats > 1 ? 1 : 0) +
    (filters.availableOnly ? 1 : 0);

  const currentSort = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'Sort';

  return (
    <div className="flex h-full">
      {/* Filter Sidebar — desktop */}
      <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 border-r border-[hsl(var(--border))] bg-white overflow-y-auto">
        <FilterSidebar filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
      </aside>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white overflow-y-auto shadow-modal">
            <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <FilterSidebar filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-[hsl(var(--border))] px-6 py-4">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-[hsl(var(--foreground))]">Browse Vehicles</h1>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                  {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available · Bengaluru
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 btn-secondary relative"
                >
                  <SlidersHorizontal size={15} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[hsl(var(--accent))] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen((v) => !v)}
                    className="flex items-center gap-1.5 btn-secondary min-w-[160px] justify-between"
                  >
                    <span className="text-sm truncate">{currentSort}</span>
                    <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[hsl(var(--border))] rounded-xl shadow-elevated z-30 py-1 w-48 scale-in">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => { setSort(opt.value); setSortOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-[hsl(var(--secondary))] transition-colors ${
                            sort === opt.value ? 'text-[hsl(var(--primary))] font-semibold' : 'text-[hsl(var(--foreground))]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by vehicle name, brand, or location…"
                className="input-field pl-9 pr-9"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="px-6 py-6 max-w-screen-2xl mx-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center mb-4">
                <Search size={28} className="text-[hsl(var(--muted-foreground))]" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No vehicles match your filters</h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-sm mb-4">
                Try adjusting your filters or search terms to find available vehicles in your area.
              </p>
              <button
                onClick={() => { setFilters(DEFAULT_FILTERS); setSearch(''); }}
                className="btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {filtered.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onBook={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking modal */}
      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  );
}