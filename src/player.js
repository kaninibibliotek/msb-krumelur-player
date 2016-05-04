var player = (function() {

  var renderer = PIXI.autoDetectRenderer(
    5760,
    1080,
    {
      view:        document.getElementsByTagName('canvas')[0],
      transparent: true
    }
  );

  var stage = new Stage();

  var testMask;
  var testMaskVertices = [];

  // Animation control variables
  var masterSpeed = 1;
  var masterSize  = 1;
  var showMasks   = false;

  maskVertices.forEach(function(vertices) {
    stage.addActor(new Scenery(vertices));
  });

  // Draw loop
  function draw() {
    requestAnimationFrame(draw);

    stage.update(masterSpeed, masterSize);

    renderer.render(stage);
  }

  requestAnimationFrame(draw);

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
    stage.addActor(new Effect(texture, 3));
  });

  // "Server" "communication"
  function addKrumelur(json) {
    loadImage('../images/bros.jpg', function(texture) {
      stage.addActor(new Krumelur(texture, JSON.parse(json)));
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

  // API
  return {
    setSpeed: function(newSpeed) {
      masterSpeed = Math.max(0.1, Math.min(newSpeed, 2));
    },

    setSize: function(newSize) {
      masterSize = Math.max(0.1, Math.min(newSize, 2));
    },

    showMasks: function(show) {
      showMasks = show;
    },

    addTestMaskPoint: function(x, y) {
      testMaskVertices.push({
        x: x,
        y: y
      });

      stage.removeActor(testMask);

      testMask = new TestMask(testMaskVertices);

      stage.addActor(testMask);

      settings.showJsonMask(testMaskVertices);
    },

    removeTestMask: function() {
      stage.removeActor(testMask);

      testMaskVertices = [];
    }
  }
})();
