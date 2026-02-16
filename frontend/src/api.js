// SIMULATED BACKEND WITH DUMMY DATA
// This file runs entirely in the browser using localStorage

const STORAGE_KEYS = {
  PARTICIPANTS: 'mm_participants',
  MATCHES: 'mm_matches',
  CURRENT_USER: 'mm_current_user_email'
};

// --- DUMMY DATA: THE MATRIX CREW ---
const DUMMY_PARTICIPANTS = [
  { id: 'neo', name: "Neo", email: "neo@matrix.org", role: "fullstack", preferred_language: "JavaScript", ide: "VS Code", theme_preference: "dark", role_display: "Full Stack", approach_score: 9 },
  { id: 'trinity', name: "Trinity", email: "trinity@matrix.org", role: "backend", preferred_language: "Python", ide: "Vim", theme_preference: "dark", role_display: "Backend", approach_score: 8 },
  { id: 'morpheus', name: "Morpheus", email: "morpheus@matrix.org", role: "aiml", preferred_language: "Python", ide: "Jupyter", theme_preference: "dark", role_display: "AI / ML", approach_score: 10 },
  { id: 'cypher', name: "Cypher", email: "cypher@matrix.org", role: "frontend", preferred_language: "JavaScript", ide: "Sublime", theme_preference: "light", role_display: "Frontend", approach_score: 4 },
  { id: 'tank', name: "Tank", email: "tank@matrix.org", role: "backend", preferred_language: "Go", ide: "IntelliJ", theme_preference: "dark", role_display: "Backend", approach_score: 7 },
  { id: 'dozer', name: "Dozer", email: "dozer@matrix.org", role: "frontend", preferred_language: "TypeScript", ide: "VS Code", theme_preference: "dark", role_display: "Frontend", approach_score: 6 },
  { id: 'switch', name: "Switch", email: "switch@matrix.org", role: "fullstack", preferred_language: "Rust", ide: "Neovim", theme_preference: "dark", role_display: "Full Stack", approach_score: 5 },
  { id: 'mouse', name: "Mouse", email: "mouse@matrix.org", role: "frontend", preferred_language: "JavaScript", ide: "VS Code", theme_preference: "light", role_display: "Frontend", approach_score: 3 },
  { id: 'smith', name: "Agent Smith", email: "smith@matrix.org", role: "backend", preferred_language: "C++", ide: "Notepad", theme_preference: "light", role_display: "Backend", approach_score: 10 },
  { id: 'oracle', name: "The Oracle", email: "oracle@matrix.org", role: "aiml", preferred_language: "Lisp", ide: "Emacs", theme_preference: "light", role_display: "AI / ML", approach_score: 10 },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Get Database
const getDb = () => {
  let participants = JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTICIPANTS) || '[]');
  let matches = JSON.parse(localStorage.getItem(STORAGE_KEYS.MATCHES) || '[]');

  // SEED DATA IF EMPTY
  // If we have less than 2 people, inject the Matrix crew so the app doesn't look empty
  if (participants.length < 2) {
    // Keep existing user if they exist
    const existing = participants;
    // Add dummies who aren't already in the list
    const newDummies = DUMMY_PARTICIPANTS.filter(d => !existing.find(e => e.email === d.email));
    participants = [...existing, ...newDummies];
    localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(participants));
  }

  return { participants, matches };
};

const saveDb = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Formatting helpers
const formatParticipant = (p) => ({
  ...p,
  role_display: p.role_display || (p.role ? p.role.charAt(0).toUpperCase() + p.role.slice(1) : 'Developer'),
  theme_display: p.theme_display || (p.theme_preference === 'dark' ? 'Dark Mode' : 'Light Mode'),
  is_matched: getDb().matches.some(m => m.participant1.email === p.email || m.participant2.email === p.email)
});

