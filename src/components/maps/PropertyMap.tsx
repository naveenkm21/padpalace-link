import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface PropertyMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  className?: string;
}

const PropertyMap = ({ latitude, longitude, address, className = "" }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !latitude || !longitude) return;

    // You'll need to set your Mapbox access token
    // For development, users can add their token via environment variables
    const accessToken = 'pk.eyJ1IjoiZXN0YXRlaHViIiwiYSI6ImNrdjFha2czZjIzNWwyb3BzZHNwM2E3dDQifQ.example';
    
    if (!accessToken || accessToken.includes('example')) {
      // Show a placeholder if no token is provided
      return;
    }

    mapboxgl.accessToken = accessToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 15,
    });

    // Add marker for the property
    new mapboxgl.Marker({
      color: '#3b82f6', // Blue marker
    })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <strong>Property Location</strong>
            ${address ? `<br><span class="text-sm text-gray-600">${address}</span>` : ''}
          </div>`
        )
      )
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [latitude, longitude, address]);

  if (!latitude || !longitude) {
    return (
      <div className={`rounded-lg bg-muted/50 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-muted-foreground">Location not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div ref={mapContainer} className="w-full h-full min-h-[300px]" />
      <div className="p-2 bg-background/95 border-t text-xs text-muted-foreground">
        📍 To enable maps, add your Mapbox access token
      </div>
    </div>
  );
};

export default PropertyMap;