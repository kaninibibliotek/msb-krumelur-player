function Effect(texture, zIndex) {
  PIXI.Sprite.call(this, texture);

  this.baseWidth  = texture.width;
  this.baseHeight = texture.height;

  this.spriteWidth  = this.baseWidth / 5;
  this.spriteHeight = this.baseHeight / 5;

  this.texture.frame = new PIXI.Rectangle(0, 0, this.spriteWidth, this.spriteHeight);

  this.zIndex = zIndex;
}

Effect.prototype = Object.create(PIXI.Sprite.prototype);

Effect.prototype.update = function(frameDelta, masterSize) {
  var rectX = this.texture.frame.x + this.spriteWidth;
  var rectY = this.texture.frame.y;

  if (rectX >= this.baseWidth) {
    rectX = 0;
    rectY += this.spriteHeight;
  }

  if (rectY >= this.baseHeight) {
    rectY = 0;
  }

  this.texture.frame = new PIXI.Rectangle(
    rectX,
    rectY,
    this.spriteWidth,
    this.spriteHeight
  );

  this.scale.set(masterSize, masterSize);
};
