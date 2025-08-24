# Portfolio Starter (inspired by jommartinez.com)

A clean, fast, and accessible personal portfolio with hero, projects, about, and contact sections. Includes responsive layout, subtle animations, and a dark mode toggle with persisted preference.

## Preview

Open `index.html` directly in your browser, or run a simple static server:

```bash
cd /workspace
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Customize

- Update your name, bio, links, and email in `index.html`.
- Replace project cards in the "Selected work" section with your own.
- Tweak colors, spacing, and layout tokens in `styles.css`.
- The dark mode toggle persists preference via `localStorage`.

## Structure

- `index.html` – markup and sections
- `styles.css` – theming, layout, and animations
- `script.js` – theme toggle, nav, and reveal effects

## Notes

- No build step required. Pure HTML/CSS/JS.
- Uses system fonts for performance. You can add your own webfonts if desired.
