# CS.E (Chai Sutta Or Engineering) Implementation Plan

Build a simple but scalable AI-powered web platform for engineering students with a Gen-Z + Professional hybrid vibe.

## User Review Required

Please review the proposed tech stack and architecture below. If anything needs adjustments (e.g., specific preferences for the database or styling nuances), let me know. 

## Proposed Architecture

### 1. Frontend (Next.js)
Path: `c:/Users/DELL/Downloads/Antigravity/chai_sutta_or_engineering/antigravity 1st/frontend/`

- **Framework**: Setup using Next.js (App Router), React, TypeScript, and TailwindCSS.
- **State & Theming**: Use Zustand for state management and localStorage for persisting the theme.
- **Animations**: Framer Motion for the initial load overlay, hero typing effect, drift section switching, and "Coming Soon" bounce animations.
- **Structure**:
  - `app/`: Pages (Home, etc.), Layouts.
  - `components/`: Navbar, Hero, DriftSection, FeatureBlocks, Community, Footer, ThemeSelector.
  - `store/`: Zustand theme store.
  - `lib/`: Utilities for Tailwind classes (e.g., `clsx`, `tailwind-merge`).

### 2. Backend (FastAPI)
Path: `c:/Users/DELL/Downloads/Antigravity/chai_sutta_or_engineering/antigravity 1st/backend/`

- **Framework**: FastAPI (Python 3.10+).
- **Database**: PostgreSQL (via SQLAlchemy) for scalable relational data.
- **Authentication**: JWT generation, Bcrypt password hashing.
- **Structure**:
  - `main.py`: Application entry point.
  - `routers/`: endpoints (`auth.py`, `dropout.py`, `themes.py`, `workspace.py`, `anonymous.py`).
  - `models/`: SQLAlchemy database models.
  - `schemas/`: Pydantic data validation schemas.
  - `core/`: Config (`settings.py`), Security (`jwt.py`), DB (`database.py`).
  - `ml/`: Dropout risk scoring logic (weighted scoring with future-ready stubs).

### 3. Deployment & DevOps
Path: `c:/Users/DELL/Downloads/Antigravity/chai_sutta_or_engineering/antigravity 1st/`

- **Docker**:
  - `frontend/Dockerfile`: Multi-stage build for Next.js.
  - `backend/Dockerfile`: Uvicorn/FastAPI setup.
  - `docker-compose.yml`: Services for `frontend`, `backend`, and `db` (Postgres).

## Verification Plan

### Automated Tests
- Fast build checks for Next.js (`npm run build`).
- Pytest standard checks for backend routes to ensure endpoints are returning 200 OK and valid JSON.

### Manual Verification
- Start all services using `docker-compose up`.
- Open browser and verify the "Choose Your Vibe" theme selector overlay appears on first load.
- Ensure state persists after page refresh.
- Check "Coming Soon" animations on buttons.
- Call the `/dropout-score` logic endpoint via Swagger UI (`/docs`) to test the scoring output.
