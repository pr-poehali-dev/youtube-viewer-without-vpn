import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FullscreenControlsProps {
  showControls: boolean;
  videoPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlayPause: () => void;
  onProgressChange: (value: number[]) => void;
  toggleFullscreen: () => void;
  onToggleVideoSettings: () => void;
  formatTime: (seconds: number) => string;
}

export default function FullscreenControls({
  showControls,
  videoPlaying,
  currentTime,
  duration,
  onTogglePlayPause,
  onProgressChange,
  toggleFullscreen,
  onToggleVideoSettings,
  formatTime,
}: FullscreenControlsProps) {
  return (
    <>
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
    </>
  );
}
