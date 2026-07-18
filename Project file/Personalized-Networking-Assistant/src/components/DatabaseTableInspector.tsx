/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserProfile, 
  EventContext, 
  NetworkingSession, 
  GeneratedStarter, 
  WikipediaFactCheck, 
  LogEntry, 
  AppDatabaseState 
} from '../types';
import { Database, FileCode, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight, Download } from 'lucide-react';

interface DatabaseTableInspectorProps {
  db: AppDatabaseState;
  activeTable: string;
  onSelectTable: (tableName: string) => void;
  onClearDatabase: () => void;
}

export default function DatabaseTableInspector({ db, activeTable, onSelectTable, onClearDatabase }: DatabaseTableInspectorProps) {
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const tables = [
    { id: 'userProfiles', label: 'User Profile', count: db.userProfiles.length, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { id: 'eventContexts', label: 'Event Context', count: db.eventContexts.length, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { id: 'networkingSessions', label: 'Networking Session', count: db.networkingSessions.length, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { id: 'generatedStarters', label: 'Generated Starter', count: db.generatedStarters.length, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { id: 'wikipediaFactChecks', label: 'Wikipedia Fact Check', count: db.wikipediaFactChecks.length, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { id: 'logEntries', label: 'Log Entry', count: db.logEntries.length, color: 'text-slate-400 bg-slate-500/10 border-slate-500/20' }
  ];

  // Helper to generate a seeder SQL file for download
  const handleExportSQL = () => {
    let sql = `-- SQL Schema & Seeding Script for Personalized Networking Assistant
-- Generated automatically on ${new Date().toISOString().split('T')[0]}

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS UserProfile (
    UserID VARCHAR(255) PRIMARY KEY,
    BioText TEXT NOT NULL,
    currentEventCache TEXT
);

CREATE TABLE IF NOT EXISTS EventContext (
    EventID VARCHAR(255) PRIMARY KEY,
    EventDescription TEXT NOT NULL,
    AnalyzedThemes TEXT[]
);

CREATE TABLE IF NOT EXISTS NetworkingSession (
    SessionID VARCHAR(255) PRIMARY KEY,
    UserID VARCHAR(255) REFERENCES UserProfile(UserID) ON DELETE CASCADE,
    EventID VARCHAR(255) REFERENCES EventContext(EventID) ON DELETE CASCADE,
    SessionTimestamp TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS GeneratedStarter (
    StarterID VARCHAR(255) PRIMARY KEY,
    SessionID VARCHAR(255) REFERENCES NetworkingSession(SessionID) ON DELETE CASCADE,
    StarterText TEXT NOT NULL,
    ContextPromptUsed TEXT
);

CREATE TABLE IF NOT EXISTS WikipediaFactCheck (
    FactCheckID VARCHAR(255) PRIMARY KEY,
    SessionID VARCHAR(255) REFERENCES NetworkingSession(SessionID) ON DELETE CASCADE,
    VerifiedQueryText TEXT NOT NULL,
    VerificationStatus VARCHAR(50) NOT NULL,
    WikipediaSourceURL TEXT
);

CREATE TABLE IF NOT EXISTS LogEntry (
    LogID VARCHAR(255) PRIMARY KEY,
    SessionID VARCHAR(255) REFERENCES NetworkingSession(SessionID) ON DELETE SET NULL,
    ActionType VARCHAR(100) NOT NULL,
    PayloadJSON TEXT,
    Timestamp TIMESTAMP NOT NULL
);

-- 2. Insert Active Seed Data
`;

    // Add UserProfiles
    db.userProfiles.forEach(p => {
      sql += `INSERT INTO UserProfile (UserID, BioText, currentEventCache) VALUES ('${p.UserID}', '${p.BioText.replace(/'/g, "''")}', '${p.currentEventCache.replace(/'/g, "''")}') ON CONFLICT (UserID) DO UPDATE SET BioText = EXCLUDED.BioText;\n`;
    });

    // Add EventContexts
    db.eventContexts.forEach(e => {
      const themesArrStr = `ARRAY[${e.AnalyzedThemes.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')}]`;
      sql += `INSERT INTO EventContext (EventID, EventDescription, AnalyzedThemes) VALUES ('${e.EventID}', '${e.EventDescription.replace(/'/g, "''")}', ${themesArrStr}) ON CONFLICT (EventID) DO UPDATE SET EventDescription = EXCLUDED.EventDescription;\n`;
    });

    // Add NetworkingSessions
    db.networkingSessions.forEach(s => {
      sql += `INSERT INTO NetworkingSession (SessionID, UserID, EventID, SessionTimestamp) VALUES ('${s.SessionID}', '${s.UserID}', '${s.EventID}', '${s.SessionTimestamp}') ON CONFLICT (SessionID) DO NOTHING;\n`;
    });

    // Add GeneratedStarters
    db.generatedStarters.forEach(st => {
      sql += `INSERT INTO GeneratedStarter (StarterID, SessionID, StarterText, ContextPromptUsed) VALUES ('${st.StarterID}', '${st.SessionID}', '${st.StarterText.replace(/'/g, "''")}', '${st.ContextPromptUsed.replace(/'/g, "''")}') ON CONFLICT (StarterID) DO NOTHING;\n`;
    });

    // Add WikipediaFactChecks
    db.wikipediaFactChecks.forEach(fc => {
      sql += `INSERT INTO WikipediaFactCheck (FactCheckID, SessionID, VerifiedQueryText, VerificationStatus, WikipediaSourceURL) VALUES ('${fc.FactCheckID}', '${fc.SessionID}', '${fc.VerifiedQueryText.replace(/'/g, "''")}', '${fc.VerificationStatus}', '${fc.WikipediaSourceURL}') ON CONFLICT (FactCheckID) DO NOTHING;\n`;
    });

    // Add LogEntries
    db.logEntries.forEach(log => {
      const sessId = log.SessionID ? `'${log.SessionID}'` : 'NULL';
      sql += `INSERT INTO LogEntry (LogID, SessionID, ActionType, PayloadJSON, Timestamp) VALUES ('${log.LogID}', ${sessId}, '${log.ActionType}', '${log.PayloadJSON.replace(/'/g, "''")}', '${log.Timestamp}') ON CONFLICT (LogID) DO NOTHING;\n`;
    });

    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `networking_assistant_schema_${new Date().toISOString().split('T')[0]}.sql`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getActiveTableRows = (): any[] => {
    switch (activeTable) {
      case 'userProfiles': return db.userProfiles;
      case 'eventContexts': return db.eventContexts;
      case 'networkingSessions': return db.networkingSessions;
      case 'generatedStarters': return db.generatedStarters;
      case 'wikipediaFactChecks': return db.wikipediaFactChecks;
      case 'logEntries': return db.logEntries;
      default: return [];
    }
  };

  const activeRows = getActiveTableRows();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-semibold text-slate-200">Relational Database Table Inspector</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportSQL}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors font-medium cursor-pointer"
            title="Export PostgreSQL seeding script"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DDL + Seeder</span>
          </button>
          <button
            onClick={onClearDatabase}
            className="px-2.5 py-1 text-xs border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:bg-rose-950/20 rounded transition-colors font-medium cursor-pointer"
          >
            Clear DB
          </button>
        </div>
      </div>

      {/* Horizontal Tab Selector */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tables.map((t) => {
          const isSelected = activeTable === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                onSelectTable(t.id);
                setSelectedRow(null);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border rounded-full transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 font-bold shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
              }`}
            >
              <span>{t.label}</span>
              <span className={`px-1 py-0.2 rounded text-[9px] ${
                isSelected ? 'bg-indigo-500 text-indigo-950 font-bold' : 'bg-slate-800 text-slate-400'
              }`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content / Grid Inspector */}
      <div className="flex-1 overflow-auto min-h-0 bg-slate-950/50 rounded-lg border border-slate-950 p-2 relative">
        {activeRows.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <HelpCircle className="w-8 h-8 text-slate-600 mb-2" />
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Table Empty</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-3">
              {activeTable === 'userProfiles' && 'To populate this table, navigate to "Profiles & Events" on the left and create a User Biography.'}
              {activeTable === 'eventContexts' && 'To populate this table, enter an event description on the left and generate a theme analysis.'}
              {activeTable === 'networkingSessions' && 'To populate this table, start a Networking Session combining a User Profile and an Event.'}
              {activeTable === 'generatedStarters' && 'To populate this table, run the AI Generator inside an active Networking Session.'}
              {activeTable === 'wikipediaFactChecks' && 'To populate this table, use the Fact-Checker query box on the left inside a session.'}
              {activeTable === 'logEntries' && 'System logs are generated automatically when you perform any write actions.'}
            </p>
            <div className="text-[10px] bg-slate-900 border border-slate-800 text-indigo-400 rounded-lg py-1 px-3 flex items-center gap-1">
              <span>Try triggering an action in the assistant tab</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-left bg-slate-900/50">
                  {activeTable === 'userProfiles' && (
                    <>
                      <th className="p-2 w-24">UserID (PK)</th>
                      <th className="p-2">BioText</th>
                      <th className="p-2 w-40">currentEventCache</th>
                      <th className="p-2 w-16">Actions</th>
                    </>
                  )}
                  {activeTable === 'eventContexts' && (
                    <>
                      <th className="p-2 w-24">EventID (PK)</th>
                      <th className="p-2">EventDescription</th>
                      <th className="p-2 w-48">AnalyzedThemes</th>
                      <th className="p-2 w-16">Actions</th>
                    </>
                  )}
                  {activeTable === 'networkingSessions' && (
                    <>
                      <th className="p-2 w-28">SessionID (PK)</th>
                      <th className="p-2 w-24">UserID (FK)</th>
                      <th className="p-2 w-24">EventID (FK)</th>
                      <th className="p-2">SessionTimestamp</th>
                      <th className="p-2 w-16">Actions</th>
                    </>
                  )}
                  {activeTable === 'generatedStarters' && (
                    <>
                      <th className="p-2 w-24">StarterID (PK)</th>
                      <th className="p-2 w-24">SessionID (FK)</th>
                      <th className="p-2">StarterText</th>
                      <th className="p-2 w-32">Actions</th>
                    </>
                  )}
                  {activeTable === 'wikipediaFactChecks' && (
                    <>
                      <th className="p-2 w-24">FactCheckID (PK)</th>
                      <th className="p-2 w-24">SessionID (FK)</th>
                      <th className="p-2">VerifiedQueryText</th>
                      <th className="p-2 w-24">Status</th>
                      <th className="p-2 w-16">Actions</th>
                    </>
                  )}
                  {activeTable === 'logEntries' && (
                    <>
                      <th className="p-2 w-20">LogID (PK)</th>
                      <th className="p-2 w-28">ActionType</th>
                      <th className="p-2 w-24">SessionID (FK)</th>
                      <th className="p-2">PayloadJSON</th>
                      <th className="p-2 w-16">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeRows.map((row, rIdx) => (
                  <tr 
                    key={rIdx} 
                    className={`border-b border-slate-900 hover:bg-slate-900/40 text-slate-300 transition-colors ${
                      selectedRow === row ? 'bg-indigo-950/20' : ''
                    }`}
                  >
                    {activeTable === 'userProfiles' && (
                      <>
                        <td className="p-2 text-indigo-400 font-semibold truncate max-w-[90px]">{row.UserID}</td>
                        <td className="p-2 truncate max-w-[150px]">{row.BioText}</td>
                        <td className="p-2 truncate max-w-[140px] text-slate-400">{row.currentEventCache || 'None'}</td>
                      </>
                    )}
                    {activeTable === 'eventContexts' && (
                      <>
                        <td className="p-2 text-indigo-400 font-semibold truncate max-w-[90px]">{row.EventID}</td>
                        <td className="p-2 truncate max-w-[150px]">{row.EventDescription}</td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {row.AnalyzedThemes.map((theme: string, tIdx: number) => (
                              <span key={tIdx} className="px-1 py-0.2 bg-purple-950/60 text-purple-300 border border-purple-500/20 rounded text-[9px]">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </td>
                      </>
                    )}
                    {activeTable === 'networkingSessions' && (
                      <>
                        <td className="p-2 text-indigo-400 font-semibold truncate max-w-[110px]">{row.SessionID}</td>
                        <td className="p-2 text-blue-400 truncate max-w-[80px]">{row.UserID}</td>
                        <td className="p-2 text-purple-400 truncate max-w-[80px]">{row.EventID}</td>
                        <td className="p-2 text-slate-400 text-[10px]">{new Date(row.SessionTimestamp).toLocaleTimeString()}</td>
                      </>
                    )}
                    {activeTable === 'generatedStarters' && (
                      <>
                        <td className="p-2 text-indigo-400 font-semibold truncate max-w-[80px]">{row.StarterID}</td>
                        <td className="p-2 text-slate-400 truncate max-w-[80px]">{row.SessionID}</td>
                        <td className="p-2 truncate max-w-[200px] text-slate-100">{row.StarterText}</td>
                      </>
                    )}
                    {activeTable === 'wikipediaFactChecks' && (
                      <>
                        <td className="p-2 text-indigo-400 font-semibold truncate max-w-[80px]">{row.FactCheckID}</td>
                        <td className="p-2 text-slate-400 truncate max-w-[80px]">{row.SessionID}</td>
                        <td className="p-2 truncate max-w-[150px]">{row.VerifiedQueryText}</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            row.VerificationStatus === 'Verified' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/20' :
                            row.VerificationStatus === 'Disputed' ? 'bg-rose-950/80 text-rose-400 border border-rose-500/20' :
                            'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {row.VerificationStatus === 'Verified' && <CheckCircle2 className="w-2.5 h-2.5" />}
                            {row.VerificationStatus === 'Disputed' && <AlertTriangle className="w-2.5 h-2.5" />}
                            {row.VerificationStatus}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTable === 'logEntries' && (
                      <>
                        <td className="p-2 text-indigo-400 font-semibold truncate max-w-[60px]">{row.LogID}</td>
                        <td className="p-2 text-indigo-300 truncate max-w-[130px] font-bold">{row.ActionType}</td>
                        <td className="p-2 text-slate-500 truncate max-w-[80px]">{row.SessionID || 'NULL'}</td>
                        <td className="p-2 truncate max-w-[150px] text-slate-400 text-[10px]">{row.PayloadJSON}</td>
                      </>
                    )}
                    <td className="p-1">
                      <button
                        onClick={() => setSelectedRow(selectedRow === row ? null : row)}
                        className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded text-[9px] text-indigo-400 font-bold transition-all hover:scale-105 cursor-pointer"
                      >
                        {selectedRow === row ? 'Close' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Row Detail JSON Modal-like drawer inside the inspector panel */}
      {selectedRow && (
        <div className="mt-3 bg-slate-950 border border-slate-800 rounded-lg p-3 animate-fadeIn relative">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold text-slate-300 font-mono">Row Inspector (JSON View)</span>
            </div>
            <button
              onClick={() => setSelectedRow(null)}
              className="text-slate-500 hover:text-slate-300 text-xs font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
          <pre className="text-[10px] text-indigo-300 font-mono bg-slate-900/60 p-2 rounded max-h-36 overflow-auto whitespace-pre-wrap select-all">
            {JSON.stringify(selectedRow, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
