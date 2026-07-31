# Task: get the app running under `/app/`

The app is "almost done": a small React frontend talking to a Flask
backend backed by SQLite. The problem is it only works if you squint. Your job is to get it
running properly behind nginx, served under the `/app/` base path, with accounts, sessions and
the todo list working end to end.

## Stack

| Part       | Tech                                | Lives in   |
| ---------- | ----------------------------------- | ---------- |
| Frontend   | Vite + React + TypeScript           | `frontend/`|
| Backend    | Flask + SQLite                      | `backend/` |
| Hosting    | nginx + docker compose              | `./`  |

## The app

- **Taskwise** — a tiny task tracker.
- Anyone can create an account and log in.
- Logged-in users can add, complete and delete **their own** todos.
- Todos are stored in a SQLite database and are expected to be **private per user**.

## Goal

When the app is deployed it must be reachable at:

```
http://localhost:8080/app/
```

and it must behave exactly like it does in local development:

- The page loads **with styles** (no missing assets).
- You can register, log in and log out; the session actually persists.
- You can add, complete and delete todos.
- Two different accounts **never** see or change each other's todos.
- The **network tab** shows no `404`s and no `CORS` errors.

Both the dev setup and the deployed setup should work.

## How to run it today

### Local development (backend)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend listens on `http://localhost:5000` and creates a `todos.db` file on first start.

### Local development (frontend)

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend dev server runs on `http://localhost:5173`.

### "Production" (what you're fixing)

The `docker-compose.yml` and `nginx.conf` in the repo root are empty stubs. You need to fill
them in so the built frontend is served under `/app/`, and API requests reach the backend.

## Symptoms you should see (all on purpose)

1. The page is unstyled or entirely blank under `/app/` — assets are 404ing.
2. The todo list can't load — the fetch to the backend is failing (CORS).
3. You log in successfully but are immediately treated as logged out (session cookie).
4. Some icons in the footer are missing.
5. In local dev everything appears to work.

## What is NOT broken

- The React components and the Flask endpoints themselves are correct.
- Don't rewrite the app, don't change the API contract.
- The task is about *configuration, deployment and session handling*, not feature work.

## Hints (read only if truly stuck)

- The browser's **Network tab** tells you the real story. Follow the failing requests.
- "Base path" is a thing: Vite builds to the root by default, and nginx has opinions about
  where files actually live on disk.
- CORS exists because the browser cares *which origin* a request came from. If you can make
  the browser request the same origin, CORS stops being a problem.
- Sessions use cookies. Browsers are picky about which cookies they store and send back.
- You may change `vite.config.ts`, `nginx.conf`, `docker-compose.yml`, backend session/CORS
  configuration, and any URLs in the frontend. You may NOT delete features or endpoints.

Good luck.
May the force be with you.