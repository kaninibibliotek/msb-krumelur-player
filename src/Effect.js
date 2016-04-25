function Effect(imgPath) {
  this.image = new Image();
  this.image.src = imgPath;

  this.width  = this.image.width;
  this.height = this.image.height;

  this.spriteWidth = this.width / 5;
  this.spriteHeight = this.height / 5;

  this.offsetX = 0;
  this.offsetY = 0;
}

Effect.prototype.update = function() {
  var coords = {
    offsetX: this.offsetX,
    offsetY: this.offsetY
  };

  var nextX = this.offsetX + this.spriteWidth;
  var nextY = this.offsetY;

  if (nextX >= this.width) {
    nextX = 0;
    nextY += this.spriteHeight;
  }

  if (nextY >= this.height) {
    nextY = 0;
  }

  this.offsetX = nextX;
  this.offsetY = nextY;

  return coords;
};
