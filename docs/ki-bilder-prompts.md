# KI-Prompts für fotorealistische Übungsbilder und -videos

Prompts für ChatGPT (Bilder) und – falls dein Abo es anbietet – Videos (z. B. Sora).
Die Person ist **frei erfunden**. Lade das Ausgangsfoto der echten Frau **nicht** als Referenz hoch.

---

## Ablauf

1. **Referenzfigur erzeugen** (Schritt 0 unten). Das beste Ergebnis speichern als `referenz.jpg`.
2. **Pro Übung** einen neuen Chat öffnen, `referenz.jpg` hochladen und erst den **Basis-Block**,
   dann den Übungs-Prompt einfügen. So bleibt die Person in allen Bildern gleich.
3. Pro Übung zwei Bilder erzeugen (**Start** und **Dehnung**) und optional ein **Video**.
4. Prüfen: richtige Seite? Hände mit fünf Fingern? Körperhaltung wie beschrieben? Sonst neu erzeugen.
5. Dateien so benennen und mir geben – dann baue ich sie in die App ein:

| Art | Dateiname |
| --- | --- |
| Startposition | `media/<id>-start.jpg` |
| Dehnposition | `media/<id>-dehnung.jpg` |
| Video | `media/<id>.mp4` |

Die `<id>` steht bei jeder Übung in Klammern, z. B. `nacken`.

**Format:** quadratisch (1:1), mindestens 1024 × 1024. Videos 6–8 Sekunden, quadratisch, ohne Ton.

> Bei einseitigen Übungen reicht **eine Seite**. Die App spiegelt Bild/Video für die zweite Seite.

---

## Schritt 0 – Referenzfigur

```
Erstelle ein fotorealistisches Ganzkörperfoto einer frei erfundenen Frau, etwa Anfang 30,
schlank und sportlich, sonnengebräunte Haut, dunkelblondes Haar, locker zu einem tiefen Zopf
gebunden, einzelne lose Strähnen im Gesicht, natürliches Make-up. Sie trägt ein schlichtes
weißes Tanktop und weiße 3/4-Leggings, ist barfuß, trägt ein dünnes dunkles Fußband am
rechten Knöchel und ein helles Perlenarmband am rechten Handgelenk.
Sie steht entspannt aufrecht auf einer hellen, sandfarbenen Yogamatte auf einem flachen
Granitfelsen. Hintergrund: klarer, hellblauer Himmel, warmes Abendlicht.
Frontansicht, ganzer Körper mit etwas Abstand zum Bildrand, quadratisches Format 1:1.
Keine Schrift, keine Logos, kein Wasserzeichen.
```

---

## Basis-Block (vor jeden Übungs-Prompt setzen)

```
Verwende exakt dieselbe Person wie im hochgeladenen Referenzbild (Gesicht, Haare, Kleidung,
Fußband, Armband). Fotorealistisch, natürliche Proportionen, anatomisch korrekte Hände und
Füße. Ort: helle sandfarbene Yogamatte auf flachem Granitfelsen, klarer hellblauer Himmel,
warmes Abendlicht, weicher Schatten. Ganzer Körper sichtbar mit etwas Abstand zum Bildrand,
ruhige Kamera auf Hüfthöhe, quadratisches Format 1:1. Keine Schrift, keine Logos,
kein Wasserzeichen.
```

**Zusatz für Videos** (statt „Bild“ anhängen):

```
Erzeuge ein 6–8 Sekunden langes Video ohne Ton. Statische Kamera, kein Zoom, kein
Schnitt. Die Bewegung ist langsam, kontrolliert und ruhig wie in einem Yoga-Lehrvideo.
Das Video beginnt und endet in der Startposition, damit es nahtlos in einer Schleife läuft.
```

---

## 1. Nackenneigung (`nacken`) – Frontansicht

**Start:**
```
Bild: Sie steht aufrecht, Füße hüftbreit, Arme hängen locker neben dem Körper, Schultern
entspannt, Blick geradeaus in die Kamera. Frontansicht.
```
**Dehnung:**
```
Bild: Frontansicht. Sie steht aufrecht und neigt den Kopf zur Seite, das rechte Ohr sinkt
Richtung rechte Schulter. Die rechte Hand liegt locker auf der linken Kopfseite und gibt
nur leichten Zug. Die linke Schulter ist bewusst tief, der linke Arm hängt locker.
Gesicht entspannt, Augen halb geschlossen.
```
**Video:**
```
Frontansicht. Sie steht aufrecht, neigt langsam den Kopf zur rechten Schulter, legt die
rechte Hand sanft auf den Kopf, hält 3 Sekunden mit ruhiger Atmung, löst die Hand und
richtet den Kopf langsam wieder auf.
```

## 2. Brustöffner (`brust`) – Seitenansicht

