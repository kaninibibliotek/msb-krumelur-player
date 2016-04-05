var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

var krumelurer = [
  new Krumelur('../images/bros.jpg', animations[0]),
  new Krumelur('../images/gubbe.jpg', animations[1])
];

var draw = function(time) {
  ctx.clearRect(0, 0, 800, 600);

  var state;

  for (var i = 0; i < krumelurer.length; i++) {
    state = krumelurer[i].getStateAt(time);

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
};

var rate     = 1000/30;
var duration = 3000;
var time     = 0;

setInterval(function() {
  draw(time);

  time += rate;

  if (time > duration) {
    time = 0;
  }
}, rate);
