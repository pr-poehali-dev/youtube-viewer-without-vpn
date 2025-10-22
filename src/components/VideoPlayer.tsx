import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import VideoSettings from '@/components/VideoSettings';

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
}: VideoPlayerProps) {
  return (
    <Dialog open={isPlaying} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full p-0 bg-black border-none">
        <div className="relative w-full" onMouseMove={onMouseMove}>
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
                    >
                      <Icon name="Maximize" size={20} />
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