const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');
const { setError } = require('./herlpers/utils.js');

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
  // origin: 'https://juancardona16.github.io/tienda-virtual-frontend',
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

app.use(express.urlencoded({ limit: '1mb', extended: true }))

// Routes
app.use('/api/v1', authRoutes)
app.get('/', (_req, res) => {
  return res.send("hellow world!");
})

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

module.exports = app;
