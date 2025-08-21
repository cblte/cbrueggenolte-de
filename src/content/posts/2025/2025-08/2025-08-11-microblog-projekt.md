---
title: "Mein Microblog – Von der Idee zur stabilen App"
description: "Wie aus ein paar Experimenten mit Bun, Deno und Hono eine schlanke, sichere und gut betreibbare Microblog-Plattform wurde."
pubDate: 2025-08-11
modDate: 2025-08-11
tags: [microblog, javascript, hono, eta, lowdb]
draft: true
---

Die letzten Wochen habe ich mich intensiv mit meinem eigenen Microblog beschäftigt.
Erst als Experiment, dann als richtiges Projekt.
Am Anfang stand die Idee: eine minimalistische Plattform,
um kurze Beiträge in Markdown zu schreiben,
ohne schweres CMS, ohne unnötigen Ballast.

## Der Weg zum passenden Stack

Zuerst wollte ich Bun nutzen – schnell, modern, elegant.
Leider lief auf meinem Uberspace-Host keine einzige Bun-Version (zu alte glibc).
Also nächster Versuch: [Deno](https://deno.land/).
Auch spannend, aber die Kompatibilität mit manchen Bibliotheken war zu hakelig.
Am Ende bin ich bei klassischem Node.js (mit pnpm) gelandet – robust, kompatibel und schnell einsatzbereit.

Als Web-Framework habe ich [Hono](https://hono.dev/) gewählt: klein, schnell, klare API.
Dazu [Eta](https://eta.js.org/) als Template-Engine – leichtgewichtig, mit einfacher Syntax und guter Kontrolle.
Für die Datenhaltung wollte ich erst Markdown-Dateien nutzen,
bin aber nach ein paar Experimenten auf [LowDB](https://github.com/typicode/lowdb) umgestiegen:
JSON-Datei-Store, schnell eingebunden und perfekt für ein Single-Instance-Projekt.

Tailwind CSS (CLI v4) sorgt für das minimalistische Design,
[Markdown-It](https://markdown-it.github.io/) für die Umwandlung von Beiträgen in sauberes HTML.

---

## 🛠 Technik in Kürze

- **Runtime**: Node.js (ESM + TypeScript)
- **Framework**: Hono – schlank & schnell
- **Templates**: Eta – minimalistisch, gut kontrollierbar
- **Datenhaltung**: LowDB – JSON-Datei-Store
- **Styling**: Tailwind CSS (CLI v4)
- **Markdown**: MarkdownIt → sauberes HTML
- **Sicherheit**: CSRF-Schutz, Rate Limiting, sichere Cookies
- **Build/Deploy**: `tsc`, Tailwind CLI, rsync-Deploy mit Backup

---

## Schritte der Entwicklung

- **01.08.** – Erste lauffähige Version: ESM/TypeScript-Setup, Markdown-Rendering, SQLite-Experiment → Umstieg auf LowDB.
- **02.08.** – Admin-Backend: Login, Beiträge erstellen/bearbeiten/löschen, Intro-Block, Link-Normalisierung.
- **04.08.** – Deployment & Styling: Build-Skripte, rsync-Deploy, minifizierte CSS-Ausgabe.
- **06.08.** – UX-Verbesserungen: Clientseitige Filterung nach Topic/Tags, konsistentes Datumshandling.
- **10.08.** – Sicherheit & Betrieb: CSRF-Schutz, Rate Limiting (5 Versuche/5 Min), Build-Metadaten im Admin.
- **11.08.** – Letzter Feinschliff im Scrollverhalten.

## Sicherheit und Betrieb

Sessions laufen im Speicher (TTL-basiert), Cookies sind sicher konfiguriert (`HttpOnly`, `SameSite`, `Secure` in Prod).
CSRF-Schutz gilt für Login und Admin-Formulare, und ein IP-basiertes Rate Limiting verhindert Brute-Force-Versuche.
Der Build-Prozess erzeugt reproduzierbare Artefakte, die vor dem Deploy getestet werden – inklusive Backup und CSS-Cache-Busting.

## Fazit

Aus einer kleinen Idee ist in kurzer Zeit ein stabiler,
sicherer Microblog geworden –
bewusst schlank gebaut, aber erweiterbar.
Hono, Eta und LowDB haben sich als gute Kombi für ein leichtgewichtiges Projekt erwiesen.
Und das Beste: Ich habe jetzt eine App, oder Plattform,
die genau das tut, was ich wollte – ohne unnötigen Overhead.
