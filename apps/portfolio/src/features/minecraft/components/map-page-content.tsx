'use client';

import { useLocation } from '../hooks/use-location';
import { F3Display } from './f3-display';

export function MapPageContent() {
  const { location, error } = useLocation();

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-background backdrop-blur-sm overflow-hidden">
      <F3Display currentLocation={location} error={error} />
    </div>
  );
}
