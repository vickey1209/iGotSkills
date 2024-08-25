

const express = require('express');
const Group = require('../models/group');
const Message = require('../models/message');

const router = express.Router();

exports.group = async (req, res) => {
    const { name, members } = req.body;

    try {
        const group = new Group({ name, members });
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.groupMessages = async (req, res) => {
    const { groupId } = req.params;
    const { senderId, content } = req.body;

    try {
        const message = new Message({ senderId, content, groupId });
        await message.save();
        // Broadcast message to the group
        io.to(groupId).emit('message', message);
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = router;
