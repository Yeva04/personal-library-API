const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/auth');
const { body, param } = require('express-validator');

const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
} = require('../controllers/authorsController');

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Author management
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get('/', getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author found
 */
router.get('/:id', [
  param('id').isMongoId().withMessage('Invalid ID')
], getAuthorById);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "J.K. Rowling"
 *               bio:
 *                 type: string
 *                 example: "Author of Harry Potter"
 *     responses:
 *       201:
 *         description: Author created
 */
router.post('/',
  ensureAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('bio').optional().isLength({ min: 5 }).withMessage('Bio must be at least 5 characters')
  ],
  createAuthor
);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               bio:
 *                 type: string
 *                 example: "Updated bio"
 *     responses:
 *       200:
 *         description: Author updated
 */
router.put('/:id',
  ensureAuth,
  [
    param('id').isMongoId(),
    body('name').optional().trim().notEmpty(),
    body('bio').optional().isLength({ min: 5 })
  ],
  updateAuthor
);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Author deleted
 */
router.delete('/:id',
  ensureAuth,
  [
    param('id').isMongoId()
  ],
  deleteAuthor
);

module.exports = router;