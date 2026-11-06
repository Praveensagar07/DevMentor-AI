# DevMentor AI

A code-learning workspace for exploring repositories, reviewing security findings, and working through guided repairs.

**Live demo:** [devmentor-ai-lime.vercel.app](https://devmentor-ai-lime.vercel.app/)  
**API documentation:** [devmentor-ai-api.onrender.com/docs](https://devmentor-ai-api.onrender.com/docs)

This repository contains the complete frontend, backend, database migrations, educational fixtures, tests, and project documentation. Private credentials, installed dependencies, generated builds, and user workspaces are intentionally excluded.

## What is included

- React and TypeScript frontend with a light interface, illustrations, transitions, and optional interactive 3D architecture views.
- FastAPI backend with email/password sessions, user-scoped projects, repository import, static analysis, and learning workflows.
- PostgreSQL models and Alembic migrations, including Firebase identity fields.
- Firebase/Google authentication integration code and setup documentation.
- Reproduction, repair-verification, and challenge-grading implementation, with execution disabled in the hosted web service.
- Docker production files and environment-variable templates.

## Repository structure

```text
DevMentor-AI/
|-- frontend/
|   |-- src/              # Pages, components, API client, authentication
|   |-- public/           # Illustrations and static assets
|   |-- package.json
|   |-- package-lock.json
|   |-- .env.example
|   |-- vercel.json       # SPA route fallback
|   `-- Dockerfile
|-- backend/
|   |-- app/              # API routes, models, services, configuration
|   |-- alembic/          # Versioned database migrations
|   |-- fixtures/         # Educational and scanner test repositories
|   |-- tests/
|   |-- requirements.txt
|   |-- .env.example
|   `-- Dockerfile
|-- docs/                 # Architecture, API, Firebase, demo and test notes
|-- .env.production.example
|-- docker-compose.prod.yml
`-- .gitignore
```

## Run locally

Use Python 3.12 and Node.js 20, matching the Docker build configuration, plus a PostgreSQL database.

### 1. Clone the repository

```powershell
git clone https://github.com/Praveensagar07/DevMentor-AI.git
cd DevMentor-AI
```

### 2. Configure and start the backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `backend/.env` locally. Supply a PostgreSQL `DATABASE_URL`, your `GEMINI_API_KEY`, and a random `SECRET_KEY`. For example, generate the signing secret with:

```powershell
python -c "import secrets; print(secrets.token_hex(32))"
```

Keep `APP_ENV=development` for local development and `CODE_EXECUTION_ENABLED=false`. The default CORS list permits the local Vite origin. If overriding it, use a JSON array, for example `CORS_ORIGINS=["http://localhost:5173"]`.

Apply migrations to your intended database and start the API:

```powershell
python -m alembic upgrade head
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Local API documentation: <http://127.0.0.1:8000/docs>.

### 3. Start the frontend in another terminal

```powershell
cd frontend
npm ci
Copy-Item .env.example .env
npm run dev
```

Open the local URL printed by Vite. Its API proxy forwards `/api` requests to the local backend. Leave `VITE_API_BASE_URL` blank for that setup. For separate hosts, set it to the actual backend HTTPS origin before building.

### 4. Build or test

```powershell
# From frontend/
npm run build

# From backend/, with the virtual environment and test configuration ready
python -m pytest
```

Backend tests have their own configuration and fixtures; review them before running against any database. Historical test reports in `docs/` are not a claim that this checkout has just passed every test.

## Authentication

Email/password authentication works independently of Firebase. To enable Google sign-in, configure the intended Firebase web app, enable the Google provider, add the deployed frontend to authorized domains, and configure matching backend Firebase verification settings. Follow [the Firebase setup guide](docs/FIREBASE_SETUP_GUIDE.md).

Only Firebase web-app configuration belongs in `VITE_FIREBASE_*`. Never put Firebase Admin private keys, database credentials, JWT signing secrets, or Gemini API keys in frontend variables.

## Hosted deployment and limits

The published demo uses Vercel Hobby for the frontend, Render Free for the backend, and the existing Neon PostgreSQL database.

- **Code execution is disabled.** Reproduction, repair verification, and challenge grading require a separately isolated worker. The public API returns 503 for these execution actions, and the UI disables their controls.
- **Google sign-in is not configured in the demo.** Use email/password.
- **AI provider responses have not been verified.** The UI does not claim AI readiness.
- Render Free can sleep; waking the API can take 50 seconds or more. Its local repository/workspace files are ephemeral.
- The frontend was published through Vercel Drop and does not automatically deploy from Git. Render watches `deployment/submission-safe`; publishing this complete source on `main` does not change that branch.
- The dependency audit found unresolved advisory entries. Review and remediate them before treating this as a production-ready service.

For production, use `APP_ENV=production`, a unique strong `SECRET_KEY`, and `CORS_ORIGINS` as a JSON array containing exact HTTPS frontend origins. Keep `CODE_EXECUTION_ENABLED=false`. Store secrets in host environment settings. Never mount the host Docker socket into the public service. Review `.env.production.example` and `docker-compose.prod.yml` before using them.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [API reference](docs/API.md)
- [Firebase setup](docs/FIREBASE_SETUP_GUIDE.md)
- [Design decisions](docs/DECISIONS.md)
- [Demo walkthrough](docs/HACKATHON_DEMO.md)
- [Historical test report](docs/TEST_REPORT.md)
- [Historical project overview](docs/PROJECT_OVERVIEW.md)

## Secrets and educational fixtures

Copy only example environment files. Real `.env` files and common credential-file names are ignored by Git. Review staged changes before pushing. Fixtures intentionally contain vulnerable code and synthetic secret examples for scanner testing; never run untrusted repository code in the web process.
