import { EXERCISES, ROUTINES, AREAS, getExercise, getRoutine, routineSeconds, entryId, entrySeconds } from './exercises.js';
import { Figure } from './figure.js';
import { Trainer } from './trainer.js';
import * as store from './store.js';

const view = document.getElementById('view');
const trainer = new Trainer(document.getElementById('trainer'), { onExit: () => route() });

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const minutes = (secs) => `${Math.max(1, Math.round(secs / 60))} Min.`;

// Figuren in Platzhalter-Elementen (data-figure="id") einsetzen.
function mountFigures(root = view) {
  root.querySelectorAll('[data-figure]').forEach((node) => {
    const ex = getExercise(node.dataset.figure);
    if (!ex) return;
    new Figure(node, { label: `Strichfigur: ${ex.name}` }).show(ex, { animate: node.dataset.animate === 'true' });
  });
}

// Feste und eigene Routinen
const findRoutine = (id) => getRoutine(id) || store.getCustomRoutines().find((r) => r.id === id);

// Beschreibung eigener Routinen aus den enthaltenen Bereichen ableiten.
function routineDescription(r) {
  if (!r.custom) return r.description;
  const areas = [...new Set(r.exercises.map((e) => getExercise(entryId(e))?.area).filter(Boolean))];
  return `Eigene Routine · ${areas.join(', ')}`;
}

function startRoutine(routine) {
  trainer.start(routine);
}

