export const config = {
  google: {
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    keyPath: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
    sheetId: process.env.GOOGLE_SHEET_ID,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM,
    phone: process.env.TWILIO_PHONE,
  },
  clinic: {
    name: process.env.CLINIC_NAME,
    address: process.env.CLINIC_ADDRESS,
    phone: process.env.CLINIC_PHONE,
    reviewLink: process.env.CLINIC_GOOGLE_REVIEW_LINK,
    doctorPhone: process.env.DOCTOR_PHONE,
  }
};
