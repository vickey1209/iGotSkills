const Message = require('../models/message');

const chatMessage = async (messageData) => {
    const { content, senderId, receiverId, timestamp } = messageData;

  
    if (!content || !senderId || !receiverId) {
        throw new Error('Content, sender, and receiver are required fields.');
    }

    const message = new Message({
        content,
        senderId,
        receiverId,
        timestamp: timestamp || Date.now(), 
    });

    await message.save();

    return message;
};

module.exports = {
    chatMessage,
};
