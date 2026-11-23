# Auftrag für den Claude-Chat: Asiatische Lockerung & Lymph-Anregung (Higgsfield)

Gleiches Vorgehen wie bei den anderen Übungen: In **claude.ai (Chat)** mit verbundenem
Higgsfield einen neuen Chat öffnen, das **Referenzbild** anhängen und den Block unten einfügen.

> Hinweis: Das Instagram-Reel konnte ich nicht ansehen. Die Übungen unten sind klassische,
> weit verbreitete Varianten. Wenn das Reel andere Bewegungen zeigt, beschreib sie mir kurz
> oder schick Screenshots – dann passe ich die Prompts an.

## Asiatische Lockerungsübungen (Qigong-inspiriert)

| ID | Übung | Wirkung |
| --- | --- | --- |
| `klopfen` | Ganzkörper-Klopfen | weckt auf, lockert Muskulatur |
| `schuetteln` | Ausschütteln | löst Spannung, lockert Gelenke |
| `drehschwung` | Drehschwung der Arme | mobilisiert Wirbelsäule und Schultern |
| `himmel` | Den Himmel stützen | streckt den ganzen Körper, öffnet die Atmung |
| `wirbelwelle` | Wirbelsäulen-Welle | mobilisiert die Wirbelsäule Segment für Segment |
| `hueftkreisen` | Hüftkreisen | lockert Becken und unteren Rücken |

## Anregung des Lymphflusses

| ID | Übung | Wirkung |
| --- | --- | --- |
| `schluesselbein` | Schlüsselbeingruben pumpen | sanfter Impuls an den Lymph-Hauptstellen am Hals |
| `bauchatmung` | Tiefe Bauchatmung | Zwerchfell als „Lymphpumpe“ |
| `achsel` | Achsel-Pumpe | Achsellymphknoten-Bereich anregen |
| `fersenwippen` | Fersenwippen | Wadenmuskelpumpe aktivieren |
| `fusspumpe` | Fußpumpe in Rückenlage | Rückfluss aus den Beinen fördern |
| `faustpumpe` | Arme hoch, Fäuste pumpen | Rückfluss aus den Armen fördern |

---

