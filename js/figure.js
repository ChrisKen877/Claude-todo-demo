// Animierte Illustration (Stil „Natur“): Frau in Weiß auf Fels unter blauem Himmel,
// mit hervorgehobenem Zielmuskel. Hat eine Übung ein Foto/Video (exercise.media),
// wird stattdessen dieses angezeigt.
//
// Eine Pose besteht aus der Hüftposition (root) und absoluten Winkeln in Grad
// (0° = nach unten, 90° = nach rechts, 180° = nach oben, -90° = nach links).
// Zwischen zwei Posen wird über die Winkel interpoliert, damit Gliedmaßen
// ihre Länge behalten und sich natürlich drehen.

const SVGNS = 'http://www.w3.org/2000/svg';
const PERIOD_MS = 6000;

const C = {
  skin: '#dfa47c', skinFar: '#c58a63',
  hair: '#d8b46e', hairDark: '#b58e4e',
  cloth: '#fbfaf6', clothFar: '#e9e5dc',
  outline: '#c9bfae',
  anklet: '#3b302a', beads: '#e9dcc3', beadAccent: '#c0463a',
  eye: '#2a1d18', glow: '#ff6a3d',
};
const W = { head: 10.5, neck: 3, chest: 8.5, waist: 6.3, hip: 9.6, thigh: 6.4, knee: 4.2, ankle: 2.8, upper: 3.9, elbow: 3.1, wrist: 2.3 };

// ---------- Pose ----------
const rad = (a) => (a * Math.PI) / 180;
const dir = (a) => [Math.sin(rad(a)), Math.cos(rad(a))];
const step = (p, a, l) => [p[0] + Math.sin(rad(a)) * l, p[1] + Math.cos(rad(a)) * l];
const lerpP = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const angleOf = (a, b) => (Math.atan2(b[0] - a[0], b[1] - a[1]) * 180) / Math.PI;

// In der Frontansicht sitzen Schultern und Hüftgelenke seitlich versetzt.
function solve(p, front) {
  const hip = p.root, s0 = p.spine[0], s1 = p.spine[1];
  const mid = step(hip, s0, 25), neck = step(mid, s1, 25), head = step(neck, p.head, 17);
  const sh = step(neck, s1 + 180, 5);
  const shR = front ? step(sh, s1 - 90, 8) : sh, shL = front ? step(sh, s1 + 90, 8) : sh;
  const hR = front ? step(hip, s0 - 90, 5) : hip, hL = front ? step(hip, s0 + 90, 5) : hip;
  const arm = (o, [a, b]) => { const e = step(o, a, 24); return [o, e, step(e, b, 22)]; };
  const leg = (o, [a, b], side) => {
    const k = step(o, a, 30), an = step(k, b, 31);
    return [o, k, an, front ? step(an, side * 90, 5) : step(an, b + 90, 8)];
  };
  return { hip, mid, neck, head, ha: p.head, s1, armR: arm(shR, p.armR), armL: arm(shL, p.armL), legR: leg(hR, p.legR, 1), legL: leg(hL, p.legL, -1) };
}

export function mixPose(a, b, t) {
  if (typeof a === 'number') return a + (b - a) * t;
  if (Array.isArray(a)) return a.map((v, i) => mixPose(v, b[i], t));
  const out = {};
  for (const k of Object.keys(a)) out[k] = mixPose(a[k], b[k], t);
  return out;
}

const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t);
// Bewegungszyklus: kurz Ausgangspose, hinein in die Dehnung, halten, zurück.
const cycle = (u) => (u < 0.12 ? 0 : u < 0.42 ? ease((u - 0.12) / 0.3) : u < 0.8 ? 1 : 1 - ease((u - 0.8) / 0.2));

