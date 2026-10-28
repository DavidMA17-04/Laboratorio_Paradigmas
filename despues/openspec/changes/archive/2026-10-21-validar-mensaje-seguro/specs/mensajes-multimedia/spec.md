# Spec Delta

## ADDED Requirements

### Requirement: Only valid media URLs are embedded
El chat SHALL incrustar un medio solo cuando el mensaje es una URL de imagen valida o un enlace de YouTube valido. Cualquier otra URL SHALL enviarse como texto limpio.

#### Scenario: Plain web page URL
- **WHEN** el usuario envia `https://example.com` como mensaje
- **THEN** el chat muestra ese texto y no inserta imagen ni reproductor

### Requirement: Nested image URL is shown as an image
El chat SHALL mostrar la imagen cuando el mensaje es un enlace de busqueda que contiene una URL http o https de imagen.

#### Scenario: Bing mediaurl
- **WHEN** el usuario envia un enlace de Bing cuyo parametro `mediaurl` es una URL que termina en jpg
- **THEN** el chat muestra esa imagen y no el texto del enlace de busqueda

## MODIFIED Requirements

### Requirement: Scripts are not embedded
El chat SHALL quitar del mensaje, del nombre y del color cualquier script o atributo ejecutable, y SHALL impedir que ese codigo se incruste como medio o se ejecute.

#### Scenario: Script tag in the message
- **WHEN** el usuario envía un mensaje que contiene una etiqueta script
- **THEN** el chat muestra el contenido como texto y no ejecuta el script

#### Scenario: Script hidden in an image URL
- **WHEN** el usuario envía una URL de imagen que incluye una etiqueta script
- **THEN** el chat no incrusta esa URL como imagen y no ejecuta el script

#### Scenario: Event handler in the color
- **WHEN** el usuario envia un color que incluye un manejador como `onfocus`
- **THEN** el chat no aplica ese color y no ejecuta el manejador
