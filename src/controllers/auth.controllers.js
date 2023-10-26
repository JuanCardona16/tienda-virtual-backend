const User = require('../models/user.model.js');
const { setError } = require('../herlpers/utils.js');
const { RegisterService, loginService } = require('../services/auth.service.js');

const register = async (req, res, next) => {
  try {
    const response = await RegisterService(req, res, next);
    return response;
  } catch (error) {
    return next(setError(500, 'create User failed: ' + error)); 
  }
}

const login = async (req, res, next) => {
  try {
    const response = await loginService(req, res, next);
    return response;
  } catch (error) {
    console.log(error)
    return next(setError(500, `Login ha fallado, error: ${error}`));
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!userById) return next(setError(404, 'No existe'));

    return res.json({
      status: 200,
      message: 'User info',
      data: {
        user: user,
      }
    })
  } catch (error) {
    return next(setError(500, `Error del sistema`));
  }
}

module.exports = {
  register,
  login,
  getUserById
}
