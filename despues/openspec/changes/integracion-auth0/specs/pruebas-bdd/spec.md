# Spec Delta

## ADDED Requirements

### Requirement: Auth flows have BDD-shaped unit or integration tests
Auth-related behavior SHALL be described with Given / When / Then steps consistent with existing multimedia BDD tests.

#### Scenario: Login scenario shape
- **GIVEN** a test documents Auth0 login for the chat
- **WHEN** a reader opens that test
- **THEN** the test names context, action, and expected outcome in Given/When/Then form

### Requirement: Nickname spoofing has a BDD test
The suite SHALL include a Given/When/Then test that a forged nombre in the payload does not override the verified identity.

#### Scenario: Spoofed nombre rejected
- **GIVEN** an authenticated user "Ana"
- **WHEN** a message is emitted with nombre "Evil" in the JSON payload
- **THEN** the observable nickname in the processed message is "Ana", not "Evil"

### Requirement: Unauthenticated socket has a BDD test
The suite SHALL include a Given/When/Then test for rejected anonymous socket access.

#### Scenario: No token no chat
- **GIVEN** auth is required on the server
- **WHEN** a client connects without a valid token
- **THEN** the client cannot participate in chat message exchange as an authenticated user
