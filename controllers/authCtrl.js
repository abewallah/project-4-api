const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ status: 400, message: 'Please enter all fields' });

    // user verfication
    const user = await db.User.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: 400,
        error: 'No account available with this email.',
      });

    // password verification
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ status: 400, error: 'Invalid Credentials.' });

    // Create a jwt with userId
    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    console.log(secret);
    const expiration = { expiresIn: '10d' };

    // Sign the jwt
    const token = await jwt.sign(payload, secret, expiration);

    res.json({ status: 200, token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, error: 'Something went wrong. Try again.' });
  }
}

async function verify(req, res) {
  res.json({ status: 200, userId: req.currentUserId });
}

module.exports = {
  login,
  verify,
};
