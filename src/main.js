var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

var krumelurer = [];

function addKrumelur(json) {
  console.log("adding krumelur");

  krumelurer.push(new Krumelur('../images/bros.jpg', JSON.parse(json)));
}

function draw(dt) {
  ctx.clearRect(0, 0, 800, 600);

  var state;

  for (var i = 0; i < krumelurer.length; i++) {
    state = krumelurer[i].getStateAt(dt);

    ctx.save();

    ctx.translate(state.x + state.size / 2, state.y + state.size / 2);
    ctx.rotate(state.rotation / 180 * Math.PI);

    ctx.drawImage(
      krumelurer[i].image,
      -state.size / 2,
      -state.size / 2,
      state.size,
      state.size
    );

    ctx.restore();
  }
}

var rate     = 1000/30;
var duration = 3000;

setInterval(function() {
  draw(rate);
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

request.open('GET', 'http://localhost:3000/behaviors/anim1.json', true);

setTimeout(function() {
  request.open('GET', 'http://localhost:3000/behaviors/anim2.json', true);
}, 2000);