// ---------- Heute ----------
function renderToday() {
  const settings = store.getSettings();
  const stats = store.computeStats();
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Guten Morgen' : hour < 18 ? 'Hallo' : 'Guten Abend';
  const suggested = hour < 11 ? 'morgen' : hour < 18 ? 'buero' : 'abend';
  const dateText = new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const showInstall = !standalone && !settings.installHintDismissed;

  // Reihenfolge: Favoriten (in der Reihenfolge, in der sie markiert wurden), dann der
  // Vorschlag für die Tageszeit (falls nicht schon Favorit), dann alle übrigen Routinen.
  const favIds = settings.favoriteRoutines.filter((id) => findRoutine(id));
  const favorites = favIds.map(findRoutine);
  const suggestion = favIds.includes(suggested) ? null : getRoutine(suggested);
  const customs = store.getCustomRoutines().filter((r) => !favIds.includes(r.id));
  const others = ROUTINES.filter((r) => !favIds.includes(r.id) && r.id !== suggested);

  const heart = '<svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="M12 20s-7-4.4-9.2-8.6C1.2 8.3 3 4.5 6.6 4.5c2.1 0 3.4 1.2 5.4 3.3 2-2.1 3.3-3.3 5.4-3.3 3.6 0 5.4 3.8 3.8 6.9C19 15.6 12 20 12 20z"/></svg>';
  const card = (r, { featured = false, eyebrow = '' } = {}) => {
    const fav = favIds.includes(r.id);
    return `
      <article class="card routine ${featured ? 'featured' : ''}">
        <div class="routine-figure" data-figure="${entryId(r.exercises[0])}" ${featured ? 'data-animate="true"' : ''}></div>
        <div class="routine-body">
          ${eyebrow ? `<p class="eyebrow accent">${esc(eyebrow)}</p>` : ''}
          <h3>${esc(r.name)}</h3>
          <p class="muted">${esc(routineDescription(r))}</p>
          <p class="meta">${minutes(routineSeconds(r, settings.rest))} · ${r.exercises.length} Übungen</p>
          <div class="btn-row tight">
            <button class="btn ${featured ? 'primary' : ''}" data-start="${r.id}">Starten</button>
            ${r.custom ? `<a class="btn ghost" href="#/routine/${esc(r.id)}">Bearbeiten</a>` : ''}
          </div>
        </div>
        <button class="fav-btn ${fav ? 'active' : ''}" data-fav="${r.id}" aria-pressed="${fav}"
          aria-label="${esc(r.name)} ${fav ? 'aus den Favoriten entfernen' : 'zu den Favoriten hinzufügen'}">${heart}</button>
      </article>`;
  };

  view.innerHTML = `
    <header class="page-head">
      <p class="eyebrow">${esc(dateText)}</p>
      <h1>${greeting}</h1>
    </header>

    <section class="stats" aria-label="Statistik">
      <div class="stat"><span class="stat-value">${stats.streak}</span><span class="stat-label">${stats.streak === 1 ? 'Tag' : 'Tage'} Serie</span></div>
      <div class="stat"><span class="stat-value">${stats.weekMinutes}</span><span class="stat-label">Min. diese Woche</span></div>
      <div class="stat"><span class="stat-value">${stats.total}</span><span class="stat-label">Einheiten</span></div>
    </section>

    <p class="today-status ${stats.doneToday ? 'done' : ''}">
      ${stats.doneToday ? '✓ Heute schon trainiert – stark!' : 'Heute steht noch eine Einheit aus.'}
    </p>

    ${showInstall ? `
      <aside class="card hint">
        <div>
          <strong>Als App installieren</strong>
          <p>In Safari auf <em>Teilen</em> und dann <em>Zum Home-Bildschirm</em> tippen. So läuft die App im Vollbild, offline und deine Daten bleiben dauerhaft gespeichert.</p>
        </div>
        <button class="icon-btn small" data-act="dismiss-install" aria-label="Hinweis ausblenden">✕</button>
      </aside>` : ''}

    ${favorites.length ? `
      <h2 class="section-title">Meine Favoriten</h2>
      <div class="routine-list">
        ${favorites.map((r, i) => card(r, { featured: i === 0, eyebrow: r.id === suggested ? 'Vorschlag für jetzt' : '' })).join('')}
      </div>` : ''}

    ${suggestion ? `
      <h2 class="section-title">${favorites.length ? 'Vorschlag für jetzt' : 'Routinen'}</h2>
      <div class="routine-list">${card(suggestion, { featured: !favorites.length, eyebrow: favorites.length ? '' : 'Vorschlag für jetzt' })}</div>` : ''}

    <h2 class="section-title">Meine Routinen</h2>
    ${customs.length ? `<div class="routine-list">${customs.map((r) => card(r)).join('')}</div>` : ''}
    <a class="card create-routine" href="#/routine/neu">
      <span class="create-plus" aria-hidden="true">+</span>
      <span><strong>Eigene Routine erstellen</strong><br><span class="muted">Übungen auswählen, Reihenfolge und Dauer festlegen</span></span>
    </a>

    ${others.length ? `
      <h2 class="section-title">${favorites.length || suggestion ? 'Weitere Routinen' : 'Routinen'}</h2>
      ${favorites.length ? '' : '<p class="muted fav-tip">Tippe auf das Herz, um Routinen als Favoriten ganz oben anzuzeigen.</p>'}
      <div class="routine-list">${others.map((r) => card(r)).join('')}</div>` : ''}`;
  mountFigures();
}

// ---------- Übungen ----------
// Bereiche fürs Dropdown, gruppiert nach Trainingsart. Jede Gruppe ist auch als Ganzes wählbar.
const AREA_GROUPS = [
  ['Dehnen', ['Nacken', 'Schultern & Brust', 'Rücken', 'Hüfte', 'Beine']],
  ['Kräftigen', ['Rumpf']],
  ['Lockern & Entspannen', ['Lockerung', 'Lymphe']],
];
// Bereiche, die in keiner Gruppe stehen, landen unter „Weitere“.
const grouped = new Set(AREA_GROUPS.flatMap(([, areas]) => areas));
const extraAreas = AREAS.filter((a) => !grouped.has(a));
if (extraAreas.length) AREA_GROUPS.push(['Weitere', extraAreas]);

