# Tasks

## 1. Servidor exportable

- [x] 1.1 En `server.js`, exportar `app` y el servidor HTTP, y llamar a `listen` solo cuando el archivo es el modulo principal. Verificar que `require('./server')` no abre el puerto 3000.

## 2. Dependencias

- [x] 2.1 Instalar `jest`, `supertest` y `socket.io-client` con `npm install --save-dev jest supertest socket.io-client`. Verificar que aparecen en `devDependencies` de `package.json`.

## 3. Suite de integracion

- [x] 3.1 Crear `tests/integration/chat.test.js` con un caso Supertest de `GET /` que espera estado 200 y HTML del chat. Verificar que ese caso pasa con Jest.
- [x] 3.2 En el mismo archivo, emitir `Evento-Mensaje-Server` con `socket.io-client` para `http://image.com/image.jpg`, `https://www.youtube.com/watch?v=qYwlqx-JLok`, `https://example.com` y un mensaje con `<script>`. Verificar que la respuesta trae imagen, reproductor, texto y contenido saneado respectivamente.
- [x] 3.3 Cerrar servidor y sockets en `afterAll`. Ejecutar `npx jest tests/integration --runInBand --env=node` hasta que salga 0, guardar la captura en `evidencia/evidencia-3.png`, y verificar que `npm test` (Mocha) sigue pasando.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
