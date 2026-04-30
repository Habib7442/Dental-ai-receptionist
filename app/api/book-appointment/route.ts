import { NextRequest, NextResponse } from 'next/server';
import { createEvent } from '@/lib/services/calendar';
import { logBooking } from '@/lib/services/sheets';
import { sendWhatsApp } from '@/lib/services/twilio';
import { templates } from '@/lib/messages';
import { config } from '@/lib/config';
import { v4 as uuidv4 } from 'uuid';

// Convert "16:00" → "4:00 PM"
function formatTime(time: string): string {
  try {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${hour12}:${m.toString().padStart(2, '0')} ${period}`;
  } catch {
    return time;
  }
}

export async function POST(req: NextRequest) {
  console.log('🚀 [API] Received booking request!');
  try {
    let data = await req.json();
    console.log('📦 [API] Request Data:', JSON.stringify(data, null, 2));

    // Vapi sends tool arguments inside message.toolCalls[0].function.arguments
    let args = data;
    if (data.message?.toolCalls?.[0]?.function?.arguments) {
      args = typeof data.message.toolCalls[0].function.arguments === 'string' 
        ? JSON.parse(data.message.toolCalls[0].function.arguments)
        : data.message.toolCalls[0].function.arguments;
      console.log('🛠️ [API] Extracted Arguments:', JSON.stringify(args, null, 2));
    }

    const { name, phone, dob, service, date, time } = args;
    
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
    const bookingData = {
      name,
      phone: finalPhone,
      dob: dob || '',
      service: service || 'General Checkup',
      date,
      time,
    };
    
    // 1. Create Google Calendar Event
    console.log('📅 [API] Creating Calendar Event...');
    const event = await createEvent({ ...bookingData, id: confirmationId });
    console.log('✅ [API] Calendar Event Created:', event.id);

    // 2. Log to Google Sheets
    console.log('📝 [API] Logging to Sheets...');
    await logBooking({ ...bookingData, id: confirmationId, status: 'Confirmed' });
    console.log('✅ [API] Logged to Sheets.');

    // 3. Send WhatsApp Confirmation
    const friendlyTime = formatTime(time);
    const message = templates.CONFIRMATION_MESSAGE({
      name,
      date,
      time: friendlyTime,
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
        time: friendlyTime,
        service: service || 'General Checkup',
        id: confirmationId,
        phone: finalPhone
      });
      await sendWhatsApp(config.clinic.doctorPhone, doctorMessage);
      console.log('✅ [API] Doctor Notification Sent.');
    } else {
      console.log('⚠️ [API] No DOCTOR_PHONE configured in Environment Variables.');
    }

    // Vapi expects a "results" array with the toolCallId
    const toolCallId = data.message?.toolCalls?.[0]?.id;
    const successMessage = `Appointment successfully booked for ${name} on ${date} at ${friendlyTime}. Confirmation ID: ${confirmationId}`;

    return NextResponse.json({
      results: [
        {
          toolCallId: toolCallId,
          result: successMessage,
        },
      ],
    });
  } catch (error: any) {
    console.error('❌ [API] CRITICAL ERROR:', error.message);
    if (error.response) {
      console.error('❌ [API] Error Details:', JSON.stringify(error.response.data, null, 2));
    }
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
