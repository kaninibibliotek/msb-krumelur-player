function Krumelur(imgPath, animation) {
  this.image     = new Image();
  this.image.src = imgPath;
  this.animation = animation;

  this.reset();
}

Krumelur.prototype.reset = function() {
  this.time = 0;

  this.positionIdx = 0;
  this.scaleIdx    = 0;
  this.rotationIdx = 0;
};

Krumelur.prototype.update = function(dt) {
  this.time += dt;

  var nextPositionIdx = Math.min(this.positionIdx + 1, this.animation.positions.length - 1);
  var nextScaleIdx = Math.min(this.scaleIdx + 1, this.animation.scales.length - 1);
  var nextRotationIdx = Math.min(this.rotationIdx + 1, this.animation.rotations.length - 1);

  if (this.time >= this.animation.positions[nextPositionIdx].t) {
    this.positionIdx = nextPositionIdx;
  }

  if (this.time >= this.animation.scales[nextScaleIdx].t) {
    this.scaleIdx = nextScaleIdx;
  }

  if (this.time >= this.animation.rotations[nextRotationIdx].t) {
    this.rotationIdx = nextRotationIdx;
  }

  var position = animationPositionAtTime(this.animation, this.positionIdx, this.time);
  var state = {
    x:        position.x,
    y:        position.y,
    scale:    animationScaleAtTime(this.animation, this.scaleIdx, this.time),
    rotation: animationRotationAtTime(this.animation, this.rotationIdx, this.time)
  };

  if (this.time >= this.animation.duration) {
    this.reset();
  }

  return state;
};
