/**
 * Central contact configuration.
 * All values are read from environment variables (NEXT_PUBLIC_*) so they can be
 * changed per environment without touching the code. Fallbacks keep the site
 * working when the variables are not set.
 */

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'care@aurelia.com';

export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 98765 43210';

/** Click-to-call href, e.g. "tel:+919876543210" */
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, '')}`;

/** WhatsApp number in international format without "+" */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
  CONTACT_PHONE.replace(/[^\d]/g, '');

/** Full WhatsApp chat link */
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Social profile links (fall back to '#' when not configured) */
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '#',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '#',
} as const;

export const SOCIAL_HANDLES = {
  instagram: '@aurelia_jewelry',
  facebook: 'Aurelia Jewelry',
  twitter: '@aureliajewelry',
} as const;


export const STORE_CONTACTS = {
  chennai: {
    phone: process.env.NEXT_PUBLIC_STORE_PHONE_CHENNAI || CONTACT_PHONE,
    email: process.env.NEXT_PUBLIC_STORE_EMAIL_CHENNAI || 'chennai@aurelia.com',
  },
  bengaluru: {
    phone: process.env.NEXT_PUBLIC_STORE_PHONE_BENGALURU || '+91 98765 43211',
    email:
      process.env.NEXT_PUBLIC_STORE_EMAIL_BENGALURU || 'bengaluru@aurelia.com',
  },
  mumbai: {
    phone: process.env.NEXT_PUBLIC_STORE_PHONE_MUMBAI || '+91 98765 43212',
    email: process.env.NEXT_PUBLIC_STORE_EMAIL_MUMBAI || 'mumbai@aurelia.com',
  },
} as const;
