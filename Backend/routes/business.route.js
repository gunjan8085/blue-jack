const router = require("express").Router();
const businessController = require("../controllers/business.controller");

router.post("/signup", businessController.registerNewBusiness);
router.get("/getAllBusiness", businessController.getAllBusinesses);

module.exports = router;
