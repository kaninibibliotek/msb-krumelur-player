function Scenery(vertices) {
  // Inherits from PIXI.Graphics
  PIXI.Graphics.call(this);

  this.polygon = [];

  for (var i = 0; i < vertices.length; i++) {
    this.polygon.push(vertices[i].x);
    this.polygon.push(vertices[i].y);
  }

  this.beginFill(0x000000, 1);

  this.drawPolygon(this.polygon);

  this.endFill();

  this.zIndex = 2;
}

Scenery.prototype = Object.create(PIXI.Graphics.prototype);

Scenery.prototype.update = function() {
  return;
};

Scenery.prototype.changeColor = function(color) {
  this.clear();

  this.beginFill(color, 1);

  this.drawPolygon(this.polygon);

  this.endFill();
};
