const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/auth');

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
 *             required:
 *               - title
 *               - author
 *               - isbn
 *               - publicationYear
 *               - genre
 *               - pages
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Atomic Habits"
 *               author:
 *                 type: string
 *                 example: "James Clear"
 *               isbn:
 *                 type: string
 *                 example: "9780735211292"
 *               publicationYear:
 *                 type: integer
 *                 example: 2018
 *               genre:
 *                 type: string
 *                 example: "Self-help"
 *               pages:
 *                 type: integer
 *                 example: 320
 *               description:
 *                 type: string
 *                 example: "A book about building good habits"
 *               isRead:
 *                 type: boolean
 *                 example: true
 *               rating:
 *                 type: number
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Book created
 */
router.post('/',
  ensureAuth,
  [
    body('title').trim().notEmpty(),
    body('author').trim().notEmpty(),
    body('isbn').trim().notEmpty(),
    body('publicationYear').isInt({ min: 1000, max: 2100 }),
    body('genre').trim().notEmpty(),
    body('pages').isInt({ min: 1 }),
    body('description').trim().isLength({ min: 10 }),
    body('isRead').optional().isBoolean(),
    body('rating').optional().isFloat({ min: 1, max: 5 })
  ],
  createBook
);


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Title"
 *               author:
 *                 type: string
 *                 example: "Updated Author"
 *               isbn:
 *                 type: string
 *                 example: "123456789"
 *               publicationYear:
 *                 type: integer
 *                 example: 2020
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               pages:
 *                 type: integer
 *                 example: 200
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               isRead:
 *                 type: boolean
 *                 example: true
 *               rating:
 *                 type: number
 *                 example: 4.5
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put('/:id',
  ensureAuth, 
  [
    param('id').isMongoId(),
    body('title').optional().trim().notEmpty(),
  ],
  updateBook
);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Book deleted
 */
router.delete('/:id',
  ensureAuth,
  [
    param('id').isMongoId()
  ],
  deleteBook
);

module.exports = router;