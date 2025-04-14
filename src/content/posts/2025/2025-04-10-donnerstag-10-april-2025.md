---
title: "Donnerstag, 10. April 2025"
description: "Ein turbulenter Tag voller Zollchaos, auffälliger Börsenbewegungen, KI-Video-Spaß und kleiner Programmiererfolge im Hintergrund."
pubDate: 2025-04-10
modDate: 2025-04-10
tags: [journal, trump, stock]
---

Heute ging es ziemlich chaotisch zu, was die neuen Zölle betrifft.
Zuerst schockierte Trump die Welt mit der Einführung zahlreicher neuer Zölle –
mit eher willkürlich wirkenden, erfundenen Zahlen.
Und plötzlich setzt er die Zölle für Europa für 90 Tage aus.
Diese Pause gilt aber nicht für China, wo die Zölle nun auf 125 Prozent steigen.
Arme chinesische Bevölkerung.

Besonders interessant:
Noch bevor die neuen Zölle angekündigt wurden,
hat Trump den Verkauf seiner TMTG-Aktien freigegeben ([futurism.com](https://futurism.com/truth-social-stock-tariffs)).
Weniger als vier Stunden vor der Ankündigung der Zollpause schrieb er auf TruthSocial,
dass jetzt ein großartiger Zeitpunkt zum Aktienkauf sei ([apnews](https://apnews.com/article/trump-truth-social-djt-tesla-musk-tariffs-pause-fccfa6b06c8f1ec0cd7844641ca52669)).
Klingt ziemlich stark nach Insiderhandel, oder?

Neben all dem politischen Trubel habe ich heute noch den YouTube-Kanal von [demonflyingfox](https://www.youtube.com/@demonflyingfox) entdeckt.
Er erstellt richtig lustige KI-generierte Videos mit bekannten Figuren
wie Harry Potter, Super Mario oder Futurama.
Das Video [Democratic Penguins Republic](https://www.yout-ube.com/watch?v=HJ8qGOe2K0o)
ist definitiv ein weiterer Beweis (#6174295380),
dass generative KI gekommen ist, um zu bleiben.

Technisch lief heute auch einiges im Hintergrund:
Ich habe eine Möglichkeit eingebaut,
Entwürfe von Blogposts automatisch auszublenden,
bis sie wirklich bereit zur Veröffentlichung sind.
Über die Umgebungsvariable `import.meta.env.PROD`
filtert die Seite nun alle als Entwurf markierten Beiträge.
Einfach und zuverlässig.

Außerdem habe ich noch einen kleinen Bug im Tag-Loop behoben:
Wenn im Frontmatter zwar `tags` angegeben waren,
aber keine Tags gelistet wurden, lief die Ausgabe vorher schief.
Jetzt passt alles wieder.
