# pruebas-integracion Specification

## Purpose

Comprueba que el backend de Node.js y una-lib trabajan juntos: la ruta HTTP del chat responde y el evento real de mensaje pasa por la validacion antes de reenviarse.

## Requirements

### Requirement: HTTP chat entry is reachable
La suite de integracion SHALL pegar al metodo HTTP que sirve el chat y SHALL comprobar el codigo de estado y el cuerpo.

#### Scenario: GET root
- **WHEN** se envia `GET /` al backend
- **THEN** la respuesta tiene estado 200 y entrega la pagina del chat

### Requirement: Valid image URL is accepted through the live event
Cuando un cliente envia por el evento real de chat una URL de imagen valida, el backend SHALL aceptar el mensaje y SHALL devolver contenido que incrusta esa imagen, prueba de que llamo a la validacion de una-lib.

#### Scenario: Valid image through the chat event
- **WHEN** un cliente emite el evento de mensaje con `http://image.com/image.jpg`
- **THEN** el backend reenvia el mismo evento con un mensaje que contiene una imagen y no el texto crudo de la URL

### Requirement: Valid video URL is accepted through the live event
Cuando un cliente envia por el evento real de chat una URL de video de YouTube valida, el backend SHALL aceptar el mensaje y SHALL devolver un reproductor.

#### Scenario: Valid YouTube through the chat event
- **WHEN** un cliente emite el evento de mensaje con `https://www.youtube.com/watch?v=qYwlqx-JLok`
- **THEN** el backend reenvia el mismo evento con un reproductor de ese video

### Requirement: Disallowed or script input is sanitized
Cuando un cliente envia una URL no permitida o un script por el evento real de chat, el backend SHALL devolver contenido saneado y SHALL no incrustar medio ni codigo ejecutable.

#### Scenario: Script is sanitized
- **WHEN** un cliente emite el evento de mensaje con una etiqueta script
- **THEN** la respuesta no contiene esa etiqueta ejecutable ni imagen ni reproductor

#### Scenario: Non-media URL stays text
- **WHEN** un cliente emite el evento de mensaje con `https://example.com`
- **THEN** la respuesta muestra ese texto y no incrusta imagen ni reproductor

### Requirement: Integration suite closes what it opens
La suite de integracion SHALL poder ejecutarse de extremo a extremo y SHALL cerrar el servidor y las conexiones que abrio.

#### Scenario: Suite finishes clean
- **WHEN** se ejecuta la suite de integracion del backend
- **THEN** todos los casos de esta capacidad pasan y no queda un servidor de prueba escuchando
