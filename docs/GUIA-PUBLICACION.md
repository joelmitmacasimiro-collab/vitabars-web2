# Cargar carpetas sin perder la estructura

## GitHub web

Descomprime primero. Arrastra index.html y las carpetas completas css, js, assets, docs y tools al área Upload files. En la lista previa deben aparecer nombres con sus carpetas, por ejemplo assets/products/cacao.svg. GitHub reemplaza archivos solo si el nombre y la ruta coinciden exactamente. Confirma con Commit changes.

## GitHub Desktop

1. Abre GitHub Desktop y selecciona File → Clone repository.
2. Elige tu repositorio vtiabars-web y una carpeta local.
3. En Repository → Show in Explorer, abre la carpeta clonada.
4. Copia allí el contenido del ZIP descomprimido, conservando todas las carpetas. Acepta reemplazar index.html y los archivos con la misma ruta.
5. Vuelve a GitHub Desktop, revisa Changes, escribe un resumen y pulsa Commit to main.
6. Pulsa Push origin. Espera a GitHub Pages.

No hace falta borrar los archivos antiguos sueltos. Evita eliminar el repositorio o su historial. Este proyecto no carga archivos antiguos de la raíz salvo el nuevo index.html.

## Hosting estático

Sube el contenido de esta carpeta a public_html o al directorio público que indique tu proveedor. Conserva css/, js/ y assets/. No necesitas bases de datos, variables de entorno ni compilación. Activa HTTPS con las opciones del proveedor. Los documentos originales y herramientas pueden conservarse en el repositorio; para publicar solo el sitio bastan index.html, css/, js/ y assets/.

## Documentación oficial de publicación

- [Subir archivos y carpetas a GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Configurar la carpeta de publicación de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Según la opción elegida, GitHub puede mostrar Commit changes o Propose changes. Si se crea una rama/propuesta, incorpora esos cambios a la rama configurada en Pages para publicarlos.
