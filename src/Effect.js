function Effect(imgPath, zIndex) {
  this.image = new Image();
  this.image.src = imgPath;

  this.width  = this.image.width;
  this.height = this.image.height;

  this.spriteWidth = this.width / 5;
  this.spriteHeight = this.height / 5;

  this.offsetX = 0;
  this.offsetY = 0;

  this.z = zIndex;
}

Effect.prototype.draw = function(context) {
  var nextX = this.offsetX + this.spriteWidth;
  var nextY = this.offsetY;

  if (nextX >= this.width) {
    nextX = 0;
    nextY += this.spriteHeight;
  }

  if (nextY >= this.height) {
    nextY = 0;
  }

  // TODO get position

  context.drawImage(
    this.image,
    this.offsetX,
    this.offsetY,
    this.spriteWidth,
    this.spriteHeight,
    0,
    0,
    this.spriteWidth,
    this.spriteHeight
  );

  this.offsetX = nextX;
  this.offsetY = nextY;
};
