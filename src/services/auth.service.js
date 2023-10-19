const User = require('../models/user.model.js');
const bycript = require('bcryptjs');
const { generateToken, setError } = require('../herlpers/utils.js');

const RegisterService = async (req, res, next) => {
  const newUser = await User(req.body);

  const userExists = await User.findOne({ email: newUser.email });
  if (userExists) return next(setError(409), "El email ya existe.");

  const userInDB = await newUser.save();

  return res.status(201).json({
    user: userInDB
  })
}

const loginService = async (req, res, next) => {
  const userInDB = await User.findOne({ email: req.body.email });
  if (!userInDB) return next(setError(401, "Not authorized"));

  if (!bycript.compareSync(req.body.password, userInDB.password)) return next(setError(403, "La contraseña no coincide"));

  const token = generateToken({ id: userInDB._id });

  return res.status(200).json({
    user: {
      id: userInDB._id,
      username: userInDB.username,
      email: userInDB.email
    },
    token: token
  });
}

module.exports = {
  RegisterService,
  loginService
}
