# BMS Cars Rent — Frontend

Premium car rental web app built with **React + Vite**.  
Theme: **Black · Red · White**

---

## Quick Start

```bash
cd frontent
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Guest Booking System (No Registration Required)

BMS is designed so **any client can book a car without creating an account**.

### How It Works for Clients

| Step | Action | What they need |
|------|--------|----------------|
| 1 | Browse the fleet | Nothing — fully public |
| 2 | Choose a car | Click "Book Now" on any car card |
| 3 | Fill the booking form | Name · Phone · Email · Dates |
| 4 | Submit | No password, no account |
| 5 | Receive reference code | Sent to provided email |
| 6 | Track / Modify / Cancel | Use the reference code |

### Guest Booking Form Fields

```
Full Name       — required
Phone Number    — required
Email Address   — required (reference code sent here)
Pick-up Date    — required
Drop-off Date   — required
Pick-up City    — required
Car ID / Model  — pre-filled when booked from a card
Special Notes   — optional
```

### Reference Code

- Automatically generated (e.g. `BMS-2024-XK7T`)
- Sent to the client's email immediately after booking
- Used to:
  - **View** booking details
  - **Modify** pick-up/drop-off dates
  - **Cancel** the booking
  - **Check in** at the counter

### What Clients Do NOT Need

- No account creation
- No password
- No login
- No email verification before booking

### Data Stored for Guest Bookings

Only the minimum required for the rental:
- Name, phone, email
- Booking dates & car details
- Reference code

No marketing use, no account creation in the background.

---

## Project Structure

```
frontent/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / Navbar.css       — Fixed nav, mobile drawer
│   │   ├── Hero.jsx / Hero.css           — Animated hero + quick search bar
│   │   ├── Categories.jsx / .css         — Interactive category tabs
│   │   ├── Catalogue.jsx / .css          — Auto-scrolling horizontal fleet
│   │   ├── CarCard.jsx / .css            — Individual car card
│   │   ├── HowItWorks.jsx / .css         — 4-step process + guest callout
│   │   └── Footer.jsx / .css             — Links, contact, CTA
│   ├── data/
│   │   └── cars.js                       — Car & category data
│   ├── App.jsx                           — Root component
│   └── index.css                         — Global theme (BMS colors)
└── README.md
```

## Theme Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--red` | `#e01010` | Primary accent, CTAs, highlights |
| `--black` | `#0a0a0a` | Page background |
| `--black-soft` | `#111111` | Section alternating BG |
| `--black-card` | `#161616` | Card backgrounds |
| `--white` | `#ffffff` | Primary text |
| `--white-muted` | `#cccccc` | Secondary text |

## Animations

- **Hero**: floating car SVG, animated grid bg, red glow orbs, floating badges
- **Catalogue**: seamless auto-scroll (pauses on hover), filter chips
- **Categories**: tab switching with large emoji bg accent
- **Navbar**: scroll-triggered glass blur effect
- **Cards**: hover lift + red border glow
- **How It Works**: icon hover fills red with glow

## Dependencies

- `react` + `react-dom` — UI framework
- `react-router-dom` — Routing (ready for multi-page expansion)
- `lucide-react` — Icon set
- `vite` — Build tool