// ---------- Zeichnen ----------
const f = (n) => n.toFixed(1);
// Kapsel mit unterschiedlichen Radien an beiden Enden (verjüngte Gliedmaße).
function cap(p1, p2, r1, r2) {
  const dx = p2[0] - p1[0], dy = p2[1] - p1[1], L = Math.hypot(dx, dy) || 0.001;
  const nx = -dy / L, ny = dx / L;
  const a1 = [p1[0] + nx * r1, p1[1] + ny * r1], a2 = [p2[0] + nx * r2, p2[1] + ny * r2];
  const b2 = [p2[0] - nx * r2, p2[1] - ny * r2], b1 = [p1[0] - nx * r1, p1[1] - ny * r1];
  return `M${f(a1[0])} ${f(a1[1])}L${f(a2[0])} ${f(a2[1])}A${f(r2)} ${f(r2)} 0 0 0 ${f(b2[0])} ${f(b2[1])}L${f(b1[0])} ${f(b1[1])}A${f(r1)} ${f(r1)} 0 0 0 ${f(a1[0])} ${f(a1[1])}Z`;
}
const circ = (c, r) => `M${f(c[0] - r)} ${f(c[1])}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`;
const unit = (v) => { const n = Math.hypot(v[0], v[1]) || 1; return [v[0] / n, v[1] / n]; };

