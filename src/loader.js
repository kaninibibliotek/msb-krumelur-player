var loader = (function() {

  var behaviors = [
    'http://localhost:3000/behaviors/varelsen.json',
    'http://localhost:3000/behaviors/anim1.json',
    'http://localhost:3000/behaviors/anim2.json'
  ];

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
      request.onreadystatechange = function() {
        if (request.readyState === 1) {
          request.send();
        }

        if (request.readyState === 4 && request.status == 200) {
          var actors = [];

          loadImage('../images/bros.jpg', function(texture) {
            actors.push(new Krumelur(texture, JSON.parse(request.response)));
            callback(actors);
          });
        }
      };

      var count = 0;

      var intervalId = setInterval(function() {
        request.open('GET', behaviors[Math.floor(Math.random() * behaviors.length)], true);

        if (++count >= amount) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  };
})();
