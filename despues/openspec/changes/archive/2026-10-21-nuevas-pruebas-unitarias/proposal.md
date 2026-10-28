# Proposal

## Why

El laboratorio pide pruebas unitarias extra de `validateMessage`: URLs de imagen, URLs de video y bloqueo de inyeccion. Ya hay casos jpg, gif, watch y `<script>`, pero faltan otras extensiones, otras formas de YouTube y otros vectores de inyeccion.

## What Changes

- Anadir pruebas unitarias Given / When / Then en `test/test.js` para imagenes png, jpeg y bmp (https).
- Anadir pruebas de `validateMessage` para `youtu.be`, `embed` y `shorts`, comprobando el iframe del reproductor.
- Anadir pruebas de inyeccion con `javascript:` y un manejador `onerror` en el mensaje.
- No cambia el comportamiento del chat: solo cubre casos que `validateMessage` ya debe aceptar o rechazar.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `pruebas-bdd`: la suite debe incluir esos casos nuevos de imagen, video e inyeccion.

## Impact

- `test/test.js`: nuevas pruebas BDD.
- `libs/unalib.js` y `index.html`: sin cambios de producto, salvo que una prueba revele un fallo ya exigido por `mensajes-multimedia`.
