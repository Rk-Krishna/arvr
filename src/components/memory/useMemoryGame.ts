import { useState } from 'react';
import * as THREE from 'three';
import { useRehabStore } from '../../store/useRehabStore';

interface Waypoint {
  position: [number, number, number];
  reached: boolean;
}

export function useMemoryGame() {
  const [phase, setPhase] = useState<'show' | 'hide' | 'test'>('show');
  const [waypoints] = useState<Waypoint[]>([
    { position: [2, 0.1, 2], reached: false },
    { position: [-2, 0.1, -1], reached: false },
    { position: [1, 0.1, -2], reached: false },
  ]);
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [waypointsVisible, setWaypointsVisible] = useState(true); // New state for visibility
  const { incrementScore } = useRehabStore();

  const handleMove = (playerPosition: THREE.Vector3, direction: 'up' | 'down' | 'left' | 'right') => {
    if (phase !== 'test') return null;
    
    const moveSpeed = 0.5;
    const newPos = new THREE.Vector3().copy(playerPosition);

    switch (direction) {
      case 'up':
        newPos.z -= moveSpeed;
        break;
      case 'down':
        newPos.z += moveSpeed;
        break;
      case 'left':
        newPos.x -= moveSpeed;
        break;
      case 'right':
        newPos.x += moveSpeed;
        break;
    }

    // Check boundaries
    if (Math.abs(newPos.x) > 4 || Math.abs(newPos.z) > 4) return null;

    // Check if reached current waypoint
    if (currentWaypoint < waypoints.length) {
      const distance = newPos.distanceTo(
        new THREE.Vector3(...waypoints[currentWaypoint].position)
      );

      if (distance < 0.5) {
        waypoints[currentWaypoint].reached = true;
        incrementScore();

        if (currentWaypoint < waypoints.length - 1) {
          setCurrentWaypoint(prev => prev + 1);
        }
      }
    }

    return newPos;
  };

  const startTest = () => {
    setWaypointsVisible(false); // Hide waypoints after 10s
    setPhase('hide');
    setTimeout(() => setPhase('test'), 3000); // Enable arrows after 3s delay
  };

  return {
    phase,
    waypoints,
    handleMove,
    startTest,
    waypointsVisible, // Expose visibility state
  };
}