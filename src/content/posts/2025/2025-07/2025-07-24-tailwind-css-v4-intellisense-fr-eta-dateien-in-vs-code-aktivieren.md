---
title: "Tailwind CSS v4 IntelliSense für `.eta`-Dateien in VS Code aktivieren"
description: "Wie man IntelliSense für Tailwind CSS v4 in `.eta`-Dateien in VS Code aktiviert"
pubDate: 2025-07-24
modDate: 2025-07-24
tags: [VSCode, TailwindCSS]
---

Mit der Veröffentlichung von **Tailwind CSS v4** hat sich einiges geändert – unter anderem die Art, wie Konfiguration und Styles gehandhabt werden. Wenn du `.eta`-Dateien ([eta](https://eta.js.org/)-Templates) verwendest, bekommst du möglicherweise **keine IntelliSense-Unterstützung** in VS Code. Hier zeige ich dir, wie du das behebst.

## Voraussetzungen:

- **VS Code** installiert
- **Tailwind CSS v4** korrekt eingerichtet
- **Tailwind CSS IntelliSense Extension** installiert
  👉 [Hier herunterladen](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## Schritt 1: `.vscode/settings.json` konfigurieren

Erstelle oder bearbeite die Datei `.vscode/settings.json` in deinem Projektordner und füge Folgendes hinzu:

```json
{
  "tailwindCSS.includeLanguages": {
    "eta": "html"
  },
  "tailwindCSS.experimental.configFile": "src/styles/styles.css"
}
```

- `includeLanguages`: Sagt VS Code, dass `.eta`-Dateien wie HTML behandelt werden sollen.
- `experimental.configFile`: Zeigt auf deine zentrale Tailwind-CSS-Datei (z. B. `styles.css`), in der du Tailwind importierst.

---

## Schritt 2: Tailwind in `styles.css` importieren

In Tailwind v4 sieht deine zentrale CSS-Datei typischerweise so aus:

```css
@import "tailwindcss";
```

Optional kannst du auch Plugins oder Custom Styles hinzufügen:

```css
@import "tailwindcss";
@import "./custom.css";
```

---

## Schritt 3: `tailwind.config.js` anpassen

Stelle sicher, dass deine `.eta`-Dateien im `content`-Array enthalten sind:

```js
export default {
  content: ["./views/**/*.eta", "./src/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## Schritt 4: VS Code neu starten

Nach den Änderungen solltest du **VS Code neu starten**, damit die IntelliSense-Erweiterung die neuen Einstellungen erkennt. Das ist nicht immer erforderlich, aber in diesem Fall ist es ratsam.

---

Jetzt solltest du in `.eta`-Dateien:

- Autovervollständigung für Tailwind-Klassen erhalten
- Hover-Informationen und Vorschauen sehen
- Fehler bei ungültigen Klassen erkennen

---

Viel Spaß beim Coden mit Tailwind v4 und Eta! 🎨✨
