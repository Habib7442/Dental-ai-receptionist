import { NextRequest, NextResponse } from 'next/server';
import { getPendingReminders, markReminderSent } from '@/lib/services/sheets';
import { sendWhatsApp } from '@/lib/services/twilio';
import { templates } from '@/lib/messages';

export async function GET(req: NextRequest) {
  // Optional: Add a CRON_SECRET check for security
  // const authHeader = req.headers.get('authorization');
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const bookings = await getPendingReminders();
    const now = new Date();

    for (const booking of bookings) {
      const { name, phone, datetime, reminder_24h_sent, reminder_2h_sent, review_sent, rowIndex } = booking;
      if (!datetime || !phone) continue;

      const apptDate = new Date(datetime);
      const diffMs = apptDate.getTime() - now.getTime();
      const diffHours = diffMs / (1000 * 60 * 60);

      // 1. 24h Reminder
      if (diffHours > 0 && diffHours <= 24 && reminder_24h_sent !== 'TRUE') {
        const message = templates.REMINDER_24HR({ name, time: apptDate.toLocaleTimeString() });
        await sendWhatsApp(phone, message);
        await markReminderSent(rowIndex, '24h');
        console.log(`Sent 24h reminder to ${name}`);
      }

      // 2. 2h Reminder
      if (diffHours > 0 && diffHours <= 2 && reminder_2h_sent !== 'TRUE') {
        const message = templates.REMINDER_2HR({ name, time: apptDate.toLocaleTimeString() });
        await sendWhatsApp(phone, message);
        await markReminderSent(rowIndex, '2h');
        console.log(`Sent 2h reminder to ${name}`);
      }

      // 3. Review Request (2 hours post-appointment)
      // Assuming appointment duration is 30 mins
      const endDateTime = new Date(apptDate.getTime() + 30 * 60000);
      const postDiffHours = (now.getTime() - endDateTime.getTime()) / (1000 * 60 * 60);

      if (postDiffHours >= 2 && postDiffHours < 24 && review_sent !== 'TRUE') {
        const message = templates.REVIEW_REQUEST({ name });
        await sendWhatsApp(phone, message);
        await markReminderSent(rowIndex, 'review');
        console.log(`Sent review request to ${name}`);
      }
    }

    return NextResponse.json({ success: true, processed: bookings.length });
  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
