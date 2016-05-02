document.addEventListener('keydown', function(ev) {
  switch (ev.keyCode) {
    case 68: // d
      settings.toggle();
      break;
  }
});

var canvas = document.getElementsByTagName('canvas')[0];

canvas.addEventListener('mousedown', function(ev) {
  if (ev.shiftKey) {
    player.removeTestMask();
  } else {
    player.addTestMaskPoint(ev.offsetX, ev.offsetY);
  }
});
