const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Sakepedia API Doc',
    description: 'Sakepediaで提供しているAPI',
  },
  host: 'https://sakepedia.code4sake.org/api',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './routes/breweries.js',
  './routes/brands.js',
  './routes/sakes.js',
  './routes/comments.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
