function Effect(texture, zIndex) {
  PIXI.Sprite.call(this, texture);

  this.baseWidth  = texture.width;
  this.baseHeight = texture.height;

  this.spriteWidth  = this.baseWidth / 5;
  this.spriteHeight = this.baseHeight / 5;

  // Build array of Rectangles for each frame
  this.frames = [];

  for (var row = 0; row < 5; row++) {
    var y = row * this.spriteHeight;

    for (var col = 0; col < 5; col++) {
      var x = col * this.spriteWidth;

      this.frames.push(new PIXI.Rectangle(x, y, this.spriteWidth, this.spriteHeight));
    }
  }

  this.frameIndex = 0;

  this.zIndex = zIndex;
}

Effect.prototype = Object.create(PIXI.Sprite.prototype);

Effect.prototype.update = function(frameDelta, masterSize) {
  // ???
  this.frameIndex = (this.frameIndex + frameDelta) % this.frames.length;

  this.texture.frame = this.frames[this.frameIndex];

  this.position.set(0, 100);

  this.scale.set(masterSize, masterSize);
};
