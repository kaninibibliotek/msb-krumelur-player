document.addEventListener('keydown', function(ev) {
  switch (ev.keyCode) {
    case 65: // a
      if (locationUtils.isDev()) {
        player.addTestKrumelur();
      }
      break;
    case 67: // c 
      player.clearKrumelurer();
      break;
    case 68: // d --> open dev box
      settings.toggle();
      break;
  }
});

var canvas = document.getElementsByTagName('canvas')[0];

canvas.addEventListener('mousedown', function(ev) {
  // Only draw masks in dev mode
  if (locationUtils.isDev()) {
    if (ev.shiftKey) {
      player.removeTestMask();
    } else if (ev.altKey) {
      player.undoTestMaskPoint();
    } else {
      player.addTestMaskPoint(ev.offsetX, ev.offsetY);
    }
  }
});
