const { z } = require('zod');

const registerSchema = z.object({
  username: z.string({
    required_error: 'username is required'
  }),
  email: z.string({
    required_error: 'email is required'
  }).email({
    message: 'invalid email'
  }),
  password: z.string({
    required_error: 'password is required'
  }).min(6, {
    message: 'password must be at least 6 characters'
  })
})

const loginSchema = z.object({
  email: z.string({
    required_error: 'email is required'
  }).email({
    message: 'invalid email'
  }),
  password: z.string({
    required_error: 'password is required'
  }).min(6, {
    message: 'password must be at least 6 characters'
  })
})

module.exports = {
  loginSchema,
  registerSchema
}
