import { NextRequest, NextResponse } from 'next/server';
import { updateEvent } from '@/lib/services/calendar';
import { sendWhatsApp } from '@/lib/services/twilio';
import { templates } from '@/lib/messages';

export async function POST(req: NextRequest) {
  try {
    const { eventId, newDate, newTime, phone, name } = await req.json();

    if (!eventId || !newDate || !newTime || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await updateEvent(eventId, newDate, newTime);
    
    const message = `Hi ${name || 'there'}! Your appointment has been rescheduled to ${newDate} at ${newTime}. We'll see you then!`;
    await sendWhatsApp(phone, message);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
