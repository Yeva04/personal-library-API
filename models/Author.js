const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  birthYear: { type: Number, required: true },
  nationality: { type: String, required: true },
  biography: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);