const mongoose = require('mongoose');

const transactionLogSchema = new mongoose.Schema({
  tranNbr: { type: String, required: true },
  batchId: { type: String, required: true },
  amount: { type: Number, required: true },
  accountNbr: { type: String, required: true }, // Masked
  expDate: { type: String }, // Masked or partial
  status: { type: String, enum: ['success', 'failure'], required: true },
  responseCode: { type: String },
  responseMessage: { type: String },
  requestPayload: { type: Object }, // Masked
  responsePayload: { type: Object },
}, {
  timestamps: true,
});

module.exports = mongoose.model('TransactionLog', transactionLogSchema); 