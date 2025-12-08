'use client';

import { useEffect, useState } from 'react';
import {
  calculateMinecraftDay,
  calculateRelativePosition,
  calculateSunLight,
  calculateMoonPhase,
  formatCoordinate,
  getBiome,
  getMinecraftFacing,
  type Coordinates,
} from '../lib/geo-utils';
import { HOME_COORDINATES, WORLD_START_DATE } from '../config';

interface F3DisplayProps {
  currentLocation: Coordinates | null;
  error: string | null;
}

export function F3Display({ currentLocation, error }: F3DisplayProps) {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<{
    used: number;
    total: number;
    limit: number;
  } | null>(null);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
        
        // Update memory if available (Chrome only mostly)
        // @ts-expect-error - performance.memory is not standard
        if (performance.memory) {
          // @ts-expect-error - performance.memory is not standard
          const mem = performance.memory;
          setMemory({
            used: Math.round(mem.usedJSHeapSize / 1024 / 1024),
            total: Math.round(mem.totalJSHeapSize / 1024 / 1024),
            limit: Math.round(mem.jsHeapSizeLimit / 1024 / 1024),
          });
        }
      }
      animId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animId);
  }, []);

  if (error) {
    return (
      <div className="font-mono text-red-500 bg-black/50 p-4 rounded">
        Error: {error}
      </div>
    );
  }

  if (!currentLocation) {
    return (
      <div className="font-mono text-white bg-black/50 p-4 rounded">
        Waiting for location...
      </div>
    );
  }

  const pos = calculateRelativePosition(HOME_COORDINATES, currentLocation);
  const facing = getMinecraftFacing(currentLocation.heading);
  const lightLevel = calculateSunLight(
    currentLocation.latitude,
    currentLocation.longitude
  );
  const dayCount = calculateMinecraftDay(WORLD_START_DATE);
  const moonPhase = calculateMoonPhase(new Date());
  
  // Local Difficulty: 0.75 + (dayFactor) + (moonFactor)
  // Simplified: Base + MoonPhase * 0.25
  const localDifficulty = (0.75 + (moonPhase / 8) * 1.5).toFixed(2);

  const chunkX = Math.floor(pos.x / 16);
  const chunkY = Math.floor(pos.y / 16);
  const chunkZ = Math.floor(pos.z / 16);
  const inChunkX = Math.floor(pos.x) & 15;
  const inChunkY = Math.floor(pos.y) & 15;
  const inChunkZ = Math.floor(pos.z) & 15;
  const biome = getBiome(chunkX, chunkZ);
  
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const hardwareConcurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 0;

  return (
    <div className="font-mono text-sm md:text-base leading-tight select-none pointer-events-none text-foreground p-2 w-full h-full overflow-hidden text-shadow-sm">
      <div>Minecraft 1.21.4 (Real_World)</div>
      <div>{fps} fps T: 120s fancy</div>
      <div>&nbsp;</div>
      {memory ? (
        <div>
          Mem: {Math.round((memory.used / memory.total) * 100)}% {memory.used}/{memory.total}MB
        </div>
      ) : (
        <div>Mem: 50% 1024/2048MB (Simulated)</div>
      )}
      <div>Allocation rate: {Math.floor(Math.random() * 200)}MB/s</div>
      <div>&nbsp;</div>
      <div>
        XYZ: {formatCoordinate(pos.x)} / {formatCoordinate(pos.y)} /{' '}
        {formatCoordinate(pos.z)}
      </div>
      <div>
        Block: {Math.floor(pos.x)} {Math.floor(pos.y)} {Math.floor(pos.z)} [
        {inChunkX} {inChunkY} {inChunkZ}]
      </div>
      <div>
        Chunk: {chunkX} {chunkY} {chunkZ} in {chunkX & 31} {chunkY & 31}{' '}
        {chunkZ & 31}
      </div>
      <div>
        Facing: {facing} ({currentLocation.heading?.toFixed(1) ?? 'N/A'} / 0.0)
      </div>
      <div>&nbsp;</div>
      <div>Biome: {biome}</div>
      <div>
        Light: {lightLevel} ({lightLevel} sky, 0 block)
      </div>
      <div>
        Local Difficulty: {localDifficulty} // 0.00 (Day {dayCount})
      </div>
      <div>&nbsp;</div>
      <div>
        Location: {currentLocation.latitude.toFixed(5)},{' '}
        {currentLocation.longitude.toFixed(5)}
      </div>
      <div>Precision: ±{currentLocation.accuracy.toFixed(1)}m</div>
      <div>Speed: {currentLocation.speed?.toFixed(2) ?? '0.00'} m/s</div>
      <div>&nbsp;</div>
      <div>Display: {screenWidth}x{screenHeight} (Undefined)</div>
      <div>CPU: {hardwareConcurrency}x Unknown</div>
      <div>&nbsp;</div>
      <div>Debug: Pie [shift]: hidden FPS + TPS: hidden</div>
      <div>For help: press F3 + Q</div>
    </div>
  );
}
