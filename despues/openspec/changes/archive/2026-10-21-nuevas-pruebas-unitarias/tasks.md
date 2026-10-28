# Tasks

## 1. Imagenes

- [x] 1.1 En `test/test.js`, bajo `mensaje de imagen`, anadir pruebas Given / When / Then que envien `https://image.com/image.png`, `https://image.com/image.jpeg` y `https://image.com/image.bmp` a `validateMessage` y esperen un `<img>` con esa URL. `npm test` debe pasar esos tres casos.

## 2. Videos

- [x] 2.1 En `test/test.js`, bajo `mensaje de video`, anadir pruebas Given / When / Then que envien `https://youtu.be/qYwlqx-JLok`, `https://www.youtube.com/embed/qYwlqx-JLok` y `https://www.youtube.com/shorts/qYwlqx-JLok` a `validateMessage` y esperen un iframe con `https://www.youtube.com/embed/qYwlqx-JLok`. `npm test` debe pasar esos tres casos.

## 3. Inyeccion

- [x] 3.1 En `test/test.js`, bajo `mensaje de texto y scripts`, anadir pruebas Given / When / Then que envien `javascript:alert(1)` y un mensaje con `onerror=` a `validateMessage` y esperen texto sin script ejecutable, sin `onerror=`, sin `<img>` y sin `<iframe`. `npm test` debe pasar esos dos casos.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
