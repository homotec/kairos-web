# Cómo añadir entradas al blog

Las entradas se gestionan desde `posts.js`. Para publicar una nueva:

1. Duplica uno de los objetos existentes dentro de `window.KAIROS_BLOG_POSTS`.
2. Asigna un `slug` único, una fecha `publishedAt` en formato `AAAA-MM-DD` y las etiquetas correspondientes.
3. Completa el título, resumen y contenido en español (`es`) e inglés (`en`).
4. Usa únicamente identificadores de etiquetas definidos en `TAG_LABELS` dentro de `blog.js`.
5. Comprueba la entrada abriendo `articulo.html?slug=TU-SLUG` desde un servidor local.

La página principal ordena las entradas por fecha y genera automáticamente la búsqueda, las etiquetas y el contador de resultados. No es necesario editar `index.html` al publicar.
