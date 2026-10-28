# Proposal

## Why

El cambio `mostrar-imagenes-y-videos` ya define qué debe verse cuando el mensaje es una imagen, un video o texto, pero las pruebas actuales cubren solo detectores sueltos y un caso de script. Falta una suite en estilo BDD que fije cada escenario como prueba unitaria antes de aplicar ese cambio.

## What Changes

- Las pruebas unitarias del chat se escriben en estilo BDD: un escenario, un contexto y un resultado esperado.
- Cada escenario de imagen, video de YouTube, texto y scripts tiene al menos una prueba unitaria.
- `npm test` sigue siendo el comando que ejecuta esa suite.
- Esta propuesta no cambia el contrato de pantalla del chat. Ese contrato sigue en `mostrar-imagenes-y-videos`.
- Queda fuera de alcance añadir Cucumber, archivos `.feature` o un segundo framework de pruebas.

## Capabilities

### New Capabilities

- `pruebas-bdd`: cómo se verifican con pruebas unitarias BDD los mensajes de imagen, video, texto y scripts.

### Modified Capabilities

- Ninguna. Todavía no hay specs publicadas en `openspec/specs/`. El comportamiento del chat vive en el cambio `mostrar-imagenes-y-videos`.

## Impact

- `test/test.js`: reorganizar y ampliar la suite al estilo BDD, sin quitar los casos de teléfono, imagen, YouTube y scripts que ya existen.
- `package.json`: Mocha ya está. No se añade otra herramienta de BDD.
- Depende de `mostrar-imagenes-y-videos` para que las pruebas de imagen, reproductor y texto pasen al aplicar ambos cambios.
