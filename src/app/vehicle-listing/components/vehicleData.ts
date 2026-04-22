export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'CNG';
export type Transmission = 'Manual' | 'Automatic';
export type VehicleType = 'Car' | 'Bike';
export type AvailabilityStatus = 'Available' | 'Booked' | 'Maintenance';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: VehicleType;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  location: string;
  availability: AvailabilityStatus;
  imageUrl: string;
  imageAlt: string;
  features: string[];
  kmLimit: number;
  deposit: number;
}

export const VEHICLES: Vehicle[] = [
{
  id: 'vehicle-001',
  name: 'Swift Dzire',
  brand: 'Maruti Suzuki',
  type: 'Car',
  fuelType: 'Petrol',
  transmission: 'Manual',
  seats: 5,
  pricePerDay: 1299,
  rating: 4.6,
  reviewCount: 284,
  location: 'Bengaluru, HSR Layout',
  availability: 'Available',
  imageUrl: "https://images.unsplash.com/photo-1732812606620-76b62e4f263e",
  imageAlt: 'White Maruti Suzuki Swift Dzire sedan parked on a clean street',
  features: ['Bluetooth', 'Reverse Camera', 'USB Charging'],
  kmLimit: 250,
  deposit: 3000
},
{
  id: 'vehicle-002',
  name: 'Nexon EV',
  brand: 'Tata',
  type: 'Car',
  fuelType: 'Electric',
  transmission: 'Automatic',
  seats: 5,
  pricePerDay: 2199,
  rating: 4.8,
  reviewCount: 157,
  location: 'Bengaluru, Koramangala',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc1cdb57-1768568805536.png",
  imageAlt: 'Teal Tata Nexon EV compact SUV on a city road',
  features: ['Fast Charge', 'Sunroof', 'ADAS', 'Wireless Charging'],
  kmLimit: 300,
  deposit: 5000
},
{
  id: 'vehicle-003',
  name: 'Royal Enfield Classic 350',
  brand: 'Royal Enfield',
  type: 'Bike',
  fuelType: 'Petrol',
  transmission: 'Manual',
  seats: 2,
  pricePerDay: 699,
  rating: 4.5,
  reviewCount: 412,
  location: 'Bengaluru, Indiranagar',
  availability: 'Available',
  imageUrl: "https://images.unsplash.com/photo-1632124147277-249be6e01481",
  imageAlt: 'Black Royal Enfield Classic 350 motorcycle on a mountain road',
  features: ['Alloy Wheels', 'Disc Brakes', 'Dual Channel ABS'],
  kmLimit: 300,
  deposit: 2000
},
{
  id: 'vehicle-004',
  name: 'Creta',
  brand: 'Hyundai',
  type: 'Car',
  fuelType: 'Diesel',
  transmission: 'Automatic',
  seats: 5,
  pricePerDay: 2499,
  rating: 4.7,
  reviewCount: 203,
  location: 'Bengaluru, Whitefield',
  availability: 'Booked',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_19f4ce200-1768361574511.png",
  imageAlt: 'Silver Hyundai Creta SUV parked in a modern parking lot',
  features: ['Panoramic Sunroof', 'BOSE Sound', 'Ventilated Seats'],
  kmLimit: 250,
  deposit: 5000
},
{
  id: 'vehicle-005',
  name: 'Activa 6G',
  brand: 'Honda',
  type: 'Bike',
  fuelType: 'Petrol',
  transmission: 'Automatic',
  seats: 2,
  pricePerDay: 349,
  rating: 4.3,
  reviewCount: 638,
  location: 'Bengaluru, Jayanagar',
  availability: 'Available',
  imageUrl: "https://images.unsplash.com/photo-1564943999133-c8056045bc91",
  imageAlt: 'Red Honda Activa scooter parked on a city footpath',
  features: ['USB Charging', 'LED Headlamp', 'External Fuel Lid'],
  kmLimit: 200,
  deposit: 1500
},
{
  id: 'vehicle-006',
  name: 'Innova Crysta',
  brand: 'Toyota',
  type: 'Car',
  fuelType: 'Diesel',
  transmission: 'Manual',
  seats: 7,
  pricePerDay: 3499,
  rating: 4.9,
  reviewCount: 89,
  location: 'Bengaluru, MG Road',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_10b3582ff-1764720422661.png",
  imageAlt: 'White Toyota Innova Crysta MPV parked at an airport pickup zone',
  features: ['Captain Seats', 'Ambient Lighting', 'Rear AC', 'USB x4'],
  kmLimit: 300,
  deposit: 7000
},
{
  id: 'vehicle-007',
  name: 'KTM Duke 390',
  brand: 'KTM',
  type: 'Bike',
  fuelType: 'Petrol',
  transmission: 'Manual',
  seats: 2,
  pricePerDay: 899,
  rating: 4.6,
  reviewCount: 176,
  location: 'Bengaluru, Electronic City',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14d47964a-1772348573363.png",
  imageAlt: 'Orange KTM Duke 390 sports motorcycle on a racetrack',
  features: ['TFT Display', 'Cornering ABS', 'Quickshifter'],
  kmLimit: 350,
  deposit: 3000
},
{
  id: 'vehicle-008',
  name: 'Punch EV',
  brand: 'Tata',
  type: 'Car',
  fuelType: 'Electric',
  transmission: 'Automatic',
  seats: 5,
  pricePerDay: 1799,
  rating: 4.4,
  reviewCount: 62,
  location: 'Bengaluru, Bannerghatta Road',
  availability: 'Maintenance',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc1cdb57-1768568805536.png",
  imageAlt: 'Blue Tata Punch EV micro SUV on a highway',
  features: ['V2V Charging', 'Arcade.ev', 'iRA Connected'],
  kmLimit: 280,
  deposit: 4000
},
{
  id: 'vehicle-009',
  name: 'Baleno',
  brand: 'Maruti Suzuki',
  type: 'Car',
  fuelType: 'Petrol',
  transmission: 'Automatic',
  seats: 5,
  pricePerDay: 1499,
  rating: 4.5,
  reviewCount: 319,
  location: 'Bengaluru, JP Nagar',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1bc20140d-1768380108457.png",
  imageAlt: 'White Maruti Suzuki Baleno hatchback on a city road at dusk',
  features: ['HUD', 'Sunroof', '360 Camera', 'Wireless CarPlay'],
  kmLimit: 250,
  deposit: 3500
},
{
  id: 'vehicle-010',
  name: 'Ola S1 Pro',
  brand: 'Ola Electric',
  type: 'Bike',
  fuelType: 'Electric',
  transmission: 'Automatic',
  seats: 2,
  pricePerDay: 499,
  rating: 4.2,
  reviewCount: 241,
  location: 'Bengaluru, Hebbal',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1ec62b2ed-1776691745393.png",
  imageAlt: 'Jet black Ola S1 Pro electric scooter on a clean studio background',
  features: ['7" Touchscreen', 'Hill Hold', 'Reverse Mode', 'Geo-fence'],
  kmLimit: 150,
  deposit: 2500
},
{
  id: 'vehicle-011',
  name: 'Fortuner Legender',
  brand: 'Toyota',
  type: 'Car',
  fuelType: 'Diesel',
  transmission: 'Automatic',
  seats: 7,
  pricePerDay: 4999,
  rating: 4.8,
  reviewCount: 44,
  location: 'Bengaluru, Sarjapur Road',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_1547315c2-1772198942784.png",
  imageAlt: 'Pearl white Toyota Fortuner Legender full-size SUV on a mountain highway',
  features: ['4x4 AWD', 'JBL Sound', '360 View', 'Adaptive Cruise'],
  kmLimit: 400,
  deposit: 10000
},
{
  id: 'vehicle-012',
  name: 'Himalayan 450',
  brand: 'Royal Enfield',
  type: 'Bike',
  fuelType: 'Petrol',
  transmission: 'Manual',
  seats: 2,
  pricePerDay: 1099,
  rating: 4.7,
  reviewCount: 98,
  location: 'Bengaluru, Yelahanka',
  availability: 'Available',
  imageUrl: "https://img.rocket.new/generatedImages/rocket_gen_img_14541f3ec-1771885493424.png",
  imageAlt: 'Forest green Royal Enfield Himalayan 450 adventure motorcycle on a dirt trail',
  features: ['Google Maps Nav', 'Tripper Pod', 'USB-C', 'LED All-round'],
  kmLimit: 500,
  deposit: 4000
}];