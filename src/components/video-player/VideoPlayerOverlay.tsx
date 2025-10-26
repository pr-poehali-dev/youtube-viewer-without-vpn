import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';

interface VideoPlayerOverlayProps {
  selectedVideo: Video | null;
  videoPlaying: boolean;
  seekIndicator: { show: boolean; direction: 'forward' | 'backward' };
  onTogglePlayPause: () => void;
}

export default function VideoPlayerOverlay({
  selectedVideo,
  videoPlaying,
  seekIndicator,
  onTogglePlayPause,
}: VideoPlayerOverlayProps) {
  return (
    <>
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
    </>
  );
}
