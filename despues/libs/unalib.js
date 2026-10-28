// modulo de ejemplo.

module.exports = {


    // logica que valida si un telefono esta correcto...
    is_valid_phone: function (phone) {
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      // validacion Regex
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_url_image: function (url) {
      if (typeof url !== 'string') {
        return false;
      }
      var re = /^https?:\/\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+\.(?:jpg|jpeg|png|gif|bmp)(?:\?[^\s]*)?$/i;
      return re.test(url);
    },

    // Saca la URL de imagen de un enlace directo o de una pagina de busqueda (Bing, Google).
    extractImageUrl: function (value) {
      if (typeof value !== 'string') {
        return null;
      }

      var trimmed = value.trim();

      try {
        var parsed = new URL(trimmed);
        var keys = ['mediaurl', 'mediaUrl', 'imgurl', 'image', 'url'];
        for (var i = 0; i < keys.length; i++) {
          var param = parsed.searchParams.get(keys[i]);
          if (!param) {
            continue;
          }
          var nested = this.extractImageUrl(param);
          if (nested) {
            return nested;
          }
        }
      } catch (e) {
        // no es una URL absoluta; se sigue con el texto
      }

      if (this.is_valid_url_image(trimmed)) {
        return trimmed;
      }

      var decoded = trimmed;
      try {
        decoded = decodeURIComponent(trimmed.replace(/\+/g, '%20'));
      } catch (e) {
        decoded = trimmed;
      }

      if (this.is_valid_url_image(decoded)) {
        return decoded;
      }

      var imageInText = /https?:\/\/(?:(?!https?:\/\/)[^\s"'<>])+\.(?:jpg|jpeg|png|gif|bmp)(?:\?[^\s"'<>]*)?/i;
      var found = decoded.match(imageInText) || trimmed.match(imageInText);
      if (found) {
        var candidate = found[0].replace(/[.,;)]+$/, '');
        if (this.is_valid_url_image(candidate)) {
          return candidate;
        }
      }

      return null;
    },
  
    youtubeVideoPattern: function () {
      return /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:[?&][^\s]*)?$/i;
    },

    is_valid_yt_video: function (url) {
      if (typeof url !== 'string') {
        return false;
      }
      return this.youtubeVideoPattern().test(url);
    },
  
    getYTVideoId: function(url){
      if (typeof url !== 'string') {
        return null;
      }
      var match = url.match(this.youtubeVideoPattern());
      return match ? match[1] : null;
    },
  
    getEmbeddedCode: function (url){
      var id = this.getYTVideoId(url);
      if (!id) {
        return null;
      }
      var safeId = this.escapeHtml(id);
      return '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+safeId+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    },
  
    getImageTag: function(url){
      var tag = '<img src="'+this.escapeHtml(url)+'" style="max-height: 400px;max-width: 400px;">';
      return tag;
    },

    // true si el texto intenta insertar un script en el chat
    containsScript: function (value) {
      if (typeof value !== 'string') {
        return false;
      }
      var re = /<script\b|<\/script\b|javascript\s*:|on\w+\s*=/i;
      return re.test(value);
    },

    escapeHtml: function (value) {
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    // Quita protocolos y manejadores que escapeHtml deja como texto.
    neutralizeExecutable: function (value) {
      return String(value)
        .replace(/javascript\s*:/gi, '')
        .replace(/on\w+\s*=/gi, '');
    },

    cleanText: function (value) {
      return this.neutralizeExecutable(this.escapeHtml(value));
    },

    is_valid_hex_color: function (color) {
      if (typeof color !== 'string') {
        return false;
      }
      return /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(color);
    },
  
    // validarMensaje del laboratorio: clasifica medio seguro y limpia el resto.
    validateMessage: function(msg){
      if (!msg || typeof msg !== 'string') {
        return JSON.stringify({ mensaje: '' });
      }

      try {
        var obj = JSON.parse(msg);
        var mensaje = typeof obj.mensaje === 'string' ? obj.mensaje.trim() : '';
        var puedeIncrustar = !this.containsScript(mensaje);
        var imageUrl = puedeIncrustar ? this.extractImageUrl(mensaje) : null;

      if(imageUrl){
        console.log("Es una imagen!")
        obj.mensaje = this.getImageTag(imageUrl);
      }
      else if(puedeIncrustar && this.is_valid_yt_video(mensaje)){
        var embed = this.getEmbeddedCode(mensaje);
        if (embed) {
          console.log("Es un video!")
          obj.mensaje = embed;
        } else {
          console.log("Es un texto!")
          obj.mensaje = this.cleanText(mensaje);
        }
      }
      else{
        console.log("Es un texto!")
        obj.mensaje = this.cleanText(mensaje);
      }

      if (typeof obj.nombre === 'string') {
        obj.nombre = this.cleanText(obj.nombre);
      }
      if (typeof obj.color === 'string') {
        obj.color = this.is_valid_hex_color(obj.color) ? obj.color : '';
      }
      
      return JSON.stringify(obj);
      } catch (e) {
        console.log('Error processing message:', e);
        return JSON.stringify({ mensaje: this.escapeHtml(msg) });
      }
    }
  
  
  
    
    
  
  // fin del modulo
  };
  