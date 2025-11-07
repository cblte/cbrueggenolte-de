---
title: "Screenshots und Videos von einer Switch auf den Mac übertragen"
description: "Wie man Medieninhalte von der Nintendo Switch auf macOS überträgt und dabei typische Verbindungsprobleme umgeht."
pubDate: 2025-05-27
modDate: 2025-05-29
tags: [Tutorial, Switch, Mac, Transfer]
draft: false
---

Ich wollte kürzlich Screenshots und Videos von meiner Nintendo Switch auf meinen Mac übertragen –
was sich als überraschend schwierig herausstellte.
Die offizielle [Android File Transfer](https://android-file-transfer.macupdate.com)-App von Google wird nicht mehr unterstützt,
und Alternativen wie [OpenMTP](https://openmtp.ganeshrvel.com/)
oder [MacDroid](https://apps.apple.com/us/app/macdroid-manager-for-android/id1476545828?mt=12)
funktionierten bei mir anfangs nicht zuverlässig.

Nach dem Anschließen der Switch per USB-Kabel wurde das Gerät vom Mac entweder gar nicht erkannt
oder die Verbindung brach unmittelbar ab.
Selbst mit OpenMTP und MacDroid blieb der Zugriff auf den Album-Ordner der Switch zunächst verwehrt.

Die App [MacDroid](https://apps.apple.com/us/app/macdroid-manager-for-android/id1476545828?mt=12) aus dem Mac App Store
brachte dann den entscheidenden Hinweis.
Nach der Installation erkannte MacDroid die Switch,
jedoch blockierte ein Prozess namens `xxx.camerad` die Schnittstelle.
Nachdem ich QuickTime und andere potenziell störende Anwendungen geschlossen hatte,
funktionierte die Verbindung einwandfrei,
und der Zugriff auf den Album-Ordner war problemlos möglich.

Mit der nun funktionierenden Verbindung kann ich alle gespeicherten Medieninhalte der Switch direkt auf den Mac übertragen.
Das ist deutlich effizienter als die bisherige Methode über das begrenzte Ad-hoc-WLAN der Switch,
das nur den Transfer von maximal 10 Dateien gleichzeitig erlaubt
und häufig instabil ist.
