const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'Copygram',
    version: '1.0.0'
  },
  host: 'epbygomw0290.gomel.epam.com:8081',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: [
    './routes/**/*.js',
    './swagger/**/*.yaml'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
