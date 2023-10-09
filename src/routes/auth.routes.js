const { Router } = require("express");
const { login, register, getUserById } = require('../controllers/auth.controllers.js');
const { loginSchema, registerSchema } = require("../schemas/auth.schema.js");
const { validateSchema } = require("../middlewares/validateSchema.middleware.js");
const { authorize } = require("../middlewares/authorize.middleware.js");

const authRoutes = Router();

authRoutes.post('/register', validateSchema(registerSchema), register);
authRoutes.post('/login', validateSchema(loginSchema), login);
// authRoutes.post('/logout', logout);
authRoutes.get('/user/:id', authorize, getUserById);

module.exports = authRoutes;
