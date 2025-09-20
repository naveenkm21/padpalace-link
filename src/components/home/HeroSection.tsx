import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Home, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-home.jpg';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    console.log('Search:', { searchQuery, propertyType, priceRange });
    // Navigate to properties page with filters
  };

  const stats = [
    { icon: Home, label: 'Properties Listed', value: '10K+' },
    { icon: TrendingUp, label: 'Properties Sold', value: '5K+' },
    { icon: MapPin, label: 'Cities Covered', value: '50+' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Real Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              Indian Property
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Discover exceptional properties across India from Mumbai to Delhi, Bangalore to Chennai. 
            Your dream home awaits in India's prime locations.
          </p>

          {/* Search Card */}
          <Card className="max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-sm shadow-strong">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <Input
                  placeholder="Enter city like Mumbai, Delhi, Bangalore..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-foreground"
                />
              </div>
              
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="house">Independent House</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="plot">Plot/Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-10L">Under ₹10 Lakhs</SelectItem>
                  <SelectItem value="10L-50L">₹10L - ₹50L</SelectItem>
                  <SelectItem value="50L-1Cr">₹50L - ₹1 Crore</SelectItem>
                  <SelectItem value="1Cr+">₹1 Crore+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleSearch}
              size="lg" 
              className="w-full mt-4 h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Properties
            </Button>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;