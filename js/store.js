// Lokale Datenhaltung (bleibt auf dem Gerät) und Statistiken.

const KEYS = { sessions: 'dehnen.sessions.v1', settings: 'dehnen.settings.v1' };

export const DEFAULT_SETTINGS = {
  rest: 10,
  prep: 5,
  sound: true,
  voice: true,
  reminderTime: '07:30',
  reminderDays: [1, 2, 3, 4, 5], // 0 = Sonntag … 6 = Samstag
  installHintDismissed: false,
  favoriteRoutines: [], // Routinen-IDs in der Reihenfolge, in der sie markiert wurden
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export const getSessions = () => read(KEYS.sessions, []);
export const getSettings = () => ({ ...DEFAULT_SETTINGS, ...read(KEYS.settings, {}) });
export const saveSettings = (patch) => write(KEYS.settings, { ...getSettings(), ...patch });

export function addSession(session) {
  const all = getSessions();
  all.push(session);
  return write(KEYS.sessions, all);
}

export function deleteSession(id) {
  write(KEYS.sessions, getSessions().filter((s) => s.id !== id));
}

export function dayKey(date = new Date()) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const addDays = (date, n) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);

export function computeStats(sessions = getSessions()) {
  const days = new Set(sessions.map((s) => dayKey(s.date)));
  const today = new Date();

  // Aktuelle Serie: zählt ab heute – oder ab gestern, solange heute noch offen ist.
  let cursor = days.has(dayKey(today)) ? today : addDays(today, -1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor = addDays(cursor, -1);
  }

  let best = 0;
  let run = 0;
  let prev = null;
  for (const key of [...days].sort()) {
    const [y, m, d] = key.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    run = prev && dayKey(addDays(prev, 1)) === key ? run + 1 : 1;
    best = Math.max(best, run);
    prev = date;
  }

  const weekday = (today.getDay() + 6) % 7; // Montag = 0
  const weekStart = addDays(today, -weekday);
  const weekSeconds = sessions
    .filter((s) => new Date(s.date) >= weekStart)
    .reduce((sum, s) => sum + s.seconds, 0);

  return {
    days,
    streak,
    best,
    total: sessions.length,
    weekMinutes: Math.round(weekSeconds / 60),
    doneToday: days.has(dayKey(today)),
  };
}

export function exportData() {
  return JSON.stringify({ app: 'dehnroutine', version: 1, sessions: getSessions(), settings: getSettings() }, null, 2);
}

export function importData(text) {
  const data = JSON.parse(text);
  if (data.app !== 'dehnroutine' || !Array.isArray(data.sessions)) throw new Error('Unbekanntes Format');
  const known = new Set(getSessions().map((s) => s.id));
  const merged = [...getSessions(), ...data.sessions.filter((s) => s && s.id && !known.has(s.id))];
  write(KEYS.sessions, merged);
  if (data.settings) saveSettings(data.settings);
  return merged.length;
}
