const express = require("express");
const router = express.Router();
const { createLoan, getAllLoans } = require("../controllers/loan.controller")
// https://api.zifypay.com/api/v1/loan GET and POST
// POST: Create a new loan application
// GET: Admin view all loan applications
router.post("/", createLoan);     // Submit form
router.get("/", getAllLoans);     // Admin: View submissions

module.exports = router;
