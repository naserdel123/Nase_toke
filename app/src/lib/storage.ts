import type { User, SavedItem } from '@/types';

const STORAGE_KEYS = {
  USERS: 'vibeclip_users',
  CURRENT_USER: 'vibeclip_current_user',
  LIKES: 'vibeclip_likes',
  SAVED: 'vibeclip_saved',
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(u => u.email === email) || null;
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getLikedVideos = (userId: string): string[] => {
  const data = localStorage.getItem(`${STORAGE_KEYS.LIKES}_${userId}`);
  return data ? JSON.parse(data) : [];
};

export const toggleLike = (userId: string, videoId: string): boolean => {
  const likes = getLikedVideos(userId);
  const index = likes.indexOf(videoId);
  if (index >= 0) {
    likes.splice(index, 1);
    localStorage.setItem(`${STORAGE_KEYS.LIKES}_${userId}`, JSON.stringify(likes));
    return false;
  } else {
    likes.push(videoId);
    localStorage.setItem(`${STORAGE_KEYS.LIKES}_${userId}`, JSON.stringify(likes));
    return true;
  }
};

export const getSavedItems = (userId: string): SavedItem[] => {
  const data = localStorage.getItem(`${STORAGE_KEYS.SAVED}_${userId}`);
  return data ? JSON.parse(data) : [];
};

export const toggleSave = (userId: string, itemId: string, type: 'video' | 'sound'): boolean => {
  const saved = getSavedItems(userId);
  const index = saved.findIndex(s => s.itemId === itemId);
  if (index >= 0) {
    saved.splice(index, 1);
    localStorage.setItem(`${STORAGE_KEYS.SAVED}_${userId}`, JSON.stringify(saved));
    return false;
  } else {
    saved.push({
      id: Date.now().toString(),
      type,
      itemId,
      userId,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem(`${STORAGE_KEYS.SAVED}_${userId}`, JSON.stringify(saved));
    return true;
  }
};
