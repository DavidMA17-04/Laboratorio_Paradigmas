# pruebas-bdd Specification

## Purpose

Fija en pruebas unitarias BDD cada escenario de imagen, video, texto y scripts, para que `npm test` compruebe el contrato del chat.

## Requirements

### Requirement: Tests follow a given when then shape
Cada prueba unitaria de mensajes multimedia SHALL declarar un contexto, una accion y un resultado esperado.

#### Scenario: A reader can see the three steps
- **WHEN** se abre una prueba de un mensaje de imagen, video, texto o script
- **THEN** esa prueba nombra el contexto, la accion y el resultado esperado

### Requirement: Image scenarios have unit tests
La suite SHALL incluir una prueba unitaria por cada escenario de URL de imagen del chat.

#### Scenario: JPEG unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `http://image.com/image.jpg` como mensaje y espera una imagen, no el texto de la URL

#### Scenario: GIF unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `http://image.com/image.gif` como mensaje y espera una imagen, no el texto de la URL

### Requirement: YouTube scenarios have unit tests
La suite SHALL incluir una prueba unitaria del enlace de YouTube que el chat debe mostrar en un reproductor.

#### Scenario: Watch URL unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `https://www.youtube.com/watch?v=qYwlqx-JLok` como mensaje y espera un reproductor de ese video

### Requirement: Text and script scenarios have unit tests
La suite SHALL incluir pruebas unitarias de un mensaje de texto normal y de un mensaje que intenta insertar un script.

#### Scenario: Ordinary sentence unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia `hola a todos` como mensaje y espera texto sin imagen ni reproductor

#### Scenario: Script tag unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia un mensaje con una etiqueta script y espera texto sin ejecutar ni incrustar el script

#### Scenario: Script hidden in an image URL unit test
- **WHEN** se ejecuta `npm test`
- **THEN** existe una prueba que envia una URL de imagen con una etiqueta script y espera que no se incruste como imagen

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
