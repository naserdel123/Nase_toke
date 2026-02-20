import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Lock, Mail, Calendar, Camera, Eye, EyeOff, Sparkles, AlertCircle, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onLogin: (email: string, password: string) => boolean;
  onRegister: (data: {
    username: string;
    email: string;
    password: string;
    age: string;
    avatar: string;
  }) => boolean;
  onSwitchMode: () => void;
  getFieldError: (field: string) => string | null;
}

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Molly',
];

export function AuthModal({ 
  isOpen, 
  onClose, 
  mode, 
  onLogin, 
  onRegister, 
  onSwitchMode,
  getFieldError 
}: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ageError, setAgeError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const finalAvatar = customAvatar || selectedAvatar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAgeError(null);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (mode === 'register') {
      const ageNum = parseInt(age);
      if (ageNum < 13) {
        setAgeError('عذراً، يجب أن يكون عمرك 13 سنة أو أكثر لاستخدام هذا التطبيق');
        setIsLoading(false);
        return;
      }

      const success = onRegister({
        username,
        email,
        password,
        age,
        avatar: finalAvatar,
      });
      
      if (success) {
        resetForm();
      }
    } else {
      const success = onLogin(email, password);
      if (success) {
        resetForm();
      }
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setAge('');
    setSelectedAvatar(AVATAR_OPTIONS[0]);
    setAgeError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-gray-900 border-0 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="relative pt-8 pb-4 text-center">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'مرحباً بعودتك!' : 'إنشاء حساب جديد'}
          </DialogTitle>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {mode === 'login' 
              ? 'سجل دخول للاستمتاع بمحتوى Nase Tok' 
              : 'انضم إلى مجتمع Nase Tok المبدع'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-2">
          {mode === 'register' && (
            <>
              <div className="space-y-3">
                <Label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  اختر صورة البروفايل
                </Label>
                
                {/* رفع صورة من الجهاز */}
                <div className="flex justify-center mb-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className={cn(
                      'w-20 h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all',
                      customAvatar 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                    )}>
                      {customAvatar ? (
                        <img src={customAvatar} alt="Custom" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">رفع صورة</span>
                        </>
                      )}
                    </div>
                  </label>
                </div>
                
                <p className="text-center text-sm text-gray-500 mb-2">أو اختر من التالي:</p>
                
                <div className="flex gap-3 flex-wrap justify-center">
                  {AVATAR_OPTIONS.map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setCustomAvatar(null);
                      }}
                      className={cn(
                        'w-14 h-14 rounded-full overflow-hidden border-[3px] transition-all duration-200',
                        selectedAvatar === avatar && !customAvatar
                          ? 'border-purple-500 ring-4 ring-purple-500/20 scale-110' 
                          : 'border-gray-200 hover:border-purple-300'
                      )}
                    >
                      <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  اسم المستخدم
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  className={cn(
                    "h-12 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 transition-all",
                    getFieldError('username') && "border-red-500 focus:ring-red-500"
                  )}
                />
                {getFieldError('username') && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('username')}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  العمر
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="أدخل عمرك"
                  value={age}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAge(e.target.value);
                    setAgeError(null);
                  }}
                  min="1"
                  max="120"
                  className={cn(
                    "h-12 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 transition-all",
                    (getFieldError('age') || ageError) && "border-red-500 focus:ring-red-500"
                  )}
                />
                {(getFieldError('age') || ageError) && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {getFieldError('age') || ageError}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  * يجب أن يكون عمرك 13 سنة أو أكثر
                </p>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className={cn(
                "h-12 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 transition-all",
                getFieldError('email') && "border-red-500 focus:ring-red-500"
              )}
            />
            {getFieldError('email') && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('email')}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className={cn(
                  "h-12 rounded-xl border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 transition-all pl-10",
                  getFieldError('password') && "border-red-500 focus:ring-red-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {getFieldError('password') && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {getFieldError('password')}
              </p>
            )}
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                <span className="text-gray-600 dark:text-gray-400">تذكرني</span>
              </label>
              <button type="button" className="text-purple-600 hover:text-purple-700 font-medium">
                نسيت كلمة المرور؟
              </button>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 hover:from-violet-700 hover:via-purple-700 hover:to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}...
              </div>
            ) : (
              mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-900 text-gray-500">أو</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>
          <button className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button
              type="button"
              onClick={onSwitchMode}
              className="mr-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              {mode === 'login' ? 'إنشاء حساب' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
    }
                  
