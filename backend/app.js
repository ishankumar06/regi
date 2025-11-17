const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware

// Allow all origins - WARNING: suitable for testing only, not recommended for production
app.use(cors({
  origin: true // Reflects request origin, allowing any origin
}));

// For non-browser requests (curl/server), still allow
// app.use((req, res, next) => {
//   if (!req.headers.origin) next();
//   else next();
// });

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
