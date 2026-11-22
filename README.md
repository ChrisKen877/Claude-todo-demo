# Dehnroutine

Kleine Web-App (PWA) für tägliche Dehnübungen ohne Geräte – optimiert fürs iPhone.

- **Geführtes Training** mit animierten Illustrationen, Countdown, Signaltönen und Sprachansage.
  Der gedehnte Muskel leuchtet in der Figur auf.
- **Übungsbibliothek** mit Schritt-für-Schritt-Anleitung, typischen Fehlern und leichteren Varianten.
- **Verlauf**: Kalender, aktuelle und beste Serie, Minuten pro Woche.
- **Erinnerung** als wiederkehrender Termin im iPhone-Kalender (.ics).
- Funktioniert offline, alle Daten bleiben lokal auf dem Gerät (Sicherung als JSON möglich).

## Starten

Kein Build nötig – es sind reine HTML/CSS/JS-Dateien. Lokal z. B.:

```sh
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

## Aufs iPhone bringen

Service Worker und Installation brauchen HTTPS. Am einfachsten mit **GitHub Pages**:

1. Repo → *Settings* → *Pages* → *Deploy from a branch* → Branch wählen, Ordner `/ (root)`.
2. Die angezeigte URL in **Safari** auf dem iPhone öffnen.
3. *Teilen* → *Zum Home-Bildschirm*.

Als installierte App läuft sie im Vollbild, offline, und iOS löscht die gespeicherten Daten nicht.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `js/exercises.js` | Übungen (Texte, Posen, Zielmuskel) und Routinen |
| `js/figure.js` | SVG-Figur: berechnet die Pose aus Gelenkwinkeln und animiert zwischen zwei Posen |
| `js/trainer.js` | Trainingsablauf (Vorbereitung, Übung, Pause, Seitenwechsel), Ton, Sprache, Wake Lock |
| `js/store.js` | Speicherung in `localStorage`, Serien und Statistiken |
| `js/app.js` | Ansichten, Navigation, Kalender-Erinnerung |
| `sw.js` | Offline-Cache (bei Änderungen `VERSION` erhöhen) |

### Neue Übung hinzufügen

In `js/exercises.js` ein Objekt ergänzen. Eine Pose besteht aus der Hüftposition `root` und
Winkeln in Grad (0° = nach unten, 90° = nach vorn/rechts, 180° = nach oben). `a` ist die
Ausgangsposition, `b` die Dehnposition. Die Animation pendelt automatisch dazwischen.

## Mögliche nächste Schritte

- Push-Benachrichtigungen direkt aus der App (benötigt einen kleinen Server für Web Push).
- Eigene Routinen zusammenstellen.
- Weitere Übungen, z. B. liegende Drehung, Taube, Wadendehnung.
