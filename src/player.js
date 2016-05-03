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
  var hasFullMask = false;

  maskVertices.forEach(function(vertices) {
    var graphics = new PIXI.Graphics();
    var polygon  = [];

    vertices.forEach(function(vertex) {
      polygon.push(vertex.x);
      polygon.push(vertex.y);
    });

    graphics.lineStyle(1, 0x0000FF, 1);
    graphics.beginFill(0xFF0000, 1);

    graphics.drawPolygon(polygon);

    graphics.endFill();

    stage.addActor(new Scenery(graphics, 2));
  });

  // Draw loop
  function draw() {
    requestAnimationFrame(draw);

    stage.update(masterSpeed, masterSize);

    // TODO draw testMaskVertices

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
      stage.addActor(new Krumelur(texture, JSON.parse(json), 0));
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

      var graphics = new PIXI.Graphics();
      graphics.lineStyle(2, 0x00FF00, 1);

      var i;

      for (i = 0; i < testMaskVertices.length; i++) {
        graphics.drawEllipse(testMaskVertices[i].x, testMaskVertices[i].y, 5, 5);
      }

      graphics.moveTo(testMaskVertices[0].x, testMaskVertices[0].y);

      for (i = 1; i < testMaskVertices.length; i++) {
        graphics.lineTo(testMaskVertices[i].x, testMaskVertices[i].y);
      }

      testMask = new Scenery(graphics, 2);

      stage.addActor(testMask);

      settings.showJsonMask(testMaskVertices);
    },

    removeTestMask: function() {
      stage.removeActor(testMask);

      testMaskVertices = [];
    }
  }
})();
