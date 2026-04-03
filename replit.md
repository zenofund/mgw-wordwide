# MGW Platform

## Overview
A mentorship and consulting platform for Mavin Grandpa Worldwide (MGW). Built as a React + Vite SPA with a dark luxury design using Royal Purple and Gold accents.

## Architecture
- **Framework**: React 18 + Vite 5
- **Location**: All source code lives under `mgw/`
- **Routing**: Tab-based state routing (no react-router-dom yet)
- **Styling**: Inline JS styles + CSS classes in `globals.css` for responsive behavior
- **Backend**: Express server on port 3001 (Zoom API integration)

## Pages
- `LandingPage` — Hero, stats, programs, vault preview (clickable → navigates to vault page), testimonials, CTA
- `DashboardPage` — Member dashboard with sessions, continue watching, announcements
- `VaultPage` — Filterable content grid (video, audio, PDF) + detail player view
- `BookingPage` — Session type selector, calendar, time slots, booking summary, Paystack payment
- `SessionsPage` — Public-facing sessions browser: filter by status/type, per-session Book modal, feeds into shared bookings state; requires login to book
- `AuthPage` — Login, Register, Forgot Password
- `AdminPage` — Full admin panel with: Overview, Bookings (user requests), Sessions, Programs, Vault, Plans, Consultancy, Members, Announcements

## Components
- `Navbar` — Sticky top nav; shows nav links inline on desktop (≥1024px), icon buttons only on mobile
- `Footer` — Stylish minimal footer with brand info, nav links, membership plans, contact; shown across all main pages; inherits theme background
- `Button` — `primary`, `ghost`, `danger` variants; `sm`, `md`, `lg`, `full` sizes

## Key Features

### Vault Player Layout (Desktop)
- Player area shows: video/audio/pdf player + title + description below the player
- Right sidebar shows: content metadata (Type, Length, Access, Series) + Series Playlist
- On mobile: everything stacks vertically (player → title/desc → metadata/playlist)

### Booking + Paystack
- Users select session type, date, time → enter email (if not logged in) → pay via Paystack inline popup
- On successful payment, booking is submitted as a "Pending" request visible in Admin → Bookings
- Requires `VITE_PAYSTACK_PUBLIC_KEY` environment variable to be set

### Admin Bookings Management
- New "Bookings" sidebar section in Admin Panel
- Shows pending booking requests from users (with Paystack reference, date, time, session type)
- Admin can Accept (auto-creates Zoom meeting if credentials configured) or Decline each booking
- Pending count badge shown on sidebar nav item
- Admin-created sessions remain in the separate "Sessions" section

### Zoom Integration
- Zoom credentials: `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` env vars
- When admin accepts a booking, a Zoom meeting is automatically created
- Join link stored with booking and shown to admin

## Responsive Design
- Mobile-first (base styles via inline JS)
- Desktop breakpoint at **1024px** via CSS classes in `globals.css`
- Mobile: tab bar below navbar; Desktop: nav links embedded in navbar, tab bar hidden
- Key responsive classes: `mgw-hero`, `mgw-programs-scroll`, `mgw-vault-page-grid`, `mgw-dashboard-layout`, `mgw-booking-body`, `mgw-auth-wrapper`, `mgw-vault-detail-layout`, `mgw-vault-detail-main`, `mgw-vault-detail-sidebar`, `mgw-footer-grid`, `mgw-sessions-outer`, `mgw-sessions-grid`

## Design Tokens
- Gold: `#C9A227`
- Purple: `#6A38C2`
- Blue: `#00B3FF`
- Background: `#0A0A0A`
- Surface: `#141414`
- Serif font: Cormorant Garamond
- Sans font: DM Sans

## Environment Variables Required
- `VITE_PAYSTACK_PUBLIC_KEY` — Paystack public key for frontend payment popup
- `ZOOM_ACCOUNT_ID` — Zoom Server-to-Server OAuth account ID
- `ZOOM_CLIENT_ID` — Zoom OAuth client ID
- `ZOOM_CLIENT_SECRET` — Zoom OAuth client secret

## Running Locally
```bash
cd mgw && npm install && npm run dev
```
Server runs on port 5000 (frontend) and 3001 (backend API).

## Workflow
Configured as "Start application" workflow running `cd mgw && npm install && npm run dev` on port 5000.
