import { Box, Cylinder } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Component to create a tiled floor
const TileGrid = () => {
  const tileSize = 1; // Each tile is 1x1 in size
  const gridSize = 10; // 10x10 grid

  const tiles = [];
  for (let x = -gridSize / 2 + tileSize / 2; x < gridSize / 2; x += tileSize) {
    for (let z = -gridSize / 2 + tileSize / 2; z < gridSize / 2; z += tileSize) {
      tiles.push(
        <Box key={`${x}-${z}`} args={[tileSize, 0.2, tileSize]} position={[x, 0, z]}>
          <meshStandardMaterial color={((x + z) % 2 === 0) ? "#5a8f4d" : "#3f6d3a"} roughness={0.4} />
        </Box>
      );
    }
  }

  return <>{tiles}</>;
};

export function Room() {
  const fanRef = useRef();

  useFrame(() => {
    if (fanRef.current) {
      fanRef.current.rotation.y += 0.1;
    }
  });

  return (
    <group>
      {/* Walls */}
      <Box args={[10, 6, 0.2]} position={[0, 3, -5]}>
        <meshStandardMaterial color="#595959" roughness={0.7} />
      </Box>
      <Box args={[0.2, 6, 10]} position={[5, 3, 0]}>
        <meshStandardMaterial color="#3c3c3c" roughness={0.7} />
      </Box>
      <Box args={[0.2, 6, 10]} position={[-5, 3, 0]}>
        <meshStandardMaterial color="#3c3c3c" roughness={0.7} />
      </Box>

      {/* Ceiling */}
      <Box args={[10, 0.2, 10]} position={[0, 6, 0]}>
        <meshStandardMaterial color="#dcdcdc" roughness={0.9} />
      </Box>

      {/* Ceiling Fan */}
      <group position={[0, 5.8, 0]} ref={fanRef}>
        <Cylinder args={[0.1, 0.1, 0.3, 32]}>
          <meshStandardMaterial color="black" />
        </Cylinder>
        <Box args={[2, 0.1, 0.2]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="black" />
        </Box>
        <Box args={[0.2, 0.1, 2]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="black" />
        </Box>
      </group>

      {/* Tiled Green Turf Floor */}
      <TileGrid />

      {/* Golf Simulator Screen */}
      <Box args={[3, 2, 0.1]} position={[-3, 3, -4.9]}>
        <meshStandardMaterial color="white" />
      </Box>

      {/* Putting Holes */}
      <Cylinder args={[0.05, 0.05, 0.1, 32]} position={[1, 0.1, -1]}>
        <meshStandardMaterial color="black" />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.1, 32]} position={[-1, 0.1, 2]}>
        <meshStandardMaterial color="black" />
      </Cylinder>

      {/* Cabinets */}
      <Box args={[4, 2, 0.5]} position={[4, 1, -3]}>
        <meshStandardMaterial color="#2e2e2e" />
      </Box>

      {/* Wall Frames */}
      <Box args={[0.8, 0.6, 0.05]} position={[2.5, 4, -4.9]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      <Box args={[0.8, 0.6, 0.05]} position={[2.5, 3, -4.9]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* Chair and Table */}
      {/* Table */}
      <Box args={[1.5, 0.1, 1]} position={[-4, 1, -4]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      {/* Table Legs */}
      <Box args={[0.1, 1, 0.1]} position={[-4.7, 0.5, -4.3]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      <Box args={[0.1, 1, 0.1]} position={[-3.3, 0.5, -4.3]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      <Box args={[0.1, 1, 0.1]} position={[-4.7, 0.5, -3.7]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      <Box args={[0.1, 1, 0.1]} position={[-3.3, 0.5, -3.7]}>
        <meshStandardMaterial color="#654321" />
      </Box>
      
      {/* Chair */}
      <Box args={[0.6, 0.1, 0.6]} position={[-3.8, 0.5, -4]}>
        <meshStandardMaterial color="#8b0000" />
      </Box>
      <Box args={[0.1, 0.5, 0.1]} position={[-4, 0.25, -4.2]}>
        <meshStandardMaterial color="#8b0000" />
      </Box>
      <Box args={[0.1, 0.5, 0.1]} position={[-3.6, 0.25, -4.2]}>
        <meshStandardMaterial color="#8b0000" />
      </Box>
      <Box args={[0.1, 0.5, 0.1]} position={[-4, 0.25, -3.8]}>
        <meshStandardMaterial color="#8b0000" />
      </Box>
      <Box args={[0.1, 0.5, 0.1]} position={[-3.6, 0.25, -3.8]}>
        <meshStandardMaterial color="#8b0000" />
      </Box>
      <Box args={[0.6, 0.6, 0.1]} position={[-3.8, 0.8, -4.3]}>
        <meshStandardMaterial color="#8b0000" />
      </Box>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={1.5} />
    </group>
  );
}
