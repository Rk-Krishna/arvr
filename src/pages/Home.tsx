import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, HandMetal, Map, Heart } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Rehabilitation Exercises
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/motor')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <HandMetal className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
              <h2 className="text-2xl font-semibold text-gray-800">Motor Skills</h2>
            </div>
            <p className="text-gray-600">
              Improve hand-eye coordination by interacting with virtual objects in a 3D space.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Workflow: Select objects → Grab objects → Track progress → Complete session
            </div>
          </button>

          <button
            onClick={() => navigate('/memory')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <Map className="w-8 h-8 text-green-600 group-hover:text-green-700" />
              <h2 className="text-2xl font-semibold text-gray-800">Memory Path</h2>
            </div>
            <p className="text-gray-600">
              Remember and recreate paths through a virtual environment to enhance spatial memory.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Workflow: Observe path → Memorize sequence → Navigate path → Complete challenge
            </div>
          </button>

          <button
            onClick={() => navigate('/peace')}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-8 h-8 text-purple-600 group-hover:text-purple-700" />
              <h2 className="text-2xl font-semibold text-gray-800">Peace Space</h2>
            </div>
            <p className="text-gray-600">
              A calming environment for meditation and relaxation exercises.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Workflow: Choose environment → Select duration → Practice breathing → Complete session
            </div>
          </button>
        </div>

        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg">
            <Brain className="w-5 h-5" />
            <span>Track your progress across exercises</span>
          </div>
          
          <div className="text-gray-600 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-2">Complete Workflow:</h3>
            <ol className="text-left list-decimal list-inside space-y-2">
              <li>Select exercise type (Motor Skills, Memory Path, or Peace Space)</li>
              <li>Complete exercise-specific workflow</li>
              <li>Track progress and performance metrics</li>
              <li>Review session summary</li>
              <li>Return to home or continue with another exercise</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}