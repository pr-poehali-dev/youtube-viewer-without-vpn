import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SettingsDialog from '@/components/SettingsDialog';
import VideoPlayer from '@/components/VideoPlayer';
import VideoTabs from '@/components/VideoTabs';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { trendingVideos } from '@/data/trendingVideos';
import { shortsVideos } from '@/data/shortsVideos';
import ShortsViewer from '@/components/ShortsViewer';
import { Video } from '@/types/video';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('history');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('home');
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('email') || 'user@example.com';
  });
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('nickname') || 'VideoUser';
  });
  const [avatar, setAvatar] = useState<string | null>(() => {
    return localStorage.getItem('avatar') || null;
  });
  const [showShortsViewer, setShowShortsViewer] = useState(false);

  const videoPlayer = useVideoPlayer();

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  useEffect(() => {
    localStorage.setItem('nickname', nickname);
  }, [nickname]);

  useEffect(() => {
    if (avatar) {
      localStorage.setItem('avatar', avatar);
    } else {
      localStorage.removeItem('avatar');
    }
  }, [avatar]);

  const handleSaveProfile = (newEmail: string, newNickname: string, newAvatar: string | null) => {
    setEmail(newEmail);
    setNickname(newNickname);
    setAvatar(newAvatar);
  };

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
    
    if (activeTab === 'shorts') {
      setShowShortsViewer(true);
    } else {
      videoPlayer.handleVideoClick(video);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Play" size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold hidden sm:block">VideoHub</h1>
            </div>
            
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setActiveTab('search');
                  }}
                  className="w-full pl-10 bg-secondary border-border"
                />
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <SettingsDialog />

            <Button variant="ghost" size="icon" className="shrink-0">
              <Icon name="Bell" size={20} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="shrink-0"
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <VideoTabs
          activeTab={activeTab}
          searchQuery={searchQuery}
          history={history}
          favorites={favorites}
          trendingVideos={trendingVideos}
          email={email}
          nickname={nickname}
          avatar={avatar}
          onTabChange={setActiveTab}
          onVideoClick={handleVideoClick}
          onToggleFavorite={toggleFavorite}
          onSaveProfile={handleSaveProfile}
        />
      </div>

      <VideoPlayer
        isPlaying={videoPlayer.isPlaying}
        selectedVideo={videoPlayer.selectedVideo}
        videoPlaying={videoPlayer.videoPlaying}
        volume={videoPlayer.volume}
        currentTime={videoPlayer.currentTime}
        duration={videoPlayer.duration}
        isMuted={videoPlayer.isMuted}
        showControls={videoPlayer.showControls}
        seekIndicator={videoPlayer.seekIndicator}
        quality={videoPlayer.quality}
        playbackSpeed={videoPlayer.playbackSpeed}
        showVideoSettings={videoPlayer.showVideoSettings}
        onClose={videoPlayer.closeVideoPlayer}
        onTogglePlayPause={videoPlayer.togglePlayPause}
        onToggleMute={videoPlayer.toggleMute}
        onVolumeChange={videoPlayer.handleVolumeChange}
        onProgressChange={videoPlayer.handleProgressChange}
        onMouseMove={videoPlayer.handleMouseMove}
        formatTime={videoPlayer.formatTime}
        onToggleVideoSettings={videoPlayer.toggleVideoSettings}
        onQualityChange={videoPlayer.handleQualityChange}
        onSpeedChange={videoPlayer.handleSpeedChange}
      />

      {showShortsViewer && (
        <div className="fixed inset-0 z-50">
          <button
            onClick={() => setShowShortsViewer(false)}
            className="absolute top-4 left-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <Icon name="X" size={24} />
          </button>
          <ShortsViewer
            shorts={shortsVideos}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        </div>
      )}
    </div>
  );
}