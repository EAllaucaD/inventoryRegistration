const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authorize } = require('../Middlewares/authMiddleware');

router.post('/register', inventoryController.registerInventory, authorize);

module.exports = router;
