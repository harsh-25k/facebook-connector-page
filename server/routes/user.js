const express = require("express")

const userRouter = express.Router()

const userCntrl = require("../controllers/user")

const {SIGNUP,LOGIN} = require('../utils/constants/app_constants').ROUTES.USER;

userRouter.post(SIGNUP,userCntrl.register);

userRouter.post(LOGIN,userCntrl.login);

module.exports = userRouter;