```
Bitte erzeuge mit Higgsfield Übungsvideos für meine Trainings-App (asiatische Lockerungsübungen und sanfte Übungen zur Anregung des Lymphflusses). Nutze ausschließlich meine kostenlosen unbegrenzten Generierungen (use_unlim: true) – falls etwas Credits kosten würde, frag mich vorher.

REFERENZ: Das angehängte Bild zeigt die Figur (frei erfundene KI-Person). Lade es zu Higgsfield hoch und nutze es für jedes Startbild als image_reference.

ABLAUF PRO ÜBUNG
1. Startbild: generate_image, Modell gpt_image_2_6, aspect_ratio 1:1, Referenzbild als image_references. Prompt = BASIS + "Bild" der Übung.
2. Video: generate_video, Modell seedance_2_0 (oder seedance_2_5 im Modus omni_reference, falls nur das unbegrenzt ist), aspect_ratio 1:1, duration 6, generate_audio false, Startbild-Job als start_image UND als end_image (nahtlose Schleife). Prompt = "Static camera, no zoom, no cuts." + "Video" der Übung + " Soft, flowing, relaxed movement in a calm rhythm, like a qigong or wellness tutorial, ending exactly in the starting pose."
3. Arbeite alle 12 Übungen ab (gern parallel per Batch), prüfe jedes Ergebnis grob (richtige Bewegung, gleiche Person, plausible Hände/Füße) und erzeuge Ausreißer neu.
4. Gib mir am Ende eine Tabelle: Übungs-ID, Link zum Startbild, Link zum Video.

BASIS (vor jeden Bild-Prompt):
Same woman as in the reference image: same face, low blonde ponytail, white camisole tank top, white 3/4 leggings, barefoot, thin dark anklet, pearl bracelet. Photorealistic, on the same sand-colored yoga mat on a flat granite rock, clear light-blue sky, warm evening light, soft shadow, camera at hip height, whole body visible with space around her, square 1:1, no text, no logos, calm relaxed expression.

TEIL A – ASIATISCHE LOCKERUNG

klopfen
Bild: Front view facing the camera. She stands relaxed, feet hip-width apart, knees soft, arms hanging loosely, hands in loose fists.
Video: Front view. With loose relaxed fists she lightly taps along the inside of her left arm from shoulder to wrist and back up the outside, then the same on the right arm, then taps her upper chest, then bends her knees slightly and taps down the outside of her legs and up the inside. Light, rhythmic, relaxed tapping.

schuetteln
Bild: Front view facing the camera. She stands relaxed, feet hip-width apart, knees soft, arms hanging loosely at her sides.
Video: Front view. She bounces gently and rhythmically in her knees, heels staying on the mat, while her arms, hands and shoulders shake loosely and relaxed; the whole body jiggles softly. Then she slows down and comes to stillness.

drehschwung
Bild: Front view facing the camera. She stands with feet slightly wider than hip-width, knees soft, arms hanging loosely.
Video: Front view. She turns her torso and hips gently from side to side around her spine; her relaxed arms swing passively with the rotation and lightly wrap around her body, one hand tapping the opposite shoulder and the other the lower back on each turn. Feet stay planted, smooth pendulum rhythm, then she slows down to the start.

himmel
Bild: Front view facing the camera. She stands upright, feet hip-width apart, hands in front of her lower belly with the fingers interlaced, palms facing up.
Video: Front view. With interlaced fingers she slowly raises her hands in front of her body; at chest height she turns the palms outward and pushes them up toward the sky with straight arms, gaze following the hands, rising slightly onto her toes and stretching the whole body. She holds briefly, then lowers the heels and lets the arms float down sideways to the starting position.

wirbelwelle
Bild: Strict side view, she faces right (head on the right side of the image). She stands upright, feet hip-width apart, knees soft, arms relaxed at her sides.
Video: Side view, facing right. She makes a slow, fluid wave through her spine: chin tucks, chest rounds forward, then the belly and pelvis follow, and she unrolls upward again from the pelvis to the chest to the head, like a gentle wave moving through her body. Twice, then she ends upright.

hueftkreisen
Bild: Front view facing the camera. She stands with feet slightly wider than hip-width, knees soft, hands resting on her hips.
Video: Front view. With hands on her hips she draws slow, large circles with her pelvis – forward, to the side, back, to the other side – upper body stays mostly still, knees soft. One circle clockwise, one counterclockwise, then back to center.

TEIL B – LYMPHFLUSS ANREGEN

schluesselbein
Bild: Front view facing the camera, slightly closer framing (upper body and hips fill more of the image, still head and arms fully visible). She stands relaxed; her index and middle fingers rest lightly in the hollows just above her collarbones on both sides.
Video: Front view. With very light, soft pressure her fingertips gently pump in the hollows above her collarbones – a slow, rhythmic stretching of the skin toward the center of the body and release, about once per second. Shoulders relaxed, calm breathing.

bauchatmung
Bild: Strict side view, her head on the left side of the image. She lies on her back on the mat, knees bent, feet flat on the mat, both hands resting on her belly.
Video: Side view. She breathes slowly and deeply into her belly: her belly and hands rise clearly as she inhales, then sink as she exhales slowly; chest stays calm. Two slow breaths, ending as at the start.

achsel
Bild: Front view facing the camera. She stands relaxed; her left arm is raised and her left hand rests on the back of her head; her right hand lies flat in her left armpit.
Video: Front view. Her flat right hand gently and slowly pumps in her left armpit with soft rhythmic pressure, a few times, then she lowers both arms and switches: right arm up, left hand pumping gently in the right armpit; then she returns to the starting position.

fersenwippen
Bild: Strict side view, she faces right. She stands upright, feet hip-width apart, arms relaxed at her sides.
Video: Side view, facing right. She rises slowly onto the balls of her feet, then lets her heels drop softly back to the mat with a gentle bounce, repeating in a relaxed rhythm several times; the calves clearly work, body upright and loose.

fusspumpe
Bild: Strict side view, her head on the left side of the image. She lies on her back on the mat, both legs raised with knees slightly bent and lower legs angled upward, arms resting beside her body.
Video: Side view. With raised legs she slowly and alternately pulls her toes toward her shins and points them away again – both feet together, a calm, steady pumping movement at the ankles, several times. Legs stay raised and relaxed.

faustpumpe
Bild: Front view facing the camera. She stands upright, feet hip-width apart, both arms stretched straight up overhead, hands open.
Video: Front view. With both arms stretched overhead she slowly closes her hands into fists and opens them wide again, rhythmically several times, then lets her arms float slowly down sideways and raises them up again to the starting position.
```

---

## Danach

Dateien als `<id>-start.png` (oder `.jpg`) und `<id>.mp4` benennen oder die Links aus der Tabelle
hier in Claude Code schicken. Beim Einbau ergänze ich Anleitungen, zwei neue Routinen
(„Lockerung“ und „Lymph-Anregung“) und einen Hinweis zu Gegenanzeigen (z. B. akute
Entzündungen, Thrombose, Herzschwäche – im Zweifel ärztlich abklären).
