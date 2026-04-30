import { NextRequest, NextResponse } from 'next/server';
import { getPendingReminders } from '@/lib/services/sheets';

export async function GET() {
  try {
    const bookings = await getPendingReminders();
    
    // Simple stats calculation
    const totalBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const missedCalls = bookings.filter(b => b.status === 'Missed Opportunity').length;
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = bookings.filter(b => b.datetime && b.datetime.startsWith(today));

    return NextResponse.json({
      totalBookings,
      missedCalls,
      todayBookings
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
