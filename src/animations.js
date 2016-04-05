var animations = [
  {
    positions: [
      {
        t: 0, // milliseconds
        x: 0,
        y: 0
      },
      {
        t: 1500,
        x: 700,
        y: 500
      },
      {
        t: 3000,
        x: 400,
        y: 250
      }
    ],

    sizes: [
      {
        t:    0,
        size: 100
      },
      {
        t:    1500,
        size: 200
      },
      {
        t:    3000,
        size: 75
      }
    ],

    rotations: [
      {
        t: 0,
        rotation: 0
      },
      {
        t: 2000,
        rotation: 360
      },
      {
        t: 2500,
        rotation: 270
      },
      {
        t: 3000,
        rotation: 0
      }
    ]
  },
  {
    positions: [
      {
        t: 0,
        x: 0,
        y: 0
      },

      {
        t: 1000,
        x: 40,
        y: 100
      },
      {
        t: 2000,
        x: 500,
        y: 300
      },
      {
        t: 3000,
        x: 10,
        y: 400
      }
    ],

    sizes: [
      {
        t:    0,
        size: 50
      },
      {
        t:    1500,
        size: 80
      },
      {
        t:    3000,
        size: 10
      }
    ],

    rotations: [
      {
        t: 0,
        rotation: 0
      },
      {
        t: 1000,
        rotation: -360
      },
      {
        t: 2000,
        rotation: 180
      }
    ]
  }
];

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
