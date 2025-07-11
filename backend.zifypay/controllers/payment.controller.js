const { processEpxSale } = require('../services/epxPayment.service');

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
    const result = await processEpxSale({ amount, accountNbr, expDate, cvv2, firstName, lastName, address, city, state, zipCode, batchId, tranNbr });
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { charge }; 