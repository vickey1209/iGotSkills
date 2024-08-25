const express = require('express');
const { register, login } = require('../controller/authController');
const { group , groupMessages } = require('../controller/groupController');
const {messageHistory} = require("../controller/messageController")



const router = express.Router();



router.post('/register', function(req , res) {register});
router.post('/login', function(req , res) {login});
router.post('/group',function(req , res){group});
router.post('/group/:groupId/messages' , function(req , res){groupMessages})
router.get('/history' , function(req , res){messageHistory})

module.exports = router;
