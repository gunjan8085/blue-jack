const PlatformReview = require("../models/platformReview.model");

// Get top 3 platform reviews (by rating, then most recent)
const getTopPlatformReviews = async (req, res) => {
  try {
    const reviews = await PlatformReview.find()
      .sort({ rating: -1, createdAt: -1 })
      .limit(3)
      .lean();
    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add a new platform review
const addPlatformReview = async (req, res) => {
  try {
    const { user, name, avatar, rating, comment } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ success: false, message: "Name, rating, and comment are required." });
    }
    const review = await PlatformReview.create({ user, name, avatar, rating, comment });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a platform review (by id)
const updatePlatformReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, avatar, rating, comment } = req.body;
    const review = await PlatformReview.findByIdAndUpdate(
      id,
      { name, avatar, rating, comment },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found." });
    }
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getTopPlatformReviews,
  addPlatformReview,
  updatePlatformReview,
}; 