**Start:**
```
Bild: Seitenansicht, sie blickt nach rechts. Aufrechter Stand, Füße hüftbreit, Arme hängen
locker neben dem Körper.
```
**Dehnung:**
```
Bild: Seitenansicht, Blick nach rechts. Die Hände sind hinter dem Rücken verschränkt, die
gestreckten Arme sind nach hinten oben angehoben, die Schulterblätter zusammengezogen.
Die Brust ist geöffnet, der Blick geht leicht nach oben, kein Hohlkreuz.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Sie verschränkt die Hände hinter dem Rücken, hebt die
gestreckten Arme langsam nach hinten oben, öffnet die Brust, hält 3 Sekunden und senkt
die Arme wieder.
```

## 3. Schulterdehnung quer (`schulter`) – Frontansicht

**Start:**
```
Bild: Frontansicht. Aufrechter Stand, Arme locker neben dem Körper, Blick nach vorn.
```
**Dehnung:**
```
Bild: Frontansicht. Der rechte Arm ist gestreckt auf Schulterhöhe quer vor der Brust nach
links geführt. Die linke Hand greift oberhalb des rechten Ellbogens und zieht den Arm sanft
zur Brust. Schultern tief, Oberkörper zeigt gerade nach vorn.
```
**Video:**
```
Frontansicht. Sie führt den rechten Arm gestreckt quer vor die Brust, greift ihn mit der
linken Hand oberhalb des Ellbogens, zieht ihn sanft heran, hält 3 Sekunden und löst wieder.
```

## 4. Seitbeuge im Stehen (`seitbeuge`) – Frontansicht

**Start:**
```
Bild: Frontansicht. Hüftbreiter Stand, Knie locker, Arme neben dem Körper.
```
**Dehnung:**
```
Bild: Frontansicht. Der rechte Arm ist über den Kopf gestreckt, der Oberkörper neigt sich
in einem schönen Bogen nach links. Die linke Hand gleitet am linken Oberschenkel hinab.
Das Becken bleibt mittig, Oberkörper nicht nach vorn gedreht.
```
**Video:**
```
Frontansicht. Sie hebt den rechten Arm über den Kopf, wird lang und neigt sich dann langsam
nach links, die linke Hand gleitet am Bein hinab. 3 Sekunden halten, dann langsam
aufrichten und den Arm senken.
```

## 5. Vorwärtsbeuge im Stehen (`vorbeuge`) – Seitenansicht

**Start:**
```
Bild: Seitenansicht, Blick nach rechts. Aufrechter, hüftbreiter Stand, beide Arme
gestreckt über dem Kopf.
```
**Dehnung:**
```
Bild: Seitenansicht, Blick nach rechts. Sie ist aus der Hüfte nach vorn gebeugt, Oberkörper
und Kopf hängen locker nach unten, die Knie sind leicht gebeugt, die Hände berühren die
Knöchel bzw. den Boden neben den Füßen. Nacken entspannt, Zopf hängt nach unten.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Sie streckt die Arme nach oben, beugt sich mit langem
Rücken aus der Hüfte nach vorn und lässt Oberkörper und Kopf locker hängen. 3 Sekunden
halten, dann mit gebeugten Knien Wirbel für Wirbel langsam aufrollen.
```

## 6. Oberschenkel im Stehen (`quad`) – Seitenansicht

**Start:**
```
Bild: Seitenansicht, Blick nach rechts. Aufrechter Stand, Arme neben dem Körper.
```
**Dehnung:**
```
Bild: Seitenansicht, Blick nach rechts. Sie steht stabil auf dem linken Bein. Das rechte
Knie ist gebeugt, die rechte Hand hält den rechten Fußrücken nah am Gesäß. Beide Knie
zeigen nach unten und sind nebeneinander. Der linke Arm ist zur Balance nach vorn
gestreckt. Oberkörper aufrecht, kein Hohlkreuz.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Sie beugt das rechte Knie, greift den Fuß mit der rechten
Hand, zieht die Ferse zum Gesäß und streckt den linken Arm zur Balance nach vorn.
3 Sekunden halten, dann den Fuß loslassen und zurück in den Stand.
```

## 7. Hüftbeuger-Ausfallschritt (`hueftbeuger`) – Seitenansicht

**Start:**
```
Bild: Seitenansicht, Blick nach rechts. Tiefer Kniestand: der rechte Fuß steht vorn,
rechtes Knie im 90-Grad-Winkel über dem Knöchel. Das linke Knie liegt hinten auf der Matte,
der linke Fußrücken flach am Boden. Oberkörper aufrecht, Hände an den Hüften.
```
**Dehnung:**
```
Bild: Seitenansicht, Blick nach rechts. Gleicher Kniestand, aber das Becken ist deutlich
nach vorn unten geschoben. Beide Arme sind gestreckt nach oben gehoben, Oberkörper aufrecht,
Blick nach vorn. Das vordere Knie bleibt über dem Knöchel.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Aus dem Kniestand mit Händen an der Hüfte schiebt sie das
Becken langsam nach vorn unten und hebt die Arme gestreckt nach oben. 3 Sekunden halten,
dann Arme senken und Becken zurück.
```

