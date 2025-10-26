import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Video } from '@/types/video';
import VideoSettings from '@/components/VideoSettings';
import VideoPlayerOverlay from './VideoPlayerOverlay';
import FullscreenControls from './FullscreenControls';
import VideoDetailsPanel from './VideoDetailsPanel';

interface FullscreenVideoPlayerProps {
  isPlaying: boolean;
  selectedVideo: Video | null;
  videoPlaying: boolean;
  currentTime: number;
  duration: number;
  showControls: boolean;
  seekIndicator: { show: boolean; direction: 'forward' | 'backward' };
  quality: string;
  playbackSpeed: number;
  showVideoSettings: boolean;
  likes: number;
  dislikes: number;
  userLike: 'like' | 'dislike' | null;
  isSubscribed: boolean;
  relatedVideos: Video[];
  favorites: string[];
  onClose: () => void;
  onTogglePlayPause: () => void;
  onProgressChange: (value: number[]) => void;
  onMouseMove: () => void;
  formatTime: (seconds: number) => string;
  onToggleVideoSettings: () => void;
  onQualityChange: (quality: string) => void;
  onSpeedChange: (speed: number) => void;
  toggleFullscreen: () => void;
  onToggleFavorite: (videoId: string) => void;
  onVideoSelect: (video: Video) => void;
  onToggleSubscription: (channelId: string) => void;
  handleLike: () => void;
  handleDislike: () => void;
  formatCount: (count: number) => string;
}

export default function FullscreenVideoPlayer({
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
  likes,
  dislikes,
  userLike,
  isSubscribed,
  relatedVideos,
  favorites,
  onClose,
  onTogglePlayPause,
  onProgressChange,
  onMouseMove,
  formatTime,
  onToggleVideoSettings,
  onQualityChange,
  onSpeedChange,
  toggleFullscreen,
  onToggleFavorite,
  onVideoSelect,
  onToggleSubscription,
  handleLike,
  handleDislike,
  formatCount,
}: FullscreenVideoPlayerProps) {
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
