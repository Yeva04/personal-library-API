const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  author: { type: String, required: [true, 'Author is required'] },
  isbn: { type: String, required: [true, 'ISBN is required'], unique: true },
  publicationYear: { type: Number, required: true, min: 1000, max: new Date().getFullYear() + 1 },
  genre: { type: String, required: true },
  pages: { type: Number, required: true, min: 1 },
  description: { type: String, required: true, minlength: 10 },
  isRead: { type: Boolean, default: false },
  rating: { type: Number, min: 1, max: 5, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);