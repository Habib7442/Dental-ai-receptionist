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
    
    // Clean phone number
    const cleanPhone = phone ? phone.toString().replace(/\D/g, '') : '';
    
    // If it's 10 digits and doesn't start with 1, assume it needs a country code.
    // For now, I'll allow the user to set a DEFAULT_COUNTRY_CODE, or default to empty.
    let finalPhone = cleanPhone;
    if (cleanPhone.length === 10) {
      // Defaulting to +91 since you are using Indian numbers in your tests
      finalPhone = `+91${cleanPhone}`;
    } else if (!cleanPhone.startsWith('+')) {
      finalPhone = `+${cleanPhone}`;
    }
    
    console.log(`📱 [API] Final Patient Phone: ${finalPhone}`);

    if (!name || !cleanPhone || !date || !time) {
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
    console.log('✉️ [API] Sending Patient Confirmation...');
    await sendWhatsApp(finalPhone, message);
    console.log('✅ [API] Patient Confirmation Sent.');
    
    // 4. Notify Doctor (if phone is configured)
    if (config.clinic.doctorPhone) {
      console.log(`✉️ [API] Notifying Doctor at: ${config.clinic.doctorPhone}`);
      const doctorMessage = templates.DOCTOR_NOTIFICATION({
        name,
        date,
        time,
        service: service || 'General Checkup',
        id: confirmationId,
        phone: finalPhone
      });
      await sendWhatsApp(config.clinic.doctorPhone, doctorMessage);
      console.log('✅ [API] Doctor Notification Sent.');
    } else {
      console.log('⚠️ [API] No DOCTOR_PHONE configured in Environment Variables.');
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
