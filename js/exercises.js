// Übungen und Routinen. Posen siehe figure.js:
// R = vorderer Arm/vorderes Bein (kräftig), L = hinterer Arm/hinteres Bein (blass).
// Bei Frontansicht (view: 'front') sind beide Seiten gleich kräftig.
// focus: Körpersegmente, die als Zielmuskel aufleuchten (siehe figure.js).
// media: optionales Foto/Video (ersetzt die gezeichnete Figur, siehe docs/ki-bilder-prompts.md).

const STAND = {
  root: [100, 124], spine: [180, 180], head: 180,
  armR: [0, 0], armL: [0, 0], legR: [0, 0], legL: [0, 0],
};
const FRONT = { ...STAND, armR: [20, 10], armL: [-20, -10], legR: [8, 8], legL: [-8, -8] };
const pose = (base, changes) => ({ ...base, ...changes });

export const AREAS = ['Nacken', 'Schultern & Brust', 'Rücken', 'Hüfte', 'Beine'];

export const EXERCISES = [
  {
    id: 'nacken',
    focus: ['neck'],
    name: 'Nackenneigung',
    area: 'Nacken',
    view: 'front',
    bilateral: true,
    seconds: 30,
    muscles: 'Seitliche Nackenmuskulatur, oberer Trapezmuskel',
    cue: 'Die freie Schulter bewusst nach unten sinken lassen.',
    steps: [
      'Aufrecht stehen oder sitzen, Schultern locker.',
      'Kopf langsam zur Seite neigen – das Ohr wandert Richtung Schulter.',
      'Die Hand derselben Seite legt sich auf den Kopf und gibt nur leichten Zug.',
      'Die andere Schulter aktiv nach unten schieben und ruhig atmen.',
    ],
    mistakes: ['Schulter zum Ohr hochziehen', 'Ruckartig mit der Hand ziehen', 'Kopf nach vorn kippen statt zur Seite'],
    easier: 'Ohne Hand – nur das Gewicht des Kopfes wirken lassen.',
    poses: {
      a: FRONT,
      b: pose(FRONT, { head: 145, armR: [140, -105], armL: [-12, -6] }),
    },
  },
  {
    id: 'brust',
    focus: ['torsoUp', 'upperArmR'],
    name: 'Brustöffner',
    area: 'Schultern & Brust',
    view: 'side',
    bilateral: false,
    seconds: 30,
    muscles: 'Brustmuskel, vordere Schulter',
    cue: 'Brustbein nach vorn oben, Schulterblätter zusammen.',
    steps: [
      'Hüftbreit stehen, Hände hinter dem Rücken verschränken.',
      'Schulterblätter zueinander und nach unten ziehen.',
      'Arme gestreckt leicht nach hinten oben anheben.',
      'Brust öffnen, Blick leicht nach oben, ruhig weiteratmen.',
    ],
    mistakes: ['Ins Hohlkreuz fallen', 'Kopf weit in den Nacken legen'],
    easier: 'Hände an den unteren Rücken legen und nur die Ellbogen sanft zueinander ziehen.',
    poses: {
      a: STAND,
      b: pose(STAND, { spine: [180, 188], head: 196, armR: [-38, -28], armL: [-35, -25] }),
    },
  },
  {
    id: 'schulter',
    focus: ['upperArmR'],
    name: 'Schulterdehnung quer',
    area: 'Schultern & Brust',
    view: 'front',
    bilateral: true,
    seconds: 30,
    muscles: 'Hintere Schulter, oberer Rücken',
    cue: 'Schulter unten lassen, Arm locker heranziehen.',
    steps: [
      'Aufrecht stehen und einen Arm auf Schulterhöhe quer vor die Brust führen.',
      'Mit der anderen Hand oberhalb des Ellbogens greifen.',
      'Den Arm sanft zur Brust ziehen, bis du hinten in der Schulter ein Ziehen spürst.',
      'Der Oberkörper bleibt gerade nach vorn ausgerichtet.',
    ],
    mistakes: ['Direkt auf das Ellbogengelenk drücken', 'Oberkörper mitdrehen', 'Schulter hochziehen'],
    easier: 'Arm etwas tiefer führen und nur leicht heranziehen.',
    poses: {
      a: FRONT,
      b: pose(FRONT, { armR: [-70, -82], armL: [-40, -143] }),
    },
  },
  {
    id: 'seitbeuge',
    focus: ['torsoLow', 'torsoUp'],
    name: 'Seitbeuge im Stehen',
    area: 'Rücken',
    view: 'front',
    bilateral: true,
    seconds: 30,
    muscles: 'Seitliche Rumpfmuskulatur, breiter Rückenmuskel',
    cue: 'Erst lang machen, dann zur Seite – nicht nach vorn kippen.',
    steps: [
      'Hüftbreit stehen, Knie locker.',
      'Einen Arm über den Kopf strecken, der andere hängt seitlich am Bein.',
      'Erst nach oben lang werden, dann den Oberkörper zur Seite neigen.',
      'Die untere Hand gleitet am Bein entlang, das Becken bleibt stabil.',
    ],
    mistakes: ['Oberkörper nach vorn oder hinten drehen', 'Becken zur Seite schieben', 'Luft anhalten'],
    easier: 'Die obere Hand auf die Hüfte legen statt über den Kopf.',
    poses: {
      a: FRONT,
      b: pose(FRONT, { spine: [192, 205], head: 212, armR: [175, 235], armL: [-15, -18] }),
    },
  },
  {
    id: 'vorbeuge',
    focus: ['thighR', 'shinR'],
    name: 'Vorwärtsbeuge im Stehen',
    area: 'Beine',
    view: 'side',
    bilateral: false,
    seconds: 40,
    muscles: 'Beinrückseite, unterer Rücken',
    cue: 'Knie dürfen weich sein – Kopf locker hängen lassen.',
    steps: [
      'Hüftbreit stehen und die Arme über den Kopf strecken.',
      'Mit langem Rücken aus der Hüfte nach vorn beugen.',
      'Oberkörper und Kopf hängen lassen, Hände Richtung Boden oder Schienbeine.',
      'Zum Aufrichten die Knie beugen und Wirbel für Wirbel hochrollen.',
    ],
    mistakes: ['Knie durchdrücken', 'Wippen, um tiefer zu kommen', 'Zu schnell aufrichten (Schwindel)'],
    easier: 'Knie deutlich beugen und die Hände auf den Oberschenkeln abstützen.',
    poses: {
      a: pose(STAND, { armR: [160, 165], armL: [157, 162] }),
      b: pose(STAND, {
        root: [95, 124], spine: [65, 32], head: 20,
        armR: [-50, -65], armL: [-47, -62], legR: [5, 5], legL: [4, 4],
      }),
    },
  },
  {
    id: 'quad',
    focus: ['thighR'],
    name: 'Oberschenkel im Stehen',
    area: 'Beine',
    view: 'side',
    bilateral: true,
    seconds: 30,
    muscles: 'Vordere Oberschenkelmuskulatur, Hüftbeuger',
    cue: 'Knie zeigen nach unten und bleiben nebeneinander.',
    steps: [
      'Aufrecht stehen – bei Bedarf mit einer Hand an der Wand festhalten.',
      'Ein Bein beugen und den Fuß mit der Hand derselben Seite greifen.',
      'Ferse Richtung Gesäß ziehen, das Knie zeigt zum Boden.',
      'Becken leicht nach vorn schieben, um die Dehnung zu verstärken.',
    ],
    mistakes: ['Hohlkreuz machen', 'Knie nach außen wandern lassen', 'Oberkörper nach vorn kippen'],
    easier: 'In Seitenlage auf dem Boden ausführen – dann brauchst du kein Gleichgewicht.',
    poses: {
      a: STAND,
      b: pose(STAND, { legR: [-5, -165], armR: [-12, -12], armL: [70, 85] }),
    },
  },
  {
    id: 'hueftbeuger',
    focus: ['thighL'],
    name: 'Hüftbeuger-Ausfallschritt',
    area: 'Hüfte',
    view: 'side',
    bilateral: true,
    seconds: 40,
    muscles: 'Hüftbeuger, vordere Oberschenkel',
    cue: 'Becken nach vorn schieben, Oberkörper bleibt aufrecht.',
    steps: [
      'Aus dem Kniestand ein Bein nach vorn aufstellen – Knie über dem Knöchel.',
      'Das hintere Knie liegt auf dem Boden (gern auf einem Kissen).',
      'Hände an die Hüfte, Gesäß leicht anspannen.',
      'Becken langsam nach vorn unten schieben; wer mag, streckt die Arme nach oben.',
    ],
    mistakes: ['Vorderes Knie weit über die Zehen schieben', 'Ins Hohlkreuz fallen', 'Hinteres Knie ungepolstert auf hartem Boden'],
    easier: 'Weniger tief gehen und die Hände auf dem vorderen Oberschenkel abstützen.',
    poses: {
      a: {
        root: [90, 155], spine: [180, 180], head: 180,
        armR: [-20, 30], armL: [-18, 32], legR: [90, 0], legL: [-10, -90],
      },
      b: {
        root: [102, 160], spine: [182, 185], head: 188,
        armR: [162, 168], armL: [159, 165], legR: [100, -20], legL: [-35, -90],
      },
    },
  },
  {
    id: 'katzekuh',
    media: { video: 'media/katzekuh.mp4', poster: 'media/katzekuh-start.jpg' },
    focus: ['torsoLow', 'torsoUp'],
    name: 'Katze-Kuh',
    area: 'Rücken',
    view: 'side',
    bilateral: false,
    seconds: 45,
    muscles: 'Gesamte Wirbelsäule, Rücken- und Bauchmuskulatur',
    cue: 'Bewegung mit dem Atem verbinden – langsam und fließend.',
    steps: [
      'Vierfüßlerstand: Hände unter den Schultern, Knie unter den Hüften.',
      'Einatmen: Bauch sinkt Richtung Boden, Brust und Blick gehen nach vorn oben (Kuh).',
      'Ausatmen: Rücken rund machen, Kinn zur Brust, Bauch einziehen (Katze).',
      'Fließend im eigenen Atemrhythmus wechseln.',
    ],
    mistakes: ['Ellbogen durchdrücken', 'Zu schnell bewegen', 'Kopf in der Kuh weit überstrecken'],
    easier: 'Im Sitzen ausführen: Hände auf die Knie, Rücken abwechselnd rund und lang machen.',
    poses: {
      a: {
        root: [72, 154], spine: [75, 142], head: 150,
        armR: [8, 8], armL: [10, 10], legR: [0, -90], legL: [2, -90],
      },
      b: {
        root: [72, 154], spine: [135, 85], head: 40,
        armR: [4, 4], armL: [6, 6], legR: [0, -90], legL: [2, -90],
      },
    },
  },
  {
    id: 'kind',
    focus: ['torsoLow'],
    name: 'Kindhaltung',
    area: 'Rücken',
    view: 'side',
    bilateral: false,
    seconds: 45,
    muscles: 'Unterer Rücken, Schultern, Hüfte',
    cue: 'In den unteren Rücken atmen und loslassen.',
    steps: [
      'Im Fersensitz knien, die großen Zehen berühren sich.',
      'Arme über den Kopf strecken.',
      'Mit langem Rücken nach vorn ablegen, Stirn Richtung Boden.',
      'Arme bleiben lang nach vorn gestreckt, das Gesäß sinkt zu den Fersen.',
    ],
    mistakes: ['Gesäß hebt weit von den Fersen ab', 'Schultern hochziehen'],
    easier: 'Knie weiter öffnen oder die Stirn auf die Fäuste legen.',
    poses: {
      a: {
        root: [85, 168], spine: [180, 180], head: 180,
        armR: [160, 165], armL: [157, 162], legR: [57, -90], legL: [59, -90],
      },
      b: {
        root: [85, 168], spine: [96, 92], head: 60,
        armR: [55, 80], armL: [53, 78], legR: [57, -90], legL: [59, -90],
      },
    },
  },
  {
    id: 'schmetterling',
    focus: ['thighR', 'thighL'],
    name: 'Schmetterling',
    area: 'Hüfte',
    view: 'front',
    bilateral: false,
    seconds: 45,
    muscles: 'Innere Oberschenkel (Adduktoren), Hüfte',
    cue: 'Aufrecht sitzen, Knie nur sanft sinken lassen.',
    steps: [
      'Aufrecht auf den Boden setzen.',
      'Fußsohlen aneinanderlegen, die Knie fallen nach außen.',
      'Hände an Knöchel oder Knie legen.',
      'Knie langsam Richtung Boden sinken lassen und sanft auf und ab bewegen.',
    ],
    mistakes: ['Rücken rund machen', 'Mit Kraft auf die Knie drücken'],
    easier: 'Füße weiter vom Körper weg platzieren oder auf ein Kissen setzen.',
    poses: {
      a: {
        root: [100, 172], spine: [180, 180], head: 180,
        armR: [30, 40], armL: [-30, -40], legR: [110, -49], legL: [-110, 49],
      },
      b: {
        root: [100, 172], spine: [180, 180], head: 180,
        armR: [25, 35], armL: [-25, -35], legR: [95, -73], legL: [-95, 73],
      },
    },
  },
  {
    id: 'sitzvorbeuge',
    focus: ['thighR', 'shinR'],
    name: 'Sitzende Vorbeuge',
    area: 'Beine',
    view: 'side',
    bilateral: false,
    seconds: 40,
    muscles: 'Beinrückseite, Waden, unterer Rücken',
    cue: 'Bauch zu den Oberschenkeln – nicht die Nase zu den Knien.',
    steps: [
      'Mit gestreckten Beinen aufrecht sitzen, Fußspitzen zeigen nach oben.',
      'Arme über den Kopf strecken und lang werden.',
      'Mit geradem Rücken aus der Hüfte nach vorn beugen.',
      'Hände ruhen an Schienbeinen oder Füßen – so weit es angenehm ist.',
    ],
    mistakes: ['Mit rundem Rücken nach vorn ziehen', 'Wippen', 'Knie mit Gewalt durchdrücken'],
    easier: 'Knie leicht beugen oder auf ein Kissen setzen.',
    poses: {
      a: {
        root: [78, 180], spine: [180, 180], head: 180,
        armR: [160, 165], armL: [157, 162], legR: [90, 90], legL: [88, 88],
      },
      b: {
        root: [78, 180], spine: [140, 120], head: 115,
        armR: [50, 25], armL: [48, 23], legR: [90, 90], legL: [88, 88],
      },
    },
  },
];

