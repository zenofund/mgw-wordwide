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

---

## 13. Database Schema (PostgreSQL)

The schema below represents the full relational model for persisting all
platform data. Currently the app uses `localStorage` for sessions and bookings;
this schema is the target for a backend database migration.

---

### Table: `plans`

Stores the three membership tiers. Editable by admin.

```sql
CREATE TABLE plans (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(80)    NOT NULL UNIQUE,          -- "Inner Circle"
  price_cents INTEGER        NOT NULL DEFAULT 0,       -- 14900 = $149
  billing     VARCHAR(40)    NOT NULL DEFAULT 'Free',  -- "per month"
  tier        VARCHAR(20)    NOT NULL,                 -- 'free' | 'standard' | 'premium'
  features    TEXT[]         NOT NULL DEFAULT '{}',    -- bullet list
  color       VARCHAR(20)    NOT NULL DEFAULT '#555',  -- hex colour
  member_count INTEGER       NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Seed
INSERT INTO plans (name, price_cents, billing, tier, features, color, member_count) VALUES
  ('Open Access',      0,     'Free',      'free',     ARRAY['Community access','Monthly digest','Limited vault'],                                                                   '#555',    472),
  ('Creative Circle',  4900,  'per month', 'standard', ARRAY['Full vault access','2 group sessions/mo','Priority support','Community access'],                                       '#6A38C2', 1104),
  ('Inner Circle',     14900, 'per month', 'premium',  ARRAY['All Creative Circle perks','4 sessions/mo (1-on-1)','Direct messaging','Exclusive content','Event invitations'],      '#C9A227', 842);
```

---

### Table: `users`

One row per registered member. Admins are identified by role.

```sql
CREATE TABLE users (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR(120)  NOT NULL,
  email            VARCHAR(255)  NOT NULL UNIQUE,
  password_hash    VARCHAR(255)  NOT NULL,             -- bcrypt hash
  role             VARCHAR(20)   NOT NULL DEFAULT 'member', -- 'member' | 'admin'
  plan_id          INTEGER       REFERENCES plans(id) ON DELETE SET NULL,
  tier             VARCHAR(20)   NOT NULL DEFAULT 'free',
  avatar_url       TEXT,
  reset_token      VARCHAR(120),                       -- for password reset
  reset_expires_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_plan  ON users(plan_id);
```

---

### Table: `sessions`

Scheduled mentorship sessions, managed by admin.

```sql
CREATE TABLE sessions (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(200)   NOT NULL,
  type            VARCHAR(40)    NOT NULL,   -- '1-on-1' | 'Group' | 'Masterclass' | 'Intensive' | 'Workshop'
  session_date    DATE           NOT NULL,
  session_time    VARCHAR(20)    NOT NULL,   -- display string e.g. '11:00 AM'
  price_cents     INTEGER        NOT NULL DEFAULT 0,
  price_display   VARCHAR(20)    NOT NULL,   -- e.g. '$300'
  status          VARCHAR(30)    NOT NULL DEFAULT 'Scheduled', -- 'Scheduled' | 'Open' | 'Full' | 'Confirmed' | 'In Progress' | 'Cancelled'
  description     TEXT,
  zoom_meeting_id BIGINT,
  zoom_join_url   TEXT,
  zoom_start_url  TEXT,
  zoom_password   VARCHAR(40),
  zoom_start_time TIMESTAMPTZ,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_date   ON sessions(session_date);
CREATE INDEX idx_sessions_status ON sessions(status);
```

---

### Table: `bookings`

One row per booking request submitted via the Booking page.

```sql
CREATE TABLE bookings (
  id              SERIAL PRIMARY KEY,
  reference       VARCHAR(60)    NOT NULL UNIQUE,   -- 'BK-{timestamp}'
  user_id         INTEGER        REFERENCES users(id) ON DELETE SET NULL,
  user_name       VARCHAR(120),                     -- snapshot at booking time
  email           VARCHAR(255)   NOT NULL,
  session_type    VARCHAR(20)    NOT NULL,           -- '1on1' | 'group'
  session_label   VARCHAR(40)    NOT NULL,           -- '1-on-1' | 'Group'
  booking_date    DATE           NOT NULL,           -- selected April day → full date
  booking_time    VARCHAR(20)    NOT NULL,           -- e.g. '10:00 AM'
  price_cents     INTEGER        NOT NULL,
  price_display   VARCHAR(40)    NOT NULL,
  paystack_ref    VARCHAR(120),                      -- payment reference
  status          VARCHAR(30)    NOT NULL DEFAULT 'Pending', -- 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed'
  zoom_meeting_id BIGINT,
  zoom_join_url   TEXT,
  zoom_start_url  TEXT,
  zoom_password   VARCHAR(40),
  zoom_start_time TIMESTAMPTZ,
  submitted_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_user      ON bookings(user_id);
CREATE INDEX idx_bookings_status    ON bookings(status);
CREATE INDEX idx_bookings_reference ON bookings(reference);
```

---

### Table: `vault_items`

Knowledge Vault content library entries.

