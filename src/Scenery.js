function Scenery(graphics, zIndex) {
  PIXI.Container.call(this);

  this.addChild(graphics);

  this.zIndex = zIndex;
}

Scenery.prototype = Object.create(PIXI.Container.prototype);

Scenery.prototype.update = function() {
  return;
};
