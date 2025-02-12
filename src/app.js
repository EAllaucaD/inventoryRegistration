require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Load documentation Swagger
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

const app = express();

app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Make sure the server interprets JSON

// Route for see Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes of inventary
app.use('/api/inventory', inventoryRoutes);

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Inventory Update service running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});


// Ensure BigInt can be serialized to JSON
BigInt.prototype.toJSON = function () {
  return this.toString();  // Convert BigInt to String to serialize it
};
