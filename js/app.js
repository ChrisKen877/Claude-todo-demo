import { EXERCISES, ROUTINES, AREAS, getExercise, getRoutine, routineSeconds } from './exercises.js';
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

  const routines = [getRoutine(suggested), ...ROUTINES.filter((r) => r.id !== suggested)];

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
      ${stats.doneToday ? '✓ Heute schon gedehnt – stark!' : 'Heute steht noch eine Einheit aus.'}
    </p>

    ${showInstall ? `
      <aside class="card hint">
        <div>
          <strong>Als App installieren</strong>
          <p>In Safari auf <em>Teilen</em> und dann <em>Zum Home-Bildschirm</em> tippen. So läuft die App im Vollbild, offline und deine Daten bleiben dauerhaft gespeichert.</p>
        </div>
        <button class="icon-btn small" data-act="dismiss-install" aria-label="Hinweis ausblenden">✕</button>
      </aside>` : ''}

    <h2 class="section-title">Routinen</h2>
    <div class="routine-list">
      ${routines.map((r, i) => `
        <article class="card routine ${i === 0 ? 'featured' : ''}">
          <div class="routine-figure" data-figure="${r.exercises[0]}" ${i === 0 ? 'data-animate="true"' : ''}></div>
          <div class="routine-body">
            ${i === 0 ? '<p class="eyebrow accent">Vorschlag für jetzt</p>' : ''}
            <h3>${esc(r.name)}</h3>
            <p class="muted">${esc(r.description)}</p>
            <p class="meta">${minutes(routineSeconds(r, settings.rest))} · ${r.exercises.length} Übungen</p>
            <button class="btn ${i === 0 ? 'primary' : ''}" data-start="${r.id}">Starten</button>
          </div>
        </article>`).join('')}
    </div>`;
  mountFigures();
}

// ---------- Übungen ----------
let areaFilter = 'Alle';
function renderLibrary() {
  const list = areaFilter === 'Alle' ? EXERCISES : EXERCISES.filter((e) => e.area === areaFilter);
  view.innerHTML = `
    <header class="page-head"><h1>Übungen</h1><p class="muted">Alle ohne Geräte. Tippe auf eine Übung für die Anleitung.</p></header>
    <div class="chips" role="group" aria-label="Nach Körperbereich filtern">
      ${['Alle', ...AREAS].map((a) => `<button class="chip ${a === areaFilter ? 'active' : ''}" data-area="${esc(a)}" aria-pressed="${a === areaFilter}">${esc(a)}</button>`).join('')}
    </div>
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

// ---------- Navigation ----------
function route() {
  const [, page, param] = (location.hash || '#/heute').split('/');
  window.scrollTo(0, 0);
  if (page === 'uebungen') renderLibrary();
  else if (page === 'uebung') renderExercise(param);
  else if (page === 'verlauf') renderHistory();
  else if (page === 'einstellungen') renderSettings();
  else renderToday();
  const tab = page === 'uebung' ? 'uebungen' : page || 'heute';
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
  if (t.dataset.start) startRoutine(getRoutine(t.dataset.start));
  if (t.dataset.single) {
    const ex = getExercise(t.dataset.single);
    startRoutine({ id: `einzel-${ex.id}`, name: ex.name, exercises: [ex.id] });
  }
  if (t.dataset.area) { areaFilter = t.dataset.area; renderLibrary(); }
  if (t.dataset.month) { monthOffset += Number(t.dataset.month); renderHistory(); }
  if (t.dataset.delete && confirm('Diesen Eintrag löschen?')) { store.deleteSession(t.dataset.delete); renderHistory(); }
  if (t.dataset.day) {
    const day = Number(t.dataset.day);
    const days = store.getSettings().reminderDays;
    store.saveSettings({ reminderDays: days.includes(day) ? days.filter((d) => d !== day) : [...days, day] });
    renderSettings();
  }
  if (t.dataset.act === 'dismiss-install') { store.saveSettings({ installHintDismissed: true }); renderToday(); }
  if (t.dataset.act === 'ics') downloadReminder();
  if (t.dataset.act === 'export') saveFile(store.exportData(), `dehnroutine-${store.dayKey()}.json`, 'application/json');
});

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
