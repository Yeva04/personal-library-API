const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/booksController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/', getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Not found
 */
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid ID')
], getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, isbn, publicationYear, genre, pages, description]
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Validation error
 */
router.post('/', [
  body('title').trim().notEmpty(),
  body('author').trim().notEmpty(),
  body('isbn').trim().notEmpty(),
  body('publicationYear').isInt({ min: 1000, max: 2100 }),
  body('genre').trim().notEmpty(),
  body('pages').isInt({ min: 1 }),
  body('description').trim().isLength({ min: 10 }),
  body('isRead').optional().isBoolean(),
  body('rating').optional().isFloat({ min: 1, max: 5 })
], createBook);

router.put('/:id', [
  param('id').isMongoId(),
  // same body validators as POST
  body('title').optional().trim().notEmpty(),
  // ... add others as optional
], updateBook);

router.delete('/:id', [
  param('id').isMongoId()
], deleteBook);

module.exports = router;