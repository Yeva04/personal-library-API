// docs/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Library API',
      version: '1.0.0',
      description: 'CRUD API for managing books and authors with OAUth authentication',
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
    ],

    components: { 
      securitySchemes: { 
        cookieAuth: {
           type: 'apiKey', 
           in: 'cookie', 
           name: 'connect.sid' 
          } 
        } 
      },

      //GLOBAL SECURITY (applies to all endpoints unless overridden) 
      security: [ 
        { 
          cookieAuth: [] 
        } 
      ] 
    },

  apis: [path.join(__dirname, '../routes/*.js')]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 