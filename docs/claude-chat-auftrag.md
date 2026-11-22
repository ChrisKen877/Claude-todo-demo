# Auftrag für den Claude-Chat (Higgsfield, unbegrenzte Generierungen)

In **claude.ai (Chat)** mit verbundenem Higgsfield-Konnektor einen neuen Chat öffnen,
das **Referenzbild** (Frau in Weiß auf der Matte) anhängen und den Text unten einfügen.

---

```
Bitte erzeuge mit Higgsfield Übungsvideos für meine Dehn-App. Nutze ausschließlich meine kostenlosen unbegrenzten Generierungen (use_unlim: true) – falls etwas Credits kosten würde, frag mich vorher.

REFERENZ: Das angehängte Bild zeigt die Figur (frei erfundene KI-Person). Lade es zu Higgsfield hoch und nutze es für jedes Startbild als image_reference.

ABLAUF PRO ÜBUNG
1. Startbild: generate_image, Modell gpt_image_2_6, aspect_ratio 1:1, Referenzbild als image_references. Prompt = BASIS + "Bild" der Übung.
2. Video: generate_video, Modell seedance_2_0 (oder seedance_2_5 im Modus omni_reference, falls nur das unbegrenzt ist), aspect_ratio 1:1, duration 5, generate_audio false, Startbild-Job als start_image UND als end_image (damit das Video nahtlos in Schleife läuft). Prompt = "Static camera, no zoom, no cuts." + "Video" der Übung + " Slow, controlled, realistic yoga tutorial movement, ending exactly in the starting pose."
3. Arbeite alle 10 Übungen ab (gern parallel per Batch), prüfe jedes Ergebnis grob (richtige Übung, gleiche Person, plausible Hände/Füße) und erzeuge Ausreißer neu.
4. Gib mir am Ende eine Tabelle: Übungs-ID, Link zum Startbild, Link zum Video.

BASIS (vor jeden Bild-Prompt):
Same woman as in the reference image: same face, low blonde ponytail, white camisole tank top, white 3/4 leggings, barefoot, thin dark anklet, pearl bracelet. Photorealistic, on the same sand-colored yoga mat on a flat granite rock, clear light-blue sky, warm evening light, soft shadow, camera at hip height, whole body visible with space around her, square 1:1, no text, no logos.

ÜBUNGEN

nacken
Bild: Front view facing the camera. She stands upright, feet hip-width apart, arms relaxed at her sides.
Video: Front view. She slowly tilts her head toward her right shoulder, places her right hand gently on the left side of her head, keeps her left shoulder low, holds, then releases and brings her head back upright.

brust
Bild: Strict side view, she faces right (head on the right side of the image). She stands upright, feet hip-width apart, arms at her sides.
Video: Side view, facing right. She interlaces her hands behind her back, straightens and lifts her arms back and up, opens her chest and gazes slightly upward, holds, then lowers her arms.

schulter
Bild: Front view facing the camera. She stands upright, feet hip-width apart, arms at her sides.
Video: Front view. She brings her straight right arm across her chest at shoulder height, her left hand pulls it gently in just above the elbow, shoulders low, holds, then releases.

seitbeuge
Bild: Front view facing the camera. She stands upright, feet hip-width apart, knees soft, arms at her sides.
Video: Front view. She raises her right arm overhead, lengthens, then bends sideways to the left in a smooth arc while her left hand slides down her left thigh, hips centered, holds, then returns upright and lowers the arm.

vorbeuge
Bild: Strict side view, she faces right. She stands upright, feet hip-width apart, both arms stretched straight overhead.
Video: Side view, facing right. With a long back she hinges forward from the hips, knees slightly bent, upper body and head hang loosely, hands toward the ankles, holds, then rolls up slowly with bent knees and raises the arms overhead again.

quad
Bild: Strict side view, she faces right. She stands upright, feet hip-width apart, arms at her sides.
Video: Side view, facing right. Standing on her left leg she bends her right knee, holds the top of her right foot with her right hand and pulls the heel to her buttocks, knees side by side pointing down, left arm forward for balance, holds, then returns to standing.

hueftbeuger
Bild: Strict side view, she faces right. Low kneeling lunge: right foot planted in front, right knee at 90 degrees above the ankle, left knee on the mat behind her, top of the left foot flat, upright torso, hands on her hips.
Video: Side view, facing right. She slowly shifts her pelvis forward and down and raises both straight arms overhead, torso upright, holds, then lowers the arms to her hips and shifts back.

kind
Bild: Strict side view, she faces right. She sits upright on her heels on the mat, tops of the feet flat, both arms stretched straight overhead.
Video: Side view, facing right. With a long back she folds forward until her chest rests on her thighs and her forehead touches the mat, arms long in front of her, hips on her heels, breathes calmly, then rises back to sitting with arms overhead.

schmetterling
Bild: Front view facing the camera. She sits upright, soles of the feet together close to her body, knees falling outward and slightly raised, hands holding her ankles, straight back.
Video: Front view. She gently moves her knees up and down like butterfly wings a few times, lets them sink lower toward the mat, then returns to the starting height.

sitzvorbeuge
Bild: Strict side view, she faces right. She sits upright with both legs stretched straight forward, toes pointing up, both arms stretched straight overhead.
Video: Side view, facing right. With a long straight back she hinges forward until her hands reach her feet or shins, legs straight, holds, then rises back upright with arms overhead.
```

---

## Danach

Die Dateien herunterladen und so benennen: `<id>-start.png` (oder `.jpg`) und `<id>.mp4`,
z. B. `kind-start.png` und `kind.mp4`. Dann hier in Claude Code hochladen oder die
Links aus der Tabelle schicken – ich prüfe sie, bereite sie fürs Web auf und baue sie in die App ein.
