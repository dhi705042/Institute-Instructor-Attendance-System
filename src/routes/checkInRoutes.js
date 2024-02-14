const express = require('express');
const router = express.Router();
const checkInController = require('../controllers/checkInController');

router.post('/', checkInController.checkIn);

module.exports = router;