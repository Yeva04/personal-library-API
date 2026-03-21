// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
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
        description: 'Local Server'
      },
      {
        url: 'https://library-api-fwts.onrender.com',
        description: 'Production Server'
      }
    ]
  },
  apis: [path.join(__dirname, '../routes/*.js')] // ✅ correct path
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; // ✅ correct export