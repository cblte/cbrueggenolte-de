---
title: "Mein Microblog – Von der Idee zur stabilen App"
description: "Wie aus ein paar Experimenten mit Bun, Deno und Hono eine schlanke, sichere und gut betreibbare Microblog-Plattform wurde."
pubDate: 2025-09-06
modDate: 2025-09-06
tags: [Programmieren, Blogging, Microblogging, Minimalism]
---

Die letzten Wochen habe ich mich intensiv mit meinem eigenen Microblog beschäftigt. Was als kleines Experiment begann,
wuchs schnell zu einem vollwertigen Projekt heran.
Die Idee war klar: eine minimalistische Plattform für kurze Beiträge in Markdown,
ohne schweres CMS, ohne unnötigen Ballast.
Ich wollte etwas Eigenes schaffen – unabhängig von großen Anbietern, leichtgewichtig und trotzdem funktional.

## Der Weg zur richtigen Technologie

Ich war sofort von [Bun](https://bun.sh/) begeistert – schnell, modern,
mit einer eleganten All-in-One-Philosophie.
Doch auf meinem Uberspace-Host scheiterte jede Bun-Version
an einer zu alten glibc.
Schade, aber Plan B war schnell gefunden: [Deno](https://deno.land/).
Deno versprach Sicherheit und moderne Features.
Allerdings war die Kompatibilität mit manchen Bibliotheken hakelig,
und ich stieß bei der Integration auf zu viele kleine Hürden.
Nach diesen Experimenten landete ich bei klassischem Node.js (mit pnpm).
Es ist robust, weit verbreitet und ließ sich auf meinem Host
ohne Probleme einrichten.
Mit TypeScript und ESM war ich trotzdem nah
an einer modernen Entwicklungsumgebung.

Für das Web-Framework fiel die Wahl auf [Hono](https://hono.dev/).
Es ist klein, schnell und hat eine klare, intuitive API – perfekt für ein
Projekt, das keinen Overhead verträgt.
Als Template-Engine wählte ich [Eta](https://eta.js.org/), weil sie
minimalistisch ist, eine einfache Syntax bietet und mir volle Kontrolle über
die Templates gibt.
Für die Datenhaltung experimentierte ich zunächst mit Markdown-Dateien im
Dateisystem.
Das war simpel, aber unpraktisch, sobald es um dynamische Inhalte oder
Metadaten ging.
Also wechselte ich zu [LowDB](https://github.com/typicode/lowdb), einem
JSON-Datei-Store, der sich schnell einbinden ließ und für ein
Single-Instance-Projekt wie dieses ideal ist.

Das Design hielt ich mit [Tailwind CSS](https://tailwindcss.com/) bewusst schlicht.
Tailwind ermöglicht es,
schnell ansprechende Layouts zu bauen,
ohne sich in CSS-Details zu verlieren.
Für die Umwandlung von Markdown in sauberes HTML
kam [Markdown-It](https://markdown-it.github.io/) zum Einsatz,
das zuverlässig und flexibel ist.

## Technik Stack

- **Runtime**: Node.js (ESM + TypeScript) – robust und kompatibel
- **Framework**: Hono – schlank, schnell, mit klarer API
- **Templates**: Eta – minimalistisch und leicht kontrollierbar
- **Datenhaltung**: LowDB – JSON-Datei-Store, ideal für kleine Projekte
- **Styling**: Tailwind CSS (CLI v4) – für ein sauberes, modernes Design
- **Markdown**: Markdown-It – für zuverlässige Markdown-zu-HTML-Konvertierung
- **Sicherheit**: CSRF-Schutz, Rate Limiting, sichere Cookies
- **Build/Deploy**: `tsc`, Tailwind CLI, rsync-Deploy mit Backup
- **Performance**: Statische Assets mit Cache-Headers, minimale JS-Bundles

## Herausforderungen und Lösungen

Die größte Herausforderung war,
die Balance zwischen Einfachheit und Funktionalität zu finden.
Zum Beispiel war die Entscheidung für LowDB nicht trivial:
Ich hatte zunächst überlegt,
eine richtige Datenbank wie PostgreSQL einzusetzen.
Aber für ein kleines Projekt mit überschaubarem Datenvolumen
wäre das Overkill gewesen.
SQLite schied leider auch aus, weil Uberspace keine Unterstützung
aufgrund von fehlenden Bibliotheken bot.
LowDB bot die perfekte Mischung aus Flexibilität und Einfachheit,
auch wenn ich für größere Projekte vielleicht noch mal umdenken würde.

## Sicherheit und Betrieb

Sicherheit war mir von Anfang an wichtig.
Sessions werden im Speicher gehalten,
was bei einem Server-Neustart zu einem Logout führt –
für mein kleines Projekt akzeptabel.
Cookies sind sicher konfiguriert
(`HttpOnly`, `SameSite`, `Secure` in Produktion),
und ein CSRF-Schutz sichert Login- und Admin-Formulare ab.
Um Brute-Force-Attacken vorzubeugen,
habe ich ein einfaches IP-basiertes Rate Limiting implementiert.
Es ist nicht perfekt,
sollte für meine Zwecke aber ausreichen.

Der Build-Prozess ist bewusst schlank:
TypeScript wird mit `tsc` kompiliert,
Tailwind CSS über die CLI gebaut.
Die Artefakte werden mit `rsync` auf den Server übertragen,
mit einem automatischen Backup vor jedem Deploy.
Um CSS-Cache-Probleme zu vermeiden,
nutze ich Cache-Busting durch Versions-Hashes in den Dateinamen.
Das sorgt dafür,
dass Nutzer immer die aktuelle Version der Stylesheets laden,
ohne dass ich manuell eingreifen muss.

## Ausblick: Was kommt noch?

Das Projekt ist jetzt stabil, aber es gibt noch Ideen für die Zukunft.
Erst heute habe ich die RSS-Feed Funktion implementiert.
Eine Kommentarfunktion wäre auch spannend,
aber ich müsste entscheiden, wie ich das ohne großen Verwaltungsaufwand umsetze.
Von daher gibt es erst einmal keine Kommentare.
Wenn mir jemand etwas schreiben möchte,
gibt es genügend Möglichkeiten, dies zu tun.
Außerdem spiele ich mit dem Gedanken,
Beiträge nach Veröffentlichung automatisiert auch ins Fediverse zu pushen.

## Fazit

Aus einer kleinen Idee ist in kurzer Zeit ein stabiler,
sicherer Microblog geworden – bewusst schlank gebaut,
aber erweiterbar.
Hono, Eta und LowDB haben sich als hervorragende Kombi
für ein leichtgewichtiges Projekt erwiesen.
Die Entscheidung für Node.js und TypeScript
hat sich als pragmatisch und zukunftssicher herausgestellt.
Am meisten freut mich, dass ich jetzt eine Plattform habe,
die genau das tut, was ich wollte: kurze, fokussierte Inhalte teilen,
ohne Overhead und unabhängig von großen Anbietern.
Es war ein Lernprozess, aber jeder Schritt –
von den gescheiterten Bun-Experimenten
bis zur finalen Deploy-Strategie – hat sich gelohnt.