let areaFilter = 'alle';
function filterExercises(value) {
  if (value === 'alle') return EXERCISES;
  if (value.startsWith('gruppe:')) {
    const areas = AREA_GROUPS.find(([name]) => name === value.slice(7))?.[1] || [];
    return EXERCISES.filter((e) => areas.includes(e.area));
  }
  return EXERCISES.filter((e) => e.area === value);
}

const filterLabel = (value) =>
  value === 'alle' ? 'Alle Übungen' : value.startsWith('gruppe:') ? value.slice(7) : value;

function renderLibrary() {
  const list = filterExercises(areaFilter);
  const count = (value) => filterExercises(value).length;
  const item = (value, label, cls = '') => `
    <button class="menu-item ${cls} ${value === areaFilter ? 'active' : ''}" data-filter="${esc(value)}" ${value === areaFilter ? 'aria-current="true"' : ''}>
      <span>${esc(label)}</span><span class="menu-count">${count(value)}</span>
    </button>`;
  view.innerHTML = `
    <header class="lib-head">
      <button class="icon-btn" data-act="menu" aria-label="Bereiche öffnen" aria-expanded="false" aria-controls="area-menu">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <div>
        <h1>Übungen</h1>
        <p class="muted">${esc(filterLabel(areaFilter))} · ${list.length} ${list.length === 1 ? 'Übung' : 'Übungen'}</p>
      </div>
    </header>

    <div class="menu-backdrop" data-act="menu-close" hidden></div>
    <nav class="side-menu" id="area-menu" aria-label="Bereiche" hidden>
      <div class="side-menu-head">
        <strong>Bereiche</strong>
        <button class="icon-btn small" data-act="menu-close" aria-label="Menü schließen">✕</button>
      </div>
      ${item('alle', 'Alle Übungen', 'menu-all')}
      ${AREA_GROUPS.map(([group, areas]) => `
        <div class="menu-group">
          ${areas.length > 1
            ? item(`gruppe:${group}`, group, 'menu-heading')
            : `<p class="menu-heading-label">${esc(group)}</p>`}
          ${areas.map((a) => item(a, a, 'menu-sub')).join('')}
        </div>`).join('')}
    </nav>

    <div class="ex-grid">
      ${list.map((e) => `
        <a class="card ex-card" href="#/uebung/${e.id}">
          <div class="ex-figure" data-figure="${e.id}"></div>
          <h3>${esc(e.name)}</h3>
          <p class="meta">${esc(e.area)} · ${e.seconds} s${e.bilateral ? ' je Seite' : ''}</p>
        </a>`).join('')}
    </div>`;
  mountFigures();
}

function renderExercise(id) {
  const e = getExercise(id);
  if (!e) return (location.hash = '#/uebungen');
  view.innerHTML = `
    <a class="back" href="#/uebungen">‹ Übungen</a>
    <div class="detail-figure card" data-figure="${e.id}" data-animate="true"></div>
    <header class="page-head">
      <p class="eyebrow accent">${esc(e.area)}</p>
      <h1>${esc(e.name)}</h1>
      <p class="muted">${e.seconds} Sekunden${e.bilateral ? ' je Seite' : ''}</p>
    </header>

    <section class="card">
      <h2 class="card-title">So geht's</h2>
      <ol class="steps">${e.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
    </section>
    <section class="card">
      <h2 class="card-title">Darauf achten</h2>
      <ul class="mistakes">${e.mistakes.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </section>
    <section class="card">
      <h2 class="card-title">Leichtere Variante</h2>
      <p>${esc(e.easier)}</p>
    </section>
    <section class="card">
      <h2 class="card-title">Wirkt auf</h2>
      <p>${esc(e.muscles)}</p>
    </section>
    ${e.note === 'lymph' ? `
    <section class="card hint">
      <div>
        <strong>Hinweis</strong>
        <p>Bei akuten Entzündungen, Fieber, Thrombose, Herzschwäche oder nach Operationen bitte vorher ärztlich abklären. Die Übungen ersetzen keine medizinische Lymphdrainage.</p>
      </div>
    </section>` : ''}
    <button class="btn primary wide" data-single="${e.id}">Diese Übung jetzt machen</button>
    <p class="note">Übungen sollen sich gut anfühlen. Bei Schmerzen sofort aufhören.</p>`;
  mountFigures();
}

