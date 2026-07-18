/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  UserID: string;
  BioText: string;
  currentEventCache: string; // Dynamic cache of current/recent events associated
}

export interface EventContext {
  EventID: string;
  EventDescription: string;
  AnalyzedThemes: string[]; // Structured tags or concepts analyzed by AI
}

export interface NetworkingSession {
  SessionID: string;
  UserID: string; // Foreign key to UserProfile
  EventID: string; // Foreign key to EventContext
  SessionTimestamp: string;
}

export interface GeneratedStarter {
  StarterID: string;
  SessionID: string; // Foreign key to NetworkingSession
  StarterText: string;
  ContextPromptUsed: string; // The exact contextual prompt/template used to prompt AI
}

export interface WikipediaFactCheck {
  FactCheckID: string;
  SessionID: string; // Foreign key to NetworkingSession
  VerifiedQueryText: string;
  VerificationStatus: 'Verified' | 'Disputed' | 'Unverified';
  WikipediaSourceURL: string;
}

export interface LogEntry {
  LogID: string;
  SessionID: string | null; // Optional foreign key to NetworkingSession
  ActionType: string; // e.g. 'CREATE_PROFILE', 'ANALYZE_THEMES', 'GENERATE_STARTERS', 'FACT_CHECK'
  PayloadJSON: string; // Parsed or raw stringified JSON for auditing
  Timestamp: string;
}

// Database schema container
export interface AppDatabaseState {
  userProfiles: UserProfile[];
  eventContexts: EventContext[];
  networkingSessions: NetworkingSession[];
  generatedStarters: GeneratedStarter[];
  wikipediaFactChecks: WikipediaFactCheck[];
  logEntries: LogEntry[];
}
