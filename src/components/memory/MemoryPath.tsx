import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface Waypoint {
  position: [number, number, number];
  reached: boolean;
  visible: boolean;
}

export function MemoryPath() {
  const [phase, setPhase] = useState<"show" | "hide" | "test">("show");
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { position: [2, 0.1, 2], reached: false, visible: true },
    { position: [-2, 0.1, -1], reached: false, visible: true },
    { position: [1, 0.1, -2], reached: false, visible: true },
  ]);
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const playerRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.5, 0));
  const [score, setScore] = useState(0);

  useEffect(() => {
    let showTimer: number;
    let hideTimer: number;

    if (phase === "show") {
      showTimer = setTimeout(() => {
        setWaypoints((prevWaypoints) =>
          prevWaypoints.map((wp) => ({ ...wp, visible: false }))
        );
        setPhase("hide");
        hideTimer = setTimeout(() => {
          setPhase("test");
        }, 3000);
      }, 10000);
    }

    return () => {
      if (showTimer) clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [phase]);

  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    if (phase !== "test") return;

    const moveSpeed = 1;
    const newPos = new THREE.Vector3().copy(playerRef.current);

    switch (direction) {
      case "up":
        newPos.z -= moveSpeed;
        break;
      case "down":
        newPos.z += moveSpeed;
        break;
      case "left":
        newPos.x -= moveSpeed;
        break;
      case "right":
        newPos.x += moveSpeed;
        break;
    }

    // Ensure player doesn't move out of bounds
    if (Math.abs(newPos.x) > 4 || Math.abs(newPos.z) > 4) return;

    playerRef.current.copy(newPos);

    if (currentWaypoint < waypoints.length) {
      const target = new THREE.Vector3(...waypoints[currentWaypoint].position);
      if (newPos.distanceTo(target) < 0.5) {
        setScore((prev) => prev + 10);
        setWaypoints((prev) =>
          prev.map((wp, index) =>
            index === currentWaypoint ? { ...wp, reached: true } : wp
          )
        );
        setCurrentWaypoint((prev) => prev + 1);
      }
    }
  };

  return {
    handleMove,
    phase,
    waypoints,
    playerPosition: playerRef.current,
    score,
  };
}