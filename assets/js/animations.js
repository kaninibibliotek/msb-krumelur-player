var lerp = function(x1, y1, x2, y2, t) {
  return ((y2 - y1) / (x2 - x1)) * (t - x1) + y1;
};

var getNextAnimationIndex = function(animation, prop, currentFrame, currentIndex) {
  var next = Math.min(currentIndex + 1, animation[prop].length - 1);

  return currentFrame >= animation[prop][next].frame ? next : currentIndex;
};

var animationPositionAtFrame = function(animation, index, frame) {
  var current = animation.positions[index];
  var next    = animation.positions[index + 1];

  if (!next) {
    return {
      x: current.x,
      y: current.y,
      z: current.z
    };
  }

  // TODO probably don't interpolate z?
  return {
    x: lerp(current.frame, current.x, next.frame, next.x, frame),
    y: lerp(current.frame, current.y, next.frame, next.y, frame),
    z: lerp(current.frame, current.z, next.frame, next.z, frame)
  };
};

var animationScaleAtFrame = function(animation, index, frame) {
  var current = animation.scales[index];
  var next    = animation.scales[index + 1];

  if (!next) {
    return current.scale;
  }

  return lerp(current.frame, current.scale, next.frame, next.scale, frame);
};

var animationRotationAtFrame = function(animation, index, frame) {
  var current = animation.rotations[index];
  var next    = animation.rotations[index + 1];

  if (!next) {
    return current.rotation;
  }

  return lerp(current.frame, current.rotation, next.frame, next.rotation, frame);
};

var animationOpacityAtFrame = function(animation, index, frame) {
  return animation.opacities[index].opacity;
};
