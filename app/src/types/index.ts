export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  age: number;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  isVerified: boolean;
  isLoggedIn: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  createdAt: string;
  duration: number;
}

export interface SavedItem {
  id: string;
  type: 'video' | 'sound';
  itemId: string;
  userId: string;
  savedAt: string;
}
