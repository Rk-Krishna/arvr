import { create } from 'zustand';

interface RehabState {
  score: number;
  objectsGrabbed: number;
  sessionDuration: number;
  incrementScore: () => void;
  incrementObjectsGrabbed: () => void;
  setSessionDuration: (duration: number) => void;
}

export const useRehabStore = create<RehabState>((set) => ({
  score: 0,
  objectsGrabbed: 0,
  sessionDuration: 0,
  incrementScore: () => set((state) => ({ score: state.score + 10 })),
  incrementObjectsGrabbed: () => set((state) => ({ objectsGrabbed: state.objectsGrabbed + 1 })),
  setSessionDuration: (duration) => set({ sessionDuration }),
}));