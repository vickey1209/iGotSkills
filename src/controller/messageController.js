const express = require('express');
const Message = require('../models/message');
const messageService = require("../services/messageServices")




const sendMessage = async (req, res) => {
    try {
        const message = await messageService.chatMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const messageHistory = async (req, res) => {
   
    
    const { userId, withUserId, groupId, page = 1, pageSize = 10 } = req.query;

    console.log('parameters====>', req.query);

    try {
        let query = {};
        if (withUserId) {
            query = { $or: [ { senderId: userId, receiverId: withUserId }, { senderId: withUserId, receiverId: userId } ] };
        } else if (groupId) {
            query = { groupId };
        }

        console.log('query====>', query);

        const messages = await Message.find(query)
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize))
            .sort({ timestamp: -1 });

        console.log('Retrieved Messages:', messages);

        res.status(200).json(messages);
    } catch (err) {
        console.error('error in fetching message=====>', err);
        res.status(500).json({ message: 'server error' });
    }
};



module.exports = { sendMessage , messageHistory }
