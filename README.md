# ISET Radès — Training Sessions Management

<!-- Badges: add CI / license badges once a pipeline and a LICENSE file exist. -->

An Angular 21 single-page application to manage training courses, training sessions and registrations for ISET Radès. A public area lets visitors browse courses and register for a session; an admin area manages trainers, courses and sessions. Data is kept in memory (RxJS `BehaviorSubject`), there is no backend.

## Main features

**Public area**

- Home page (`/accueil`) presenting the training programme.
- Course list (`/formations`) with keyword search.
- Course details (`/formations/:id`): title, description, workload in hours, list of sessions with trainers and dates, remaining seats.
- Registration form (`/inscription/:sessionId`): last name, first name, e-mail, with validation; the registration button is disabled when a session is full (15 candidates max).

**Admin area** (`/admin-space`, no authentication)

- Trainer management (`/admin-space/formateurs`): create, read, update, delete.
- Course and session management (`/admin-space/formations-sessions`): CRUD on courses and sessions, list of registered candidates per session.

**Technical**

- Standalone components, Angular Router with route parameters.
- Reactive Forms with validation and error messages.
- Services exposing RxJS Observables (`BehaviorSubject`) as an in-memory store.
- Sample data: courses, sessions, trainers and registrations.

## Screenshots / demo

> To be completed: add screenshots of the home page, course list, course details, registration form and admin pages, for example in `./docs/screenshots/`.

```markdown
![Course list](./docs/screenshots/formations.png)
```

## Prerequisites

- **Node.js** compatible with Angular 21 (see the [Angular version compatibility table](https://angular.dev/reference/versions))
- **npm 10** (`"packageManager": "npm@10.9.3"` in `package.json`)
- *(optional)* Angular CLI 21 installed globally (`npm install -g @angular/cli`); otherwise use the npm scripts

## Installation

```bash
git clone https://github.com/nour-agrebi-web/Session-de-Formation.git
cd Session-de-Formation
npm install
```

## Configuration / environment variables

None. The application has no environment files and no API: all data is defined in the services under `src/app/services/`.

## Running the project

```bash
npm start
```

Open <http://localhost:4200/>. The application reloads automatically when source files change.

Production build (output in `dist/`):

```bash
npm run build
```

Watch build in development mode:

```bash
npm run watch
```

## Usage

| Route | Component | Description |
| --- | --- | --- |
| `/` | — | Redirects to `/accueil` |
| `/accueil` | `AccueilComponent` | Home page |
| `/formations` | `FormationsComponent` | Course list and search |
| `/formations/:id` | `FormationsDetailComponent` | Course details and sessions |
| `/inscription/:sessionId` | `InscriptionComponent` | Registration form |
| `/admin-space` | `AdminComponent` | Admin home |
| `/admin-space/formateurs` | `AdminFormateursComponent` | Trainer management |
| `/admin-space/formations-sessions` | `AdminFormationsSessionsComponent` | Course and session management |

Data is reset each time the page is reloaded.

## Tests

The project uses Vitest (with jsdom) through the Angular CLI:

```bash
npm test
```

Each component has a `*.spec.ts` file.

## Project structure

```text
Session-de-Formation/
├── angular.json
├── package.json
├── IMPLEMENTATION_GUIDE.md          # functional and technical guide (in French)
├── public/
└── src/
    ├── index.html, main.ts, styles.css
    ├── assets/logo.jpeg
    └── app/
        ├── app.ts, app.html, app.routes.ts, app.config.ts
        ├── models/                  # Formation, Session, Formateur, Inscription interfaces
        ├── services/                # formations, sessions, formateurs, inscriptions services
        ├── navbar/
        ├── accueil/
        ├── formations/
        ├── formations-detail/
        ├── inscription/
        ├── admin/
        ├── admin-formateurs/
        └── admin-formations-sessions/
```

## Technologies

- Angular 21 (standalone components, Router, Reactive Forms)
- TypeScript 5.9
- RxJS 7.8
- Vitest 4 + jsdom
- Prettier configuration in `package.json`

## Deployment

The output of `npm run build` in `dist/` is a static site that can be served by any static web server.

> To be completed: no hosting target is configured.

## Contributing

> To be completed: no contribution guidelines exist.

## License

> To be completed: no `LICENSE` file is present.

## Authors / contacts

- Repository owner: [@nour-agrebi-web](https://github.com/nour-agrebi-web)

> To be completed: full names, course and academic year.

## Useful resources

- [Implementation guide](./IMPLEMENTATION_GUIDE.md) (in French)
- [Angular documentation](https://angular.dev/)
- [Angular CLI reference](https://angular.dev/tools/cli)
- [RxJS](https://rxjs.dev/)

## Notes to complete

- The admin area has no authentication.
- Data is only stored in memory; there is no backend or persistence.
- The "download programme (PDF)" action is a placeholder.
- No screenshots, deployment target, contribution guide or `LICENSE` file.
