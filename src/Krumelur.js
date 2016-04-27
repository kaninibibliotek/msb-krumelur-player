function Krumelur(imgPath, animation, zIndex) {
  this.image     = new Image();
  this.image.src = imgPath;
  this.animation = animation;
  this.z         = zIndex;

  this.reset();
}

Krumelur.prototype.reset = function() {
  this.frame = 0;

  this.positionIdx = 0;
  this.scaleIdx    = 0;
  this.rotationIdx = 0;
};

Krumelur.prototype.draw = function(context, frameDelta, size) {
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
  var scale    = animationScaleAtFrame(this.animation, this.scaleIdx, this.frame) * size;
  var rotation = animationRotationAtFrame(this.animation, this.rotationIdx, this.frame);

  if (this.frame >= this.animation.duration) {
    this.reset();
  }

  context.save();

  context.translate(position.x + scale / 2, position.y + scale / 2);
  context.rotate(rotation / 180 * Math.PI);

  context.drawImage(
    this.image,
    -scale / 2,
    -scale / 2,
    scale,
    scale
  );

  context.restore();
};
