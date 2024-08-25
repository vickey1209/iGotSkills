const express = require('express');
const { register, login } = require('../controller/authController');
const { group , groupMessages } = require('../controller/groupController');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/group',group);
router.post('/group/:groupId/messages' , groupMessages)
router.get('/history' , messageHistory)

module.exports = router;
