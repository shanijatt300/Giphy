
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GIFDetail from './pages/GIFDetail';
import Upload from './pages/Upload';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { User, GIF } from './types';
import { MOCK_USERS, MOCK_GIFS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [gifs, setGifs] = useState<GIF[]>([]);

  // Persistence check (simulated)
  useEffect(() => {
    const savedUser = localStorage.getItem('giphy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedGifs = localStorage.getItem('giphy_gifs');
    if (savedGifs) {
      setGifs(JSON.parse(savedGifs));
    } else {
      setGifs(MOCK_GIFS);
    }
  }, []);

  useEffect(() => {
    if (gifs.length > 0) {
      localStorage.setItem('giphy_gifs', JSON.stringify(gifs));
    }
  }, [gifs]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('giphy_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('giphy_user');
  };

  const onUpload = (newGif: GIF) => {
    setGifs(prev => [newGif, ...prev]);
  };

  const onUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setGifs(prev => prev.map(g => g.id === id ? { ...g, status } : g));
  };

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home gifs={gifs} />} />
          <Route path="/gif/:id" element={<GIFDetail gifs={gifs} />} />
          <Route path="/upload" element={user ? <Upload user={user} onUpload={onUpload} /> : <Navigate to="/login" />} />
          <Route 
            path="/admin" 
            element={user?.isAdmin ? <Admin gifs={gifs} onUpdateStatus={onUpdateStatus} user={user} onUpload={onUpload} /> : <Navigate to="/" />} 
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/search/:query" element={<Home gifs={gifs} />} />
          <Route path="/category/:slug" element={<Home gifs={gifs} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
