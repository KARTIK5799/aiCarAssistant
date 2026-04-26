# AI Car Advisor

A simple AI-powered web app that recommends the best cars for a user based on their **budget**, **primary usage**, and **family size** — tuned for the Indian car market.

The frontend collects three inputs, the backend builds a structured prompt, calls **Google Gemini** via the official SDK, and returns up to 3 hand-picked cars with a description, pros, and cons.

---

## Live demo

- **Frontend:** https://ai-car-assistant-pearl.vercel.app/
- **Backend:** https://aicarassistant.onrender.com
- **Health check:** [https://aicarassistant.onrender.com/ping](https://aicarassistant.onrender.com/ping)

> The backend is on Render's free tier and spins down after ~15 min of inactivity. The first request after a cold start can take ~50s — hit `/ping` once to wake it before using the app.

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 19 + Vite, Tailwind CSS v4, Axios |
| Backend | Node.js + Express 5 (ESM) |
| AI | Google Gemini (`gemini-2.5-flash`) via `@google/generative-ai` |
| Hosting | Vercel (frontend) + Render (backend) |

---

## Project structure

```
aiCarAssistant/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── api/api.js              # Axios wrapper for backend
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── AdvisorForm.jsx     # Budget / Usage / Family Size form
│   │   │   └── Carcard.jsx         # Recommendation card
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env                        # VITE_BACKEND_URL
├── server/                 # Express backend
│   ├── controllers/recommendedController.js
│   ├── routes/recommendedRoutes.js
│   ├── services/geminiService.js   # Gemini SDK wrapper + JSON schema
│   ├── utils/parseJSON.js
│   ├── index.js                    # Express entry
│   └── .env                        # GEMINI_API_KEY, PORT
├── PROCESS.md              # Goal, scope, system design notes
└── README.md
```

---

## Prerequisites

- **Node.js** ≥ 18 (Node 20+ recommended)
- **npm** (comes with Node)
- A **Google Gemini API key** — free at https://aistudio.google.com/app/apikey

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/KARTIK5799/aiCarAssistant.git
cd aiCarAssistant
```

### 2. Backend setup

```bash
cd server
npm install
```

Create `server/.env`:

```bash
GEMINI_API_KEY=your_actual_gemini_key_here
PORT=5000
```

Run the backend:

```bash
npm run dev      # uses nodemon, auto-reloads on save
# or
npm start        # plain node, for production
```

Server runs at **http://localhost:5000**. Verify it's up:

```bash
curl http://localhost:5000/ping
# → {"status":"alive","time":"2026-04-26T..."}
```

### 3. Frontend setup

In a new terminal:

```bash
cd client
npm install
```

Create `client/.env`:

```bash
VITE_BACKEND_URL=http://localhost:5000
```

> Vite only exposes env vars prefixed with `VITE_` to the browser. After changing `.env`, **restart the dev server** — Vite reads it once at startup.

Run the frontend:

```bash
npm run dev
```

App opens at **http://localhost:5173**.

---

## API reference

### `POST /api/recommend`

Returns up to 3 car recommendations.

**Request body:**

```json
{
  "budgetMin": 1000000,
  "budgetMax": 2000000,
  "usage": "City",
  "familyMembers": 4,
  "currency": "INR",
  "country": "India"
}
```

| Field | Type | Required | Default |
|---|---|---|---|
| `budgetMin` | number (≥ 0) | no | `0` |
| `budgetMax` | number (> budgetMin) | yes | — |
| `usage` | string (non-empty) | yes | — |
| `familyMembers` | integer (1–20) | yes | — |
| `currency` | string | no | `"INR"` |
| `country` | string | no | `"India"` |

**Successful response:**

```json
{
  "cars": [
    {
      "make": "Maruti Suzuki",
      "model": "Swift",
      "priceRangeLow": 650000,
      "priceRangeHigh": 950000,
      "currency": "INR",
      "bodyType": "Hatchback",
      "seatingCapacity": 5,
      "fuelType": "Petrol",
      "transmission": "Manual",
      "description": "Excellent fuel efficiency and low maintenance, perfect for daily city use.",
      "pros": [
        "Great mileage (22+ kmpl)",
        "Easy to park & maneuver",
        "Low service costs"
      ],
      "cons": [
        "Basic interior materials",
        "Limited boot space"
      ]
    }
  ]
}
```

**Errors:**

| Status | Body | Cause |
|---|---|---|
| 400 | `{"error":"budgetMax (positive number > budgetMin)..."}` | Validation failed |
| 429 | `{"error":"Too many requests..."}` | Rate limit (20/min/IP) hit |
| 500 | `{"error":"Failed to generate recommendations"}` | Gemini call failed — check server logs for `finishReason` / `parseJSON failed` lines |

### `GET /ping`

Health check. Returns `{ status, time }`.

---

## Deployment

### Backend → Render

1. **New Web Service** → connect this repo
2. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Singapore (closest to India)
3. **Environment Variables**: add `GEMINI_API_KEY` *(do not set `PORT` — Render injects it)*
4. Deploy

> Free tier spins down after 15 min of inactivity (~50s cold start). Either upgrade to Starter ($7/mo) or hit `/ping` from a free uptime monitor (e.g. UptimeRobot) every ~10 min to keep it warm.

### Frontend → Vercel

1. **Import Project** → select this repo
2. Settings:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite (auto-detected)
3. **Environment Variables**: add `VITE_BACKEND_URL` = your Render URL (e.g. `https://aicarassistant.onrender.com`)
4. Deploy

> If you change `VITE_BACKEND_URL` later, **redeploy** — Vite bakes env vars into the build.

---

## Environment variables

| File | Variable | Used by | Example |
|---|---|---|---|
| `server/.env` | `GEMINI_API_KEY` | Backend (Gemini SDK) | `AIza...` |
| `server/.env` | `PORT` | Backend | `5000` (locally), auto on Render |
| `client/.env` | `VITE_BACKEND_URL` | Frontend (Axios) | `http://localhost:5000` |

> Add `.env` to `.gitignore` in **both** `client/` and `server/` so keys never reach the repo.

---

## How the AI piece works

1. The user picks budget range, usage, and family size.
2. Frontend POSTs `{ budgetMin, budgetMax, usage, familyMembers }` to `/api/recommend`.
3. The Express controller validates input and builds a short user prompt.
4. The Gemini service combines that prompt with a baked-in **system instruction** (Indian market advisor persona) and calls the model with:
   - `responseMimeType: "application/json"` — guaranteed JSON output
   - `responseSchema` — guaranteed shape (no fence stripping needed)
   - `temperature: 0.5`, `maxOutputTokens: 8192` — sized for `gemini-2.5-flash`'s thinking budget so the JSON isn't truncated
   - 45-second timeout via `Promise.race`
5. Response is parsed and returned to the client; `Carcard` renders title, price range, description, pros, and cons.

---

## Common issues

| Symptom | Likely cause | Fix |
|---|---|---|
| Frontend `process is not defined` | Used `process.env.X` instead of `import.meta.env.VITE_X` | See [client/src/api/api.js](client/src/api/api.js) |
| 400 on `/api/recommend` | Sending old `budget` field, server expects `budgetMin`/`budgetMax` | Make sure both client and server are on the latest schema |
| 500 on `/api/recommend` | Missing/invalid `GEMINI_API_KEY` on the server | Check Render logs; add the key in Environment tab |
| UI shows "No matches found" but logs look fine | Gemini hit `MAX_TOKENS` mid-JSON (thinking ate the budget) — server logs print `finishReason=MAX_TOKENS` | Raise `maxOutputTokens` further or switch to `gemini-2.0-flash` (no thinking overhead) |
| `[404 Not Found] models/gemini-1.5-flash...` | Model retired by Google on `v1beta` | Already fixed — service uses `gemini-2.5-flash`. Pick a current model from `GET /v1beta/models` if needed |
| Render free tier cold start (~50s) | Free instance spun down | Upgrade to Starter, or ping every 10 min |
| CORS error from Vercel → Render | Origin restricted in `cors()` config | Server uses `cors()` (open) by default — fine |

---

## Scripts

### Server (`server/`)
- `npm run dev` — start with nodemon (auto-reload)
- `npm start` — start with plain node (production)

### Client (`client/`)
- `npm run dev` — Vite dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint

---

## License

ISC
