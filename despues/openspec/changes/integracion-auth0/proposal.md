# Proposal

## Why

UNA Chat identifica usuarios con un nickname libre en el cliente y acepta cualquier conexión Socket.IO, sin verificar identidad. Para Laboratorio 6 se requiere autenticación real con la SPA **UNA-chat** en Auth0, sin reemplazar Express, HTML/jQuery ni Socket.IO ni regresar las capacidades de mensajes multimedia y XSS del Lab 5.

## What Changes

- Login y logout con Auth0 SPA SDK (PKCE) en el cliente; la UI de chat solo está disponible con sesión válida.
- El access token JWT se envía en el handshake de Socket.IO; el servidor lo valida (issuer, audience, firma JWKS) antes de registrar handlers de mensajes.
- Conexiones o emisiones sin token válido se rechazan; el nickname mostrado proviene de claims verificados (p. ej. `name` o `nickname`), no del campo editable del cliente.
- `validateMessage` / multimedia / XSS en `unalib.js` se conservan sin cambiar el contrato de mensajes ya probado.
- Pruebas de integración, e2e y BDD se adaptan (token de prueba, bypass solo en entorno test, o flujo Auth0 documentado).
- Configuración vía variables de entorno (dominio, client id, audience); sin secretos en el repositorio.

## Capabilities

### New Capabilities

- `autenticacion-auth0`: sesión Auth0, identidad verificada, protección de Socket.IO y rechazo de anónimos.

### Modified Capabilities

- `pruebas-integracion`: escenarios que hoy conectan socket anónimo deben reflejar auth obligatoria o modo test.
- `pruebas-e2e`: flujo UI debe incluir login (o estrategia de laboratorio acordada) antes de chatear.
- `pruebas-bdd`: escenarios Given/When/Then para login, socket rechazado sin token y nickname no suplantable.

## Impact

- `index.html`: Auth0 SPA SDK, flujo login/logout, socket `auth: { token }`, UI de nickname.
- `server.js`: middleware Socket.IO para JWT Auth0; posible endpoint de config pública (solo ids/dominio).
- `package.json`: dependencias cliente/servidor para Auth0 y validación JWT (en fase apply).
- `.env` local (no versionado): `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_AUDIENCE`, opcional `AUTH_DISABLED` solo tests.
- Panel Auth0: callback, logout, web origins para `http://localhost:3000` (o puerto usado).
- Sin cambios funcionales requeridos en `libs/unalib.js` salvo no confiar en `nombre` del payload del cliente.
