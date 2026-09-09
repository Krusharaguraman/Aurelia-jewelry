/**
 * Telegram-only notification delivery.
 * Configure via env vars:
 *   TELEGRAM_BOT_TOKEN — from @BotFather
 *   TELEGRAM_CHAT_ID    — your private chat id
 *
 * Email (SMTP) support has been removed — Telegram is the only delivery channel.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isTelegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

const IMAGE_EXT: Record<string, string> = {
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
};

/** Decodes a data URL (e.g. data:image/jpeg;base64,...) into a buffer + filename. */
function decodeDataUrl(
  dataUrl: string
): { mime: string; buffer: Buffer; filename: string } | null {
  const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/s);
  if (!match) return null;
  const mime = match[1].toLowerCase();
  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length === 0) return null;
  const ext = IMAGE_EXT[mime] || 'jpg';
  return { mime, buffer, filename: `inspiration.${ext}` };
}

/** Sends a photo (from a data URL) to the configured chat with a caption. */
async function sendTelegramPhoto(caption: string, dataUrl: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;
  const decoded = decodeDataUrl(dataUrl);
  if (!decoded) throw new Error('Could not decode image data URL');

  const form = new FormData();
  form.append('chat_id', chatId);
  form.append('caption', caption);
  form.append('photo', new Blob([decoded.buffer], { type: decoded.mime }), decoded.filename);

  const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram photo error ${res.status}: ${body.slice(0, 200)}`);
  }
}

/** Sends a plain/HTML message to your private Telegram chat via the bot API. */
export async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram error ${res.status}: ${body.slice(0, 200)}`);
  }
}

/** Builds a readable Telegram message from a title + label/value rows. */
export function buildTelegramMessage(
  title: string,
  rows: Record<string, string | undefined>
): string {
  const lines = Object.entries(rows)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([label, value]) => `<b>${escapeHtml(label)}:</b> ${escapeHtml(String(value))}`);

  return `🔔 <b>Aurelia — ${escapeHtml(title)}</b>\n\n${lines.join('\n')}`;
}

export interface DeliveryResult {
  ok: boolean;
  channels: string[];
  errors: string[];
}

/** Options for sending a notification to Telegram. */
export interface NotificationOptions {
  subject: string;
  title: string;
  rows: Record<string, string | undefined>;
  replyTo?: string;
  imageData?: string;
}

/**
 * Sends a notification to Telegram. Returns ok=true if it delivered.
 * No email fallback — Telegram is the only delivery channel.
 */
export async function deliver(options: NotificationOptions): Promise<DeliveryResult> {
  const errors: string[] = [];
  const channels: string[] = [];

  if (!isTelegramConfigured()) {
    return {
      ok: false,
      channels,
      errors: [
        'Telegram is not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local and restart the server.',
      ],
    };
  }

  const caption = buildTelegramMessage(options.title, options.rows);
  let delivered = false;

  // Try sending with image first, then fall back to text-only
  if (options.imageData) {
    try {
      await sendTelegramPhoto(caption, options.imageData);
      delivered = true;
    } catch (error) {
      const detail = error instanceof Error ? error.message.split('\n')[0] : String(error);
      errors.push(`telegram photo: ${detail}`);
    }
  }

  if (!delivered) {
    try {
      await sendTelegram(caption);
      delivered = true;
    } catch (error) {
      const detail = error instanceof Error ? error.message.split('\n')[0] : String(error);
      errors.push(`telegram: ${detail}`);
    }
  }

  if (delivered) channels.push('telegram');

  return { ok: channels.length > 0, channels, errors };
}