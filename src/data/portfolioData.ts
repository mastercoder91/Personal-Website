import { SocialBadge, TrackItem, CurrentlyItem, GuestbookEntry } from '../types';

export const SOCIAL_STAMPS: SocialBadge[] = [
  {
    id: 'github',
    name: 'GitHub',
    hindiName: 'गिटहब संकलन',
    handle: '@mastercoder91',
    url: 'https://github.com/mastercoder91',
    denomination: '₹5.00',
    hindiDenomination: '₹५.००',
    color: '#0E3D3C', // Deep Teal
    accentColor: '#E6A92A',
    postmarkCity: 'NAGPUR G.P.O.',
    hindiPostmark: 'नागपुर प्रधान डाकघर',
    postmarkDate: '25 AUG 88',
    category: 'code',
    description: 'Open source crafts, compilers, distributed systems, & esoteric UI experiments.',
    iconName: 'Github'
  },
  {
    id: 'x-twitter',
    name: 'X / Twitter',
    hindiName: 'एक्स / ट्विटर',
    handle: '@AaravMaturkar',
    url: 'https://x.com/AaravMaturkar',
    denomination: '25 NP',
    hindiDenomination: '२५ पैसे',
    color: '#D95D39', // Bold Terracotta
    accentColor: '#F5F2ED',
    postmarkCity: 'AIR MAIL / EXP.',
    hindiPostmark: 'विमान डाक सेवा',
    postmarkDate: 'TRANSIT 1984',
    category: 'social',
    description: 'Dispatches on typography, mechanical keyboards, software architecture, & analog aesthetics.',
    iconName: 'Twitter'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    hindiName: 'इंस्टाग्राम छवि',
    handle: '@aaravmaturkar',
    url: 'https://www.instagram.com/aaravmaturkar/',
    denomination: '15 NP',
    hindiDenomination: '१५ पैसे',
    color: '#8A252C', // Deep Crimson
    accentColor: '#E6A92A',
    postmarkCity: 'MADRAS REGION',
    hindiPostmark: 'मद्रास मुहर',
    postmarkDate: 'SPECIAL ISSUE',
    category: 'social',
    description: '35mm film grain, brutalist architecture, chai stalls, and vintage bookshop finds.',
    iconName: 'Instagram'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    hindiName: 'स्पॉटिफ़ाई संगीत',
    handle: '@aaravmaturkar',
    url: 'https://open.spotify.com/user/314bb3mmmvzudtze44vzcxykmwaa',
    denomination: '₹2.00',
    hindiDenomination: '₹२.००',
    color: '#164E4D', // Forest Jade / Vintage Teal
    accentColor: '#E6A92A',
    postmarkCity: 'SOUND ARCHIVES',
    hindiPostmark: 'ध्वनि अभिलेखागार',
    postmarkDate: 'STEREO LP',
    category: 'music',
    description: '1970s Bollywood funk, Japanese ambient jazz, synthwave, & Indian classical ragas.',
    iconName: 'Disc'
  },
  {
    id: 'email',
    name: 'Electronic Mail',
    hindiName: 'सीधा पत्र व्यवहार',
    handle: 'codemaster923@gmail.com',
    url: 'mailto:codemaster923@gmail.com',
    denomination: 'EXPRESS',
    hindiDenomination: 'द्रुत डाक',
    color: '#E6A92A', // Mustard Gold
    accentColor: '#141414',
    postmarkCity: 'DISPATCH READY',
    hindiPostmark: 'स्पीड पोस्ट मुहर',
    postmarkDate: 'SPEED POST',
    category: 'direct',
    description: 'Direct inquiries, collaboration invitations, or a warm cup of filter coffee.',
    iconName: 'Mail'
  }
];

