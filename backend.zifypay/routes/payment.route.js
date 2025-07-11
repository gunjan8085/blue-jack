const express = require('express');
const { charge } = require('../controllers/payment.controller');

const router = express.Router();

router.post('/api/payments/charge', charge);

module.exports = router; 