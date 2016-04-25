var lerp = function(x1, y1, x2, y2, t) {
  return ((y2 - y1) / (x2 - x1)) * (t - x1) + y1;
};

var animationPositionAtTime = function(animation, index, time) {
  var current = animation.positions[index];
  var next    = animation.positions[index + 1];

  if (!next) {
    return {
      x: current.x,
      y: current.y
    };
  }

  return {
    x: lerp(current.t, current.x, next.t, next.x, time),
    y: lerp(current.t, current.y, next.t, next.y, time)
  };
};

var animationScaleAtTime = function(animation, index, time) {
  var current = animation.scales[index];
  var next    = animation.scales[index + 1];

  if (!next) {
    return current.scale;
  }

  return lerp(current.t, current.scale, next.t, next.scale, time);
};

var animationRotationAtTime = function(animation, index, time) {
  var current = animation.rotations[index];
  var next    = animation.rotations[index + 1];

  if (!next) {
    return current.rotation;
  }

  return lerp(current.t, current.rotation, next.t, next.rotation, time);
};
