/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Calendar, Cpu, ShieldCheck, Database, FileText } from 'lucide-react';

interface ERDiagramProps {
  activeTable: string;
  onSelectTable: (tableName: string) => void;
  counts: {
    userProfiles: number;
    eventContexts: number;
    networkingSessions: number;
    generatedStarters: number;
    wikipediaFactChecks: number;
    logEntries: number;
  };
}

export default function ERDiagram({ activeTable, onSelectTable, counts }: ERDiagramProps) {
  // Define positions for nodes in an SVG space (800x450 width x height)
  const nodes = [
    {
      id: 'userProfiles',
      label: 'User Profile',
      x: 120,
      y: 110,
      icon: User,
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-400',
      count: counts.userProfiles,
      attributes: ['UserID (PK)', 'BioText', 'currentEventCache']
    },
    {
      id: 'eventContexts',
      label: 'Event Context',
      x: 680,
      y: 110,
      icon: Calendar,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-400',
      count: counts.eventContexts,
      attributes: ['EventID (PK)', 'EventDescription', 'AnalyzedThemes']
    },
    {
      id: 'networkingSessions',
      label: 'Networking Session',
      x: 400,
      y: 180,
      icon: Database,
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'border-indigo-400',
      count: counts.networkingSessions,
      attributes: ['SessionID (PK)', 'UserID (FK)', 'EventID (FK)', 'SessionTimestamp']
    },
    {
      id: 'generatedStarters',
      label: 'Generated Starter',
      x: 150,
      y: 350,
      icon: Cpu,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-400',
      count: counts.generatedStarters,
      attributes: ['StarterID (PK)', 'SessionID (FK)', 'StarterText', 'ContextPromptUsed']
    },
    {
      id: 'wikipediaFactChecks',
      label: 'Wikipedia Fact Check',
      x: 400,
      y: 370,
      icon: ShieldCheck,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-400',
      count: counts.wikipediaFactChecks,
      attributes: ['FactCheckID (PK)', 'SessionID (FK)', 'VerifiedQueryText', 'VerificationStatus', 'WikipediaSourceURL']
    },
    {
      id: 'logEntries',
      label: 'Log Entry',
      x: 650,
      y: 350,
      icon: FileText,
      color: 'from-slate-600 to-slate-800',
      borderColor: 'border-slate-500',
      count: counts.logEntries,
      attributes: ['LogID (PK)', 'SessionID (FK, opt)', 'ActionType', 'PayloadJSON', 'Timestamp']
    }
  ];

  // Define relationships for connection lines
  // A relationship connects a source node to a target node
  const links = [
    {
      source: 'userProfiles',
      target: 'networkingSessions',
      sourceLabel: '1',
      targetLabel: 'Many (N)',
      path: 'M 120 160 Q 120 180 400 180' // curve/straight lines
    },
    {
      source: 'eventContexts',
      target: 'networkingSessions',
      sourceLabel: '1',
      targetLabel: 'Many (N)',
      path: 'M 680 160 Q 680 180 400 180'
    },
    {
      source: 'networkingSessions',
      target: 'generatedStarters',
      sourceLabel: '1',
      targetLabel: 'Many (N)',
      path: 'M 400 230 C 400 280 150 280 150 310'
    },
    {
      source: 'networkingSessions',
      target: 'wikipediaFactChecks',
      sourceLabel: '1',
      targetLabel: 'Many (N)',
      path: 'M 400 230 L 400 330'
    },
    {
      source: 'networkingSessions',
      target: 'logEntries',
      sourceLabel: '1',
      targetLabel: 'Many (N)',
      path: 'M 400 230 C 400 280 650 280 650 310'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Interactive Entity-Relationship Diagram</h3>
          <p className="text-xs text-slate-400">Click on any entity card to inspect its live relational table below</p>
        </div>
        <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-mono uppercase tracking-wider">
          Normalized 3NF
        </span>
      </div>

      {/* SVG Canvas for ER connectors */}
      <div className="relative w-full h-[400px] bg-slate-950/60 rounded-lg border border-slate-900 overflow-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
          {/* Connection Lines */}
          {links.map((link, idx) => {
            const isSourceActive = activeTable === link.source;
            const isTargetActive = activeTable === link.target;
            const isHighlighted = isSourceActive || isTargetActive;

            return (
              <g key={idx}>
                {/* Glow behind highlighted path */}
                {isHighlighted && (
                  <path
                    d={link.path}
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-20 blur-sm"
                  />
                )}
                <path
                  d={link.path}
                  fill="none"
                  stroke={isHighlighted ? '#6366f1' : '#334155'}
                  strokeWidth={isHighlighted ? '2' : '1.5'}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Relationship Cardinality Labels */}
                {/* Source marker (1) */}
                <circle
                  cx={link.source === 'userProfiles' ? 120 : link.source === 'eventContexts' ? 680 : 400}
                  cy={link.source === 'networkingSessions' ? 220 : 160}
                  r="6"
                  className={`${isHighlighted ? 'fill-indigo-500' : 'fill-slate-700'} transition-all`}
                />
                <text
                  x={link.source === 'userProfiles' ? 132 : link.source === 'eventContexts' ? 660 : 412}
                  y={link.source === 'networkingSessions' ? 224 : 164}
                  fill="#94a3b8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="font-bold select-none"
                >
                  {link.sourceLabel}
                </text>

                {/* Target marker (N) */}
                <circle
                  cx={link.target === 'networkingSessions' ? 400 : link.target === 'generatedStarters' ? 150 : link.target === 'wikipediaFactChecks' ? 400 : 650}
                  cy={link.target === 'networkingSessions' ? 175 : 315}
                  r="6"
                  className={`${isHighlighted ? 'fill-indigo-400' : 'fill-slate-600'} transition-all`}
                />
                <text
                  x={link.target === 'networkingSessions' ? 388 : link.target === 'generatedStarters' ? 135 : link.target === 'wikipediaFactChecks' ? 415 : 665}
                  y={link.target === 'networkingSessions' ? 172 : 310}
                  fill="#818cf8"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="font-bold select-none"
                >
                  {link.targetLabel}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating HTML Node Cards */}
        <div className="absolute inset-0 w-[800px] h-[450px] pointer-events-auto">
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = activeTable === node.id;
            
            return (
              <button
                key={node.id}
                onClick={() => onSelectTable(node.id)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute w-48 text-left rounded-lg bg-slate-900 border transition-all duration-300 shadow-lg select-none hover:shadow-indigo-500/10 group overflow-hidden ${
                  isSelected 
                    ? 'ring-2 ring-indigo-500 border-indigo-400 scale-[1.03]' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top header strip of node */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${node.color}`} />
                
                <div className="p-2 bg-slate-900/90">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400 transition-colors'}`} />
                      <span className="text-[11px] font-bold text-slate-200 tracking-tight">{node.label}</span>
                    </div>
                    {node.count > 0 && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-indigo-950 text-indigo-300 font-mono font-semibold rounded border border-indigo-500/20">
                        {node.count}
                      </span>
                    )}
                  </div>

                  {/* Attributes list */}
                  <div className="space-y-0.5 mt-1 pt-1 border-t border-slate-800/60 font-mono text-[9px] text-slate-400">
                    {node.attributes.map((attr, index) => {
                      const isPK = attr.includes('(PK)');
                      const isFK = attr.includes('(FK');
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <span className={isPK ? 'text-indigo-300 font-semibold' : isFK ? 'text-purple-300' : 'text-slate-400'}>
                            {attr.split(' ')[0]}
                          </span>
                          {isPK && <span className="text-[8px] text-indigo-400/80 font-semibold scale-90">PK</span>}
                          {isFK && <span className="text-[8px] text-purple-400/80 font-semibold scale-90">FK</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick ER Summary Map */}
      <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-slate-500 border-t border-slate-800/50 pt-2.5">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span>PK = Primary Key</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          <span>FK = Foreign Key</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-slate-400 font-bold font-mono">1 → N</span>
          <span>One-to-Many Relationship</span>
        </div>
      </div>
    </div>
  );
}
