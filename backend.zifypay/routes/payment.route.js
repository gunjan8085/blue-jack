const express = require('express');
const { charge, getAllTransactions } = require('../controllers/payment.controller');

const router = express.Router();
router.post('/charge', charge);
router.get('/transactions', getAllTransactions);

module.exports = router; 