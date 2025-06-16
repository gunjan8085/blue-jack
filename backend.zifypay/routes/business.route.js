const router = require("express").Router();
const businessController = require("../controllers/business.controller");

router.post("/signup", businessController.registerNewBusiness);
router.get("/getAllBusiness", businessController.getAllBusinesses);
router.get("/by-owner/:ownerId", businessController.getBusinessByOwnerId);
router.get("/:id", businessController.getBusinessById);

module.exports = router;
