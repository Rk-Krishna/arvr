import React, { useRef } from 'react';
import { shaderMaterial, Sky, Cloud } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Water Shader Material
const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorDeep: new THREE.Color(0.0, 0.3, 0.6), // Deeper ocean color
    uColorShallow: new THREE.Color(0.5, 0.8, 0.9), // Shallow beach color
    uFoamColor: new THREE.Color(1.0, 1.0, 1.0), // Foam color
  },
  
  // Vertex Shader
  `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      float frequency = 1.5;
      float amplitude = 0.15;
      
      float elevation = sin(modelPosition.x * frequency + uTime) * 
                        sin(modelPosition.z * frequency + uTime) * amplitude;
      
      modelPosition.y += elevation;
      
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
      
      vUv = uv;
      vElevation = elevation;
    }
  `,
  
  // Fragment Shader
  `
    uniform vec3 uColorDeep;
    uniform vec3 uColorShallow;
    uniform vec3 uFoamColor;
    varying float vElevation;
    varying vec2 vUv;
    
    void main() {
      float mixFactor = smoothstep(-0.1, 0.1, vElevation);
      vec3 color = mix(uColorShallow, uColorDeep, mixFactor);
      
      // Adding foam effect near the crest of waves
      if (vElevation > 0.12) {
        color = mix(color, uFoamColor, 0.6);
      }
      
      gl_FragColor = vec4(color, 0.85);
    }
  `
);

extend({ WaterMaterial });

export function Water() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[100, 100, 200, 200]} />
      <waterMaterial ref={materialRef} transparent />
    </mesh>
  );
}

// Extend JSX for custom shader
declare global {
  namespace JSX {
    interface IntrinsicElements {
      waterMaterial: any;
    }
  }
}

export function PeaceEnvironment() {
  return (
    <group>
      {/* Sky with soft sunset colors */}
      <Sky 
        distance={450000} 
        sunPosition={[0, 1, 0]} 
        inclination={0.5} 
        azimuth={0.25} 
        turbidity={8} 
        rayleigh={2} 
        mieCoefficient={0.005} 
        mieDirectionalG={0.8}
      />

      {/* Ocean */}
      <Water />

      {/* Sand with slight bump effect */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial color="#f2d2a9" roughness={0.8} metalness={0} />
      </mesh>

      {/* Decorative clouds for dreamy effect */}
      <Cloud opacity={0.6} speed={0.2} position={[-8, 18, -12]} />
      <Cloud opacity={0.6} speed={0.2} position={[6, 16, -14]} />
      <Cloud opacity={0.5} speed={0.2} position={[0, 14, -10]} />

      {/* Palm Trees or Rocks for a tropical feel (Placeholder) */}
      <mesh position={[-10, 0, -5]}>
        <cylinderGeometry args={[0.5, 0.8, 5, 6]} />
        <meshStandardMaterial color="#8B5A2B" />
      </mesh>
      <mesh position={[-10, 3, -5]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      <mesh position={[10, 0, -5]}>
        <cylinderGeometry args={[0.5, 0.8, 5, 6]} />
        <meshStandardMaterial color="#8B5A2B" />
      </mesh>
      <mesh position={[10, 3, -5]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}
