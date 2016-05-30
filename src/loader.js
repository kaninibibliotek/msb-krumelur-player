var loader = (function() {

  var request = new XMLHttpRequest();

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
    requestActors: function(amount, callback) {
      if (amount === 0) {
        return;
      }

      request.onreadystatechange = function() {
        if (request.readyState === 1) {
          request.send();
        }

        if (request.readyState === 4 && request.status == 200) {
          var paths = JSON.parse(request.response);

          for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            var behavior = /_([^_]+)\.png$/.exec(path)[1];

            loadImage(path, function(texture) {
              callback(new Krumelur(texture, __behaviors__[behavior]));
            });
          }
        }
      };

      request.open('GET', constants.URL_RANDOM + amount, true);
    }
  };
})();
