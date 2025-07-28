// Simple OTP cache using node-cache
const NodeCache = require('node-cache');

// 600 seconds = 2-3 minutes around 
const otpCache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

module.exports = otpCache;
