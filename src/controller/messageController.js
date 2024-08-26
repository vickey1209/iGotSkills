const express = require('express');
const Message = require('../models/message');

const router = express.Router();


const sendMessage = async (req, res) => {
    try {
        const message = await messageService.sendMessage(req.body);
        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const messageHistory = async (req, res) => {
    const { userId, withUserId, groupId, page = 1, pageSize = 10 } = req.query;

    try {
        let query = {};
        if (withUserId) {
            query = { $or: [ { senderId: userId, receiverId: withUserId }, { senderId: withUserId, receiverId: userId } ] };
        } else if (groupId) {
            query = { groupId };
        }

        const messages = await Message.find(query)
            .skip((page - 1) * pageSize)
            .limit(Number(pageSize))
            .sort({ timestamp: -1 });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { sendMessage , messageHistory }
