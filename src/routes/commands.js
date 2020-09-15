const express = require('express');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const controls = require('../services/controls');
const files = require('../services/files');

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

router.get('/files', async (req, res) => {
  try {
    const { dirPath } = req.query;
    const dirPath2 = dirPath || files.getHomedir();
    const fileList = await files.readDir(dirPath2);
    res.send({ status: 'success', data: { files: fileList } });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: 'error',
      error: e.message || getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }
});

router.post('/open', async (req, res) => {
  try {
    const { filePath } = req.body;
    await files.openFile(filePath);
    res.send({ status: 'success' });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send({
      status: 'error',
      error: e.message || getReasonPhrase(StatusCodes.BAD_REQUEST),
    });
  }
});

module.exports = router;
