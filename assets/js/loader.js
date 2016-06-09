var loader = (function() {

  function loadImage(path, onLoad) {
    var image = PIXI.loader.resources[path];

    if (image) {
      onLoad(image.texture);
    } else {
      PIXI.loader.add(path).load(function(loader, resources) {
        onLoad(resources[path].texture);
      });
    }
  }

  return {
    loadEffect: function(effect, callback) {
      PIXI.loader.add(effect.urls).load(function(loader, resources) {
        effect.urls.forEach(function(url) {
          renderer.textureManager.updateTexture(resources[url].texture)
        });

        callback(new Effect(effect.urls, effect.trigger, effect.z));
      });
    },

    createKrumelur: function(imageUrl, behavior, callback) {
      loadImage(imageUrl, function(texture) {
        callback(new Krumelur(texture, behavior));
      });
    },

    requestActors: function(amount, callback) {
      var request = new XMLHttpRequest();

      if (amount === 0) {
        return;
      }

      request.onreadystatechange = function() {
        if (request.readyState === 1) {
          request.send();
        }

        if (request.readyState === 4 && request.status == 200) {
          var krumelurs = JSON.parse(request.response).results;

          for (var i = 0; i < krumelurs.length; i++) {
            var url      = krumelurs[i].url;
            var behavior = window.behaviors[krumelurs[i].behavior];

            if (!behavior) {
              behavior = window.behaviors[constants.DEFAULT_BEHAVIOR];
            }

            loadImage(url, function(texture) {
              callback(new Krumelur(texture, behavior));
            });
          }
        }
      };

      request.open('GET', constants.URL_RANDOM + amount, true);
    }
  };
})();
