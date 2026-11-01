# Verificación de la entrega v9

Fecha: 31 de octubre de 2026. Comprobación local sobre la carpeta completa, servida dentro de una subcarpeta equivalente a la de GitHub Pages. No se modificó la publicación de GitHub.

| Ficha | Escritorio 1280 px | Celular 390 px | Datos y unidades |
|---|---|---|---|
| Lúcuma & Maní | Revisada | Revisada | Conservados |
| Menta & Chocolate | Revisada | Revisada | Tabla corregida conservada |
| Cacao & Cashew | Revisada | Revisada | 61.7 g, chocolate al 70% confirmados |
| Sal de Maras & Chocolate | Revisada | Revisada | Conservados |
| Superfoods Maca, Lúcuma y Cacao | Revisada | Revisada | Conservados |

- Sin imágenes rotas, desbordamiento horizontal ni intersección entre fotografía y tabla en las cinco fichas. Comprobación adicional de Menta a 320 px.
- Los valores mostrados en todas las tablas se compararon con los datos confirmados, incluyendo unidades y la fila de azúcares añadidos de Menta.
- Galería de cinco sabores, sin precios; última fila centrada y distribución de dos columnas en celular.
- Cierre de la animación sin miniaturas y con los dos botones. Se conservan la mano y la barra animada.
- Volver desde galería a experiencia restauró el desplazamiento exacto de entrada (1755.2 px en la prueba de escritorio).
- Los accesos a compra abrieron el producto correspondiente; filtros e indicadores se ajustaron a las posiciones reales. Con seis productos hubo tres posiciones en escritorio; al filtrar los dos Plant-Based desaparecieron los indicadores innecesarios.
- Carrito conservado al cambiar de vista. Agregar Superfoods, aumentar a dos unidades (S/ 25.00) y eliminar funcionaron. El producto de prueba se retiró.
- Sin errores ni advertencias de consola en el recorrido final.
- Sintaxis de JavaScript válida. SVG bien formados y referencias de archivos verificadas. Los 44 recursos de publicación consultados respondieron HTTP 200 bajo una subcarpeta.
- Prueba de extensión con un registro temporal, sin modificar los datos publicados: se generaron su tarjeta, filtro, ficha y acceso a compra desde la estructura reutilizable.

Herramientas incluidas: python tools/verify.py; node tools/check-catalog.mjs; node --check js/app.js. Son opcionales y no forman parte del funcionamiento del sitio.

La revisión móvil se realizó con tamaños de viewport en navegador; no sustituye pruebas en todos los dispositivos físicos. La nitidez de letras pequeñas depende de la calidad de las fotografías originales, conservadas en assets/originals.
