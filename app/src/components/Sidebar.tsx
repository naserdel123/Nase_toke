import { 
  Home, 
  Compass, 
  Users, 
  Heart, 
  Bookmark, 
  Music,
  Settings, 
  HelpCircle,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isLoggedIn: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onProfileClick: () => void;
}

const mainMenuItems = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'explore', label: 'استكشاف', icon: Compass },
  { id: 'following', label: 'المتابعون', icon: Users },
];

const personalMenuItems = [
  { id: 'liked', label: 'المعجب به', icon: Heart },
  { id: 'saved', label: 'المحفوظات', icon: Bookmark },
  { id: 'sounds', label: 'الأصوات', icon: Music },
];

const otherMenuItems = [
  { id: 'settings', label: 'الإعدادات', icon: Settings },
  { id: 'help', label: 'المساعدة', icon: HelpCircle },
];

export function Sidebar({ isLoggedIn, activeTab, onTabChange, onProfileClick }: SidebarProps) {
  const handleItemClick = (id: string) => {
    if (id === 'profile') {
      onProfileClick();
    } else {
      onTabChange(id);
    }
  };

  return (
    <aside className="fixed right-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto hidden lg:block z-40">
      <nav className="p-4 space-y-6">
        <div className="space-y-1">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                activeTab === item.id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-500/25'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className={cn('w-5 h-5', activeTab === item.id && 'text-white')} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {isLoggedIn && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <div>
              <p className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                حسابي
              </p>
              <button
                onClick={() => handleItemClick('profile')}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-500/25'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <User className={cn('w-5 h-5', activeTab === 'profile' && 'text-white')} />
                <span>الملف الشخصي</span>
              </button>
            </div>
          </>
        )}

        {isLoggedIn && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <div>
              <p className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                المحتوى
              </p>
              <div className="space-y-1">
                {personalMenuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-500/25'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <item.icon className={cn('w-5 h-5', activeTab === item.id && 'text-white')} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="border-t border-gray-200 dark:border-gray-800" />
        <div className="space-y-1">
          {otherMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                activeTab === item.id
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-lg shadow-purple-500/25'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className={cn('w-5 h-5', activeTab === item.id && 'text-white')} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              انضم إلى Nase Tok
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              سجل دخول للوصول إلى جميع الميزات والمحتوى المميز
            </p>
          </div>
        )}

        <div className="pt-4 text-xs text-gray-400 text-center">
          <p>© 2024 VibeClip</p>
          <p className="mt-1">صنع بإبداع ✨</p>
        </div>
      </nav>
    </aside>
  );
}
