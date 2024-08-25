const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true 
              },
    receiverId: { type: mongoose.Schema.Types.ObjectId,
                  ref: 'User' },
    groupId: { type: mongoose.Schema.Types.ObjectId,
                  ref: 'Group' },
    content: { type: String,
               required: true },
    timestamp: { type: Date,
                 default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
