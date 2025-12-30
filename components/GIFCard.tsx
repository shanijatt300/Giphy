
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, MoreVertical, CheckCircle } from 'lucide-react';
import { GIF } from '../types';

interface GIFCardProps {
  gif: GIF;
}

const GIFCard: React.FC<GIFCardProps> = ({ gif }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className="relative group rounded overflow-hidden aspect-video bg-gray-900 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/gif/${gif.id}`}>
        <img 
          src={isHovered ? gif.url : gif.thumbnail} 
          alt={gif.title}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </Link>
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
             <img src={gif.user.avatar} className="w-6 h-6 rounded-sm flex-shrink-0" alt="" />
             <div className="truncate">
               <div className="flex items-center gap-1">
                 <span className="text-xs font-bold truncate">{gif.user.displayName}</span>
                 {gif.user.isVerified && <CheckCircle size={10} className="text-blue-400 fill-blue-400 text-white" />}
               </div>
               <span className="text-[10px] text-gray-400 block truncate">{gif.title}</span>
             </div>
          </div>
          <div className="flex gap-2">
             <button 
              onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
              className={`${isLiked ? 'text-red-500' : 'text-white'} hover:scale-110 transition-transform`}
             >
               <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
             </button>
             <button className="text-white hover:scale-110 transition-transform">
               <Share2 size={18} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GIFCard;
