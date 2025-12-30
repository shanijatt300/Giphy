
import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileVideo, Info, X, Wand2, Check } from 'lucide-react';
import { generateTagsForUpload } from '../services/geminiService';
import { CATEGORIES } from '../constants';
import { User, GIF } from '../types';
import { useNavigate } from 'react-router-dom';

interface UploadProps {
  user: User;
  onUpload: (gif: GIF) => void;
}

const Upload: React.FC<UploadProps> = ({ user, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleAutoTag = async () => {
    if (!title && !description) return;
    setIsGeneratingTags(true);
    const suggested = await generateTagsForUpload(title, description);
    setTags(Array.from(new Set([...tags, ...suggested])));
    setIsGeneratingTags(false);
  };

  const removeTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newGif: GIF = {
        id: Math.random().toString(36).substr(2, 9),
        title: title,
        url: preview || 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/vO8F4fYQ8D0Na/giphy.gif',
        thumbnail: preview || 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjh2Y3d2Ym1ybmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2bmZ2/vO8F4fYQ8D0Na/giphy_s.gif',
        user: user,
        tags: tags,
        views: 0,
        likes: 0,
        rating: 'g',
        createdAt: new Date().toISOString(),
        category: category,
        status: user.isAdmin ? 'approved' : 'pending'
      };

      onUpload(newGif);
      setIsUploading(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate(user.isAdmin ? '/admin' : '/');
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <Check size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Success!</h2>
        <p className="text-gray-400">
          {user.isAdmin 
            ? "Your GIF has been uploaded and is live!" 
            : "Your GIF has been submitted and is pending approval from the GIPHY team."}
        </p>
        <p className="text-sm text-gray-500">Redirecting you now...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">Upload Content</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Box */}
        <div className="space-y-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-square border-4 border-dashed rounded-xl flex flex-col items-center justify-center p-8 transition-all cursor-pointer ${preview ? 'border-[#6157ff]' : 'border-gray-800 hover:border-gray-600'}`}
          >
            {preview ? (
              <div className="relative w-full h-full">
                {file?.type.includes('video') ? (
                  <video src={preview} className="w-full h-full object-contain" autoPlay loop muted />
                ) : (
                  <img src={preview} className="w-full h-full object-contain" alt="" />
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                  className="absolute top-2 right-2 bg-black/70 p-2 rounded-full hover:bg-black"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <UploadIcon className="text-gray-400" size={32} />
                </div>
                <p className="font-bold text-center">Click to browse or drag and drop</p>
                <p className="text-sm text-gray-500 text-center mt-2">MP4, MOV, GIF, PNG or JPEG. Max 100MB.</p>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="video/*,image/*" 
            />
          </div>
          
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg flex gap-3">
             <Info className="text-blue-400 flex-shrink-0" size={20} />
             <p className="text-xs text-blue-200">
               Videos will be automatically converted to optimized high-quality GIFs. We support trimming and crop in the next step.
             </p>
          </div>
        </div>

        {/* Details Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title</label>
            <input 
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your GIF a name..." 
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded px-4 py-3 outline-none focus:border-[#6157ff] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded px-4 py-3 outline-none focus:border-[#6157ff] transition-colors"
            >
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What's happening in this GIF?" 
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded px-4 py-3 outline-none focus:border-[#6157ff] transition-colors resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Tags</label>
              <button 
                type="button"
                onClick={handleAutoTag}
                disabled={isGeneratingTags || (!title && !description)}
                className="flex items-center gap-1 text-xs font-bold text-[#00ccff] hover:text-[#00ff99] disabled:opacity-50 transition-colors"
              >
                <Wand2 size={14} />
                {isGeneratingTags ? 'Analyzing...' : 'Auto-Generate Tags'}
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-[#1a1a1a] border border-gray-800 rounded">
              {tags.map((tag, i) => (
                <span key={i} className="bg-gray-800 px-3 py-1 rounded-full text-xs flex items-center gap-2 group">
                  #{tag}
                  <button type="button" onClick={() => removeTag(i)} className="text-gray-500 hover:text-white">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input 
                placeholder="Press enter to add..." 
                className="bg-transparent text-sm outline-none flex-1 min-w-[100px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      setTags([...tags, val]);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!file || !title || isUploading}
            className="w-full giphy-gradient text-white font-black italic uppercase tracking-tighter py-4 rounded text-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload to GIPHY'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
