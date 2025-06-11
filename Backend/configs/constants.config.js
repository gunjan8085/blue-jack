const { time } = require("console");

require("dotenv").config();

module.exports = {
  // ========== File Paths ==========
  PATHS: {
    PROFILE_PHOTOS: "profile-photos",
    BUSINESS_PHOTOS: "business-photos",
  },

  // ========== Pagination ==========
  PAGINATION: {
    PAGE_LIMIT: 12,
  },

  // ========== Filters ==========
  FILTERS: {
    USER_DATA: "_id name",
  },

  // ========== Enums ==========
  ENUMS: {
    USER_ROLES: ["User", "Business"],
    CATEGORIES: [
      "Hair & Styling",
      "Nail services",
      "Eyebrow & lashes",
      "Facial & skincare",
      "Injectables & fillers",
      "Makeup",
      "Barbering",
      "Massage",
      "Hair extensions",
      "Hair removal",
      "Tattoo & piercing",
      "Fitness",
      "Other",
    ],
    SOFTWARES: [
      "Acuity",
      "Booksy",
      "Calendly",
      "Goldie",
      "Janeapp",
      "Mindbody",
      "Salon Iris",
      "Sethnore",
      "Shortcuts",
      "Square",
      "Styleseat",
      "Timely",
      "Treatwell",
      "Vagaro",
      "Zenoti",
      "I'm not using any software",
      "Other",
    ],
    FOUND_US_AT: [
      "Recommended by a friend",
      "Search engine (e.g. Google, Bing)",
      "Social media",
      "Advert in the mail",
      "Magazine ad",
      "Ratings website (e.g. Capterra, Trustpilot)",
      "Other",
    ],
    CANCELLATION_REASONS: [
      "Duplicate appointment",
      "Appointment made by mistake",
      "Client not available",
    ],
    DEFAUTL_SHIFT: [
      {
        weekdays: [1, 2, 3, 4, 5],
        shifts: [
          {
            startTime: {
              hour: 9,
              minute: 0,
            },
            endTime: {
              hour: 18,
              minute: 0,
            },
          },
        ],
        timeOffs: [
          {
            startTime: {
              hour: 12,
              minute: 0,
            },
            endTime: {
              hour: 13,
              minute: 0,
            },
          },
        ],
      },
    ],
  },

  // ========== JWT Secrets ==========
  TOKENS: {
    USER: {
      SECRET: process.env.USER_TOKEN_SECRET,
      EXPIRY: process.env.USER_TOKEN_SECRET_EXPIRY,
    },
    BUSINESS: {
      SECRET: process.env.BUSINESS_TOKEN_SECRET,
      EXPIRY: process.env.BUSINESS_TOKEN_SECRET_EXPIRY,
    },
  },

  SERVICE_TYPES: {
    "Laser Lipo & Related Services": [
      "Laser Lipo",
      "Mole Removal",
      "Moroccan Bath",
      "Mud Bath",
      "Onsen",
      "Salt Therapy",
      "Sauna",
      "Scalp Micropigmentation",
      "Scar Removal",
      "Skin Tag Removal",
      "Spa Package",
      "Spray Tanning",
      "Steam Bath",
      "Stretch Mark Removal",
      "Tanning Bed",
    ],
    "Facials & Skincare": [
      "Acne Facial",
      "Acne Scar Treatment",
      "Chemical Peel",
      "Dermabrasion",
      "Dermaplaning",
      "Facial",
      "Facial Extractions",
      "Facial Massage",
      "IPL Treatment",
      "Laser Resurfacing",
      "LED Light Therapy",
      "Men's Facial",
      "Mesotherapy",
      "Microblading",
    ],
    "Barbering & Body": [
      "Beard Trimming",
      "Men's Haircut",
      "Men's Shaving",
      "Acupuncture",
      "Airbrush Tanning",
      "Back Facial",
      "Body Scrub",
      "Body Sculpting",
      "Body Wrap",
      "Cellulite Treatment",
      "Fat Freezing",
      "Hyperhidrosis Treatment",
      "Infrared Sauna",
    ],
    "Fitness & Hair Removal": [
      "Fitness Classes",
      "Personal Training",
      "Arm Waxing",
      "Back Waxing",
      "Bikini Waxing",
      "Brazilian Waxing",
      "Electrolysis",
      "Eyebrow Threading",
      "Eyebrow Waxing",
      "Face Waxing",
      "Full Body Waxing",
      "Hollywood Waxing",
      "IPL Hair Removal",
    ],
    "Counseling & Holistic": [
      "Ayurveda",
      "Chinese Medicine",
      "Counseling",
      "Cupping Therapy",
      "Energy Healing",
      "Hypnotherapy",
      "Life Coaching",
      "Mindfulness",
      "Naturopathy",
      "Nutrition Counseling",
      "Psychic Reading",
    ],
    "Eyebrows & Eyelashes": [
      "Brow Lamination",
      "Eyebrow Shaping",
      "Eyebrow Tinting",
      "Eyelash Extensions",
      "Eyelash Tinting",
      "Henna Brows",
      "Lash Lift",
      "Lash Lift and Tint",
      "Powder Brows",
    ],
    Nails: [
      "Acrylic Nails",
      "Dip Powder Nails",
      "Fish Manicure",
      "Fish Pedicure",
      "Foot Spa",
      "French Nails",
      "Gel Nail Extensions",
      "Gel Nails",
      "Hybrid Nails",
      "Manicure",
      "Manicure and Pedicure",
    ],
  },
};
