export type CategoryFeature = {
  step: string;
  title: string;
  content: string;
  image: string;
};

export type CategoryContent = {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  images: string[];
  features: CategoryFeature[];
};

const placeholderImages = [
  "/salon/salon1.png",
  "/salon/salon1.png",
  "/salon/salon1.png",
  "/salon/salon1.png",
];

const defaultFeatures: CategoryFeature[] = [
  {
    step: "Step 1",
    title: "Ultra-fast booking that clients love",
    content:
      "Clients can book with your team 24/7 in under 30 seconds- no app downloads or forgotten passwords.",
    image: "/salon/salon1.png",
  },
  {
    step: "Step 2",
    title: "Get personalized analytics for your business",
    content:
      "Track client retention rate, average sales value per client, and monthly new clients count. Receive personalized insights on how to improve performance.",
    image: "/salon/salon2.png",
  },
  {
    step: "Step 3",
    title: "Total peace of mind from no-shows",
    content:
      "Protect your time and money with deposits, custom cancellation policies, card-on-file booking rules, and client waitlists.",
    image: "/salon/salon3.png",
  },
];

export const categoryContent: Record<string, CategoryContent> = {
  salons: {
    subtitle: "For Salons",
    title: "Grow Your Salon Business",
    description:
      "Empower your salon with seamless booking and management tools.",
    buttonText: "Book a Demo",
    images: ["/salon/salon1.png", "/salon/salon2.png", "/salon/salon1.png"],
    features: [
      {
        step: "Step 1",
        title: "Effortless Salon Scheduling",
        content:
          "Clients can book appointments online 24/7, select stylists, and receive instant confirmations.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Smart Client Management",
        content:
          "Track client preferences, history, and automate reminders for repeat visits.",
        image: "/salon/salon2.png",
      },
      {
        step: "Step 3",
        title: "Boost Revenue with Packages",
        content:
          "Offer bundled services and memberships to increase loyalty and sales.",
        image: "/salon/salon3.png",
      },
    ],
  },
  "hair salons": {
    subtitle: "For Hair Salons",
    title: "Style Meets Technology",
    description: "Modernize your hair salon with our all-in-one platform.",
    buttonText: "Try Now",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Online Haircut Bookings",
        content:
          "Let clients book their favorite stylist and service in seconds, anytime.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Color & Treatment Tracking",
        content:
          "Keep detailed records of color formulas and treatments for every client.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 3",
        title: "Automated Follow-ups",
        content:
          "Send personalized reminders and aftercare tips to boost retention.",
        image: "/salon/salon1.png",
      },
    ],
  },
  barbershops: {
    subtitle: "For Barbershops",
    title: "Barber Innovation",
    description: "Attract more clients and manage your shop with ease.",
    buttonText: "Get Started",
    images: ["/barber1.png", "/barber2.png", "/barber3.png"],
    features: [
      {
        step: "Step 1",
        title: "Instant Online Booking for Barbers",
        content:
          "Clients can book their favorite barber 24/7, choose services, and even select their preferred chair.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 2",
        title: "Barber Analytics Dashboard",
        content:
          "Track your most popular services, busiest hours, and client retention with real-time analytics tailored for barbershops.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "No-Show Protection & Waitlist",
        content:
          "Reduce no-shows with automated reminders, deposits, and a smart waitlist system for walk-ins.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "beauty salons": {
    subtitle: "For Beauty Salons",
    title: "Beauty, Booked Effortlessly",
    description:
      "Streamline your beauty salon operations and delight your clients.",
    buttonText: "Start Free Trial",
    images: ["/salon/salon1.png", "/public/pay1.png", "/salon/salon1.png"],
    features: [
      {
        step: "Step 1",
        title: "Beauty Appointments, Simplified",
        content:
          "Clients can book facials, waxing, and more with just a few taps.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Inventory & Product Sales",
        content:
          "Track beauty product sales and manage inventory in one place.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 3",
        title: "Loyalty & Rewards",
        content: "Reward repeat clients with points and special offers.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "nail salons": {
    subtitle: "For Nail Salons",
    title: "Nail Your Business Growth",
    description: "Boost bookings and manage your nail salon with ease.",
    buttonText: "See How",
    images: ["/Nail/nail1.png", "/Nail/nail2.png", "/Nail/nail3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Manicures & Pedicures Online",
        content:
          "Clients can schedule nail services, select nail artists, and pay online.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 2",
        title: "Nail Art Gallery",
        content:
          "Showcase your best nail art and let clients choose their favorite designs.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content:
          "Reduce no-shows with SMS/email reminders and easy rescheduling.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "tanning salons": {
    subtitle: "For Tanning Salons",
    title: "Glow Up Your Business",
    description: "Simplify scheduling and grow your tanning salon.",
    buttonText: "Get Started",
    images: ["/gym/gym1.png", "/gym/gym2.png", "/gym/gym3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Tanning Sessions Online",
        content: "Clients can reserve beds, booths, or spray tans instantly.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Membership & Packages",
        content:
          "Offer unlimited monthly tanning or special packages to boost loyalty.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming sessions and aftercare tips.",
        image: "/salon/salon1.png",
      },
    ],
  },
  spas: {
    subtitle: "For Spas",
    title: "Relax, We Handle the Rest",
    description: "Let your spa thrive with our easy-to-use management tools.",
    buttonText: "Book a Demo",
    images: ["/spa/spa1.png", "/spa/spa2.png", "/spa/spa3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Massages & Treatments",
        content: "Clients can schedule massages, facials, and more online.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 2",
        title: "Therapist Scheduling",
        content:
          "Assign therapists to services and manage their calendars easily.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Gift Cards & Packages",
        content: "Sell gift cards and spa packages to increase revenue.",
        image: "/salon/salon1.png",
      },
    ],
  },
  clinics: {
    subtitle: "For Clinics",
    title: "Clinic Management Made Simple",
    description: "Efficiently manage appointments and patient records.",
    buttonText: "Learn More",
    images: ["/clinics1.png", "/clinics2.png", "/clinics3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Medical Appointments",
        content:
          "Patients can book consultations, follow-ups, and more online.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Patient Records Management",
        content: "Securely store and access patient histories and documents.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send appointment reminders and health tips to patients.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "dental clinics": {
    subtitle: "For Dental Clinics",
    title: "Brighten Your Practice",
    description: "Modern solutions for dental clinic scheduling and growth.",
    buttonText: "Try Now",
    images: ["/public/pay1.png", "/salon/salon1.png", "/salon/salon1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Dental Appointments",
        content:
          "Patients can schedule cleanings, checkups, and treatments online.",
        image: "/public/pay1.png",
      },
      {
        step: "Step 2",
        title: "Treatment Plan Tracking",
        content: "Keep detailed records of patient treatments and follow-ups.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming appointments and oral care tips.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "auto shops": {
    subtitle: "For Auto Shops",
    title: "Drive More Business",
    description:
      "Streamline your auto shop with our booking and management tools.",
    buttonText: "Get Started",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/salon/salon1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Car Services Online",
        content:
          "Customers can schedule oil changes, repairs, and inspections easily.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Service History Tracking",
        content:
          "Keep a digital record of all services performed for each vehicle.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Remind customers of upcoming maintenance and special offers.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "pet care": {
    subtitle: "For Pet Care",
    title: "Care for Pets, We Handle the Rest",
    description: "Manage appointments and grow your pet care business.",
    buttonText: "Book a Demo",
    images: ["/pet/pet1.png", "/pet/pet2.png", "/pet/pet3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Pet Grooming & Care",
        content:
          "Pet owners can schedule grooming, vet visits, and daycare online.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Pet Profile Management",
        content:
          "Store pet details, vaccination records, and care preferences.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Reminders & Loyalty",
        content: "Send reminders for appointments and reward loyal customers.",
        image: "/salon/salon1.png",
      },
    ],
  },
  "bike shops": {
    subtitle: "For Bike Shops",
    title: "Pedal to Success",
    description: "Boost your bike shop with easy scheduling and management.",
    buttonText: "Try Now",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Bike Repairs & Services",
        content:
          "Cyclists can schedule tune-ups, repairs, and fittings online.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Bike Inventory Management",
        content: "Track bikes, parts, and accessories in your shop.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Customer Loyalty Program",
        content: "Reward repeat customers with discounts and special offers.",
        image: "/public/pay1.png",
      },
    ],
  },
  "personal trainers": {
    subtitle: "For Personal Trainers",
    title: "Train Smarter, Not Harder",
    description: "Manage clients and sessions with our all-in-one platform.",
    buttonText: "Start Free Trial",
    images: ["/gym/gym1.png", "/gym/gym2.png", "/gym/gym3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Training Sessions Online",
        content:
          "Clients can schedule personal training, group classes, and consultations.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Progress Tracking",
        content: "Track client goals, achievements, and session history.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming sessions and motivational tips.",
        image: "/salon/salon1.png",
      },
    ],
  },
  photographers: {
    subtitle: "For Photographers",
    title: "Picture Perfect Scheduling",
    description: "Book more shoots and manage your photography business.",
    buttonText: "See How",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Photo Sessions Online",
        content:
          "Clients can schedule shoots, select packages, and pay online.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Portfolio & Gallery",
        content: "Showcase your best work and let clients choose their style.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming shoots and delivery updates.",
        image: "/public/pay1.png",
      },
    ],
  },
  "optical stores": {
    subtitle: "For Optical Stores",
    title: "See Your Business Grow",
    description:
      "Modernize your optical store with seamless appointment booking.",
    buttonText: "Get Started",
    images: ["/optical/optical1.png", "/optical/optical2.png", "/optical/optical3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Eye Exams Online",
        content: "Clients can schedule eye exams, fittings, and consultations.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Inventory & Product Sales",
        content: "Track glasses, contacts, and accessories in your store.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for checkups and new arrivals.",
        image: "/public/pay1.png",
      },
    ],
  },
  "fuel pump": {
    subtitle: "For Fuel Pumps",
    title: "Fuel Up Your Business",
    description: "Efficient management for modern fuel stations.",
    buttonText: "Book a Demo",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Fuel Deliveries Online",
        content: "Clients can schedule fuel deliveries and services instantly.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Inventory & Pump Management",
        content: "Track fuel inventory and manage pump schedules easily.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Automated Billing & Reminders",
        content: "Send invoices and reminders for refueling and maintenance.",
        image: "/public/pay1.png",
      },
    ],
  },
  cstore: {
    subtitle: "For Cstores",
    title: "Convenience, Upgraded",
    description: "Grow your convenience store with our digital solutions.",
    buttonText: "Try Now",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Store Pickups & Deliveries",
        content: "Customers can order products for pickup or delivery online.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Inventory Management",
        content: "Track products, manage stock, and automate reordering.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Customer Loyalty Program",
        content: "Reward loyal customers with points and exclusive deals.",
        image: "/public/pay1.png",
      },
    ],
  },
  "retail store": {
    subtitle: "For Retail Stores",
    title: "Retail, Reimagined",
    description: "Boost sales and manage your retail store with ease.",
    buttonText: "Start Free Trial",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Book In-Store Appointments",
        content:
          "Customers can book personal shopping, fittings, and consultations.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Inventory & Sales Tracking",
        content: "Track sales, manage inventory, and analyze trends easily.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Customer Loyalty & Rewards",
        content:
          "Reward repeat customers and boost retention with loyalty programs.",
        image: "/public/pay1.png",
      },
    ],
  },
  default: {
    subtitle: "Innovate & Grow",
    title: "Scale Your Business Through Innovation",
    description:
      "Transform your startup's potential through innovative solutions and strategic growth. We help businesses adapt, evolve, and thrive in today's competitive marketplace.",
    buttonText: "Start Scaling Today",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Ultra-fast booking that clients love",
        content:
          "Clients can book with your team 24/7 in under 30 seconds- no app downloads or forgotten passwords.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Get personalized analytics for your business",
        content:
          "Track client retention rate, average sales value per client, and monthly new clients count. Receive personalized insights on how to improve performance.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Total peace of mind from no-shows",
        content:
          "Protect your time and money with deposits, custom cancellation policies, card-on-file booking rules, and client waitlists.",
        image: "/public/pay1.png",
      },
    ],
  },
};

export default categoryContent;
