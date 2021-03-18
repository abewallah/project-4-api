const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
    },
    message: {
      type: String,
      required: 'Message is Required',
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
