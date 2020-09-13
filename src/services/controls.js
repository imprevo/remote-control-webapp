const robot = require('robotjs');

const supportedKeys = {
  mediaStop: 'audio_stop',
  mediaPlay: 'audio_play',
  mediaPause: 'audio_pause',
  mediaNext: 'audio_next',
  mediaPrev: 'audio_prev',
};

exports.keyTap = (key) => {
  if (!(key in supportedKeys)) {
    throw new Error('Operation not available');
  }
  robot.keyTap(supportedKeys[key]);
};
