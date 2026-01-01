import { Resend } from 'resend';

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // Check for API key (support both uppercase and lowercase)
  const resendApiKey = process.env.RESEND_API_KEY || process.env.resend_api_key;

  if (!resendApiKey) {
    console.error("❌ RESEND_API_KEY is missing in Netlify environment variables");
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server configuration error: RESEND_API_KEY not configured',
        message: 'Please add RESEND_API_KEY to your Netlify environment variables'
      }),
    };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { email, phone, message } = JSON.parse(event.body);

    // Validate input
    if (!email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email and message are required' }),
      };
    }

    console.log(`📧 Sending email from: ${email}`);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'rayane.yazid.pro@gmail.com',
      subject: `Nouveau message de ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #667eea;">Nouveau Message du Portfolio</h2>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone || 'Non renseigné'}</p>
            <hr style="border: 1px solid #ddd; margin: 15px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #888; margin-top: 20px;">
            Envoyé depuis votre portfolio via Netlify Function.
          </p>
        </div>
      `
    });

    console.log('✅ Email sent successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        message: error.message
      }),
    };
  }
};

