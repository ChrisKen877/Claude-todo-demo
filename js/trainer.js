// Geführtes Training: Vorbereitung → Übung → Pause → … → Geschafft.
import { buildSteps, SIDE_SWITCH_SECONDS } from './exercises.js';
import { Figure } from './figure.js';
import { getSettings, addSession, computeStats } from './store.js';

const RING = 2 * Math.PI * 54;

const ICONS = {
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M7 5v14M19 5l-9 7 9 7z"/>',
  next: '<path d="M17 5v14M5 5l9 7-9 7z"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true" class="icon">${ICONS[name]}</svg>`;

export class Trainer {
  constructor(root, { onExit }) {
    this.root = root;
    this.onExit = onExit;
    this.timer = 0;
    this.audio = null;
    this.wakeLock = null;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.running) this.lockScreen();
    });
  }

  // Muss aus einem Tipp heraus aufgerufen werden (iOS erlaubt Ton/Sprache nur dann).
  start(routine) {
    this.settings = getSettings();
    this.routine = routine;
    this.steps = buildSteps(routine);
    this.index = 0;
    this.activeMs = 0;
    this.paused = false;
    this.running = true;
    this.unlockAudio();
    this.render();
    this.root.hidden = false;
    document.body.classList.add('training');
    this.lockScreen();
    this.enter('prep', this.settings.prep);
    this.say(`${routine.name}. Los geht's mit ${this.steps[0].ex.name}.`);
    this.timer = setInterval(() => this.tick(), 200);
  }

  render() {
    this.root.innerHTML = `
      <div class="tr-top">
        <button class="icon-btn" data-act="close" aria-label="Training beenden">${icon('close')}</button>
        <div class="tr-progress" aria-hidden="true"><div class="tr-progress-bar"></div></div>
        <span class="tr-count"></span>
      </div>
      <div class="tr-stage">
        <p class="tr-phase"></p>
        <h2 class="tr-name"></h2>
        <p class="tr-side"></p>
        <div class="tr-figure"></div>
      </div>
      <div class="tr-timer">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" class="ring-bg"/>
          <circle cx="60" cy="60" r="54" class="ring-fg" stroke-dasharray="${RING}" transform="rotate(-90 60 60)"/>
        </svg>
        <span class="tr-seconds" aria-live="off"></span>
      </div>
      <p class="tr-cue"></p>
      <div class="tr-controls">
        <button class="icon-btn" data-act="prev" aria-label="Zurück">${icon('prev')}</button>
        <button class="icon-btn big" data-act="pause" aria-label="Pause">${icon('pause')}</button>
        <button class="icon-btn" data-act="next" aria-label="Weiter">${icon('next')}</button>
      </div>`;
    const $ = (s) => this.root.querySelector(s);
    this.ui = {
      bar: $('.tr-progress-bar'), count: $('.tr-count'), phase: $('.tr-phase'), name: $('.tr-name'),
      side: $('.tr-side'), seconds: $('.tr-seconds'), ring: $('.ring-fg'), cue: $('.tr-cue'),
      pause: $('[data-act="pause"]'),
    };
    this.figure = new Figure($('.tr-figure'));
    this.root.onclick = (e) => {
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (act === 'close') this.confirmExit();
      if (act === 'pause') this.togglePause();
      if (act === 'next') this.skip(1);
      if (act === 'prev') this.skip(-1);
      if (act === 'finish') this.exit();
    };
  }

  enter(phase, seconds) {
    this.phase = phase;
    this.duration = seconds;
    this.endAt = performance.now() + seconds * 1000;
    this.lastBeep = null;
    const step = this.steps[this.index];
    const isWork = phase === 'work';
    this.root.dataset.phase = phase;

    this.ui.phase.textContent =
      phase === 'prep' ? 'Mach dich bereit' :
      phase === 'rest' ? (step.side === 2 ? 'Seitenwechsel' : 'Pause – als Nächstes') : '';
    this.ui.name.textContent = step.ex.name;
    this.ui.side.textContent = step.side ? `Seite ${step.side} von 2` : '';
    this.ui.cue.textContent = isWork ? step.ex.cue : step.ex.steps[0];
    this.ui.count.textContent = `${this.index + 1}/${this.steps.length}`;
    this.ui.bar.style.width = `${(this.index / this.steps.length) * 100}%`;
    this.figure.show(step.ex, { mirror: step.side === 2, animate: true });
    this.update(seconds);
  }

  tick() {
    if (this.paused) return;
    const now = performance.now();
    if (this.last) this.activeMs += now - this.last;
    this.last = now;
    const remaining = Math.max(0, (this.endAt - now) / 1000);
    this.update(remaining);

    const whole = Math.ceil(remaining);
    if (whole <= 3 && whole > 0 && whole !== this.lastBeep) {
      this.lastBeep = whole;
      this.beep(660, 0.09);
    }
    if (remaining <= 0) this.advance();
  }

  update(remaining) {
    this.ui.seconds.textContent = Math.ceil(remaining);
    this.ui.ring.style.strokeDashoffset = `${RING * (1 - remaining / this.duration)}`;
  }

  advance() {
    if (this.phase === 'work') {
      if (this.index >= this.steps.length - 1) return this.finish();
      this.index++;
      const next = this.steps[this.index];
      const restSecs = next.side === 2 ? SIDE_SWITCH_SECONDS : this.settings.rest;
      this.enter('rest', restSecs);
      this.say(next.side === 2 ? 'Seitenwechsel.' : `Pause. Als Nächstes: ${next.ex.name}.`);
    } else {
      this.enter('work', this.steps[this.index].seconds);
      this.beep(880, 0.25);
      if (this.steps[this.index].side !== 2) this.say(this.steps[this.index].ex.name);
    }
  }

  skip(dir) {
    if (!this.running) return;
    if (dir > 0) {
      // Pause/Vorbereitung überspringen → direkt in die Übung; Übung überspringen → nächste.
      if (this.phase === 'work' && this.index >= this.steps.length - 1) return this.finish();
      if (this.phase === 'work') this.index++;
    } else {
      // Zurück: in den ersten Sekunden (oder in der Pause) zur vorigen Übung, sonst Übung neu starten.
      const elapsed = this.duration - (this.endAt - performance.now()) / 1000;
      if (this.phase === 'rest' || elapsed < 3) this.index = Math.max(0, this.index - 1);
    }
    if (this.paused) this.togglePause();
    this.enter('work', this.steps[this.index].seconds);
  }

  togglePause() {
    this.paused = !this.paused;
    if (this.paused) {
      this.remainingAtPause = this.endAt - performance.now();
      this.figure.stop();
    } else {
      this.endAt = performance.now() + this.remainingAtPause;
      this.last = performance.now();
      this.figure.show(this.steps[this.index].ex, { mirror: this.steps[this.index].side === 2 });
    }
    this.root.classList.toggle('paused', this.paused);
    this.ui.pause.innerHTML = icon(this.paused ? 'play' : 'pause');
    this.ui.pause.setAttribute('aria-label', this.paused ? 'Fortsetzen' : 'Pause');
  }

  confirmExit() {
    if (!this.paused) this.togglePause();
    if (confirm('Training abbrechen? Abgebrochene Einheiten werden nicht gespeichert.')) this.exit();
    else this.togglePause();
  }

  finish() {
    this.stopTimers();
    const seconds = Math.round(this.activeMs / 1000);
    const counted = seconds >= 30;
    if (counted) addSession({
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
      routineId: this.routine.id,
      routineName: this.routine.name,
      seconds,
      exercises: new Set(this.steps.map((s) => s.ex.id)).size,
    });
    const { streak } = computeStats();
    this.beep(880, 0.15);
    setTimeout(() => this.beep(1175, 0.3), 180);
    this.say('Geschafft! Gut gemacht.');
    const mins = Math.max(1, Math.round(seconds / 60));
    this.root.dataset.phase = 'done';
    this.root.innerHTML = `
      <div class="tr-done">
        <div class="tr-done-badge" aria-hidden="true">✓</div>
        <h2>Geschafft!</h2>
        <p>${this.routine.name} · ${mins} Min.</p>
        <p class="tr-streak">${!counted ? 'Zu kurz für den Verlauf – nicht gespeichert.' : streak === 1 ? 'Tag 1 deiner Serie – weiter so!' : `🔥 ${streak} Tage in Folge`}</p>
        <button class="btn primary" data-act="finish">Fertig</button>
      </div>`;
  }

  exit() {
    this.stopTimers();
    this.root.hidden = true;
    this.root.innerHTML = '';
    document.body.classList.remove('training');
    this.onExit?.();
  }

  stopTimers() {
    this.running = false;
    clearInterval(this.timer);
    this.last = 0;
    this.figure?.stop();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    this.wakeLock?.release?.().catch(() => {});
    this.wakeLock = null;
  }

  async lockScreen() {
    try {
      if ('wakeLock' in navigator) this.wakeLock = await navigator.wakeLock.request('screen');
    } catch {
      /* nicht unterstützt oder abgelehnt – Training läuft trotzdem */
    }
  }

  unlockAudio() {
    if (!this.settings.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.audio = this.audio || new Ctx();
      this.audio.resume();
      this.beep(440, 0.01, 0.001);
    } catch {
      this.audio = null;
    }
  }

  beep(freq, dur, vol = 0.2) {
    if (!this.settings.sound || !this.audio) return;
    const t = this.audio.currentTime;
    const osc = this.audio.createOscillator();
    const gain = this.audio.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(this.audio.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  say(text) {
    if (!this.settings.voice || !('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    u.rate = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
}
