var player = (function() {

  var renderer = PIXI.autoDetectRenderer(
    5760,
    1080,
    {
      view:        document.getElementsByTagName('canvas')[0],
      transparent: true
    }
  );

  var scene = new PIXI.Container();

  // backStage actors are masked by invisible polygons
  var backStage  = new Stage();
  // frontStage actors are not masked
  var frontStage = new Stage();

  scene.addChild(backStage.container);
  scene.addChild(frontStage.container);

  var testMaskVertices = [];

  // Animation control variables
  var masterSpeed = 1;
  var masterSize  = 1;
  var showMasks   = false;
  var hasFullMask = false;

  // Draw mask polygons on a canvas and use the canvas
  // as a spritemask for backStage
  var maskCanvas = document.createElement('canvas');
  var ctx        = maskCanvas.getContext('2d');

  maskCanvas.width = 5760;
  maskCanvas.height = 1080;

  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(0, 0, 5760, 1080);

  ctx.fillStyle = "rgba(0, 0, 0, 1)";

  maskVertices.forEach(function(vertices) {
    ctx.beginPath();

    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (var i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }

    ctx.closePath();

    ctx.fill();
  });

  backStage.container.mask = new PIXI.Sprite(PIXI.Texture.fromCanvas(maskCanvas));

  // Draw loop
  function draw() {
    requestAnimationFrame(draw);

    backStage.update(masterSpeed);
    frontStage.update(masterSpeed);

    // TODO draw testMaskVertices on frontStage

    renderer.render(scene);
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

  // "Server" "communication"
  function addKrumelur(json) {
    loadImage('../images/bros.jpg', function(texture) {
      var stage = Math.random() > 0.5 ? backStage : frontStage;

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

    if (++count >= 10) {
      clearInterval(intervalId);
    }
  }, 1000);

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

    addMaskPoint: function(x, y) {
      if (hasFullMask) {
        testMaskVertices  = [];
        hasFullMask = false;
      } else {
        testMaskVertices.push({
          x: x,
          y: y
        });

        settings.showJsonMask(testMaskVertices);
      }
    },

    closeMask: function() {
      hasFullMask = true;
      settings.showJsonMask(testMaskVertices);
    }
  }
})();
