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

  loadImage('../images/explosion.jpg', function(texture) {
    player.addActor(new Effect(texture, 3));
  });

  // "Server" "communication"
  function addKrumelur(json) {
    loadImage('../images/bros.jpg', function(texture) {
      player.addActor(new Krumelur(texture, JSON.parse(json)));
    });
  }

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === 1) {
      request.send();
    }

    if (request.readyState === 4 && request.status == 200) {
      addKrumelur(request.response);
    }
  };

  request.open('GET', 'http://localhost:3000/behaviors/varelsen.json', true);

  var count = 0;

  var intervalId = setInterval(function() {
    request.open('GET', 'http://localhost:3000/behaviors/anim1.json', true);

    if (++count >= 20) {
      clearInterval(intervalId);
    }
  }, 200);

  return {
    // TODO player should ask loader for stuff like "give me more krumelurs"
  };
})();
