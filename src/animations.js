var animationPositionAtTime = function(animation, index, time) {
  var current = animation.positions[index];
  var next    = animation.positions[index + 1];

  if (!next) {
    return {
      x: current.x,
      y: current.y
    };
  }

  var dt = next.t - current.t;
  var dx = next.x - current.x;
  var dy = next.y - current.y;

  return {
    x: current.x + (dx / dt) * (time - current.t),
    y: current.y + (dy / dt) * (time - current.t)
  };
};

var animationScaleAtTime = function(animation, index, time) {
  var current = animation.scales[index];
  var next    = animation.scales[index + 1];

  if (!next) {
    return current.scale;
  }

  var dt = next.t - current.t;
  var ds = next.scale - current.scale;

  return current.scale + (ds / dt) * (time - current.t);
};

var animationRotationAtTime = function(animation, index, time) {
  var current = animation.rotations[index];
  var next    = animation.rotations[index + 1];

  if (!next) {
    return current.rotation;
  }

  var dt = next.t - current.t;
  var dr = next.rotation - current.rotation;

  return current.rotation + (dr / dt) * (time - current.t);
};
