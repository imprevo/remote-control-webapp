const express = require('express');
const qrcode = require('qrcode');
const { buildExternalUrl } = require('../services/network');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  const controlsLink = `${buildExternalUrl()}/controls`;
  const controlsQrCode = await qrcode.toDataURL(controlsLink, {
    width: 320,
    margin: 0,
  });
  res.render('index', {
    title: 'Remote desktop',
    controlsQrCode: controlsQrCode,
  });
});

module.exports = router;
