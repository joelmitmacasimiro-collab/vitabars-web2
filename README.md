# Vitabars — proyecto completo

Entrega corregida del 31 de octubre de 2026. Versión sabores-corregidos-v9.

## Qué contiene

- `index.html`: estructura de todas las vistas y navegación.
- `css/styles.css`: diseño de marca, portada, animación y carrito.
- `css/flavors.css`: galería, fichas y tablas nutricionales corregidas.
- `js/products.js`: catálogo editable, fotos, ingredientes y nutrición en una sola estructura.
- `js/app.js`: vistas reutilizables, navegación, animación, filtros, carrusel y carrito.
- `assets/products/`: recortes de las cinco barras en SVG y foto de Mini.
- `assets/ingredients/`: recortes de ingredientes en SVG.
- `assets/originals/`: fotografías originales, versiones WebP utilizadas y fuentes nutricionales.
- `assets/media/`: portada, fundadoras, barra animada, mano y montaje de referencia.
- `assets/brand/`: logo transparente y versión optimizada.
- `assets/fonts/`: fuentes locales y sus licencias.
- `docs/`: datos confirmados, criterios de imágenes y verificación.
- `tools/`: servidor y comprobación opcionales, sin dependencias adicionales.

**Esta entrega ya no es un único HTML. Debes conservar y subir las carpetas css, js y assets junto a index.html.** No depende de rutas temporales del chat. Los íconos son SVG incluidos en el HTML; la decoración utiliza el logo local.

## Ejecutar

Solo necesitas un navegador moderno. Puedes abrir index.html directamente. Para probar mediante HTTP, si tienes Python 3:

```sh
python -m http.server 4173
```

Ejecuta el comando desde esta carpeta y abre http://localhost:4173. También puedes usar `node tools/serve.mjs` si ya tienes Node.js instalado. No requiere npm ni instalar paquetes.

## Versión de producción

Este es un proyecto estático sin compilación: los mismos archivos editables están listos para publicar. No hay una segunda carpeta dist ni archivos que debas generar. Las fotos se optimizaron a WebP y se reutilizan en las vistas. Los SVG de recorte incluyen los píxeles de la fotografía original con máscaras editables, sin regenerar textos del empaque.

## Subir a GitHub y activar Pages

1. Descomprime el ZIP. Abre la carpeta donde ves index.html, css, js y assets.
2. En la raíz de tu repositorio vtiabars-web, selecciona Add file → Upload files.
3. Arrastra **el contenido completo de esa carpeta**, incluidas las carpetas css, js y assets. No arrastres solo sus archivos internos, el ZIP ni una carpeta que lo contenga todo.
4. Comprueba antes de confirmar que GitHub mantiene rutas como `css/styles.css`, `js/app.js` y `assets/products/lucuma.svg`. Si todos aparecen sueltos en la raíz, cancela esa carga.
5. Pulsa Commit changes. El index.html con el mismo nombre y ubicación reemplazará al anterior. Los archivos viejos de otras entregas pueden quedarse: esta versión no los solicita.
6. En Settings → Pages, usa Deploy from a branch, selecciona main y /(root), y guarda. Si ya está configurado así, no necesitas cambiarlo.
7. Espera el despliegue y abre https://joelmitmacasimiro-collab.github.io/vtiabars-web/?v=corregida9

Si GitHub web no conserva carpetas al arrastrarlas, usa GitHub Desktop: clona tu repositorio, copia aquí index.html y las carpetas completas, confirma los cambios y pulsa Push origin. La guía ampliada está en docs/GUIA-PUBLICACION.md.

Si ves una versión anterior, recarga con Ctrl+F5 o usa una ventana privada.

## Publicar en otro hosting

Carga index.html, css/, js/ y assets/ en la carpeta pública del hosting, conservando sus rutas. No necesita servidor Node/Python en producción. El directorio de publicación es esta misma carpeta; deja el comando de compilación vacío. Las rutas relativas funcionan tanto en la raíz de un dominio como dentro de /vtiabars-web/. Las páginas usan rutas con #, por lo que no necesitan reglas de reescritura.

## Editar contenido

Los productos están en js/products.js. Para cambiar precios, fotos, ingredientes o nutrición, edita el registro correspondiente. Lee docs/MANTENIMIENTO.md antes de añadir un producto. No cambies el id de productos ya vendidos: el carrito persistente utiliza ese identificador.

## Servicios y configuración pendiente

- WhatsApp: enlace al +51 947227596, con el mensaje ya acordado; requiere Internet.
- Instagram, TikTok y enlaces de referencia: son enlaces externos, sin seguimiento o scripts de terceros añadidos.
- El carrito se guarda en localStorage, en el mismo navegador y dominio. No se comparte entre localhost, GitHub Pages y otros dominios.
- No hay pagos ni envío automático de pedidos. Falta definir el método de compra y entrega.
- Mini conserva S/ 6.00 como precio referencial.
- Faltan los documentos legales y el Libro de Reclamaciones. Se muestran como pendientes, sin enlaces ficticios.
- No se incluyen contraseñas, claves privadas ni configuración de cuentas.

## Comprobaciones opcionales

Con Python 3, ejecuta `python tools/verify.py` para comprobar rutas, SVG, productos y datos nutricionales confirmados. Con Node.js, puedes comprobar sintaxis con `node --check js/app.js` y `node --check js/products.js`.

## Documentación oficial de publicación

- [Subir archivos y carpetas a GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Configurar la carpeta de publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Según la opción elegida, GitHub puede mostrar Commit changes o Propose changes. Si se crea una rama/propuesta, incorpora esos cambios a la rama configurada en Pages para publicarlos.
