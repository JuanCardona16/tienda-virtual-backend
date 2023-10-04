import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

// hasheamos la password
export const passwordHash = (password, length) => {
  return bcryptjs.hashSync(password, length);
}

// Validamos el password si cuenta con algunos de estos requisitos
export const validatePassword = (password) => {
  const response = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$^&*_+=-]).{8,16}/;
  return response.test(password)
}

// Generamos un nuevo token de autenticación
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.TOKEN_SECRET_KEY)
}

export const setError = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  return error;
}