## 8. Katze-Kuh (`katzekuh`) – Seitenansicht

**Start (Kuh):**
```
Bild: Seitenansicht, Blick nach rechts. Vierfüßlerstand: Hände unter den Schultern, Knie
unter den Hüften. Der Bauch sinkt Richtung Boden, der Rücken ist leicht nach unten gewölbt,
Brust und Blick gehen nach vorn oben.
```
**Dehnung (Katze):**
```
Bild: Seitenansicht, Blick nach rechts. Vierfüßlerstand: Hände unter den Schultern, Knie
unter den Hüften. Der Rücken ist deutlich rund nach oben gewölbt, das Kinn zur Brust, der
Bauch eingezogen.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Im Vierfüßlerstand wechselt sie langsam und fließend
zwischen Kuh (Bauch sinkt, Blick nach vorn oben) und Katze (Rücken rund, Kinn zur Brust).
Zwei ruhige Atemzyklen.
```

## 9. Kindhaltung (`kind`) – Seitenansicht

**Start:**
```
Bild: Seitenansicht, Blick nach rechts. Sie sitzt aufrecht im Fersensitz auf der Matte,
Gesäß auf den Fersen, Fußrücken flach. Beide Arme gestreckt über dem Kopf.
```
**Dehnung:**
```
Bild: Seitenansicht, Blick nach rechts. Kindhaltung: Gesäß auf den Fersen, Oberkörper
liegt auf den Oberschenkeln, die Stirn berührt die Matte, beide Arme sind lang nach vorn
auf der Matte ausgestreckt. Ruhig und entspannt.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Aus dem aufrechten Fersensitz mit Armen über dem Kopf legt
sie den Oberkörper langsam mit langem Rücken nach vorn ab, bis die Stirn die Matte berührt.
3 Sekunden ruhig atmen, dann langsam wieder aufrichten.
```

## 10. Schmetterling (`schmetterling`) – Frontansicht

**Start:**
```
Bild: Frontansicht. Sie sitzt aufrecht auf der Matte, die Fußsohlen liegen aneinander nah
am Körper, die Knie zeigen nach außen und sind leicht angehoben. Die Hände halten die
Knöchel. Rücken gerade.
```
**Dehnung:**
```
Bild: Frontansicht. Gleiche Sitzhaltung, die Knie sind entspannt tiefer Richtung Boden
gesunken. Rücken gerade, Schultern locker, Hände an den Knöcheln.
```
**Video:**
```
Frontansicht. Im aufrechten Sitz mit aneinanderliegenden Fußsohlen bewegt sie die Knie
sanft und langsam auf und ab wie Schmetterlingsflügel, dann lässt sie sie tief sinken
und hält kurz.
```

## 11. Sitzende Vorbeuge (`sitzvorbeuge`) – Seitenansicht

**Start:**
```
Bild: Seitenansicht, Blick nach rechts. Sie sitzt aufrecht mit gestreckten Beinen nach vorn,
Fußspitzen zeigen nach oben. Beide Arme gestreckt über dem Kopf.
```
**Dehnung:**
```
Bild: Seitenansicht, Blick nach rechts. Mit langem, geradem Rücken aus der Hüfte nach vorn
gebeugt, der Bauch nähert sich den Oberschenkeln. Die Hände liegen an den Füßen bzw.
Schienbeinen. Beine gestreckt, Nacken entspannt.
```
**Video:**
```
Seitenansicht, Blick nach rechts. Aus dem aufrechten Sitz mit Armen über dem Kopf beugt sie
sich langsam mit geradem Rücken nach vorn, bis die Hände die Füße erreichen. 3 Sekunden
halten, dann langsam aufrichten.
```

---

## Tipps

- **Konsistenz:** Immer dasselbe Referenzbild hochladen. Wenn die Person abweicht:
  „Gleiche Frau wie im Referenzbild, nur die Pose ändern“ nachschieben.
- **Falsche Seite?** Nachschieben: „Spiegle die Pose: benutze das rechte statt das linke Bein“.
- **Unnatürliche Haltung?** Nachschieben: „Die Haltung soll sanft und realistisch sein,
  nicht akrobatisch.“
- **Videos aus zwei Bildern:** Manche Video-Tools können aus einem Start- und einem Endbild
  ein Video erzeugen. Dann Start- und Dehnungsbild verwenden und den Video-Prompt dazugeben.
