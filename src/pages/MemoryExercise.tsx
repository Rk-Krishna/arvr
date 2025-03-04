import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { MemoryScene } from "../components/memory/MemoryScene";
import { useMemoryGame } from "../components/memory/useMemoryGame";
import * as THREE from "three";

// Define the Waypoint type explicitly
type Waypoint = {
  position: THREE.Vector3;
  reached: boolean; // Ensure this is a THREE.Vector3, not an array
};

export function MemoryExercise() {
  const { phase, waypoints: rawWaypoints, handleMove, startTest } = useMemoryGame();
  const [showPath, setShowPath] = useState(true);
  const [score, setScore] = useState(0);
  const [visitedWaypoints, setVisitedWaypoints] = useState<Set<number>>(new Set());
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0.5, 0)); // ✅ Player Position State

  // Convert waypoints to THREE.Vector3
  const waypoints: Waypoint[] = rawWaypoints.map((wp) => ({
    position: new THREE.Vector3(wp.position[0], wp.position[1], wp.position[2]),
    reached: false, // ✅ Default value for new waypoints
  }));

  useEffect(() => {
    const timer = setTimeout(() => setShowPath(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (direction: "up" | "down" | "left" | "right") => {
    if (phase !== "test") return;

    let movementVector = new THREE.Vector3();
    switch (direction) {
      case "up":
        movementVector.set(0, 0, -1);
        break;
      case "down":
        movementVector.set(0, 0, 1);
        break;
      case "left":
        movementVector.set(-1, 0, 0);
        break;
      case "right":
        movementVector.set(1, 0, 0);
        break;
    }

    const newPlayerPosition = handleMove(playerPosition, direction); // ✅ Use playerPosition
    if (!newPlayerPosition) return;

    setPlayerPosition(newPlayerPosition); // ✅ Update state to move player

    waypoints.forEach((waypoint, index) => {
      if (!visitedWaypoints.has(index)) {
        if (newPlayerPosition.distanceTo(waypoint.position) < 0.5) {
          setScore((prev) => prev + 10);
          setVisitedWaypoints((prev) => new Set(prev).add(index));
        }
      }
    });
  };

  return (
    <div className="h-screen relative">
      {/* Score Display */}
      <div className="absolute top-4 right-4 z-20 bg-white/80 p-2 rounded-lg shadow-md">
        <span className="text-lg font-bold">Score: {score}</span>
      </div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 bg-white/80 p-2 rounded-lg hover:bg-white/90 transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/80 p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-2">
          <div />
          <button 
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={() => handleKeyPress("up")}
            disabled={phase !== "test"}
          >
            <ArrowUp className="w-6 h-6" />
          </button>
          <div />
          <button 
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={() => handleKeyPress("left")}
            disabled={phase !== "test"}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={() => handleKeyPress("down")}
            disabled={phase !== "test"}
          >
            <ArrowDown className="w-6 h-6" />
          </button>
          <button 
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={() => handleKeyPress("right")}
            disabled={phase !== "test"}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
        <MemoryScene
  phase={phase}
  waypoints={waypoints}
  onTimeUp={startTest}
  onMove={handleMove}
  showPath={showPath}
  playerPosition={playerPosition}  // ✅ Pass playerPosition
/>

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
