# Smart Pass frontend

React and TypeScript frontend for the Smart Pass API. The application is built
with Vite and organized by responsibility:

| Frontend | Responsibility |
|---|---|
| `src/components/` | Shared React components |
| `src/pages/` | Route-level screens |
| `src/config/` | API configuration |
| `src/services/` | Typed API requests |
| `src/utils/` | Shared session helpers |

## Run locally

1. Start the backend using the instructions in `../backend/README.md`.
2. From this directory, run `npm install`, then `npm run dev`.
3. Open the local URL printed by Vite (normally <http://localhost:5173>).

Run `npm run build` to type-check the application and create a production build
in `dist/`. Configure the API's `CLIENT_ORIGIN` to match the Vite origin for
local development. The API defaults to `/api`; to override it, set
`window.SMARTPASS_API_URL` before the application starts.

The client routes keep the previous `.html` paths working as aliases. Production
hosting should serve `index.html` as the fallback for application routes.
