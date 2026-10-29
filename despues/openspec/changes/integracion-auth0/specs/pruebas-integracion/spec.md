# Spec Delta

## ADDED Requirements

### Requirement: Integration tests authenticate sockets when auth is enabled
When authentication is enabled, the integration suite SHALL connect clients with a valid access token before exercising chat events.

#### Scenario: Chat event tests use auth
- **GIVEN** the backend runs with Auth0 validation enabled
- **WHEN** integration tests emit `Evento-Mensaje-Server`
- **THEN** each test client connects with a token accepted by the server

### Requirement: Integration tests cover rejected anonymous sockets
The integration suite SHALL include a case that proves an unauthenticated socket cannot complete the chat flow.

#### Scenario: Anonymous emit fails or disconnects
- **GIVEN** the backend runs with Auth0 validation enabled
- **WHEN** a client connects without a valid token and emits a chat message
- **THEN** the client does not receive a successful broadcast of that message as an authenticated participant would
