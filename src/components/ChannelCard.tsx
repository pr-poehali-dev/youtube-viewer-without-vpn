import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Channel } from '@/data/channels';

interface ChannelCardProps {
  channel: Channel;
  isSubscribed: boolean;
  onToggleSubscription: (channelId: string) => void;
}

export default function ChannelCard({ channel, isSubscribed, onToggleSubscription }: ChannelCardProps) {
  return (
    <Card className="group bg-card border-border overflow-hidden transition-all duration-300 hover:scale-105 hover:border-primary">
      <div className="p-6 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img 
            src={channel.avatar} 
            alt={channel.name}
            className="w-24 h-24 rounded-full"
          />
        </div>
        
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {channel.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-1">
          {channel.subscribers}
        </p>
        
        <p className="text-xs text-muted-foreground mb-4">
          {channel.videosCount} видео
        </p>
        
        <Button
          onClick={() => onToggleSubscription(channel.id)}
          className={isSubscribed ? "w-full" : "w-full bg-primary hover:bg-primary/90"}
          variant={isSubscribed ? "outline" : "default"}
        >
          {isSubscribed ? (
            <>
              <Icon name="UserCheck" size={18} className="mr-2" />
              Подписан
            </>
          ) : (
            <>
              <Icon name="UserPlus" size={18} className="mr-2" />
              Подписаться
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
