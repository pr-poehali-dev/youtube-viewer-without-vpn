import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoPlayerControlsProps {
  showControls: boolean;
  videoPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  quality: string;
  playbackSpeed: number;
  isFullscreen: boolean;
  onTogglePlayPause: () => void;
  onToggleMute: () => void;
  onProgressChange: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  onToggleVideoSettings: () => void;
  toggleFullscreen: () => void;
  formatTime: (seconds: number) => string;
}

export default function VideoPlayerControls({
  showControls,
  videoPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  quality,
  playbackSpeed,
  isFullscreen,
  onTogglePlayPause,
  onToggleMute,
  onProgressChange,
  onVolumeChange,
  onToggleVideoSettings,
  toggleFullscreen,
  formatTime,
}: VideoPlayerControlsProps) {
  return (
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
  );
}
