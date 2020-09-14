const robot = require('robotjs');

const supportedKeys = {
  mediaStop: () => robot.keyTap('audio_stop'),
  mediaPlay: () => robot.keyTap('audio_play'),
  mediaPause: () => robot.keyTap('audio_pause'),
  mediaNext: () => robot.keyTap('audio_next'),
  mediaPrev: () => robot.keyTap('audio_prev'),

  vlcBackwardsShort: () => robot.keyTap('left', 'alt'),
  vlcForwardShort: () => robot.keyTap('right', 'alt'),
  vlcBackwardsMedium: () => robot.keyTap('left', 'control'),
  vlcForwardMedium: () => robot.keyTap('right', 'control'),
  vlcSubtitleNext: () => robot.keyTap('v'),
  vlcAudioNext: () => robot.keyTap('b'),
  vlcFullscreen: () => robot.keyTap('f'),
};

exports.keyTap = (key) => {
  if (!(key in supportedKeys)) {
    throw new Error('Operation not available');
  }
  supportedKeys[key]();
};
