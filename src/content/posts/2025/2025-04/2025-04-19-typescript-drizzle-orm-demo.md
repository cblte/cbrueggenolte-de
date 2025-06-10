---
title: "TypeScript Drizzle-ORM Demo"
description: "Ein entspannter Tag mit 3D-Druckprojekten und ersten Erfolgen beim Arbeiten mit Drizzle ORM für TypeScript."
pubDate: 2025-04-19
modDate: 2025-06-10
tags: [web-development]
---

Heute war ein entspannter Samstag. Ich habe mich wieder ans Bootcamp-Skript gesetzt und mich diesmal mit **Drizzle ORM** für TypeScript beschäftigt – ein echtes Vergnügen, damit Datenbankabfragen zu erstellen.

Entstanden ist dieses Repo: [https://github.com/cblte/drizzle-demo](https://github.com/cblte/drizzle-demo) – noch nicht perfekt, aber läuft schon richtig gut. Hier ein kurzer Auszug aus `index.ts`:

```ts
// Initialisierung
import { drizzle } from 'drizzle-orm/node-postgres';
import { users } from './drizzle/schema';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.POSTGRES_URL! });
const db = drizzle(pool, { schema: { users } });

// Beispiel: Benutzer abrufen
async function getUsers() {
  return await db.select().from(users).all();
}
getUsers().then(console.log);
```

Und das ist nur ein kleiner Teil – im Skript im Repo findest du komplette Beispiele für Delete, Insert, Update, Queries mit `eq/and/like`, Transaktionen und Fehlerbehandlung.

### Warum Drizzle so gut passt

* **Typensicherheit & schlanke API** – klare TS-Typen bei Schema & Abfragen
* **Leichtgewichtig & performant** – \~7 KB, tree‑shakeable, serverless-ready ([github.com][1], [orm.drizzle.team][2])
* **Migrationen & Studio** – mit `drizzle-kit` kannst du Migrations-Workflow und Drizzle Studio nutzen ([orm.drizzle.team][3])

Wenn du das Repo ausprobierst, würde mich interessieren:

* Klappt die Typ-Sicherheit für dich?
* Hast du eigene Erweiterungen oder Ideen?

Viel Spaß beim Ausprobieren – alles Wichtige steht im Repo. ;-)

[1]: https://github.com/drizzle-team/drizzle-orm "drizzle-team/drizzle-orm: Headless TypeScript ORM with a ... - GitHub"
[2]: https://orm.drizzle.team/drizzle-studio/overview "Meet Drizzle Studio"
[3]: https://orm.drizzle.team/docs/kit-overview "Migrations with Drizzle Kit"