export const participantAPI = {
  register: async (data) => {
    await delay(600);
    const db = getDb(); // Triggers seeding
    
    // Check if exists
    if (db.participants.find(p => p.email === data.email)) {
      const updated = db.participants.map(p => p.email === data.email ? { ...p, ...data } : p);
      saveDb(STORAGE_KEYS.PARTICIPANTS, updated);
    } else {
      const newParticipant = { 
        ...data, 
        id: Date.now().toString(),
        role_display: data.role.charAt(0).toUpperCase() + data.role.slice(1),
        theme_display: data.theme_preference === 'dark' ? 'Dark Mode' : 'Light Mode'
      };
      saveDb(STORAGE_KEYS.PARTICIPANTS, [...db.participants, newParticipant]);
    }
    
    return { data: { success: true } };
  },

  getMyMatch: async (email) => {
    await delay(300);
    const db = getDb(); // Ensures dummies are loaded
    const me = db.participants.find(p => p.email === email);
    
    if (!me) throw { response: { data: { message: 'User not found' } } };

    // 1. Look for existing match
    let match = db.matches.find(m => 
      m.participant1.email === email || m.participant2.email === email
    );

    // 2. FORCE MATCH IF NOT FOUND (Fixes "Scanning Network" loop)
    if (!match) {
      // Find a partner who isn't me and isn't already matched
      const matchedEmails = new Set(db.matches.flatMap(m => [m.participant1.email, m.participant2.email]));
      const candidates = db.participants.filter(p => p.email !== email && !matchedEmails.has(p.email));
      
      if (candidates.length > 0) {
        // Pick random partner or the "best" one
        const partner = candidates[Math.floor(Math.random() * candidates.length)];
        
        // Calculate fake score
        let score = 75 + Math.floor(Math.random() * 24);
        
        match = {
          id: Date.now(),
          participant1: me,
          participant2: partner,
          compatibility_percentage: score,
          created_at: new Date().toISOString()
        };

        // Save this new match
        const newMatches = [...db.matches, match];
        saveDb(STORAGE_KEYS.MATCHES, newMatches);
      }
    }

    if (match) {
      const isP1 = match.participant1.email === email;
      return {
        data: {
          success: true,
          data: {
            match_found: true,
            participant: formatParticipant(isP1 ? match.participant1 : match.participant2),
            partner: formatParticipant(isP1 ? match.participant2 : match.participant1),
            compatibility_percentage: match.compatibility_percentage
          }
        }
      };
    }

    // Fallback if absolutely no one is available (shouldn't happen with dummies)
    return {
      data: {
        success: true,
        data: {
          match_found: false,
          participant: formatParticipant(me)
        }
      }
    };
  }
};

export const adminAPI = {
  getAllParticipants: async () => {
    await delay(300);
    const db = getDb();
    return {
      data: {
        success: true,
        participants: db.participants.map(formatParticipant)
      }
    };
  },

  getAllMatches: async () => {
    await delay(300);
    const db = getDb();
    return {
      data: {
        success: true,
        matches: db.matches.map(m => ({
          ...m,
          participant1: formatParticipant(m.participant1),
          participant2: formatParticipant(m.participant2)
        }))
      }
    };
  },

  generateMatches: async () => {
    await delay(1000);
    const db = getDb();
    
    // Reset all matches
    let pool = [...db.participants];
    const newMatches = [];
    
    // Random shuffle
    pool = pool.sort(() => Math.random() - 0.5);

    while (pool.length >= 2) {
      const p1 = pool.pop();
      const p2 = pool.pop();
      
      const score = 60 + Math.floor(Math.random() * 40);

      newMatches.push({
        id: Date.now() + Math.random(),
        participant1: p1,
        participant2: p2,
        compatibility_percentage: score,
        created_at: new Date().toISOString()
      });
    }

    saveDb(STORAGE_KEYS.MATCHES, newMatches);

    return {
      data: {
        success: true,
        stats: {
          total_participants: db.participants.length,
          matches_created: newMatches.length,
          matched_participants: newMatches.length * 2,
          unmatched_participants: pool.length
        }
      }
    };
  }
};

export default { participantAPI, adminAPI };