# Proposal

## Why

Jest ya prueba el evento Socket.IO, pero nadie recorre el chat en el navegador: imagen visible, reproductor cargado y un script que no debe abrir `alert`. El laboratorio pide esa automatizacion con Playwright y la evidencia 4.

## What Changes

- Configurar Playwright en la raiz (JavaScript, `tests/e2e`, navegadores).
- `playwright.config.js`: `testDir` en `tests/e2e` y `use.baseURL` en la URL real del chat (`http://localhost:3000`).
- Crear `tests/e2e/chat.spec.js` con el flujo de usuario: `page.goto`, `getByRole` / `fill` / `click` / `expect`.
- Casos: URL de imagen que se muestra y termina de cargar; URL de YouTube cuyo iframe aparece; script XSS con `page.on("dialog")` antes del envio (el alert hace fallar) y mensaje saneado.
- Correr Chromium headed con el servidor de `npm start` activo. Guardar captura en `evidencia/evidencia-4.png`.
- No reemplaza Mocha ni Jest.

## Capabilities

### New Capabilities

- `pruebas-e2e`: el usuario real ve imagen, video y texto seguro en el frontend servido por el backend.

### Modified Capabilities

- Ninguna. `pruebas-integracion` sigue siendo HTTP + Socket.IO sin navegador.

## Impact

- `package.json`: `@playwright/test` y scripts de Playwright.
- `playwright.config.js`, `tests/e2e/chat.spec.js`.
- `evidencia/evidencia-4.png`.
- El chat sigue en un solo proceso (`npm start` sirve frontend y backend).
