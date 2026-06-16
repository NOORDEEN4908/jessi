# Jessica Wilson — Digital Marketing Portfolio

## Setup & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production
```bash
npm run build
```

## 📸 Adding Your Photo

In `src/App.jsx`, find the two placeholder sections:

**Hero Section** (~line 150):
```jsx
// Replace the <User> icon and text with:
<img 
  src="/your-photo.jpg" 
  alt="Jessica Wilson"
  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
/>
```

**About Section** (~line 220):
```jsx
// Replace the <User> icon and text with:
<img 
  src="/your-photo.jpg" 
  alt="Jessica Wilson"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```

Place your photo in the `/public` folder and reference it as `/your-photo.jpg`.

## Tech Stack
- React 18 + Vite
- Framer Motion (animations)
- Lucide React (icons)
- Google Fonts: Space Grotesk + Playfair Display
# jessi
