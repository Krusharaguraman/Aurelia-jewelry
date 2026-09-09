import { NextRequest, NextResponse } from 'next/server';
import { deliver } from '@/lib/notify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, metal, stone, budget, occasion, notes, inspirationImage } = body;

    if (!name?.trim() || !email?.trim() || !metal || !stone || !budget) {
      return NextResponse.json(
        { success: false, error: 'Name, email, metal, stone and budget are required.' },
        { status: 400 }
      );
    }

    const { ok, channels, errors } = await deliver({
      subject: `Custom Design Request — ${name.trim()} (${budget})`,
      title: 'New Custom Design Request',
      replyTo: email.trim(),
      imageData:
        typeof inspirationImage === 'string' && inspirationImage.startsWith('data:')
          ? inspirationImage
          : undefined,
      rows: {
        Name: name.trim(),
        Email: email.trim(),
        Phone: phone,
        Metal: metal,
        Stone: stone,
        Budget: budget,
        Occasion: occasion,
        Notes: notes,
        'Inspiration image': inspirationImage ? 'Attached as photo' : undefined,
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
    console.error('Custom design form error:', error);
    const detail =
      error instanceof Error ? error.message.split('\n')[0] : String(error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit your design request. Please try again later.',
        detail,
      },
      { status: 500 }
    );
  }
}
