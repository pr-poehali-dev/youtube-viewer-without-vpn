import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import VideoSettings from '@/components/VideoSettings';
import { useState, useEffect } from 'react';
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
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLike, setUserLike] = useState<'like' | 'dislike' | null>(null);
  
  const isLiked = selectedVideo ? favorites.includes(selectedVideo.id) : false;
  const isSubscribed = selectedVideo ? subscriptions.includes(selectedVideo.channelId) : false;

  useEffect(() => {
    if (selectedVideo) {
      const randomLikes = Math.floor(Math.random() * 50000) + 10000;
      const randomDislikes = Math.floor(Math.random() * 2000) + 100;
      setLikes(randomLikes);
      setDislikes(randomDislikes);
      setUserLike(null);
    }
  }, [selectedVideo]);

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

  const handleLike = () => {
    if (userLike === 'like') {
      setUserLike(null);
      setLikes(l => l - 1);
    } else {
      if (userLike === 'dislike') {
        setDislikes(d => d - 1);
      }
      setUserLike('like');
      setLikes(l => l + 1);
    }
  };

  const handleDislike = () => {
    if (userLike === 'dislike') {
      setUserLike(null);
      setDislikes(d => d - 1);
    } else {
      if (userLike === 'like') {
        setLikes(l => l - 1);
      }
      setUserLike('dislike');
      setDislikes(d => d + 1);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${Math.floor(count / 1000)} тыс.`;
    }
    return count.toString();
  };

  if (isFullscreen) {
    return (
      <Dialog open={isPlaying} onOpenChange={onClose}>
        <DialogContent className="w-full h-screen max-w-full p-0 bg-black border-none">
          <div className="h-full overflow-y-auto">
            <div className="relative bg-black" onMouseMove={onMouseMove}>
              <div className="aspect-video bg-black flex items-center justify-center relative group">
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

                <div className={`absolute top-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full"
                      onClick={toggleFullscreen}
                    >
                      <Icon name="ChevronDown" size={24} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <Icon name="Cast" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                      <Icon name="MessageSquare" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={onToggleVideoSettings}
                    >
                      <Icon name="Settings" size={20} />
                    </Button>
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onTogglePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        <Icon name={videoPlaying ? "Pause" : "Play"} size={28} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Icon name="SkipBack" size={24} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Icon name="SkipForward" size={24} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => onProgressChange([parseInt(e.target.value)])}
                      className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-white text-xs">
                    <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 h-6 w-6"
                      onClick={toggleFullscreen}
                    >
                      <Icon name="Minimize" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {showVideoSettings && (
                <div className="absolute top-16 right-4 z-50">
                  <VideoSettings
                    quality={quality}
                    playbackSpeed={playbackSpeed}
                    onQualityChange={onQualityChange}
                    onSpeedChange={onSpeedChange}
                    onClose={onToggleVideoSettings}
                  />
                </div>
              )}
            </div>

            <div className="bg-background text-foreground">
              <div className="p-4">
                <h1 className="text-base font-semibold mb-2">{selectedVideo?.title}</h1>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{selectedVideo?.views} • {selectedVideo?.uploadedAt}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Icon name="User" size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{selectedVideo?.channel}</p>
                    <p className="text-xs text-muted-foreground">214 тыс.</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => selectedVideo && onToggleSubscription(selectedVideo.channelId)}
                  >
                    <Icon 
                      name="Bell" 
                      size={20} 
                      className={isSubscribed ? 'fill-current' : ''}
                    />
                  </Button>
                  <Button
                    variant={isSubscribed ? "outline" : "default"}
                    size="sm"
                    onClick={() => selectedVideo && onToggleSubscription(selectedVideo.channelId)}
                    className="shrink-0"
                  >
                    {isSubscribed ? 'Отписаться' : 'Подписаться'}
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-muted rounded-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`rounded-l-full ${userLike === 'like' ? 'bg-primary/20' : ''}`}
                    >
                      <Icon 
                        name="ThumbsUp" 
                        size={18} 
                        className={`mr-1 ${userLike === 'like' ? 'fill-current' : ''}`}
                      />
                      <span className="text-sm">{formatCount(likes)}</span>
                    </Button>
                    <div className="w-px h-6 bg-border" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDislike}
                      className={`rounded-r-full ${userLike === 'dislike' ? 'bg-primary/20' : ''}`}
                    >
                      <Icon 
                        name="ThumbsDown" 
                        size={18}
                        className={userLike === 'dislike' ? 'fill-current' : ''}
                      />
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" className="rounded-full bg-muted">
                    <Icon name="Share2" size={18} className="mr-2" />
                    Поделиться
                  </Button>

                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full bg-muted"
                    onClick={() => selectedVideo && onToggleFavorite(selectedVideo.id)}
                  >
                    <Icon name="Download" size={18} />
                  </Button>

                  <Button variant="ghost" size="sm" className="rounded-full bg-muted">
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>

              <div className="border-t border-border px-4 py-3">
                <button className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Icon name="MessageSquare" size={20} />
                    <span className="font-semibold">Комментарии</span>
                    <span className="text-muted-foreground">1,2 тыс.</span>
                  </div>
                  <Icon name="ChevronRight" size={20} />
                </button>

                <div className="mt-3 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                    a
                  </div>
                  <div className="flex-1 bg-muted rounded-lg p-2 text-sm">
                    <p className="text-xs text-muted-foreground mb-1">1 дн. назад</p>
                    <p>за прохождение этого мода 999999999 social credit. 10000 мисок риса и 20 кошка жён.</p>
                  </div>
                </div>
              </div>

              {relatedVideos.length > 0 && (
                <div className="border-t border-border">
                  <div className="p-4">
                    {relatedVideos.slice(0, 5).map((video) => (
                      <div 
                        key={video.id}
                        onClick={() => onVideoSelect(video)}
                        className="mb-4 last:mb-0"
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
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isPlaying} onOpenChange={onClose}>
      <DialogContent className={`w-full p-0 bg-black border-none transition-all ${
        isLandscape ? 'max-w-full h-screen' : 'max-w-6xl'
      }`}>
        <div className="relative w-full h-full" onMouseMove={onMouseMove}>
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

          {showVideoSettings && (
            <div className="absolute top-20 right-4 z-50">
              <VideoSettings
                quality={quality}
                playbackSpeed={playbackSpeed}
                onQualityChange={onQualityChange}
                onSpeedChange={onSpeedChange}
                onClose={onToggleVideoSettings}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
