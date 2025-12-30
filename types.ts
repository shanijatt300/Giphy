
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  isVerified: boolean;
  isAdmin?: boolean;
}

export interface GIF {
  id: string;
  title: string;
  url: string; // The animated GIF URL
  thumbnail: string; // Static preview
  user: User;
  tags: string[];
  views: number;
  likes: number;
  rating: 'g' | 'pg' | 'pg-13' | 'r';
  createdAt: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  image: string;
}

export interface Comment {
  id: string;
  gifId: string;
  userId: string;
  text: string;
  timestamp: string;
  username: string;
  avatar: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
