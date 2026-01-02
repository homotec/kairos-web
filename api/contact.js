module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'API Active',
      message: 'La API de contacto está activa y escuchando peticiones POST.',
      time: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y email' });
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    // El receptor por defecto será el del login de Resend si no se configura la variable
    const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'lorenzo@homotec.com';

    if (!RESEND_API_KEY) {
      return res.status(200).json({
        success: true,
        message: 'MODO SIMULACIÓN: Configura la RESEND_API_KEY en Vercel para activar el envío real.'
      });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Kairos IA <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
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
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}
