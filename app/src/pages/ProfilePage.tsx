import { useState } from 'react';
import type { User, Video } from '@/types';
import { 
  Heart, 
  Bookmark, 
  Music, 
  Grid3X3, 
  Lock,
  Settings,
  Share2,
  Link as LinkIcon,
  MapPin,
  Calendar,
  Edit3,
  BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProfilePageProps {
  user: User;
  likedVideos: Video[];
  savedVideos: Video[];
  isOwnProfile: boolean;
}

const TABS = [
  { id: 'videos', label: 'الفيديوهات', icon: Grid3X3 },
  { id: 'liked', label: 'المعجب به', icon: Heart },
  { id: 'saved', label: 'المحفوظات', icon: Bookmark },
  { id: 'sounds', label: 'الأصوات', icon: Music },
];

export function ProfilePage({ user, likedVideos, savedVideos, isOwnProfile }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('videos');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifyRequested, setVerifyRequested] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleVerifyRequest = () => {
    setVerifyRequested(true);
    setTimeout(() => {
      setShowVerifyModal(false);
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'videos':
        return (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-12 h-12 text-violet-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد فيديوهات بعد
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              {isOwnProfile 
                ? 'ابدأ بمشاركة لحظاتك المميزة مع العالم'
                : 'هذا المستخدم لم يشارك أي فيديوهات بعد'}
            </p>
            {isOwnProfile && (
              <Button className="mt-6 rounded-full bg-gradient-to-r from-violet-600 to-pink-500">
                رفع فيديو جديد
              </Button>
            )}
          </div>
        );

      case 'liked':
        if (likedVideos.length === 0) {
          return (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                لا توجد فيديوهات معجب بها
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                الفيديوهات التي تعجبك ستظهر هنا
              </p>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {likedVideos.map((video) => (
              <div key={video.id} className="aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group cursor-pointer">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <Heart className="w-5 h-5 fill-white" />
                    <span>{video.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'saved':
        if (savedVideos.length === 0) {
          return (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                لا توجد محفوظات
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                احفظ الفيديوهات المفضلة لديك للوصول إليها لاحقاً
              </p>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedVideos.map((video) => (
              <div key={video.id} className="aspect-[9/16] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 relative group cursor-pointer">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Bookmark className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'sounds':
        return (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <Music className="w-12 h-12 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد أصوات محفوظة
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              الأصوات التي تحفظها ستظهر هنا
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        {isOwnProfile && (
          <div className="absolute top-4 left-4 flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Edit3 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 md:px-8 -mt-16 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-white dark:bg-gray-900">
              <img 
                src={user.avatar} 
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
                style={{ border: '4px solid transparent', background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #8b5cf6, #ec4899) border-box' }}
              />
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>

          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                @{user.username}
              </h1>
              {user.isVerified && (
                <BadgeCheck className="w-6 h-6 text-blue-500 fill-blue-500" />
              )}
            </div>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
            
            {user.bio && (
              <p className="text-gray-700 dark:text-gray-300 mt-3 max-w-lg">{user.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                الموقع
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                رابط
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                انضم {new Date(user.createdAt).toLocaleDateString('ar-SA')}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pb-4">
            {isOwnProfile ? (
              <>
                <Button 
                  variant="outline" 
                  className="rounded-full px-6 border-2"
                >
                  <Edit3 className="w-4 h-4 ml-2" />
                  تعديل الملف الشخصي
                </Button>
                {!user.isVerified && (
                  <Button 
                    variant="outline" 
                    className="rounded-full px-6 border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => setShowVerifyModal(true)}
                  >
                    <BadgeCheck className="w-4 h-4 ml-2" />
                    طلب توثيق
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  onClick={handleFollow}
                  className={cn(
                    "rounded-full px-8",
                    isFollowing 
                      ? "bg-gray-200 text-gray-900 hover:bg-gray-300" 
                      : "bg-gradient-to-r from-violet-600 to-pink-500 text-white"
                  )}
                >
                  {isFollowing ? 'متابَع' : 'متابعة'}
                </Button>
                <Button variant="outline" className="rounded-full px-6">
                  رسالة
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-8 mt-6 py-4 border-y border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.following}</p>
            <p className="text-sm text-gray-500">يتابع</p>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.followers}</p>
            <p className="text-sm text-gray-500">متابعين</p>
          </div>
          <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{user.likes}</p>
            <p className="text-sm text-gray-500">إعجابات</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'liked' && !isOwnProfile && (
                  <Lock className="w-3 h-3" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'liked' && !isOwnProfile ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  المحتوى المعجب به خاص
                </h3>
                <p className="text-gray-500">
                  الفيديوهات التي يعجب بها هذا المستخدم خاصة
                </p>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>

      {/* نافذة طلب التوثيق */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {!verifyRequested ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <BadgeCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    طلب توثيق الحساب
                  </h2>
                  <p className="text-gray-500">
                    سيتم مراجعة طلبك من قبل فريق Nase Tok. تأكد من أن حسابك يمثل شخصية عامة أو علامة تجارية معروفة.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    onClick={handleVerifyRequest}
                    className="w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                  >
                    إرسال الطلب
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowVerifyModal(false)}
                    className="w-full rounded-full"
                  >
                    إلغاء
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  تم إرسال الطلب!
                </h2>
                <p className="text-gray-500">
                  سنتواصل معك قريباً
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
