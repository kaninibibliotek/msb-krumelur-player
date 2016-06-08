var renderer = PIXI.autoDetectRenderer(
  constants.CANVAS_WIDTH,
  constants.CANVAS_HEIGHT,
  {
    view:        document.getElementsByTagName('canvas')[0],
    transparent: true
  }
);
