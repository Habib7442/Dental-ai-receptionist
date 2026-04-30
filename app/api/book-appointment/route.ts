import { NextRequest, NextResponse } from 'next/server';
import { createEvent } from '@/lib/services/calendar';
import { logBooking } from '@/lib/services/sheets';
import { sendWhatsApp } from '@/lib/services/twilio';
import { templates } from '@/lib/messages';
import { config } from '@/lib/config';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  console.log('🚀 [API] Received booking request!');
  try {
    const data = await req.json();
    console.log('📦 [API] Request Data:', JSON.stringify(data, null, 2));
    const { name, phone, dob, service, date, time } = data;

    if (!name || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const confirmationId = uuidv4();
    
    // 1. Create Google Calendar Event
    const event = await createEvent({ ...data, id: confirmationId });

    // 2. Log to Google Sheets
    await logBooking({ ...data, id: confirmationId, status: 'Confirmed' });

    // 3. Send WhatsApp Confirmation
    const message = templates.CONFIRMATION_MESSAGE({
      name,
      date,
      time,
      id: confirmationId
    });
    await sendWhatsApp(phone, message);
    
    // 4. Notify Doctor (if phone is configured)
    if (config.clinic.doctorPhone) {
      const doctorMessage = templates.DOCTOR_NOTIFICATION({
        name,
        date,
        time,
        service,
        id: confirmationId,
        phone
      });
      await sendWhatsApp(config.clinic.doctorPhone, doctorMessage);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Appointment successfully booked for ${name} on ${date} at ${time}. Confirmation ID: ${confirmationId}`,
      confirmationId, 
      eventId: event.id 
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
