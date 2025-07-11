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
  "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2338&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1733680958774-39a0e8a64a54?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1548783307-f63adc3f200b?q=80&w=2487&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1703622377707-29bc9409aaf2?q=80&w=2400&auto=format&fit=crop",
];

const defaultFeatures: CategoryFeature[] = [
  {
    step: "Step 1",
    title: "Ultra-fast booking that clients love",
    content:
      "Clients can book with your team 24/7 in under 30 seconds- no app downloads or forgotten passwords.",
    image: placeholderImages[0],
  },
  {
    step: "Step 2",
    title: "Get personalized analytics for your business",
    content:
      "Track client retention rate, average sales value per client, and monthly new clients count. Receive personalized insights on how to improve performance.",
    image: placeholderImages[1],
  },
  {
    step: "Step 3",
    title: "Total peace of mind from no-shows",
    content:
      "Protect your time and money with deposits, custom cancellation policies, card-on-file booking rules, and client waitlists.",
    image: placeholderImages[2],
  },
];

export const categoryContent: Record<string, CategoryContent> = {
  salons: {
    subtitle: "For Salons",
    title: "Grow Your Salon Business",
    description:
      "Empower your salon with seamless booking and management tools.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Effortless Salon Scheduling",
        content:
          "Clients can book appointments online 24/7, select stylists, and receive instant confirmations.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Smart Client Management",
        content:
          "Track client preferences, history, and automate reminders for repeat visits.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Boost Revenue with Packages",
        content:
          "Offer bundled services and memberships to increase loyalty and sales.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "hair salons": {
    subtitle: "For Hair Salons",
    title: "Style Meets Technology",
    description: "Modernize your hair salon with our all-in-one platform.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Online Haircut Bookings",
        content:
          "Let clients book their favorite stylist and service in seconds, anytime.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Color & Treatment Tracking",
        content:
          "Keep detailed records of color formulas and treatments for every client.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Follow-ups",
        content:
          "Send personalized reminders and aftercare tips to boost retention.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  barbershops: {
    subtitle: "For Barbershops",
    title: "Barber Innovation",
    description: "Attract more clients and manage your shop with ease.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Instant Online Booking for Barbers",
        content:
          "Clients can book their favorite barber 24/7, choose services, and even select their preferred chair.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Barber Analytics Dashboard",
        content:
          "Track your most popular services, busiest hours, and client retention with real-time analytics tailored for barbershops.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "No-Show Protection & Waitlist",
        content:
          "Reduce no-shows with automated reminders, deposits, and a smart waitlist system for walk-ins.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "beauty salons": {
    subtitle: "For Beauty Salons",
    title: "Beauty, Booked Effortlessly",
    description:
      "Streamline your beauty salon operations and delight your clients.",
    buttonText: "Start Free Trial",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Beauty Appointments, Simplified",
        content:
          "Clients can book facials, waxing, and more with just a few taps.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Inventory & Product Sales",
        content:
          "Track beauty product sales and manage inventory in one place.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Loyalty & Rewards",
        content: "Reward repeat clients with points and special offers.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "nail salons": {
    subtitle: "For Nail Salons",
    title: "Nail Your Business Growth",
    description: "Boost bookings and manage your nail salon with ease.",
    buttonText: "See How",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Manicures & Pedicures Online",
        content:
          "Clients can schedule nail services, select nail artists, and pay online.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Nail Art Gallery",
        content:
          "Showcase your best nail art and let clients choose their favorite designs.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content:
          "Reduce no-shows with SMS/email reminders and easy rescheduling.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "tanning salons": {
    subtitle: "For Tanning Salons",
    title: "Glow Up Your Business",
    description: "Simplify scheduling and grow your tanning salon.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Tanning Sessions Online",
        content: "Clients can reserve beds, booths, or spray tans instantly.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Membership & Packages",
        content:
          "Offer unlimited monthly tanning or special packages to boost loyalty.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming sessions and aftercare tips.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  spas: {
    subtitle: "For Spas",
    title: "Relax, We Handle the Rest",
    description: "Let your spa thrive with our easy-to-use management tools.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Massages & Treatments",
        content: "Clients can schedule massages, facials, and more online.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Therapist Scheduling",
        content:
          "Assign therapists to services and manage their calendars easily.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Gift Cards & Packages",
        content: "Sell gift cards and spa packages to increase revenue.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  clinics: {
    subtitle: "For Clinics",
    title: "Clinic Management Made Simple",
    description: "Efficiently manage appointments and patient records.",
    buttonText: "Learn More",
    images: [
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Medical Appointments",
        content:
          "Patients can book consultations, follow-ups, and more online.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Patient Records Management",
        content: "Securely store and access patient histories and documents.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send appointment reminders and health tips to patients.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "dental clinics": {
    subtitle: "For Dental Clinics",
    title: "Brighten Your Practice",
    description: "Modern solutions for dental clinic scheduling and growth.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Dental Appointments",
        content:
          "Patients can schedule cleanings, checkups, and treatments online.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Treatment Plan Tracking",
        content: "Keep detailed records of patient treatments and follow-ups.",
        image:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming appointments and oral care tips.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "auto shops": {
    subtitle: "For Auto Shops",
    title: "Drive More Business",
    description:
      "Streamline your auto shop with our booking and management tools.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Car Services Online",
        content:
          "Customers can schedule oil changes, repairs, and inspections easily.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Service History Tracking",
        content:
          "Keep a digital record of all services performed for each vehicle.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Remind customers of upcoming maintenance and special offers.",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "pet care": {
    subtitle: "For Pet Care",
    title: "Care for Pets, We Handle the Rest",
    description: "Manage appointments and grow your pet care business.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Pet Grooming & Care",
        content:
          "Pet owners can schedule grooming, vet visits, and daycare online.",
        image:
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Pet Profile Management",
        content:
          "Store pet details, vaccination records, and care preferences.",
        image:
          "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Reminders & Loyalty",
        content: "Send reminders for appointments and reward loyal customers.",
        image:
          "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "bike shops": {
    subtitle: "For Bike Shops",
    title: "Pedal to Success",
    description: "Boost your bike shop with easy scheduling and management.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Bike Repairs & Services",
        content:
          "Cyclists can schedule tune-ups, repairs, and fittings online.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Bike Inventory Management",
        content: "Track bikes, parts, and accessories in your shop.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Customer Loyalty Program",
        content: "Reward repeat customers with discounts and special offers.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "personal trainers": {
    subtitle: "For Personal Trainers",
    title: "Train Smarter, Not Harder",
    description: "Manage clients and sessions with our all-in-one platform.",
    buttonText: "Start Free Trial",
    images: [
      "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Training Sessions Online",
        content:
          "Clients can schedule personal training, group classes, and consultations.",
        image:
          "https://images.unsplash.com/photo-1518715308788-3005759c61d3?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Progress Tracking",
        content: "Track client goals, achievements, and session history.",
        image:
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming sessions and motivational tips.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  photographers: {
    subtitle: "For Photographers",
    title: "Picture Perfect Scheduling",
    description: "Book more shoots and manage your photography business.",
    buttonText: "See How",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Photo Sessions Online",
        content:
          "Clients can schedule shoots, select packages, and pay online.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Portfolio & Gallery",
        content: "Showcase your best work and let clients choose their style.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for upcoming shoots and delivery updates.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "optical stores": {
    subtitle: "For Optical Stores",
    title: "See Your Business Grow",
    description:
      "Modernize your optical store with seamless appointment booking.",
    buttonText: "Get Started",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Eye Exams Online",
        content: "Clients can schedule eye exams, fittings, and consultations.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Inventory & Product Sales",
        content: "Track glasses, contacts, and accessories in your store.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Reminders",
        content: "Send reminders for checkups and new arrivals.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "fuel pump": {
    subtitle: "For Fuel Pumps",
    title: "Fuel Up Your Business",
    description: "Efficient management for modern fuel stations.",
    buttonText: "Book a Demo",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Fuel Deliveries Online",
        content: "Clients can schedule fuel deliveries and services instantly.",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Inventory & Pump Management",
        content: "Track fuel inventory and manage pump schedules easily.",
        image:
          "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Automated Billing & Reminders",
        content: "Send invoices and reminders for refueling and maintenance.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  cstore: {
    subtitle: "For Cstores",
    title: "Convenience, Upgraded",
    description: "Grow your convenience store with our digital solutions.",
    buttonText: "Try Now",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book Store Pickups & Deliveries",
        content: "Customers can order products for pickup or delivery online.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Inventory Management",
        content: "Track products, manage stock, and automate reordering.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Customer Loyalty Program",
        content: "Reward loyal customers with points and exclusive deals.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  "retail store": {
    subtitle: "For Retail Stores",
    title: "Retail, Reimagined",
    description: "Boost sales and manage your retail store with ease.",
    buttonText: "Start Free Trial",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Book In-Store Appointments",
        content:
          "Customers can book personal shopping, fittings, and consultations.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Inventory & Sales Tracking",
        content: "Track sales, manage inventory, and analyze trends easily.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Customer Loyalty & Rewards",
        content:
          "Reward repeat customers and boost retention with loyalty programs.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  default: {
    subtitle: "Innovate & Grow",
    title: "Scale Your Business Through Innovation",
    description:
      "Transform your startup's potential through innovative solutions and strategic growth. We help businesses adapt, evolve, and thrive in today's competitive marketplace.",
    buttonText: "Start Scaling Today",
    images: [
      "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    features: [
      {
        step: "Step 1",
        title: "Ultra-fast booking that clients love",
        content:
          "Clients can book with your team 24/7 in under 30 seconds- no app downloads or forgotten passwords.",
        image:
          "https://images.unsplash.com/photo-1519415943484-cfbdfb6c7b51?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 2",
        title: "Get personalized analytics for your business",
        content:
          "Track client retention rate, average sales value per client, and monthly new clients count. Receive personalized insights on how to improve performance.",
        image:
          "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      },
      {
        step: "Step 3",
        title: "Total peace of mind from no-shows",
        content:
          "Protect your time and money with deposits, custom cancellation policies, card-on-file booking rules, and client waitlists.",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
};

export default categoryContent;
