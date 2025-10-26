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
  if (!selectedVideo?.youtubeId) {
    return null;
  }

  return (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=${videoPlaying ? 1 : 0}&rel=0&modestbranding=1`}
      title={selectedVideo.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute inset-0"
    />
  );
}