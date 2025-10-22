import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  quality: string;
  playbackSpeed: number;
  onQualityChange: (quality: string) => void;
  onSpeedChange: (speed: number) => void;
}

const qualityOptions = [
  { value: '2160p', label: '2160p (4K)' },
  { value: '1440p', label: '1440p (2K)' },
  { value: '1080p', label: '1080p (Full HD)' },
  { value: '720p', label: '720p (HD)' },
  { value: '480p', label: '480p' },
  { value: '360p', label: '360p' },
  { value: '240p', label: '240p' },
  { value: 'auto', label: 'Авто' },
];

const speedOptions = [
  { value: 0.25, label: '0.25x' },
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1, label: 'Нормальная' },
  { value: 1.25, label: '1.25x' },
  { value: 1.5, label: '1.5x' },
  { value: 1.75, label: '1.75x' },
  { value: 2, label: '2x' },
];

export default function VideoSettings({
  isOpen,
  onClose,
  quality,
  playbackSpeed,
  onQualityChange,
  onSpeedChange,
}: VideoSettingsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Settings" size={24} />
            Настройки видео
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Icon name="MonitorPlay" size={18} />
              Качество видео
            </h3>
            <div className="space-y-2">
              {qualityOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={quality === option.value ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    quality === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => onQualityChange(option.value)}
                >
                  {quality === option.value && (
                    <Icon name="Check" size={16} className="mr-2" />
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Icon name="Gauge" size={18} />
              Скорость воспроизведения
            </h3>
            <div className="space-y-2">
              {speedOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={playbackSpeed === option.value ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    playbackSpeed === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => onSpeedChange(option.value)}
                >
                  {playbackSpeed === option.value && (
                    <Icon name="Check" size={16} className="mr-2" />
                  )}
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
