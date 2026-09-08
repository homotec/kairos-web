# Plan de actualización web Kairós IA

## Fuentes de verdad

- Contenido y estructura: propuesta aprobada `Propuesta _Web Kairos Asistente Empresarial_Aprobada`.
- Diseño y sistema visual: versión actual del repositorio y web publicada en `www.kairosia.digital`.
- Rama de producción identificada: `main` (`origin/HEAD -> origin/main`).
- Rama de desarrollo prevista: `web-propuesta-2026`.

## Arquitectura actual

- Web estática HTML5 sin gestor de paquetes ni proceso de compilación.
- Tailwind CSS 3.4 cargado por CDN, con configuración de tema embebida en cada página.
- Tipografías: Manrope y JetBrains Mono; iconografía Material Symbols.
- Componentes visuales: cabecera sticky, navegación desktop/móvil, secciones clínicas sobre retícula, tarjetas, botones rectangulares, bloques oscuros, formularios y footer.
- Rutas actuales: `/` y `/privacidad.html`.
- Formulario: función serverless `/api/contact.js` compatible con Vercel y Resend.
- Despliegue: no hay workflows de GitHub Actions en el repositorio; cualquier publicación queda fuera de alcance.

## Mapa de cambios

| Página actual | Propuesta aprobada | Cambio necesario | Impacto técnico |
| --- | --- | --- | --- |
| `/` centrada en digitalización documental hotelera | Home de asistente empresarial: hero, qué es, capacidades, seis casos de uso, proceso, beneficios y Ethics by Design | Sustitución y ampliación de contenidos; nuevas secciones; nueva navegación | `index.html`, estilos y lógica compartidos; reutilización de cabecera, tarjetas, bloques, botones y footer |
| `/privacidad.html` contiene privacidad, aviso legal y cookies | Privacidad y cookies en página propia | Sustitución y ordenación de contenido legal | `privacidad.html`; reutilización de cabecera, navegación legal, tarjetas y footer |
| No existe página específica | Solicitar demo | Nueva página | `contacto.html`; reutilización del formulario y `/api/contact.js` |
| No existe página específica | Ethics by Design | Nueva página | `ethic-by-design.html`; reutilización de hero, tarjetas y CTA |
| No existe página específica | Quiénes somos | Nueva página | `quienes-somos.html`; reutilización de hero, tarjetas y CTA |
| Aviso legal integrado en privacidad | Términos / aviso legal independiente | Nueva página | `terminos.html`; reutilización de plantilla legal |
| No existen subpáginas | Centralización documental y de datos | Nueva subpágina | `/casos-de-uso/centralizacion-documental-datos/`; plantilla compartida de caso de uso |
| No existen subpáginas | Gestión inteligente de facturas | Nueva subpágina | `/casos-de-uso/automatizacion-facturas/`; plantilla compartida de caso de uso |
| No existen subpáginas | Gestión inteligente de albaranes | Nueva subpágina | `/casos-de-uso/automatizacion-registro-albaranes/`; plantilla compartida de caso de uso |
| No existen subpáginas | Conciliación | Nueva subpágina | `/casos-de-uso/conciliacion/`; plantilla compartida de caso de uso |
| No existen subpáginas | Gestión inteligente de contratos | Nueva subpágina | `/casos-de-uso/gestion-contratos/`; plantilla compartida de caso de uso |
| No existen subpáginas | Información y decisión | Nueva subpágina | `/casos-de-uso/informacion-decision/`; plantilla compartida de caso de uso |
| Menú con Inicio, Funcionalidades, Documentos, Ventajas y Contactar | Inicio, Qué es Kairós, Qué hace Kairós, Beneficios, Ethics by Design y Solicitar demo | Sustitución de enlaces y navegación a nuevas páginas | Cabecera desktop/móvil en todas las páginas |
| Footer con Privacidad, Términos y Soporte | Quiénes somos, Términos y Privacidad | Ampliación de enlaces | Footer compartido en todas las páginas |

## Criterios de implementación

- Mantener Manrope, JetBrains Mono, Material Symbols, la paleta, la retícula, la jerarquía, los botones, bordes, sombras, animaciones y comportamiento responsive actuales.
- Reutilizar el contenido aprobado y sus imágenes, adaptándolo a patrones visuales existentes.
- Mantener el endpoint de contacto y validar su integración sin enviar formularios reales.
- No introducir secretos ni copiar el documento de credenciales.
- No hacer push, merge, deploy ni cambios en producción.

## Validación prevista

- Comprobación estática de enlaces, rutas, recursos y presencia de contenidos.
- Servidor HTTP local y revisión desktop/móvil.
- Revisión de consola y errores de recursos.
- Comparación visual con la web publicada.
- Verificación final de Git, secretos y ausencia de acciones de producción.
