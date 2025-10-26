import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import VideoSettings from '@/components/VideoSettings';
import { useState, useEffect } from 'react';
import VideoPlayerOverlay from './video-player/VideoPlayerOverlay';
import VideoPlayerControls from './video-player/VideoPlayerControls';
import FullscreenVideoPlayer from './video-player/FullscreenVideoPlayer';

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
      <FullscreenVideoPlayer
        isPlaying={isPlaying}
        selectedVideo={selectedVideo}
        videoPlaying={videoPlaying}
        currentTime={currentTime}
        duration={duration}
        showControls={showControls}
        seekIndicator={seekIndicator}
        quality={quality}
        playbackSpeed={playbackSpeed}
        showVideoSettings={showVideoSettings}
        likes={likes}
        dislikes={dislikes}
        userLike={userLike}
        isSubscribed={isSubscribed}
        relatedVideos={relatedVideos}
        favorites={favorites}
        onClose={onClose}
        onTogglePlayPause={onTogglePlayPause}
        onProgressChange={onProgressChange}
        onMouseMove={onMouseMove}
        formatTime={formatTime}
        onToggleVideoSettings={onToggleVideoSettings}
        onQualityChange={onQualityChange}
        onSpeedChange={onSpeedChange}
        toggleFullscreen={toggleFullscreen}
        onToggleFavorite={onToggleFavorite}
        onVideoSelect={onVideoSelect}
        onToggleSubscription={onToggleSubscription}
        handleLike={handleLike}
        handleDislike={handleDislike}
        formatCount={formatCount}
      />
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
            <VideoPlayerOverlay
              selectedVideo={selectedVideo}
              videoPlaying={videoPlaying}
              seekIndicator={seekIndicator}
              onTogglePlayPause={onTogglePlayPause}
            />

            <VideoPlayerControls
              showControls={showControls}
              videoPlaying={videoPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              quality={quality}
              playbackSpeed={playbackSpeed}
              isFullscreen={isFullscreen}
              onTogglePlayPause={onTogglePlayPause}
              onToggleMute={onToggleMute}
              onProgressChange={onProgressChange}
              onVolumeChange={onVolumeChange}
              onToggleVideoSettings={onToggleVideoSettings}
              toggleFullscreen={toggleFullscreen}
              formatTime={formatTime}
            />
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
