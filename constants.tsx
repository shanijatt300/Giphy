
import React from 'react';
import { GIF, Category, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'giphy-pro',
    displayName: 'GIPHY Pro',
    avatar: 'https://picsum.photos/seed/user1/200',
    followers: 15400,
    following: 120,
    isVerified: true,
    isAdmin: true,
  },
  {
    id: 'u2',
    username: 'animator99',
    displayName: 'Creative Cat',
    avatar: 'https://picsum.photos/seed/user2/200',
    followers: 850,
    following: 340,
    isVerified: false,
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Reactions', slug: 'reactions', color: '#ff6666', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/3o7TKSj0EY3E9g5O48/giphy.gif' },
  { id: '2', name: 'Entertainment', slug: 'entertainment', color: '#ffcc00', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/l41lTfO7hU3XjM05y/giphy.gif' },
  { id: '3', name: 'Sports', slug: 'sports', color: '#00ff99', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/l2JHZKNM1vLpT6M6I/giphy.gif' },
  { id: '5', name: 'Artists', slug: 'artists', color: '#6157ff', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/3o7TKMGf8nS9R6N9fG/giphy.gif' },
];

// Seed some initial GIFs
export const MOCK_GIFS: GIF[] = [
  {
    id: 'g1',
    title: 'Happy Dance',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/vO8F4fYQ8D0Na/giphy.gif',
    thumbnail: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/vO8F4fYQ8D0Na/giphy_s.gif',
    user: MOCK_USERS[0],
    tags: ['happy', 'dance', 'excited'],
    views: 12500,
    likes: 450,
    rating: 'g',
    createdAt: '2023-10-01',
    category: 'Reactions',
    status: 'approved'
  },
  {
    id: 'g2',
    title: 'Mind Blown',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/26ufdipLchak65Aph/giphy.gif',
    thumbnail: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/26ufdipLchak65Aph/giphy_s.gif',
    user: MOCK_USERS[1],
    tags: ['wow', 'mind blown', 'shock'],
    views: 89000,
    likes: 3200,
    rating: 'g',
    createdAt: '2023-11-15',
    category: 'Reactions',
    status: 'approved'
  },
  {
    id: 'g3',
    title: 'Coding Time',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/o0vwzuFwCGAFO/giphy.gif',
    thumbnail: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/o0vwzuFwCGAFO/giphy_s.gif',
    user: MOCK_USERS[0],
    tags: ['code', 'hacker', 'typing'],
    views: 5400,
    likes: 120,
    rating: 'pg',
    createdAt: '2023-12-05',
    category: 'Entertainment',
    status: 'approved'
  },
  {
    id: 'g4',
    title: 'Cat Typing Fast',
    url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/3o7TKMGf8nS9R6N9fG/giphy.gif',
    thumbnail: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/3o7TKMGf8nS9R6N9fG/giphy_s.gif',
    user: MOCK_USERS[1],
    tags: ['cat', 'funny', 'work'],
    views: 120000,
    likes: 5600,
    rating: 'g',
    createdAt: '2024-01-10',
    category: 'Artists',
    status: 'approved'
  }
];
