export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow 
      />
      <pointLight
        position={[0, 4, 0]}
        intensity={0.5}
        color="#ffffff"
      />
      <spotLight
        position={[0, 5, 0]}
        angle={Math.PI / 4}
        penumbra={0.1}
        intensity={0.6}
        castShadow
      />
    </>
  );
}