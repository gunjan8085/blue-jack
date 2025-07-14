const TransactionLog = require('../models/transactionLog.model');

function maskCardNumber(cardNumber) {
  if (!cardNumber) return '';
  return cardNumber.replace(/.(?=.{4})/g, '*');
}

function maskExpDate(expDate) {
  if (!expDate) return '';
  return '**/**';
}

async function logTransaction({
  tranNbr,
  batchId,
  amount,
  accountNbr,
  expDate,
  status,
  responseCode,
  responseMessage,
  requestPayload,
  responsePayload,
}) {
  return TransactionLog.create({
    tranNbr,
    batchId,
    amount,
    accountNbr: maskCardNumber(accountNbr),
    expDate: maskExpDate(expDate),
    status,
    responseCode,
    responseMessage,
    requestPayload,
    responsePayload,
  });
}

module.exports = { logTransaction }; 