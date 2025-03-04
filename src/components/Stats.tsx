import { useRehabStore } from '../store/useRehabStore';

export function Stats() {
  const score = useRehabStore((state) => state.score);
  const objectsGrabbed = useRehabStore((state) => state.objectsGrabbed);

  return (
    <div className="fixed top-4 left-4 bg-white/80 p-4 rounded-lg shadow-lg z-10">
      <h2 className="text-xl font-bold mb-2">Rehabilitation Progress</h2>
      <div className="space-y-2">
        <p>Score: {score}</p>
        <p>Objects Grabbed: {objectsGrabbed}</p>
      </div>
    </div>
  );
}