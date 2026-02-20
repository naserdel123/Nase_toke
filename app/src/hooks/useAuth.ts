import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/types';
import { getCurrentUser, setCurrentUser, getUserByEmail, saveUser } from '@/lib/storage';

interface AuthError {
  field: string;
  message: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [errors, setErrors] = useState<AuthError[]>([]);

  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const validateRegister = (data: {
    username: string;
    email: string;
    password: string;
    age: string;
  }): AuthError[] => {
    const errs: AuthError[] = [];

    if (!data.username || data.username.length < 3) {
      errs.push({ field: 'username', message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل' });
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.push({ field: 'email', message: 'البريد الإلكتروني غير صالح' });
    }

    if (!data.password || data.password.length < 6) {
      errs.push({ field: 'password', message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
    }

    const ageNum = parseInt(data.age);
    if (!data.age || isNaN(ageNum)) {
      errs.push({ field: 'age', message: 'العمر مطلوب' });
    } else if (ageNum < 13) {
      errs.push({ field: 'age', message: 'يجب أن يكون عمرك 13 سنة أو أكثر' });
    } else if (ageNum > 120) {
      errs.push({ field: 'age', message: 'العمر غير صالح' });
    }

    return errs;
  };

  const register = useCallback((data: {
    username: string;
    email: string;
    password: string;
    age: string;
    avatar: string;
  }): boolean => {
    const validationErrors = validateRegister(data);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return false;
    }

    const existingUser = getUserByEmail(data.email);
    if (existingUser) {
      setErrors([{ field: 'email', message: 'هذا البريد الإلكتروني مسجل مسبقاً' }]);
      return false;
    }

    const ageNum = parseInt(data.age);
    
    if (ageNum < 13) {
      setErrors([{ field: 'age', message: 'عذراً، يجب أن يكون عمرك 13 سنة أو أكثر' }]);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      email: data.email,
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      age: ageNum,
      bio: '',
      followers: 0,
      following: 0,
      likes: 0,
      isVerified: false,
      isLoggedIn: true,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    setUser(newUser);
    setErrors([]);
    setIsLoginModalOpen(false);
    return true;
  }, []);

  const login = useCallback((email: string, _password: string): boolean => {
    const existingUser = getUserByEmail(email);
    
    if (!existingUser) {
      setErrors([{ field: 'email', message: 'البريد الإلكتروني غير مسجل' }]);
      return false;
    }
    
    const loggedInUser = { ...existingUser, isLoggedIn: true };
    saveUser(loggedInUser);
    setCurrentUser(loggedInUser);
    setUser(loggedInUser);
    setErrors([]);
    setIsLoginModalOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    if (user) {
      const loggedOutUser = { ...user, isLoggedIn: false };
      saveUser(loggedOutUser);
    }
    setCurrentUser(null);
    setUser(null);
  }, [user]);

  const openLoginModal = useCallback(() => {
    setAuthMode('login');
    setIsLoginModalOpen(true);
    setErrors([]);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setErrors([]);
  }, []);

  const switchMode = useCallback(() => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors([]);
  }, []);

  const getFieldError = useCallback((field: string): string | null => {
    const error = errors.find(e => e.field === field);
    return error ? error.message : null;
  }, [errors]);

  return {
    user,
    isLoggedIn: !!user,
    isLoginModalOpen,
    authMode,
    errors,
    login,
    register,
    logout,
    openLoginModal,
    closeLoginModal,
    switchMode,
    getFieldError,
  };
}
