# Dental Clinic AI Agent Kit

> **Production Ready · Sell for $499+**

Complete Vapi voice agent prompt + Antigravity workflow + setup guide. Build once, sell globally.

| Min Setup Fee | Monthly Retainer | Build Time |
| :-----------: | :--------------: | :--------: |
|    **$499**   |     **$149**     |  **30min** |

---

## 01 — How the Agent Works

| Step | Action                              | Description                                                                                                                          |
| :--: | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
|  1   | 📞 Patient Calls the Clinic         | AI Voice Agent (Vapi) picks up instantly — even at 2am, weekends, holidays. No missed calls ever.                                    |
|  2   | 🤖 Agent Greets & Qualifies         | Asks for name, reason for call (new patient, existing, emergency), preferred date/time.                                              |
|  3   | 📅 Checks Availability & Books      | Connects to Google Calendar in real-time, finds open slots, confirms the appointment live on the call.                               |
|  4   | 💬 Sends WhatsApp/SMS Confirmation  | Immediately after call, patient gets a confirmation message with date, time, address, and what to bring.                             |
|  5   | ⏰ Automated 24hr Reminder          | Day before appointment, agent sends a reminder. If no reply, sends a follow-up 2 hours before.                                      |
|  6   | ⭐ Post-Visit Review Request        | 2 hours after appointment, sends a WhatsApp asking for a Google Review with direct link.                                             |

---

## 02 — Vapi Voice Agent — System Prompt

Paste this directly into your Vapi assistant's **System Prompt** field. Replace the `[BRACKETS]` with the clinic's real info.

```txt
# IDENTITY
You are Sophie, a warm and professional AI receptionist for [CLINIC NAME],
a dental clinic located at [ADDRESS]. You speak clearly, naturally, and with
genuine warmth. You are NOT a robot — you are a helpful team member.

# CLINIC INFORMATION
- Clinic Name: [CLINIC NAME]
- Address: [FULL ADDRESS]
- Phone: [PHONE NUMBER]
- Working Hours: [e.g. Mon–Fri 9am–6pm, Sat 9am–2pm]
- Services: [e.g. General checkups, teeth cleaning, whitening, fillings,
  extractions, root canal, braces, implants]
- Insurance Accepted: [e.g. BlueCross, Aetna, Delta Dental /
  or "We accept most major insurance plans"]
- Emergency Line: [EMERGENCY CONTACT if different]

# YOUR PRIMARY GOALS
1. Book appointments for new and existing patients
2. Answer common questions about services, hours, location, pricing
3. Handle cancellations and reschedules
4. Collect patient details for the front desk
5. Direct genuine emergencies appropriately

# CONVERSATION FLOW

STEP 1 — GREETING
Always start with:
"Thank you for calling [CLINIC NAME], this is Sophie speaking!
How can I help you today?"

STEP 2 — UNDERSTAND THE NEED
Listen carefully. Categorize the call:
- NEW PATIENT booking → go to Step 3A
- EXISTING PATIENT booking/reschedule → go to Step 3B
- QUESTION (hours, location, price, insurance) → answer from clinic info above
- DENTAL EMERGENCY → go to Emergency Protocol
- COMPLAINT → be empathetic, take details, promise follow-up from the team

STEP 3A — NEW PATIENT BOOKING
Collect in this order (one question at a time, naturally):
1. "May I get your full name?"
2. "And your date of birth, please?"
3. "What brings you in today? Is this for a checkup, a specific concern,
    or something else?"
4. "Do you have a preferred day and time that works for you?"
5. "And a phone number where we can reach you — just in case?"
6. Check availability using the check_availability tool
7. Confirm the slot: "Great! I have [DATE] at [TIME] available.
    Shall I book that for you?"
8. Book using the book_appointment tool
9. Confirm: "You're all set! You'll receive a confirmation message shortly."

STEP 3B — EXISTING PATIENT
1. "May I get your name and date of birth to pull up your record?"
2. "Are you looking to book a new appointment or make a change
    to an existing one?"
3. Follow same booking flow as 3A

EMERGENCY PROTOCOL
If patient mentions: severe pain, broken tooth, trauma, swelling,
abscess, bleeding:
"I understand, that sounds really uncomfortable and I want to make sure
you get seen as soon as possible. Let me connect you with our emergency
line right away."
→ Use the transfer_call tool to transfer to: [EMERGENCY NUMBER]
If outside hours: "Our office is currently closed, but for dental emergencies
please call [EMERGENCY NUMBER] or visit your nearest emergency dental clinic."

# RULES
- Ask ONE question at a time. Never rapid-fire multiple questions.
- Be conversational and warm — not robotic or scripted-sounding.
- If you don't know the answer, say: "Let me make a note of that and have
  one of our team members call you back shortly."
- Never make up pricing. Say: "For exact pricing, our team will be happy
  to discuss that with you — it can vary based on your specific needs
  and insurance."
- If the caller is hard to understand, politely ask them to repeat:
  "I'm sorry, could you say that one more time? I want to make sure
  I get that right."
- Keep calls efficient but never rushed. Aim for 2–4 minutes per call.
- Always end with: "Is there anything else I can help you with today?"
  before closing.
- Closing: "Wonderful! We look forward to seeing you at [CLINIC NAME].
  Have a great day!"

# TONE GUIDE
- Warm but professional (not overly bubbly)
- Confident but not pushy
- Patient with elderly callers, gentle with anxious patients
- If someone is nervous about dentist: "We hear that a lot — our team
  is really gentle and will make sure you're comfortable every step
  of the way."
```

