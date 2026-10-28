# Tasks

## 1. Imagen en el mensaje

- [x] 1.1 Hacer que la detección de imagen acepte solo un mensaje que es por completo una URL http o https terminada en jpg, jpeg, png, gif o bmp. Verificar que `npm test` sigue pasando `http://image.com/image.jpg` y `http://image.com/image.gif`, y que una frase que solo contiene esa URL devuelve falso.
- [x] 1.2 Hacer que un mensaje que es solo esa URL se reenvíe como imagen de esa misma URL. Verificar con una prueba de `validateMessage` que el mensaje resultante contiene la etiqueta de imagen y la URL, y que `npm test` pasa.

## 2. Reproductor de YouTube

- [x] 2.1 Unificar la detección de YouTube y la extracción del id para que ambas usen el mensaje completo y el mismo id de 11 caracteres en `watch?v=`, `youtu.be/`, `embed/` y `v/`. Verificar que la prueba de `https://www.youtube.com/watch?v=qYwlqx-JLok` pasa y que una URL sin id legible no lanza una excepción.
- [x] 2.2 Reenviar esa URL como reproductor cuyo origen es `https://www.youtube.com/embed/` más ese id. Si el id no se puede leer, escapar el texto y conservar nombre y color. Verificar con una prueba de `validateMessage` el reproductor del enlace de watch y el caso de fallo, y que `npm test` pasa.

## 3. Texto y scripts

- [x] 3.1 Dejar como texto escapado todo mensaje que no sea imagen ni YouTube, incluido uno con una etiqueta script o una URL de imagen que esconde un script. Verificar que la prueba existente de scripts pasa, añadir una prueba de un texto como `hola a todos` sin imagen ni reproductor, y que `npm test` pasa.
