const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connection');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const swagger = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
// Alternative in server.js (replace the two lines above):
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

// Root
app.get('/', (req, res) => {
  res.json({ message: 'Library API running', docs: '/api-docs' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error(err);
  process.exit(1);
});