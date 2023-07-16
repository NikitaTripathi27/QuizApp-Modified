const express = require('express');
const router = express.Router();
const {quesRegister ,quesAmmend,getQuestion} = require('../../controllers/ques.controller')
router.post('/1' , quesRegister)
router.get('/all' , getQuestion)
router.patch('/id/:id' , quesAmmend)
module.exports = router