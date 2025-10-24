import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import VideoSettings from '@/components/VideoSettings';
import { useState, useEffect, useRef } from 'react';
import VideoCard from '@/components/VideoCard';

interface VideoPlayerProps {
  isPlaying: boolean;
  selectedVideo: Video | null;
  videoPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  showControls: boolean;
  seekIndicator: { show: boolean; direction: 'forward' | 'backward' };
  quality: string;
  playbackSpeed: number;
  showVideoSettings: boolean;
  onClose: () => void;
  onTogglePlayPause: () => void;
  onToggleMute: () => void;
  onVolumeChange: (value: number[]) => void;
  onProgressChange: (value: number[]) => void;
  onMouseMove: () => void;
  formatTime: (seconds: number) => string;
  onToggleVideoSettings: () => void;
  onQualityChange: (quality: string) => void;
  onSpeedChange: (speed: number) => void;
  relatedVideos?: Video[];
  favorites?: string[];
  onToggleFavorite?: (videoId: string) => void;
  onVideoSelect?: (video: Video) => void;
  subscriptions?: string[];
  onToggleSubscription?: (channelId: string) => void;
}

export default function VideoPlayer({
  isPlaying,
  selectedVideo,
  videoPlaying,
  volume,
  currentTime,
  duration,
  isMuted,
  showControls,
  seekIndicator,
  quality,
  playbackSpeed,
  showVideoSettings,
  onClose,
  onTogglePlayPause,
  onToggleMute,
  onVolumeChange,
  onProgressChange,
  onMouseMove,
  formatTime,
  onToggleVideoSettings,
  onQualityChange,
  onSpeedChange,
  relatedVideos = [],
  favorites = [],
  onToggleFavorite = () => {},
  onVideoSelect = () => {},
  subscriptions = [],
  onToggleSubscription = () => {},
}: VideoPlayerProps) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [startY, setStartY] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const isLiked = selectedVideo ? favorites.includes(selectedVideo.id) : false;
  const isSubscribed = selectedVideo ? subscriptions.includes(selectedVideo.channelId) : false;

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.matchMedia('(orientation: landscape)').matches);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    window.screen.orientation?.addEventListener('change', handleOrientationChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.screen.orientation?.removeEventListener('change', handleOrientationChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isFullscreen) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isFullscreen) return;
    
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    
    if (diff > 50) {
      setShowDetailsPanel(true);
    } else if (diff < -50) {
      setShowDetailsPanel(false);
    }
  };

  const handleTouchEnd = () => {
    setStartY(0);
  };

  return (
    <Dialog open={isPlaying} onOpenChange={onClose}>
      <DialogContent className={`w-full p-0 bg-black border-none transition-all ${
        isLandscape ? 'max-w-full h-screen' : 'max-w-6xl'
      }`}>
        <div 
          className="relative w-full h-full" 
          onMouseMove={onMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`bg-black flex items-center justify-center relative group ${
            isLandscape ? 'h-screen' : 'aspect-video'
          }`}>
            <div className="text-center">
              <p className="text-white text-lg mb-2">{selectedVideo?.title}</p>
              <p className="text-gray-400 text-sm">{selectedVideo?.channel}</p>
            </div>
            
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={onTogglePlayPause}
            >
              {!videoPlaying && (
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Play" size={48} className="text-white ml-2" />
                </div>
              )}
            </div>

            {seekIndicator.show && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/70 rounded-full p-6 animate-fade-in-out">
                  <Icon 
                    name={seekIndicator.direction === 'forward' ? 'FastForward' : 'Rewind'} 
                    size={48} 
                    className="text-white" 
                  />
                  <p className="text-white text-sm mt-2 text-center">10 сек</p>
                </div>
              </div>
            )}

            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={(e) => onProgressChange([parseInt(e.target.value)])}
                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onTogglePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name={videoPlaying ? "Pause" : "Play"} size={24} />
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onToggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        <Icon name={isMuted || volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} size={20} />
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => onVolumeChange([parseInt(e.target.value)])}
                        className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-white text-sm mr-2">
                      {quality} • {playbackSpeed}x
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={onToggleVideoSettings}
                    >
                      <Icon name="Settings" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleFullscreen}
                    >
                      <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost"
              size="icon" 
              className="text-white hover:bg-white/20 rounded-full"
              onClick={onClose}
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          {isFullscreen && (
            <div 
              ref={panelRef}
              className={`absolute inset-x-0 bottom-0 bg-background transition-transform duration-300 ease-out ${
                showDetailsPanel ? 'translate-y-0' : 'translate-y-full'
              }`}
              style={{ 
                height: '80vh',
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                zIndex: 50
              }}
            >
              <div className="w-12 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-4" />
              
              <div className="px-6 pb-6 overflow-y-auto h-full">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{selectedVideo?.title}</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{selectedVideo?.channel}</p>
                        <p className="text-sm text-muted-foreground">1.2М подписчиков</p>
                      </div>
                    </div>
                    <Button
                      variant={isSubscribed ? "outline" : "default"}
                      size="sm"
                      onClick={() => selectedVideo && onToggleSubscription(selectedVideo.channelId)}
                      className="shrink-0"
                    >
                      {isSubscribed ? 'Отписаться' : 'Подписаться'}
                    </Button>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectedVideo && onToggleFavorite(selectedVideo.id)}
                      className="flex-1"
                    >
                      <Icon 
                        name="Heart" 
                        size={18} 
                        className={`mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} 
                      />
                      {isLiked ? 'В избранном' : 'В избранное'}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Share2" size={18} className="mr-2" />
                      Поделиться
                    </Button>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex gap-4 text-sm mb-2">
                      <span className="font-semibold">{selectedVideo?.views}</span>
                      <span className="text-muted-foreground">{selectedVideo?.uploadedAt}</span>
                    </div>
                    <p className="text-sm">{selectedVideo?.description || 'Описание видео'}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Комментарии</h3>
                    <span className="text-sm text-muted-foreground">0</span>
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="MessageSquare" size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Пока нет комментариев</p>
                  </div>
                </div>

                {relatedVideos.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4">Похожие видео</h3>
                    <div className="space-y-4">
                      {relatedVideos.slice(0, 5).map((video) => (
                        <div 
                          key={video.id}
                          onClick={() => {
                            onVideoSelect(video);
                            setShowDetailsPanel(false);
                          }}
                        >
                          <VideoCard
                            video={video}
                            isFavorite={favorites.includes(video.id)}
                            onToggleFavorite={onToggleFavorite}
                            onPlay={onVideoSelect}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>

      <VideoSettings
        isOpen={showVideoSettings}
        onClose={onToggleVideoSettings}
        quality={quality}
        playbackSpeed={playbackSpeed}
        onQualityChange={onQualityChange}
        onSpeedChange={onSpeedChange}
      />
    </Dialog>
  );
}