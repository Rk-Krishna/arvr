import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MotorExercise } from './pages/MotorExercise';
import { MemoryExercise } from './pages/MemoryExercise';
import { PeaceSpace } from './pages/PeaceSpace';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/motor" element={<MotorExercise />} />
      <Route path="/memory" element={<MemoryExercise />} />
      <Route path="/peace" element={<PeaceSpace />} />
    </Routes>
  );
}