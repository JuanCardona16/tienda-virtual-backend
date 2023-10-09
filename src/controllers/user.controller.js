const User = require('../models/user.model.js');
const { setError } = require('../herlpers/utils.js');

const createUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, 'El email ya existe'));
    const userInDB = await newUser.save();
    return res.status(201).json(userInDB)
  } catch (error) {
    return next(setError(500, 'create User failed')); 
  }
}

module.exports = {
  createUser
}
