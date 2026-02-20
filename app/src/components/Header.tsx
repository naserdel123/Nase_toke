import { Search, Upload, Bell, LogOut, User, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User as UserType } from '@/types';

interface HeaderProps {
  user: UserType | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onUploadClick: () => void;
}

export function Header({ 
  user, 
  onLoginClick, 
  onLogout, 
  onProfileClick,
  onUploadClick 
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1920px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent hidden sm:block">
            Nase Tok
          </span>
        </div>

        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
            <Input
              type="text"
              placeholder="ابحث عن فيديوهات، مستخدمين، أصوات..."
              className="w-full h-11 pr-12 pl-4 rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
          >
            <Search className="w-5 h-5" />
          </Button>

          {user ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 relative"
                onClick={onUploadClick}
              >
                <Upload className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 relative"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white dark:border-gray-900" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-2">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full border-2 border-purple-500"
                    />
                    <span className="text-sm font-medium hidden sm:block">{user.username}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-12 h-12 rounded-full border-2 border-white"
                    />
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">@{user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 my-3 p-2">
                    <div className="text-center">
                      <p className="font-bold text-gray-900 dark:text-white">{user.following}</p>
                      <p className="text-xs text-gray-500">يتابع</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900 dark:text-white">{user.followers}</p>
                      <p className="text-xs text-gray-500">متابعين</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900 dark:text-white">{user.likes}</p>
                      <p className="text-xs text-gray-500">إعجابات</p>
                    </div>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem onClick={onProfileClick} className="rounded-xl cursor-pointer">
                    <User className="w-4 h-4 ml-2" />
                    الملف الشخصي
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl cursor-pointer">
                    <Heart className="w-4 h-4 ml-2" />
                    المحتوى المعجب به
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="rounded-xl cursor-pointer text-red-500">
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="hidden sm:flex rounded-full"
                onClick={onLoginClick}
              >
                تسجيل الدخول
              </Button>
              <Button
                className="rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 hover:from-violet-700 hover:via-purple-700 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25"
                onClick={onLoginClick}
              >
                إنشاء حساب
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
