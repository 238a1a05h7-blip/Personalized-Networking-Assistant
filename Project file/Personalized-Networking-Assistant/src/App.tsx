/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  UserProfile, 
  EventContext, 
  NetworkingSession, 
  GeneratedStarter, 
  WikipediaFactCheck, 
  LogEntry, 
  AppDatabaseState 
} from './types';
import ERDiagram from './components/ERDiagram';
import DatabaseTableInspector from './components/DatabaseTableInspector';
import ArchitectureGuide from './components/ArchitectureGuide';
import { 
  User, 
  Calendar, 
  Database, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  Info, 
  Copy, 
  Check, 
  Search, 
  LogOut, 
  Compass, 
  TrendingUp, 
  Zap,
  Globe,
  Layers,
  Folder,
  FileCode,
  Server,
  Layout,
  Terminal,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Generates unique custom IDs matching standard ER schemas
const generateId = (prefix: string) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

const INITIAL_DB: AppDatabaseState = {
  userProfiles: [
    {
      UserID: "USR-4819",
      BioText: "AI Ethics advocate and Technical Product Manager with 5 years of experience in responsible machine learning. Passionate about developer tooling, accessibility, and human-in-the-loop validation.",
      currentEventCache: "EVT-8820"
    }
  ],
  eventContexts: [
    {
      EventID: "EVT-8820",
      EventDescription: "Next-Gen AI Summit 2026: An elite gathering of researchers, designers, and industry architects discussing multimodal interfaces, agentic frameworks, and AI-enabled software engineering safety.",
      AnalyzedThemes: ["Agentic Frameworks", "Multimodal Interfaces", "AI Engineering Safety"]
    }
  ],
  networkingSessions: [
    {
      SessionID: "SESS-7731",
      UserID: "USR-4819",
      EventID: "EVT-8820",
      SessionTimestamp: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ],
  generatedStarters: [
    {
      StarterID: "STR-1092",
      SessionID: "SESS-7731",
      StarterText: "Hi! I was reading about your panel on agentic safety. As someone working in responsible ML, how are you testing reliability in autonomous agent loops?",
      ContextPromptUsed: "Expert AI Networking Persona prompt with USR-4819 and EVT-8820 themes."
    }
  ],
  wikipediaFactChecks: [
    {
      FactCheckID: "CHK-5512",
      SessionID: "SESS-7731",
      VerifiedQueryText: "Gemini is Google's flagship family of multimodal AI models released in late 2023.",
      VerificationStatus: "Verified",
      WikipediaSourceURL: "https://en.wikipedia.org/wiki/Gemini_(chatbot)"
    }
  ],
  logEntries: [
    {
      LogID: "LOG-1001",
      SessionID: null,
      ActionType: "SEED_DATABASE",
      PayloadJSON: JSON.stringify({ message: "Database initialized with expert TPM profile and Summit event details." }),
      Timestamp: new Date(Date.now() - 3600000 * 2.1).toISOString()
    }
  ]
};

export default function App() {
  // Database state persisting in localStorage
  const [db, setDb] = useState<AppDatabaseState>(() => {
    const saved = localStorage.getItem('networking_assistant_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_DB;
      }
    }
    return INITIAL_DB;
  });

  // Active UI states
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'profiles' | 'sessions' | 'starters' | 'factcheck' | 'architecture'>('profiles');
  const [activeInspectorTable, setActiveInspectorTable] = useState<string>('userProfiles');
  const [activeSessionId, setActiveSessionId] = useState<string | null>(() => {
    return db.networkingSessions.length > 0 ? db.networkingSessions[db.networkingSessions.length - 1].SessionID : null;
  });

  // State for adding User Profile
  const [userBio, setUserBio] = useState('');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // State for adding Event Context
  const [eventDesc, setEventDesc] = useState('');
  const [analyzingThemes, setAnalyzingThemes] = useState(false);
  const [eventSuccessMsg, setEventSuccessMsg] = useState('');

  // State for initiating a session
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');
  const [sessionSuccessMsg, setSessionSuccessMsg] = useState('');

  // State for generated starters
  const [generatingStarters, setGeneratingStarters] = useState(false);
  const [copiedStarterId, setCopiedStarterId] = useState<string | null>(null);

  // State for Wikipedia fact check
  const [factQuery, setFactQuery] = useState('');
  const [checkingFact, setCheckingFact] = useState(false);
  const [factCheckResult, setFactCheckResult] = useState<{
    query: string;
    status: 'Verified' | 'Disputed' | 'Unverified';
    explanation: string;
    wikiTitle?: string;
    wikiSnippet?: string;
    wikiUrl?: string;
  } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('networking_assistant_db', JSON.stringify(db));
  }, [db]);

  // Set default dropdown items when data changes
  useEffect(() => {
    if (db.userProfiles.length > 0 && !selectedUserId) {
      setSelectedUserId(db.userProfiles[0].UserID);
    }
    if (db.eventContexts.length > 0 && !selectedEventId) {
      setSelectedEventId(db.eventContexts[0].EventID);
    }
  }, [db, selectedUserId, selectedEventId]);

  // Helper to add log entry
  const logAction = (actionType: string, payload: any, sessionId: string | null = null) => {
    const newLog: LogEntry = {
      LogID: generateId('LOG'),
      SessionID: sessionId,
      ActionType: actionType,
      PayloadJSON: JSON.stringify(payload),
      Timestamp: new Date().toISOString()
    };
    setDb(prev => ({
      ...prev,
      logEntries: [newLog, ...prev.logEntries]
    }));
  };

  // Clear Database
  const handleClearDatabase = () => {
    if (window.confirm("Are you sure you want to reset the database to sample seed data?")) {
      setDb(INITIAL_DB);
      setActiveSessionId("SESS-7731");
      setFactCheckResult(null);
      logAction("RESET_DATABASE", { message: "Database wiped and re-seeded with factory defaults." });
    }
  };

  // Form Submit: Create User Profile
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userBio.trim()) return;

    const newProfile: UserProfile = {
      UserID: generateId('USR'),
      BioText: userBio.trim(),
      currentEventCache: ''
    };

    setDb(prev => ({
      ...prev,
      userProfiles: [newProfile, ...prev.userProfiles]
    }));

    setSelectedUserId(newProfile.UserID);
    setUserBio('');
    setProfileSuccessMsg(`Profile created with UserID: ${newProfile.UserID}!`);
    setTimeout(() => setProfileSuccessMsg(''), 4000);

    // Logging
    logAction("CREATE_PROFILE", { 
      UserID: newProfile.UserID, 
      BioLength: newProfile.BioText.length 
    });
    setActiveInspectorTable('userProfiles');
  };

  // Form Submit: Create Event & Analyze Themes
  const handleCreateEventAndAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventDesc.trim() || analyzingThemes) return;

    setAnalyzingThemes(true);
    setEventSuccessMsg('');

    try {
      const response = await fetch('/api/gemini/analyze-themes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventDescription: eventDesc.trim() })
      });
      const data = await response.json();
      
      const newEvent: EventContext = {
        EventID: generateId('EVT'),
        EventDescription: eventDesc.trim(),
        AnalyzedThemes: data.themes || ['Tech Summit']
      };

      setDb(prev => ({
        ...prev,
        eventContexts: [newEvent, ...prev.eventContexts]
      }));

      setSelectedEventId(newEvent.EventID);
      setEventDesc('');
      setEventSuccessMsg(`Event registered and ${newEvent.AnalyzedThemes.length} AI themes analyzed successfully!`);
      setTimeout(() => setEventSuccessMsg(''), 4000);

      logAction("ANALYZE_THEMES", {
        EventID: newEvent.EventID,
        Themes: newEvent.AnalyzedThemes,
        Prompt: "Identify 3 to 5 key themes, tech stacks, or industries. Return as a raw JSON list.",
        Warning: data.warning || null
      });
      setActiveInspectorTable('eventContexts');
    } catch (err: any) {
      console.error(err);
      alert("Error analyzing event themes: " + err.message);
    } finally {
      setAnalyzingThemes(false);
    }
  };

  // Form Submit: Start Networking Session
  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = selectedUserId || (db.userProfiles[0]?.UserID);
    const eventId = selectedEventId || (db.eventContexts[0]?.EventID);

    if (!userId || !eventId) {
      alert("Please ensure both a User Profile and Event Context exist before commencing a session!");
      return;
    }

    const newSession: NetworkingSession = {
      SessionID: generateId('SESS'),
      UserID: userId,
      EventID: eventId,
      SessionTimestamp: new Date().toISOString()
    };

    // Update user's event cache in User Profile as well to prove normalization sync
    setDb(prev => {
      const updatedProfiles = prev.userProfiles.map(p => {
        if (p.UserID === userId) {
          return { ...p, currentEventCache: eventId };
        }
        return p;
      });

      return {
        ...prev,
        userProfiles: updatedProfiles,
        networkingSessions: [...prev.networkingSessions, newSession]
      };
    });

    setActiveSessionId(newSession.SessionID);
    setSessionSuccessMsg(`Networking Session ${newSession.SessionID} started successfully!`);
    setTimeout(() => setSessionSuccessMsg(''), 4000);

    logAction("COMMENCE_SESSION", {
      SessionID: newSession.SessionID,
      UserID: userId,
      EventID: eventId,
    }, newSession.SessionID);

    // Switch tab to let them generate starters immediately
    setTimeout(() => {
      setActiveWorkspaceTab('starters');
      setActiveInspectorTable('networkingSessions');
    }, 1000);
  };

  // Action: Generate Conversation Starters
  const handleGenerateStarters = async () => {
    if (!activeSessionId) return;
    const session = db.networkingSessions.find(s => s.SessionID === activeSessionId);
    if (!session) return;

    const profile = db.userProfiles.find(p => p.UserID === session.UserID);
    const event = db.eventContexts.find(e => e.EventID === session.EventID);

    if (!profile || !event) {
      alert("Session entities not found!");
      return;
    }

    setGeneratingStarters(true);

    try {
      const response = await fetch('/api/gemini/generate-starters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bioText: profile.BioText,
          eventDescription: event.EventDescription,
          analyzedThemes: event.AnalyzedThemes
        })
      });
      const data = await response.json();

      if (data.starters && Array.isArray(data.starters)) {
        // Map and insert each starter into database
        const newStarters: GeneratedStarter[] = data.starters.map((st: any) => ({
          StarterID: generateId('STR'),
          SessionID: activeSessionId,
          StarterText: st.starter,
          ContextPromptUsed: `${st.type} Goal: ${st.goal}. Prompt Used: ${data.promptUsed.slice(0, 150)}...`
        }));

        setDb(prev => ({
          ...prev,
          generatedStarters: [...prev.generatedStarters, ...newStarters]
        }));

        logAction("GENERATE_STARTERS", {
          SessionID: activeSessionId,
          Count: newStarters.length,
          PromptUsed: data.promptUsed,
          Warning: data.warning || null
        }, activeSessionId);
        
        setActiveInspectorTable('generatedStarters');
      }
    } catch (err: any) {
      console.error(err);
      alert("Error generating conversation starters: " + err.message);
    } finally {
      setGeneratingStarters(false);
    }
  };

  // Action: Wikipedia Fact Checker Search & Verify
  const handleFactCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factQuery.trim() || !activeSessionId || checkingFact) return;

    setCheckingFact(true);
    setFactCheckResult(null);

    try {
      // 1. Search Wikipedia via our full-stack endpoint
      const searchRes = await fetch(`/api/wikipedia/search?q=${encodeURIComponent(factQuery.trim())}`);
      const searchData = await searchRes.json();

      const topExtract = searchData.topExtract || "";
      const sourceUrl = searchData.sourceUrl || "https://en.wikipedia.org";
      const topResultTitle = searchData.results[0]?.title || "";

      // 2. Pass query and extract to Gemini to verify
      const verifyRes = await fetch('/api/gemini/verify-fact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: factQuery.trim(),
          wikipediaContent: topExtract
        })
      });
      const verifyData = await verifyRes.json();

      const newCheck: WikipediaFactCheck = {
        FactCheckID: generateId('CHK'),
        SessionID: activeSessionId,
        VerifiedQueryText: factQuery.trim(),
        VerificationStatus: verifyData.status || 'Unverified',
        WikipediaSourceURL: sourceUrl
      };

      setDb(prev => ({
        ...prev,
        wikipediaFactChecks: [...prev.wikipediaFactChecks, newCheck]
      }));

      setFactCheckResult({
        query: factQuery.trim(),
        status: verifyData.status,
        explanation: verifyData.explanation,
        wikiTitle: topResultTitle,
        wikiSnippet: searchData.results[0]?.snippet,
        wikiUrl: sourceUrl
      });

      setFactQuery('');

      logAction("FACT_CHECK", {
        Query: factQuery.trim(),
        Status: verifyData.status,
        WikiTitle: topResultTitle,
        Explanation: verifyData.explanation,
        SourceURL: sourceUrl
      }, activeSessionId);
      
      setActiveInspectorTable('wikipediaFactChecks');
    } catch (err: any) {
      console.error(err);
      alert("Error checking fact on Wikipedia: " + err.message);
    } finally {
      setCheckingFact(false);
    }
  };

  // Utility to copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStarterId(id);
    setTimeout(() => setCopiedStarterId(null), 2000);
  };

  // Active Session Helper details
  const activeSession = db.networkingSessions.find(s => s.SessionID === activeSessionId);
  const activeProfile = activeSession ? db.userProfiles.find(p => p.UserID === activeSession.UserID) : null;
  const activeEvent = activeSession ? db.eventContexts.find(e => e.EventID === activeSession.EventID) : null;
  const activeSessionStarters = activeSession ? db.generatedStarters.filter(st => st.SessionID === activeSessionId) : [];
  const activeSessionChecks = activeSession ? db.wikipediaFactChecks.filter(c => c.SessionID === activeSessionId) : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-600/30 selection:text-indigo-200">
      {/* Header Banner */}
      <header className="border-b border-slate-900 bg-slate-950/85 backdrop-blur sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-xl shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
              Personalized Networking Assistant
            </h1>
            <p className="text-xs text-slate-400">AI-Guided Conversation Architect & Real-Time Wikipedia Auditor</p>
          </div>
        </div>

        {/* Global Session Indicator */}
        <div className="flex items-center gap-2">
          {activeSessionId ? (
            <div className="px-3 py-1.5 bg-indigo-950/40 border border-indigo-500/20 rounded-lg text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-slate-300">
                Active Session: <strong className="text-indigo-400">{activeSessionId}</strong>
              </span>
              <button 
                onClick={() => {
                  setActiveSessionId(null);
                  logAction("DISCONNECT_SESSION", { message: "User disconnected from current active session." });
                }}
                className="text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Disconnect Active Session"
              >
                <LogOut className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          ) : (
            <div className="px-3 py-1.5 bg-rose-950/20 border border-rose-500/20 rounded-lg text-xs text-rose-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>No Active Session started. Commensing session required under Tab 2.</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Container Grid */}
      <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1700px] w-full mx-auto">
        
        {/* Left Hand: Workspace Panel (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          
          {/* Main workspace Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col flex-1 min-h-[580px]">
            {/* Tab navigation */}
            <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 pt-3 flex gap-2">
              <button
                onClick={() => setActiveWorkspaceTab('profiles')}
                className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeWorkspaceTab === 'profiles'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>1. Profiles & Events</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('sessions')}
                className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeWorkspaceTab === 'sessions'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>2. Networking Sessions</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('starters')}
                className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeWorkspaceTab === 'starters'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>3. AI Starters Generator</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('factcheck')}
                className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeWorkspaceTab === 'factcheck'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>4. Wikipedia Fact-Checker</span>
              </button>
              <button
                onClick={() => setActiveWorkspaceTab('architecture')}
                className={`px-4 py-2 text-xs font-medium rounded-t-lg transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                  activeWorkspaceTab === 'architecture'
                    ? 'border-indigo-500 text-indigo-400 bg-slate-900/60 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>5. Design & Architecture Guide</span>
              </button>
            </div>

            {/* Active Workspace View Body */}
            <div className="p-6 flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                
                {/* Profiles & Events Tab */}
                {activeWorkspaceTab === 'profiles' && (
                  <motion.div
                    key="profiles"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left Block: Manage Biography */}
                      <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2 text-indigo-400">
                            <User className="w-4 h-4" />
                            <h2 className="text-sm font-semibold">Step 1: Save User Profile Biography</h2>
                          </div>
                          <p className="text-xs text-slate-400 mb-4">
                            Define your unique skills, industry context, and goals. The AI uses this context to design personalized speaking scripts.
                          </p>

                          <form onSubmit={handleCreateProfile} className="space-y-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 mb-1">Professional Bio text:</label>
                              <textarea
                                value={userBio}
                                onChange={(e) => setUserBio(e.target.value)}
                                placeholder="Example: Senior Front-End Dev focused on accessibility. Attending to discuss UI frameworks and find potential freelance partners."
                                className="w-full h-28 bg-slate-900/80 border border-slate-800 focus:border-indigo-500 rounded-lg p-2 text-xs focus:outline-none transition-colors resize-none placeholder:text-slate-600"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Create Profile</span>
                            </button>
                          </form>
                        </div>

                        {profileSuccessMsg && (
                          <div className="mt-4 p-2.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-1.5 animate-fadeIn">
                            <Check className="w-4 h-4 flex-shrink-0" />
                            <span>{profileSuccessMsg}</span>
                          </div>
                        )}
                      </div>

                      {/* Right Block: Manage Event & Analyze Themes */}
                      <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2 text-purple-400">
                            <Calendar className="w-4 h-4" />
                            <h2 className="text-sm font-semibold">Step 2: Input Event & Analyze Themes</h2>
                          </div>
                          <p className="text-xs text-slate-400 mb-4">
                            Describe the event description or keynote themes. AI analyzes the topics to align your starters with event agendas.
                          </p>

                          <form onSubmit={handleCreateEventAndAnalyze} className="space-y-4">
                            <div>
                              <label className="block text-[11px] font-mono text-slate-400 mb-1">Event Description:</label>
                              <textarea
                                value={eventDesc}
                                onChange={(e) => setEventDesc(e.target.value)}
                                placeholder="Example: Silicon Valley Web Tech Meetup. Discussing future specifications for HTML, CSS grid systems, and state models."
                                className="w-full h-28 bg-slate-900/80 border border-slate-800 focus:border-purple-500 rounded-lg p-2 text-xs focus:outline-none transition-colors resize-none placeholder:text-slate-600"
                                required
                              />
                            </div>
                            <button
                              type="submit"
                              disabled={analyzingThemes}
                              className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                            >
                              <Sparkles className={`w-4 h-4 ${analyzingThemes ? 'animate-spin' : ''}`} />
                              <span>{analyzingThemes ? 'AI Extracting Themes...' : 'Register & Analyze Event'}</span>
                            </button>
                          </form>
                        </div>

                        {eventSuccessMsg && (
                          <div className="mt-4 p-2.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-1.5 animate-fadeIn">
                            <Check className="w-4 h-4 flex-shrink-0" />
                            <span>{eventSuccessMsg}</span>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Show Available Items Mini-List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
                      <div className="p-3 bg-slate-950/20 border border-slate-800/60 rounded-lg">
                        <span className="text-[11px] font-mono text-slate-400 block mb-1">Saved User Bios:</span>
                        <div className="space-y-1.5 max-h-24 overflow-y-auto">
                          {db.userProfiles.map(p => (
                            <div key={p.UserID} className="p-1.5 bg-slate-900 border border-slate-800/40 rounded flex justify-between items-center">
                              <span className="font-mono text-[10px] text-blue-400 font-bold">{p.UserID}</span>
                              <span className="truncate max-w-[200px] text-[10px] text-slate-300">{p.BioText}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-slate-950/20 border border-slate-800/60 rounded-lg">
                        <span className="text-[11px] font-mono text-slate-400 block mb-1">Saved Event Contexts:</span>
                        <div className="space-y-1.5 max-h-24 overflow-y-auto">
                          {db.eventContexts.map(e => (
                            <div key={e.EventID} className="p-1.5 bg-slate-900 border border-slate-800/40 rounded flex flex-col">
                              <div className="flex justify-between items-center">
                                <span className="font-mono text-[10px] text-purple-400 font-bold">{e.EventID}</span>
                                <span className="truncate max-w-[200px] text-[10px] text-slate-300">{e.EventDescription}</span>
                              </div>
                              <div className="flex gap-1 mt-1 overflow-x-auto">
                                {e.AnalyzedThemes.map((t, idx) => (
                                  <span key={idx} className="text-[8px] bg-purple-950 text-purple-300 px-1 py-0.2 rounded font-mono whitespace-nowrap">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Networking Sessions Tab */}
                {activeWorkspaceTab === 'sessions' && (
                  <motion.div
                    key="sessions"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-indigo-400">
                        <Database className="w-4 h-4" />
                        <h2 className="text-sm font-semibold">Commence a Networking Session Transaction</h2>
                      </div>
                      <p className="text-xs text-slate-400 mb-4">
                        Bind a specific User Biography with an Event Context to create a dynamic networking session context. 
                        This maps to a new record in the <code className="text-indigo-400 font-mono">NetworkingSession</code> table.
                      </p>

                      <form onSubmit={handleStartSession} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Select User Profile (UserID):</label>
                          <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                          >
                            {db.userProfiles.map(p => (
                              <option key={p.UserID} value={p.UserID}>
                                {p.UserID} - {p.BioText.slice(0, 50)}...
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Select Event (EventID):</label>
                          <select
                            value={selectedEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                          >
                            {db.eventContexts.map(e => (
                              <option key={e.EventID} value={e.EventID}>
                                {e.EventID} - {e.EventDescription.slice(0, 50)}...
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2 pt-2">
                          <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Commence Networking Session</span>
                          </button>
                        </div>
                      </form>

                      {sessionSuccessMsg && (
                        <div className="mt-4 p-2.5 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-1.5 animate-fadeIn">
                          <Check className="w-4 h-4 flex-shrink-0" />
                          <span>{sessionSuccessMsg}</span>
                        </div>
                      )}
                    </div>

                    {/* Past Sessions List */}
                    <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-xl">
                      <h3 className="text-xs font-semibold text-slate-300 mb-3">All Active and Historic Sessions</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {db.networkingSessions.length === 0 ? (
                          <p className="text-xs text-slate-500 italic text-center py-4">No sessions found. Combine profile + event above to begin.</p>
                        ) : (
                          db.networkingSessions.map(sess => {
                            const isActive = activeSessionId === sess.SessionID;
                            const prof = db.userProfiles.find(p => p.UserID === sess.UserID);
                            const ev = db.eventContexts.find(e => e.EventID === sess.EventID);
                            return (
                              <div 
                                key={sess.SessionID} 
                                onClick={() => setActiveSessionId(sess.SessionID)}
                                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                  isActive 
                                    ? 'bg-indigo-950/30 border-indigo-500' 
                                    : 'bg-slate-950/30 border-slate-800/80 hover:border-slate-700'
                                }`}
                              >
                                <div className="space-y-1 max-w-[85%]">
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs font-bold text-indigo-400">{sess.SessionID}</span>
                                    <span className="text-[10px] text-slate-500">{new Date(sess.SessionTimestamp).toLocaleString()}</span>
                                    {isActive && <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-400 border border-emerald-500/20 rounded font-bold text-[8px] uppercase tracking-wider">Active</span>}
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    <strong>User:</strong> {prof?.BioText || 'Bio deleted'} | <strong>Event:</strong> {ev?.EventDescription || 'Event deleted'}
                                  </p>
                                </div>
                                <ArrowRight className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* AI Starter Generator Tab */}
                {activeWorkspaceTab === 'starters' && (
                  <motion.div
                    key="starters"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    {!activeSessionId ? (
                      <div className="p-8 text-center bg-slate-950/40 border border-slate-800/80 rounded-xl">
                        <Cpu className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                        <h3 className="text-sm font-semibold text-slate-300">No Active Session</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                          To generate conversation starters, you must have an active networking session. Please go to the "Networking Sessions" tab first.
                        </p>
                        <button
                          onClick={() => setActiveWorkspaceTab('sessions')}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Configure Session
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fadeIn">
                        
                        {/* Selected Session Info Summary Card */}
                        <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-slate-300">
                              <User className="w-3.5 h-3.5 text-blue-400" />
                              <span>Speaker Bio: <code className="text-blue-400">{activeProfile?.UserID}</code></span>
                            </div>
                            <p className="text-slate-400 text-[11px] italic">"{activeProfile?.BioText}"</p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-purple-400" />
                              <span>Event Context: <code className="text-purple-400">{activeEvent?.EventID}</code></span>
                            </div>
                            <p className="text-slate-400 text-[11px] italic">"{activeEvent?.EventDescription}"</p>
                            <div className="flex gap-1 flex-wrap mt-1">
                              {activeEvent?.AnalyzedThemes.map((t, idx) => (
                                <span key={idx} className="text-[9px] bg-purple-950 text-purple-400 px-1.5 py-0.2 rounded border border-purple-500/20 font-mono">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Trigger Generator Button */}
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-slate-400">
                            The AI matches themes from your bio with topics discussed in the event description.
                          </div>
                          <button
                            onClick={handleGenerateStarters}
                            disabled={generatingStarters}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Sparkles className={`w-4 h-4 ${generatingStarters ? 'animate-spin' : ''}`} />
                            <span>{generatingStarters ? 'Generating...' : 'Generate AI Starters'}</span>
                          </button>
                        </div>

                        {/* Generated Starters Grid */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                            Starters generated for this session ({activeSessionStarters.length})
                          </h4>
                          {activeSessionStarters.length === 0 ? (
                            <div className="p-10 border border-slate-800/40 rounded-lg text-center text-xs text-slate-500 italic bg-slate-950/20">
                              Click the "Generate AI Starters" button above to use Gemini.
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {activeSessionStarters.map((st) => {
                                // Extract styles based on the prompt description
                                const isIcebreaker = st.ContextPromptUsed.toLowerCase().includes('icebreaker');
                                const isDeep = st.ContextPromptUsed.toLowerCase().includes('deep');
                                return (
                                  <div 
                                    key={st.StarterID}
                                    className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl shadow hover:border-slate-700 transition-all flex flex-col justify-between group"
                                  >
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase font-mono ${
                                          isIcebreaker ? 'bg-teal-950/80 text-teal-400 border border-teal-500/20' :
                                          isDeep ? 'bg-blue-950/80 text-blue-400 border border-blue-500/20' :
                                          'bg-purple-950/80 text-purple-400 border border-purple-500/20'
                                        }`}>
                                          {isIcebreaker ? 'Icebreaker' : isDeep ? 'Deep Dive' : 'Future Outlook'}
                                        </span>
                                        <span className="text-[8px] font-mono text-slate-500">{st.StarterID}</span>
                                      </div>
                                      <p className="text-xs text-slate-100 font-medium leading-relaxed mb-3 italic">
                                        "{st.StarterText}"
                                      </p>
                                    </div>

                                    <div className="pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                                      <span className="truncate max-w-[120px] font-mono text-[9px]" title={st.ContextPromptUsed}>
                                        Mapped: {activeSessionId}
                                      </span>
                                      <button
                                        onClick={() => copyToClipboard(st.StarterText, st.StarterID)}
                                        className="flex items-center gap-1.5 px-2 py-1 bg-slate-950 border border-slate-800 hover:border-slate-600 rounded text-indigo-400 hover:text-indigo-300 font-semibold transition-all cursor-pointer"
                                      >
                                        {copiedStarterId === st.StarterID ? (
                                          <>
                                            <Check className="w-3 h-3 text-emerald-400" />
                                            <span className="text-emerald-400">Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy Script</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Wikipedia Fact-Checker Tab */}
                {activeWorkspaceTab === 'factcheck' && (
                  <motion.div
                    key="factcheck"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    {!activeSessionId ? (
                      <div className="p-8 text-center bg-slate-950/40 border border-slate-800/80 rounded-xl">
                        <ShieldCheck className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                        <h3 className="text-sm font-semibold text-slate-300">No Active Session</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                          To audit facts with Wikipedia and AI, you must have an active networking session. Please configure one in the Sessions tab first.
                        </p>
                        <button
                          onClick={() => setActiveWorkspaceTab('sessions')}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Configure Session
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-5 animate-fadeIn">
                        
                        {/* Explanation Intro */}
                        <div className="p-4 bg-slate-950/55 border border-slate-800/80 rounded-xl flex items-start gap-3">
                          <div className="p-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
                            <Info className="w-4 h-4 flex-shrink-0" />
                          </div>
                          <div>
                            <h3 className="text-xs font-semibold text-slate-200">Wikipedia Real-Time Fact Auditor</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                              Networking involves sharing details about companies, technologies, or histories. 
                              Enter any query/fact. The system will search Wikipedia live, retrieve the most relevant summary context, and use Gemini to verify the query's factual status.
                            </p>
                          </div>
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleFactCheck} className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                            <input
                              type="text"
                              value={factQuery}
                              onChange={(e) => setFactQuery(e.target.value)}
                              placeholder="Enter a claim or fact (e.g. 'Drizzle ORM is a TypeScript ORM for SQL databases')"
                              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none transition-colors placeholder:text-slate-600"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={checkingFact}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {checkingFact ? 'Searching & Auditing...' : 'Verify Fact'}
                          </button>
                        </form>

                        {/* Verification Output Panel */}
                        {factCheckResult && (
                          <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-5 space-y-4 animate-fadeIn">
                            
                            {/* Header Status Bar */}
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Claims Check Result</span>
                                <h4 className="text-xs font-bold text-slate-200">"{factCheckResult.query}"</h4>
                              </div>
                              <span className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 border ${
                                factCheckResult.status === 'Verified' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/20' :
                                factCheckResult.status === 'Disputed' ? 'bg-rose-950/80 text-rose-400 border-rose-500/20' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {factCheckResult.status === 'Verified' ? <Check className="w-3.5 h-3.5" /> : null}
                                {factCheckResult.status}
                              </span>
                            </div>

                            {/* Verification Explanation */}
                            <div className="space-y-1">
                              <h5 className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider font-mono">Gemini AI Audit Reasoning</h5>
                              <p className="text-xs text-slate-300 leading-relaxed">{factCheckResult.explanation}</p>
                            </div>

                            {/* Wikipedia Source Snippet */}
                            {factCheckResult.wikiTitle && (
                              <div className="p-3 bg-slate-900 border border-slate-800/60 rounded-lg space-y-1.5">
                                <div className="flex items-center justify-between text-[11px]">
                                  <div className="flex items-center gap-1.5 font-bold text-slate-300">
                                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Top Wikipedia Match: {factCheckResult.wikiTitle}</span>
                                  </div>
                                  {factCheckResult.wikiUrl && (
                                    <a 
                                      href={factCheckResult.wikiUrl} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="text-indigo-400 hover:underline flex items-center gap-0.5"
                                    >
                                      <span>Read Source</span>
                                      <ArrowRight className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400 italic">
                                  "{factCheckResult.wikiSnippet ? factCheckResult.wikiSnippet.slice(0, 300) + '...' : 'No snippet context returned.'}"
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Audit Records List */}
                        <div className="space-y-2 mt-4">
                          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                            Checked Facts in this Session ({activeSessionChecks.length})
                          </h4>
                          {activeSessionChecks.length === 0 ? (
                            <p className="text-xs text-slate-600 italic">No fact checks executed in this active session yet.</p>
                          ) : (
                            <div className="space-y-1.5">
                              {activeSessionChecks.map((chk) => (
                                <div key={chk.FactCheckID} className="p-2.5 bg-slate-900/60 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs">
                                  <div className="space-y-0.5 max-w-[80%]">
                                    <p className="text-slate-200 font-medium truncate">"{chk.VerifiedQueryText}"</p>
                                    <a 
                                      href={chk.WikipediaSourceURL} 
                                      target="_blank" 
                                      rel="noreferrer" 
                                      className="text-[10px] text-indigo-400 hover:underline truncate block"
                                    >
                                      {chk.WikipediaSourceURL}
                                    </a>
                                  </div>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    chk.VerificationStatus === 'Verified' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/10' :
                                    chk.VerificationStatus === 'Disputed' ? 'bg-rose-950/50 text-rose-400 border border-rose-500/10' :
                                    'bg-slate-800 text-slate-400'
                                  }`}>
                                    {chk.VerificationStatus}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    )}
                  </motion.div>
                )}

                {/* Design & Architecture Guide Tab */}
                {activeWorkspaceTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-6"
                  >
                    {/* Architectural Intro Card */}
                    <div className="p-5 bg-slate-950/50 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Compass className="w-4 h-4" />
                        <h2 className="text-sm font-semibold">Architectural Specifications & Decision Matrix</h2>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The model selection process is arguably the most consequential step in any AI application. 
                        Choosing the wrong model can result in slow responses, poor accuracy, high resource consumption, 
                        or output that fails to meet expectations. Below is our formal decision guide, interactive directory map, and project workflow.
                      </p>
                    </div>

                    {/* Twin Layout: Project Flow & Decision Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Left: Project Flow Timeline */}
                      <div className="bg-slate-950/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
                        <h3 className="text-xs font-bold font-mono uppercase text-slate-300 tracking-wider flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-indigo-400" />
                          <span>Structured Project Flow Sequence</span>
                        </h3>
                        
                        <div className="space-y-4 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                          
                          {/* Phase 1 */}
                          <div className="relative space-y-1">
                            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-indigo-500"></span>
                            <h4 className="text-[11px] font-bold text-slate-200">Phase 1: Environment & Context Setup</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Bootstrapping the codebase in Python 3.11 with a dedicated <code className="text-indigo-400 font-mono">venv</code>. 
                              Initializing Git for source-version audits and preparing dependencies.
                            </p>
                          </div>

                          {/* Phase 2 */}
                          <div className="relative space-y-1">
                            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-indigo-500"></span>
                            <h4 className="text-[11px] font-bold text-slate-200">Phase 2: Event Theme Extraction</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Processing unstructured event descriptions. Uses zero-shot NLP models to categorize topics, 
                              aligning agendas with speaking bios without custom task-specific training data.
                            </p>
                          </div>

                          {/* Phase 3 */}
                          <div className="relative space-y-1">
                            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-indigo-500"></span>
                            <h4 className="text-[11px] font-bold text-slate-200">Phase 3: Conversational Starter Synthesis</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Creating natural, contextually coherent opening lines and scripts. Prompt templates map 
                              intersecting themes from User Biography and Event tags.
                            </p>
                          </div>

                          {/* Phase 4 */}
                          <div className="relative space-y-1">
                            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-indigo-500"></span>
                            <h4 className="text-[11px] font-bold text-slate-200">Phase 4: Real-Time Fact Auditing</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Executing queries against the live Wikipedia API. Validating historical or technical claims 
                              using LLM feedback and providing source links for conversational validation.
                            </p>
                          </div>

                          {/* Phase 5 */}
                          <div className="relative space-y-1">
                            <span className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-indigo-500"></span>
                            <h4 className="text-[11px] font-bold text-slate-200">Phase 5: 3NF Transactional Logging</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Committing all metadata, generated dialogue, and auditing scores into relational 3NF databases. 
                              Maintaining pristine entity isolation and relational foreign key constraints.
                            </p>
                          </div>

                        </div>
                      </div>

                      {/* Right: Model Selection & Rationales */}
                      <div className="space-y-4">
                        
                        {/* Model 1: DistilBERT */}
                        <div className="bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-indigo-400">
                              <Zap className="w-3.5 h-3.5 text-purple-400" />
                              <h4 className="text-xs font-bold">Theme Extraction: DistilBERT</h4>
                            </div>
                            <span className="px-1.5 py-0.2 bg-purple-950/80 text-purple-300 border border-purple-500/20 text-[9px] font-mono rounded font-bold">
                              Zero-Shot NLP
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            <strong>Why chosen:</strong> Achieves the optimal balance between inference speed and classification accuracy. 
                            For real-time applications where users expect immediate suggestions, it responds in milliseconds rather than seconds. 
                            Its compact size is highly deployable in resource-constrained container microservices.
                          </p>
                        </div>

                        {/* Model 2: GPT-2 Small */}
                        <div className="bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-indigo-400">
                              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                              <h4 className="text-xs font-bold">Text Generation: GPT-2 Small</h4>
                            </div>
                            <span className="px-1.5 py-0.2 bg-emerald-950/80 text-emerald-300 border border-emerald-500/20 text-[9px] font-mono rounded font-bold">
                              Generative Decoder
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 leading-relaxed">
                            <strong>Why chosen:</strong> Selected for its ability to run efficiently on standard CPU hardware without GPU acceleration. 
                            Produces conversation starters that are sufficiently natural, punchy, and contextually coherent for professional networking. 
                            Its standard pipeline integration allows straightforward setup and deployment.
                          </p>
                        </div>

                        {/* Stack reference links */}
                        <div className="bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl space-y-2 text-xs">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Production Technology Reference</span>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 rounded flex items-center justify-between transition-colors">
                              <span>FastAPI Docs</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                            <a href="https://docs.streamlit.io/" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 rounded flex items-center justify-between transition-colors">
                              <span>Streamlit Docs</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                            <a href="https://huggingface.co/models" target="_blank" rel="noreferrer" className="p-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-indigo-400 hover:text-indigo-300 rounded flex items-center justify-between transition-colors col-span-2">
                              <span>Hugging Face Transformer Models</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Integrated Interactive Architecture & Directory Guide */}
                    <ArchitectureGuide />

                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>

          {/* Quick System API Warning if Key is missing */}
          <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span>
                <strong>System API Keys:</strong> The application queries real server-side endpoints and contains full offline fail-safes so you can test it without configuring anything.
              </span>
            </div>
          </div>

        </div>

        {/* Right Hand: Interactive DB & ER Diagram Panel (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          
          {/* Active SVG ER Diagram card */}
          <ERDiagram 
            activeTable={activeInspectorTable}
            onSelectTable={setActiveInspectorTable}
            counts={{
              userProfiles: db.userProfiles.length,
              eventContexts: db.eventContexts.length,
              networkingSessions: db.networkingSessions.length,
              generatedStarters: db.generatedStarters.length,
              wikipediaFactChecks: db.wikipediaFactChecks.length,
              logEntries: db.logEntries.length,
            }}
          />

          {/* Active Relational Grid Table view */}
          <DatabaseTableInspector 
            db={db}
            activeTable={activeInspectorTable}
            onSelectTable={setActiveInspectorTable}
            onClearDatabase={handleClearDatabase}
          />

        </div>

      </main>

      {/* Page Footer */}
      <footer className="border-t border-slate-900/60 py-4 px-6 text-center text-slate-600 text-xs mt-auto">
        <span>© 2026 Personalized Networking Assistant. Built for developer sandbox and 3NF database design auditing.</span>
      </footer>
    </div>
  );
}
