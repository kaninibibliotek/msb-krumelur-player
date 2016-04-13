function Krumelur(imgPath, animation) {
  this.image     = new Image();
  this.image.src = imgPath;
  this.animation = animation;

  this.time = 0;
}

Krumelur.prototype.reset = function() {
  this.time = 0;
};

Krumelur.prototype.update = function(dt) {
  this.time += dt;

  var position = animationPositionAtTime(this.animation, this.time);
  var state = {
    x:        position.x,
    y:        position.y,
    scale:    animationScaleAtTime(this.animation, this.time),
    rotation: animationRotationAtTime(this.animation, this.time)
  };

  if (this.time >= this.animation.duration) {
    this.reset();
  }

  return state;
};
