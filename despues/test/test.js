var val = require('../libs/unalib');
var assert = require('assert');

function mensajeChat(mensaje, extras) {
  extras = extras || {};
  return JSON.stringify({
    nombre: extras.nombre || 'Ana',
    mensaje: mensaje,
    color: extras.color || '#112233'
  });
}

describe('unalib', function(){

  describe('telefono', function(){

    it('dado un numero valido, cuando se valida, entonces es aceptado', function(){
      // Given
      var telefono = '8297-8547';

      // When
      var esValido = val.is_valid_phone(telefono);

      // Then
      assert.equal(esValido, true);
    });

    it('dado un numero con letra, cuando se valida, entonces es rechazado', function(){
      // Given
      var telefono = '8297p-8547';

      // When
      var esValido = val.is_valid_phone(telefono);

      // Then
      assert.equal(esValido, false);
    });

  });

  describe('detector de imagen', function(){

    it('dada una URL jpg, cuando se valida, entonces es una imagen', function(){
      // Given
      var url = 'http://image.com/image.jpg';

      // When
      var esImagen = val.is_valid_url_image(url);

      // Then
      assert.equal(esImagen, true);
    });

    it('dada una URL gif, cuando se valida, entonces es una imagen', function(){
      // Given
      var url = 'http://image.com/image.gif';

      // When
      var esImagen = val.is_valid_url_image(url);

      // Then
      assert.equal(esImagen, true);
    });

    it('dada una frase que contiene una URL, cuando se valida, entonces no es una imagen', function(){
      // Given
      var frase = 'mira http://image.com/image.jpg';

      // When
      var esImagen = val.is_valid_url_image(frase);

      // Then
      assert.equal(esImagen, false);
    });

  });

  describe('detector de YouTube', function(){

    it('dada una URL watch, cuando se valida, entonces es un video', function(){
      // Given
      var url = 'https://www.youtube.com/watch?v=qYwlqx-JLok';

      // When
      var esVideo = val.is_valid_yt_video(url);

      // Then
      assert.equal(esVideo, true);
    });

    it('dada una URL watch con lista, cuando se valida, entonces es un video', function(){
      // Given
      var url = 'https://www.youtube.com/watch?v=32F2d-wj4Xw&list=RD32F2d-wj4Xw&start_radio=1';

      // When
      var esVideo = val.is_valid_yt_video(url);
      var id = val.getYTVideoId(url);

      // Then
      assert.equal(esVideo, true);
      assert.equal(id, '32F2d-wj4Xw');
    });

    it('dadas las formas watch, youtu.be, embed y v, cuando se extrae el id, entonces es el mismo', function(){
      // Given
      var id = 'qYwlqx-JLok';

      // When
      var ids = [
        val.getYTVideoId('https://www.youtube.com/watch?v=' + id),
        val.getYTVideoId('https://youtu.be/' + id),
        val.getYTVideoId('https://www.youtube.com/embed/' + id),
        val.getYTVideoId('https://www.youtube.com/v/' + id)
      ];

      // Then
      assert.deepEqual(ids, [id, id, id, id]);
    });

    it('dada una URL watch sin id, cuando se extrae, entonces no lanza y no hay id', function(){
      // Given
      var url = 'https://www.youtube.com/watch?v=';

      // When
      var id = val.getYTVideoId(url);

      // Then
      assert.equal(id, null);
      assert.equal(val.is_valid_yt_video(url), false);
    });

  });

  describe('mensaje de imagen', function(){

    it('dado un mensaje jpg, cuando se valida, entonces se muestra la imagen', function(){
      // Given
      var url = 'http://image.com/image.jpg';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<img\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf(url) !== -1, true);
      assert.equal(salida.mensaje === url, false);
    });

    it('dado un mensaje gif, cuando se valida, entonces se muestra la imagen', function(){
      // Given
      var url = 'http://image.com/image.gif';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<img\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf(url) !== -1, true);
      assert.equal(salida.mensaje === url, false);
    });

    it('dado un enlace de Bing con mediaurl jpg, cuando se valida, entonces se muestra la imagen', function(){
      // Given
      var imagen = 'https://image.com/photo.jpg';
      var url = 'https://www.bing.com/images/search?view=detailV2&mediaurl=' + encodeURIComponent(imagen);
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<img\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf(imagen) !== -1, true);
      assert.equal(/<iframe\b/i.test(salida.mensaje), false);
    });

    it('dado un mensaje png, cuando se valida, entonces se muestra la imagen', function(){
      // Given
      var url = 'https://image.com/image.png';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<img\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf(url) !== -1, true);
      assert.equal(salida.mensaje === url, false);
    });

    it('dado un mensaje jpeg, cuando se valida, entonces se muestra la imagen', function(){
      // Given
      var url = 'https://image.com/image.jpeg';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<img\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf(url) !== -1, true);
      assert.equal(salida.mensaje === url, false);
    });

    it('dado un mensaje bmp, cuando se valida, entonces se muestra la imagen', function(){
      // Given
      var url = 'https://image.com/image.bmp';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<img\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf(url) !== -1, true);
      assert.equal(salida.mensaje === url, false);
    });

  });

  describe('mensaje de video', function(){

    it('dado un watch con lista, cuando se valida, entonces se muestra el reproductor', function(){
      // Given
      var url = 'https://www.youtube.com/watch?v=32F2d-wj4Xw&list=RD32F2d-wj4Xw&start_radio=1';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<iframe\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf('https://www.youtube.com/embed/32F2d-wj4Xw') !== -1, true);
    });

    it('dado un watch de YouTube, cuando se valida, entonces se muestra el reproductor', function(){
      // Given
      var url = 'https://www.youtube.com/watch?v=qYwlqx-JLok';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<iframe\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf('https://www.youtube.com/embed/qYwlqx-JLok') !== -1, true);
      assert.equal(salida.nombre, 'Ana');
      assert.equal(salida.color, '#112233');
    });

    it('dado un watch sin id, cuando se valida, entonces queda texto con nombre y color', function(){
      // Given
      var entrada = mensajeChat('https://www.youtube.com/watch?v=');

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<iframe\b/i.test(salida.mensaje), false);
      assert.equal(salida.nombre, 'Ana');
      assert.equal(salida.color, '#112233');
    });

    it('dado un enlace youtu.be, cuando se valida, entonces se muestra el reproductor', function(){
      // Given
      var url = 'https://youtu.be/qYwlqx-JLok';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<iframe\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf('https://www.youtube.com/embed/qYwlqx-JLok') !== -1, true);
    });

    it('dado un enlace embed, cuando se valida, entonces se muestra el reproductor', function(){
      // Given
      var url = 'https://www.youtube.com/embed/qYwlqx-JLok';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<iframe\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf('https://www.youtube.com/embed/qYwlqx-JLok') !== -1, true);
    });

    it('dado un enlace shorts, cuando se valida, entonces se muestra el reproductor', function(){
      // Given
      var url = 'https://www.youtube.com/shorts/qYwlqx-JLok';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(/<iframe\b/i.test(salida.mensaje), true);
      assert.equal(salida.mensaje.indexOf('https://www.youtube.com/embed/qYwlqx-JLok') !== -1, true);
    });

  });

  describe('mensaje de texto y scripts', function(){

    it('dado un saludo, cuando se valida, entonces se muestra como texto', function(){
      // Given
      var entrada = mensajeChat('hola a todos');

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(salida.mensaje, 'hola a todos');
      assert.equal(/<img\b/i.test(salida.mensaje), false);
      assert.equal(/<iframe\b/i.test(salida.mensaje), false);
    });

    it('dada una URL que no es medio, cuando se valida, entonces se muestra como texto', function(){
      // Given
      var url = 'https://example.com';
      var entrada = mensajeChat(url);

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(salida.mensaje, url);
      assert.equal(/<img\b/i.test(salida.mensaje), false);
      assert.equal(/<iframe\b/i.test(salida.mensaje), false);
    });

    it('dado un mensaje con etiqueta script, cuando se valida, entonces no se incrusta el script', function(){
      // Given
      var entrada = mensajeChat('hola <script>alert("xss")</script>', {
        nombre: 'Ana<script>alert(1)</script>'
      });

      // When
      var salida = val.validateMessage(entrada);

      // Then
      assert.equal(/<script/i.test(salida), false);
      assert.equal(/<\/script/i.test(salida), false);
      assert.equal(/<img\b/i.test(salida), false);
      assert.equal(/<iframe\b/i.test(salida), false);
    });

    it('dada una URL de imagen que esconde un script, cuando se valida, entonces no se muestra como imagen', function(){
      // Given
      var entrada = mensajeChat('http://image.com/a.jpg"><script>alert(1)</script>');

      // When
      var salida = val.validateMessage(entrada);

      // Then
      assert.equal(/<script/i.test(salida), false);
      assert.equal(/<img\b/i.test(salida), false);
      assert.equal(/<iframe\b/i.test(salida), false);
    });

    it('dado un color con onfocus, cuando se valida, entonces no se aplica el color', function(){
      // Given
      var entrada = mensajeChat('hola', {
        color: "red' onfocus='alert(1)"
      });

      // When
      var salida = JSON.parse(val.validateMessage(entrada));

      // Then
      assert.equal(salida.color, '');
      assert.equal(/onfocus/i.test(JSON.stringify(salida)), false);
    });

    it('dado un mensaje con javascript:, cuando se valida, entonces no se incrusta codigo', function(){
      // Given
      var entrada = mensajeChat('javascript:alert(1)');

      // When
      var salida = val.validateMessage(entrada);

      // Then
      assert.equal(/<script/i.test(salida), false);
      assert.equal(/<img\b/i.test(salida), false);
      assert.equal(/<iframe\b/i.test(salida), false);
    });

    it('dado un mensaje con onerror, cuando se valida, entonces no se incrusta el manejador', function(){
      // Given
      var entrada = mensajeChat('<img src=x onerror=alert(1)>');

      // When
      var salida = val.validateMessage(entrada);

      // Then
      assert.equal(/onerror=/i.test(salida), false);
      assert.equal(/<script/i.test(salida), false);
      assert.equal(/<img\b/i.test(salida), false);
      assert.equal(/<iframe\b/i.test(salida), false);
    });

  });

  describe('identidad Auth0', function(){

    var authHelpers = require('../libs/auth-config');
    var auth = require('../libs/auth');

    it('dado un token con name, cuando se obtiene el nombre visible, entonces se usa name', function(){
      // Given
      var claims = { name: 'Ana', nickname: 'ana_nick', sub: 'auth0|1' };

      // When
      var visible = authHelpers.displayNameFromClaims(claims);

      // Then
      assert.equal(visible, 'Ana');
    });

    it('dado un token sin name pero con nickname, cuando se obtiene el nombre visible, entonces se usa nickname', function(){
      // Given
      var claims = { nickname: 'bob_nick', sub: 'auth0|2' };

      // When
      var visible = authHelpers.displayNameFromClaims(claims);

      // Then
      assert.equal(visible, 'bob_nick');
    });

    it('dado un payload con nombre falsificado, cuando se aplica identidad verificada, entonces el nombre queda fijado', function(){
      // Given
      var entrada = JSON.stringify({ nombre: 'Evil', mensaje: 'hola', color: '#112233' });

      // When
      var salida = auth.applyVerifiedNombre(entrada, 'Ana');

      // Then
      var obj = JSON.parse(salida);
      assert.equal(obj.nombre, 'Ana');
    });

    it('dado un token invalido con Host de socket, cuando se verifica JWT, entonces no falla por Host header', function(done){
      process.env.NODE_ENV = 'production';
      delete require.cache[require.resolve('../libs/auth')];
      var authProd = require('../libs/auth');
      var fake = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRlc3QifQ.eyJzdWIiOiJ0In0.sig';
      var incoming = { headers: { host: 'localhost:3000' }, url: '/socket.io/', method: 'GET' };
      authProd.verifyAccessToken(fake, function (err) {
        process.env.NODE_ENV = 'test';
        assert.ok(err);
        assert.match(String(err.message), /key|token|JWT/i);
        done();
      }, incoming);
    });

  });

});
