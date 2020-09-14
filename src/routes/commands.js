const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const controls = require('../services/controls');

const router = express.Router();

router.post('/keyboard', (req, res) => {
  try {
    const { key } = req.body;
    controls.keyboardAction(key);
    res.send({ status: 'success' });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: 'error',
      error: e.message || getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }
});

router.post('/mouse', (req, res) => {
  try {
    const { key, input } = req.body;
    controls.mouseAction(key, input);
    res.send({ status: 'success' });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: 'error',
      error: e.message || getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }
});

module.exports = router;
