const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Set allowed origins
const allowedOrigins = ['https://registrationform-ish.vercel.app', 'http://localhost:3000'];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed from this origin'));
    }
  }
}));

app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err && err.message ? err.message : err);
  res.status(500).json({ error: err.message || 'Server error' });
});

module.exports = app;
