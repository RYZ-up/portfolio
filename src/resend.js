export const sendContactEmail = async ({ email, phone, message }) => {
  try {
    // Check if running locally
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocal) {
      console.warn('⚠️ DEV MODE: Simulation réussie (Email non envoyé)');
      await new Promise(r => setTimeout(r, 500));
      return { success: true, isSimulation: true };
    }

    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phone, message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, ...data };
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
