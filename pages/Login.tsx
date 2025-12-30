
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Lock, ArrowRight } from 'lucide-react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Specific requested admin credentials check
    if (username === 'admin' && password === '12345678') {
      const adminUser: User = {
        id: 'admin-1',
        username: 'admin',
        displayName: 'System Admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        followers: 0,
        following: 0,
        isVerified: true,
        isAdmin: true
      };
      onLogin(adminUser);
      navigate('/admin');
      return;
    }

    // Regular mock login check
    const found = MOCK_USERS.find(u => u.username === username);
    if (found && password === 'password') {
       onLogin(found);
       navigate('/');
    } else {
       setError('Invalid username or password. Try "admin" / "12345678"');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm font-medium">Log in to your GIPHY account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Username</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-[#121212] border border-gray-800 rounded px-10 py-3 outline-none focus:border-[#6157ff] transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#121212] border border-gray-800 rounded px-10 py-3 outline-none focus:border-[#6157ff] transition-colors"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold italic">{error}</p>}

          <button 
            type="submit"
            className="w-full giphy-gradient h-12 rounded font-black italic uppercase tracking-tighter text-lg flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity"
          >
            Log In
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account? <Link to="/signup" className="text-blue-400 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
