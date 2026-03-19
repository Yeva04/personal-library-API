// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Library API',
      version: '1.0.0',
      description: 'CRUD API for managing books and authors',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development',
      },
      {
        url: 'https://your-library-api.onrender.com',  // ← update with your real Render URL
        description: 'Production (Render)',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/**/*.js')],  // scans routes folder
};

const swaggerSpec = swaggerJsdoc(options);

// Export the ready-to-use middleware directly
module.exports = {
  serve: swaggerUi.serve,          // ← the function you need for app.use()
  setup: (req, res, next) => swaggerUi.setup(swaggerSpec)(req, res, next),  // or just swaggerUi.setup(swaggerSpec)
};