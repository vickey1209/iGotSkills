

const express = require('express');
const Group = require('../models/group');
const Message = require('../models/message');

const router = express.Router();

const groupCreate = async (req, res) => {
    const { name, members } = req.body;

    try {
        const group = new Group({ name, members });
        await group.save();

        console.log("group created ");
        
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const groupMessages = async (req, res) => {
    const { groupId } = req.params;
    const { senderId, content } = req.body;

    console.log("request:===> " ,req.body);
    

    try {
        const message = new Message({ senderId, content, groupId });
        await message.save();

        console.log("data got saved in dabtabase");
        
        const io = req.app.get('io');
       //broadcast msg
        io.to(groupId).emit('message', message);

        console.log("Message broadcasted successfully");
        res.status(201).json(message);


    } catch (err) 
    {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { groupMessages , groupCreate };
