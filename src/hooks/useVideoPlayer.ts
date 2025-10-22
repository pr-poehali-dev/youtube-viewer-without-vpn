import { useState, useRef, useEffect } from 'react';
import { Video } from '@/types/video';

export function useVideoPlayer() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [seekIndicator, setSeekIndicator] = useState<{show: boolean, direction: 'forward' | 'backward'}>({show: false, direction: 'forward'});
  const [quality, setQuality] = useState('1080p');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showVideoSettings, setShowVideoSettings] = useState(false);
  const controlsTimeoutRef = useRef<number | null>(null);
  const seekIndicatorTimeoutRef = useRef<number | null>(null);

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

  const showSeekIndicator = (direction: 'forward' | 'backward') => {
    setSeekIndicator({show: true, direction});
    if (seekIndicatorTimeoutRef.current) {
      window.clearTimeout(seekIndicatorTimeoutRef.current);
    }
    seekIndicatorTimeoutRef.current = window.setTimeout(() => {
      setSeekIndicator({show: false, direction});
    }, 500);
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
          return prev + playbackSpeed;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoPlaying, duration, playbackSpeed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentTime((prev) => Math.max(0, prev - 10));
          showSeekIndicator('backward');
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentTime((prev) => Math.min(duration, prev + 10));
          showSeekIndicator('forward');
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume((prev) => Math.min(100, prev + 10));
          setIsMuted(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume((prev) => Math.max(0, prev - 10));
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, duration, videoPlaying]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const toggleVideoSettings = () => {
    setShowVideoSettings(!showVideoSettings);
  };

  const handleQualityChange = (newQuality: string) => {
    setQuality(newQuality);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
  };

  return {
    selectedVideo,
    isPlaying,
    videoPlaying,
    volume,
    currentTime,
    duration,
    isMuted,
    showControls,
    seekIndicator,
    quality,
    playbackSpeed,
    showVideoSettings,
    closeVideoPlayer,
    togglePlayPause,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    formatTime,
    handleMouseMove,
    handleVideoClick,
    toggleVideoSettings,
    handleQualityChange,
    handleSpeedChange,
  };
}