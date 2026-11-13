/**
 * POST /api/contact — the contact form. Runs on request (the rest of the site is static) and hands
 * the message to the CMS, which stores it in Inbox → Contact messages. Same origin as the page, so
 * no CORS setup; without JavaScript the browser is sent back to the
 * form at #contact-sent or #contact-error.
 */
import type { APIRoute } from 'astro';
import { CMS_URL } from '../../lib/cms';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: 'Could not read the form.' }, { status: 400 });
  }
  const page = String(form.get('page') ?? '/contact');
  const back = (ok: boolean) => {
    const path = page.startsWith('/') && !page.startsWith('//') ? page : '/contact';
    return new Response(null, { status: 303, headers: { Location: `${path}#${ok ? 'contact-sent' : 'contact-error'}` } });
  };

  let res: Response;
  try {
    res = await fetch(`${CMS_URL}/api/contact`, { method: 'POST', body: form, signal: AbortSignal.timeout(10_000) });
  } catch {
    return wantsJson ? Response.json({ error: 'The message could not be sent.' }, { status: 502 }) : back(false);
  }
  if (wantsJson) {
    const body = await res.text();
    return new Response(body, { status: res.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  }
  return back(res.ok);
};
