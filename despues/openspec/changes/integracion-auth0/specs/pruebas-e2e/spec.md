# Spec Delta

## ADDED Requirements

### Requirement: E2E tests establish Auth0 session before chat scenarios
The browser suite SHALL log in (or use an approved lab test strategy) before running image, video, and XSS scenarios.

#### Scenario: Authenticated user sends image
- **GIVEN** a logged-in test user on the chat page
- **WHEN** the user sends a known image URL
- **THEN** the image appears loaded in `#messages` as before auth

### Requirement: E2E covers unauthenticated access
The browser suite SHALL verify that chat actions are blocked without login.

#### Scenario: Guest cannot send
- **GIVEN** no Auth0 session in the browser
- **WHEN** the user attempts to send a message
- **THEN** the message is not posted to the chat list
