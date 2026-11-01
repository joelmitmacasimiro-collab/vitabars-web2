# Mantenimiento interno

La lista CATALOG_DATA de js/products.js es la fuente común para compra, carrito, filtros, galería y fichas. Las fichas no están duplicadas por sabor: el componente renderFlavorDetail genera fotografía, ingredientes y tabla desde los datos.

Para añadir un sabor:

1. Duplica un registro regular y asigna un id único y estable (letras minúsculas sin espacios).
2. Completa name, short, line, category, presentation, price e image. price es un número en soles.
3. Completa ingredients, traits, contains, moment y nutrition. nutrition contiene valores con sus unidades, excepto kcal, que contiene solo el número. No incluyas nutrientes sin datos confirmados.
4. Copia sus fotos dentro de assets y usa rutas relativas desde la raíz, por ejemplo assets/products/nuevo.svg. ingredientImage es opcional. originalImage debe apuntar a la fuente conservada en assets/originals.
5. Usa discover:true para incluirlo en la galería principal. discover:false lo sitúa después de los demás sabores informativos. Un producto sin nutrition, como Mini, permanece en compra sin generar una ficha nutricional.
6. Los filtros se generan a partir de las categorías existentes. Los indicadores del carrusel se calculan desde las posiciones de sus tarjetas y el ancho visible, sin un número fijo de puntos.
7. Comprueba la nueva ficha en escritorio y móvil, su regreso y el acceso a compra. Ejecuta tools/verify.py.

No se ha publicado ningún anuncio de futuros sabores. Este documento es una guía técnica interna del proyecto.

Los archivos SVG de producto e ingredientes son editables: contienen una imagen WebP original y clipPath con el contorno. Permiten corregir la máscara sin cambiar ni reconstruir letras, colores o proporciones del empaque. Los colores visuales se ajustan moderadamente por CSS. Mantén la proporción original al sustituir una imagen.
