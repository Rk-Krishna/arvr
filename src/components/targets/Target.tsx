import { useRef, useState } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TargetProps {
  position: [number, number, number];
  onGrab: () => void;
}

export function Target({ position, onGrab }: TargetProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere
      ref={sphereRef}
      position={position}
      args={[0.2, 32, 32]}
      onClick={onGrab}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <meshStandardMaterial
        color={hover ? "#ff6b6b" : "#ff4a4a"}
        emissive="#ff4a4a"
        emissiveIntensity={hover ? 0.5 : 0.2}
        metalness={0.5}
        roughness={0.2}
      />
    </Sphere>
  );
}