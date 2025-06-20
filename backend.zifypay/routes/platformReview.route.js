const express = require("express");
const router = express.Router();
const {
  getTopPlatformReviews,
  addPlatformReview,
  updatePlatformReview,
} = require("../controllers/platformReview.controller");

// GET top 3 platform reviews
router.get("/top", getTopPlatformReviews);

// POST a new platform review
router.post("/", addPlatformReview);

// PUT update a platform review by id
router.put("/:id", updatePlatformReview);

module.exports = router; 