function Krumelur(texture, animation) {
  PIXI.Sprite.call(this, texture);

  this.animation = animation;
  this.zIndex    = 0;

  this.positionIdx = 0;
  this.scaleIdx    = 0;
  this.rotationIdx = 0;

  this.frame = 0;

  this.anchor.set(0.5, 0.5);

  this.done = false;
}

Krumelur.prototype = Object.create(PIXI.Sprite.prototype);

Krumelur.prototype.update = function(frameDelta, size) {
  this.frame += frameDelta;

  var nextPositionIdx = Math.min(this.positionIdx + 1, this.animation.positions.length - 1);
  var nextScaleIdx    = Math.min(this.scaleIdx + 1, this.animation.scales.length - 1);
  var nextRotationIdx = Math.min(this.rotationIdx + 1, this.animation.rotations.length - 1);

  if (this.frame >= this.animation.positions[nextPositionIdx].frame) {
    this.positionIdx = nextPositionIdx;
  }

  if (this.frame >= this.animation.scales[nextScaleIdx].frame) {
    this.scaleIdx = nextScaleIdx;
  }

  if (this.frame >= this.animation.rotations[nextRotationIdx].frame) {
    this.rotationIdx = nextRotationIdx;
  }

  var position = animationPositionAtFrame(this.animation, this.positionIdx, this.frame);
  var scale    = size * animationScaleAtFrame(this.animation, this.scaleIdx, this.frame) / 100;
  var rotation = animationRotationAtFrame(this.animation, this.rotationIdx, this.frame);

  this.position.set(position.x, position.y);
  this.zIndex = position.z;

  this.scale.set(scale, scale);

  this.rotation = rotation / 180 * Math.PI;

  if (this.frame >= this.animation.duration) {
    this.done = true;
  }
};
