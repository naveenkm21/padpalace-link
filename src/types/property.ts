export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    lat?: number;
    lng?: number;
  };
  type: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt?: number;
  lotSize?: number;
  features: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  views: number;
  isFeatured: boolean;
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  propertyType?: Property['type'];
  minBedrooms?: number;
  minBathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  features?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'agent';
  avatar?: string;
  phone?: string;
  bio?: string;
  createdAt: string;
}