
import React, { useState } from 'react';
import { LayoutDashboard, Users, Image as ImageIcon, MessageSquare, BarChart3, AlertTriangle, ShieldCheck, MoreVertical, Trash2, Check, X as XIcon, Upload } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { GIF, User } from '../types';
import UploadPage from './Upload';

interface AdminProps {
  gifs: GIF[];
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
  user: User;
  onUpload: (gif: GIF) => void;
}

const Admin: React.FC<AdminProps> = ({ gifs, onUpdateStatus, user, onUpload }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'moderation' | 'upload'>('overview');
  const [users, setUsers] = useState(MOCK_USERS);

  const deleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const pendingGifs = gifs.filter(g => g.status === 'pending');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <h1 className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3">
           <LayoutDashboard size={32} className="text-[#6157ff]" />
           Admin Dashboard
         </h1>
         
         <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-gray-800">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${activeTab === 'overview' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${activeTab === 'users' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              Users
            </button>
            <button 
              onClick={() => setActiveTab('moderation')}
              className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${activeTab === 'moderation' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              Moderation {pendingGifs.length > 0 && <span className="ml-1 bg-red-500 text-white px-1.5 rounded-full text-[10px]">{pendingGifs.length}</span>}
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2 text-xs font-bold uppercase rounded transition-colors ${activeTab === 'upload' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              Upload
            </button>
         </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Users', value: (users.length * 1024).toLocaleString(), icon: Users, color: 'text-blue-400' },
              { label: 'Total GIFs', value: gifs.length.toLocaleString(), icon: ImageIcon, color: 'text-pink-400' },
              { label: 'Moderation Queue', value: pendingGifs.length.toString(), icon: AlertTriangle, color: 'text-yellow-400' },
              { label: 'Active Reports', value: '12', icon: ShieldCheck, color: 'text-red-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon size={24} className={stat.color} />
                  <BarChart3 size={20} className="text-gray-600" />
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold uppercase tracking-wide">Recent Pending Uploads</h3>
                    <button onClick={() => setActiveTab('moderation')} className="text-xs text-blue-400 hover:underline">View All</button>
                  </div>
                  <div className="divide-y divide-gray-800">
                    {pendingGifs.length > 0 ? pendingGifs.slice(0, 5).map(g => (
                      <div key={g.id} className="p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-900 rounded overflow-hidden">
                            <img src={g.thumbnail} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{g.title}</p>
                            <p className="text-xs text-gray-500">by @{g.user.username} in {g.category}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => onUpdateStatus(g.id, 'approved')}
                            className="p-2 text-green-400 hover:bg-green-600/20 rounded transition-colors"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={() => onUpdateStatus(g.id, 'rejected')}
                            className="p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                          >
                            <XIcon size={20} />
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="p-10 text-center text-gray-500 italic">No pending GIFs to review.</div>
                    )}
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                 <h3 className="font-bold uppercase tracking-wide mb-6">Traffic Overview</h3>
                 <div className="space-y-6">
                   {[
                     { label: 'Mobile App', percentage: 70, color: 'bg-blue-500' },
                     { label: 'Web Browsers', percentage: 22, color: 'bg-purple-500' },
                     { label: 'API / Embeds', percentage: 8, color: 'bg-green-500' },
                   ].map((item, i) => (
                     <div key={i}>
                       <div className="flex justify-between text-xs font-bold mb-2">
                         <span className="text-gray-400 uppercase">{item.label}</span>
                         <span>{item.percentage}%</span>
                       </div>
                       <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                         <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }}></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'users' && (
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/20">
              <h3 className="font-bold uppercase tracking-wide italic">User Management</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="bg-[#121212] border border-gray-700 rounded px-3 py-1 text-sm outline-none focus:border-[#6157ff]"
                />
              </div>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-gray-800 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                   <th className="px-6 py-4">User</th>
                   <th className="px-6 py-4">Stats</th>
                   <th className="px-6 py-4">Status</th>
                   <th className="px-6 py-4">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-800">
                 {users.map(u => (
                   <tr key={u.id} className="hover:bg-white/5 transition-colors">
                     <td className="px-6 py-4">
                       <div className="flex items-center gap-3">
                         <img src={u.avatar} className="w-10 h-10 rounded border border-gray-800" alt="" />
                         <div>
                            <p className="font-bold text-sm">{u.displayName}</p>
                            <p className="text-xs text-gray-500">@{u.username}</p>
                         </div>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       <div className="text-xs">
                         <p className="font-bold">{u.followers.toLocaleString()} Followers</p>
                         <p className="text-gray-500">{u.following} Following</p>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                       {u.isAdmin ? (
                         <span className="bg-yellow-600/20 text-yellow-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">Admin</span>
                       ) : (
                         <span className="bg-blue-600/20 text-blue-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">User</span>
                       )}
                       {u.isVerified && <span className="ml-2 text-blue-400 font-bold text-[10px] uppercase">Verified</span>}
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex gap-2">
                           <button className="p-2 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-white"><MoreVertical size={16} /></button>
                           {!u.isAdmin && (
                             <button 
                               onClick={() => deleteUser(u.id)}
                               className="p-2 hover:bg-red-900/20 rounded transition-colors text-red-500"
                             >
                               <Trash2 size={16} />
                             </button>
                           )}
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      )}

      {activeTab === 'moderation' && (
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/20">
              <h3 className="font-bold uppercase tracking-wide italic">Content Moderation Queue</h3>
              <p className="text-xs text-gray-400">{pendingGifs.length} items pending review</p>
           </div>
           {pendingGifs.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {pendingGifs.map((g) => (
                  <div key={g.id} className="relative aspect-video group bg-black rounded-lg overflow-hidden border border-gray-800">
                    <img 
                      src={g.url} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button 
                        onClick={() => onUpdateStatus(g.id, 'approved')}
                        className="bg-green-600 p-3 rounded-full hover:scale-110 transition-transform shadow-xl"
                       >
                         <Check size={24} />
                       </button>
                       <button 
                        onClick={() => onUpdateStatus(g.id, 'rejected')}
                        className="bg-red-600 p-3 rounded-full hover:scale-110 transition-transform shadow-xl"
                       >
                         <XIcon size={24} />
                       </button>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                       <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded">@{g.user.username}</span>
                       <span className="text-[10px] font-bold bg-blue-600 px-2 py-0.5 rounded text-white italic">{g.category}</span>
                    </div>
                    <div className="absolute top-2 left-2 pointer-events-none">
                       <span className="text-[10px] font-bold bg-yellow-600 px-2 py-0.5 rounded text-black italic">PENDING REVIEW</span>
                    </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="p-20 text-center text-gray-500 italic">No pending GIFs to review. Great job!</div>
           )}
        </div>
      )}

      {activeTab === 'upload' && (
        <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-8">
           <div className="mb-6">
              <h3 className="text-xl font-bold uppercase italic tracking-tighter">Admin Fast Upload</h3>
              <p className="text-gray-400 text-sm">Upload content that skips the moderation queue.</p>
           </div>
           <UploadPage user={user} onUpload={onUpload} />
        </div>
      )}
    </div>
  );
};

export default Admin;
