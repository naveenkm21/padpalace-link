import { Property } from '@/types/property';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa with Ocean Views',
    description: 'Stunning contemporary home featuring floor-to-ceiling windows, open-concept living, and breathtaking ocean views. This architectural masterpiece includes a gourmet kitchen, spa-like bathrooms, and seamless indoor-outdoor living spaces.',
    price: 2850000,
    location: {
      address: '123 Ocean Drive',
      city: 'Malibu',
      state: 'CA',
      zipCode: '90265',
      lat: 34.0259,
      lng: -118.7798
    },
    type: 'house',
    status: 'for-sale',
    bedrooms: 5,
    bathrooms: 4,
    squareFeet: 4200,
    yearBuilt: 2020,
    lotSize: 0.75,
    features: ['Ocean View', 'Swimming Pool', 'Gourmet Kitchen', 'Home Theater', 'Wine Cellar', 'Smart Home'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah@luxuryrealty.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    views: 1247,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Downtown Penthouse Loft',
    description: 'Sophisticated urban living in this stunning penthouse featuring exposed brick, soaring ceilings, and panoramic city views. The open floor plan is perfect for entertaining with a chef\'s kitchen and spacious terraces.',
    price: 1950000,
    location: {
      address: '456 Metropolitan Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10013',
      lat: 40.7128,
      lng: -74.0060
    },
    type: 'apartment',
    status: 'for-sale',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2800,
    yearBuilt: 2018,
    features: ['City Views', 'Rooftop Terrace', 'Exposed Brick', 'High Ceilings', 'Concierge', 'Gym'],
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600607688960-e095c75b2723?w=800'
    ],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'michael@metropolitanrealty.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    views: 892,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Charming Victorian Family Home',
    description: 'Beautifully restored Victorian home with original hardwood floors, ornate moldings, and modern amenities. Perfect family home with spacious rooms, updated kitchen, and lovely garden.',
    price: 875000,
    location: {
      address: '789 Elm Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94117',
      lat: 37.7749,
      lng: -122.4194
    },
    type: 'house',
    status: 'for-sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    yearBuilt: 1895,
    lotSize: 0.25,
    features: ['Historic Character', 'Hardwood Floors', 'Updated Kitchen', 'Garden', 'Original Details'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800'
    ],
    agent: {
      id: 'agent3',
      name: 'Emily Rodriguez',
      phone: '(555) 456-7890',
      email: 'emily@victorianhomes.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    views: 654,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Modern Condo with Mountain Views',
    description: 'Contemporary condo offering stunning mountain views and luxury finishes throughout. Open floor plan with floor-to-ceiling windows, granite countertops, and premium appliances.',
    price: 650000,
    location: {
      address: '321 Alpine Way',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      lat: 39.7392,
      lng: -104.9903
    },
    type: 'condo',
    status: 'for-sale',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1800,
    yearBuilt: 2019,
    features: ['Mountain Views', 'Granite Counters', 'Stainless Appliances', 'Balcony', 'Garage'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800'
    ],
    agent: {
      id: 'agent1',
      name: 'Sarah Johnson',
      phone: '(555) 123-4567',
      email: 'sarah@luxuryrealty.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150'
    },
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    views: 423,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Luxury Townhouse in Historic District',
    description: 'Elegant townhouse located in the heart of the historic district. Features original brick walls, modern renovations, private patio, and premium finishes throughout.',
    price: 1250000,
    location: {
      address: '555 Heritage Lane',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      lat: 42.3601,
      lng: -71.0589
    },
    type: 'townhouse',
    status: 'for-sale',
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2400,
    yearBuilt: 1820,
    features: ['Historic District', 'Brick Walls', 'Private Patio', 'Renovated', 'Walking Distance'],
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      'https://images.unsplash.com/photo-1600573472605-21049ff3e72c?w=800'
    ],
    agent: {
      id: 'agent2',
      name: 'Michael Chen',
      phone: '(555) 987-6543',
      email: 'michael@metropolitanrealty.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    views: 567,
    isFeatured: true
  },
  {
    id: '6',
    title: 'Spacious Family Home with Pool',
    description: 'Perfect family home featuring an open floor plan, gourmet kitchen, master suite, and beautiful backyard with swimming pool. Located in excellent school district.',
    price: 725000,
    location: {
      address: '888 Family Circle',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      lat: 30.2672,
      lng: -97.7431
    },
    type: 'house',
    status: 'for-sale',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3500,
    yearBuilt: 2015,
    lotSize: 0.5,
    features: ['Swimming Pool', 'Open Floor Plan', 'Master Suite', 'Great Schools', 'Large Backyard'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800'
    ],
    agent: {
      id: 'agent3',
      name: 'Emily Rodriguez',
      phone: '(555) 456-7890',
      email: 'emily@victorianhomes.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    views: 789,
    isFeatured: false
  }
];