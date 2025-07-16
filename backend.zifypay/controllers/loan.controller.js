const loanModel = require("../models/loan.model");


// @desc   Submit a loan application
// @route  POST /api/v1/loans
exports.createLoan = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      businessName,
      email,
      phone,
      mobile,
      industry,
      timeInBusiness,
      annualSales,
      product,
      agreedToTerms
    } = req.body;

    if (!agreedToTerms) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    const loan = new loanModel({
      firstName,
      lastName,
      businessName,
      email,
      phone,
      mobile,
      industry,
      timeInBusiness,
      annualSales,
      product,
      agreedToTerms,
    });

    const savedLoan = await loan.save();
    return res.status(201).json({ message: "Loan application submitted.", loan: savedLoan });
  } catch (error) {
    console.error("Error saving loan:", error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

// @desc   Get all loan applications (admin usage)
// @route  GET /api/v1/loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await loanModel.find().sort({ createdAt: -1 });
    return res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    return res.status(500).json({ message: "Failed to fetch loans.", error });
  }
};
