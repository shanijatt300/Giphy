
import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Grid, Star } from 'lucide-react';
import { CATEGORIES } from '../constants';
import GIFCard from '../components/GIFCard';
import { Link, useParams } from 'react-router-dom';
import { GIF } from '../types';

interface HomeProps {
  gifs: GIF[];
}

const Home: React.FC<HomeProps> = ({ gifs }) => {
  const { slug, query } = useParams();
  const [displayGifs, setDisplayGifs] = useState<GIF[]>([]);

  useEffect(() => {
    let filtered = gifs.filter(g => g.status === 'approved');

    if (slug) {
      filtered = filtered.filter(g => g.category.toLowerCase() === slug.toLowerCase());
    } else if (query) {
      filtered = filtered.filter(g => 
        g.title.toLowerCase().includes(query.toLowerCase()) || 
        g.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      );
    }

    setDisplayGifs(filtered);
  }, [gifs, slug, query]);

  return (
    <div className="space-y-12">
      {/* Featured Banner (Artist Spotlight) */}
      {!slug && !query && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[400px]">
          <div className="relative group col-span-1 md:col-span-2 overflow-hidden rounded-lg bg-gray-900 border-2 border-transparent hover:border-[#00ff99] transition-all">
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/l41lTfO7hU3XjM05y/giphy.gif" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Featured Artist" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <Star size={18} className="text-[#ffcc00] fill-[#ffcc00]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#ffcc00]">Artist Spotlight</span>
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-2">Motion Masterpieces</h2>
              <p className="text-xl font-medium text-gray-200 max-w-md">Discover the finest digital creators pushing the boundaries of the GIF format.</p>
              <Link to="/category/artists" className="mt-6 w-fit bg-white text-black px-6 py-2 font-black uppercase italic text-sm rounded hover:bg-[#00ff99] transition-colors">
                Explore Artist
              </Link>
            </div>
          </div>
          <div className="hidden lg:grid grid-rows-2 gap-4">
             {CATEGORIES.slice(2, 4).map(cat => (
               <Link key={cat.id} to={`/category/${cat.slug}`} className="relative overflow-hidden rounded-lg group border-2 border-transparent hover:border-white transition-all">
                  <img src={cat.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={cat.name} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:bg-black/20 transition-all">
                    <span className="text-2xl font-black italic uppercase tracking-tighter">{cat.name}</span>
                  </div>
               </Link>
             ))}
          </div>
        </section>
      )}

      {/* Categories Row */}
      {!slug && !query && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Grid className="text-blue-400" size={24} />
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-2"
              >
                <div 
                  className="w-full aspect-square rounded-full overflow-hidden border-4 border-transparent group-hover:border-white transition-all"
                  style={{ backgroundColor: cat.color }}
                >
                  <img src={cat.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={cat.name} />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide group-hover:text-blue-400">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Trending Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-[#00ff99]" size={24} />
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            {query ? `Results for "${query}"` : slug ? `Category: ${slug}` : 'Trending GIFs'}
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayGifs.map((gif, i) => (
            <GIFCard key={gif.id + i} gif={gif} />
          ))}
        </div>
        
        {displayGifs.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No GIFs found.
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
