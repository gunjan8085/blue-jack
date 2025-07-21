
const fs = require('fs');
const path = require('path');

export default function generateBatchId() {
  const currentDate = new Date();
  const datePrefix = currentDate.toISOString().slice(0, 10).replace(/-/g, ''); // Format as YYYYMMDD

  // Path to store batch count file
  const batchCountFilePath = path.join("../", 'batchCount.json');

  let batchCount = 1; // Default to 1 if the count file doesn't exist

  try {
    // Check if the batch count file exists
    if (fs.existsSync(batchCountFilePath)) {
      const data = fs.readFileSync(batchCountFilePath, 'utf8');
      const jsonData = JSON.parse(data);

      // Check if the stored date matches today
      if (jsonData.date === datePrefix) {
        batchCount = jsonData.count + 1; // Increment the counter for the day
      }
    }

    // Update the batch count in the file
    const newData = {
      date: datePrefix, // Save the current date in YYYYMMDD format
      count: batchCount
    };
    fs.writeFileSync(batchCountFilePath, JSON.stringify(newData));

  } catch (error) {
    console.error('Error reading or writing batch count file:', error);
  }

  // Generate the final BATCH_ID in the format: YYYYMMDDXX (with two-digit counter)
  const batchId = `${datePrefix}${String(batchCount).padStart(2, '0')}`;
  console.log(batchId);  // Output for debugging
  
  return batchId;
}


/**
 * Extract field value from EPX XML response
 */
export const extractFieldFromXML = (xmlString, fieldKey) => {
  try {
    const regex = new RegExp(`<FIELD KEY="${fieldKey}">(.*?)</FIELD>`, 'i');
    const match = xmlString.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
};

/**
 * Validate payment details format
 */
 export const validatePaymentDetails = (paymentDetails) => {
  const errors = [];

  if (!paymentDetails.cardNumber || !/^\d{13,19}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
    errors.push('Invalid card number');
  }

  // if (!paymentDetails.expDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expDate)) {
  //   errors.push('Invalid expiration date (MM/YY format required)');
  // }

  if (!paymentDetails.cvv || !/^\d{3,4}$/.test(paymentDetails.cvv)) {
    errors.push('Invalid CVV');
  }

  if (!paymentDetails.firstName || paymentDetails.firstName.trim().length < 1) {
    errors.push('First name required');
  }

  if (!paymentDetails.lastName || paymentDetails.lastName.trim().length < 1) {
    errors.push('Last name required');
  }

  if (!paymentDetails.zipCode || !/^\d{5}(-\d{4})?$/.test(paymentDetails.zipCode)) {
    errors.push('Invalid ZIP code');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate unique request ID for tracking
 */
export const generateRequestId = () => {
  return `REQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};