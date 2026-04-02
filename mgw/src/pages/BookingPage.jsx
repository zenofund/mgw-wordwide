import React, { useState } from 'react';
import Button from '../components/Button';

const s = {
  header: { padding: '22px 20px 16px', borderBottom: '0.5px solid rgba(201,162,39,0.18)' },
  title: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 500, marginBottom: 4 },
  subtitle: { fontSize: 11, color: '#999' },
  typesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    padding: '18px 20px',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
  },
  typeCard: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 8,
    padding: '16px 14px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  typeCardSelected: {
    borderColor: '#C9A227',
    background: 'rgba(201,162,39,0.06)',
  },
  typeIcon: {
    width: 36, height: 36,
    borderRadius: '50%',
    margin: '0 auto 10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16,
  },
  typeName: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 14, fontWeight: 500, marginBottom: 3 },
  typePrice: { fontSize: 10, color: '#C9A227', letterSpacing: '0.05em' },
  calSection: { padding: '18px 20px', borderBottom: '0.5px solid rgba(201,162,39,0.18)' },
  calMonthRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  calMonthName: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 16, fontWeight: 500 },
  calNav: { display: 'flex', gap: 10 },
  calNavBtn: {
    width: 26, height: 26,
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: '50%',
    background: '#141414',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  calDaysHeader: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 8 },
  calDayHd: { fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', padding: '4px 0' },
  calGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 },
  calDay: {
    aspectRatio: '1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, color: '#999', borderRadius: '50%', cursor: 'pointer',
    transition: 'all 0.15s',
    border: 'none', background: 'transparent', fontFamily: "'DM Sans', sans-serif",
  },
  calDayAvailable: { color: '#EAEAEA' },
  calDaySelected: { background: '#C9A227', color: '#0A0A0A', fontWeight: 500 },
  calDayToday: { border: '0.5px solid #C9A227', color: '#C9A227' },
  calDayDisabled: { opacity: 0.3, cursor: 'default' },
  slotsSection: { padding: '18px 20px', borderBottom: '0.5px solid rgba(201,162,39,0.18)' },
  slotsTitle: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 15, fontWeight: 500, marginBottom: 12 },
  slotsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 },
  slot: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 6,
    padding: '10px 6px',
    textAlign: 'center',
    fontSize: 11,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: "'DM Sans', sans-serif",
    color: '#EAEAEA',
  },
  slotSelected: { background: 'rgba(201,162,39,0.12)', borderColor: '#C9A227', color: '#C9A227' },
  slotBooked: { opacity: 0.35, cursor: 'default', textDecoration: 'line-through' },
  confirmSection: { padding: '18px 20px 28px' },
  summary: {
    background: '#141414',
    border: '0.5px solid rgba(201,162,39,0.18)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '6px 0',
    borderBottom: '0.5px solid rgba(201,162,39,0.18)',
    fontSize: 12,
  },
  summaryKey: { color: '#999' },
  summaryVal: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 13 },
  summaryTotal: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: '#C9A227' },
};

const SESSION_TYPES = [
  { id: '1on1', label: '1-on-1', price: '$300 / 90 min', iconBg: 'rgba(201,162,39,0.15)', icon: '◆' },
  { id: 'group', label: 'Group', price: '$120 / 2 hrs', iconBg: 'rgba(106,56,194,0.2)', icon: '◈' },
];

const CAL_DAYS = [
  { day: null }, { day: null }, { day: null },
  { day: 1, state: 'disabled' }, { day: 2, state: 'today' }, { day: 3, state: 'disabled' }, { day: 4, state: 'disabled' },
  { day: 5, state: 'disabled' }, { day: 6, state: 'disabled' }, { day: 7, state: 'available' }, { day: 8, state: 'available' },
  { day: 9, state: 'available' }, { day: 10, state: 'available' }, { day: 11, state: 'disabled' },
  { day: 12, state: 'disabled' }, { day: 13, state: 'available' }, { day: 14, state: 'available' },
  { day: 15, state: 'available' }, { day: 16, state: 'disabled' }, { day: 17, state: 'available' },
  { day: 18, state: 'disabled' }, { day: 19, state: 'disabled' }, { day: 20, state: 'disabled' },
  { day: 21, state: 'available' }, { day: 22, state: 'available' }, { day: 23, state: 'available' },
  { day: 24, state: 'available' }, { day: 25, state: 'disabled' }, { day: 26, state: 'disabled' },
  { day: 27, state: 'available' }, { day: 28, state: 'available' }, { day: 29, state: 'available' }, { day: 30, state: 'available' },
];

