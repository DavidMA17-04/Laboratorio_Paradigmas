# pruebas-e2e Specification

## Purpose

Automatiza el recorrido del usuario en el chat real: el navegador habla con el backend y comprueba imagen, video y que un script no se ejecute.

## Requirements

### Requirement: Image URL appears loaded in the chat
Cuando el usuario envia una URL de imagen valida y estable, el chat SHALL mostrar esa imagen y SHALL esperar a que termine de cargar.

#### Scenario: Image finishes loading
- **WHEN** el usuario escribe una URL http(s) de imagen conocida y pulsa Send
- **THEN** aparece un elemento imagen en la lista de mensajes y esa imagen llega a estado cargado

### Requirement: Video URL shows a loaded player
Cuando el usuario envia una URL de YouTube valida y estable, el chat SHALL mostrar un reproductor y SHALL cargar el contenido del video.

#### Scenario: Player appears
- **WHEN** el usuario escribe un enlace watch de YouTube conocido y pulsa Send
- **THEN** aparece un iframe de YouTube en el chat y el marco tiene contenido cargado

### Requirement: Script does not open a dialog
Cuando el usuario envia un mensaje con etiqueta script, el chat SHALL no abrir un cuadro de dialogo y SHALL mostrar el contenido saneado, sin imagen ni reproductor.

#### Scenario: Alert is not shown
- **WHEN** el usuario envia `hola <script>alert("xss")</script>`
- **THEN** no aparece un alert del navegador y el mensaje se ve como texto sin esa etiqueta ejecutable

### Requirement: Browser suite can run against the live chat
La suite de extremo a extremo SHALL ejecutarse contra el frontend servido por el backend en marcha y SHALL poder dejar evidencia de una corrida aprobada.

#### Scenario: Headed run finishes
- **WHEN** el servidor del chat esta activo y se corre la suite de navegador en Chromium
- **THEN** los casos de esta capacidad pasan y queda una captura de esa corrida
