function Scenery(vertices) {
  PIXI.Graphics.call(this);

  var polygon = [];

  vertices.forEach(function(vertex) {
    polygon.push(vertex.x);
    polygon.push(vertex.y);
  });

  this.lineStyle(1, 0x0000FF, 1);
  this.beginFill(0xFF0000, 1);

  this.drawPolygon(polygon);

  this.endFill();

  this.zIndex = 2;
}

Scenery.prototype = Object.create(PIXI.Graphics.prototype);

Scenery.prototype.update = function() {
  return;
};
