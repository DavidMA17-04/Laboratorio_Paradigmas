# Spec Delta

## Purpose

Fija en pruebas unitarias BDD cada escenario de imagen, video, texto y scripts, para que `npm test` compruebe el contrato del chat.

## ADDED Requirements

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
