import User from '../models/user.model.js'
import bycript from 'bcryptjs'
import { generateToken, setError } from '../herlpers/utils.js';

export const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);

    const userExist = await User.findOne({ email: newUser.email });
    if (userExist) return next(setError(409, 'El email ya existe'));

    const userInDB = await newUser.save();

    return res.status(201).json({
      user: userInDB,
    })
  } catch (error) {
    return next(setError(500, 'create User failed')); 
  }
}

export const login = async (req, res, next) => {
  try {
    const userInDB = await User.findOne({ email: req.body.email });
    if (!userInDB) return next(setError(401, 'Not authorized'));
    
    if (!bycript.compareSync(req.body.password, userInDB.password)) return next(setError(401, 'La contraseña no coincide'));

    const token = generateToken({ id: userInDB._id });

    return res.status(200).json({
      user: userInDB,
      token: token
    })

  } catch (error) {
    console.log(error)
    return next(setError(500, `Login ha fallado, error: ${error}`));
  }
}

export const getUserById = async (req, res, next) => {
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

// export const logout = async (_req, res) => {
//   res.cookie('token', '', {
//     expires: new Date(0)
//   })
//   return res.sendStatus(200)
// }
