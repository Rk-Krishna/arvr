import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { RehabEnvironment } from './RehabEnvironment';
import { Stats } from './Stats';

export function Scene() {
  return (
    <>
      <Stats />
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
        <RehabEnvironment />
        <Environment preset="sunset" />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI - 0.5}
          minPolarAngle={0.2}
          minDistance={2}
          maxDistance={8}
          target={[0, 2, 0]}
        />
      </Canvas>
    </>
  );
}