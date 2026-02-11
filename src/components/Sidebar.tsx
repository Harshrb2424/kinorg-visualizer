import React from 'react';
import { X, Upload, Trash2, Calendar, MapPin, GraduationCap, Briefcase } from 'lucide-react';

export const Sidebar = ({ node, onUpdate, onClose, onDelete }: any) => {
  // If no node is selected, don't render anything
  if (!node) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpdate({ ...node.data, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const updateBio = (key: string, val: string) => {
    onUpdate({
      ...node.data,
      bio: { ...node.data.bio, [key]: val }
    });
  };

  return (
    // FIXED: Removed 'animate-in', used standard 'w-96', added explicit z-index and background
    <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-700 shadow-2xl z-[100] p-6 overflow-y-auto transition-transform duration-200 ease-in-out">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider">
          Profile Details
        </h2>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-8">
        {/* Profile Image Uploader */}
        <div className="flex flex-col items-center">
          <label className="relative cursor-pointer group">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden flex items-center justify-center hover:border-blue-500 transition-colors bg-zinc-50 dark:bg-zinc-800">
              {node.data.avatar ? (
                <img src={node.data.avatar} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <Upload size={32} className="text-zinc-400" />
              )}
            </div>
            <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
          </label>
          <span className="text-xs font-bold text-blue-500 mt-2 uppercase">Click to Upload Photo</span>
        </div>

        {/* Basic Info Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase block mb-1">Full Name</label>
            <input 
              className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              value={node.data.name || ''}
              onChange={(e) => onUpdate({ ...node.data, name: e.target.value })}
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase block mb-1">Role / Title</label>
            <input 
              className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              value={node.data.role || ''}
              onChange={(e) => onUpdate({ ...node.data, role: e.target.value })}
              placeholder="e.g. Manager"
            />
          </div>
        </div>

        <hr className="border-zinc-200 dark:border-zinc-800" />

        {/* Bio Details */}
        <div className="space-y-5">
          {/* DOB */}
          <div className="flex items-center gap-4">
            <Calendar size={18} className="text-zinc-400" />
            <input 
              type="date"
              className="flex-1 bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm outline-none text-zinc-800 dark:text-zinc-200"
              value={node.data.bio?.dob || ''}
              onChange={(e) => updateBio('dob', e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-4">
            <MapPin size={18} className="text-zinc-400" />
            <input 
              placeholder="Location"
              className="flex-1 bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm outline-none text-zinc-800 dark:text-zinc-200"
              value={node.data.bio?.location || ''}
              onChange={(e) => updateBio('location', e.target.value)}
            />
          </div>

          {/* Education */}
          <div className="flex items-center gap-4">
            <GraduationCap size={18} className="text-zinc-400" />
            <input 
              placeholder="Education"
              className="flex-1 bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm outline-none text-zinc-800 dark:text-zinc-200"
              value={node.data.bio?.education || ''}
              onChange={(e) => updateBio('education', e.target.value)}
            />
          </div>

          {/* Work History */}
          <div className="flex items-start gap-4">
            <Briefcase size={18} className="text-zinc-400 mt-2" />
            <textarea 
              placeholder="Work History & Notes..."
              rows={3}
              className="flex-1 bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-2 text-sm outline-none text-zinc-800 dark:text-zinc-200 resize-none"
              value={node.data.bio?.work || ''}
              onChange={(e) => updateBio('work', e.target.value)}
            />
          </div>
        </div>

        {/* Delete Button */}
        <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
          <button 
            onClick={() => onDelete(node.id)}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors font-bold text-sm"
          >
            <Trash2 size={16} /> Delete Member
          </button>
        </div>
      </div>
    </div>
  );
};