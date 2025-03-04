import { useRef, useEffect } from "react";
import { Sphere, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Waypoint {
  position: THREE.Vector3;
  reached: boolean;
}

interface MemorySceneProps {
  phase: "show" | "hide" | "test";
  waypoints: Waypoint[];
  onTimeUp: () => void;
  onMove: (playerPosition: THREE.Vector3, direction: "up" | "down" | "left" | "right") => THREE.Vector3 | null;
  playerPosition: THREE.Vector3;
  waypointsVisible: boolean; // New prop for visibility
}

export function MemoryScene({ phase, waypoints, onTimeUp, onMove, playerPosition, waypointsVisible }: MemorySceneProps) {
  const playerRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (playerRef.current) {
      playerRef.current.position.copy(playerPosition);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "show") {
        onTimeUp(); // Trigger startTest after 10s
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [phase, onTimeUp]);

  // Arrow key handling (example, adjust based on your input method)
  const handleKeyDown = (event: KeyboardEvent) => {
    if (phase !== "test") return; // Only allow movement in test phase
    let direction: "up" | "down" | "left" | "right" | undefined;
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
    if (direction) {
      const newPos = onMove(playerPosition, direction);
      if (newPos) {
        playerRef.current?.position.copy(newPos);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, playerPosition, onMove]);

  return (
    <group>
      {/* Score Display */}
      <Text position={[0, 3, -4]} fontSize={0.5} color="#FF0000">
        Memory Test
      </Text>

      {/* Grid */}
      <gridHelper args={[10, 10]} />

      {/* Waypoints */}
      {waypoints.map((waypoint, index) => (
        <Sphere
          key={index}
          position={waypoint.position.toArray()}
          args={[0.2, 16, 16]}
          visible={waypointsVisible} // Use waypointsVisible instead of phase
        >
          <meshStandardMaterial color={waypoint.reached ? "#4CAF50" : "#2196F3"} />
        </Sphere>
      ))}

      {/* Player Ball */}
      <Sphere ref={playerRef} position={playerPosition.toArray()} args={[0.3, 16, 16]}>
        <meshStandardMaterial color="#FF4081" />
      </Sphere>
    </group>
  );
}