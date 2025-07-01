const router = require("express").Router();
const applicationController = require("../controllers/application.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single("resume"), applicationController.applyToJob);


// 🔒 Admin-only routes (add middleware if needed)
router.get("/", /* verifyAdminToken, */ applicationController.getAllApplications);
router.get("/:id", /* verifyAdminToken, */ applicationController.getApplicationById);
router.patch("/:id/status", /* verifyAdminToken, */ applicationController.updateApplicationStatus);
router.delete("/:id", /* verifyAdminToken, */ applicationController.deleteApplication);

module.exports = router;
