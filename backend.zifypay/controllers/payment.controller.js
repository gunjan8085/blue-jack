const { processEpxSale } = require('../services/epxPayment.service');
const TransactionLog = require('../models/transactionLog.model'); // adjust path as needed

function getField(obj, key) {
  return obj[key] || obj[key.toUpperCase()];
}

function maskCardNumber(cardNumber) {
  return cardNumber.replace(/\d(?=\d{4})/g, '*'); // masks all but last 4
}

function maskExpDate(expDate) {
  return `**/${expDate.slice(-2)}`; // show only last 2 digits of year
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

    const payload = { amount, accountNbr, expDate, cvv2, firstName, lastName, address, city, state, zipCode, batchId, tranNbr };

    let result;
    let status = 'success';
    let responseCode = '';
    let responseMessage = '';

    try {
      result = await processEpxSale(payload);
      responseCode = result.responseCode || '';
      responseMessage = result.responseMessage || '';
    } catch (err) {
      status = 'failure';
      responseMessage = err.message;
    }

    // Log to DB (masking sensitive info)
    await TransactionLog.create({
      tranNbr,
      batchId,
      amount,
      accountNbr: maskCardNumber(accountNbr),
      expDate: maskExpDate(expDate),
      status,
      responseCode,
      responseMessage,
      requestPayload: {
        ...payload,
        accountNbr: maskCardNumber(accountNbr),
        expDate: maskExpDate(expDate),
        cvv2: '***',
      },
      responsePayload: result || {},
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
