import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { Environment, OrbitControls } from '@react-three/drei';
import { RehabEnvironment } from './RehabEnvironment';
import { Stats } from './Stats';

export function VRScene() {
  return (
    <>
      <VRButton />
      <Stats />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <RehabEnvironment />
          <Environment preset="sunset" />
          <OrbitControls />
        </XR>
      </Canvas>
    </>
  );
}