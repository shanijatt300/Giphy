
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Upload, MoreVertical, Menu, X, User as UserIcon, 
  Heart, Settings, LayoutDashboard, LogOut, ChevronDown, 
  ShieldAlert, Users, Layers, BarChart 
} from 'lucide-react';
import { CATEGORIES } from '../constants';
import { getSearchSuggestions } from '../services/geminiService';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const adminMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
        setIsAdminMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSuggestions([]);
    }
  };

  const onSearchChange = async (val: string) => {
    setSearchQuery(val);
    if (val.length > 2) {
      const res = await getSearchSuggestions(val);
      setSuggestions(res);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#121212] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-4xl font-black italic tracking-tighter flex items-center shrink-0">
              <span className="text-white">GIPHY</span>
              <div className="w-4 h-4 giphy-gradient ml-1 rounded-sm"></div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-4 text-sm font-bold uppercase tracking-wide">
              {CATEGORIES.slice(0, 4).map(cat => (
                <Link key={cat.id} to={`/category/${cat.slug}`} className="hover:text-gray-400 transition-colors">
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex-1 max-w-2xl relative">
            <form onSubmit={handleSearch} className="flex h-10">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search all the GIFs"
                className="w-full bg-white text-black px-4 font-medium outline-none rounded-l"
              />
              <button type="submit" className="giphy-gradient px-4 rounded-r hover:opacity-90 transition-opacity">
                <Search className="text-white" size={24} />
              </button>
            </form>
            
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-[#1a1a1a] border border-gray-800 shadow-xl rounded-b overflow-hidden z-[60]">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(s);
                      navigate(`/search/${s}`);
                      setSuggestions([]);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 text-sm transition-colors border-b border-gray-800 last:border-none"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/upload" className="hidden sm:flex items-center gap-2 bg-[#6157ff] px-4 py-2 font-bold uppercase text-xs rounded hover:opacity-90 transition-opacity">
              <Upload size={16} />
              Upload
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Admin Menu */}
                {user.isAdmin && (
                  <div className="relative" ref={adminMenuRef}>
                    <button 
                      onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
                      className="flex items-center gap-1 bg-yellow-600/20 text-yellow-500 px-3 py-2 rounded text-xs font-bold uppercase hover:bg-yellow-600/30 transition-colors"
                    >
                      <ShieldAlert size={16} />
                      <span className="hidden md:block">Admin</span>
                      <ChevronDown size={14} />
                    </button>
                    {isAdminMenuOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-700">
                           <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Administrator</p>
                        </div>
                        <Link to="/admin" onClick={() => setIsAdminMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic">
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic text-left">
                          <Users size={18} />
                          User Management
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic text-left">
                          <Layers size={18} />
                          Review Content
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic text-left">
                          <BarChart size={18} />
                          Analytics
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 group p-1"
                  >
                    <img src={user.avatar} className="w-8 h-8 rounded border border-gray-700 group-hover:border-white transition-colors" alt="" />
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-white" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-800 rounded shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-4 border-b border-gray-800 bg-gray-800/30">
                        <p className="font-bold text-sm">{user.displayName}</p>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                      </div>
                      <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic">
                        <UserIcon size={18} />
                        Profile
                      </Link>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic text-left">
                        <Heart size={18} />
                        Favorites
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors text-sm font-bold uppercase italic text-left">
                        <Settings size={18} />
                        Settings
                      </button>
                      <button 
                        onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-900/20 text-red-500 transition-colors text-sm font-bold uppercase italic text-left border-t border-gray-800"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-gray-800 px-4 py-2 font-bold uppercase text-xs rounded hover:bg-gray-700 transition-colors">
                Log In
              </Link>
            )}
            
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex flex-col p-6 animate-in fade-in slide-in-from-right duration-300">
          <button onClick={() => setIsSidebarOpen(false)} className="self-end mb-8 text-gray-400 hover:text-white">
            <X size={32} />
          </button>
          <div className="flex flex-col gap-6 text-2xl font-black uppercase italic tracking-tighter overflow-y-auto">
            <Link to="/" onClick={() => setIsSidebarOpen(false)} className="hover:text-blue-400">Trending</Link>
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="hover:text-blue-400">
                {cat.name}
              </Link>
            ))}
            <hr className="border-gray-800" />
            <Link to="/upload" onClick={() => setIsSidebarOpen(false)} className="text-[#6157ff]">Upload Content</Link>
            {user && user.isAdmin && (
              <Link to="/admin" onClick={() => setIsSidebarOpen(false)} className="text-yellow-500">Admin Dashboard</Link>
            )}
            <Link to="/profile" onClick={() => setIsSidebarOpen(false)}>My Profile</Link>
            {user ? (
               <button onClick={() => { onLogout(); setIsSidebarOpen(false); }} className="text-left text-red-500">Log Out</button>
            ) : (
               <Link to="/login" onClick={() => setIsSidebarOpen(false)}>Log In / Sign Up</Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-gray-800 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-4">
            <div className="text-4xl font-black italic tracking-tighter flex items-center justify-center md:justify-start">
              <span className="text-white">GIPHY</span>
              <div className="w-4 h-4 giphy-gradient ml-1 rounded-sm"></div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              GIPHY is your top source for the best & newest GIFs online.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase text-gray-400">
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">DMCA</Link>
            <Link to="#" className="hover:text-white transition-colors">Support</Link>
          </div>
          <p className="text-gray-500 text-xs">
            © 2024 GIPHY Pro. Be Animated.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
