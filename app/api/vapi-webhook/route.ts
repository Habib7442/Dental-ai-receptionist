import { NextRequest, NextResponse } from 'next/server';
import { logBooking } from '@/lib/services/sheets';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log('Vapi Webhook Received:', JSON.stringify(payload, null, 2));

    // Vapi sends 'call' object in message
    const message = payload.message;
    if (message?.type === 'end-of-call-report') {
      const call = message.call;
      const analysis = message.analysis;
      const customer = call.customer;

      // Extract variables from Vapi analysis (if configured in Vapi)
      // Or extract from customer data
      const callerPhone = customer.number;
      
      // If the assistant was configured to extract variables:
      const variables = message.variables || {};
      const { name, dob, service, date, time, booked } = variables;

      if (!booked) {
        // Log missed opportunity
        await logBooking({
          name: name || 'Unknown',
          phone: callerPhone,
          service: service || 'Inquiry',
          date: date || 'N/A',
          time: time || 'N/A',
          status: 'Missed Opportunity'
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
