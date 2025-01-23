const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/register', inventoryController.registerInventory);

module.exports = router;
