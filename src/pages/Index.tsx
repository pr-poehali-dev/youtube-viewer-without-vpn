import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import SettingsDialog from '@/components/SettingsDialog';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  duration: string;
}

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('home');

  const trendingVideos: Video[] = [
    {
      id: '1',
      title: 'Как создать сайт без программирования в 2025',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'Tech Channel',
      views: '1.2M просмотров',
      duration: '15:30'
    },
    {
      id: '2',
      title: 'Полный курс React для начинающих',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'Code Masters',
      views: '850K просмотров',
      duration: '2:45:12'
    },
    {
      id: '3',
      title: 'ТОП-10 трендов веб-разработки',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'WebDev Pro',
      views: '500K просмотров',
      duration: '22:18'
    },
    {
      id: '4',
      title: 'Создание красивых анимаций на CSS',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'Design Academy',
      views: '320K просмотров',
      duration: '18:45'
    },
    {
      id: '5',
      title: 'TypeScript - полное руководство 2025',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'Programming Hub',
      views: '920K просмотров',
      duration: '3:12:30'
    },
    {
      id: '6',
      title: 'Секреты продуктивности разработчика',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      channel: 'Dev Life',
      views: '680K просмотров',
      duration: '12:55'
    }
  ];

  const toggleFavorite = (videoId: string) => {
    if (favorites.includes(videoId)) {
      setFavorites(favorites.filter(id => id !== videoId));
    } else {
      setFavorites([...favorites, videoId]);
    }
  };

  const handleVideoClick = (videoId: string) => {
    if (!history.includes(videoId)) {
      setHistory([videoId, ...history]);
    }
  };

  const VideoCard = ({ video }: { video: Video }) => (
    <Card 
      className="group bg-card border-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary"
      onClick={() => handleVideoClick(video.id)}
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
              toggleFavorite(video.id);
            }}
          >
            <Icon 
              name={favorites.includes(video.id) ? "Heart" : "Heart"} 
              size={18}
              className={favorites.includes(video.id) ? "fill-primary text-primary" : ""}
            />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Play" size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold hidden sm:block">Сатурн</h1>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
            </div>

            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={22} />
            </Button>
            <SettingsDialog />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-secondary border border-border mb-6">
            <TabsTrigger value="home" className="gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Главная</span>
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
              <Icon name="List" size={18} />
              <span className="hidden sm:inline">Плейлисты</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
              <p className="text-muted-foreground">Самые популярные видео сегодня</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
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
                  <VideoCard key={video.id} video={video} />
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
                  return video ? <VideoCard key={video.id} video={video} /> : null;
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
                  return video ? <VideoCard key={video.id} video={video} /> : null;
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
              <h2 className="text-2xl font-bold mb-4">Мои плейлисты</h2>
              <p className="text-muted-foreground">Создавайте и управляйте плейлистами</p>
            </div>
            <div className="flex flex-col items-center justify-center py-20">
              <Icon name="List" size={64} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">У вас пока нет плейлистов</p>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" size={18} className="mr-2" />
                Создать плейлист
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}