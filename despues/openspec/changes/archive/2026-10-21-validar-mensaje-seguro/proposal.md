# Proposal

## Why

`validateMessage` (el `validarMensaje` de una-lib) ya clasifica imagen, YouTube y texto, pero un script o un color malicioso puede seguir llegando al HTML del chat, y un enlace de búsqueda no se trata como imagen. El laboratorio pide que ese método impida inyecciones, quite código peligroso y solo acepte URLs de imagen o video comprobadas con regex.

## What Changes

- `validateMessage` limpia nombre, color y mensaje para que no quede HTML ejecutable (scripts, manejadores `on*`, `javascript:`).
- Solo se incrusta un medio si la URL pasa la validación de imagen o de video de YouTube. Cualquier otra URL o texto se envía como texto limpio.
- Una URL de búsqueda que trae adentro una imagen válida (por ejemplo `mediaurl` de Bing) cuenta como imagen.
- El color del usuario solo se acepta si es un hexadecimal de 3 o 6 dígitos. Si no, se ignora.
- Las pruebas unitarias BDD cubren script, URL falsa, imagen directa, YouTube y un enlace de búsqueda con imagen.
- El cliente deja de armar HTML con el color crudo, para que la limpieza del método no se pierda al pintar.

## Capabilities

### New Capabilities

- Ninguna.

### Modified Capabilities

- `mensajes-multimedia`: el método de validación debe quitar código malicioso y solo incrustar URLs de imagen o video válidas.
- `pruebas-bdd`: esas reglas nuevas tienen pruebas Given / When / Then.

## Impact

- `libs/unalib.js`: `validateMessage` y las regex de imagen, YouTube y scripts.
- `index.html`: pintar nombre y color sin reabrir un atributo HTML.
- `test/test.js`: casos BDD del método.
