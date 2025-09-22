import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface Props {
  assetBase?: string; // e.g. /Articulos/.../Ejercicio-mindfulness
}

const MindfulnessExercise: React.FC<Props> = ({ assetBase }) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Audio state
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (isPlaying) {
        // Stop playback
        if (backgroundMusicRef.current) {
          backgroundMusicRef.current.pause();
          backgroundMusicRef.current.currentTime = 0;
        }
        setIsPlaying(false);
      } else {
        // Start playback
        const audioSrc = assetBase
          ? `${assetBase}/mindfulnessaudio.mp3`
          : '/mindfulnessaudio.mp3';
        backgroundMusicRef.current = new Audio(audioSrc);
        await backgroundMusicRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-lg w-full">
        <img 
          src={assetBase ? `${assetBase}/logo.png` : '/images/banner.png'} 
          alt="Logo" 
          className="w-full max-w-md mx-auto mb-8"
        />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {language === 'es' ? 'Ejercicio Guiado de Mindfulness' : 'Guided Mindfulness Exercise'}
        </h1>
        
        <p className="text-gray-600 mb-8 text-center">
          {language === 'es'
            ? 'Busca un lugar tranquilo y regálate un momento. Haz clic en el botón para escuchar y comenzar el ejercicio - Duración: 2min 30 seg.'
            : 'Find a quiet place and gift yourself a moment. Click the button to listen and start the exercise — Duration: 2m 30s.'}
        </p>
        
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-white
            flex items-center justify-center gap-3 transition-all
            ${isPlaying 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}
            disabled:opacity-50
          `}
        >
          <span>{isLoading ? (language==='es'?'Cargando...':'Loading...') : isPlaying ? (language==='es'?'Pausar':'Pause') : (language==='es'?'Reproducir':'Play')}</span>
          {isLoading && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </button>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <a
          href="/"
          className="mt-8 block text-center py-3 text-green-600 hover:text-green-700 transition-colors"
        >
          {language==='es'?'Volver a la Lista de Contenidos':'Back to Contents'}
        </a>
      </div>
    </div>
  );
};

export default MindfulnessExercise;
