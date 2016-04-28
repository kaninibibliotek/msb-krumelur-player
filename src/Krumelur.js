function Krumelur(texture, animation, zIndex) {
  this.sprite    = new PIXI.Sprite(texture);
  this.animation = animation;
  this.z         = zIndex;

  this.sprite.anchor.set(0.5, 0.5);
  this.sprite.scale.set(0.2, 0.2);

  this.reset();
}

Krumelur.prototype.reset = function() {
  this.frame = 0;

  this.positionIdx = 0;
  this.scaleIdx    = 0;
  this.rotationIdx = 0;
};

Krumelur.prototype.update = function(frameDelta) {
  this.frame += frameDelta;

  var nextPositionIdx = Math.min(this.positionIdx + 1, this.animation.positions.length - 1);
  var nextScaleIdx = Math.min(this.scaleIdx + 1, this.animation.scales.length - 1);
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
  var scale    = animationScaleAtFrame(this.animation, this.scaleIdx, this.frame);
  var rotation = animationRotationAtFrame(this.animation, this.rotationIdx, this.frame);

  this.sprite.position.set(position.x, position.y);

  this.sprite.rotation = rotation / 180 * Math.PI;

  if (this.frame >= this.animation.duration) {
    this.reset();
  }
};