export const ROUTINES = [
  {
    id: 'morgen',
    name: 'Morgen-Mobilisation',
    description: 'Wach werden: Nacken, Schultern, Rücken und Beine.',
    exercises: ['nacken', 'schulter', 'seitbeuge', 'vorbeuge', 'quad', 'hueftbeuger', 'katzekuh'],
  },
  {
    id: 'buero',
    name: 'Schreibtisch-Pause',
    description: 'Kurz zwischendurch – komplett im Stehen.',
    exercises: ['nacken', 'brust', 'schulter', 'seitbeuge'],
  },
  {
    id: 'abend',
    name: 'Abend-Entspannung',
    description: 'Ruhig am Boden runterfahren.',
    exercises: ['katzekuh', 'kind', 'hueftbeuger', 'schmetterling', 'sitzvorbeuge'],
  },
];

export const SIDE_SWITCH_SECONDS = 5;

export const getExercise = (id) => EXERCISES.find((e) => e.id === id);
export const getRoutine = (id) => ROUTINES.find((r) => r.id === id);

// Ablauf einer Routine: beidseitige Übungen werden zu zwei Schritten.
export function buildSteps(routine) {
  const steps = [];
  for (const id of routine.exercises) {
    const ex = getExercise(id);
    if (!ex) continue;
    if (ex.bilateral) {
      steps.push({ ex, side: 1, seconds: ex.seconds });
      steps.push({ ex, side: 2, seconds: ex.seconds });
    } else {
      steps.push({ ex, side: 0, seconds: ex.seconds });
    }
  }
  return steps;
}

export function routineSeconds(routine, restSeconds) {
  const steps = buildSteps(routine);
  let total = 0;
  steps.forEach((s, i) => {
    total += s.seconds;
    if (i > 0) total += s.side === 2 ? SIDE_SWITCH_SECONDS : restSeconds;
  });
  return total;
}
