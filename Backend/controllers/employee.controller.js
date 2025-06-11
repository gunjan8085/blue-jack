const employeeService = require("../services/employee.service");
const { securePassword } = require("../utils/bcrypt.util");
const { generateToken } = require("../utils/token.util");

module.exports = {
  addEmployee: async (req, res, next) => {
    try {
      if (req.body.authType === "password") {
        req.body.password = await securePassword(req.body.password);
      }

      const employee = await employeeService.addEmployee(req.body);

      if (employee) {
        const token = generateToken(employee._id, "Business");

        const responseData = { data: employee, success: true };

        if (req.body.isOwner) {
          responseData.token = token;
        }

        res.status(201).json(responseData);
      }
    } catch (error) {
      console.error("Error signing up business:", error);
      next(error);
    }
  },

  loginOwnerEmployee: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await employeeService.loginOwnerEmployee(email, password);
      if (result === null) {
        return res.status(201).json({
          success: true,
          message: "Employee not found",
        });
      }
      const token = generateToken(result._id, "Business");
      return res.status(200).json({
        data: { employee: result, token: token },
        success: true,
        message: "Logged in successfully",
      });
    } catch (error) {
      console.error(error);
      const message = error.message || "Internal Server Error";
      res.status(500).json({ message: message });
    }
  },

  updateEmployeeWithJobProfile: async (req, res, next) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          message: "Request body must contain at least one field.",
          success: false,
        });
      }

      const employeeId = req.params.employeeId;

      if (req.body.password) {
        req.body.password = await securePassword(req.body.password);
      }

      const updatedData = await employeeService.updateEmployeeWithJobProfile(
        employeeId,
        req.body
      );

      res.status(200).json({ data: updatedData, success: true });
    } catch (error) {
      console.error("Error signing up business:", error);
      next(error);
    }
  },

  archiveEmployee: async (req, res, next) => {
    try {
      await employeeService.archiveEmployee(req.params.employeeId);

      res
        .status(200)
        .json({ message: "Employee archived successfully", success: true });
    } catch (error) {
      console.error("Error signing up business:", error);
      next(error);
    }
  },

  searchCompanyEmployees: async (req, res, next) => {
    try {
      const { name } = req.query;
      const companyId = req.owner.jobProfile.company;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, message: "Name query is required" });
      }

      const employees = await employeeService.searchCompanyEmployeesByName(
        companyId,
        name
      );
      res
        .status(200)
        .json({ success: true, count: employees.length, data: employees });
    } catch (err) {
      next(err);
    }
  },

  getEmployeeById: async (req, res, next) => {
    try {
      const { employeeId } = req.params;
      const companyId = req.owner.jobProfile.company;

      const employee = await employeeService.getEmployeeById(
        companyId,
        employeeId
      );

      res.status(200).json({ success: true, data: employee });
    } catch (err) {
      next(err);
    }
  },
};
