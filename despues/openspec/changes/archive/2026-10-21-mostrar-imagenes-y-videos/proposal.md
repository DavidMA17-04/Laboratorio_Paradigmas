# Proposal

## Why

El campo de texto del chat ya acepta cualquier cadena, pero una URL de imagen o de video se muestra como texto plano cuando la detección falla. Los usuarios necesitan pegar esa URL y ver el contenido en el chat, no el enlace crudo.

## What Changes

- El mensaje que es una URL de imagen se muestra como imagen dentro del chat.
- El mensaje que es una URL de video de YouTube se muestra con un reproductor incrustado.
- Un mensaje que no es ninguna de esas URLs sigue viéndose como texto.
- Un mensaje que intenta insertar un script no se incrusta como medio ni se ejecuta.
- Quedan fuera de alcance los archivos de video directos (por ejemplo `.mp4`), otras plataformas de video y la subida de archivos. "Video" significa un enlace de YouTube.

## Capabilities

### New Capabilities

- `mensajes-multimedia`: cómo el chat decide si un mensaje de texto es una imagen, un video de YouTube o texto, y cómo lo presenta.

### Modified Capabilities

- Ninguna. El proyecto todavía no tiene specs.

## Impact

- `libs/unalib.js`: detección de imagen y de YouTube, y armado del HTML que se reenvía.
- `server.js`: sigue pasando cada mensaje por `validateMessage` antes de emitirlo a todos.
- `index.html`: el mensaje devuelto se pinta en la lista del chat.
- `test/test.js`: las pruebas deben cubrir imagen, video y el rechazo de scripts.
