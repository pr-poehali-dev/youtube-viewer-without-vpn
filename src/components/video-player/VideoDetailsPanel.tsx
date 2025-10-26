import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import VideoCard from '@/components/VideoCard';

interface VideoDetailsPanelProps {
  selectedVideo: Video | null;
  likes: number;
  dislikes: number;
  userLike: 'like' | 'dislike' | null;
  isSubscribed: boolean;
  relatedVideos: Video[];
  favorites: string[];
  onToggleFavorite: (videoId: string) => void;
  onVideoSelect: (video: Video) => void;
  onToggleSubscription: (channelId: string) => void;
  handleLike: () => void;
  handleDislike: () => void;
  formatCount: (count: number) => string;
}

export default function VideoDetailsPanel({
  selectedVideo,
  likes,
  dislikes,
  userLike,
  isSubscribed,
  relatedVideos,
  favorites,
  onToggleFavorite,
  onVideoSelect,
  onToggleSubscription,
  handleLike,
  handleDislike,
  formatCount,
}: VideoDetailsPanelProps) {
  return (
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
  );
}
