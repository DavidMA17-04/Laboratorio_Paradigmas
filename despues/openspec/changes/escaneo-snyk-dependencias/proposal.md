# Proposal

## Why

El chat ya tiene Mocha, Jest y Playwright, pero nadie revisa las dependencias npm. `express` y `socket.io` estan en `*` y el lock fija Express 4.18.2 y Socket.IO 4.7.2, versiones que suelen arrastrar avisos de Snyk. El laboratorio pide escanear con Snyk, corregir criticas y altas, y volver a pasar las pruebas.

## What Changes

- Ejecutar `snyk test` sobre las dependencias del proyecto (CLI y/o la extension ya instalada) y dejar una lista de vulnerabilidades.
- Reparar todas las hallazgos de severidad Critical y High con un agente de IA: actualizar paquetes, overrides o pin en `package.json` / `package-lock.json`.
- Volver a correr las tres suites existentes (`npm test`, `npm run test:integration`, `npm run test:e2e`) y exigir que sigan en verde.
- Guardar evidencia del escaneo (lista y/o resultado posterior) en `evidencia/evidencia-5.png`.
- Medium y Low quedan fuera, salvo que un upgrade para High/Critical las arrastre.

## Capabilities

### New Capabilities

- `seguridad-dependencias`: el proyecto se escanea con Snyk, remedia Critical/High y conserva las pruebas existentes.

### Modified Capabilities

- Ninguna. `pruebas-bdd`, `pruebas-integracion` y `pruebas-e2e` no cambian de requisitos; solo se vuelven a ejecutar.

## Impact

- `package.json` y `package-lock.json`: pines o upgrades (hoy `express: *` y `socket.io: *`).
- Posible script `snyk test` o uso de `npx snyk test`.
- `evidencia/evidencia-5.png`.
- El chat (rutas, eventos, `validateMessage`) no cambia de comportamiento a proposito.
