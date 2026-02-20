import { Heart, Lock } from 'lucide-react';
import type { Video } from '@/types';

interface LikedPageProps {
  likedVideos: Video[];
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

export function LikedPage({ likedVideos, isLoggedIn, onLoginRequired }: LikedPageProps) {
  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-12 h-12 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          المحتوى المعجب به
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          سجل دخول لرؤية الفيديوهات التي أعجبت بها
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

  if (likedVideos.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-pink-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          لا توجد فيديوهات معجب بها
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          الفيديوهات التي تعجبك ستظهر هنا
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-pink-500" />
        الفيديوهات المعجب بها
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {likedVideos.map((video) => (
          <div 
            key={video.id} 
            className="aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group cursor-pointer"
          >
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium truncate">@{video.authorName}</p>
                <p className="text-white/80 text-sm truncate">{video.description}</p>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              <Heart className="w-6 h-6 text-white fill-pink-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
