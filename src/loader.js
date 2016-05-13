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
          var actors = [];

          loadImage('/images/bros.jpg', function(texture) {
            var krumelurer = JSON.parse(request.response);

            for (var i = 0; i < krumelurer.length; i++) {
              actors.push(new Krumelur(texture, krumelurer[i]));
            }
            callback(actors);
          });
        }
      };

      request.open('GET', '/krumelurer/' + amount, true);
    }
  };
})();
