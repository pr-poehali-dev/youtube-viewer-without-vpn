import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Video } from '@/types/video';
import VideoCard from '@/components/VideoCard';
import ProfileTab from '@/components/ProfileTab';
import ChannelCard from '@/components/ChannelCard';
import { channels } from '@/data/channels';

interface VideoTabsProps {
  activeTab: string;
  searchQuery: string;
  history: string[];
  favorites: string[];
  subscriptions: string[];
  trendingVideos: Video[];
  email: string;
  nickname: string;
  avatar: string | null;
  onTabChange: (value: string) => void;
  onVideoClick: (video: Video) => void;
  onToggleFavorite: (videoId: string) => void;
  onToggleSubscription: (channelId: string) => void;
  onSaveProfile: (email: string, nickname: string, avatar: string | null) => void;
}

export default function VideoTabs({
  activeTab,
  searchQuery,
  history,
  favorites,
  subscriptions,
  trendingVideos,
  email,
  nickname,
  avatar,
  onTabChange,
  onVideoClick,
  onToggleFavorite,
  onToggleSubscription,
  onSaveProfile,
}: VideoTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="bg-secondary border border-border mb-6">
        <TabsTrigger value="home" className="gap-2">
          <Icon name="Home" size={18} />
          <span className="hidden sm:inline">Главная</span>
        </TabsTrigger>
        <TabsTrigger value="shorts" className="gap-2">
          <Icon name="Film" size={18} />
          <span className="hidden sm:inline">Shorts</span>
        </TabsTrigger>
        <TabsTrigger value="search" className="gap-2">
          <Icon name="Search" size={18} />
          <span className="hidden sm:inline">Поиск</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="gap-2">
          <Icon name="Clock" size={18} />
          <span className="hidden sm:inline">История</span>
        </TabsTrigger>
        <TabsTrigger value="favorites" className="gap-2">
          <Icon name="Heart" size={18} />
          <span className="hidden sm:inline">Избранное</span>
        </TabsTrigger>
        <TabsTrigger value="playlists" className="gap-2">
          <Icon name="Users" size={18} />
          <span className="hidden sm:inline">Каналы</span>
        </TabsTrigger>
        <TabsTrigger value="profile" className="gap-2">
          <Icon name="User" size={18} />
          <span className="hidden sm:inline">Профиль</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="home" className="mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
          <p className="text-muted-foreground">Самые популярные видео сегодня</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              isFavorite={favorites.includes(video.id)}
              onVideoClick={onVideoClick}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="shorts" className="mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Shorts</h2>
          <p className="text-muted-foreground">Короткие вертикальные видео</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onVideoClick(video)}
              className="relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="Play" size={48} className="text-white/80 group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm font-medium line-clamp-2">{video.title}</p>
                <p className="text-white/80 text-xs mt-1">{video.views}</p>
              </div>
              <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-white text-xs font-semibold">
                {video.duration}
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="search" className="mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Результаты поиска</h2>
          {searchQuery ? (
            <p className="text-muted-foreground">Поиск: "{searchQuery}"</p>
          ) : (
            <p className="text-muted-foreground">Введите запрос для поиска</p>
          )}
        </div>
        {searchQuery ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingVideos.slice(0, 3).map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                isFavorite={favorites.includes(video.id)}
                onVideoClick={onVideoClick}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Icon name="Search" size={64} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Начните вводить запрос</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="history" className="mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">История просмотров</h2>
          <p className="text-muted-foreground">{history.length} видео</p>
        </div>
        {history.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((videoId) => {
              const video = trendingVideos.find(v => v.id === videoId);
              return video ? (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  isFavorite={favorites.includes(video.id)}
                  onVideoClick={onVideoClick}
                  onToggleFavorite={onToggleFavorite}
                />
              ) : null;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Icon name="Clock" size={64} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">История пуста</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="favorites" className="mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Избранное</h2>
          <p className="text-muted-foreground">{favorites.length} видео</p>
        </div>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((videoId) => {
              const video = trendingVideos.find(v => v.id === videoId);
              return video ? (
                <VideoCard 
                  key={video.id} 
                  video={video} 
                  isFavorite={true}
                  onVideoClick={onVideoClick}
                  onToggleFavorite={onToggleFavorite}
                />
              ) : null;
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Icon name="Heart" size={64} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Нет избранных видео</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="playlists" className="mt-0">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Каналы</h2>
          <p className="text-muted-foreground">Откройте для себя интересные каналы</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              isSubscribed={subscriptions.includes(channel.id)}
              onToggleSubscription={onToggleSubscription}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="profile" className="mt-0">
        <ProfileTab 
          email={email}
          nickname={nickname}
          avatar={avatar}
          subscriptions={subscriptions}
          onSave={onSaveProfile}
          onToggleSubscription={onToggleSubscription}
        />
      </TabsContent>
    </Tabs>
  );
}