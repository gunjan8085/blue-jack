const express = require("express");
// const router = express.Router();
const serviceController = require("../controllers/serviceCategories.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() }); // or your s3 storage config

router.post(
  "/:businessId/service-categories",
  upload.single("image"),
  serviceController.addServiceCategories
);

router.patch(
  "/:businessId/service-categories/:serviceId",
  upload.single("image"),
  serviceController.updateServiceCategory
);

router.get(
  "/:businessId/service-categories",
  serviceController.getAllServiceCategories
);

module.exports = router;
