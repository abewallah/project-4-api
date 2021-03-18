const bcrypt = require('bcryptjs');
const db = require('../models');

const index = (req, res) => {
  db.User.find({})
    .populate('chatrooms')
    .exec((err, chatrooms) => {
      if (err) return console.log(err);
      res.json(chatrooms);
    });
};

async function create(req, res) {
  const { userName, email, password } = req.body;

  // Validate create user form inputs
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ status: 400, message: 'All Fields Are Required' });
  }
  if (password.length < 4)
    return res.status(400).json({
      status: 400,
      error: 'The Password must be at least 6 characters long.',
    });

  // Asyc/Await Version
  try {
    const foundUser = await db.User.findOne({ email });

    if (foundUser) {
      console.log('User account already exists: ', foundUser);
      return res
        .status(400)
        .json({ status: 400, error: 'User already exists. Please login' });
    }

    // Create Salt for password hash
    const salt = await bcrypt.genSalt(10);

    // Hash user plain text password
    const hash = await bcrypt.hash(password, salt);

    const newUser = await db.User.create({ userName, email, password: hash });

    // Respond back to client
    res.json(newUser);
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, error: 'Something went wrong. Please try again' });
  }
}

async function getProfile(req, res) {
  try {
    const user = await db.User.findById(req.currentUserId);

    return res.json({ status: 200, profile: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: 'Something went wrong!! Please try again.' });
  }
}

function update(req, res) {
  db.User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) return console.log(err);
      res.json(updatedUser);
    }
  );
}

const destroy = (req, res) => {
  console.log(req.body)

  db.User.findByIdAndDelete(req.params.id, (err, deleteUser) => {
    if (err) return console.log(err);
    res.json(deleteUser);
  });
};


module.exports = {
  index,
  create,
  getProfile,
  update,
  destroy,
};
