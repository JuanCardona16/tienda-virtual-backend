import { Router } from "express";
import { login, register, getUserById } from '../controllers/auth.controllers.js'
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const authRoutes = Router();

authRoutes.post('/register', validateSchema(registerSchema), register);
authRoutes.post('/login', validateSchema(loginSchema), login);
// authRoutes.post('/logout', logout);
authRoutes.get('/user/:id', authorize, getUserById);

export default authRoutes;
