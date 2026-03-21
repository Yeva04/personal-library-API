const Author = require('../models/Author');
const { validationResult } = require('express-validator');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAuthor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = new Author(req.body);
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!author) return res.status(404).json({ message: 'Author not found' });

    res.status(200).json(author);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};