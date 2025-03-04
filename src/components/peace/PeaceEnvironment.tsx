import { useEffect, useState } from 'react';
import { Sky, Cloud } from '@react-three/drei';
import { Water } from './WaterMaterial';

export function PeaceEnvironment() {
  const [audio] = useState(() => {
    const audio = new Audio();
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2171/2171-preview.mp3';
    return audio;
  });
  
  const [birdAudio] = useState(() => {
    const audio = new Audio();
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2685/2685-preview.mp3';
    return audio;
  });
  
  useEffect(() => {
    // Loop ambient sounds
    audio.loop = true;
    birdAudio.loop = true;
    
    // Set volumes
    audio.volume = 0.3;
    birdAudio.volume = 0.2;
    
    // Play sounds
    const playAudio = () => {
      audio.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Audio playback requires user interaction');
      });
      birdAudio.play().catch(() => {
        console.log('Bird audio playback requires user interaction');
      });
    };

    // Add click listener to handle autoplay restrictions
    window.addEventListener('click', playAudio, { once: true });
    
    return () => {
      audio.pause();
      birdAudio.pause();
      window.removeEventListener('click', playAudio);
    };
  }, [audio, birdAudio]);

  return (
    <group>
      {/* Sky and sun */}
      <Sky 
        distance={450000} 
        sunPosition={[0, 1, 0]} 
        inclination={0.6} 
        azimuth={0.1} 
      />

      {/* Ocean */}
      <Water />

      {/* Sand */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.2, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f2d2a9" />
      </mesh>

      {/* Decorative clouds */}
      <Cloud 
        opacity={0.5}
        speed={0.4} 
        width={10} 
        depth={1.5} 
        segments={20}
        position={[-4, 15, -10]}
      />
      <Cloud 
        opacity={0.5}
        speed={0.4} 
        width={10} 
        depth={1.5} 
        segments={20}
        position={[4, 12, -10]}
      />
    </group>
  );
}