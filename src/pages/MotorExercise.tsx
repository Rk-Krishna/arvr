import React from 'react';
import { Scene } from '../components/Scene';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MotorExercise() {
  return (
    <div className="h-screen">
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 bg-white/80 p-2 rounded-lg hover:bg-white/90 transition-all"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <Scene />
    </div>
  );
}