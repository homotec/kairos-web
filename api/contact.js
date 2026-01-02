module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel auto-parses JSON body if content-type is correct
  const { name, email, company, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y email' });
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return res.status(200).json({
        success: true,
        message: 'MODO SIMULACIÓN: El mensaje ha sido validado correctamente, pero falta configurar la API KEY de Resend en Vercel para que el correo se envíe de verdad.'
      });
    }

    // Using global fetch (available in Node 18+)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Kairos IA <onboarding@resend.dev>',
        to: ['lorenzo@kairosia.digital'],
        subject: `Nueva solicitud de Demo: ${name}`,
        html: `
          <h1>Nueva solicitud de contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${company || 'No especificada'}</p>
          <p><strong>Mensaje:</strong> ${message || 'Sin mensaje'}</p>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Email enviado correctamente' });
    } else {
      console.error('Resend API Error:', data);
      return res.status(response.status).json({
        error: 'Error de la API de Resend',
        details: data.message || 'Error desconocido'
      });
    }
  } catch (error) {
    console.error('API Crash Error:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
