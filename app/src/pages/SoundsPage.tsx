import { Music, Lock, Play } from 'lucide-react';

interface SoundsPageProps {
  isLoggedIn: boolean;
  onLoginRequired: () => void;
}

const SAVED_SOUNDS = [
  { id: 1, title: 'موسيقى هادئة', artist: 'فنان 1', duration: '0:30', uses: '500K' },
  { id: 2, title: 'إيقاع حماسي', artist: 'فنان 2', duration: '0:15', uses: '320K' },
  { id: 3, title: 'أغنية شهيرة', artist: 'فنان 3', duration: '1:00', uses: '1.2M' },
];

export function SoundsPage({ isLoggedIn, onLoginRequired }: SoundsPageProps) {
  if (!isLoggedIn) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-12 h-12 text-cyan-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          الأصوات المحفوظة
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          سجل دخول لرؤية الأصوات المحفوظة
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Music className="w-6 h-6 text-cyan-500" />
        الأصوات المحفوظة
      </h2>
      
      <div className="space-y-3">
        {SAVED_SOUNDS.map((sound) => (
          <div 
            key={sound.id}
            className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 dark:text-white text-lg">{sound.title}</p>
              <p className="text-gray-500">{sound.artist}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-sm text-gray-400">{sound.duration}</p>
            </div>
            <div className="text-center px-4">
              <p className="font-bold text-violet-600">{sound.uses}</p>
              <p className="text-xs text-gray-500">استخدام</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
