import { useState, useEffect, useRef } from 'react';
import { Video } from '@/types/video';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ShortsViewerProps {
  shorts: Video[];
  onToggleFavorite: (videoId: string) => void;
  favorites: string[];
}

export default function ShortsViewer({ shorts, onToggleFavorite, favorites }: ShortsViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const currentShort = shorts[currentIndex];
  const isFavorite = favorites.includes(currentShort.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, shorts.length, isPlaying]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < shorts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < shorts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="relative h-full flex items-center justify-center">
        <div className="relative w-full max-w-md h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon 
              name={isPlaying ? "Play" : "Pause"} 
              size={120} 
              className="text-white/20"
            />
          </div>

          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                <Icon name="User" size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">{currentShort.channel}</p>
                <p className="text-white/80 text-sm">{currentShort.views}</p>
              </div>
              <Button 
                size="sm" 
                className="ml-auto bg-white text-black hover:bg-white/90"
              >
                Подписаться
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white font-medium mb-2">{currentShort.title}</p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Icon name="Clock" size={16} />
              <span>{currentShort.duration}</span>
            </div>
          </div>

          <div className="absolute right-4 bottom-24 flex flex-col gap-6">
            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => onToggleFavorite(currentShort.id)}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon 
                  name={isFavorite ? "Heart" : "Heart"} 
                  size={24} 
                  className={isFavorite ? "text-red-500 fill-red-500" : "text-white"}
                />
              </div>
              <span className="text-white text-xs font-semibold">125K</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">834</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name="Share2" size={24} className="text-white" />
              </div>
              <span className="text-white text-xs font-semibold">Поделиться</span>
            </button>

            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => setIsMuted(!isMuted)}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name={isMuted ? "VolumeX" : "Volume2"} size={24} className="text-white" />
              </div>
            </button>

            <button 
              className="flex flex-col items-center gap-1"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name={isPlaying ? "Pause" : "Play"} size={24} className="text-white" />
              </div>
            </button>
          </div>

          {currentIndex > 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="text-white/50 text-sm flex items-center gap-2">
                <Icon name="ChevronUp" size={20} />
                <span>Листайте вверх</span>
              </div>
            </div>
          )}

          {currentIndex < shorts.length - 1 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="text-white/50 text-sm flex items-center gap-2">
                <Icon name="ChevronDown" size={20} />
                <span>Листайте вниз</span>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4">
            <div className="text-white/60 text-sm bg-black/40 px-3 py-1 rounded-full">
              {currentIndex + 1} / {shorts.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
