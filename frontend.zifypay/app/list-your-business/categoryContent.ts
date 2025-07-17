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
    title: "Lightning-Fast Booking Experience",
    content:
      "Wow your clients with seamless 24/7 booking in under 30 seconds—no apps or passwords required!",
    image: "/salon/salon1.png",
  },
  {
    step: "Step 2",
    title: "Unlock Game-Changing Analytics",
    content:
      "Gain deep insights into client retention, average sales, and new customer trends with tailored recommendations to skyrocket your success.",
    image: "/salon/salon2.png",
  },
  {
    step: "Step 3",
    title: "Say Goodbye to No-Shows",
    content:
      "Safeguard your revenue with secure deposits, flexible cancellation policies, and smart waitlist tools to keep your schedule full.",
    image: "/salon/salon3.png",
  },
];

export const categoryContent: Record<string, CategoryContent> = {
  salons: {
    subtitle: "For Salons",
    title: "Supercharge Your Salon’s Success",
    description:
      "Elevate your salon with cutting-edge booking and management tools designed to delight clients and boost growth.",
    buttonText: "Discover the Future",
    images: ["/salon/salon1.png", "/salon/salon2.png", "/salon/salon3.png"],
    features: [
      {
        step: "Step 1",
        title: "Seamless Appointment Booking",
        content:
          "Empower clients to book their favorite stylist anytime, anywhere, with instant confirmations that keep them coming back.",
        image: "/salonB.jpeg",
      },
      {
        step: "Step 2",
        title: "Master Client Relationships",
        content:
          "Stay ahead with detailed client profiles and automated reminders to ensure repeat visits and lasting loyalty.",
        image: "/salon/salon2.png",
      },
      {
        step: "Step 3",
        title: "Maximize Profits with Packages",
        content:
          "Drive revenue with exclusive service bundles and memberships that turn clients into raving fans.",
        image: "/salonC.jpeg",
      },
    ],
  },

  barbershops: {
    subtitle: "For Barbershops",
    title: "Revolutionize Your Barbershop",
    description:
      "Attract more clients and streamline operations with tools built for barbershop success.",
    buttonText: "Launch Now",
    images: ["/barber1.png", "/barber2.png", "/barber3.png"],
    features: [
      {
        step: "Step 1",
        title: "Effortless Booking for Clients",
        content:
          "Let clients book their go-to barber, pick services, and choose their chair—all in a few clicks, 24/7.",
        image: "/salonB.jpeg",
      },
      {
        step: "Step 2",
        title: "Real-Time Performance Insights",
        content:
          "Master your shop’s success with analytics on top services, peak hours, and client loyalty, tailored to barbershops.",
        image: "/1POS.jpeg",
      },
      {
        step: "Step 3",
        title: "No-Show Protection That Works",
        content:
          "Keep your chairs filled with automated reminders, deposits, and a smart waitlist for last-minute clients.",
        image: "/salon/salon1.png",
      },
    ],
  },

  "beauty salons": {
    subtitle: "For Beauty Salons",
    title: "Transform Beauty with Ease",
    description:
      "Simplify operations and captivate clients with tools crafted for beauty salons.",
    buttonText: "Unlock Your Potential",
    images: ["/b1.jpeg", "/b3.jpeg", "/b2.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Hassle-Free Beauty Booking",
        content:
          "Make scheduling facials, waxing, and more a breeze with a few taps, keeping clients glowing and happy.",
        image: "/butA.jpeg",
      },
      {
        step: "Step 2",
        title: "Streamlined Inventory & Sales",
        content:
          "Effortlessly track beauty product sales and inventory in one powerful platform.",
        image: "/butB.jpeg",
      },
      {
        step: "Step 3",
        title: "Build Lasting Client Loyalty",
        content:
          "Reward your clients with points, exclusive offers, and personalized experiences they’ll love.",
        image: "/butC.jpeg",
      },
    ],
  },

  "nail salons": {
    subtitle: "For Nail Salons",
    title: "Polish Your Business to Perfection",
    description:
      "Grow your nail salon with intuitive tools that make booking and management a breeze.",
    buttonText: "Shine Bright",
    images: ["/Nail/nail1.png", "/Nail/nail2.png", "/Nail/nail3.png"],
    features: [
      {
        step: "Step 1",
        title: "Effortless Nail Service Booking",
        content:
          "Let clients book manicures, pedicures, and nail artists online with ease and pay upfront.",
        image: "/NailA.jpeg",
      },
      {
        step: "Step 2",
        title: "Showcase Stunning Nail Art",
        content:
          "Highlight your best designs in a gallery that inspires clients to book their next look.",
        image: "/NailB.jpeg",
      },
      {
        step: "Step 3",
        title: "Never Miss a Beat",
        content:
          "Cut no-shows with automated SMS/email reminders and easy rescheduling options.",
        image: "/NailC.jpeg",
      },
    ],
  },

  spas: {
    subtitle: "For Spas",
    title: "Create a Sanctuary of Success",
    description:
      "Let your spa flourish with tools that simplify management and elevate the client experience.",
    buttonText: "Experience the Difference",
    images: ["/spa/spa1.png", "/spa/spa2.png", "/spa/spa3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Tranquil Spa Experiences",
        content:
          "Clients can effortlessly schedule massages, facials, and treatments online, anytime.",
        image: "/Tain.jpeg",
      },
      {
        step: "Step 2",
        title: "Effortless Therapist Management",
        content:
          "Seamlessly assign therapists to services and manage their schedules with ease.",
        image: "/Tain1.jpeg",
      },
      {
        step: "Step 3",
        title: "Boost Revenue with Gift Cards",
        content:
          "Increase sales with beautifully designed gift cards and exclusive spa packages.",
        image: "/Tain3.jpeg",
      },
    ],
  },

  clinics: {
    subtitle: "For Clinics",
    title: "Empower Your Clinic’s Future",
    description:
      "Streamline patient care and appointments with tools designed for medical professionals.",
    buttonText: "Explore Now",
    images: ["/clinics1.png", "/clinics2.png", "/clinics3.png"],
    features: [
      {
        step: "Step 1",
        title: "Seamless Medical Booking",
        content:
          "Patients can book consultations and follow-ups online with ease and confidence.",
        image: "/salonB.jpeg",
      },
      {
        step: "Step 2",
        title: "Secure Patient Records",
        content:
          "Organize and access patient histories and documents securely in one place.",
        image: "/clienc.jpeg",
      },
      {
        step: "Step 3",
        title: "Stay Connected with Patients",
        content:
          "Send automated appointment reminders and personalized health tips to keep patients engaged.",
        image: "/doc.jpeg",
      },
    ],
  },

  "dental clinics": {
    subtitle: "For Dental Clinics",
    title: "Smile Brighter with Smart Tools",
    description:
      "Modernize your dental practice with effortless scheduling and patient management.",
    buttonText: "Get Started Today",
    images: ["/clinics1.png", "/clinics2.png", "/clinics3.png"],
    features: [
      {
        step: "Step 1",
        title: "Hassle-Free Dental Booking",
        content:
          "Patients can schedule cleanings, checkups, and treatments online in seconds.",
        image: "/salonB.jpeg",
      },
      {
        step: "Step 2",
        title: "Track Treatment Plans",
        content:
          "Maintain detailed records of patient treatments and follow-ups for exceptional care.",
        image: "/doc.jpeg",
      },
      {
        step: "Step 3",
        title: "Engage Patients Effortlessly",
        content:
          "Send reminders for appointments and share oral care tips to keep smiles shining.",
        image: "/dental.jpeg",
      },
    ],
  },

  "auto shops": {
    subtitle: "For Auto Shops",
    title: "Accelerate Your Auto Shop’s Growth",
    description:
      "Power up your auto shop with tools that streamline bookings and operations.",
    buttonText: "Rev Up Now",
    images: ["/auto0.jpeg", "/auto2.jpeg", "/auto3.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Book Services with Ease",
        content:
          "Customers can schedule oil changes, repairs, and inspections in just a few clicks.",
        image: "/car.jpeg",
      },
      {
        step: "Step 2",
        title: "Track Vehicle Histories",
        content:
          "Keep detailed digital records of all services performed for every vehicle.",
        image: "/auto2.jpeg",
      },
      {
        step: "Step 3",
        title: "Simplify Payments",
        content:
          "Streamline transactions with a fast, secure payment system built for auto shops.",
        image: "/auto3.jpeg",
      },
    ],
  },

  "pet care": {
    subtitle: "For Pet Care",
    title: "Pawsitively Perfect Pet Care",
    description:
      "Grow your pet care business with tools that make scheduling and management a breeze.",
    buttonText: "Unleash Your Potential",
    images: ["/pet/pet1.png", "/pet/pet2.png", "/pet/pet3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Pet Services Online",
        content:
          "Pet owners can easily schedule grooming, vet visits, and daycare with confidence.",
        image: "/pet-care.jpeg",
      },
      {
        step: "Step 2",
        title: "Centralized Pet Profiles",
        content:
          "Store pet details, vaccination records, and care preferences in one secure place.",
        image: "/cat.jpeg",
      },
      {
        step: "Step 3",
        title: "Build Pet Parent Loyalty",
        content:
          "Keep clients coming back with automated reminders and exclusive loyalty rewards.",
        image: "/dog.jpeg",
      },
    ],
  },

  "bike shops": {
    subtitle: "For Bike Shops",
    title: "Ride Your Bike Shop to Success",
    description:
      "Pedal faster with tools that simplify scheduling and inventory management.",
    buttonText: "Start Rolling",
    images: ["/bike-shop2.jpeg", "/bike-shop.jpeg", "/bike-shop1.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Book Bike Services Online",
        content:
          "Cyclists can schedule tune-ups, repairs, and fittings with ease, anytime.",
        image: "/bike.jpeg",
      },
      {
        step: "Step 2",
        title: "Master Your Inventory",
        content:
          "Effortlessly track bikes, parts, and accessories to keep your shop running smoothly.",
        image: "/bike2.jpeg",
      },
      {
        step: "Step 3",
        title: "Reward Loyal Cyclists",
        content:
          "Boost retention with discounts and special offers for repeat customers.",
        image: "/bike3.jpeg",
      },
    ],
  },

  "personal trainers": {
    subtitle: "For Personal Trainers",
    title: "Power Up Your Training Business",
    description:
      "Transform your training business with tools to manage clients and sessions effortlessly.",
    buttonText: "Level Up Now",
    images: ["/gym/gym1.png", "/gym/gym2.png", "/gym/gym3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Sessions with Ease",
        content:
          "Clients can schedule personal training, group classes, or consultations in seconds.",
        image: "/gyam.jpeg",
      },
      {
        step: "Step 2",
        title: "Track Client Progress",
        content:
          "Monitor goals, achievements, and session history to deliver personalized results.",
        image: "/gyam1.jpeg",
      },
      {
        step: "Step 3",
        title: "Motivate with Reminders",
        content:
          "Send automated session reminders and motivational tips to keep clients on track.",
        image: "/gyam3.jpeg",
      },
    ],
  },

  photographers: {
    subtitle: "For Photographers",
    title: "Capture Success with Ease",
    description:
      "Book more shoots and streamline your photography business with intuitive tools.",
    buttonText: "Focus on Growth",
    images: ["/photo1.jpeg", "/photo2.jpeg", "/photo3.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Effortless Shoot Booking",
        content:
          "Clients can schedule sessions, choose packages, and pay online in a snap.",
        image: "/photo.jpeg",
      },
      {
        step: "Step 2",
        title: "Stunning Portfolio Showcase",
        content:
          "Display your best work in a gallery that inspires clients to book their dream shoot.",
        image: "/photoA.jpeg",
      },
      {
        step: "Step 3",
        title: "Stay on Schedule",
        content:
          "Keep clients informed with automated reminders for shoots and delivery updates.",
        image: "/photo3.jpeg",
      },
    ],
  },

  "optical stores": {
    subtitle: "For Optical Stores",
    title: "Visionary Tools for Growth",
    description:
      "Modernize your optical store with seamless booking and inventory solutions.",
    buttonText: "See the Difference",
    images: ["/optical/optical1.png", "/optical/optical2.png", "/optical/optical3.png"],
    features: [
      {
        step: "Step 1",
        title: "Book Eye Care with Ease",
        content:
          "Clients can schedule eye exams, fittings, and consultations effortlessly online.",
        image: "/optical1.jpeg",
      },
      {
        step: "Step 2",
        title: "Track Inventory & Sales",
        content:
          "Manage glasses, contacts, and accessories with a powerful, all-in-one system.",
        image: "/gtp.jpeg",
      },
      {
        step: "Step 3",
        title: "Engage with Reminders",
        content:
          "Send automated checkup reminders and alerts for new arrivals to keep clients coming back.",
        image: "/gpt.jpeg",
      },
    ],
  },

  "fuel pump": {
    subtitle: "For Fuel Pumps",
    title: "Fuel Your Business Growth",
    description:
      "Power up your fuel station with smart tools for seamless management.",
    buttonText: "Ignite Success",
    images: ["/fuel1.jpg", "/fuel2.jpg", "/fuel3.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Book Fuel Deliveries Fast",
        content:
          "Clients can schedule fuel deliveries and services instantly, hassle-free.",
        image: "/fuel1.jpeg",
      },
      {
        step: "Step 2",
        title: "Smart Inventory & Pump Control",
        content:
          "Track fuel stock and manage pump schedules with ease for maximum efficiency.",
        image: "/desh.jpeg",
      },
      {
        step: "Step 3",
        title: "Streamlined Billing & Reminders",
        content:
          "Send invoices and maintenance reminders to keep your operations running smoothly.",
        image: "/fuel4.jpeg",
      },
    ],
  },

  cstore: {
    subtitle: "For Convenience Stores",
    title: "Upgrade Your Convenience Store",
    description:
      "Boost sales and simplify operations with digital tools built for convenience stores.",
    buttonText: "Shop Smarter",
    images: ["/cs1.jpeg", "/cs2.jpeg", "/cs3.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Easy Pickup & Delivery Booking",
        content:
          "Customers can order products for pickup or delivery with just a few clicks.",
        image: "/123456.jpeg",
      },
      {
        step: "Step 2",
        title: "Master Your Inventory",
        content:
          "Track stock, manage products, and automate reordering for a thriving store.",
        image: "/werty.jpeg",
      },
      {
        step: "Step 3",
        title: "Build Customer Loyalty",
        content:
          "Reward loyal shoppers with points, deals, and exclusive offers they’ll love.",
        image: "/789.jpeg",
      },
    ],
  },

  "retail store": {
    subtitle: "For Retail Stores",
    title: "Reimagine Retail Success",
    description:
      "Elevate your retail store with tools that drive sales and simplify management.",
    buttonText: "Shop the Future",
    images: ["/cstore.jpeg", "/cstore1.jpeg", "/POS UI.jpeg"],
    features: [
      {
        step: "Step 1",
        title: "Book In-Store Experiences",
        content:
          "Let customers schedule personal shopping, fittings, or consultations with ease.",
        image: "/react.jpeg",
      },
      {
        step: "Step 2",
        title: "Track Sales & Inventory",
        content:
          "Analyze trends, manage stock, and optimize sales with powerful insights.",
        image: "/retail.jpeg",
      },
      {
        step: "Step 3",
        title: "Boost Loyalty with Apps",
        content:
          "Engage customers with mobile apps and loyalty programs that drive repeat visits.",
        image: "/pos3.jpeg",
      },
    ],
  },

  default: {
    subtitle: "Innovate & Thrive",
    title: "Unleash Your Business Potential",
    description:
      "Transform your business with innovative tools that drive growth, streamline operations, and captivate customers in today’s fast-paced market.",
    buttonText: "Start Your Journey",
    images: ["/salon/salon1.png", "/salon/salon1.png", "/public/pay1.png"],
    features: [
      {
        step: "Step 1",
        title: "Lightning-Fast Booking Experience",
        content:
          "Wow your clients with seamless 24/7 booking in under 30 seconds—no apps or passwords required!",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 2",
        title: "Unlock Game-Changing Analytics",
        content:
          "Gain deep insights into client retention, average sales, and new customer trends with tailored recommendations to skyrocket your success.",
        image: "/salon/salon1.png",
      },
      {
        step: "Step 3",
        title: "Say Goodbye to No-Shows",
        content:
          "Safeguard your revenue with secure deposits, flexible cancellation policies, and smart waitlist tools to keep your schedule full.",
        image: "/public/pay1.png",
      },
    ],
  },
};

export default categoryContent;