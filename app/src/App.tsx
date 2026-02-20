import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { AuthModal } from '@/components/AuthModal';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LikedPage } from '@/pages/LikedPage';
import { SavedPage } from '@/pages/SavedPage';
import { SoundsPage } from '@/pages/SoundsPage';
import { useAuth } from '@/hooks/useAuth';
import { getLikedVideos, getSavedItems } from '@/lib/storage';
import type { Video } from '@/types';
import { Users, Settings, HelpCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DEMO_VIDEOS: Video[] = [];

function App() {
  const { 
    user, 
    isLoggedIn, 
    isLoginModalOpen, 
    authMode,
    login, 
    register,
    logout, 
    openLoginModal,
    closeLoginModal,
    switchMode,
    getFieldError
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState('home');
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);
  const [savedVideos, setSavedVideos] = useState<Video[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    if (user) {
      const likedIds = getLikedVideos(user.id);
      const savedItems = getSavedItems(user.id).filter(s => s.type === 'video');
      
      setLikedVideos(DEMO_VIDEOS.filter(v => likedIds.includes(v.id)));
      setSavedVideos(DEMO_VIDEOS.filter(v => savedItems.some(s => s.itemId === v.id)));
    }
  }, [user]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            userId={user?.id || null}
            isLoggedIn={isLoggedIn}
            onLoginRequired={openLoginModal}
          />
        );
      
      case 'explore':
        return <ExplorePage />;
      
      case 'following':
        return isLoggedIn ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              المتابعون
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              شاهد أحدث الفيديوهات من الأشخاص الذين تتابعهم
            </p>
          </div>
        ) : (
          <LockedContent message="سجل دخول لرؤية المتابعين" onLogin={openLoginModal} />
        );
      
      case 'profile':
        return user ? (
          <ProfilePage 
            user={user}
            likedVideos={likedVideos}
            savedVideos={savedVideos}
            isOwnProfile={true}
          />
        ) : (
          <LockedContent message="سجل دخول لرؤية الملف الشخصي" onLogin={openLoginModal} />
        );
      
      case 'liked':
        return (
          <LikedPage 
            likedVideos={likedVideos}
            isLoggedIn={isLoggedIn}
            onLoginRequired={openLoginModal}
          />
        );
      
      case 'saved':
        return (
          <SavedPage 
            savedVideos={savedVideos}
            isLoggedIn={isLoggedIn}
            onLoginRequired={openLoginModal}
          />
        );
      
      case 'sounds':
        return (
          <SoundsPage 
            isLoggedIn={isLoggedIn}
            onLoginRequired={openLoginModal}
          />
        );
      
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-violet-500" />
              الإعدادات
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {['الحساب', 'الخصوصية', 'الإشعارات', 'المظهر', 'اللغة', 'المساعدة'].map((setting) => (
                <button
                  key={setting}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <span className="text-gray-900 dark:text-white font-medium">{setting}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'help':
        return (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              المساعدة
            </h2>
            <p className="text-gray-500 max-w-md mx-auto">
              هل تحتاج مساعدة؟ تواصل مع فريق الدعم
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header 
        user={user} 
        onLoginClick={openLoginModal}
        onLogout={logout}
        onProfileClick={() => setActiveTab('profile')}
        onUploadClick={() => setShowUploadModal(true)}
      />

      <Sidebar 
        isLoggedIn={isLoggedIn}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfileClick={() => setActiveTab('profile')}
      />

      <main className="lg:mr-64 pt-16 min-h-screen">
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        mode={authMode}
        onLogin={login}
        onRegister={register}
        onSwitchMode={switchMode}
        getFieldError={getFieldError}
      />

      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              رفع فيديو جديد
            </h2>
            <p className="text-gray-500 mb-6">
              هذه الميزة قيد التطوير. ستتوفر قريباً!
            </p>
            <Button 
              onClick={() => setShowUploadModal(false)}
              className="w-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500"
            >
              حسناً
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface LockedContentProps {
  message: string;
  onLogin: () => void;
}

function LockedContent({ message, onLogin }: LockedContentProps) {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center mx-auto mb-6">
        <Lock className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        محتوى محمي
      </h2>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        {message}
      </p>
      <Button
        onClick={onLogin}
        className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-purple-500/25"
      >
        تسجيل الدخول
      </Button>
    </div>
  );
}

export default App;
