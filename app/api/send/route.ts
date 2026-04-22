import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const { name, email, phone, subject, message } = result.data;

    const { data, error } = await resend.emails.send({
      from: 'APNAS Will Contact Form <onboarding@resend.dev>',
      to: ['contact.apnaswill@zohomail.in'],
      subject: `New Enquiry: ${subject} from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #c5a059; border-radius: 10px;">
          <h2 style="color: #630d0d;">New Website Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
          <hr style="border: 1px solid #c5a059; margin-top: 20px;" />
          <p style="font-size: 10px; color: #999;">This email was sent from the APNAS Will contact form.</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
