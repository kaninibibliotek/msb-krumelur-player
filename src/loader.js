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

  function extractBehaviorFromName(name) {
    return /_([^_]+)\.png$/.exec(name)[1];
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
            var behaviorString = extractBehaviorFromName(path);
            var behavior = __behaviors__[behaviorString];

            if (!behavior) {
              behavior = __behaviors__.calm;
            }

            loadImage(path, function(texture) {
              callback(new Krumelur(texture, behavior));
            });
          }
        }
      };

      request.open('GET', constants.URL_RANDOM + amount, true);
    }
  };
})();
