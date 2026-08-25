export type ScreenEffectMode = 
  | 'clean' 
  | 'crt' 
  | 'riso' 
  | 'amber' 
  | 'cyber' 
  | 'blueprint' 
  | 'sepia' 
  | 'vhs';

export interface SocialBadge {
  id: string;
  name: string;
  handle: string;
  url: string;
  denomination: string; // e.g. "₹2.50", "25 NP", "50 NP"
  color: string;
  accentColor: string;
  postmarkCity: string;
  postmarkDate: string;
  category: 'code' | 'social' | 'music' | 'writing' | 'direct';
  description: string;
  iconName: string;
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  year: string;
  genre: string;
  bpm: number;
  frequencies: number[]; // chord notes for synthesizer
  color: string;
  description: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  handle?: string;
  city: string;
  message: string;
  timestamp: string;
  sealColor: string;
  sealSymbol: 'sun' | 'paisley' | 'lotus' | 'star' | 'crown';
}

export interface CurrentlyItem {
  category: 'READING' | 'BUILDING' | 'LISTENING' | 'SIPPING' | 'EXPLORING' | 'WATCHING' | string;
  title: string;
  subtitle: string;
  tag: string;
  quote?: string;
  icon: string;
  accent: string;
}
