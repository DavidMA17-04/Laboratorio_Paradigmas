# Tasks

## 1. Playwright

- [x] 1.1 Inicializar Playwright en la raiz (JavaScript, `tests/e2e`, instalacion de navegadores) de forma no interactiva. Verificar que existe `playwright.config.js` y `@playwright/test` en `package.json`.
- [x] 1.2 Dejar `testDir` en `tests/e2e` y `use.baseURL` en `http://localhost:3000`. Verificar esos valores en el config.

## 2. Casos E2E

- [x] 2.1 En `tests/e2e/chat.spec.js`, abrir `/`, llenar nombre y enviar una URL https de imagen estable, y esperar un `img` visible con `complete` y `naturalWidth > 0`. Verificar que ese caso pasa en Chromium.
- [x] 2.2 En el mismo archivo, enviar `https://www.youtube.com/watch?v=qYwlqx-JLok` y esperar un iframe de embed visible. Verificar que ese caso pasa en Chromium.
- [x] 2.3 Registrar `page.on('dialog')` antes de enviar `hola <script>alert("xss")</script>`; si hay dialog la prueba falla. Verificar texto saneado, sin img ni iframe, y que el caso pasa.

## 3. Corrida headed

- [x] 3.1 Con `npm start` activo, ejecutar `npx playwright test --project=chromium --headed` hasta salir 0, guardar `evidencia/evidencia-4.png` de esa corrida, y verificar que se puede abrir `npx playwright show-report`.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
