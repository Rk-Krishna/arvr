import { useRef, useEffect, useState } from "react";
import { Text, Plane, Box, Cylinder, Sphere } from "@react-three/drei";
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
  waypointsVisible: boolean;
}

export function MemoryScene({ phase, waypoints, onTimeUp, onMove, playerPosition, waypointsVisible }: MemorySceneProps) {
  const playerRef = useRef<THREE.Group>(null);
  const [visibleWaypoints, setVisibleWaypoints] = useState(waypointsVisible);
  const [timer, setTimer] = useState(10);

  useFrame(() => {
    if (playerRef.current) {
      playerRef.current.position.copy(playerPosition);
    }
  });

  useEffect(() => {
    if (phase === "show") {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const timerOut = setTimeout(() => {
        setVisibleWaypoints(false);
        onTimeUp();
        clearInterval(countdown);
      }, 10000);

      return () => {
        clearTimeout(timerOut);
        clearInterval(countdown);
      };
    }
  }, [phase, onTimeUp]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (phase !== "test") return;
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
      <Text position={[0, 5, -4]} fontSize={0.5} color="#FF0000">
        Memory Test - {timer}s
      </Text>

      {/* Floor (Park Path) */}
      <Plane args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#A0522D" />
      </Plane>

      {/* Paths */}
      {[[-3, 0.01, -3], [0, 0.01, -3], [3, 0.01, -3], [-3, 0.01, 0], [0, 0.01, 0], [3, 0.01, 0], [-3, 0.01, 3], [0, 0.01, 3], [3, 0.01, 3]].map(([x, y, z], index) => (
        <Plane key={index} args={[2, 1]} rotation={[-Math.PI / 2, 0, 0]} position={[x, y, z]}>
          <meshStandardMaterial color="#D2B48C" />
        </Plane>
      ))}

      {/* Trees (Smaller and Positioned Further) */}
      {[
        [-5, 0, -5], [4, 0, -4], [-4, 0, 3], [5, 0, 4],
        [-3, 0, 2], [2, 0, -2], [-1, 0, -4], [3, 0, 3],
      ].map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <Cylinder args={[0.15, 0.15, 0.8, 8]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Cylinder>
          <Sphere args={[0.6, 16, 16]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#228B22" />
          </Sphere>
        </group>
      ))}

      {/* Waypoints */}
      {waypoints.map((waypoint, index) => (
        <Box
          key={index}
          position={waypoint.position.toArray()}
          args={[0.3, 0.3, 0.3]}
          visible={visibleWaypoints}
        >
          <meshStandardMaterial color={waypoint.reached ? "#4CAF50" : "#2196F3"} />
        </Box>
      ))}

      {/* Player Character */}
      <group ref={playerRef} position={playerPosition.toArray()}>
        <Cylinder args={[0.25, 0.25, 0.8, 8]}>
          <meshStandardMaterial color="#FF4081" />
        </Cylinder>
        <Sphere args={[0.3, 16, 16]} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#FFD700" />
        </Sphere>
      </group>
    </group>
  );
}
