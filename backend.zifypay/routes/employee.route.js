const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");
const {
  authenticateBusinessToken,
} = require("../middlewares/authToken.middleware");
const { checkIsOwner } = require("../middlewares/checkBusinessApiAuth");
const validate = require("../middlewares/validate");
const { newUserValidation } = require("../validations/user.validation");

router.get(
  "/",
  authenticateBusinessToken,
  checkIsOwner,
  employeeController.searchCompanyEmployees
);

router.get(
  "/:employeeId",
  authenticateBusinessToken,
  checkIsOwner,
  employeeController.getEmployeeById
);

router.post(
  "/signup",
  validate(newUserValidation),
  employeeController.addEmployee
);

router.post("/login", employeeController.loginOwnerEmployee);

router.patch(
  "/:employeeId",
  authenticateBusinessToken,
  checkIsOwner,
  employeeController.updateEmployeeWithJobProfile
);

router.patch(
  "/:employeeId/archive",
  authenticateBusinessToken,
  checkIsOwner,
  employeeController.archiveEmployee
);

router.post(
  "/:businessId/create",
  authenticateBusinessToken,
  checkIsOwner,
  employeeController.createEmployeeForBusiness
);

router.get(
  "/business/:businessId/all",
  authenticateBusinessToken,
  checkIsOwner,
  employeeController.getEmployeesForBusiness
);



module.exports = router;
