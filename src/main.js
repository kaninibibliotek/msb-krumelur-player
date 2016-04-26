var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

var krumelurer = [];

function addKrumelur(json) {
  krumelurer.push(new Krumelur('../images/bros.jpg', JSON.parse(json)));
}

var fps  = 60;
var rate = 1000 / fps;

var now;
var last = Date.now();
var delta;

function draw() {
  requestAnimationFrame(draw);

  now   = Date.now();
  delta = now - last;

  if (delta < rate) {
    return;
  }

  last = now - (delta % rate);

  ctx.clearRect(0, 0, 4080, 1080);

  var i;

  // Draw krumelurs
  for (i = 0; i < krumelurer.length; i++) {
    var state = krumelurer[i].update();

    ctx.save();

    ctx.translate(state.x + state.scale / 2, state.y + state.scale / 2);
    ctx.rotate(state.rotation / 180 * Math.PI);

    ctx.drawImage(
      krumelurer[i].image,
      -state.scale / 2,
      -state.scale / 2,
      state.scale,
      state.scale
    );

    ctx.restore();
  }

  // Draw masks
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.globalCompositeOperation = 'destination-out';

  for (i = 0; i < masks.length; i++) {
    var mask = masks[i];

    ctx.beginPath();

    ctx.moveTo(mask[0].x, mask[0].y);

    for (var j = 1; j < mask.length; j++) {
      ctx.lineTo(mask[j].x, mask[j].y);
    }

    ctx.closePath();

    ctx.fill();
  }

  ctx.globalCompositeOperation = 'source-over';
}

draw();

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
