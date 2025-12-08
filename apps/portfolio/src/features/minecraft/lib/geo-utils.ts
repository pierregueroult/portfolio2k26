export type Coordinates = {
  latitude: number;
  longitude: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  accuracy: number;
};

export type Position3D = {
  x: number;
  y: number;
  z: number;
};

const EARTH_RADIUS = 6371000; // meters

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Calculates the relative position in meters from origin to target.
 * Mapping to Minecraft-like coordinates:
 * X: East (+), West (-)
 * Y: Up (+), Down (-)
 * Z: South (+), North (-)
 */
export function calculateRelativePosition(
  origin: Coordinates,
  target: Coordinates,
): Position3D {
  const lat1 = toRadians(origin.latitude);
  const lat2 = toRadians(target.latitude);
  const deltaLat = toRadians(target.latitude - origin.latitude);
  const deltaLon = toRadians(target.longitude - origin.longitude);

  // North/South distance
  // Positive deltaLat means target is North of origin.
  // Distance = deltaLat * R
  const northDistance = deltaLat * EARTH_RADIUS;

  // East/West distance
  // Distance = deltaLon * R * cos(lat)
  // We use average latitude for better precision in small areas
  const avgLat = (lat1 + lat2) / 2;
  const eastDistance = deltaLon * EARTH_RADIUS * Math.cos(avgLat);

  // Altitude
  // If altitude is null in either, we assume 0 relative difference or just 0.
  const alt1 = origin.altitude ?? 0;
  const alt2 = target.altitude ?? 0;
  const upDistance = alt2 - alt1;

  // Mapping to MC coords:
  // X = Easting
  // Z = Southing (So North is negative Z)
  // Y = Altitude
  return {
    x: eastDistance,
    y: upDistance,
    z: -northDistance,
  };
}

export function formatCoordinate(val: number): string {
  return val.toFixed(3);
}

export function getCardinalDirection(heading: number | null): string {
  if (heading === null) return 'Unknown';
  const directions = ['S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE'];
  // MC: South is +Z (0 deg?), West is -X (90?), North is -Z (180?), East is +X (270?)
  // Standard Compass: N=0, E=90, S=180, W=270.
  // Let's stick to standard compass names for the display string.
  const index = Math.round(heading / 45) % 8;
  return directions[index] ?? 'Unknown';
}

// Helper to determine facing based on standard compass heading (0=N, 90=E)
// In MC F3: "Facing: north (Towards negative Z)"
export function getMinecraftFacing(heading: number | null): string {
  if (heading === null) return '';
  
  // Standard: 0=N, 90=E, 180=S, 270=W
  // 45 segments centered on directions.
  // N: 315-45
  // E: 45-135
  // S: 135-225
  // W: 225-315
  
  const h = (heading + 360) % 360;
  
  if (h >= 315 || h < 45) return 'north (Towards negative Z)';
  if (h >= 45 && h < 135) return 'east (Towards positive X)';
  if (h >= 135 && h < 225) return 'south (Towards positive Z)';
  if (h >= 225 && h < 315) return 'west (Towards negative X)';
  
  return '';
}

export function calculateMinecraftDay(startDate: Date): number {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function calculateSunLight(latitude: number, longitude: number): number {
  const now = new Date();

  // Day of year
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Solar declination (approx)
  // delta = 23.45 * sin(2*pi/365 * (284 + n))
  const declination = 23.45 * Math.sin(((2 * Math.PI) / 365) * (284 + dayOfYear));
  const declRad = toRadians(declination);
  const latRad = toRadians(latitude);

  // Hour angle
  // Solar time = UTC + longitude_degrees / 15
  // w = (SolarTime_hours - 12) * 15 degrees
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;
  // Handle periodicity of solar time
  let solarTimeHours = (utcHours + longitude / 15);
  // Normalize to 0-24 (though strict math handles overflow, let's be clean)
  while (solarTimeHours < 0) solarTimeHours += 24;
  while (solarTimeHours >= 24) solarTimeHours -= 24;

  const hourAngle = (solarTimeHours - 12) * 15;
  const haRad = toRadians(hourAngle);

  // Sun altitude
  // sin(alt) = sin(lat)*sin(dec) + cos(lat)*cos(dec)*cos(ha)
  const sinAlt =
    Math.sin(latRad) * Math.sin(declRad) +
    Math.cos(latRad) * Math.cos(declRad) * Math.cos(haRad);
  const altitudeRad = Math.asin(sinAlt);
  const altitudeDeg = (altitudeRad * 180) / Math.PI;

  // Map altitude to 0-15 light level
  // Twilight is approx -6 to +6 degrees.
  // > 6 deg: 15
  // -6 to 6 deg: 0 to 15
  // < -6 deg: 0

  if (altitudeDeg >= 6) return 15;
  if (altitudeDeg <= -6) return 0;

  // Linear interpolation between -6 (0) and 6 (15)
  // range is 12 degrees.
  // (alt - (-6)) / 12 * 15
  return Math.floor(((altitudeDeg + 6) / 12) * 15);
}

export function calculateMoonPhase(date: Date): number {
  const lp = 2551443; 
  const now = new Date(date.getTime());                        
  const new_moon = new Date(1970, 0, 7, 20, 35, 0);
  const phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
  const val = Math.floor(phase / (24 * 3600)) + 1;
  
  // 0 to 29.53
  const days = Math.floor((phase / lp) * 29.53);
  
  // Map to MC 8 phases
  // 0: Full, 1: Waning Gibbous, ... 4: New, ...
  // Real moon age: 0 = New Moon. 14.8 = Full.
  // MC Phases:
  // 0: Full (Day 0)
  // 1: Waning Gibbous
  // 2: Last Quarter
  // 3: Waning Crescent
  // 4: New Moon
  // 5: Waxing Crescent
  // 6: First Quarter
  // 7: Waxing Gibbous
  
  // Let's approximate based on 8 segments of the lunar month
  // segment = Math.floor( (age / 29.53) * 8 )
  // This gives 0 for New Moon.
  // We need to shift it because MC 0 is Full Moon.
  // Full Moon is roughly age 14.7.
  // If we shift age by +14.7 (half cycle), then New(0) becomes Full(approx).
  
  const age = phase / lp; // 0.0 to 1.0
  // Shift by 0.5 to align 0 with Full Moon? 
  // In MC, Day 0 is Full Moon. 
  // If age=0 (New Moon), we want MC phase 4.
  // If age=0.5 (Full Moon), we want MC phase 0.
  
  let mcPhase = Math.floor(((age + 0.5) % 1.0) * 8);
  // Ensure it's 0-7
  return mcPhase;
}

export function getBiome(x: number, z: number): string {
  // Simple hash function for determinism
  const n = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453;
  const hash = Math.abs(n - Math.floor(n));

  if (hash < 0.1) return 'minecraft:river';
  if (hash < 0.3) return 'minecraft:forest';
  if (hash < 0.5) return 'minecraft:plains';
  if (hash < 0.6) return 'minecraft:beach';
  if (hash < 0.7) return 'minecraft:desert';
  if (hash < 0.8) return 'minecraft:savanna';
  if (hash < 0.9) return 'minecraft:taiga';
  return 'minecraft:ocean';
}
