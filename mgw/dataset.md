# MGW Platform — Data Reference (dataset.md)

A comprehensive record of every data model, seed dataset, enum value, and
configuration used by the Mavin Grandpa Worldwide mentorship platform.

---

## 1. Users & Authentication

### User Object (runtime state — `App.jsx`)
Stored in React state only. No database is wired yet; auth is simulated.

| Field    | Type     | Description                                     |
|----------|----------|-------------------------------------------------|
| `name`   | `string` | Display name entered at registration            |
| `email`  | `string` | Email address used to log in                    |
| `plan`   | `Plan`   | The membership plan object the user selected    |
| `tier`   | `string` | Shorthand tier key — `"free"`, `"standard"`, `"premium"` |

### Admin Access
Admin mode is triggered by logging in with the hardcoded email `admin@mgw.com`.
This bypasses the user flow entirely and renders `AdminPage` directly.

---

## 2. Membership Plans

Three fixed plans, editable in the Admin → Plans panel.

| Field      | Type       | Description                                        |
|------------|------------|----------------------------------------------------|
| `name`     | `string`   | Plan display name                                  |
| `price`    | `string`   | Price string, e.g. `"$49"`                         |
| `billing`  | `string`   | Billing period label, e.g. `"per month"`           |
| `tier`     | `string`   | Machine key: `"free"`, `"standard"`, `"premium"`   |
| `features` | `string[]` | Bullet-point list of included benefits             |
| `color`    | `string`   | Hex colour used for plan theming in the UI         |
| `members`  | `number`   | Current member count (display only)                |

### Seed Data

| Name            | Price  | Billing    | Tier       | Members |
|-----------------|--------|------------|------------|---------|
| Open Access     | $0     | Free       | `free`     | 472     |
| Creative Circle | $49    | per month  | `standard` | 1 104   |
| Inner Circle    | $149   | per month  | `premium`  | 842     |

### Vault Access Mapping
| Plan name         | Vault access level |
|-------------------|--------------------|
| *(no plan / free)*| Free content only  |
| `Creative Circle` | Free + CC-gated    |
| `Inner Circle`    | All content        |

---

## 3. Sessions

Managed in `App.jsx` state and persisted to `localStorage` under the key
`mgw_sessions`.

### Session Object

| Field         | Type     | Description                                         |
|---------------|----------|-----------------------------------------------------|
| `id`          | `string` | Unique ID, e.g. `"s1"` or `"s${Date.now()}"`       |
| `title`       | `string` | Session name shown in listings                      |
| `type`        | `string` | One of: `1-on-1`, `Group`, `Masterclass`, `Intensive`, `Workshop` |
| `date`        | `string` | Display date string, e.g. `"Apr 10, 2026"`          |
| `time`        | `string` | Display time string, e.g. `"11:00 AM"`              |
| `price`       | `string` | Price string, e.g. `"$300"`                         |
| `status`      | `string` | One of: `Scheduled`, `Open`, `Full`, `Confirmed`, `In Progress`, `Cancelled` |
| `description` | `string` | Longer description shown in session detail view     |
| `zoom`        | `object\|null` | Zoom meeting data (see below), or `null`       |

### Zoom Sub-object (populated by backend on session creation)

| Field       | Type     | Description                         |
|-------------|----------|-------------------------------------|
| `meetingId` | `number` | Zoom meeting ID                     |
| `joinUrl`   | `string` | Participant join URL                |
| `startUrl`  | `string` | Host start URL                      |
| `password`  | `string` | Meeting passcode                    |
| `startTime` | `string` | ISO 8601 start time                 |

### Session Type → Duration Mapping (server-side)

| Type          | Duration (mins) |
|---------------|-----------------|
| `1-on-1`      | 90              |
| `Group`       | 120             |
| `Masterclass` | 90              |
| `Intensive`   | 240             |
| `Workshop`    | 180             |
| *(default)*   | 60              |

### Seed Sessions

| ID  | Title                              | Type        | Date         | Time      | Price   | Status    |
|-----|------------------------------------|-------------|--------------|-----------|---------|-----------|
| s1  | Creative Direction Deep Dive       | 1-on-1      | Apr 10, 2026 | 11:00 AM  | $300    | Scheduled |
| s2  | Founder's Circle — April Cohort    | Group       | Apr 14, 2026 | 3:00 PM   | $480    | Open      |
| s3  | Brand Architecture Intensive       | Intensive   | Apr 18, 2026 | 9:00 AM   | $2,500  | Full      |
| s4  | Creative Strategy Session          | 1-on-1      | Apr 22, 2026 | 2:00 PM   | $300    | Scheduled |
| s5  | Masterclass: Music Business 101    | Masterclass | Apr 28, 2026 | 6:00 PM   | $120    | Open      |

