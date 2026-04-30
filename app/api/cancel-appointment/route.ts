import { NextRequest, NextResponse } from 'next/server';
import { deleteEvent } from '@/lib/services/calendar';
import { sendWhatsApp } from '@/lib/services/twilio';

export async function POST(req: NextRequest) {
  try {
    const { eventId, phone, name } = await req.json();

    if (!eventId || !phone) {
      return NextResponse.json({ error: 'Event ID and phone are required' }, { status: 400 });
    }

    await deleteEvent(eventId);
    
    const message = `Hi ${name || 'there'}! Your appointment has been cancelled as requested. If this was a mistake, please call us!`;
    await sendWhatsApp(phone, message);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
