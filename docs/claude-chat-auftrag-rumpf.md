# Auftrag für den Claude-Chat: Rumpfkräftigung (Higgsfield)

Gleiches Vorgehen wie bei den Dehnübungen: In **claude.ai (Chat)** mit verbundenem
Higgsfield einen neuen Chat öffnen, das **Referenzbild** anhängen und den Block unten einfügen.

Alle 8 Übungen sind ohne Geräte machbar und decken den ganzen Rumpf ab:
vorne (Bauch), seitlich, hinten (Rücken/Gesäß) und die Tiefenmuskulatur.

| ID | Übung | Zielmuskeln |
| --- | --- | --- |
| `plank` | Unterarmstütz | gerade Bauchmuskeln, Tiefenmuskulatur |
| `seitstuetz` | Seitstütz | seitliche Bauchmuskeln |
| `deadbug` | Dead Bug | Tiefenmuskulatur, Koordination |
| `birddog` | Vierfüßler-Diagonale (Bird Dog) | Rückenstrecker, Gesäß, Stabilität |
| `beckenheben` | Beckenheben (Glute Bridge) | Gesäß, unterer Rücken |
| `superman` | Superman | Rückenstrecker, hintere Schulter |
| `crunch` | Crunch | gerade Bauchmuskeln |
| `bergsteiger` | Bergsteiger (langsam) | Bauch, Hüftbeuger, Schulterstabilität |

---

```
Bitte erzeuge mit Higgsfield Übungsvideos zur Rumpfkräftigung für meine Trainings-App. Nutze ausschließlich meine kostenlosen unbegrenzten Generierungen (use_unlim: true) – falls etwas Credits kosten würde, frag mich vorher.

REFERENZ: Das angehängte Bild zeigt die Figur (frei erfundene KI-Person). Lade es zu Higgsfield hoch und nutze es für jedes Startbild als image_reference.

ABLAUF PRO ÜBUNG
1. Startbild: generate_image, Modell gpt_image_2_6, aspect_ratio 1:1, Referenzbild als image_references. Prompt = BASIS + "Bild" der Übung.
2. Video: generate_video, Modell seedance_2_0 (oder seedance_2_5 im Modus omni_reference, falls nur das unbegrenzt ist), aspect_ratio 1:1, duration 6, generate_audio false, Startbild-Job als start_image UND als end_image (nahtlose Schleife). Prompt = "Static camera, no zoom, no cuts." + "Video" der Übung + " Controlled, realistic fitness tutorial movement with correct form, neutral spine, ending exactly in the starting pose."
3. Arbeite alle 8 Übungen ab (gern parallel per Batch), prüfe jedes Ergebnis grob (richtige Übung, saubere Technik, gleiche Person, plausible Hände/Füße) und erzeuge Ausreißer neu.
4. Gib mir am Ende eine Tabelle: Übungs-ID, Link zum Startbild, Link zum Video.

BASIS (vor jeden Bild-Prompt):
Same woman as in the reference image: same face, low blonde ponytail, white camisole tank top, white 3/4 leggings, barefoot, thin dark anklet, pearl bracelet. Photorealistic, on the same sand-colored yoga mat on a flat granite rock, clear light-blue sky, warm evening light, soft shadow, camera at hip height, whole body visible with space around her, square 1:1, no text, no logos.

ÜBUNGEN

plank
Bild: Strict side view, she faces right (head on the right side of the image). She kneels on all fours on the mat, forearms on the mat with elbows directly under the shoulders, knees on the mat.
Video: Side view, facing right. From the forearm kneeling position she steps both feet back one after the other into a forearm plank: body in one straight line from head to heels, belly and glutes engaged, neck long, gaze down. She holds steadily with calm breathing, then lowers her knees back to the mat.

seitstuetz
Bild: Front view facing the camera. She lies on her right side on the mat, propped on her right forearm with the elbow under the shoulder, legs stretched and stacked, left hand on her hip, body in a straight line.
Video: Front view. She lifts her hips off the mat into a side plank so that her body forms one straight line from head to feet, left hand on her hip, holds steadily with calm breathing, then slowly lowers her hips back to the mat.

deadbug
Bild: Strict side view, she faces right. She lies on her back on the mat, lower back pressed into the mat, arms pointing straight up to the sky, hips and knees bent at 90 degrees with shins parallel to the mat.
Video: Side view. Lying on her back, she slowly lowers her left arm back over her head and extends her right leg forward just above the mat at the same time, lower back stays pressed into the mat, then returns to the start; then the same with the right arm and the left leg, then back to the starting position.

birddog
Bild: Strict side view, she faces right. She is on all fours on the mat: hands under the shoulders, knees under the hips, back flat like a table, neck long, gaze down.
Video: Side view, facing right. From all fours she slowly extends her right arm forward and her left leg back until both are in one line with her back, hips stay level, holds briefly, then returns to all fours; then the same with the left arm and the right leg, then back to the starting position.

beckenheben
Bild: Strict side view, her head on the left side of the image. She lies on her back on the mat, knees bent, feet flat on the mat hip-width apart close to her buttocks, arms resting beside her body, palms down.
Video: Side view. She presses through her heels and slowly lifts her hips until her body forms a straight line from shoulders to knees, squeezes her glutes at the top, holds briefly, then lowers her back to the mat vertebra by vertebra; repeats twice and ends in the starting position.

superman
Bild: Strict side view, her head on the right side of the image. She lies face down on the mat, arms stretched forward overhead, legs stretched back, forehead hovering just above the mat.
Video: Side view. Lying face down, she slowly lifts her arms, chest and legs a few centimeters off the mat at the same time, gaze down, neck long, holds briefly, then slowly lowers back down; repeats twice and ends in the starting position.

crunch
Bild: Strict side view, her head on the left side of the image. She lies on her back on the mat, knees bent, feet flat on the mat, fingertips lightly behind her ears, elbows open to the sides.
Video: Side view. She exhales and slowly curls her head, shoulders and upper back off the mat toward her knees, lower back stays on the mat, elbows open, no pulling on the neck, then slowly lowers back down; repeats three times and ends in the starting position.

bergsteiger
Bild: Strict side view, she faces right. High plank on straight arms: hands under the shoulders, body in one straight line from head to heels.
Video: Side view, facing right. In a stable high plank she slowly pulls her right knee toward her chest and back, then her left knee toward her chest and back, alternating at a slow, controlled pace, hips stay level and low, shoulders above the hands; ends in the high plank.
```

---

## Danach

Dateien als `<id>-start.png` (oder `.jpg`) und `<id>.mp4` benennen oder die Links aus der Tabelle
hier in Claude Code schicken. Für die App brauchen die neuen Übungen außerdem Anleitungstexte,
Zielmuskeln und eine Routine „Rumpf“ – die ergänze ich beim Einbau.
