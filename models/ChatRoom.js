const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is Required',
    },
    img: String,
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = ChatRoom;
