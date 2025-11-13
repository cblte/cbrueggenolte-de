---
title: "Angular 20, New Naming Conventions & a Small VS Code Pitfall I Ran Into"
description: "A practical look at Angular 20’s new naming conventions and domain-driven folder structures — including a small VS Code pitfall I ran into after upgrading. This post walks through cleaner file names, modern project architecture, and why the updated Angular Language Service (20.3.3) matters for a smooth developer experience."
pubDate: 2025-11-13
modDate: 2025-11-13
tags: [Programmieren, Angular20, VSCode]
draft: false
---

Angular 20 has been out for a little while now,
and I am also still learning the new features and best practices.

With the release of Angular 20,
the developers introduced far more than the usual framework housekeeping.
The team has pushed a clear shift toward cleaner naming,
domain-oriented structures,
and generally more modern project organization.

I ran into this myself: after upgrading my tools to Angular 20,
and creating a new project with the Angular CLI,
I noticed something odd in VS Code.
VS Code suddenly stopped giving me any auto-completion in my HTML templates for the properties
and methods I had defined in the corresponding TypeScript files.
Even the usual “Go to Component” link disappeared.
In other words, the editor no longer understood that the .html and .ts files belonged together
— simply because the new naming scheme wasn’t recognized.

The cause was trivial: I was still using an older Angular Language Service extension.
If you're working in VS Code,
make sure you have Angular Language Service 20.3.3 or newer installed.
This version fully supports the new Angular 20 naming conventions and restores proper IntelliSense and navigation.

Once that’s sorted out, the auto-completion works perfectly again,
and you can fully embrace the new Angular 20 conventions.

## A Cleaner Naming Style

Angular 20 encourages developers to move away from the old pattern of stuffing the file type into every filename:

```
user-profile.component.ts
auth.service.ts
highlight.directive.ts
```

Instead, the focus shifts to meaningful, domain-oriented names:

```
user-profile.ts
auth-store.ts
auth-api.ts
highlight.ts
```

Some suffixes stay — mainly when they describe actual behavior or a contract:

```
auth-guard.ts
currency-pipe.ts
shared-module.ts
```

The idea is simple:
**name things by what they represent**, not by the Angular construct that happens to be inside.
It makes the codebase lighter and far more readable, especially at scale.

## A More Thoughtful Folder Structure

Angular 20 aligns even more strongly with domain-driven organization.
Instead of a “features” folder with a bit of everything, you structure your app by context.

A typical setup now looks like this:

```
src/
└── app/
    ├── core/
    ├── domains/
    └── shared/
```

### `core/` – Global Application Logic

Everything in `core` is app-wide but not business-specific:
authentication, layout scaffolding, error handling, configuration, etc.

Example:

```
core/
  auth/
    guards/
      auth-guard.ts
    stores/
      auth-store.ts
    pages/
      login/
        login.ts
        login.html
        login.css
```

Routed views sit cleanly in a `pages/` directory to keep navigation obvious and organized.

### `domains/` – Your Real Business Logic

Instead of a giant bucket of loosely grouped “features”, you split your app into business areas:

```
domains/
  jobs/
    pages/
    models/
    stores/
    services/
    jobs.routes.ts
  events/
  groups/
```

This structure scales much better and I think, for me as a new learner of Angular,
it makes the purpose of each folder much clearer.
Each domain can evolve at its own pace, and teams can work independently without stepping on each other.

### `shared/` – Reusable, Logic-Agnostic Parts

Everything here should be as dumb and reusable as possible:

```
shared/
  components/
    notification/
      notification.ts
      notification.html
      notification.css
  pipes/
    format-date-pipe.ts
  utils/
    string-utils.ts
```

A `notification` component, for example, shouldn’t care whether it shows a security alert or a success message from a completely different domain.

## Standalone Components Are the Default. Use That Momentum

Long time ago introduced, but still worth mentioning:

Since Angular 17, standalone components have been the default,
and Angular 20 continues down that path.
A typical modern setup looks like this:

```
app/
  app.ts
  app.routes.ts
  app.config.ts
```

There’s no need to introduce modules anymore unless you’re working on a specific compatibility case.
Most projects benefit immediately from reducing boilerplate and embracing standalone composition fully.

## Final Thoughts

Angular 20 feels like a deliberate step toward a cleaner,
more scalable architecture — not by enforcing rules,
but by making the modern approach the natural one.
If you update your tools (especially the language server),
the transition feels smooth and intuitive.

### A few key takeaways

* Use intentional file names instead of `.component.ts` or `.service.ts`.
* Organize your app by **domain**, not by Angular constructs.
* Keep shared pieces intentionally “dumb”.
* Embrace standalone components — the ecosystem is ready for it.

It’s a good moment to revisit an existing project,
tidy up long-standing naming clutter,
and adopt a clearer structure that will hold up over time.

Happy coding with Angular 20!
