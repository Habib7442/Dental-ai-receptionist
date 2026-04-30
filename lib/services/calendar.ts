import { google } from 'googleapis';
import { config } from '../config';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  // Use raw JSON if available (ideal for Vercel), otherwise fallback to local file path
  credentials: config.google.credentialsJSON ? JSON.parse(config.google.credentialsJSON) : undefined,
  keyFile: !config.google.credentialsJSON && config.google.keyPath ? path.resolve(process.cwd(), config.google.keyPath) : undefined,
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/spreadsheets'
  ],
});

const calendar = google.calendar({ version: 'v3', auth });

export async function checkAvailability(date: string, time: string, duration: number = 30) {
  try {
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startDateTime.toISOString(),
        timeMax: endDateTime.toISOString(),
        items: [{ id: config.google.calendarId }],
      },
    });

    const busySlots = response.data.calendars?.[config.google.calendarId!]?.busy || [];
    return busySlots.length === 0;
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
}

export async function createEvent(appointmentData: any) {
  const { name, phone, dob, service, date, time, duration = 30, status = 'New' } = appointmentData;
  
  // Build local datetime strings WITHOUT a "Z" suffix
  // so Google Calendar uses the timeZone field correctly.
  // e.g. "2026-04-30T16:00:00"
  const startStr = `${date}T${time}:00`;
  
  // Calculate end time manually
  const [hh, mm] = time.split(':').map(Number);
  const totalMinutes = hh * 60 + mm + duration;
  const endHH = String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0');
  const endMM = String(totalMinutes % 60).padStart(2, '0');
  const endStr = `${date}T${endHH}:${endMM}:00`;

  const event = {
    summary: `${(service || 'General Checkup').toUpperCase()} - ${name}`,
    description: `Phone: ${phone} | DOB: ${dob || 'N/A'} | Status: ${status}`,
    start: {
      dateTime: startStr,
      timeZone: 'Asia/Kolkata', 
    },
    end: {
      dateTime: endStr,
      timeZone: 'Asia/Kolkata',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: config.google.calendarId!,
      requestBody: event,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function updateEvent(eventId: string, newDate: string, newTime: string, duration: number = 30) {
  const startDateTime = new Date(`${newDate}T${newTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

  try {
    const response = await calendar.events.patch({
      calendarId: config.google.calendarId!,
      eventId: eventId,
      requestBody: {
        start: { dateTime: startDateTime.toISOString() },
        end: { dateTime: endDateTime.toISOString() },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await calendar.events.delete({
      calendarId: config.google.calendarId!,
      eventId: eventId,
    });
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}
