import React, { useState, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  BackgroundVariant 
} from '@xyflow/react';
import type { Node, Edge, Connection } from '@xyflow/react';

import { PersonNode } from './components/PersonNode';
import { Sidebar } from './components/Sidebar';
import { Moon, Sun, UserPlus } from 'lucide-react';

const nodeTypes = { person: PersonNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDark, setIsDark] = useState(false);

  const addPerson = () => {
    const id = crypto.randomUUID();
    const newNode: Node = {
      id,
      type: 'person',
      position: { x: Math.random() * 400 + 50, y: Math.random() * 400 + 50 },
      data: { 
        name: 'New Person', 
        role: 'Role',
        // Important: Initialize bio object to prevent crashes
        bio: { dob: '', location: '', education: '', work: '' } 
      },
    };
    setNodes((nds) => nds.concat(newNode));
    // Optional: Auto-select new node to open sidebar immediately
    setSelectedNode(newNode);
  };

  const onUpdateNode = (updatedData: any) => {
    setNodes((nds) => nds.map((n) => (n.id === selectedNode?.id ? { ...n, data: updatedData } : n)));
    // Update the sidebar display instantly
    setSelectedNode((prev) => (prev ? { ...prev, data: updatedData } : null));
  };

  const onDeleteNode = (id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNode(null); // Close sidebar on delete
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: isDark ? '#fff' : '#555' } }, eds)),
    [setEdges, isDark]
  );

  return (
    <div className={`${isDark ? 'dark' : ''} w-screen h-screen relative bg-slate-50 dark:bg-zinc-950 transition-colors duration-300`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => setSelectedNode(node)} // This triggers the sidebar
        onPaneClick={() => setSelectedNode(null)} // Click background to close sidebar
        nodeTypes={nodeTypes}
        fitView
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color={isDark ? '#52525b' : '#94a3b8'}
        />
        <Controls style={{ fill: isDark ? 'white' : 'black' }} />
      </ReactFlow>

      {/* Top Left Buttons */}
      <div className="absolute top-6 left-6 flex gap-3 z-10">
        <button 
          onClick={addPerson} 
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all font-bold text-sm active:scale-95"
        >
          <UserPlus size={18} /> Add Member
        </button>
        <button 
          onClick={() => setIsDark(!isDark)} 
          className="p-2.5 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-md text-slate-800 dark:text-zinc-100 transition-all"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <Sidebar 
        node={selectedNode} 
        onUpdate={onUpdateNode} 
        onClose={() => setSelectedNode(null)} 
        onDelete={onDeleteNode}
      />
    </div>
  );
}