---

## 4. Bookings

Managed in `App.jsx` state and persisted to `localStorage` under the key
`mgw_bookings`.

### Booking Object

| Field         | Type     | Description                                                    |
|---------------|----------|----------------------------------------------------------------|
| `id`          | `string` | Auto-generated, e.g. `"BK-1712345678901"`                     |
| `type`        | `string` | Session type ID — `"1on1"` or `"group"`                       |
| `typeLabel`   | `string` | Human-readable label — `"1-on-1"` or `"Group"`                |
| `day`         | `number` | Day of April selected (1–30)                                   |
| `time`        | `string` | Selected time slot string, e.g. `"10:00 AM"`                  |
| `email`       | `string` | Booker's email address                                         |
| `userName`    | `string` | Booker display name (from user object or email fallback)       |
| `price`       | `string` | Formatted price string, e.g. `"$300 / 90 min"`                |
| `amountUSD`   | `number` | Raw price in USD (300 or 120)                                  |
| `paystackRef` | `string` | Paystack payment reference, e.g. `"MGW-SIM-…"`                |
| `status`      | `string` | One of: `Pending`, `Confirmed`, `Cancelled`, `Completed`       |
| `submittedAt` | `string` | ISO 8601 timestamp of when the booking was created             |
| `zoom`        | `object\|null` | Zoom meeting data, set by admin on confirmation           |

### Booking Session Types (from BookingPage)

| ID      | Label  | Price         | Amount (USD) | Duration   |
|---------|--------|---------------|--------------|------------|
| `1on1`  | 1-on-1 | $300 / 90 min | 300          | 90 minutes |
| `group` | Group  | $120 / 2 hrs  | 120          | 2 hours    |

---

## 5. Knowledge Vault Items

Managed in `App.jsx` state. Admins can add, edit, and delete items.

### Vault Item Object

| Field          | Type       | Description                                                  |
|----------------|------------|--------------------------------------------------------------|
| `id`           | `number`   | Unique integer ID                                            |
| `type`         | `string`   | Content type: `"video"`, `"audio"`, `"pdf"`                  |
| `title`        | `string`   | Content title                                                |
| `duration`     | `string`   | Runtime or page count, e.g. `"48 min"`, `"62 pages"`        |
| `accessPlans`  | `string[]` | Names of plans required; empty array = free/public           |
| `series`       | `string`   | Series name, or empty string if standalone                   |
| `seriesOrder`  | `number`   | Position in series (0 = not in a series)                     |
| `description`  | `string`   | Short description shown in the vault card                    |
| `bg`           | `number`   | Background style index (1–4) for the card visual             |
| `status`       | `string`   | `"Published"` or `"Draft"`                                   |
| `source`       | `string`   | Where the content is hosted: `"YouTube"`, `"Spotify"`, `"Server"` |
| `url`          | `string`   | Direct link to the content (may be empty in seed data)       |

### Seed Vault Items

| ID | Type  | Title                           | Access Plans                    | Series               |
|----|-------|---------------------------------|---------------------------------|----------------------|
| 1  | video | Creative Brief Masterclass      | *(free)*                        | Brand Foundations    |
| 2  | audio | Industry Conversations Vol. 3   | Inner Circle                    | Industry Conversations|
| 3  | video | The Brand Lens — Part 2         | *(free)*                        | Brand Foundations    |
| 4  | pdf   | Brand Strategy Framework        | Inner Circle                    | *(standalone)*       |
| 5  | video | Founder Mindset Intensive       | *(free)*                        | *(standalone)*       |
| 6  | audio | Industry Conversations Vol. 4   | Creative Circle, Inner Circle   | Industry Conversations|
| 7  | pdf   | Creative Direction Handbook     | Creative Circle, Inner Circle   | *(standalone)*       |
| 8  | video | Brand Positioning Secrets       | *(free)*                        | Brand Foundations    |

---

## 6. Booking Availability

### Available Days
Stored as a `Set<number>` — each value is a calendar day of April (1–30).

**Seed available days (April 2026):** 7, 8, 9, 10, 13, 14, 15, 17, 21, 22, 23, 24, 27, 28, 29, 30

### Time Slots

