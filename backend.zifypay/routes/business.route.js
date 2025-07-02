const router = require("express").Router();
const businessController = require("../controllers/business.controller");

router.post("/signup", businessController.registerNewBusiness);
router.post("/upload-thumbnail", businessController.uploadThumbnail);
router.get("/getAllBusiness", businessController.getAllBusinesses);
router.get("/getAllBusines", businessController.getAllBusinesses);
router.get("/by-owner/:ownerId", businessController.getBusinessByOwnerId);
router.get("/:id", businessController.getBusinessById);
const { addReviewToBusiness, getBusinessReviews } = businessController;
router.post("/:id/reviews", addReviewToBusiness);
router.get("/:id/reviews", getBusinessReviews);

module.exports = router;
