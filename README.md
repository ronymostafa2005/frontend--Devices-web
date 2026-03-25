# Modern Devices — Frontend

Vite + React storefront for the **Modern Devices** demo: glass UI, product catalog, cart, auth, and About scene (React Three Fiber).

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Environment

Create `.env` in this folder (not committed):

```env
VITE_API_URL=http://localhost:8000
```

Point `VITE_API_URL` at your running [backend API](https://github.com/ronymostafa2005/backend--Devices-web).

## Stack

- React 19, React Router, TanStack Query, Axios  
- Tailwind CSS, GSAP, react-hot-toast  
- Three.js via `@react-three/fiber` + `@react-three/drei` (About page)
