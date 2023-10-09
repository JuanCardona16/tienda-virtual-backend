const bcryptjs =  require('bcryptjs');
const jwt =  require('jsonwebtoken');

// hasheamos la password
const passwordHash = (password, length) => {
  return bcryptjs.hashSync(password, length);
}

// Validamos el password si cuenta con algunos de estos requisitos
const validatePassword = (password) => {
  const response = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$^&*_+=-]).{8,16}/;
  return response.test(password)
}

// Generamos un nuevo token de autenticación
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY)
}

const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
}

module.exports = {
  passwordHash,
  validatePassword,
  setError,
  verifyToken,
  generateToken
}
