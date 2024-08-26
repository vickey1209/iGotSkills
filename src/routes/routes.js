const express = require('express');
const authController  = require('../controller/authController');
const groupController = require('../controller/groupController');
const messageController = require("../controller/messageController")



const router = express.Router();



router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/messages', messageController.sendMessage);
router.post('/creategroup',groupController.groupCreate);
router.post('/:groupId/messages' ,groupController.groupMessages)
router.get('/history' , messageController.messageHistory)

module.exports = router;
