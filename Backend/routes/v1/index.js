const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes')
const quesRoutes= require('./ques.routes')
const authRoutes =require('./auth.routes')
router.use('/auth' ,authRoutes)
router.use('/ques' ,quesRoutes)

module.exports = router