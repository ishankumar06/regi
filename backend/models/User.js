const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  branch: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  fatherName: { type: String, required: false, trim: true },
  motherName: { type: String, required: false, trim: true },
  hobby: { type: String, required: false, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
