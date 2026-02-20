import { useState } from 'react';
import { Search, TrendingUp, Music, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TRENDING_TOPICS = [
  { id: 1, tag: '#تحدي_الرقص', posts: '2.5M', category: 'ترفيه' },
  { id: 2, tag: '#وصفات_سريعة', posts: '1.8M', category: 'طعام' },
  { id: 3, tag: '#نصائح_تجميل', posts: '3.2M', category: 'جمال' },
  { id: 4, tag: '#رياضة_يومية', posts: '950K', category: 'رياضة' },
  { id: 5, tag: '#سفر_واستكشاف', posts: '1.2M', category: 'سفر' },
  { id: 6, tag: '#تعلم_اللغات', posts: '780K', category: 'تعليم' },
];

const TRENDING_SOUNDS = [
  { id: 1, title: 'موسيقى هادئة', artist: 'فنان 1', uses: '500K' },
  { id: 2, title: 'إيقاع حماسي', artist: 'فنان 2', uses: '320K' },
  { id: 3, title: 'أغنية شهيرة', artist: 'فنان 3', uses: '1.2M' },
  { id: 4, title: 'موسيقى كلاسيكية', artist: 'فنان 4', uses: '180K' },
];

const POPULAR_CREATORS = [
  { id: 1, name: 'أحمد', followers: '2.5M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed' },
  { id: 2, name: 'سارة', followers: '1.8M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara' },
  { id: 3, name: 'محمد', followers: '3.2M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mohammed' },
  { id: 4, name: 'فاطمة', followers: '950K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fatima' },
];

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-8">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="ابحث عن مواضيع، أصوات، مستخدمين..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="w-full h-14 pr-12 pl-4 rounded-2xl bg-white dark:bg-gray-800 border-0 shadow-lg focus:ring-2 focus:ring-purple-500 text-lg"
        />
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-violet-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">المواضيع الرائجة</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDING_TOPICS.map((topic) => (
            <div 
              key={topic.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors">
                    {topic.tag}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{topic.posts} منشور</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 text-xs font-medium">
                  {topic.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-5 h-5 text-pink-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">الأصوات الرائجة</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRENDING_SOUNDS.map((sound) => (
            <div 
              key={sound.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 dark:text-white">{sound.title}</p>
                <p className="text-sm text-gray-500">{sound.artist}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-violet-600">{sound.uses}</p>
                <p className="text-xs text-gray-500">استخدام</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-cyan-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">مبدعون قد يعجبونك</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {POPULAR_CREATORS.map((creator) => (
            <div 
              key={creator.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer text-center group"
            >
              <img 
                src={creator.avatar} 
                alt={creator.name}
                className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-transparent group-hover:border-violet-500 transition-colors"
              />
              <p className="font-bold text-gray-900 dark:text-white">{creator.name}</p>
              <p className="text-sm text-gray-500">{creator.followers} متابع</p>
              <button className="mt-3 w-full py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 text-sm font-medium hover:bg-violet-200 transition-colors">
                متابعة
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                }