function render(ex, pose, t) {
  const front = ex.view === 'front';
  const s = solve(pose, front);
  const a = s.ha;
  const out = [];
  let group = null;
  const draw = (d, fill) => group.push({ d, fill });
  const begin = () => { group = []; };
  // Kontur nur außen um jedes Körperteil (keine Fugen an den Gelenken).
  const end = () => {
    out.push(`<g fill="${C.outline}" stroke="${C.outline}" stroke-width="1.6" stroke-linejoin="round">${group.map((q) => `<path d="${q.d}"/>`).join('')}</g>`);
    out.push(...group.map((q) => `<path d="${q.d}" fill="${q.fill}"/>`));
    group = null;
  };
  const col = (key, far) => C[key + (far && !front ? 'Far' : '')];

  out.push(`<ellipse cx="${f(s.hip[0] + (front ? 0 : 8))}" cy="190" rx="44" ry="4" fill="#000" opacity=".08"/>`);

  const arm = (p, far) => {
    begin();
    draw(cap(p[0], p[1], W.upper, W.elbow), col('skin', far));
    draw(cap(p[1], p[2], W.elbow, W.wrist), col('skin', far));
    draw(circ(p[2], W.wrist + 0.9), col('skin', far));
    end();
    if (!far) { // Perlenarmband
      const w = lerpP(p[1], p[2], 0.82), ang = angleOf(p[1], p[2]);
      [-1, 0, 1].forEach((i) => {
        const q = step(w, ang + 90, i * 2);
        out.push(`<circle cx="${f(q[0])}" cy="${f(q[1])}" r="1.15" fill="${i === 0 ? C.beadAccent : C.beads}"/>`);
      });
    }
  };
  const leg = (l, far) => {
    begin();
    draw(cap(l[2], l[3], W.ankle, W.ankle * 0.75), col('skin', far));
    draw(cap(l[1], l[2], W.knee, W.ankle), col('skin', far));
    draw(cap(l[1], lerpP(l[1], l[2], 0.45), W.knee + 0.4, W.knee * 0.85), col('cloth', far)); // 3/4-Leggings
    draw(cap(l[0], l[1], W.thigh, W.knee), col('cloth', far));
    end();
    if (!far) { // Fußband
      const c = lerpP(l[1], l[2], 0.9), ang = angleOf(l[1], l[2]);
      out.push(`<path d="${cap(step(c, ang + 90, W.ankle + 0.3), step(c, ang - 90, W.ankle + 0.3), 0.7, 0.7)}" fill="${C.anklet}"/>`);
    }
  };

  arm(s.armL, true);
  leg(s.legL, true);

  // Tiefer Zopf hinter dem Kopf (Seitenansicht)
  if (!front) {
    begin();
    const o = step(s.head, a + 140, W.head * 0.8);
    const back = dir(a + 90);
    const v = unit([back[0] * 0.35, back[1] * 0.35 + 1]);
    draw(cap(o, [o[0] + v[0] * 21, o[1] + v[1] * 21], 4.3, 1.6), C.hair);
    end();
    out.push(`<path d="${circ(o, 2.2)}" fill="${C.hairDark}"/>`);
  }

  leg(s.legR, false);

  // Rumpf: Hüfte – Taille – Brust
  begin();
  draw(cap(s.hip, lerpP(s.hip, s.mid, 0.55), W.hip, W.waist + 1), C.cloth);
  draw(cap(lerpP(s.hip, s.mid, 0.45), s.neck, W.waist, W.chest), C.cloth);
  draw(cap(lerpP(s.hip, s.mid, 0.45), s.mid, W.waist + 0.4, W.waist), C.cloth);
  if (!front) draw(circ(step(lerpP(s.mid, s.neck, 0.55), s.s1 - 90, W.chest * 0.45), W.chest * 0.62), C.cloth);
  end();

  arm(s.armR, false);

  // Hals, Kopf, Haare
  begin();
  draw(cap(step(s.neck, s.s1 + 180, 2), step(s.neck, a, 7), W.neck, W.neck), C.skin);
  draw(circ(s.head, W.head), C.skin);
  const arc = (from, to, rr) => {
    const p = [];
    for (let i = 0; i <= 12; i++) p.push(step(s.head, from + ((to - from) * i) / 12, rr));
    p.push(step(s.head, (from + to) / 2, W.head * 0.25));
    return `M${p.map((q) => `${f(q[0])} ${f(q[1])}`).join('L')}Z`;
  };
  draw(front ? arc(a - 85, a + 85, W.head + 1) : arc(a - 30, a + 150, W.head + 1), C.hair);
  end();
  if (!front) {
    const p0 = step(s.head, a - 10, W.head), p1 = step(s.head, a + 60, W.head * 0.7), p2 = step(s.head, a + 135, W.head * 0.85);
    out.push(`<path d="M${f(p0[0])} ${f(p0[1])}Q${f(p1[0])} ${f(p1[1])} ${f(p2[0])} ${f(p2[1])}" fill="none" stroke="${C.hairDark}" stroke-width="0.9"/>`);
  }
  // Augen und lose Strähnen
  const eyes = front ? [-1, 1].map((sg) => step(step(s.head, a - 90 * sg, 3.6), a + 180, 1)) : [step(step(s.head, a - 90, W.head * 0.55), a, 1.2)];
  eyes.forEach((e) => out.push(`<circle cx="${f(e[0])}" cy="${f(e[1])}" r="1.1" fill="${C.eye}"/>`));
  for (const sg of front ? [-1, 1] : [1]) {
    const o = step(s.head, a - 75 * sg, W.head * 0.95);
    const e = [o[0] + (front ? 1.2 * sg : 0), o[1] + 12];
    out.push(`<path d="M${f(o[0])} ${f(o[1])}Q${f(o[0] + 3 * sg)} ${f(o[1] + 6)} ${f(e[0])} ${f(e[1])}" fill="none" stroke="${C.hair}" stroke-width="1.3" stroke-linecap="round"/>`);
  }

  // Zielmuskel leuchtet beim Hineingehen in die Dehnung auf.
  const seg = {
    neck: () => cap(s.neck, step(s.neck, a, 7), 4, 4),
    torsoLow: () => cap(s.hip, s.mid, W.hip, W.waist),
    torsoUp: () => cap(s.mid, s.neck, W.waist, W.chest),
    upperArmR: () => cap(s.armR[0], s.armR[1], W.upper + 1, W.elbow + 1),
    thighR: () => cap(s.legR[0], s.legR[1], W.thigh + 1, W.knee + 1),
    shinR: () => cap(s.legR[1], s.legR[2], W.knee + 1, W.ankle + 1),
    thighL: () => cap(s.legL[0], s.legL[1], W.thigh + 1, W.knee + 1),
  };
  const focus = (ex.focus || []).filter((n) => seg[n]);
  if (focus.length) out.push(`<g fill="${C.glow}" opacity="${(0.08 + 0.42 * t).toFixed(2)}">${focus.map((n) => `<path d="${seg[n]()}"/>`).join('')}</g>`);
  return out.join('');
}

const reducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

let uid = 0;

export class Figure {
  constructor(container, { label = '' } = {}) {
    const id = `sky${++uid}`;
    this.svg = document.createElementNS(SVGNS, 'svg');
    this.svg.setAttribute('viewBox', '0 0 200 200');
    this.svg.setAttribute('class', 'figure');
    this.svg.setAttribute('role', 'img');
    if (label) this.svg.setAttribute('aria-label', label);
    // Szene: Himmel und Fels
    this.svg.innerHTML = `
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3f0"/><stop offset="1" stop-color="#f7efe3"/></linearGradient></defs>
      <rect width="200" height="200" fill="url(#${id})"/>
      <path d="M0 200V193Q60 184 120 187T200 186V200Z" fill="#d7c2a4"/>
      <path d="M0 200V197Q70 191 130 194T200 193V200Z" fill="#c9b293"/>
      ${[[30, 195], [58, 192], [90, 196], [140, 191], [170, 195], [112, 198]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".8" fill="#b29c7d"/>`).join('')}
      <g class="fig-body"></g>`;
    this.body = this.svg.querySelector('.fig-body');
    container.append(this.svg);
    this.container = container;
    this.raf = 0;
  }

  // Foto (statisch) oder Video (Schleife) anzeigen. iOS spielt nur stumme Inline-Videos automatisch ab.
  showMedia({ video, poster }, { mirror, animate }) {
    const want = animate && video ? 'video' : 'img';
    if (this.media?.tagName.toLowerCase() !== want) {
      this.media?.remove();
      this.media = document.createElement(want);
      this.media.className = 'fig-media';
      if (want === 'video') Object.assign(this.media, { muted: true, loop: true, playsInline: true, autoplay: true });
      this.media.setAttribute('aria-hidden', 'true');
      this.container.append(this.media);
    }
    if (want === 'video') {
      if (!this.media.src.endsWith(video)) {
        this.media.poster = poster;
        this.media.src = video;
      }
      this.media.play?.().catch(() => {});
    } else {
      this.media.alt = '';
      this.media.src = poster;
    }
    this.media.style.transform = mirror ? 'scaleX(-1)' : '';
  }

  // animate=false zeigt statisch die Dehnposition.
  show(exercise, { mirror = false, animate = true } = {}) {
    this.exercise = exercise;
    this.stop();
    this.svg.style.display = exercise.media ? 'none' : '';
    if (exercise.media) return this.showMedia(exercise.media, { mirror, animate: animate && !reducedMotion() });
    this.media?.remove();
    this.media = null;
    this.body.setAttribute('transform', mirror ? 'translate(200 0) scale(-1 1)' : '');
    if (animate && !reducedMotion()) {
      this.t0 = performance.now();
      this.start();
    } else {
      this.draw(exercise.poses.b, 1);
    }
  }

  draw(pose, intensity = 1) {
    this.body.innerHTML = render(this.exercise, pose, intensity);
  }

  start() {
    const loop = (now) => {
      if (!this.svg.isConnected) return this.stop();
      const t = cycle(((now - this.t0) % PERIOD_MS) / PERIOD_MS);
      const { a, b } = this.exercise.poses;
      this.draw(mixPose(a, b, t), t);
      this.raf = requestAnimationFrame(loop);
    };
    this.draw(this.exercise.poses.a, 0);
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.media?.pause?.();
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
}
