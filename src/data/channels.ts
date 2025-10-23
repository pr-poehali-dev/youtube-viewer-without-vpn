export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  videosCount: number;
}

export const channels: Channel[] = [
  {
    id: 'tech-channel',
    name: 'Tech Channel',
    avatar: 'https://ui-avatars.com/api/?name=Tech+Channel&background=FF0000&color=fff&size=128',
    subscribers: '2.5М подписчиков',
    videosCount: 342
  },
  {
    id: 'code-masters',
    name: 'Code Masters',
    avatar: 'https://ui-avatars.com/api/?name=Code+Masters&background=0066FF&color=fff&size=128',
    subscribers: '1.8М подписчиков',
    videosCount: 520
  },
  {
    id: 'webdev-pro',
    name: 'WebDev Pro',
    avatar: 'https://ui-avatars.com/api/?name=WebDev+Pro&background=00CC66&color=fff&size=128',
    subscribers: '980К подписчиков',
    videosCount: 215
  },
  {
    id: 'design-hub',
    name: 'Design Hub',
    avatar: 'https://ui-avatars.com/api/?name=Design+Hub&background=FF6600&color=fff&size=128',
    subscribers: '650К подписчиков',
    videosCount: 178
  },
  {
    id: 'ai-insights',
    name: 'AI Insights',
    avatar: 'https://ui-avatars.com/api/?name=AI+Insights&background=9933FF&color=fff&size=128',
    subscribers: '1.2М подписчиков',
    videosCount: 289
  },
  {
    id: 'startup-stories',
    name: 'Startup Stories',
    avatar: 'https://ui-avatars.com/api/?name=Startup+Stories&background=FF3366&color=fff&size=128',
    subscribers: '450К подписчиков',
    videosCount: 92
  }
];
