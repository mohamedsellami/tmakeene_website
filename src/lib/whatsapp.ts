/** Used by client and server; set NEXT_PUBLIC_WHATSAPP_URL in .env (e.g. https://wa.me/213XXXXXXXXX). */
export function getWhatsAppUrl(): string {
  const u = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  if (u && u.length > 0) return u.trim();
  return "https://wa.me/";
}
