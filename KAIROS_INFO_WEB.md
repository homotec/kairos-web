# Kairos - Digitalización Inteligente de Documentos

## ¿Qué es Kairos?

**Kairos** es una solución avanzada de **digitalización automatizada de documentos** integrada nativamente con **Odoo**. Utiliza **Inteligencia Artificial** (Google Gemini Vision) para extraer, interpretar y procesar automáticamente información de facturas, albaranes y partes de horas, eliminando la entrada manual de datos y reduciendo drásticamente los errores humanos.

---

## 🎯 Problema que Resuelve

Las empresas dedican **horas diarias** a la tarea repetitiva de:
- Revisar facturas y albaranes en papel o PDF
- Transcribir manualmente datos a su ERP
- Verificar importes, impuestos y cantidades
- Identificar y crear proveedores
- Asociar productos con el catálogo existente

**Kairos automatiza todo este proceso**, liberando tiempo valioso para tareas de mayor valor añadido.

---

## ⚡ Características Principales

### 🔍 Detección Automática de Tipo de Documento
La IA identifica automáticamente si el documento es:
- **Factura** - Documentos con desglose fiscal completo
- **Albarán** - Notas de entrega sin información fiscal
- **Parte de Horas** - Registros de trabajo y servicios

### 📊 Extracción Inteligente de Datos
Kairos extrae automáticamente:

| Datos del Documento | Líneas de Producto |
|---------------------|-------------------|
| Número de documento | Descripción del producto |
| Fecha de emisión | Cantidad (3 decimales) |
| Proveedor (nombre, CIF, dirección) | Precio unitario |
| Totales y subtotales | Importe total de línea |
| | Tipo y porcentaje de IVA/IGIC |
| | Lote y fecha de caducidad |
| | Categoría de producto inferida |

### 🏢 Gestión Inteligente de Proveedores
- **Búsqueda automática** de proveedores existentes por nombre o CIF
- **Matching difuso** para encontrar coincidencias aunque el nombre varíe ligeramente
- **Creación automática** de nuevos proveedores con todos sus datos

### 💰 Mapeo Automático de Impuestos
- Detecta el tipo de impuesto (IVA, IGIC, IVA Intracomunitario)
- Mapea automáticamente con los impuestos configurados en Odoo
- Soporta tipos impositivos del 0% al 21%

### 📦 Asociación de Productos
- Busca productos existentes en el catálogo de Odoo
- Matching inteligente por descripción
- Sugiere categorías de producto basándose en el contexto

### 📧 Recepción por Email
- Bandeja de entrada dedicada para recibir documentos
- Procesamiento automático de adjuntos PDF
- Cola de digitalización centralizada

---

## 🔄 Flujo de Trabajo

```
┌──────────────────┐
│  📄 Documento    │  (PDF, escaneado, email)
└────────┬─────────┘
         ▼
┌──────────────────┐
│  🤖 Detección IA │  Identifica tipo de documento
└────────┬─────────┘
         ▼
┌──────────────────┐
│  📊 Extracción   │  Extrae todos los datos
└────────┬─────────┘
         ▼
┌──────────────────┐
│  👁️ Revisión     │  Usuario verifica y ajusta
└────────┬─────────┘
         ▼
┌──────────────────┐
│  ✅ Confirmación │  Crea registros en Odoo
└────────┬─────────┘
         ▼
┌──────────────────┐
│  📁 Exportación  │  Genera asientos contables
└──────────────────┘
```

### Estados del Proceso

| Estado | Descripción |
|--------|-------------|
| 📝 **Borrador** | Documento recién subido, pendiente de procesar |
| ⚙️ **En Proceso** | IA analizando el documento |
| 👁️ **En Revisión** | Datos extraídos, pendiente de validación humana |
| ❌ **Error** | Problema en el procesamiento |
| ✅ **Completado** | Documento validado y procesado |
| 📤 **Exportado** | Registros contables generados |

---

## 🛠️ Configuración Flexible

### Prompts Personalizables
Kairos permite ajustar las instrucciones de la IA para adaptarse a documentos específicos:
- Prompt de detección de tipo de documento
- Prompt de extracción de albaranes
- Prompt de extracción de facturas
- **Prompt personalizado por proveedor** para casos especiales

### Cuentas Contables por Proveedor
Cada proveedor puede tener asignadas:
- Cuenta contable principal de gastos
- Cuenta contable para gastos pendientes

---

## 📈 Beneficios Clave

### ⏱️ Ahorro de Tiempo
- **Reducción del 80-90%** en tiempo de entrada de datos
- Procesamiento de documentos en segundos, no minutos

### ✅ Reducción de Errores
- Elimina errores de transcripción manual
- Validación automática de datos fiscales

### 📊 Trazabilidad Completa
- Historial de cambios y acciones
- Documento original siempre accesible
- Registro de auditoría

### 🔗 Integración Nativa
- 100% integrado con Odoo
- No requiere exportaciones ni importaciones
- Los datos fluyen directamente a contabilidad

### 🧠 IA que Aprende
- Prompts ajustables para mejorar detección
- Configuraciones por proveedor
- Mejora continua con feedback

---

## 🖥️ Tecnología

| Componente | Tecnología |
|------------|------------|
| **ERP** | Odoo |
| **IA Vision** | Google Gemini 2.0 Flash |
| **Matching Difuso** | TheFuzz (Levenshtein) |
| **Procesamiento PDF** | pdf2image + Poppler |
| **Backend** | Python 3.10+ |

---

## 📋 Requisitos

- Odoo Community o Enterprise
- Cuenta Google Cloud con API Gemini habilitada
- Poppler (para conversión PDF)
- Dependencias Python: `google-generativeai`, `thefuzz`, `pdf2image`

---

## 🎬 Casos de Uso

### Distribuidoras y Mayoristas
Reciben decenas de albaranes diarios de múltiples proveedores. Kairos los digitaliza automáticamente, verificando productos, cantidades y precios.

### Empresas de Servicios
Gestionan partes de horas de técnicos y personal de campo. Kairos extrae horas trabajadas, servicios realizados y los integra en facturación.

### Departamentos de Contabilidad
Procesan facturas de proveedores en volumen. Kairos extrae datos fiscales, mapea impuestos y prepara asientos contables.

---

## 📞 Contacto

¿Interesado en implementar Kairos en tu empresa?

**Kairos Digitalización** forma parte del ecosistema de soluciones empresariales integradas con Odoo, diseñadas para optimizar procesos y potenciar la productividad.

---

*© 2024 Kairos - Digitalización Inteligente*

