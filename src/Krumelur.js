function Krumelur(imgPath, animation) {
  this.image     = new Image();
  this.image.src = imgPath;
  this.animation = animation;
}

Krumelur.prototype.getStateAt = function(time) {
  var position = animationPositionAtTime(this.animation, time);

  return {
    x:        position.x,
    y:        position.y,
    size:     animationSizeAtTime(this.animation, time),
    rotation: animationRotationAtTime(this.animation, time)
  };
};
