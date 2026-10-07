# Smart Pass frontend

Static HTML/CSS frontend for the Smart Pass API. Browser code is organized by
responsibility to mirror the backend's layered structure:

| Frontend | Backend equivalent | Responsibility |
|---|---|---|
| `src/config/` | `src/config/` | API configuration |
| `src/services/` | `src/services/` | HTTP requests and API operations |
| `src/pages/` | `src/controllers/` | Page-specific form and interaction logic |
| `src/utils/` | `src/utils/` | Shared session helpers |

## Run locally

1. Start the backend using the instructions in `../backend/README.md`.
2. From this directory, run `npm run dev` (or `python3 -m http.server 3000`).
3. Open <http://localhost:3000>.

The API defaults to `/api`. To override it, define
`window.SMARTPASS_API_URL` before the page's module script is loaded.

Create an account or log in before submitting a visit booking. The API's
`CLIENT_ORIGIN` setting should match the frontend origin (`http://localhost:3000`
for the local server above).
