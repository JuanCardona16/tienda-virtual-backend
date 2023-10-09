const { verifyToken, setError } = require('../herlpers/utils.js');
const User = require('../models/user.model.js');

const authorize = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error();

    const tokenNotBearer = token.replace('Bearer', '');
    const validToken = verifyToken(tokenNotBearer);
    const user = await User.findById(validToken.id);

    req.user = user;
    next();
  } catch (error) {
    return next(setError(401, 'No autorizado'))
  }
}

module.exports = {
  authorize
}