import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Share2,
  Calendar,
  Car,
  Trash2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import BookVisit from '@/components/booking/BookVisit';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  address: string;
  city: string;
  state: string;
  status: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  agent_id?: string;
  profiles?: {
    full_name: string;
    phone: string;
  };
}

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProperty();
      checkFavoriteStatus();
    }
  }, [id, user]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles (
            full_name,
            phone
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Property not found",
      });
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('property_id', id)
        .single();
      
      setIsFavorited(!!data);
    } catch (error) {
      // Not favorited
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save favorites",
      });
      return;
    }

    try {
      if (isFavorited) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', id);
        setIsFavorited(false);
        toast({
          title: "Removed from favorites",
        });
      } else {
        await supabase
          .from('favorites')
          .insert([{
            user_id: user.id,
            property_id: id,
          }]);
        setIsFavorited(true);
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update favorites",
      });
    }
  };

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (authLoading || loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Property not found</h1>
          <Button onClick={() => navigate('/properties')}>
            View All Properties
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-4">
              {property.images && property.images.length > 0 ? (
                <>
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-muted-foreground">No images available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {property.images && property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {property.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video rounded overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Property Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg">About This Property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || 'This is a beautiful property located in a prime area with excellent connectivity and amenities. Perfect for families looking for a comfortable and modern living space.'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {property.status}
                    </Badge>
                    <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
                    <p className="text-3xl font-bold text-primary mb-2">
                      {formatPrice(property.price)}
                    </p>
                    <div className="flex items-center text-muted-foreground gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{property.address}, {property.city}, {property.state}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleFavorite}
                      className={isFavorited ? 'text-red-500' : ''}
                    >
                      <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Bed className="h-4 w-4" />
                      <span className="font-semibold">{property.bedrooms}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Bath className="h-4 w-4" />
                      <span className="font-semibold">{property.bathrooms}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Square className="h-4 w-4" />
                      <span className="font-semibold">{property.square_feet?.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Sq Ft</span>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Property Features</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Type: {property.property_type}</span>
                    </div>
                    {property.square_feet && (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span>Area: {property.square_feet.toLocaleString()} sq ft</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Status: {property.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span>Location: {property.city}, {property.state}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Book Visit Section */}
            <BookVisit
              propertyId={property.id}
              propertyTitle={property.title}
              agentName={property.profiles?.full_name}
            />

            {/* Agent Information */}
            {property.profiles && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Contact Agent</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{property.profiles.full_name}</p>
                      <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full gap-2">
                        <Phone className="h-4 w-4" />
                        Call Agent
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Mail className="h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;