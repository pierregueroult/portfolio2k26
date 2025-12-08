import { useState, useEffect } from 'react';
import type { Coordinates } from '../lib/geo-utils';

export function useLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude,
        heading: position.coords.heading,
        speed: position.coords.speed,
        accuracy: position.coords.accuracy,
      });
      setError(null);
    };

    const handleError = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
}
