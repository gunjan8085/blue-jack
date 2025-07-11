const axios = require('axios');
const qs = require('qs');
const { XMLParser } = require('fast-xml-parser');

const EPX_CUST_NBR = 9001;
const EPX_MERCH_NBR = 901051;
const EPX_DBA_NBR = 1;
const EPX_TERMINAL_NBR = 2;
const EPX_BASE_URL = process.env.EPX_BASE_URL || 'https://secure.epxuap.com';

async function processEpxSale({
  amount, accountNbr, expDate, cvv2,
  firstName, lastName, address, city, state,
  zipCode, batchId, tranNbr
}) {
  const payload = {
    CUST_NBR: EPX_CUST_NBR,
    MERCH_NBR: EPX_MERCH_NBR,
    DBA_NBR: EPX_DBA_NBR,
    TERMINAL_NBR: EPX_TERMINAL_NBR,
    TRAN_TYPE: 'CCE1',
    AMOUNT: amount,
    BATCH_ID: batchId,
    TRAN_NBR: tranNbr,
    ACCOUNT_NBR: accountNbr,
    EXP_DATE: expDate,
    CARD_ENT_METH: 'E',
    INDUSTRY_TYPE: 'E',
    CVV2: cvv2,
    FIRST_NAME: firstName,
    LAST_NAME: lastName,
    ADDRESS: address,
    CITY: city,
    STATE: state,
    ZIP_CODE: zipCode,
  };

  const data = qs.stringify(payload);
  try {
    const res = await axios.post(EPX_BASE_URL, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 15000,
    });

    // Log raw XML
    if (process.env.NODE_ENV !== 'production') {
      console.log('Raw EPX response:\n', res.data);
    }

    const parser = new XMLParser({ ignoreAttributes: false });
    const parsed = parser.parse(res.data);
    const fields = parsed?.RESPONSE?.FIELDS?.FIELD;

    if (!fields) {
      throw new Error('Invalid response format: no FIELDS returned');
    }

    const result = Array.isArray(fields)
      ? Object.fromEntries(fields.map(f => [f['@_KEY'], f['#text']]))
      : {};

    const code = result.AUTH_RESP || null;
    const message = result.AUTH_RESP_TEXT || 'Unknown transaction status';
   
    if (code !== '00') {
      // throw new Error(`Code ${code || 'N/A'}: ${message}`);
      console.log('code', code);
      console.log('message', message);
    }

    return result;
  } catch (err) {
    throw new Error(err.message || 'EPX payment error');

  }
}

module.exports = { processEpxSale };
