// lib/const.ts
const {
  NODE_ENV,
  NEXT_PUBLIC_DEVELOPMENT_URL: DEV_URL,
  NEXT_PUBLIC_PRODUCTION_URL: PROD_URL,
} = process.env;

// Provide fallbacks for development
const developmentUrl = DEV_URL || "http://localhost:5001/api/v1";
const productionUrl = PROD_URL || "http://localhost:5001/api/v1";

export const API_URL =
  NODE_ENV === "production" ? productionUrl : developmentUrl;





//   // lib/const.ts
// console.log('Environment variables:', {
//   NODE_ENV: process.env.NODE_ENV,
//   DEV_URL: process.env.NEXT_PUBLIC_DEVELOPMENT_URL,
//   PROD_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
// });