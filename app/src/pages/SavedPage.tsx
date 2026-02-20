import { Bookmark, Lock } from 'lucide-react';
import type { Video } from '@/types';

interface SavedPageProps {
  savedVideos: Video[];
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

export function SavedPage({ savedVideos, isLoggedIn, onLoginRequired }: SavedPageProps) {
  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          المحفوظات
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          سجل دخول لرؤية الفيديوهات المحفوظة
        </p>
        <button
          onClick={onLoginRequired}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white font-medium hover:shadow-lg transition-shadow"
        >
          تسجيل الدخول
        </button>
      </div>
    );
  }

  if (savedVideos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
          <Bookmark className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          لا توجد محفوظات
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          احفظ الفيديوهات المفضلة لديك للوصول إليها لاحقاً
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Bookmark className="w-6 h-6 text-yellow-500" />
        الفيديوهات المحفوظة
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedVideos.map((video) => (
          <div 
            key={video.id} 
            className="aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group cursor-pointer"
          >
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-white fill-yellow-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