// ---------- Verlauf ----------
let monthOffset = 0;
function renderHistory() {
  const sessions = store.getSessions();
  const stats = store.computeStats(sessions);
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7;
  const todayKey = store.dayKey();
  const cells = [];
  for (let i = 0; i < lead; i++) cells.push('<span class="cal-cell empty"></span>');
  for (let d = 1; d <= daysInMonth; d++) {
    const key = store.dayKey(new Date(first.getFullYear(), first.getMonth(), d));
    const cls = [stats.days.has(key) && 'done', key === todayKey && 'today'].filter(Boolean).join(' ');
    cells.push(`<span class="cal-cell ${cls}" ${stats.days.has(key) ? 'aria-label="trainiert"' : ''}>${d}</span>`);
  }
  const recent = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);

  view.innerHTML = `
    <header class="page-head"><h1>Verlauf</h1></header>
    <section class="stats">
      <div class="stat"><span class="stat-value">${stats.streak}</span><span class="stat-label">aktuelle Serie</span></div>
      <div class="stat"><span class="stat-value">${stats.best}</span><span class="stat-label">beste Serie</span></div>
      <div class="stat"><span class="stat-value">${stats.weekMinutes}</span><span class="stat-label">Min. diese Woche</span></div>
    </section>

    <section class="card calendar">
      <div class="cal-head">
        <button class="icon-btn small" data-month="-1" aria-label="Vorheriger Monat">‹</button>
        <h2 class="card-title">${MONTHS[first.getMonth()]} ${first.getFullYear()}</h2>
        <button class="icon-btn small" data-month="1" aria-label="Nächster Monat" ${monthOffset >= 0 ? 'disabled' : ''}>›</button>
      </div>
      <div class="cal-grid">
        ${['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((w) => `<span class="cal-wd">${w}</span>`).join('')}
        ${cells.join('')}
      </div>
    </section>

    <h2 class="section-title">Letzte Einheiten</h2>
    ${recent.length ? `<ul class="session-list">
      ${recent.map((s) => `
        <li class="card session">
          <div>
            <strong>${esc(s.routineName)}</strong>
            <span class="meta">${new Date(s.date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })}, ${new Date(s.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} · ${minutes(s.seconds)}</span>
          </div>
          <button class="icon-btn small" data-delete="${esc(s.id)}" aria-label="Eintrag löschen">✕</button>
        </li>`).join('')}
    </ul>` : '<p class="muted empty-state">Noch keine Einheiten – starte deine erste Routine unter „Heute“.</p>'}`;
}

