# 🦷 Dental Clinic AI Receptionist (Next.js Edition)

This is a complete AI-powered receptionist system built with Next.js. It handles patient calls via Vapi, schedules in Google Calendar, logs to Google Sheets, and sends reminders via Twilio.

## 🚀 Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root with the following:

```env
# Google Configuration
GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=config/google-key.json
GOOGLE_SHEET_ID=your_google_sheet_id_here

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Clinic Details
CLINIC_NAME="Elite Dental Clinic"
CLINIC_ADDRESS="123 Smile Avenue, New York, NY"
CLINIC_PHONE="+12125550198"
CLINIC_GOOGLE_REVIEW_LINK="https://g.page/r/your-link"
```

### 2. Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a Service Account and download the JSON key.
3. Place the JSON key at `config/google-key.json`.
4. Share your Google Calendar and Google Sheet with the Service Account email.

### 3. API Endpoints
- `POST /api/check-availability` - Checks if a slot is free.
- `POST /api/book-appointment` - Creates event + Logs to Sheet + Sends WhatsApp.
- `POST /api/vapi-webhook` - Receives data from Vapi at the end of a call.
- `GET /api/cron/reminders` - Run this every hour via a CRON service to send reminders.
- `GET /api/stats` - Fetches stats for the dashboard.

### 4. Dashboard
Access the premium admin dashboard at `/dashboard`.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Voice Agent:** Vapi.ai
- **Communication:** Twilio (WhatsApp/SMS)
- **Scheduling:** Google Calendar API
- **Database/Logging:** Google Sheets API
- **Styling:** Tailwind CSS + Vanilla CSS

## 📝 Compliance Note
For US/UK dental clinics: No patient medical data is stored — only name, phone, and appointment time. This ensures easier HIPAA/GDPR alignment.
