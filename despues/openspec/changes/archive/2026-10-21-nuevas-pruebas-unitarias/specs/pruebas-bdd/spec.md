# Spec Delta

## ADDED Requirements

### Requirement: Additional image URL unit tests
La suite SHALL incluir pruebas unitarias Given / When / Then que envian un mensaje con URL https de png, jpeg y bmp y esperan una imagen incrustada.

#### Scenario: PNG unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://image.com/image.png` como mensaje y espera una imagen, no el texto de la URL

#### Scenario: JPEG unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://image.com/image.jpeg` como mensaje y espera una imagen, no el texto de la URL

#### Scenario: BMP unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://image.com/image.bmp` como mensaje y espera una imagen, no el texto de la URL

### Requirement: Additional video URL unit tests
La suite SHALL incluir pruebas unitarias Given / When / Then que envian un mensaje con enlace youtu.be, embed o shorts y esperan un reproductor incrustado.

#### Scenario: youtu.be unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://youtu.be/qYwlqx-JLok` como mensaje y espera un reproductor de ese video

#### Scenario: Embed unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://www.youtube.com/embed/qYwlqx-JLok` como mensaje y espera un reproductor de ese video

#### Scenario: Shorts unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://www.youtube.com/shorts/qYwlqx-JLok` como mensaje y espera un reproductor de ese video

### Requirement: Additional script injection unit tests
La suite SHALL incluir pruebas unitarias Given / When / Then que envian un mensaje con `javascript:` o un manejador `onerror` y esperan texto sin codigo ejecutable ni medio incrustado.

#### Scenario: javascript protocol unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia un mensaje con `javascript:alert(1)` y espera texto sin script ejecutable, imagen ni reproductor

#### Scenario: onerror handler unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia un mensaje con un manejador `onerror` y espera texto sin ese manejador ejecutable, imagen ni reproductor