// ---------- Einstellungen ----------
function renderSettings() {
  const s = store.getSettings();
  view.innerHTML = `
    <header class="page-head"><h1>Einstellungen</h1></header>

    <section class="card">
      <h2 class="card-title">Erinnerung</h2>
      <p class="muted">Die Erinnerung wird als wiederkehrender Termin in deinen iPhone-Kalender eingetragen. Das ist auf dem iPhone die zuverlässigste Variante ohne eigenen Server.</p>
      <label class="field">Uhrzeit <input type="time" id="rem-time" value="${esc(s.reminderTime)}"></label>
      <div class="weekdays" role="group" aria-label="Wochentage">
        ${[1, 2, 3, 4, 5, 6, 0].map((d) => `<button class="chip ${s.reminderDays.includes(d) ? 'active' : ''}" data-day="${d}" aria-pressed="${s.reminderDays.includes(d)}">${WEEKDAYS[d]}</button>`).join('')}
      </div>
      <button class="btn primary wide" data-act="ics">Zum Kalender hinzufügen</button>
    </section>

    <section class="card">
      <h2 class="card-title">Training</h2>
      <label class="field">Pause zwischen Übungen
        <select id="rest">${[5, 10, 15, 20].map((n) => `<option value="${n}" ${n === s.rest ? 'selected' : ''}>${n} Sekunden</option>`).join('')}</select>
      </label>
      <label class="field">Vorbereitungszeit
        <select id="prep">${[3, 5, 10].map((n) => `<option value="${n}" ${n === s.prep ? 'selected' : ''}>${n} Sekunden</option>`).join('')}</select>
      </label>
      <label class="toggle"><span>Signaltöne</span><input type="checkbox" id="sound" ${s.sound ? 'checked' : ''}></label>
      <label class="toggle"><span>Sprachansage</span><input type="checkbox" id="voice" ${s.voice ? 'checked' : ''}></label>
    </section>

    <section class="card">
      <h2 class="card-title">Daten</h2>
      <p class="muted">Alles wird nur auf diesem Gerät gespeichert. Mit einer Sicherung kannst du den Verlauf übertragen.</p>
      <div class="btn-row">
        <button class="btn" data-act="export">Sicherung speichern</button>
        <label class="btn">Sicherung laden<input type="file" id="import" accept="application/json,.json" hidden></label>
      </div>
    </section>
    <p class="note">Dehnroutine · Bei Beschwerden oder Verletzungen vorher ärztlich abklären.</p>`;

  const save = (patch) => store.saveSettings(patch);
  view.querySelector('#rem-time').onchange = (e) => save({ reminderTime: e.target.value });
  view.querySelector('#rest').onchange = (e) => save({ rest: Number(e.target.value) });
  view.querySelector('#prep').onchange = (e) => save({ prep: Number(e.target.value) });
  view.querySelector('#sound').onchange = (e) => save({ sound: e.target.checked });
  view.querySelector('#voice').onchange = (e) => save({ voice: e.target.checked });
  view.querySelector('#import').onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const count = store.importData(await file.text());
      alert(`Sicherung geladen – ${count} Einheiten im Verlauf.`);
    } catch {
      alert('Die Datei konnte nicht gelesen werden.');
    }
    renderSettings();
  };
}

