import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, number, email, company } = body;

        if (!name || !number || !email || !company) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Generate email content
        const emailContent = `
            New Quote Request
            -----------------
            Name: ${name}
            Number: ${number}
            Email: ${email}
            Company: ${company}
        `;

        console.log('Quote Request Received:', emailContent);

        // Here you would normally use a library like resend or nodemailer to send the email
        // Example with fetch to a hypothetical service or Resend API:
        /*
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'Officink <onboarding@resend.dev>',
                to: ['support@officink.com'],
                subject: 'New Quote Request from ' + name,
                text: emailContent,
            }),
        });
        */

        // For now, we'll simulate a successful send
        return NextResponse.json({ message: 'Quote request sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error processing quote request:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
