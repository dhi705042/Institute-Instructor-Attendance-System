const express = require('express');
const router = express.Router();
const checkOutController = require('../controllers/checkOutController');

router.post('/', checkOutController.checkOut);

module.exports = router;