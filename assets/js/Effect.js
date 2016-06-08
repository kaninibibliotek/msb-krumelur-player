function Effect(textureUrls, trigger, zIndex) {
  this.urls = textureUrls;

  PIXI.Sprite.call(this, PIXI.loader.resources[this.urls[0]].texture);

  this.frameIndex = 0;

  this.trigger = trigger;

  this.zIndex = zIndex;

  this.position.set(0, 0);

  this.renderable = false;
}

Effect.prototype = Object.create(PIXI.Sprite.prototype);

Effect.prototype.start = function() {
  this.renderable = true;
};

Effect.prototype.update = function(frameDelta) {
  if (!this.renderable) {
    return;
  }

  this.frameIndex = (this.frameIndex + frameDelta) % this.urls.length;

  var url = this.urls[Math.floor(this.frameIndex)];

  this.texture = PIXI.loader.resources[url].texture;

  if (this.frameIndex > this.urls.length - 1) {
    this.frameIndex = 0;
    this.renderable = false;
  }
};
