# Spec Delta

## Purpose

Garantiza que solo usuarios autenticados con Auth0 participan en UNA Chat y que la identidad mostrada no puede falsificarse desde el cliente.

## ADDED Requirements

### Requirement: User can sign in with Auth0
The chat application SHALL require an Auth0 SPA login before the user can send or receive chat messages.

#### Scenario: Unauthenticated user sees login
- **GIVEN** the user has no valid Auth0 session
- **WHEN** the user opens the chat page
- **THEN** the user is prompted to log in and cannot send messages

#### Scenario: Successful login unlocks chat
- **GIVEN** the user completes Auth0 login for application UNA-chat
- **WHEN** the session is established in the browser
- **THEN** the chat form is enabled and the user sees their authenticated display name

### Requirement: User can sign out
The chat application SHALL allow the authenticated user to end the session and return to an unauthenticated state.

#### Scenario: Logout disables chat
- **GIVEN** the user is logged in
- **WHEN** the user chooses logout
- **THEN** the Auth0 session ends and the chat no longer accepts sends until login again

### Requirement: Socket connections require a valid access token
The server SHALL validate an Auth0 access token during the Socket.IO connection handshake and SHALL reject connections without a valid token.

#### Scenario: Connection with valid token
- **GIVEN** the client provides a valid JWT in the socket handshake
- **WHEN** the server accepts the connection
- **THEN** the client may register for chat message events

#### Scenario: Connection without token is rejected
- **GIVEN** the client omits or sends an invalid token
- **WHEN** the client attempts to connect
- **THEN** the connection fails or the server disconnects the socket without processing chat events

### Requirement: Display name comes from verified identity
The server SHALL derive the nickname shown in chat from verified token claims and SHALL ignore client-supplied nickname used for impersonation.

#### Scenario: Client cannot spoof another user name
- **GIVEN** an authenticated user whose token name is "Alice"
- **WHEN** the client emits a message JSON with nombre "Bob"
- **THEN** broadcast messages show "Alice" (or the configured claim), not "Bob"

### Requirement: Message validation behavior is preserved
Authenticated chat SHALL still pass message payloads through the existing multimedia and XSS validation before broadcast.

#### Scenario: Image URL still embeds after auth
- **GIVEN** an authenticated connected client
- **WHEN** the client sends a valid image URL as message text
- **THEN** recipients receive sanitized embedded image content as today

#### Scenario: Script input still sanitized after auth
- **GIVEN** an authenticated connected client
- **WHEN** the client sends a message containing a script tag
- **THEN** recipients receive sanitized text without executable script or unwanted embeds
