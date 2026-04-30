---
name: dental-clinic-builder
description: >
  Builds a complete Dental Clinic AI Receptionist system — a Node.js + Express backend
  that integrates Vapi (voice agent), Google Calendar (scheduling), Twilio (WhatsApp/SMS),
  and Google Sheets (logging). Use this skill when building, extending, debugging, or
  deploying any part of the dental clinic AI agent backend.
version: 1.0.0
---

# Dental Clinic AI Agent Builder

Reference the full PRD at `project_docs/prd.md` for detailed specs, prompts, and templates.

---

## Project Overview

Build an AI-powered dental clinic receptionist that:
1. Answers phone calls 24/7 via **Vapi** voice agent
2. Books, cancels, and reschedules appointments in **Google Calendar**
3. Sends confirmations, reminders, and review requests via **Twilio** (WhatsApp/SMS)
4. Logs all activity to **Google Sheets**
5. Provides a simple admin **dashboard**

**Stack:** Node.js · Express · Google Calendar API · Twilio · Google Sheets API · node-cron

---

## Folder Structure

Always follow this structure:

```
dental-clinic/
├── config/
│   └── index.js              # centralised env/config loader
├── routes/
│   ├── appointments.js        # /check-availability, /book, /cancel, /reschedule
│   ├── webhook.js             # /vapi-webhook
│   └── dashboard.js           # GET /dashboard
├── services/
│   ├── calendar.js            # Google Calendar API helpers
│   ├── sheets.js              # Google Sheets API helpers
│   ├── twilio.js              # Twilio WhatsApp/SMS sender
│   └── scheduler.js           # node-cron reminder jobs
├── templates/
│   └── messages.js            # All WhatsApp message templates
├── utils/
│   ├── logger.js              # Request logging with timestamps
│   └── validators.js          # Input validation helpers
├── views/
│   └── dashboard.html         # Single-page admin dashboard
├── .env.example
├── server.js                  # Express app entry point
├── package.json
├── postman-collection.json
└── README.md
```

---

## API Endpoints

### POST /check-availability
- **Input:** `{ date: "YYYY-MM-DD", time: "HH:MM", duration: 30 }`
- **Action:** Query Google Calendar for conflicts
- **Output:** `{ available: true/false, nextAvailable: "ISO datetime" }`

### POST /book-appointment
- **Input:** `{ name, phone, dob, service, date, time }`
- **Actions:**
  1. Create Google Calendar event — title: `[SERVICE] - [PATIENT NAME]`
  2. Send CONFIRMATION_MESSAGE via Twilio WhatsApp
  3. Log to Google Sheet (name, phone, service, datetime, booked_at)
- **Output:** `{ success: true, confirmationId: "UUID", eventId: "GCAL_ID" }`
- **Duration:** 30 min default, 60 min for complex procedures (root canal, implants, braces)

### POST /cancel-appointment
- **Input:** `{ confirmationId, reason }`
- **Actions:** Delete Calendar event → send cancellation WhatsApp → update Sheet status to "Cancelled"
- **Output:** `{ success: true }`

### POST /reschedule-appointment
- **Input:** `{ confirmationId, newDate, newTime }`
- **Actions:** Update Calendar event → send reschedule WhatsApp → update Sheet
- **Output:** `{ success: true }`

### POST /vapi-webhook
- **Input:** Vapi call-end payload
- **Actions:**
  - Extract: caller_phone, name, dob, service, preferred_date, preferred_time
  - If booked → trigger /book-appointment internally
  - If not booked → log as "missed_opportunity" in Sheet
- **Output:** `200 OK`

### GET /dashboard
- Single-page HTML showing:
  - Today's appointments
  - This week's total bookings
  - Missed calls count
  - Google reviews score (placeholder)
  - Export to CSV button

---

## WhatsApp Message Templates

Implement all five templates in `templates/messages.js`:

| Template              | Trigger                         |
| --------------------- | ------------------------------- |
| CONFIRMATION_MESSAGE  | Immediately after booking       |
| REMINDER_24HR         | 24 hours before appointment     |
| REMINDER_2HR          | 2 hours before appointment      |
| REVIEW_REQUEST        | 2 hours after appointment ends  |
| NO_SHOW_FOLLOWUP      | 9am next day for no-shows       |

Each template accepts a data object and returns the formatted string with emojis.

---

## Automated Scheduler (node-cron)

| Schedule         | Job                                         | Sheet Column Tracked |
| ---------------- | ------------------------------------------- | -------------------- |
| Every hour       | Scan for appointments in next 24h → REMINDER_24HR | `reminder_24h_sent`  |
| Every hour       | Scan for appointments in next 2h → REMINDER_2HR   | `reminder_2h_sent`   |
| Every hour       | Scan for appointments ended 2h ago → REVIEW_REQUEST| `review_sent`        |
| Daily at 9:00 AM | Scan yesterday's no-shows → NO_SHOW_FOLLOWUP      | `noshow_sent`        |

Always check the boolean column before sending to avoid duplicate messages.

---

## Environment Variables

```env
GOOGLE_CALENDAR_ID=
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=
GOOGLE_SHEET_ID=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
CLINIC_NAME=
CLINIC_ADDRESS=
CLINIC_PHONE=
CLINIC_GOOGLE_REVIEW_LINK=
PORT=3000
```

---

## Code Quality Rules

1. **Error handling** — wrap every external API call in try/catch, return meaningful error responses
2. **Input validation** — validate all endpoint inputs before processing (use `validators.js`)
3. **Logging** — log every request with timestamp, method, path, status (use `logger.js`)
4. **No hardcoded secrets** — all credentials via `.env` + `dotenv`
5. **UUID** — generate confirmation IDs using `uuid` package
6. **Modular services** — each integration (Calendar, Sheets, Twilio) lives in its own service file
7. **Idempotent reminders** — always check sent-status columns before sending

---

## Build Order

Follow this sequence when building from scratch:

1. **Scaffold** — `package.json`, folder structure, `.env.example`, `config/index.js`
2. **Google Calendar service** — `services/calendar.js` (check availability + create/update/delete events)
3. **Google Sheets service** — `services/sheets.js` (append row, update row, query rows)
4. **Twilio service** — `services/twilio.js` (send WhatsApp message)
5. **Message templates** — `templates/messages.js`
6. **Appointment routes** — `routes/appointments.js` (all 4 endpoints)
7. **Vapi webhook** — `routes/webhook.js`
8. **Scheduler** — `services/scheduler.js` (all cron jobs)
9. **Dashboard** — `routes/dashboard.js` + `views/dashboard.html`
10. **Server entry** — `server.js` (wire everything together)
11. **Postman collection** — `postman-collection.json`
12. **README** — step-by-step setup guide

---

## Compliance Note

For US/UK dental clinics, emphasise:
> "No patient medical data is stored — only name, phone, and appointment time."

This addresses HIPAA/GDPR concerns and removes the biggest client objection.
