const router = require("express").Router();
const jwt = require("jsonwebtoken");

const ADMIN_EMAIL = "Kenneth@lodgezify.com";
const SECRET_KEY = process.env.ADMIN_SECRET || 'aafsgdhjkhgfdsfartu7ugutyuiopoiuytrewq';

router.post("/admin-token", (req, res) => {
  const { email } = req.body;

  if (email !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Invalid admin email" });
  }

  const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, { expiresIn: "1d" });

  res.status(200).json({ token });
});

module.exports = router;
