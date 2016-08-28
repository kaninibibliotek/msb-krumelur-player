var constants = {
  // These dimensions fit the canvas nicely on the wall.
  // Actual projection is 4080x768
  CANVAS_WIDTH: 3930,
  CANVAS_HEIGHT: 760,

  MAX_KRUMELURER: 6,
  ADD_INTERVAL: 2000, //ms
  REQUEST_INTERVAL: 4000, //ms

  URL_LATEST: '/api/krumelur/latest/',
  URL_RANDOM: '/api/krumelur/random/',

  DEFAULT_BEHAVIOR: 'newton2',

  // Ms after which a newly posted krumelur will appear
  // Gives the kids some time to run from machine to wall
  NEW_KRUMELUR_DELAY: 5 * 1000, 

  // Maxmium ms after which a random krumelur will appear
  RANDOM_KRUMELUR_DELAY_MAX: 5 * 60 * 1000, 

  MASK_COLORS: {
    '100': 0xffffff,
    '90': 0x8000ff,
    '80': 0x0000ff,
    '70': 0x0080ff,
    '60': 0xffff00,
    '50': 0xff0000,
  }
};
