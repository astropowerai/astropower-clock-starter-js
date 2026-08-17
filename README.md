# AstroPower Clock — JavaScript Starter (Hackathon 2026)

Minimal JS starter for the **windows-only** `GET /api/v1/today` API. Works with Node 20+ or any browser.

## Quick start

```bash
npm install
cp .env.example .env
# edit .env -> ASTROPOWER_API_KEY=ASTROPOWER_HACK_xxx  (get at https://astropower.co.in/hackathon#register)
# or use demo-key-hackathon-2026 for quick testing
npm start
```

## What you get

- `index.js` — fetches `demo-delhi` + 4 other demo profiles, prints windows
- Handles `type: good|warn|bad|neutral` and `activity: career|wealth|relationship|spiritual|rest|caution`
- Caches by `date` — windows change once per day per profile

## API

```
GET https://astropower.co.in/api/v1/today?profile=demo-delhi&date=2026-05-18
Header: x-api-key: ASTROPOWER_API_KEY
Limits: 1000/day, 10/min
Demo profiles: demo-delhi, demo-mumbai, demo-indore, demo-bangalore, demo-kolkata
```

Example response:
```json
{
  "date": "2026-05-18",
  "timezone": "Asia/Kolkata",
  "profile": "demo-delhi",
  "windows": [
    { "id": "peak-shubh-01", "start": "09:20", "end": "11:10", "type": "good", "activity": "career", "badge": "PEAK" }
  ]
}
```

## Next steps

Build on top: day planner, send-later inbox, focus timer. Disclose AI use in README.
