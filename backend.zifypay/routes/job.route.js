const router = require("express").Router();
const jobController = require("../controllers/job.controller");

// 🔒 You can insert static admin auth middleware here if needed
// const { verifyAdminToken } = require("../middlewares/adminAuth");

router.post("/", /* verifyAdminToken, */ jobController.createJob);
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);
router.put("/:id", /* verifyAdminToken, */ jobController.updateJob);
router.delete("/:id", /* verifyAdminToken, */ jobController.deleteJob);

module.exports = router;
