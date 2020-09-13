const express = require('express');
const robot = require('robotjs');

const router = express.Router();

router.get('/', function (req, res) {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x, mouse.y + 100);

  res.send('Mouse is at x:' + mouse.x + ' y:' + mouse.y);
});

module.exports = router;
