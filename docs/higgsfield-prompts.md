# Higgsfield-Prompts zum direkten Eingeben

Pro Übung zwei Schritte in Higgsfield – genau wie beim fertigen Katze-Kuh-Video.

## Einstellungen

**Schritt 1 – Startbild** (Image, ca. 1 Credit)
- Modell: **GPT Image 2.6**, Format **1:1**, Qualität *medium*
- Referenzbild hochladen (die Frau in Weiß auf der Matte)
- Bild-Prompt der Übung einfügen

**Schritt 2 – Video** (Video, ca. 7,5 Credits)
- Modell: **MiniMax H3 Max**, Format **1:1**, **5 s**, **480p** (768p = schärfer, ca. doppelt so teuer)
- Das Startbild aus Schritt 1 als **Start frame** UND als **End frame** einsetzen → nahtlose Schleife
- Video-Prompt der Übung einfügen

Speichern als `media/<id>-start.jpg` und `media/<id>.mp4` – dann baue ich sie in die App ein.

---

## Gemeinsamer Anfang für jeden Bild-Prompt

Diesen Satz **vor** den Bild-Prompt der Übung kopieren:

```
Same woman as in the reference image: same face, low blonde ponytail, white camisole tank top, white 3/4 leggings, barefoot, thin dark anklet, pearl bracelet. Photorealistic, on the same sand-colored yoga mat on a flat granite rock, clear light-blue sky, warm evening light, soft shadow, camera at hip height, whole body visible with space around her, square 1:1, no text, no logos.
```

---

## 1. Nackenneigung (`nacken`)

**Bild:**
```
Front view facing the camera. She stands upright, feet hip-width apart, arms relaxed at her sides, shoulders soft, calm expression.
```
**Video:**
```
Static camera, no zoom, no cuts. Front view. She slowly tilts her head toward her right shoulder, places her right hand gently on the left side of her head, keeps her left shoulder low, holds calmly, then releases the hand and slowly brings her head back to upright, ending exactly as at the start. Slow, controlled, realistic yoga tutorial movement.
```

## 2. Brustöffner (`brust`)

**Bild:**
```
Strict side view, she faces right (her head on the right side of the image). She stands upright, feet hip-width apart, arms relaxed at her sides.
```
**Video:**
```
Static camera, no zoom, no cuts. Side view, facing right. She interlaces her hands behind her back, straightens her arms and lifts them back and up, squeezes her shoulder blades, opens her chest and gazes slightly upward, holds, then lowers her arms back to her sides, ending exactly as at the start. Slow and controlled.
```

## 3. Schulterdehnung quer (`schulter`)

**Bild:**
```
Front view facing the camera. She stands upright, feet hip-width apart, arms relaxed at her sides.
```
**Video:**
```
Static camera, no zoom, no cuts. Front view. She brings her straight right arm across her chest at shoulder height, her left hand holds it just above the elbow and gently pulls it toward her chest, shoulders stay low, torso faces forward. She holds, then releases and lets both arms hang again, ending exactly as at the start. Slow and controlled.
```

## 4. Seitbeuge im Stehen (`seitbeuge`)

**Bild:**
```
Front view facing the camera. She stands upright, feet hip-width apart, knees soft, arms relaxed at her sides.
```
**Video:**
```
Static camera, no zoom, no cuts. Front view. She raises her right arm overhead, lengthens upward, then bends her upper body sideways to the left in a smooth arc while her left hand slides down her left thigh. Hips stay centered. She holds, then slowly returns upright and lowers the arm, ending exactly as at the start. Slow and controlled.
```

## 5. Vorwärtsbeuge im Stehen (`vorbeuge`)

**Bild:**
```
Strict side view, she faces right. She stands upright, feet hip-width apart, both arms stretched straight overhead.
```
**Video:**
```
Static camera, no zoom, no cuts. Side view, facing right. With a long back she hinges forward from the hips, knees slightly bent, and lets her upper body, head and ponytail hang down loosely, hands reaching toward her ankles. She holds, then bends her knees and rolls up slowly vertebra by vertebra, raising her arms overhead again, ending exactly as at the start.
```

## 6. Oberschenkel im Stehen (`quad`)

**Bild:**
```
Strict side view, she faces right. She stands upright, feet hip-width apart, arms relaxed at her sides.
```
**Video:**
```
Static camera, no zoom, no cuts. Side view, facing right. Standing on her left leg, she bends her right knee, grabs the top of her right foot with her right hand and pulls the heel toward her buttocks, both knees pointing down side by side, left arm reaching forward for balance, torso upright. She holds, then releases the foot and returns to standing, ending exactly as at the start.
```

## 7. Hüftbeuger-Ausfallschritt (`hueftbeuger`)

**Bild:**
```
Strict side view, she faces right. Low kneeling lunge on the mat: right foot planted in front with the right knee at 90 degrees above the ankle, left knee resting on the mat behind her, top of the left foot flat on the mat. Upright torso, hands on her hips.
```
**Video:**
```
Static camera, no zoom, no cuts. Side view, facing right. From the kneeling lunge she slowly shifts her pelvis forward and down while raising both straight arms overhead, torso upright, front knee stays above the ankle. She holds, then lowers her arms to her hips and shifts back, ending exactly as at the start.
```

## 8. Kindhaltung (`kind`)

**Bild:**
```
Strict side view, she faces right. She sits upright on her heels on the mat, tops of the feet flat, both arms stretched straight overhead.
```
**Video:**
```
Static camera, no zoom, no cuts. Side view, facing right. With a long back she slowly folds forward until her chest rests on her thighs and her forehead touches the mat, arms extended long in front of her on the mat, hips staying on her heels. She breathes calmly, then slowly rises back up to sitting with arms overhead, ending exactly as at the start.
```

## 9. Schmetterling (`schmetterling`)

**Bild:**
```
Front view facing the camera. She sits upright on the mat, soles of the feet pressed together close to her body, knees falling outward and slightly raised, hands holding her ankles, straight back.
```
**Video:**
```
Static camera, no zoom, no cuts. Front view. Sitting upright with the soles of her feet together, she gently and slowly moves her knees up and down like butterfly wings a few times, then lets them sink lower toward the mat and returns to the starting height, ending exactly as at the start. Back stays straight, calm movement.
```

## 10. Sitzende Vorbeuge (`sitzvorbeuge`)

**Bild:**
```
Strict side view, she faces right. She sits upright on the mat with both legs stretched straight forward, toes pointing up, both arms stretched straight overhead.
```
**Video:**
```
Static camera, no zoom, no cuts. Side view, facing right. With a long straight back she hinges forward from the hips until her hands reach her feet or shins, legs stay straight, neck relaxed. She holds, then slowly rises back to upright with arms overhead, ending exactly as at the start.
```

---

## Wenn etwas nicht passt

- **Falsche Seite:** „Mirror the pose: use the right leg instead of the left.“ ergänzen.
- **Zu wenig Bewegung:** „The movement is clearly visible and reaches the full stretch.“ ergänzen.
- **Person sieht anders aus:** Referenzbild erneut anhängen und „Keep exactly the same face and hair as the reference image.“ ergänzen.
