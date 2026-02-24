import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, organization, message, intent } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    // Log the submission (visible in Vercel function logs)
    console.log('[LEAD]', JSON.stringify({
      name, email, organization, message, intent,
      conference: process.env.VITE_CONFERENCE || 'unknown',
      timestamp: new Date().toISOString(),
    }));

    // Forward to webhook if configured
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, organization, message, intent,
          conference: process.env.VITE_CONFERENCE || 'unknown',
          source: 'psi-conference-landing',
          timestamp: new Date().toISOString(),
        }),
      }).catch((err) => console.error('Webhook error:', err));
    }

    // Send email notification if configured (via Vercel's built-in)
    const notifyEmail = process.env.NOTIFY_EMAIL;
    if (notifyEmail) {
      console.log(`[NOTIFY] Would email ${notifyEmail} about lead: ${name} <${email}>`);
    }

    return res.status(200).json({
      ok: true,
      message: 'Thank you! We will be in touch soon.',
    });
  } catch (error) {
    console.error('[ERROR] landing-messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
