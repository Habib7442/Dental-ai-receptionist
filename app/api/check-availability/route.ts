import { NextRequest, NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/services/calendar';

export async function POST(req: NextRequest) {
  try {
    const { date, time, duration } = await req.json();

    if (!date || !time) {
      return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
    }

    const available = await checkAvailability(date, time, duration);

    return NextResponse.json({ available });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
