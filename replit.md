# MGW Platform

## Overview
A mentorship and consulting platform for Mavin Grandpa Worldwide (MGW). Built as a React + Vite SPA with a dark luxury design using Royal Purple and Gold accents.

## Architecture
- **Framework**: React 18 + Vite 5
- **Location**: All source code lives under `mgw/`
- **Routing**: Tab-based state routing (no react-router-dom yet)
- **Styling**: Inline JS styles + CSS classes in `globals.css` for responsive behavior

## Pages
- `LandingPage` — Hero, stats, programs, vault preview, testimonials, CTA
- `DashboardPage` — Member dashboard with sessions, continue watching, announcements
- `VaultPage` — Filterable content grid (video, audio, PDF)
- `BookingPage` — Session type selector, calendar, time slots, booking summary
- `AuthPage` — Login, Register, Forgot Password

## Components
- `Navbar` — Sticky top nav; shows nav links inline on desktop (≥1024px), icon buttons only on mobile
- `Button` — `primary`, `ghost`, `danger` variants; `sm`, `md`, `lg`, `full` sizes

## Responsive Design
- Mobile-first (base styles via inline JS)
- Desktop breakpoint at **1024px** via CSS classes in `globals.css`
- Mobile: tab bar below navbar; Desktop: nav links embedded in navbar, tab bar hidden
- Key responsive classes: `mgw-hero`, `mgw-programs-scroll`, `mgw-vault-page-grid`, `mgw-dashboard-layout`, `mgw-booking-body`, `mgw-auth-wrapper`

## Design Tokens
- Gold: `#C9A227`
- Purple: `#6A38C2`
- Blue: `#00B3FF`
- Background: `#0A0A0A`
- Surface: `#141414`
- Serif font: Cormorant Garamond
- Sans font: DM Sans

## Running Locally
```bash
cd mgw && npm install && npm run dev
```
Server runs on port 5000.

## Workflow
Configured as "Start application" workflow running `cd mgw && npm install && npm run dev` on port 5000.
