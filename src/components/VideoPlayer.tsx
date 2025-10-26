import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Video } from '@/types/video';
import VideoSettings from '@/components/VideoSettings';
import { useState, useEffect } from 'react';
import FullscreenVideoPlayer from './video-player/FullscreenVideoPlayer';
import VideoDetailsPanel from './video-player/VideoDetailsPanel';
import VideoPlayerOverlay from './video-player/VideoPlayerOverlay';
import FullscreenControls from './video-player/FullscreenControls';

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
  currentTime,
  duration,
  showControls,
  seekIndicator,
  quality,
  playbackSpeed,
  showVideoSettings,
  onClose,
  onTogglePlayPause,
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
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
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
      <DialogContent className="w-full h-screen max-w-full p-0 bg-black border-none">
        <div className="h-full overflow-y-auto">
          <div className="relative bg-black" onMouseMove={onMouseMove}>
            <div className="aspect-video bg-black flex items-center justify-center relative group">
              <VideoPlayerOverlay
                selectedVideo={selectedVideo}
                videoPlaying={videoPlaying}
                seekIndicator={seekIndicator}
                onTogglePlayPause={onTogglePlayPause}
              />

              <FullscreenControls
                showControls={showControls}
                videoPlaying={videoPlaying}
                currentTime={currentTime}
                duration={duration}
                onTogglePlayPause={onTogglePlayPause}
                onProgressChange={onProgressChange}
                toggleFullscreen={toggleFullscreen}
                onToggleVideoSettings={onToggleVideoSettings}
                formatTime={formatTime}
              />
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

          <VideoDetailsPanel
            selectedVideo={selectedVideo}
            likes={likes}
            dislikes={dislikes}
            userLike={userLike}
            isSubscribed={isSubscribed}
            relatedVideos={relatedVideos}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onVideoSelect={onVideoSelect}
            onToggleSubscription={onToggleSubscription}
            handleLike={handleLike}
            handleDislike={handleDislike}
            formatCount={formatCount}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
