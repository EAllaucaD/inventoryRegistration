require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const inventoryRoutes = require('./routes/inventoryRoutes');
const client = require('prom-client');

// Load documentation Swagger
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

const app = express();
const port = process.env.PORT || 3010;

const collectDefaultMetrics = client.collectDefaultMetrics;

// Configuring Prometheus metrics
collectDefaultMetrics();

// Request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests received",
  labelNames: ["method", "route", "status_code"],
});

// Histogram for response times
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Histogram for the duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

//MMiddleware to measure metrics on each request
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      { method: req.method, route: req.path, status_code: res.statusCode },
      duration
    );
  });

  next();
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});


app.use(cors());  // Enable CORS
app.use(bodyParser.json());  // Make sure the server interprets JSON

// Route for see Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes of inventary
app.use('/api/inventory', inventoryRoutes);


app.listen(port, () => {
  console.log(`Inventory Update service running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});


// Ensure BigInt can be serialized to JSON
BigInt.prototype.toJSON = function () {
  return this.toString();  // Convert BigInt to String to serialize it
};
