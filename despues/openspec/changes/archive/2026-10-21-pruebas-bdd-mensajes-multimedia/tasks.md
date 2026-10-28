# Tasks

## 1. Forma BDD de la suite

- [x] 1.1 Reescribir `test/test.js` con grupos BDD y comentarios Given / When / Then en cada prueba, sin quitar los casos de telefono, imagen, YouTube y scripts. Verificar en el archivo que cada `it` nombra contexto, accion y resultado.
- [x] 1.2 Dejar Mocha y `assert` como unica herramienta. Verificar que `package.json` no añade Cucumber ni otro runner.

## 2. Pruebas unitarias del mensaje

- [x] 2.1 Anadir pruebas Given / When / Then de `validateMessage` para `http://image.com/image.jpg` y `http://image.com/image.gif` que esperan una imagen. Verificar que esas pruebas existen y, si `mostrar-imagenes-y-videos` ya esta aplicado, que `npm test` las pasa.
- [x] 2.2 Anadir una prueba Given / When / Then de `validateMessage` para `https://www.youtube.com/watch?v=qYwlqx-JLok` que espera un reproductor de ese id. Verificar que la prueba existe y, si el otro cambio ya esta aplicado, que `npm test` la pasa.
- [x] 2.3 Anadir pruebas Given / When / Then de `validateMessage` para `hola a todos`, un mensaje con etiqueta script y una URL de imagen que esconde un script. Verificar que las tres existen, que no esperan imagen ni reproductor en esos casos, y que `npm test` las pasa cuando el otro cambio ya esta aplicado.

## Workflow follow-up

- Aplicar `mostrar-imagenes-y-videos` antes o junto con este cambio para que las pruebas de imagen y reproductor queden en verde.