// Wiederkehrender Kalendertermin mit Alarm (.ics) – iOS öffnet dafür „Zum Kalender hinzufügen“.
function downloadReminder() {
  const { reminderTime, reminderDays } = store.getSettings();
  if (!reminderDays.length) return alert('Bitte mindestens einen Wochentag wählen.');
  const [hh, mm] = reminderTime.split(':').map(Number);
  const codes = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const start = new Date();
  start.setHours(hh, mm, 0, 0);
  while (!reminderDays.includes(start.getDay()) || start < new Date()) start.setDate(start.getDate() + 1);
  const pad = (n) => String(n).padStart(2, '0');
  const local = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dehnroutine//DE', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:dehnroutine-${Date.now()}@dehnroutine.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${local(start)}`,
    'DURATION:PT10M',
    `RRULE:FREQ=WEEKLY;BYDAY=${[...reminderDays].sort().map((d) => codes[d]).join(',')}`,
    'SUMMARY:Zeit zum Dehnen 🧘',
    `DESCRIPTION:Öffne die Dehnroutine: ${location.origin}${location.pathname}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Zeit zum Dehnen', 'TRIGGER:PT0M', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  saveFile(ics, 'dehnen-erinnerung.ics', 'text/calendar');
}

function saveFile(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

// ---------- Eigene Routinen: Editor ----------
const STEP_SECONDS = 5;
const MIN_SECONDS = 10;
const MAX_SECONDS = 180;
let draft = null; // Routine, die gerade bearbeitet wird
let draftIsNew = true;

function openEditor(param) {
  if (param === 'neu') {
    draft = { id: `eigen-${Date.now().toString(36)}`, name: '', custom: true, exercises: [] };
    draftIsNew = true;
  } else {
    const existing = store.getCustomRoutines().find((r) => r.id === param);
    if (!existing) return (location.hash = '#/heute');
    // Ältere Einträge (nur ID) in { id, seconds } umwandeln
    draft = { ...existing, exercises: existing.exercises.map((e) => ({ id: entryId(e), seconds: entrySeconds(e) })) };
    draftIsNew = false;
  }
  renderEditor();
}

function renderEditor() {
  view.innerHTML = `
    <a class="back" href="#/heute">‹ Heute</a>
    <header class="page-head"><h1>${draftIsNew ? 'Neue Routine' : 'Routine bearbeiten'}</h1></header>
    <label class="field-block" for="routine-name">
      <span class="filter-label">Name</span>
      <input id="routine-name" type="text" maxlength="40" autocomplete="off" placeholder="z. B. Mein Morgen" value="${esc(draft.name)}">
    </label>
    <div id="ed-body"></div>
    <div class="editor-actions">
      <button class="btn primary wide" data-ed="save">Speichern</button>
      <p class="note" id="ed-hint"></p>
      ${draftIsNew ? '' : '<button class="btn danger wide" data-ed="delete">Routine löschen</button>'}
    </div>
    <div class="menu-backdrop" data-ed="pick-close" hidden></div>
    <section class="sheet" id="ed-picker" aria-label="Übungen auswählen" hidden></section>`;
  renderEditorBody();
}

// Übungsliste, Gesamtdauer und Speichern-Zustand (ohne das Namensfeld neu zu zeichnen).
function renderEditorBody() {
  const rest = store.getSettings().rest;
  const n = draft.exercises.length;
  const total = n ? routineSeconds(draft, rest) : 0;
  view.querySelector('#ed-body').innerHTML = `
    <div class="editor-head">
      <h2 class="section-title">Übungen</h2>
      <span class="meta">${n ? `${n} ${n === 1 ? 'Übung' : 'Übungen'} · ${minutes(total)}` : 'noch keine'}</span>
    </div>
    ${n ? `<ol class="ed-list">${draft.exercises.map((entry, i) => {
      const ex = getExercise(entry.id);
      if (!ex) return '';
      return `
        <li class="card ed-row">
          <div class="ed-thumb" data-figure="${ex.id}"></div>
          <div class="ed-info">
            <strong>${esc(ex.name)}</strong>
            <span class="meta">${esc(ex.area)}${ex.bilateral ? ' · je Seite' : ''}</span>
            <div class="stepper" role="group" aria-label="Dauer ${esc(ex.name)}">
              <button data-ed="minus" data-i="${i}" aria-label="${STEP_SECONDS} Sekunden weniger" ${entry.seconds <= MIN_SECONDS ? 'disabled' : ''}>−</button>
              <span>${entry.seconds} s</span>
              <button data-ed="plus" data-i="${i}" aria-label="${STEP_SECONDS} Sekunden mehr" ${entry.seconds >= MAX_SECONDS ? 'disabled' : ''}>+</button>
            </div>
          </div>
          <div class="ed-move">
            <button class="icon-btn small" data-ed="up" data-i="${i}" aria-label="Nach oben" ${i === 0 ? 'disabled' : ''}>↑</button>
            <button class="icon-btn small" data-ed="down" data-i="${i}" aria-label="Nach unten" ${i === n - 1 ? 'disabled' : ''}>↓</button>
            <button class="icon-btn small" data-ed="remove" data-i="${i}" aria-label="${esc(ex.name)} entfernen">✕</button>
          </div>
        </li>`;
    }).join('')}</ol>` : '<p class="muted empty-state">Füge Übungen hinzu – die Reihenfolge kannst du danach mit den Pfeilen ändern.</p>'}
    <button class="btn wide" data-ed="pick">+ Übungen hinzufügen</button>`;
  mountFigures(view.querySelector('#ed-body'));
  updateEditorSave();
}

function updateEditorSave() {
  const missing = [!draft.name.trim() && 'ein Name', !draft.exercises.length && 'mindestens eine Übung'].filter(Boolean);
  view.querySelector('[data-ed="save"]').disabled = missing.length > 0;
  view.querySelector('#ed-hint').textContent = missing.length ? `Zum Speichern fehlt noch: ${missing.join(' und ')}.` : '';
}

function renderPicker() {
  const ids = new Set(draft.exercises.map((e) => e.id));
  const sheet = view.querySelector('#ed-picker');
  sheet.innerHTML = `
    <div class="sheet-head">
      <strong>Übungen auswählen</strong>
      <button class="btn primary" data-ed="pick-close">Fertig</button>
    </div>
    <p class="muted sheet-tip">Tippe an, um eine Übung hinzuzufügen oder wieder zu entfernen.</p>
    ${AREA_GROUPS.map(([group, areas]) => `
      <h3 class="menu-heading-label">${esc(group)}</h3>
      ${EXERCISES.filter((e) => areas.includes(e.area)).map((e) => `
        <button class="pick-row ${ids.has(e.id) ? 'active' : ''}" data-ed="toggle" data-id="${e.id}" aria-pressed="${ids.has(e.id)}">
          <span class="pick-thumb" data-figure="${e.id}"></span>
          <span class="pick-text"><strong>${esc(e.name)}</strong><span class="meta">${esc(e.area)} · ${e.seconds} s${e.bilateral ? ' je Seite' : ''}</span></span>
          <span class="pick-check" aria-hidden="true">${ids.has(e.id) ? '✓' : '+'}</span>
        </button>`).join('')}`).join('')}`;
  mountFigures(sheet);
}

function setPicker(open) {
  const sheet = view.querySelector('#ed-picker');
  const backdrop = view.querySelector('.menu-backdrop');
  document.body.classList.toggle('menu-open', open);
  if (open) {
    renderPicker();
    sheet.hidden = backdrop.hidden = false;
    requestAnimationFrame(() => { sheet.classList.add('open'); backdrop.classList.add('open'); });
    sheet.querySelector('[data-ed="pick-close"]')?.focus();
  } else {
    sheet.classList.remove('open');
    backdrop.classList.remove('open');
    setTimeout(() => { sheet.hidden = backdrop.hidden = true; }, 220);
    view.querySelector('[data-ed="pick"]')?.focus();
  }
}

view.addEventListener('input', (e) => {
  if (e.target.id === 'routine-name' && draft) {
    draft.name = e.target.value;
    updateEditorSave();
  }
});

view.addEventListener('click', (e) => {
  const t = e.target.closest('[data-ed]');
  if (!t || !draft) return;
  const i = Number(t.dataset.i);
  const list = draft.exercises;
  switch (t.dataset.ed) {
    case 'minus': list[i].seconds = Math.max(MIN_SECONDS, list[i].seconds - STEP_SECONDS); break;
    case 'plus': list[i].seconds = Math.min(MAX_SECONDS, list[i].seconds + STEP_SECONDS); break;
    case 'up': [list[i - 1], list[i]] = [list[i], list[i - 1]]; break;
    case 'down': [list[i + 1], list[i]] = [list[i], list[i + 1]]; break;
    case 'remove': list.splice(i, 1); break;
    case 'pick': return setPicker(true);
    case 'pick-close': return setPicker(false);
    case 'toggle': {
      const id = t.dataset.id;
      const at = list.findIndex((x) => x.id === id);
      if (at >= 0) list.splice(at, 1);
      else list.push({ id, seconds: getExercise(id).seconds });
      const on = at < 0;
      t.classList.toggle('active', on);
      t.setAttribute('aria-pressed', String(on));
      t.querySelector('.pick-check').textContent = on ? '✓' : '+';
      break;
    }
    case 'save':
      draft.name = draft.name.trim();
      store.saveCustomRoutine(draft);
      draft = null;
      location.hash = '#/heute';
      return;
    case 'delete':
      if (!confirm(`„${draft.name || 'Routine'}“ wirklich löschen?`)) return;
      store.deleteCustomRoutine(draft.id);
      draft = null;
      location.hash = '#/heute';
      return;
    default: return;
  }
  // Fokus nach dem Neuzeichnen an derselben Stelle halten (Tastatur/VoiceOver)
  const focusSel = ['up', 'down', 'minus', 'plus'].includes(t.dataset.ed)
    ? `[data-ed="${t.dataset.ed}"][data-i="${t.dataset.ed === 'up' ? i - 1 : t.dataset.ed === 'down' ? i + 1 : i}"]` : null;
  renderEditorBody();
  if (focusSel) view.querySelector(focusSel)?.focus();
});

// ---------- Navigation ----------
function route() {
  const [, page, param] = (location.hash || '#/heute').split('/');
  window.scrollTo(0, 0);
  document.body.classList.remove('menu-open');
  if (page === 'uebungen') renderLibrary();
  else if (page === 'uebung') renderExercise(param);
  else if (page === 'routine') openEditor(param);
  else if (page === 'verlauf') renderHistory();
  else if (page === 'einstellungen') renderSettings();
  else renderToday();
  const tab = page === 'uebung' ? 'uebungen' : page === 'routine' ? 'heute' : page || 'heute';
  document.querySelectorAll('.tabbar a').forEach((a) => {
    const active = a.dataset.tab === tab;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

view.addEventListener('click', (e) => {
  const t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.start) startRoutine(findRoutine(t.dataset.start));
  if (t.dataset.single) {
    const ex = getExercise(t.dataset.single);
    startRoutine({ id: `einzel-${ex.id}`, name: ex.name, exercises: [ex.id] });
  }
  if (t.dataset.month) { monthOffset += Number(t.dataset.month); renderHistory(); }
  if (t.dataset.delete && confirm('Diesen Eintrag löschen?')) { store.deleteSession(t.dataset.delete); renderHistory(); }
  if (t.dataset.day) {
    const day = Number(t.dataset.day);
    const days = store.getSettings().reminderDays;
    store.saveSettings({ reminderDays: days.includes(day) ? days.filter((d) => d !== day) : [...days, day] });
    renderSettings();
  }
  if (t.dataset.fav) {
    const favs = store.getSettings().favoriteRoutines;
    const id = t.dataset.fav;
    store.saveSettings({ favoriteRoutines: favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id] });
    renderToday();
    view.querySelector(`[data-fav="${id}"]`)?.focus();
  }
  if (t.dataset.act === 'dismiss-install') { store.saveSettings({ installHintDismissed: true }); renderToday(); }
  if (t.dataset.act === 'ics') downloadReminder();
  if (t.dataset.act === 'export') saveFile(store.exportData(), `dehnroutine-${store.dayKey()}.json`, 'application/json');
});

// ---------- Seitenmenü der Übungen ----------
function setMenu(open) {
  const menu = view.querySelector('#area-menu');
  const backdrop = view.querySelector('.menu-backdrop');
  const toggle = view.querySelector('[data-act="menu"]');
  if (!menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  if (open) {
    menu.hidden = backdrop.hidden = false;
    requestAnimationFrame(() => { menu.classList.add('open'); backdrop.classList.add('open'); });
    (menu.querySelector('.menu-item.active') || menu.querySelector('.menu-item'))?.focus();
  } else {
    menu.classList.remove('open');
    backdrop.classList.remove('open');
    setTimeout(() => { menu.hidden = backdrop.hidden = true; }, 220);
    toggle.focus();
  }
}

view.addEventListener('click', (e) => {
  const t = e.target.closest('[data-act="menu"], [data-act="menu-close"], [data-filter]');
  if (!t) return;
  if (t.dataset.act === 'menu') setMenu(true);
  else if (t.dataset.act === 'menu-close') setMenu(false);
  else {
    areaFilter = t.dataset.filter;
    document.body.classList.remove('menu-open');
    renderLibrary();
    view.querySelector('[data-act="menu"]')?.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !document.body.classList.contains('menu-open')) return;
  if (view.querySelector('#ed-picker:not([hidden])')) setPicker(false);
  else setMenu(false);
});

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
