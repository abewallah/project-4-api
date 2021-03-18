const db = require('../models');

const index = (req, res) => {
  db.Message.find({}, (err, allMessages) => {
    if (err) return console.log(err);
    res.json(allMessages);
  });
};

const show = (req, res) => {
  db.Message.find({ chatRoom: req.params.id }, (err, foundMessage) => {
    if (err) return console.log(err);
    res.json(foundMessage);
  });
};

const create = (req, res) => {
  const newMessage = req.body;

  db.Message.create(newMessage, (err, newMessage) => {
    if (err) return console.log(err);

    res.json(newMessage);
  });
};

const destroy = (req, res) => {
 
  db.Message.findByIdAndDelete(req.params.id, (err, deleteMessage) => {
    if (err) return console.log(err);
    res.json(deleteMessage);
  });
};

module.exports = {
  index,
  show,
  create,
  destroy,
};
