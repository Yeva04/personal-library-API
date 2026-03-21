require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./config/passport');

const connectDB = require('./database/connection');

const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const authRoutes = require('./routes/auth'); 

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());

/**
 * SESSION (REQUIRED FOR OAUTH)
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

/**
 * PASSPORT MIDDLEWARE
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * AUTH ROUTES (THIS FIXES YOUR ERROR)
 */
app.use('/auth', authRoutes);

/**
 * Swagger UI
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * API Routes
 */
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

/**
 *  Root Route
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Library API running 🚀',
    documentation: '/api-docs'
  });
});

/**
 *  Start Server AFTER DB CONNECTS
 */
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });