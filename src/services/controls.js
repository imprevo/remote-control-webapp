const robot = require('robotjs');

const keyboardEvents = {
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

  osUp: () => robot.keyTap('up'),
  osDown: () => robot.keyTap('down'),
  osLeft: () => robot.keyTap('left'),
  osRight: () => robot.keyTap('right'),
  osEnter: () => robot.keyTap('enter'),
  osEscape: () => robot.keyTap('escape'),
  osCommand: () => robot.keyTap('command'),
  osAltF4: () => robot.keyTap('f4', 'alt'),
};

exports.keyboardAction = (key) => {
  if (!(key in keyboardEvents)) {
    throw new Error('Operation not available');
  }
  keyboardEvents[key]();
};

const mouseEvents = {
  mouseClickLeft: () => robot.mouseClick('left'),
  mouseMove: ({ x, y }) => {
    const mouse = robot.getMousePos();
    robot.moveMouse(mouse.x + x, mouse.y + y);
  },
};

exports.mouseAction = (key, input) => {
  if (!(key in mouseEvents)) {
    throw new Error('Operation not available');
  }
  mouseEvents[key](input);
};
