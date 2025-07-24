const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business.controller");
const {getAllBusinessesWithStatus,} = require("../controllers/business1.controller");



router.get("/with-status", getAllBusinessesWithStatus);
router.post("/signup", businessController.registerNewBusiness);
router.post("/upload-thumbnail", businessController.uploadThumbnail);
router.get("/getAllBusiness", businessController.getAllBusinesses);
router.get("/getAllBusines", businessController.getAllBusinesses);
router.get("/by-owner/:ownerId", businessController.getBusinessByOwnerId);
router.get("/:id", businessController.getBusinessById);
const { addReviewToBusiness, getBusinessReviews , checkExistingReview } = businessController;
router.post("/:id/reviews", addReviewToBusiness);
router.get("/:id/reviews", getBusinessReviews);
router.get('/:businessId/reviews/check', checkExistingReview);
router.get("/with-status", getAllBusinessesWithStatus);

// Purchase subscription plan (placeholder, no payment integration yet)
router.post("/purchase-subscription", businessController.purchaseSubscription);

module.exports = router;
