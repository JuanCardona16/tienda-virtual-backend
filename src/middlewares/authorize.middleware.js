import { verifyToken, setError } from '../herlpers/utils.js'
import User from '../models/user.model.js'

export const authorize = async (req, _res, next) => {
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
