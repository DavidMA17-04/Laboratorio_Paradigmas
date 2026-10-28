# Proposal

## Why

Las pruebas actuales llaman a `validateMessage` en Mocha, pero no comprueban que el backend de Node.js use una-lib al recibir un mensaje real. El laboratorio pide esa prueba de integracion y una captura (evidencia 3).

## What Changes

- Instalar Jest, Supertest y `socket.io-client` como dependencias de desarrollo.
- Añadir `tests/integration/chat.test.js` que pega a las entradas reales del servidor.
- HTTP: Supertest prueba `GET /` (el unico metodo HTTP del chat).
- Socket.IO: Jest y `socket.io-client` emiten `Evento-Mensaje-Server` y revisan la respuesta.
- Cubrir imagen valida, video valido, y URL no permitida o script (aceptado saneado, no incrustado como medio).
- Cerrar el servidor y los sockets al terminar. Guardar una captura de Jest en verde como evidencia 3.
- `npm test` (Mocha) no se reemplaza.

## Capabilities

### New Capabilities

- `pruebas-integracion`: el backend y una-lib se verifican juntos por HTTP y por el evento real de chat.

### Modified Capabilities

- Ninguna. `pruebas-bdd` sigue siendo la suite unitaria de `validateMessage`.

## Impact

- `package.json`: jest, supertest, socket.io-client; script para la suite de integracion.
- `server.js`: exportar la app y el servidor HTTP para que la prueba pueda abrir y cerrar el puerto.
- `tests/integration/chat.test.js`: casos de integracion.
- Carpeta de evidencia: captura de Jest aprobado.
