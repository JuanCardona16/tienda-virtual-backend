import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import { setError } from './herlpers/utils.js';

const app = express(); 
dotenv.config();

// config headers
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.use(express.json({ limit: '1mb' }))

app.use(morgan('dev'))
app.use(cookieParser())

app.use(cors({
  origin: (_origin, callback) => callback(null, true),
  credentials: true
}))

app.use(express.urlencoded({ limit: '1mb', extended: true }))

// Routes
app.use('/api/v1', authRoutes)

// Rutas no encontradas
app.use('*', (_req, _res, next) => {
  return next(setError(404, 'Route Not Found'));
})

// error handler
app.use((error, _req, res, _next) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Unexpected error')
})

app.disable('x-powered-by')

export default app;
