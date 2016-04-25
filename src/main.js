var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

var krumelurer = [];

function addKrumelur(json) {
  krumelurer.push(new Krumelur('../images/bros.jpg', JSON.parse(json)));
}

function draw(dt) {
  ctx.clearRect(0, 0, 4080, 1080);

  var state;

  for (var i = 0; i < krumelurer.length; i++) {
    state = krumelurer[i].update(dt);

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
}

var fps  = 60;
var rate = 1000 / fps;

setInterval(function() {
  draw(1);
}, rate);

var request = new XMLHttpRequest();

request.onreadystatechange = function() {
  if (request.readyState === 1) {
    request.send();
  }

  if (request.readyState === 4 && request.status == 200) {
    addKrumelur(request.response);
  }
};

request.open('GET', 'http://localhost:3000/behaviors/anim2.json', true);

var intervalId = setInterval(function() {
  request.open('GET', 'http://localhost:3000/behaviors/anim1.json', true);

  if (krumelurer.length >= 100) {
    clearInterval(intervalId);
  }
}, 100);
