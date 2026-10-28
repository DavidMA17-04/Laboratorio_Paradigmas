# Spec Delta

## ADDED Requirements

### Requirement: validateMessage security has unit tests
La suite SHALL incluir pruebas unitarias Given / When / Then de `validateMessage` para script, URL que no es medio, imagen anidada y color inseguro.

#### Scenario: Script is stripped
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia un mensaje con etiqueta script y espera texto sin esa etiqueta ejecutable

#### Scenario: Non-media URL stays text
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://example.com` y espera texto sin imagen ni reproductor

#### Scenario: Nested image URL unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia un enlace con `mediaurl` a un jpg y espera una imagen

#### Scenario: Unsafe color unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia un color con `onfocus` y espera que ese manejador no quede ejecutable
