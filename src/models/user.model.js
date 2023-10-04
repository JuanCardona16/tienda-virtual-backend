import mongoose from 'mongoose'
import { validatePassword, passwordHash, setError } from '../herlpers/utils.js';

// Este es mi modelo para el usuario de mi aplicación
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    requered: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    requered: true,
    unique: true
  },
  password: {
    type: String,
    requered: true
  }
}, {
  timestamps: true // Para saber la fecha y hora de creacion del usuario, se crea automaticamente en la base de datos. 
})

userSchema.pre('save', function(next) {
  if (!validatePassword(this.password)) {
    return next(setError(400, 'Invalid password'))
  }
  this.password = passwordHash(this.password, 12);
  next();
})

export default mongoose.model('User', userSchema);