| Time     | Default Status |
|----------|----------------|
| 9:00 AM  | Booked         |
| 10:00 AM | Open           |
| 11:30 AM | Open           |
| 1:00 PM  | Booked         |
| 3:00 PM  | Open           |
| 4:30 PM  | Open           |

---

## 7. Announcements ("The Dispatch")

Managed in `App.jsx` state, editable in Admin → The Dispatch panel.

### Announcement Object

| Field       | Type      | Description                                        |
|-------------|-----------|----------------------------------------------------|
| `id`        | `number`  | Unique integer ID                                  |
| `title`     | `string`  | Short headline                                     |
| `text`      | `string`  | Body text; supports inline HTML `<strong>` tags    |
| `date`      | `string`  | Display date label, e.g. `"Posted 2 days ago"`     |
| `published` | `boolean` | If `true`, shown on the member dashboard            |

### Seed Announcement

| ID | Title                                        | Published |
|----|----------------------------------------------|-----------|
| 1  | Brand Architecture Masterclass — This Friday | true      |

---

## 8. Navigation Structure

### Public Tabs (always visible)
| ID        | Label    | Auth Required |
|-----------|----------|---------------|
| `about`   | MGW      | No            |
| `consult` | Consult  | No            |
| `sessions`| Sessions | No            |
| `booking` | Booking  | No            |
| `vault`   | Vault    | Yes           |

### Gated Pages (redirect to login if not authenticated)
`dashboard`, `vault`, `settings`, `profile`

### Admin Panel Sections
| ID            | Label        |
|---------------|--------------|
| `overview`    | Overview     |
| `bookings`    | Bookings     |
| `sessions`    | Sessions     |
| `programs`    | Programs     |
| `vault`       | Vault        |
| `plans`       | Plans        |
| `consultancy` | Consultancy  |
| `members`     | Members      |
| `announcements`| The Dispatch|

---

## 9. API Endpoints (Express Backend — port 3001)

| Method | Path                       | Description                            |
|--------|----------------------------|----------------------------------------|
| `POST` | `/api/zoom/create-meeting` | Creates a Zoom meeting via OAuth       |
| `GET`  | `/api/health`              | Returns server health + Zoom status    |

### POST `/api/zoom/create-meeting` — Request Body

| Field      | Type     | Description                      |
|------------|----------|----------------------------------|
| `title`    | `string` | Meeting topic                    |
| `date`     | `string` | Date string, e.g. `"Apr 10, 2026"` |
| `time`     | `string` | Time string, e.g. `"11:00 AM"`  |
| `duration` | `string` | Duration label (used as fallback)|
| `type`     | `string` | Session type for duration lookup |

### POST `/api/zoom/create-meeting` — Response Body

| Field       | Type     | Description               |
|-------------|----------|---------------------------|
| `meetingId` | `number` | Zoom meeting ID           |
| `joinUrl`   | `string` | Participant join URL      |
| `startUrl`  | `string` | Host start URL            |
| `password`  | `string` | Meeting passcode          |
| `startTime` | `string` | ISO 8601 confirmed start  |

---

## 10. Design Tokens

| Token        | Value                                  |
|--------------|----------------------------------------|
| Background   | `#0A0A0A`                              |
| Gold         | `#C9A227`                              |
| Gold Dim     | `#8a6d17`                              |
| Gold Light   | `#f0d078`                              |
| Purple       | `#6A38C2`                              |
| Blue         | `#00B3FF`                              |
| Text         | `#EAEAEA`                              |
| Text Dim     | `#999`                                 |
| Surface      | `#141414`                              |
| Surface 2    | `#1e1e1e`                              |
| Border       | `rgba(201,162,39,0.18)`                |
| Serif font   | `'Cormorant Garamond', Georgia, serif` |
| Sans font    | `'DM Sans', sans-serif`                |

---

## 11. Local Storage Keys

| Key            | Contents                          |
|----------------|-----------------------------------|
| `mgw_sessions` | JSON array of `Session` objects   |
| `mgw_bookings` | JSON array of `Booking` objects   |

---

## 12. Platform Stats (Admin Overview — seed/display values)

| Metric                | Value    |
|-----------------------|----------|
| Total Members         | 2,418    |
| Active Sessions       | 47       |
| Monthly Revenue       | $38.2K   |
| Consultancy Requests  | 12       |
| Revenue — Sessions    | $14.1K (37%) |
| Revenue — Memberships | $18.4K (48%) |
| Revenue — Consultancy | $5.7K (15%)  |
