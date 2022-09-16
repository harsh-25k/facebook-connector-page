const express = require("express")

const msgRouter = express.Router()

const msgCntrl = require("../controllers/messages")

const {MESSAGE,POSTMESSAGE,SENDER,CONVERSATIONS} = require('../utils/constants/app_constants').ROUTES.MESSAGES;

// msgRouter.get(MESSAGE,msgCntrl.getMessages);

msgRouter.post(POSTMESSAGE,msgCntrl.postMessage);

msgRouter.get(SENDER,msgCntrl.senderInfo);

// msgRouter.get(CONVERSATIONS,msgCntrl.getConversations);

module.exports = msgRouter;