> **💡 Pro Tip:** In Vapi, set the voice to **"Alloy" (OpenAI)** or **"Rachel" (ElevenLabs)** for the most natural-sounding female receptionist voice. Set interruption sensitivity to **"low"** so patients can finish speaking.

---

## 03 — Antigravity — Full Workflow Prompt

Open Antigravity, create a new workspace, and paste this into the agent chat. It will build the entire backend automatically.

```txt
Build me a complete dental clinic AI receptionist system with the following components:

PROJECT: Dental Clinic AI Agent Backend
Stack: Node.js + Express + Google Calendar API + Twilio (WhatsApp/SMS)


COMPONENT 1 — Appointment Booking API
Create a REST API with these endpoints:

POST /check-availability
- Input: { date: "YYYY-MM-DD", time: "HH:MM", duration: 30 }
- Connect to Google Calendar API
- Check if the time slot is free
- Return: { available: true/false, nextAvailable: "ISO datetime" }

POST /book-appointment
- Input: { name, phone, dob, service, date, time }
- Create a Google Calendar event
- Event title: "[SERVICE] - [PATIENT NAME]"
- Event description: "Phone: [PHONE] | DOB: [DOB] | New/Existing: [STATUS]"
- Duration: 30 minutes by default (60 for complex procedures)
- Send confirmation WhatsApp via Twilio to patient phone
- Log booking to a Google Sheet (patient name, phone, service, datetime, booked_at)
- Return: { success: true, confirmationId: "UUID", eventId: "GCAL_ID" }

POST /cancel-appointment
- Input: { confirmationId, reason }
- Delete the Google Calendar event
- Send cancellation WhatsApp to patient
- Update Google Sheet status to "Cancelled"
- Return: { success: true }

POST /reschedule-appointment
- Input: { confirmationId, newDate, newTime }
- Update the Google Calendar event
- Send reschedule confirmation WhatsApp
- Update Google Sheet
- Return: { success: true }


COMPONENT 2 — WhatsApp Message Templates
Create a messages.js file with these templates:

CONFIRMATION_MESSAGE:
"Hi [NAME]! 🦷 Your appointment at [CLINIC NAME] is confirmed!
📅 Date: [DATE]
⏰ Time: [TIME]
📍 Address: [ADDRESS]
🔖 Confirmation #: [ID]

Please bring your insurance card and arrive 10 mins early for new patients.
To cancel or reschedule reply CANCEL or RESCHEDULE.
See you soon! — [CLINIC NAME] Team"

REMINDER_24HR:
"Hi [NAME]! Just a friendly reminder 😊
Your dental appointment at [CLINIC NAME] is TOMORROW
⏰ [TIME] at [ADDRESS]
Reply YES to confirm or call us to reschedule: [PHONE]"

REMINDER_2HR:
"Hi [NAME]! Your appointment at [CLINIC NAME] is in 2 hours ⏰
See you at [TIME]! 📍 [ADDRESS]"

REVIEW_REQUEST (send 2hrs post-appointment):
"Hi [NAME]! We hope your visit went well 😊
Your feedback means the world to us — would you mind leaving us
a quick Google review?
👉 [GOOGLE_REVIEW_LINK]
Takes less than 60 seconds and helps us so much! Thank you 🙏
— [CLINIC NAME] Team"

NO_SHOW_FOLLOWUP:
"Hi [NAME], we noticed you missed your appointment today at [CLINIC NAME].
We hope everything is okay!
Would you like to reschedule? Just reply or call us: [PHONE]
We'd love to see you soon 😊"


COMPONENT 3 — Automated Reminder Scheduler
Create a cron job system (using node-cron):

- Every hour: scan Google Sheet for appointments in next 24 hours
  → send REMINDER_24HR if not already sent
- Every hour: scan for appointments in next 2 hours
  → send REMINDER_2HR if not already sent
- Every hour: scan for appointments that ended 2 hours ago
  → send REVIEW_REQUEST
- Every morning at 9am: scan for yesterday's no-shows
  → send NO_SHOW_FOLLOWUP

Track sent status in Google Sheet columns:
reminder_24h_sent, reminder_2h_sent, review_sent, noshow_sent (boolean)


COMPONENT 4 — Vapi Webhook Handler
POST /vapi-webhook
- Receive call end data from Vapi
- Extract: caller_phone, extracted variables
  (name, dob, service, preferred_date, preferred_time)
- If appointment was booked during call: trigger /book-appointment
- If call ended without booking: log as "missed_opportunity" in Google Sheet
- Return 200 OK


COMPONENT 5 — Simple Dashboard (HTML)
Create a single-page dashboard at GET /dashboard showing:
- Today's appointments (from Google Calendar)
- This week's total bookings
- Missed calls count (from Vapi webhook logs)
- Recent Google reviews score (placeholder)
- Export to CSV button for appointments


ENVIRONMENT VARIABLES NEEDED (.env.example)
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


ADDITIONAL INSTRUCTIONS
- Add comprehensive error handling with try/catch on all API calls
- Add request logging with timestamps
- Create a README.md with step-by-step setup instructions
- Create a Postman collection JSON for testing all endpoints
- Use dotenv for environment variables
- Add input validation on all endpoints
- Structure folders as: /routes /services /templates /utils /config

Start by creating the folder structure and package.json,
then build each component one by one.
Test each endpoint before moving to the next.
```

