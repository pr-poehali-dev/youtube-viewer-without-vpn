import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

export default function SettingsDialog() {
  const { theme, toggleTheme } = useTheme();
  const [autoplay, setAutoplay] = useState(() => localStorage.getItem('autoplay') === 'true');
  const [quality, setQuality] = useState(() => localStorage.getItem('quality') || 'auto');
  const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') !== 'false');
  const [volume, setVolume] = useState(() => Number(localStorage.getItem('volume') || 70));
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ru');

  useEffect(() => {
    localStorage.setItem('autoplay', String(autoplay));
  }, [autoplay]);

  useEffect(() => {
    localStorage.setItem('quality', quality);
  }, [quality]);

  useEffect(() => {
    localStorage.setItem('notifications', String(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('volume', String(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="Settings" size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription>
            Измените настройки приложения
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Icon name="Palette" size={16} />
              Внешний вид
            </h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-mode" className="flex flex-col gap-1">
                <span className="text-sm font-medium">Светлая тема</span>
                <span className="text-xs text-muted-foreground">
                  Переключиться на светлый режим
                </span>
              </Label>
              <Switch
                id="theme-mode"
                checked={theme === 'light'}
                onCheckedChange={toggleTheme}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Icon name="Play" size={16} />
              Воспроизведение
            </h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoplay" className="flex flex-col gap-1">
                <span className="text-sm font-medium">Автовоспроизведение</span>
                <span className="text-xs text-muted-foreground">
                  Автоматически запускать следующее видео
                </span>
              </Label>
              <Switch
                id="autoplay"
                checked={autoplay}
                onCheckedChange={setAutoplay}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="quality" className="text-sm font-medium">
                Качество видео
              </Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger id="quality">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Автоматическое</SelectItem>
                  <SelectItem value="2160p">2160p (4K)</SelectItem>
                  <SelectItem value="1440p">1440p (2K)</SelectItem>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                  <SelectItem value="480p">480p</SelectItem>
                  <SelectItem value="360p">360p</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="volume" className="text-sm font-medium">
                Громкость по умолчанию: {volume}%
              </Label>
              <Slider
                id="volume"
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Icon name="Bell" size={16} />
              Уведомления
            </h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex flex-col gap-1">
                <span className="text-sm font-medium">Push-уведомления</span>
                <span className="text-xs text-muted-foreground">
                  Получать уведомления о новых видео
                </span>
              </Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Icon name="Globe" size={16} />
              Язык и регион
            </h3>
            <div className="flex flex-col gap-2">
              <Label htmlFor="language" className="text-sm font-medium">
                Язык интерфейса
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="uk">Українська</SelectItem>
                  <SelectItem value="kz">Қазақша</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}