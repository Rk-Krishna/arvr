import { Box } from '@react-three/drei';

export function Room() {
  return (
    <group>
      {/* Walls */}
      <Box args={[10, 6, 0.2]} position={[0, 3, -5]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      <Box args={[10, 6, 0.2]} position={[0, 3, 5]}>
        <meshStandardMaterial color="#e0e0e0" />
      </Box>
      <Box args={[0.2, 6, 10]} position={[5, 3, 0]}>
        <meshStandardMaterial color="#d0d0d0" />
      </Box>
      <Box args={[0.2, 6, 10]} position={[-5, 3, 0]}>
        <meshStandardMaterial color="#d0d0d0" />
      </Box>
      
      {/* Floor */}
      <Box args={[10, 0.2, 10]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#4a9eff" />
      </Box>
      
      {/* Ceiling */}
      <Box args={[10, 0.2, 10]} position={[0, 6, 0]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Box>
    </group>
  );
}