# Tasks

## 1. Escaneo

- [ ] 1.1 Autenticar Snyk si hace falta (`snyk auth` o `SNYK_TOKEN`) y ejecutar `snyk test` (o `npx snyk test`) en la raiz. Verificar que el comando termina y deja una lista de vulnerabilidades (o dice que no hay).
- [ ] 1.2 Conservar esa salida (archivo o captura) y verificar que se pueden identificar los hallazgos Critical y High.

## 2. Remediacion

- [ ] 2.1 Con un agente de IA, actualizar o hacer override de cada paquete Critical/High (sin `.snyk` ignore). Verificar en `package.json` / `package-lock.json` que las versiones cambiaron.
- [ ] 2.2 Fijar `express` y `socket.io` a rangos parcheados en vez de `*`. Verificar que `package.json` ya no los deja en `*`.
- [ ] 2.3 Volver a ejecutar `snyk test` y verificar que no quedan hallazgos Critical ni High.

## 3. Regresion y evidencia

- [ ] 3.1 Ejecutar `npm test` y verificar que Mocha termina en 0.
- [ ] 3.2 Ejecutar `npm run test:integration` y verificar que Jest termina en 0.
- [ ] 3.3 Ejecutar `npm run test:e2e` y verificar que Playwright (Chromium) termina en 0.
- [ ] 3.4 Guardar `evidencia/evidencia-5.png` del `snyk test` (lista o corrida sin Critical/High) y verificar que el archivo se puede abrir.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
