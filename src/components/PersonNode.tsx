import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { User } from 'lucide-react';

export const PersonNode = memo(({ data, selected }: { data: any, selected?: boolean }) => {
  return (
    <div className="flex flex-col items-center relative group">
      {/* FIX: Inline styles for Handles to guarantee visibility.
         We removed 'opacity-0' so they are always visible for easier connecting.
      */}
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ 
          width: '12px',
          height: '12px',
          background: '#3b82f6',
          border: '2px solid white',
          borderRadius: '50%',
          top: '-5px', // Adjust position slightly up
          zIndex: 10
        }}
      />

      {/* Main Node Circle */}
      <div className={`
        relative w-20 h-20 rounded-full transition-all duration-300 
        flex items-center justify-center border-4 overflow-hidden
        ${selected ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md'}
      `}>
        {data.avatar ? (
          <img src={data.avatar} alt={data.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-zinc-400 dark:text-zinc-500">
            <User size={32} />
          </div>
        )}
      </div>

      {/* Text Labels */}
      <div className="mt-3 text-center">
        <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
          {data.name || 'New Member'}
        </div>
        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">
          {data.role || 'Unassigned'}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        style={{ 
          width: '12px',
          height: '12px',
          background: '#3b82f6',
          border: '2px solid white',
          borderRadius: '50%',
          bottom: '35px', // Positioned right at the bottom of the circle
          zIndex: 10
        }}
      />
    </div>
  );
});