import { useState, useEffect } from 'react';
import { VideoCard } from '@/components/VideoCard';
import type { Video } from '@/types';
import { toggleLike, toggleSave, getLikedVideos, getSavedItems } from '@/lib/storage';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomePageProps {
  userId: string | null;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

const FILTERS = [
  { id: 'for-you', label: 'لك', icon: Sparkles },
  { id: 'trending', label: 'الأكثر رواجاً', icon: TrendingUp },
  { id: 'latest', label: 'الأحدث', icon: Clock },
];

const DEMO_VIDEOS: Video[] = [];

export function HomePage({ userId, isLoggedIn, onLoginRequired }: HomePageProps) {
  const [activeFilter, setActiveFilter] = useState('for-you');
  const [videos, setVideos] = useState<Video[]>(DEMO_VIDEOS);
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>([]);
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>([]);

  useEffect(() => {
    if (userId) {
      setLikedVideoIds(getLikedVideos(userId));
      const saved = getSavedItems(userId).filter(s => s.type === 'video').map(s => s.itemId);
      setSavedVideoIds(saved);
    }
  }, [userId]);

  const handleLike = (videoId: string) => {
    if (!userId) return;
    const isNowLiked = toggleLike(userId, videoId);
    setLikedVideoIds(prev => 
      isNowLiked 
        ? [...prev, videoId] 
        : prev.filter(id => id !== videoId)
    );
    
    setVideos(prev => prev.map(v => 
      v.id === videoId 
        ? { ...v, likes: isNowLiked ? v.likes + 1 : v.likes - 1 }
        : v
    ));
  };

  const handleSave = (videoId: string) => {
    if (!userId) return;
    const isNowSaved = toggleSave(userId, videoId, 'video');
    setSavedVideoIds(prev => 
      isNowSaved 
        ? [...prev, videoId] 
        : prev.filter(id => id !== videoId)
    );
  };

  const handleDownload = (video: Video) => {
    const link = document.createElement('a');
    link.href = video.url;
    link.download = `vibeclip-${video.id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-center gap-2 mb-6 sticky top-20 z-30 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-md py-2">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-8 pb-8">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isLoggedIn={isLoggedIn}
            isLiked={likedVideoIds.includes(video.id)}
            isSaved={savedVideoIds.includes(video.id)}
            onLoginRequired={onLoginRequired}
            onLike={() => handleLike(video.id)}
            onSave={() => handleSave(video.id)}
            onDownload={() => handleDownload(video)}
          />
        ))}
      </div>
    </div>
  );
}
