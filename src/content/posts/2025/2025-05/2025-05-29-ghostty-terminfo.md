---
title: "Ghostty Terminfo Warnmeldung beheben"
description: "Behebung des Terminfo-Problems mit Ghostty auf Uberspace 7"
pubDate: 2025-05-29
modDate: 2025-05-29
tags: [terminal, ghostty, uberspace, tutorial]
---

[Ghostty](https://ghostty.org/)) ist ein tolles Terminal.
Allerdings wird auf [Uberspace](https://uberspace.de) 7 der Terminaltyp `xterm-ghostty` noch nicht unterstützt.
Das liegt an einer veralteten ncurses-Version (ich vermute Version 5.4).
Erst ab `ncurses 6.5-20241228` ist die `xterm-ghostty` Terminfo verfügbar.

Da ich gerne die [Fish](https://fishshell.com/) Shell benutze,
habe ich bei jedem Login die folgende Warnmeldung gesehen:

```shell
fish
warning: Konnte das Terminal nicht einrichten
warning: TERM-Umgebungsvariable auf 'xterm-ghostty' gesetzt.
warning: Überprüfe, ob dieser Terminaltyp auf diesem System unterstützt wird.
warning: Nutze Rückfallterminaltyp 'xterm-256color'.
Willkommen zu fish, der freundlichen interaktiven Shell
Type help for instructions on how to use fish
```

Das ist auf Dauer störend.

Glücklicherweise bietet Ghostty unter <https://ghostty.org/docs/help/terminfo> eine Anleitung zur Behebung dieses Problems.

Bei mir hat folgender Befehl das Problem gelöst:

```shell
infocmp -x xterm-ghostty | ssh UBERSPACE-SERVER -- tic -x -
```

Dieser Befehl exportiert die Terminfo-Definition von meinem lokalen System
und installiert sie auf dem Uberspace-Server.
Natürlich muss `UBERSPACE-SERVER` durch den eigenen Servernamen ersetzt werden
(z.B. `username@server.uberspace.de`).

Wenn ich mich jetzt einlogge und die Fish-Shell starte,
erscheint keine Fehlermeldung mehr
und alles funktioniert wie erwartet.
