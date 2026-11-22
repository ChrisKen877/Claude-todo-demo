// Animierte Illustrationsfigur (SVG) mit Kleidung, Matte und hervorgehobenem Zielmuskel.
// Eine Pose besteht aus der Hüftposition (root) und absoluten Winkeln in Grad
// (0° = nach unten, 90° = nach rechts, 180° = nach oben, -90° = nach links).
// Zwischen zwei Posen wird über die Winkel interpoliert, damit Gliedmaßen
// ihre Länge behalten und sich natürlich drehen.

const SVGNS = 'http://www.w3.org/2000/svg';
const LEN = { spine: 25, neck: 17, upper: 24, fore: 22, thigh: 30, shin: 31, foot: 8 };
const HEAD_R = 11;
const PERIOD_MS = 6000;

const rad = (a) => (a * Math.PI) / 180;
const step = (p, a, len) => [p[0] + Math.sin(rad(a)) * len, p[1] + Math.cos(rad(a)) * len];
const angleOf = (from, to) => (Math.atan2(to[0] - from[0], to[1] - from[1]) * 180) / Math.PI;

export function solvePose(p, side = true) {
  const hip = p.root;
  const mid = step(hip, p.spine[0], LEN.spine);
  const neck = step(mid, p.spine[1], LEN.spine);
  const head = step(neck, p.head, LEN.neck);
  const shoulder = step(neck, p.spine[1] + 180, 5);
  const arm = ([a, b]) => {
    const elbow = step(shoulder, a, LEN.upper);
    return [shoulder, elbow, step(elbow, b, LEN.fore)];
  };
  // Seitenansicht: Fuß rechtwinklig zum Unterschenkel (Zehen nach vorn).
  const leg = ([a, b]) => {
    const knee = step(hip, a, LEN.thigh);
    const ankle = step(knee, b, LEN.shin);
    return [hip, knee, ankle, side ? step(ankle, b + 90, LEN.foot) : ankle];
  };
  return { hip, mid, neck, head, headAngle: angleOf(neck, head), armR: arm(p.armR), armL: arm(p.armL), legR: leg(p.legR), legL: leg(p.legL) };
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
function cycle(u) {
  if (u < 0.12) return 0;
  if (u < 0.42) return ease((u - 0.12) / 0.3);
  if (u < 0.8) return 1;
  return 1 - ease((u - 0.8) / 0.2);
}

const reducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

const el = (name, attrs = {}) => {
  const node = document.createElementNS(SVGNS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
};
const f = (n) => n.toFixed(1);
const pts = (list) => list.map((p) => `${f(p[0])},${f(p[1])}`).join(' ');
const line = (a, b) => `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`;

// Segmente, die als Zielmuskel aufleuchten können.
function segment(s, name) {
  switch (name) {
    case 'neck': return line(s.neck, step(s.neck, s.headAngle, 7));
    case 'torsoLow': return line(s.hip, s.mid);
    case 'torsoUp': return line(s.mid, s.neck);
    case 'upperArmR': return line(s.armR[0], s.armR[1]);
    case 'thighR': return line(s.legR[0], s.legR[1]);
    case 'shinR': return line(s.legR[1], s.legR[2]);
    case 'thighL': return line(s.legL[0], s.legL[1]);
    default: return '';
  }
}

export class Figure {
  constructor(container, { label = '' } = {}) {
    this.svg = el('svg', { viewBox: '0 0 200 200', class: 'figure', role: 'img' });
    if (label) this.svg.setAttribute('aria-label', label);
    this.svg.append(el('rect', { x: 14, y: 189, width: 172, height: 6, rx: 3, class: 'fig-mat' }));

    const g = (this.body = el('g'));
    const add = (name, attrs) => {
      const node = el(name, attrs);
      g.append(node);
      return node;
    };
    // Zeichenreihenfolge: hintere Gliedmaßen, Beine, Rumpf, Kopf, vorderer Arm.
    this.far = {
      upper: add('path', { class: 'fig-shirt far fig-w-arm' }),
      fore: add('path', { class: 'fig-skin far fig-w-fore' }),
      hand: add('circle', { r: 3.6, class: 'fig-skin-fill far' }),
      leg: add('polyline', { class: 'fig-pants far fig-w-leg' }),
      shoe: add('path', { class: 'fig-shoe far' }),
    };
    this.glowFar = add('path', { class: 'fig-glow' });
    this.near = { leg: add('polyline', { class: 'fig-pants fig-w-leg' }), shoe: add('path', { class: 'fig-shoe' }) };
    this.neckSeg = add('path', { class: 'fig-skin fig-w-neck' });
    this.torso = add('path', { class: 'fig-shirt fig-w-torso' });
    this.glow = add('path', { class: 'fig-glow' });
    this.head = add('circle', { r: HEAD_R, class: 'fig-skin-fill' });
    this.hair = add('path', { class: 'fig-hair' });
    Object.assign(this.near, {
      upper: add('path', { class: 'fig-shirt fig-w-arm' }),
      fore: add('path', { class: 'fig-skin fig-w-fore' }),
      hand: add('circle', { r: 3.6, class: 'fig-skin-fill' }),
    });
    this.svg.append(g);
    container.append(this.svg);
    this.raf = 0;
  }

  // animate=false zeigt statisch die Dehnposition.
  show(exercise, { mirror = false, animate = true } = {}) {
    this.exercise = exercise;
    const front = exercise.view === 'front';
    this.svg.classList.toggle('front', front);
    this.body.setAttribute('transform', mirror ? 'translate(200 0) scale(-1 1)' : '');
    // Hinterer Zielmuskel (z. B. hinteres Bein) wird hinter dem Rumpf gezeichnet.
    const focus = exercise.focus || [];
    this.focusFar = focus.filter((n) => n.endsWith('L'));
    this.focusNear = focus.filter((n) => !n.endsWith('L'));
    this.stop();
    if (animate && !reducedMotion()) {
      this.t0 = performance.now();
      this.start();
    } else {
      this.draw(exercise.poses.b, 1);
    }
  }

  draw(pose, intensity = 1) {
    const front = this.exercise.view === 'front';
    const s = solvePose(pose, !front);
    const ctrl = [2 * s.mid[0] - (s.hip[0] + s.neck[0]) / 2, 2 * s.mid[1] - (s.hip[1] + s.neck[1]) / 2];
    this.torso.setAttribute('d', `M${f(s.hip[0])} ${f(s.hip[1])}Q${f(ctrl[0])} ${f(ctrl[1])} ${f(s.neck[0])} ${f(s.neck[1])}`);
    this.neckSeg.setAttribute('d', line(s.neck, step(s.neck, s.headAngle, 8)));
    this.head.setAttribute('cx', f(s.head[0]));
    this.head.setAttribute('cy', f(s.head[1]));

    // Haare: Kreissegment oben/hinten am Kopf (vorn = Blickrichtung).
    const a = s.headAngle;
    const [from, to] = front ? [a - 75, a + 75] : [a - 30, a + 105];
    const hair = [];
    for (let t = from; t <= to + 0.1; t += (to - from) / 10) hair.push(step(s.head, t, HEAD_R + 1));
    hair.push(step(s.head, (from + to) / 2, HEAD_R * 0.35));
    this.hair.setAttribute('d', `M${hair.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}Z`);

    const limbs = (parts, arm, leg) => {
      parts.upper.setAttribute('d', line(arm[0], arm[1]));
      parts.fore.setAttribute('d', line(arm[1], arm[2]));
      parts.hand.setAttribute('cx', f(arm[2][0]));
      parts.hand.setAttribute('cy', f(arm[2][1]));
      parts.leg.setAttribute('points', pts(leg.slice(0, 3)));
      parts.shoe.setAttribute('d', front ? line(leg[2], [leg[2][0] + (leg[2][0] < s.hip[0] ? -5 : 5), leg[2][1]]) : line(leg[2], leg[3]));
    };
    limbs(this.near, s.armR, s.legR);
    limbs(this.far, s.armL, s.legL);

    const glow = (node, names) => {
      node.setAttribute('d', names.map((n) => segment(s, n)).join(''));
      node.style.opacity = names.length ? (0.12 + 0.6 * intensity).toFixed(2) : '0';
    };
    glow(this.glow, this.focusNear);
    glow(this.glowFar, this.focusFar);
  }

  start() {
    const loop = (now) => {
      if (!this.svg.isConnected) return this.stop();
      const u = ((now - this.t0) % PERIOD_MS) / PERIOD_MS;
      const t = cycle(u);
      const { a, b } = this.exercise.poses;
      this.draw(mixPose(a, b, t), t);
      this.raf = requestAnimationFrame(loop);
    };
    this.draw(this.exercise.poses.a, 0);
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
}
