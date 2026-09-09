import { NextRequest, NextResponse } from 'next/server';
import { deliver } from '@/lib/notify';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    const { ok, channels, errors } = await deliver({
      subject: `Website Contact: ${subject?.trim() || 'New message'} — ${name.trim()}`,
      title: 'New Contact Message',
      replyTo: email.trim(),
      rows: {
        Name: name.trim(),
        Email: email.trim(),
        Phone: phone,
        Subject: subject?.trim(),
        Message: message.trim(),
      },
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
    console.error('Contact form error:', error);
    const detail =
      error instanceof Error ? error.message.split('\n')[0] : String(error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send your message. Please try again later.',
        detail,
      },
      { status: 500 }
    );
  }
}