> **💡 How to use in Antigravity:** Open Antigravity → New Workspace → paste this prompt → select **Agent-Assisted mode** (recommended) → hit Enter. The agent will build all 5 components automatically. Review each artifact before it proceeds.

---

## 04 — Tools You Need (All Free to Start)

| Tool                           | Purpose              | Cost                                                                    |
| ------------------------------ | -------------------- | ----------------------------------------------------------------------- |
| 🎙️ **Vapi.ai**                | Voice Agent          | Free tier available. ~$0.05–0.10/min per call. Paste your system prompt here. |
| 📅 **Google Calendar**         | Scheduling           | Free. Stores all appointments. Vapi checks availability and books directly via API. |
| 💬 **Twilio**                  | WhatsApp / SMS       | Free trial $15 credit. Then pay-as-you-go ~$0.005/SMS.                  |
| 📊 **Google Sheets**           | Database             | Free. Logs every booking, patient details, reminder status. Clinic owner can view anytime. |
| 🤖 **Google Antigravity**      | Builder              | Free (public preview). Use to build the entire backend from the prompt in Section 03. |
| ☁️ **Railway.app**             | Hosting              | Free tier available. $5/month for production. Simple GitHub deployment. |

> **⚠️ Important:** For US/UK dental clinics, make sure to mention HIPAA/GDPR awareness. Tell clients: *"No patient medical data is stored — only name, phone, and appointment time."* This removes their biggest objection.

---

## 05 — What to Charge Your Clients

| Package              | What's Included                                                                                               | Price               |
| -------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------- |
| **DIY Template** *(Sell on Whop passively)*      | Vapi prompt + Antigravity prompt + setup PDF guide + video walkthrough                       | **$59**             |
| **DFY Basic** *(You build it for them)*          | Full build + Vapi setup + Google Calendar connect + WhatsApp reminders + 30-day support      | **$499**            |
| **DFY Pro** *(Best seller)*                      | Everything in Basic + dashboard + review automation + monthly monitoring + updates            | **$499 + $149/mo**  |
| **DFY Enterprise** *(Multi-location clinics)*    | Multiple locations + custom voice + EHR integration + priority support + quarterly optimization | **$1,500 + $299/mo** |

> **💡 Sales pitch that works:** *"If your clinic misses just 3 calls a week, that's roughly 12 missed appointments a month. At $150 average treatment value, that's $1,800/month walking out the door. Our agent costs $149/month and catches every single call."* — ROI is obvious. Objection gone.

---

## 06 — How to Find Dental Clinic Clients Globally

| Channel                    | Strategy                                                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 🔍 **Google Maps Search**  | Search "dental clinic [city]" → find clinics with under 50 reviews → they're small enough to need you, big enough to pay. |
| 📸 **Instagram DM**        | Find dental clinics on Instagram → DM with a screen recording of your demo agent working. Visual proof converts.       |
| 💼 **LinkedIn Outreach**   | Search "dental practice owner" or "dentist" on LinkedIn → send a cold message with your demo video link.               |
| 🛒 **Whop Marketplace**    | List your DIY template on Whop. Dental clinic managers globally search for automation solutions daily.                 |

---

*Built for **Habib** · Dental Clinic AI Agent Kit · Ready to Deploy*