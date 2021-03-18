const db = require('../models');

const index = (req, res) => {
  db.ChatRoom.find({}, (err, allChatRooms) => {
    if (err) return console.log(err);
    res.json(allChatRooms);
  });
};

const show = (req, res) => {
  db.ChatRoom.findById(req.params.id)
    .populate('messages')
    .exec((err, ChatRoom) => {
      if (err) console.log(err);
      res.json(ChatRoom);
    });
};

const create = (req, res) => {
  const user = req.body.users;
 
  const newChatRoom = {
    name: req.body.name,
    img: req.body.img,
    messages: req.body.messages,
    users : user,
  }

  db.ChatRoom.create(newChatRoom, (err, newChatRoom) => {
    if (err) return console.log(err);

    db.User.findById(user, (err, foundUser) => {
      foundUser.chatrooms.push(newChatRoom._id);
      foundUser.save((err, savedUser) => {
        res.json(savedUser);
      });
    });
  });
};

const update = (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  db.ChatRoom.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedChatRoom) => {
      if (err) return console.log(err);

      res.json(updatedChatRoom);
    }
  );
};

const destroy = (req, res) => {
  db.ChatRoom.findByIdAndDelete(req.params.id, (err, deletedChatRoom) => {
    if (err) return console.log(err);

    res.json(deletedChatRoom);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
