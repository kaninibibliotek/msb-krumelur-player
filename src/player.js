var player = (function() {
  var canvas = document.getElementsByTagName('canvas')[0];
  var ctx    = canvas.getContext('2d');

  var krumelurer = [];

  // Animation control variables
  var masterSpeed = 1;
  var masterSize  = 1;
  var showMasks   = false;

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

    ctx.clearRect(0, 0, 4080, 1080);

    var i;

    // Draw krumelurs
    for (i = 0; i < krumelurer.length; i++) {
      var state = krumelurer[i].update(masterSpeed);

      ctx.save();

      ctx.translate(state.x + state.scale / 2, state.y + state.scale / 2);
      ctx.rotate(state.rotation / 180 * Math.PI);

      ctx.drawImage(
        krumelurer[i].image,
        -state.scale / 2,
        -state.scale / 2,
        state.scale * masterSize,
        state.scale * masterSize
      );

      ctx.restore();
    }

    // Draw masks
    for (i = 0; i < masks.length; i++) {
      var mask = masks[i];

      ctx.beginPath();

      ctx.moveTo(mask[0].x, mask[0].y);

      for (var j = 1; j < mask.length; j++) {
        ctx.lineTo(mask[j].x, mask[j].y);
      }

      ctx.closePath();

      if (showMasks) {
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'destination-out';

      ctx.fill();

      ctx.globalCompositeOperation = 'source-over';
    }
  }

  draw();

  // "Server" "communication"
  function addKrumelur(json) {
    krumelurer.push(new Krumelur('../images/bros.jpg', JSON.parse(json)));
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

    if (krumelurer.length >= 100) {
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
    }
  }
})();
