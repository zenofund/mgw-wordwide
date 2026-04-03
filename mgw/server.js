import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

async function getZoomAccessToken() {
  const accountId  = process.env.ZOOM_ACCOUNT_ID;
  const clientId   = process.env.ZOOM_CLIENT_ID;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET;

  if (!accountId || !clientId || !clientSecret) {
    throw new Error('Zoom credentials not configured. Set ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, and ZOOM_CLIENT_SECRET.');
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Zoom auth failed: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

app.post('/api/zoom/create-meeting', async (req, res) => {
  try {
    const { title, date, time, duration, type } = req.body;

    const accessToken = await getZoomAccessToken();

    const startDateTime = buildISODateTime(date, time);
    const durationMins  = parseDurationMins(duration, type);

    const meetingRes = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: title || 'MGW Mentorship Session',
        type: 2,
        start_time: startDateTime,
        duration: durationMins,
        timezone: 'Africa/Lagos',
        settings: {
          waiting_room: true,
          join_before_host: false,
          mute_upon_entry: true,
          auto_recording: 'none',
        },
      }),
    });

    if (!meetingRes.ok) {
      const err = await meetingRes.text();
      throw new Error(`Zoom meeting creation failed: ${err}`);
    }

    const meeting = await meetingRes.json();

    res.json({
      meetingId:   meeting.id,
      joinUrl:     meeting.join_url,
      startUrl:    meeting.start_url,
      password:    meeting.password,
      startTime:   meeting.start_time,
    });
  } catch (err) {
    console.error('[Zoom]', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (_req, res) => {
  const zoomReady = !!(process.env.ZOOM_ACCOUNT_ID && process.env.ZOOM_CLIENT_ID && process.env.ZOOM_CLIENT_SECRET);
  res.json({ status: 'ok', zoomConfigured: zoomReady });
});

function buildISODateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return new Date().toISOString();
  try {
    const months = { Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11 };
    const [mon, day, year] = dateStr.replace(',','').split(' ');
    const monthIdx = months[mon] ?? 3;
    const [timePart, period] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const d = new Date(Number(year) || 2026, monthIdx, Number(day) || 1, hours, minutes || 0);
    return d.toISOString().replace('.000Z', 'Z');
  } catch {
    return new Date().toISOString();
  }
}

function parseDurationMins(duration, type) {
  if (type === '1-on-1') return 90;
  if (type === 'Group')  return 120;
  if (type === 'Masterclass') return 90;
  if (type === 'Intensive') return 240;
  if (type === 'Workshop') return 180;
  return 60;
}

app.listen(PORT, () => {
  console.log(`MGW API server running on port ${PORT}`);
  const zoomReady = !!(process.env.ZOOM_ACCOUNT_ID && process.env.ZOOM_CLIENT_ID && process.env.ZOOM_CLIENT_SECRET);
  console.log(`Zoom integration: ${zoomReady ? '✓ configured' : '✗ credentials missing'}`);
});
