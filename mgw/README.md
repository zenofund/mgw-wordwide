# MGW Platform — React UI

**Mavin Grandpa Worldwide** — Mentorship & Consulting Platform

---

## Quick Start

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
src/
├── main.jsx                  # React entry point
├── App.jsx                   # Root app + routing state
│
├── styles/
│   ├── globals.css           # CSS reset + font imports
│   └── tokens.js             # Design tokens (colors, fonts)
│
├── components/
│   ├── Navbar.jsx            # Sticky top navigation bar
│   └── Button.jsx            # Reusable button (primary / ghost / danger)
│
└── pages/
    ├── LandingPage.jsx       # Public landing — hero, programs, vault preview, CTA
    ├── DashboardPage.jsx     # Member dashboard — sessions, content, announcements
    ├── VaultPage.jsx         # Knowledge vault — filterable content grid
    ├── BookingPage.jsx       # Session booking — type selector, calendar, time slots
    └── AuthPage.jsx          # Auth — Login / Register / Forgot Password (3-in-1)
```

---

## Page Props Reference

### `<LandingPage />`
| Prop | Type | Description |
|------|------|-------------|
| `onJoinMembership` | `() => void` | CTA — Join Membership button |
| `onBookSession` | `() => void` | CTA — Book Session button |
| `onBecomeMember` | `() => void` | CTA — Become a Member (footer) |

### `<DashboardPage />`
| Prop | Type | Description |
|------|------|-------------|
| `user` | `{ name: string }` | Logged-in user |
| `stats` | `Array<{ val, key }>` | Quick stats strip (3 items) |
| `sessions` | `Array<Session>` | Upcoming sessions list |
| `recentContent` | `Array<{ title, duration }>` | Continue watching rail |
| `announcement` | `{ text, date } \| null` | MGW pinned announcement |
| `onViewAllSessions` | `() => void` | "View all" sessions link |
| `onOpenVault` | `() => void` | "Vault" shortcut link |

### `<VaultPage />`
| Prop | Type | Description |
|------|------|-------------|
| `content` | `Array<VaultItem>` | Content items (defaults provided) |
| `onItemClick` | `(item) => void` | Open a content item |

**VaultItem shape:**
```js
{ id, type: 'video'|'audio'|'pdf', title, duration, locked: boolean, bg: 1|2|3|4 }
```

### `<BookingPage />`
| Prop | Type | Description |
|------|------|-------------|
| `onConfirm` | `({ type, day, time }) => void` | Fires on "Confirm & Pay" |

> Integrate Paystack in the `onConfirm` handler using `@paystack/inline-js`.

### `<AuthPage />`
| Prop | Type | Description |
|------|------|-------------|
| `initialView` | `'login' \| 'register' \| 'forgot'` | Starting view |
| `onLogin` | `(credentials) => void` | Login form submit |
| `onRegister` | `(data) => void` | Register form submit |
| `onForgotPassword` | `(email) => void` | Forgot password submit |

### `<Navbar />`
| Prop | Type | Description |
|------|------|-------------|
| `onSearchClick` | `() => void` | Search icon |
| `onNotificationsClick` | `() => void` | Bell icon |
| `onProfileClick` | `() => void` | Profile icon |

### `<Button />`
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Padding/width preset |
| `onClick` | `() => void` | — | Click handler |
| `disabled` | `boolean` | `false` | Disabled state |

---

## Design System

| Token | Value |
|-------|-------|
| Background | `#0A0A0A` |
| Gold accent | `#C9A227` |
| Royal Purple | `#6A38C2` |
| Electric Blue | `#00B3FF` |
| Text | `#EAEAEA` |
| Muted text | `#999` |
| Surface | `#141414` |
| Border | `rgba(201,162,39,0.18)` |
| Serif font | Cormorant Garamond |
| Sans font | DM Sans |

---

## Paystack Integration

Install:
```bash
npm install @paystack/inline-js
```

In `BookingPage.jsx` `onConfirm` handler:
```js
import PaystackPop from '@paystack/inline-js';

const paystack = new PaystackPop();
paystack.newTransaction({
  key: 'pk_live_YOUR_PUBLIC_KEY',
  email: user.email,
  amount: 30000, // kobo — $300 = 30000 if NGN, adjust for USD
  currency: 'USD',
  onSuccess: (transaction) => { /* save booking */ },
  onCancel: () => { /* handle cancel */ },
});
```

---

## Next Steps

- Add React Router (`react-router-dom`) and replace tab state with real routes
- Connect to Laravel API (see backend spec) using `axios` or `fetch`
- Add `react-query` or SWR for server state management
- Implement real MGW portrait in `LandingPage` hero (replace silhouette div with `<img>`)
- Add Cloudflare R2 / S3 signed URLs for video/audio playback in `VaultPage`
