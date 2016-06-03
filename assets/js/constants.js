var constants = {
  // These dimensions fit the canvas nicely on the wall.
  // Actual projection is 4080x768
  CANVAS_WIDTH: 3930,
  CANVAS_HEIGHT: 760,

  MAX_KRUMELURER: 10,
  ADD_INTERVAL: 1000, //ms
  REQUEST_INTERVAL: 5000, //ms

  URL_LATEST: '/api/krumelur/latest/',
  URL_RANDOM: '/api/krumelur/random/',

  DEFAULT_BEHAVIOR: 'calm',

  MASK_COLORS: {
    '100': 0xff00ff,
    '90': 0x8000ff,
    '80': 0x0000ff,
    '70': 0x0080ff,
    '60': 0x00ffff,
    '50': 0x00ff80,
    '40': 0x00ff00,
    '30': 0x80ff00,
    '20': 0xffff00,
    '10': 0xff8000,
    '0': 0xff0000,
  }
};
