import { useState, useCallback } from 'react';
import { Target } from './Target';
import { useRehabStore } from '../../store/useRehabStore';

interface TargetData {
  position: [number, number, number];
  grabbed: boolean;
  id: number;
}

export function TargetSystem() {
  const { incrementScore, incrementObjectsGrabbed } = useRehabStore();

  const generateTargets = useCallback((): TargetData[] => {
    return Array.from({ length: 10 }, (_, i) => ({
      position: [
        Math.random() * 8 - 4, 
        1 + Math.random() * 4, 
        Math.random() * 8 - 4  
      ],
      grabbed: false,
      id: i
    }));
  }, []);

  const [targets, setTargets] = useState<TargetData[]>(generateTargets());

  const handleGrab = (id: number) => {
    setTargets(prev => {
      const newTargets = prev.map(target => 
        target.id === id ? { ...target, grabbed: true } : target
      );
      
      if (newTargets.every(target => target.grabbed)) {
        return generateTargets();
      }
      
      return newTargets;
    });
    
    incrementScore();
    incrementObjectsGrabbed();
  };

  return (
    <>
      {targets.map((target) => 
        !target.grabbed && (
          <Target
            key={target.id}
            position={target.position}
            onGrab={() => handleGrab(target.id)}
          />
        )
      )}
    </>
  );
}