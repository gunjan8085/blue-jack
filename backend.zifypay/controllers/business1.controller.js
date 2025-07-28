const Business = require("../models/business.model");

exports.getAllBusinessesWithStatus = async (req, res) => {
  try {
    const businesses = await Business.find(
      {},
      "brandName status isActive contactEmail contactPhone address businessType"
    );
    res.status(200).json({ success: true, businesses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBusinessStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["activated", "deactivated"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }
    const business = await Business.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }
    res.status(200).json({ success: true, business });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.getBusinessWithStatusById = async (req, res) => {
  try {
    const { businessId } = req.body;

    if (!businessId) {
      return res
        .status(400)
        .json({ success: false, message: "businessId is required" });
    }

    const business = await Business.findById(
      businessId,
      "brandName status isActive contactEmail contactPhone address businessType"
    );

    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    return res.status(200).json({
      success: true,
      businesses: [business], // keep as array for frontend compatibility
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
