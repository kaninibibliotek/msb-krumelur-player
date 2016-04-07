var eventsSurrounding = function(events, time) {
  var first, second;

  for (var i = events.length - 1; i >= 0; i--) {
    if (events[i].t <= time) {
      first  = events[i];
      second = events[i+1];

      break;
    }
  }

  return {
    left:  first,
    right: second
  };
};

var animationPositionAtTime = function(animation, time) {
  var positions = eventsSurrounding(animation.positions, time);

  if (!positions.right) {
    return {
      x: positions.left.x,
      y: positions.left.y
    };
  }

  var dt = positions.right.t - positions.left.t;
  var dx = positions.right.x - positions.left.x;
  var dy = positions.right.y - positions.left.y;

  return {
    x: positions.left.x + (dx / dt) * (time - positions.left.t),
    y: positions.left.y + (dy / dt) * (time - positions.left.t)
  };
};

var animationSizeAtTime = function(animation, time) {
  var sizes = eventsSurrounding(animation.sizes, time);

  if (!sizes.right) {
    return sizes.left.size;
  }

  var dt = sizes.right.t - sizes.left.t;
  var ds = sizes.right.size - sizes.left.size;

  return sizes.left.size + (ds / dt) * (time - sizes.left.t);
};

var animationRotationAtTime = function(animation, time) {
  var rotations = eventsSurrounding(animation.rotations, time);

  if (!rotations.right) {
    return rotations.left.rotation;
  }

  var dt = rotations.right.t - rotations.left.t;
  var dr = rotations.right.rotation - rotations.left.rotation;

  return rotations.left.rotation + (dr / dt) * (time - rotations.left.t);
};
