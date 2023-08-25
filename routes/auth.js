const express = require("express");

const authController = require('../controllers/authController');



const authRouter = express.Router();

//login router
authRouter.post('/login',authController.login);

//verify router
authRouter.post('/verify',authController.verifyOtp);

authRouter.post('/tokenIsValid',authController.tokenIsValid);


module.exports = authRouter;