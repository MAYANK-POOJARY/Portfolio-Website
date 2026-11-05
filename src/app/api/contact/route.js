import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { validateContact } from '@/utils/validateContact';

export async function POST(request) {
  // 1. Read the body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  // 2. Honeypot: real users never see this hidden field, bots fill it.
  //    We pretend it worked so the bot doesn't try again.
  if (body?.website) {
    return NextResponse.json({ success: true });
  }

  // 3. Validate on the server too
  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // 4. Make sure the server is configured
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact form: missing environment variables.');
    return NextResponse.json(
      { success: false, message: 'Email service is not configured.' },
      { status: 500 }
    );
  }

  // 5. Clean the values (remove line breaks from the name so it can't mess with the subject)
  const name = body.name.trim().replace(/[\r\n]+/g, ' ');
  const email = body.email.trim();
  const message = body.message.trim();

  // 6. Send the email
  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email, // hitting "Reply" in your inbox writes to the visitor
      subject: `New portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Could not send your message.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { success: false, message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}