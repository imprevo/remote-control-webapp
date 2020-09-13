const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const robot = require('robotjs');
const controls = require('../services/controls');

const router = express.Router();

router.get('/', (req, res) => {
  const mouse = robot.getMousePos();
  robot.moveMouse(mouse.x, mouse.y + 100);

  res.send('Mouse is at x:' + mouse.x + ' y:' + mouse.y);
});

router.post('/keyboard', (req, res) => {
  try {
    const { key } = req.body;
    controls.keyTap(key);
    res.send({ status: 'success' });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: 'error',
      error: e.message || getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }
});

module.exports = router;
