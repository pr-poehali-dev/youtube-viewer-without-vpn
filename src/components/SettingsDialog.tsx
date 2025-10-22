import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/icon';

export default function SettingsDialog() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon name="Settings" size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
          <DialogDescription>
            Измените настройки приложения
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
      </DialogContent>
    </Dialog>
  );
}
