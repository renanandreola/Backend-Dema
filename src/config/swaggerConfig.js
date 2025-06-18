const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Dema Automotive",
    version: "1.0.0",
    description: "API Doc",
  },
  servers: [
    {
      url: "http://localhost:3000/dema",
      description: "Local server",
    },
    {
      url: "https://dema-api-d36ba11b74d8.herokuapp.com/dema",
      description: "Production server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "./comments.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
