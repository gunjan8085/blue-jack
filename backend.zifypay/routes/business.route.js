const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business.controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const {
  registerNewBusiness,
  uploadThumbnail,
  getAllBusinesses,
  getBusinessByOwnerId,
  getBusinessById,
  addReviewToBusiness,
  getBusinessReviews,
  checkExistingReview,
  purchaseSubscription,
  updateBusiness
} = businessController;

// Register new business
router.post("/signup", registerNewBusiness);

// Upload business thumbnail
router.post("/upload-thumbnail", upload.single("file"), uploadThumbnail);

// Get all businesses
router.get("/getAllBusinesses", getAllBusinesses); // Fixed typo from getAllBusines

// Get business by owner ID
router.get("/by-owner/:ownerId", getBusinessByOwnerId);

// Get business by business ID
router.get("/:id", getBusinessById);

// Edit (update) business by ID
router.put("/:id", updateBusiness);

// Reviews
router.post("/:id/reviews", addReviewToBusiness);
router.get("/:id/reviews", getBusinessReviews);
router.get("/:businessId/reviews/check", checkExistingReview);

// Purchase subscription plan
router.post("/purchase-subscription", purchaseSubscription);

module.exports = router;