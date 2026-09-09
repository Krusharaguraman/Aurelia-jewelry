import { NextRequest, NextResponse } from 'next/server';
import { deliver } from '@/lib/notify';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const { ok, channels, errors } = await deliver({
      subject: `New Newsletter Subscription — ${email.trim()}`,
      title: 'Newsletter Subscription',
      rows: { Email: email.trim() },
    });

    if (!ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Telegram is not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local.',
          detail: errors.join('; '),
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, channels });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    const detail =
      error instanceof Error ? error.message.split('\n')[0] : String(error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe. Please try again later.',
        detail,
      },
      { status: 500 }
    );
  }
}
