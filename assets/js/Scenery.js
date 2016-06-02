function Scenery(vertices, zIndex) {
  // Inherits from PIXI.Graphics
  PIXI.Graphics.call(this);

  this.polygon = [];

  for (var i = 0; i < vertices.length; i++) {
    this.polygon.push(vertices[i].x);
    this.polygon.push(vertices[i].y);
  }

  this.zIndex = zIndex;

  this.showColor = 0xFF0000;
  this.hideColor = 0x000000;

  this.setColor(this.hideColor);
}

Scenery.prototype = Object.create(PIXI.Graphics.prototype);

Scenery.prototype.update = function() {
  return;
};

Scenery.prototype.setColor = function(color) {
  this.clear();

  this.beginFill(color, 1);

  this.drawPolygon(this.polygon);

  this.endFill();
};

Scenery.prototype.show = function() {
  this.setColor(this.showColor);
};

Scenery.prototype.hide = function() {
  this.setColor(this.hideColor);
};
