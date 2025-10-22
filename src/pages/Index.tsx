import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

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

  const handleVideoClick = (video: Video) => {
    if (!history.includes(video.id)) {
      setHistory([video.id, ...history]);
    }
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
    setVideoPlaying(true);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setVideoPlaying(!videoPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0) setIsMuted(false);
  };

  const handleProgressChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (videoPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    if (!videoPlaying) {
      setShowControls(true);
    }
  }, [videoPlaying]);

  useEffect(() => {
    if (isPlaying && videoPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setVideoPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoPlaying, duration]);

  const VideoCard = ({ video }: { video: Video }) => (
    <Card 
      className="group bg-card border-border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary"
      onClick={() => handleVideoClick(video)}
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
              <img 
                src="https://cdn.poehali.dev/projects/cc53c4ff-a42c-46de-a671-5fbeb5dceb20/files/59a97f59-c679-4c6d-8d7a-1d5fa83414cf.jpg" 
                alt="Saturn Logo" 
                className="w-10 h-10 object-contain"
              />
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

      <Dialog open={isPlaying} onOpenChange={closeVideoPlayer}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black border-none">
          <div className="relative w-full" onMouseMove={handleMouseMove}>
            <div className="aspect-video bg-black flex items-center justify-center relative group">
              <div className="text-center">
                <p className="text-white text-lg mb-2">{selectedVideo?.title}</p>
                <p className="text-gray-400 text-sm">{selectedVideo?.channel}</p>
              </div>
              
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={togglePlayPause}
              >
                {!videoPlaying && (
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Play" size={48} className="text-white ml-2" />
                  </div>
                )}
              </div>

              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={(e) => handleProgressChange([parseInt(e.target.value)])}
                      className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                    />
                    <span className="text-white text-sm">{formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        <Icon name={videoPlaying ? "Pause" : "Play"} size={24} />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20"
                        >
                          <Icon name={isMuted || volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} size={20} />
                        </Button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange([parseInt(e.target.value)])}
                          className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
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
                onClick={closeVideoPlayer}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="bg-background p-4 border-t border-border">
              <h3 className="font-semibold text-lg mb-2">{selectedVideo?.title}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{selectedVideo?.channel}</span>
                <span>{selectedVideo?.views}</span>
                <span>{selectedVideo?.duration}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}