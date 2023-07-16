const express = require('express');
const router = express.Router();
const routes = require('./v1/index')
router.use('/v1', routes)
module.exports = router