const Business = require("../models/business.model");

exports.getAllBusinessesWithStatus = async (req, res) => {
  try {
    const businesses = await Business.find({}); // no isActive filter

    const businessesWithStatus = businesses.map((b) => ({
      ...b.toObject(),
      status: b.isActive ? "Active" : "Inactive",
    }));

    res.status(200).json({
      success: true,
      total: businessesWithStatus.length,
      data: businessesWithStatus,
    });
  } catch (error) {
    console.error("Error fetching businesses with status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch businesses",
    });
  }
};
