const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Sakepedia API Doc',
    description:
      '<a href="https://sakepedia.code4sake.org/">Sakepedia</a>で提供しているAPI',
  },
  // host: 'sakepedia.code4sake.org/api',
  host: 'localhost:3030/api',
  schemes: ['https', 'http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './routes/breweries.js',
  './routes/brands.js',
  './routes/sakes.js',
  './routes/comments.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
