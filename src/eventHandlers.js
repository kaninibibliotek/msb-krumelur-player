var canvas = document.getElementsByTagName('canvas')[0];

canvas.addEventListener('mousedown', function(ev) {
  console.log(ev.offsetX, ev.offsetY);
});
