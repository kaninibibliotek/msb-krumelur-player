function Effect(texture, trigger, zIndex) {
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

  this.trigger = trigger;

  this.zIndex = zIndex;

  this.position.set(0, 100);

  this.renderable = false;
}

Effect.prototype = Object.create(PIXI.Sprite.prototype);

Effect.prototype.start = function() {
  this.renderable = true;
};

Effect.prototype.update = function(frameDelta, masterSize) {
  if (!this.renderable) {
    return;
  }

  this.frameIndex = (this.frameIndex + frameDelta) % this.frames.length;

  this.texture.frame = this.frames[Math.floor(this.frameIndex)];

  this.scale.set(masterSize, masterSize);

  if (this.frameIndex >= this.frames.length - 1) {
    this.frameIndex = 0;
    this.renderable = false;
  }
};
