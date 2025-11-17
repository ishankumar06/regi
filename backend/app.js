// ...existing code...
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowed = [process.env.FRONTEND_URL, 'http://localhost:3000'].filter(Boolean);
app.use(cors({
  origin: function(origin, callback) {
    // allow non-browser (curl, server) requests when origin is undefined
    if (!origin) return callback(null, true);
    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed'));
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
// ...existing code...