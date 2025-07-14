const { processEpxSale } = require('../services/epxPayment.service');
const { logTransaction } = require('../services/transactionLog.service');
const TransactionLog = require('../models/transactionLog.model');

function getField(obj, key) {
  return obj[key] || obj[key.toUpperCase()];
}

async function charge(req, res) {
  try {
    const amount = getField(req.body, 'amount');
    const accountNbr = getField(req.body, 'accountNbr');
    const expDate = getField(req.body, 'expDate');
    const cvv2 = getField(req.body, 'cvv2');
    const firstName = getField(req.body, 'firstName');
    const lastName = getField(req.body, 'lastName');
    const address = getField(req.body, 'address');
    const city = getField(req.body, 'city');
    const state = getField(req.body, 'state');
    const zipCode = getField(req.body, 'zipCode');
    const batchId = getField(req.body, 'batchId');
    const tranNbr = getField(req.body, 'tranNbr');
    if (!amount || !accountNbr || !expDate || !cvv2 || !firstName || !lastName || !address || !city || !state || !zipCode || !batchId || !tranNbr) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    let result;
    let status = 'success';
    let responseCode = null;
    let responseMessage = null;
    try {
      result = await processEpxSale({ amount, accountNbr, expDate, cvv2, firstName, lastName, address, city, state, zipCode, batchId, tranNbr });
      responseCode = result.AUTH_RESP || null;
      responseMessage = result.AUTH_RESP_TEXT || 'Unknown transaction status';
      if (responseCode !== '00') status = 'failure';
    } catch (err) {
      status = 'failure';
      responseMessage = err.message;
    }
    await logTransaction({
      tranNbr,
      batchId,
      amount,
      accountNbr,
      expDate,
      status,
      responseCode,
      responseMessage,
      requestPayload: { ...req.body, accountNbr: undefined, cvv2: undefined, expDate: undefined },
      responsePayload: result,
    });
    if (status === 'failure') {
      return res.status(500).json({ success: false, error: responseMessage });
    }
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

async function getAllTransactions(req, res) {
  try {
    const logs = await TransactionLog.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: logs });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { charge, getAllTransactions }; 