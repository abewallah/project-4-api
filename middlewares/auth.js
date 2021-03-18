const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({
        status: 400,
        error: 'You are not authenticated. Please login and try again',
      });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    req.currentUserId = decodedToken.userId;

    next();
  } catch (err) {
    console.log(err);
    return res
      .satus(500)
      .json({ status: 500, error: 'Something went wrong. Please try again' });
  }
}

module.exports = auth;
