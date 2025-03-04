import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

export function PeaceSpace() {
  const [videoSource, setVideoSource] = useState(0);
  const scenes = [
    {
      video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
      title: 'Gentle Waves',
      description: 'Calming beach waves at sunset',
      audio: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_1c9d6b1c1e.mp3?filename=ocean-waves-112303.mp3'
    },
    {
      video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-beach-waves-hitting-the-shore-4117-large.mp4',
      title: 'Ocean Vista',
      description: 'Aerial view of serene coastline',
      audio: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3?filename=waves-and-seagulls-121744.mp3'
    },
    {
      video: 'https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4',
      title: 'Tropical Paradise',
      description: 'Palm trees swaying in the breeze',
      audio: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_dc39bde808.mp3?filename=beach-waves-loop-123836.mp3'
    }
  ];

  const [audioVolume, setAudioVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  useEffect(() => {
    // Configure audio
    audio.loop = true;
    audio.volume = audioVolume;
    
    // Cleanup on component unmount
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    // Handle scene changes
    audio.src = scenes[videoSource].audio;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [videoSource, scenes]);

  useEffect(() => {
    // Handle volume changes
    audio.volume = audioVolume;
  }, [audioVolume, audio]);

  useEffect(() => {
    // Handle play/pause
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const toggleAudio = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audio.play().catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  return (
    <div className="h-screen bg-black">
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 bg-white/80 p-2 rounded-lg hover:bg-white/90 transition-all"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="absolute top-4 right-4 z-20 bg-white/90 p-6 rounded-lg shadow-lg space-y-6 max-w-xs w-full">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{scenes[videoSource].title}</h2>
          <p className="text-gray-600 text-sm">{scenes[videoSource].description}</p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Sound Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={audioVolume}
            onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="space-y-3">
          <button
            onClick={toggleAudio}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isPlaying ? 'Pause Sounds' : 'Play Sounds'}
          </button>
          <button
            onClick={() => setVideoSource((prev) => (prev + 1) % scenes.length)}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Change Scene
          </button>
        </div>
      </div>

      <div className="relative h-full">
        <video
          key={scenes[videoSource].video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={scenes[videoSource].video}
        />
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
          <p className="text-2xl font-light mb-6">Take a deep breath...</p>
          <div className="w-4 h-4 bg-white/50 rounded-full animate-ping mx-auto" />
        </div>
      </div>
    </div>
  );
}