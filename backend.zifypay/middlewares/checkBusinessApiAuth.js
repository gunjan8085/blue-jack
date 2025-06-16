const { Employee } = require("../models/index");

module.exports = {
  checkIsOwner: async (req, res, next) => {
    try {
      const { userId } = req.user;

      const employee = await Employee.findById(userId).populate("jobProfile");

      if (!employee) {
        return res
          .status(401)
          .json({ error: "Authrization cannot be confirmend" });
      }

      if (employee.isOwner === false) {
        return res.status(403).json({ error: "Not authorized" });
      }

      req.owner = employee;
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
