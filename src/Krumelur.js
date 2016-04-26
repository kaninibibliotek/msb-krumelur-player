function Krumelur(imgPath, animation) {
  this.image     = new Image();
  this.image.src = imgPath;
  this.animation = animation;

  this.reset();
}

Krumelur.prototype.reset = function() {
  this.frame = 0;

  this.positionIdx = 0;
  this.scaleIdx    = 0;
  this.rotationIdx = 0;
};

Krumelur.prototype.update = function(delta) {
  this.frame += delta;

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
  var state = {
    x:        position.x,
    y:        position.y,
    scale:    animationScaleAtFrame(this.animation, this.scaleIdx, this.frame),
    rotation: animationRotationAtFrame(this.animation, this.rotationIdx, this.frame)
  };

  if (this.frame >= this.animation.duration) {
    this.reset();
  }

  return state;
};
