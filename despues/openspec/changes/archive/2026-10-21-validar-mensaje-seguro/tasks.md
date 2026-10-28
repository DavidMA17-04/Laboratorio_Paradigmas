# Tasks

## 1. validateMessage

- [x] 1.1 En `validateMessage`, incrustar imagen solo si `extractImageUrl` o `is_valid_url_image` devuelve una URL http(s) con extension de imagen, e incrustar video solo si la regex de YouTube captura un id. Verificar con pruebas Given / When / Then que `http://image.com/image.jpg` y un `mediaurl` de Bing a un jpg salen como imagen, que un watch de YouTube sale como reproductor, y que `https://example.com` sale como texto. `npm test` debe pasar esos casos.
- [x] 1.2 Quitar o escapar scripts, `javascript:` y manejadores `on*` en mensaje y nombre, y aceptar color solo si coincide con la regex hexadecimal. Verificar con pruebas Given / When / Then que un `<script>` no queda ejecutable, que una URL de imagen con script no se incrusta, y que un color con `onfocus` no se aplica. `npm test` debe pasar.

## 2. Cliente

- [x] 2.1 Pintar nombre y color en `index.html` sin concatenar el color dentro de un `style='...'`. Verificar en el archivo que el color solo se asigna si es hexadecimal y que el nombre se inserta como texto, no como HTML crudo.