```sql
CREATE TABLE vault_items (
  id            SERIAL PRIMARY KEY,
  type          VARCHAR(20)   NOT NULL,   -- 'video' | 'audio' | 'pdf'
  title         VARCHAR(200)  NOT NULL,
  duration      VARCHAR(40),              -- '48 min' | '62 pages'
  access_plans  TEXT[]        NOT NULL DEFAULT '{}',  -- plan names; empty = free
  series        VARCHAR(120)  DEFAULT '',
  series_order  INTEGER       NOT NULL DEFAULT 0,
  description   TEXT,
  bg_index      SMALLINT      NOT NULL DEFAULT 1 CHECK (bg_index BETWEEN 1 AND 4),
  status        VARCHAR(20)   NOT NULL DEFAULT 'Draft',  -- 'Published' | 'Draft'
  source        VARCHAR(40)   NOT NULL DEFAULT 'Server', -- 'YouTube' | 'Spotify' | 'Server'
  url           TEXT          NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_vault_status ON vault_items(status);
CREATE INDEX idx_vault_type   ON vault_items(type);

-- Seed
INSERT INTO vault_items (type, title, duration, access_plans, series, series_order, description, bg_index, status, source) VALUES
  ('video', 'Creative Brief Masterclass',      '48 min',   '{}',                                    'Brand Foundations',      1, 'A deep dive into the fundamentals of creative briefing.', 1, 'Published', 'YouTube'),
  ('audio', 'Industry Conversations Vol. 3',   '1h 12m',   '{"Inner Circle"}',                      'Industry Conversations', 3, 'Candid conversations with top creatives across Africa.',   2, 'Published', 'Spotify'),
  ('video', 'The Brand Lens — Part 2',         '1h 20m',   '{}',                                    'Brand Foundations',      2, 'Exploration of brand perception and identity architecture.',3, 'Published', 'YouTube'),
  ('pdf',   'Brand Strategy Framework',        '62 pages', '{"Inner Circle"}',                      '',                       0, 'The complete MGW Brand Strategy Framework.',              4, 'Published', 'Server'),
  ('video', 'Founder Mindset Intensive',       '55 min',   '{}',                                    '',                       0, 'Mental models and habits of visionary founders.',          1, 'Published', 'YouTube'),
  ('audio', 'Industry Conversations Vol. 4',   '1h 5m',    '{"Creative Circle","Inner Circle"}',    'Industry Conversations', 4, 'Conversations shaping the African creative economy.',      2, 'Published', 'Spotify'),
  ('pdf',   'Creative Direction Handbook',     '48 pages', '{"Creative Circle","Inner Circle"}',    '',                       0, 'A reference for creative directors.',                     3, 'Published', 'Server'),
  ('video', 'Brand Positioning Secrets',       '1h 10m',   '{}',                                    'Brand Foundations',      3, 'How iconic brands carved inimitable market positions.',   4, 'Published', 'YouTube');
```

---

### Table: `availability_days`

Which calendar days are open for booking in a given month.

```sql
CREATE TABLE availability_days (
  id         SERIAL PRIMARY KEY,
  year       SMALLINT   NOT NULL,
  month      SMALLINT   NOT NULL,   -- 1–12
  day        SMALLINT   NOT NULL,   -- 1–31
  available  BOOLEAN    NOT NULL DEFAULT TRUE,
  UNIQUE (year, month, day)
);

CREATE INDEX idx_avail_ym ON availability_days(year, month);

-- Seed: April 2026
INSERT INTO availability_days (year, month, day, available)
SELECT 2026, 4, d, TRUE
FROM unnest(ARRAY[7,8,9,10,13,14,15,17,21,22,23,24,27,28,29,30]) AS d;
```

---

### Table: `time_slots`

Reusable daily time slots, toggled booked/open by admin.

```sql
CREATE TABLE time_slots (
  id         SERIAL PRIMARY KEY,
  slot_time  VARCHAR(20)  NOT NULL UNIQUE,  -- '10:00 AM'
  booked     BOOLEAN      NOT NULL DEFAULT FALSE,
  sort_order SMALLINT     NOT NULL DEFAULT 0
);

-- Seed
INSERT INTO time_slots (slot_time, booked, sort_order) VALUES
  ('9:00 AM',   TRUE,  1),
  ('10:00 AM',  FALSE, 2),
  ('11:30 AM',  FALSE, 3),
  ('1:00 PM',   TRUE,  4),
  ('3:00 PM',   FALSE, 5),
  ('4:30 PM',   FALSE, 6);
```

---

### Table: `announcements`

"The Dispatch" — platform-wide announcements shown on the member dashboard.

```sql
CREATE TABLE announcements (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(200)   NOT NULL,
  body         TEXT           NOT NULL,   -- may contain inline HTML (<strong>)
  display_date VARCHAR(60),               -- human label e.g. 'Posted 2 days ago'
  published    BOOLEAN        NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Seed
INSERT INTO announcements (title, body, display_date, published) VALUES
  (
    'Brand Architecture Masterclass — This Friday',
    'New masterclass dropping this Friday — <strong>Brand Architecture for the Digital Era</strong>.',
    'Posted 2 days ago',
    TRUE
  );
```

---

### Entity Relationship Summary

```
plans ──< users >──< bookings
                        │
sessions ───────────────┘  (session_type drives booking logic; no FK yet)

vault_items   (standalone; access_plans[] references plans.name)
availability_days  (standalone)
time_slots         (standalone)
announcements      (standalone)
```

### Key Constraints & Notes

- All monetary values are stored in **cents** (integer) to avoid floating-point rounding. Display strings (e.g. `"$300"`) are stored separately for convenience.
- `access_plans` on `vault_items` is a `TEXT[]` array matching `plans.name`. A proper normalised alternative would be a `vault_item_plans` join table.
- `bookings.zoom_*` columns mirror `sessions.zoom_*` — they are populated by the admin when a booking is confirmed and a Zoom meeting is created.
- `users.role = 'admin'` replaces the current hardcoded `admin@mgw.com` check.