const TIME_SLOTS = [
  { time: '9:00 AM', booked: true },
  { time: '10:00 AM', booked: false },
  { time: '11:30 AM', booked: false },
  { time: '1:00 PM', booked: true },
  { time: '3:00 PM', booked: false },
  { time: '4:30 PM', booked: false },
];

const ChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
    <polyline points="15,18 9,12 15,6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

export default function BookingPage({ onConfirm }) {
  const [selectedType, setSelectedType] = useState('1on1');
  const [selectedDay, setSelectedDay] = useState(8);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const selectedTypeObj = SESSION_TYPES.find((t) => t.id === selectedType);

  const getDayStyle = (d) => {
    if (!d.day) return s.calDay;
    if (d.state === 'disabled') return { ...s.calDay, ...s.calDayDisabled };
    if (d.day === selectedDay) return { ...s.calDay, ...s.calDayAvailable, ...s.calDaySelected };
    if (d.state === 'today') return { ...s.calDay, ...s.calDayToday };
    return { ...s.calDay, ...s.calDayAvailable };
  };

  return (
    <div>
      <div style={s.header}>
        <div className="mgw-booking-title" style={s.title}>Book a Session</div>
        <div style={s.subtitle}>Select your mentorship type and preferred time.</div>
      </div>

      {/* Session Types — above the split layout */}
      <div className="mgw-booking-types" style={s.typesGrid}>
        {SESSION_TYPES.map((t) => (
          <div
            key={t.id}
            style={{ ...s.typeCard, ...(selectedType === t.id ? s.typeCardSelected : {}) }}
            onClick={() => setSelectedType(t.id)}
          >
            <div style={{ ...s.typeIcon, background: t.iconBg }}>{t.icon}</div>
            <div className="mgw-type-name" style={s.typeName}>{t.label}</div>
            <div className="mgw-type-price" style={s.typePrice}>{t.price}</div>
          </div>
        ))}
      </div>

      {/* Calendar + Slots — side by side on desktop */}
      <div className="mgw-booking-body">

        {/* Left: Calendar */}
        <div className="mgw-booking-left" style={s.calSection}>
          <div style={s.calMonthRow}>
            <div style={s.calMonthName}>April 2026</div>
            <div style={s.calNav}>
              <div style={s.calNavBtn}><ChevronLeft /></div>
              <div style={s.calNavBtn}><ChevronRight /></div>
            </div>
          </div>
          <div style={s.calDaysHeader}>
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
              <div key={d} style={s.calDayHd}>{d}</div>
            ))}
          </div>
          <div style={s.calGrid}>
            {CAL_DAYS.map((d, i) => (
              <button
                key={i}
                style={getDayStyle(d)}
                onClick={() => d.day && d.state !== 'disabled' && setSelectedDay(d.day)}
                disabled={!d.day || d.state === 'disabled'}
              >
                {d.day || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Time Slots + Confirm */}
        <div>
          <div style={s.slotsSection}>
            <div style={s.slotsTitle}>Available Times — April {selectedDay}</div>
            <div style={s.slotsGrid}>
              {TIME_SLOTS.map((sl) => (
                <button
                  key={sl.time}
                  style={{
                    ...s.slot,
                    ...(sl.booked ? s.slotBooked : {}),
                    ...(selectedTime === sl.time && !sl.booked ? s.slotSelected : {}),
                  }}
                  onClick={() => !sl.booked && setSelectedTime(sl.time)}
                  disabled={sl.booked}
                >
                  {sl.time}
                </button>
              ))}
            </div>
          </div>

          <div style={s.confirmSection}>
            <div style={s.summary}>
              {[
                { key: 'Type', val: selectedTypeObj?.label === '1-on-1' ? '1-on-1 Mentorship' : 'Group Cohort' },
                { key: 'Date', val: `Tuesday, April ${selectedDay}` },
                { key: 'Time', val: `${selectedTime} WAT` },
                { key: 'Duration', val: selectedType === '1on1' ? '90 minutes' : '2 hours' },
              ].map((row) => (
                <div key={row.key} style={s.summaryRow}>
                  <span style={s.summaryKey}>{row.key}</span>
                  <span className="mgw-summary-val" style={s.summaryVal}>{row.val}</span>
                </div>
              ))}
              <div style={{ ...s.summaryRow, borderBottom: 'none' }}>
                <span style={{ ...s.summaryKey, fontWeight: 500, color: '#EAEAEA', fontSize: 13 }}>Total</span>
                <span style={s.summaryTotal}>{selectedType === '1on1' ? '$300' : '$120'}</span>
              </div>
            </div>
            <Button
              variant="primary"
              size="full"
              onClick={() => onConfirm?.({ type: selectedType, day: selectedDay, time: selectedTime })}
            >
              Confirm &amp; Pay via Paystack
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
