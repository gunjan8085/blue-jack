const express = require('express');
const router = express.Router();
const {
  setupPaymentAccount,
  getPaymentAccountStatus,
  updatePaymentAccount,
  charge,
  getAllTransactions,
  getpaymentHistory
} = require('../controllers/payment.controller');

router.post('/charge', charge);
router.get('/transactions', getAllTransactions);
router.post('/setup-payment-account', setupPaymentAccount);
router.get('/history/:businessId', getpaymentHistory);
router.get('/account-status/:businessId', getPaymentAccountStatus);
router.put('/update-payment-account/:businessId', updatePaymentAccount);

module.exports = router;
