# CodeForge UI

Professional dark/neon coding-platform UI matching the generated CodeForge mockups.

## Install

```bash
npm install
npm run dev
```

## Backend

The frontend expects FastAPI at:

`http://127.0.0.1:8000`

The included `src/api.js` connects to the existing CodeForge backend endpoints:
- GET /problem
- GET /problem/{id}
- POST /login
- POST /register
- GET /profile
- POST /execute

## UI libraries
- React
- React Router
- Monaco Editor
- Anime.js
- Lucide React

## Pages
- Home
- Problems
- Problem / Online Judge
- Submission Result
- Profile
- Login
- Register
