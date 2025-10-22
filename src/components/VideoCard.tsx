import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
  isFavorite: boolean;
  onVideoClick: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
}

export default function VideoCard({ video, isFavorite, onVideoClick, onToggleFavorite }: VideoCardProps) {
  return (
    <Card 
      className="group bg-card border-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary"
      onClick={() => onVideoClick(video)}
    >
      <div className="relative aspect-video bg-muted">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium">
          {video.duration}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
            <Icon name="Play" size={32} className="text-white ml-1" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-xs text-muted-foreground">{video.channel}</p>
            <p className="text-xs text-muted-foreground">{video.views}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(video.id);
            }}
          >
            <Icon 
              name={isFavorite ? "Heart" : "Heart"} 
              size={18}
              className={isFavorite ? "fill-primary text-primary" : ""}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
}
