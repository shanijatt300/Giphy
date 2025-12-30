
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Code, Download, MessageSquare, CheckCircle, Info, MoreHorizontal } from 'lucide-react';
import { GIF } from '../types';
import GIFCard from '../components/GIFCard';

interface GIFDetailProps {
  gifs: GIF[];
}

const GIFDetail: React.FC<GIFDetailProps> = ({ gifs }) => {
  const { id } = useParams<{ id: string }>();
  const [gif, setGif] = useState<GIF | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const found = gifs.find(g => g.id === id);
    if (found) setGif(found);
    window.scrollTo(0, 0);
  }, [id, gifs]);

  if (!gif) return <div className="text-center py-20 text-xl font-bold">GIF not found.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Creator Info */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
             <div className="flex items-center gap-3 mb-4">
               <img src={gif.user.avatar} className="w-12 h-12 rounded border border-gray-700" alt="" />
               <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{gif.user.displayName}</span>
                    {gif.user.isVerified && <CheckCircle size={14} className="text-blue-400 fill-blue-400 text-white" />}
                  </div>
                  <span className="text-xs text-gray-400">@{gif.user.username}</span>
               </div>
             </div>
             <button className="w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition-colors uppercase text-sm">Follow</button>
             <div className="mt-4 flex gap-4 text-xs text-gray-400">
               <span>{gif.user.followers.toLocaleString()} Followers</span>
               <span>{gif.user.following.toLocaleString()} Following</span>
             </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">About this GIF</h4>
            <div className="flex flex-wrap gap-2">
              {gif.tags.map(tag => (
                <Link key={tag} to={`/search/${tag}`} className="text-blue-400 hover:underline text-sm font-medium">#{tag}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center: GIF View */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">{gif.title}</h1>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center min-h-[400px]">
            <img src={gif.url} className="max-w-full max-h-[700px] object-contain" alt={gif.title} />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-800">
             <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex flex-col items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                >
                  <Heart size={28} fill={isLiked ? 'currentColor' : 'none'} />
                  <span className="text-[10px] font-bold uppercase">Favorite</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                  <Share2 size={28} />
                  <span className="text-[10px] font-bold uppercase">Share</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                  <Code size={28} />
                  <span className="text-[10px] font-bold uppercase">Embed</span>
                </button>
             </div>
             
             <div className="flex items-center gap-3">
                <div className="bg-gray-800 px-3 py-1 rounded text-[10px] font-black uppercase text-gray-300">
                  Rating: {gif.rating.toUpperCase()}
                </div>
                <button className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition-colors">
                  <Download size={20} />
                </button>
                <button className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
             </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black italic uppercase tracking-tighter flex items-center gap-2">
              <MessageSquare size={20} className="text-yellow-500" />
              Comments
            </h3>
            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
               <input 
                 placeholder="Write a comment..." 
                 className="flex-1 bg-transparent border-b border-gray-700 outline-none focus:border-white py-1 transition-colors"
               />
               <button className="text-blue-400 font-bold text-sm">Post</button>
            </div>
            <p className="text-center text-gray-500 text-sm py-4 italic">No comments yet. Be the first!</p>
          </div>
        </div>

        {/* Right Side: Related */}
        <div className="w-full lg:w-1/4 space-y-6">
          <h4 className="text-lg font-black italic uppercase tracking-tighter">Related GIFs</h4>
          <div className="flex flex-col gap-4">
            {gifs.filter(g => g.id !== gif.id && g.status === 'approved').slice(0, 5).map(g => (
              <GIFCard key={g.id} gif={g} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GIFDetail;
