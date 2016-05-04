function TestMask(vertices) {
  PIXI.Graphics.call(this);

  this.lineStyle(2, 0x00FF00, 1);

  var i;

  for (i = 0; i < vertices.length; i++) {
    this.drawEllipse(vertices[i].x, vertices[i].y, 5, 5);
  }

  this.moveTo(vertices[0].x, vertices[0].y);

  for (i = 1; i < vertices.length; i++) {
    this.lineTo(vertices[i].x, vertices[i].y);
  }

  this.zIndex = 2;
}

TestMask.prototype = Object.create(PIXI.Graphics.prototype);

TestMask.prototype.update = function() {
  return;
};
