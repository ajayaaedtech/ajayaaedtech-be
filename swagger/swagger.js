// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ajaya EdTech API',
      version: '1.0.0',
      description: 'API documentation for Ajaya EdTech backend',
    },
  },
  apis: ['./routes/*.js', './controllers/*.js'], // adjust based on your files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
