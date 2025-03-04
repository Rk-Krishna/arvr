import React from 'react';
import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create the water material
const WaterMaterialImpl = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 0.412, 0.58),
  },
  // vertex shader
  `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      float elevation = sin(modelPosition.x * 1.5 + uTime) * 
                       sin(modelPosition.z * 1.5 + uTime) * 0.2;
      
      modelPosition.y += elevation;
      
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
      
      vUv = uv;
      vElevation = elevation;
    }
  `,
  // fragment shader
  `
    uniform vec3 uColor;
    varying float vElevation;
    
    void main() {
      vec3 color = uColor;
      color += vElevation * 0.2;
      gl_FragColor = vec4(color, 0.8);
    }
  `
);

// Extend Three.js with our custom material
extend({ WaterMaterialImpl });

// Create a component that uses the material
export function Water() {
  const materialRef = React.useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[100, 100, 100, 100]} />
      <waterMaterialImpl ref={materialRef} transparent />
    </mesh>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterMaterialImpl: any;
    }
  }
}