const router = require("express").Router();
const catalogController = require("../controllers/catalog.controller");
const {
  authenticateBusinessToken,
} = require("../middlewares/authToken.middleware");
const { checkIsOwner } = require("../middlewares/checkBusinessApiAuth");

router.get("/categories", catalogController.getAllCategories);

router.get("/service-types", catalogController.getServiceTypes);

router.get(
  "/my-services",
  authenticateBusinessToken,
  checkIsOwner,
  catalogController.getMyServices
);

router.get(
  "/my-services/:serviceId",
  authenticateBusinessToken,
  checkIsOwner,
  catalogController.getServiceById
);

router.post(
  "/category",
  authenticateBusinessToken,
  checkIsOwner,
  catalogController.createCategory
);

router.post(
  "/resources",
  authenticateBusinessToken,
  checkIsOwner,
  catalogController.createResource
);

router.post(
  "/services",
  authenticateBusinessToken,
  checkIsOwner,
  catalogController.createService
);

module.exports = router;
