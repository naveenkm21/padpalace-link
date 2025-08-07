export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  property_type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  address: string;
  city: string;
  state: string;
  zip_code: string | null;
  latitude: number | null;
  longitude: number | null;
  images: string[];
  status: string;
  is_featured: boolean;
  agent_id: string | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name: string | null;
    phone: string | null;
  };
}

export interface SearchFilters {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  propertyType?: string;
  minBedrooms?: number;
  minBathrooms?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
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