var player = (function() {
  var canvas = document.getElementsByTagName('canvas')[0];
  var ctx    = canvas.getContext('2d');

  var actors = [];

  maskVertices.forEach(function(vertices) {
    actors.push(new Mask(vertices, 1));
  });

  actors.push(new Effect('../images/explosion.jpg', 1));

  var testMaskVertices = [];

  // Animation control variables
  var masterSpeed = 1;
  var masterSize  = 1;
  var showMasks   = false;
  var hasFullMask = false;

  // Only used for drawing masks
  ctx.strokeStyle = "red";
  ctx.lineWidth   = 5;

  // Timing
  var fps  = 60;
  var rate = 1000 / fps;

  var lastDraw = Date.now();
  var timeSinceLastDraw;

  function draw() {
    requestAnimationFrame(draw);

    var now = Date.now();
    timeSinceLastDraw = now - lastDraw;

    if (timeSinceLastDraw < rate) {
      return;
    }

    lastDraw = now - (timeSinceLastDraw % rate);

    ctx.clearRect(0, 0, 5760, 1080);

    var i;

    // Draw actors
    ctx.beginPath();

    for (i = 0; i < actors.length; i++) {
      actors[i].draw(ctx, masterSpeed, masterSize);

      ctx.closePath();
    }

    if (showMasks) {
      ctx.stroke();
    }

    // Draw test mask
    ctx.beginPath();

    for (i = 0; i < testMaskVertices.length; i++) {
      var point = testMaskVertices[i];

      ctx.fillRect(point.x - 4, point.y - 4, 8, 8);
      ctx.lineTo(point.x, point.y);
    }

    if (hasFullMask) {
      ctx.closePath();
    }

    ctx.stroke();
  }

  draw();

  // "Server" "communication"
  function addKrumelur(json) {
    actors.push(new Krumelur('../images/bros.jpg', JSON.parse(json), 0));

    actors.sort(function(a, b) {
      return a.z - b.z;
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

  var intervalId = setInterval(function() {
    request.open('GET', 'http://localhost:3000/behaviors/anim1.json', true);

    if (actors.length >= 100) {
      clearInterval(intervalId);
    }
  }, 100);

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
