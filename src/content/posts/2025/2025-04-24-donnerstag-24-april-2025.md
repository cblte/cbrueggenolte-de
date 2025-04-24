---
title: "Donnerstag, 24. April 2025"
description: "ChatGPT, SonarQube Sonar Tools und Datenübersichten aus JSON mit JavaScript"
pubDate: 2025-04-24
modDate: 2025-04-24
tags: [journal, chatgpt, sonarqube, javascript, tailwindcss]
---

**Wetter:** Den Haag:️ 🌦 Nieselregen, 🌡️ +12 °C (+10 °C), 🌬️↓19 km/h

Gestern und heute habe ich mit Hilfe von ChatGPT vier neue Datenübersichten erstellt.
Da wir eine Übersicht der verwendeten Programmiersprachen pro Projekt und App aus SonarQube haben wollten,
habe ich mich mit den [Sonar-Tools](https://github.com/okorach/sonar-tools) beschäftigt
um die erforderlichen Daten über die API abzurufen.

In kleinem Umfang machen wir das zwar schon seit ein paar Monaten,
bisher allerdings nur mit den „Non-Commented Lines of Code“.
Eine Übersicht der Lines of Code pro Programmiersprache, Projekt und App
hat bisher jedoch noch gefehlt.

Da ich alle Daten im JSON-Format vorliegen hatte,
habe ich zunächst eine neue HTML-Datei mit Platzhaltern
und eine JSON-Datei mit Demo-Daten erstellt.
Beides habe ich dann ChatGPT gegeben
und innerhalb kürzester Zeit mit dem passenden Prompt eine fast fertige Lösung in JavaScript erhalten.

Die Liste der vorhandenen Datendateien wird jetzt aus einer Textdatei gelesen
und in einem Dropdown-Menü angezeigt.
Bei Auswahl wird die entsprechende JSON-Datei geladen,
eine Tabelle erzeugt und mit Werten befüllt.
Zusätzlich wird ein Diagramm mit [ChartJS](https://chartjs.org) erstellt.

Nach knapp einer Stunde und ein wenig Feintuning war die erste Version fertig – das ging wirklich gut und schnell.
Aber wie so häufig: Wenn man einmal angefangen hat, entdeckt man hier und da noch neue Kleinigkeiten, die man verbessern möchte.

Also habe ich angefangen, die Dokumentation von ChartJS zu lesen und mir ein paar Beispiele anzusehen,
um besser zu verstehen, wozu das Tool in der Lage ist.
Damit fiel es mir leicht, passende Prompts zu formulieren und ChatGPT gezielt um Hilfe zu bitten.

Da ich noch drei weitere Datenübersichten erstellen sollte,
habe ich die erste Lösung überarbeitet,
mit Kommentaren versehen,
um Filter ergänzt
und alles mit TailwindCSS schön gestaltet.

Wobei ChatGPT besonders gut geholfen hat, war beim Umsortieren und Umstrukturieren der Daten.
Eine Datei enthält die Liste aller Applikationen.
Dann gibt es eine Datei pro Applikation mit den Namen der dazugehörigen Projekte (aka Repositories),
und eine große Datei mit den Metriken.

Die große Aufgabe bestand nun darin, das Ganze so hin und herzuschieben und zu kombinieren,
dass man auf der Webseite einen Monat auswählen kann,
dann eine Liste der Applikationen bekommt
und nach Auswahl der App die Statistiken und Metriken dieser angezeigt werden.

Auch beim Hinzufügen von TailwindCSS hat ChatGPT sehr geholfen.
Ebenso bei der Erstellung eines Textfeldes, das beim Eintippen der ersten Buchstaben
die Liste der Projekte filtert, die ich in meine Datenauswertung mit einbeziehen möchte.
Mit passenden Vorgaben ersparte mir das viel Zeit und Tipperei.

Alles in allem war es eine sehr gute Erfahrung, und ich bin mit dem Ergebnis sehr zufrieden.

Morgen muss ich noch die automatische Datenabfrage umschreiben,
da ich die Ordnerstruktur geändert habe.
Das wird aber hoffentlich nicht viel Zeit in Anspruch nehmen –
ich habe ja auch noch ein paar andere Ideen, die ich gerne umsetzen möchte.
