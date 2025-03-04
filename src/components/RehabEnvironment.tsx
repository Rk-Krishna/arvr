import { Text } from '@react-three/drei';
import { Room } from './environment/Room';
import { TargetSystem } from './targets/TargetSystem';
import { Lighting } from './lighting/Lighting';

export function RehabEnvironment() {
  return (
    <group>
      <Room />
      <TargetSystem />
      <Lighting />
      
      {/* Instructions */}
      <Text
        position={[0, 2, -4]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        Navigate the room and click the floating spheres!
      </Text>
    </group>
  );
}