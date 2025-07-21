const { processEpxSale } = require('../services/epxPayment.service');
const TransactionLog = require('../models/transactionLog.model'); // adjust path as needed
const Business = require("../models/business.model");

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


async function setupPaymentAccount(req, res) {

  const { businessId, paymentGatewayData } = req.body;
  if (!businessId || !paymentGatewayData) {
    return res.status(400).json({ success: false, message: "Business ID and payment gateway data are required" });
  }
  const business = await Business.findById(businessId);
  if (!business) {
    return res.status(404).json({ success: false, message: "Business not found" });
  }
  // validate the paymentGatewayData here if necessary
  // For example, check if all required fields are present and valid
  if (!paymentGatewayData.NAME || !paymentGatewayData.CUST_NBR || !paymentGatewayData.MERCH_NBR || !paymentGatewayData.DBA_NBR || !paymentGatewayData.TERMINAL_NBR) {
    return res.status(400).json({ success: false, message: "Invalid payment gateway data" });
  }
  try {
    // Assuming paymentGatewayData contains the necessary fields for the payment account
    business.connectedPaymentAccount = paymentGatewayData;
    business.isActive = true; // Set the business as active if it has a payment account
    await business.save();
    return res.status(200).json({ success: true, message: "Payment account setup successfully", data: business.connectedPaymentAccount });
  } catch (error) {
    console.error("Error setting up payment account:", error);
    return res.status(500).json({ success: false, message: "Failed to set up payment account", error: error.message });
  }
}


async function getPaymentAccountStatus(req, res) {
  try {
    const { businessId } = req.params;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    const account = business.connectedPaymentAccount || {};
    const isConnected =
      account.CUST_NBR !== "NA" &&
      account.MERCH_NBR !== "NA" &&
      account.DBA_NBR !== "NA" &&
      account.TERMINAL_NBR !== "NA";

    return res.status(200).json({
      success: true,
      isConnected,
      account: isConnected ? account : null,
      message: isConnected ? "Account is connected" : "Account is not connected",
    });
  } catch (err) {
    console.error("Error checking account status:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function updatePaymentAccount(req, res) {
  try {
    const { businessId } = req.params;
    const updateData = req.body;

    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    const validFields = ["NAME", "CUST_NBR", "MERCH_NBR", "DBA_NBR", "TERMINAL_NBR"];
    validFields.forEach(field => {
      if (updateData[field]) {
        business.connectedPaymentAccount[field] = updateData[field];
      }
    });

    await business.save();
    return res.status(200).json({ success: true, message: "Payment account updated successfully", account: business.connectedPaymentAccount });
  } catch (error) {
    console.error("Error updating payment account:", error);
    return res.status(500).json({ success: false, message: "Failed to update payment account", error: error.message });
  }
}


async function getpaymentHistory(req, res) {
  try {
    const { businessId } = req.params;
    const business = await Business.findById(businessId).select('paymentHistory').sort({ 'paymentHistory.date': -1 });
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }
    return res.status(200).json({ success: true, data: business.paymentHistory });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch payment history", error: error.message });
  }
}



module.exports = { charge, getAllTransactions , setupPaymentAccount , getpaymentHistory , getPaymentAccountStatus, updatePaymentAccount };
