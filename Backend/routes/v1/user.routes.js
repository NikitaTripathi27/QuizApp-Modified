const express = require('express');
const router = express.Router();
const userRegister = require('../../controllers/auth.controller')
router.post('/' , userRegister.register)
module.exports = router