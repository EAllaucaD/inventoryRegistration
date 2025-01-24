const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();

app.use(cors()); // Enable CORS middleware
app.use(bodyParser.json()); // Make sure the server can interpret JSON

app.use('/api/inventory', inventoryRoutes);

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Ensure BigInt can be serialized as JSON
BigInt.prototype.toJSON = function () {
  return this.toString(); // Convert BigInt to String for JSON serialization
};