export const VINYL_TRACKS: TrackItem[] = [
  {
    id: 'track-1',
    title: "Ananda Shankar — Jumpin'",
    hindiTitle: "आनंद शंकर — जंपिन (सितार फ्यूज़न)",
    artist: "Ananda Shankar Orchestra",
    year: "1975",
    genre: "Indo-Psych Funk & Sitar",
    bpm: 112,
    frequencies: [293.66, 349.23, 440.00, 523.25],
    color: "#D95D39",
    description: "Iconic fuzz sitar and breakbeats pioneering the Indo-electronic psych groove."
  },
  {
    id: 'track-2',
    title: "Nagpur Monsoons '84",
    hindiTitle: "नागपुर वर्षा '८४ (लो-फ़ाई राग)",
    artist: "Aarav Sound System",
    year: "1984",
    genre: "Ambient Lofi Synth",
    bpm: 78,
    frequencies: [293.66, 349.23, 440.00, 523.25],
    color: "#D95D39",
    description: "Analog tape saturation, warmth of monsoon rain, and electric piano reverberations across Ambazari Lake."
  },
  {
    id: 'track-3',
    title: "Raga Yaman in 8-Bit Nocturne",
    hindiTitle: "राग यमन — अष्ट-बिट रात्रि राग",
    artist: "The Midnight Archivist",
    year: "1988",
    genre: "Indo-Synthwave",
    bpm: 86,
    frequencies: [329.63, 392.00, 493.88, 587.33],
    color: "#0E3D3C",
    description: "Evening microtones translated into warm analog triangular oscillators and vintage tape delay."
  },
  {
    id: 'track-4',
    title: "Chai & Mechanical Keyboards",
    hindiTitle: "चाय एवं यांत्रिक कुंजीपटल",
    artist: "Late Night Terminal",
    year: "1989",
    genre: "Lofi Focus Tape",
    bpm: 72,
    frequencies: [349.23, 440.00, 523.25, 659.25],
    color: "#E6A92A",
    description: "The rhythmic percussion of buckling springs, simmering cardamom tea, and deep thought."
  }
];

export const CURRENTLY_LIST: CurrentlyItem[] = [
  {
    category: 'BUILDING',
    hindiCategory: 'निर्माण',
    title: 'Kinetic Web Artifacts',
    hindiTitle: 'गतिज वेब शिल्प',
    subtitle: 'Exploring tactile web typography, Web Audio synths, and retro digital physicalism',
    tag: 'TypeScript · CSS 3D · Canvas',
    quote: '"Make pixels feel like ink on heavyweight cotton rag."',
    icon: 'Hammer',
    accent: '#D95D39'
  },
  {
    category: 'READING',
    hindiCategory: 'पठन',
    title: 'Design as Art',
    hindiTitle: 'कला के रूप में डिज़ाइन',
    subtitle: 'Bruno Munari & Indian Ephemera of the late 20th century',
    tag: 'Editorial History · Visual Language',
    quote: '"Complication is easy; simplification requires mastery."',
    icon: 'Book',
    accent: '#0E3D3C'
  },
  {
    category: 'LISTENING',
    hindiCategory: 'श्रवण',
    title: 'R.D. Burman & Charanjit Singh',
    hindiTitle: 'आर. डी. बर्मन एवं चरणजीत सिंह',
    subtitle: 'Ten Ragas to a Disco Beat (1982) & Vintage HMV pressings',
    tag: 'Vinyl LP · Roland TB-303 · Analog Synths',
    quote: '"Pre-acid house invented in Nagpur before anyone knew what to call it."',
    icon: 'Radio',
    accent: '#E6A92A'
  },
  {
    category: 'WATCHING',
    hindiCategory: 'दर्शन',
    title: 'Formula 1 & Telemetry',
    hindiTitle: 'फ़ॉर्मूला १ एवं गतिमिति',
    subtitle: 'Grand Prix race strategies, tire degradation charts, and aerodynamics analysis',
    tag: 'F1 Racing · Telemetry · High Speed',
    quote: '"Precision engineering and high-speed problem solving at 300+ km/h."',
    icon: 'Compass',
    accent: '#8A252C'
  },
  {
    category: 'EXPLORING',
    hindiCategory: 'अन्वेषण',
    title: "playin' time",
    hindiTitle: 'खेल व विश्राम',
    subtitle: 'having a vast collection on steam is a headache to last decades, currently playing meccha chameleon, cs2 and minecraft',
    tag: 'Steam Vault · Gaming Loop',
    quote: '"deadass."',
    icon: 'Compass',
    accent: '#141414'
  }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'note-1',
    author: 'Mira Sen',
    handle: '@mirasen_design',
    city: 'Nagpur',
    message: 'The typography here is breathtaking. Feels like flipping through an exquisite 1982 edition of India Today and a vinyl catalog all at once!',
    timestamp: 'Yesterday at 8:42 PM',
    sealColor: '#D95D39',
    sealSymbol: 'sun'
  },
  {
    id: 'note-2',
    author: 'Devendra V.',
    handle: '@dev_audio',
    city: 'Bengaluru',
    message: 'That Web Audio cassette synth genuinely caught me off guard. Pristine attention to detail and tactile delight. 10/10 craftsmanship.',
    timestamp: 'Aug 24, 1988',
    sealColor: '#0E3D3C',
    sealSymbol: 'paisley'
  },
  {
    id: 'note-3',
    author: 'Elena Rostova',
    handle: '@elena_type',
    city: 'Prague',
    message: 'Every web page in 2026 should have this much soul and aesthetic conviction. Stamping this into my permanent inspiration board.',
    timestamp: 'Aug 23, 1988',
    sealColor: '#E6A92A',
    sealSymbol: 'lotus'
  }
];
